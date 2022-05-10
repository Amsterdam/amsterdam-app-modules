import threading
import os
import socket
from flask import Flask, jsonify
from wsgiserver import WSGIServer


class MockBackendServer:
    def __init__(self, debug=False):
        self.debug = debug
        self.ip = socket.gethostbyname(os.environ['TARGET'])
        self.port = 8000
        self.http_server = None
        self.app = Flask('WSGI-Flask Server on port: {port}'.format(port=self.port))
        threading.Thread(target=self.run).start()

    def run(self):
        @self.app.route('/api/v1/modules')
        def api_v1_modules():
            result = {
                "result": [
                    {
                        "slug": "string",
                        "version": "0.0.0.0",
                        "title": "string",
                        "description": "string",
                        "icon": "string",
                        "status": 0
                    }
                ],
                "status": True
            }
            return jsonify(result), 200

        self.http_server = WSGIServer(self.app, host=self.ip, port=self.port)
        self.http_server.start()

    def stop(self):
        self.http_server.stop()


if __name__ == '__main__':
    import time
    with MockBackendServer() as app:
        try:
            while True:
                # Flask runs in its own thread, so do anything you like here outside of the flask application...
                time.sleep(0.1)
        except KeyboardInterrupt:  # Same as docker stop signal
            print('Teardown server')
