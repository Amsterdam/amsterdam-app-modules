#!/bin/bash

function header {
  printf "\nInitializing environment\n"
}

function SERVER {
  if [ -z ${UNITTEST} ]; then
    printf "Starting Module\n\n"
    cd /code && . venv/bin/activate && python3 /code/main.py
  else
    printf "Starting unittests\n\n"
    cd /code pytest --no-header --no-summary -q unittests/
  fi  
}

function infinity_loop {
  # Automatically restart the flask-services on crash
  export PYTHONPATH=/code
  while true; do
    # For debugging: Touch /flask_app/DEBUG, kill run.py and restart manually
    if [[ ! -f "/code/DEBUG" ]]
    then
	    SERVER;
    fi
    sleep 1
  done
}

header
infinity_loop
