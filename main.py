#!/usr/bin/env python3
import time
import WSGIServer


if __name__ == "__main__":
    with WSGIServer.APIServer() as app:
        try:
            while app.thread.is_alive():
                time.sleep(1)
        except KeyboardInterrupt:  # Same as docker stop signal
            print('Teardown server')
