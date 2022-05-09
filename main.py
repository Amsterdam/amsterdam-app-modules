#!/usr/bin/env python3
import time
import WSGIServer
import os


if __name__ == "__main__":
    debug = os.getenv('debug', True)
    with WSGIServer.APIServer(debug=debug) as app:
        try:
            while True:
                # Flask runs in its own thread, so do anything you like here outside of the flask application...
                time.sleep(0.1)
        except KeyboardInterrupt:  # Same as docker stop signal
            print('Teardown server')
