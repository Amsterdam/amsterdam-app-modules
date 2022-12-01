#!/bin/bash

###
#
# DOCKER ENTRY SCRIPT FOR STARTING UP THE AMSTERDAM APP BACKEND
#
# touch /code/DEBUG, kill python process and run python manage.py [...] manually for debugging inside the docker
# container
#
###

function is_db_alive {
  state=0
  printf "checking for database"
  while ! nc -q 1 ${POSTGRES_HOST} 5432 </dev/null 1> /dev/null 2> /dev/null; do
    case $state in
      0) printf "\rchecking for database: -";;
      1) printf "\rchecking for database: \\";;
      2) printf "\rchecking for database: |";;
      3) printf "\rchecking for database: /";;
    esac
    state=`expr $((state+1)) % 4`
    sleep 0.1
  done
  printf '\rChecking for database -> db alive\n'
}

function set_header {
  printf "\nInitializing Amsterdam-App-Modules\n"
}

function create_db {
# WARNING: DO NOT INDENT A HERE DOCUMENT
psql "user=${POSTGRES_USER} password=${POSTGRES_PASSWORD} host=${POSTGRES_HOST} dbname=${POSTGRES_DB_BACKEND}" <<-EOF
CREATE DATABASE "${POSTGRES_DB}";
GRANT ALL PRIVILEGES ON DATABASE "${POSTGRES_DB}" TO "${POSTGRES_USER}";
EOF
}

function make_migrations {
    printf "\nRunning DB migrations scripts ... "
    cd /code && python manage.py makemigrations amsterdam_app_api
    cd /code && python manage.py migrate
    printf "Done.\n"
}

function add_static_files {
    printf "\nCollecting static add_static_files\n"
    cd /code && python manage.py collectstatic --no-input
}

function start_backend {
    printf "\nStarting Django API server\n\n"
    DEFAULT_API_PORT=8010
    API_PORT_MODULES="${API_PORT_MODULES:=${DEFAULT_API_PORT}}"
    cd /code && python manage.py runserver 0.0.0.0:${API_PORT_MODULES}
}

function create_user {
    printf "\nCreating web-users\n"
    cd /code && python create_user.py
}

function enter_infinity_loop {
  if [ -z ${UNITTEST} ]; then
    while true; do
      # Touch /code/DEBUG, kill python process and run python manage.py [...] manually for debugging...
      if [[ ! -f "/code/DEBUG" ]]
      then
        start_backend;
      fi
      sleep 1
    done
  else
    printf "Starting unittests\n\n"
    cd /code && python manage.py test
  fi
}

is_db_alive
set_header
create_db
make_migrations
add_static_files
create_user
enter_infinity_loop
