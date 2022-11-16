#!/bin/bash

function header {
  printf "\nInitializing environment\n"
}

function SERVER {
  cd /code && . venv/bin/activate && python3 /code/main.py
}

function infinity_loop {
  # Automatically restart the flask-services on crash
  export PYTHONPATH=/code
  if [ -z ${UNITTEST} ]; then
    while true; do
      # For debugging: Touch /flask_app/DEBUG, kill run.py and restart manually
      if [[ ! -f "/code/DEBUG" ]]
      then
        SERVER;
      fi
      sleep 1
    done
  else
    printf "Starting unittests\n\n"
    export PYTHONPATH=/code && \
    cd /code && \
    source venv/bin/activate && \
    python3 -m pip install pytest mock && \
    pytest --no-header --no-summary -q unittests/
  fi

}

header
infinity_loop
