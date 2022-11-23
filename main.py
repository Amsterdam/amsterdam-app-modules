#!/usr/bin/env python3

""" Main entry-point for the modules server
"""

import time
from APIServer.APIServer import APIServer


if __name__ == "__main__":
    with APIServer() as app:
        try:
            while app.thread.is_alive():
                time.sleep(1)
        except KeyboardInterrupt:  # Same as docker stop signal
            print('Teardown server')
