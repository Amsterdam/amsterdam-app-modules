import Configuration
import json
import requests
from flask import Response
from requests.exceptions import ConnectionError


class ProxyRequest:
    def __init__(self, path, method, data=None, authorization_header=None):
        self.path = path
        self.method = method
        self.data = data
        self.request = None
        self.url = None
        self.headers = {'Accept': 'application/json', 'AUTHORIZATION': authorization_header}
        self.response = None

    def set_result(self):
        try:
            if self.request is None:
                self.response = Response(json.dumps({'status': False, 'result': '504 Gateway timeout'}), status=504)
            elif self.request.status_code == 403:
                self.response = Response(json.dumps({'status': False, 'result': self.request.reason}), status=self.request.status_code)
            else:
                headers = {'Content-Type': 'application/json'}
                response_body = json.dumps(self.request.json())
                self.response = Response(response_body, headers=headers, status=self.request.status_code)
        except requests.exceptions.JSONDecodeError:
            self.response = Response(json.dumps({'status': False, 'result': 'JSONDecodeError'}), status=500)

    def set_url(self):
        host = Configuration.environment['TARGET']
        port = Configuration.environment['TARGET_PORT']
        protocol = 'https' if port == 443 else 'http'
        self.url = '{protocol}://{host}:{port}{path}'.format(protocol=protocol, host=host, port=port, path=self.path)

    def __enter__(self):
        self.set_url()

        try:
            if self.method == 'GET':
                self.request = requests.get(self.url, headers=self.headers)
            elif self.method == 'POST':
                self.request = requests.post(self.url, headers=self.headers, json=self.data)
            elif self.method == 'PATCH':
                self.request = requests.patch(self.url, headers=self.headers, json=self.data)
            elif self.method == 'DELETE':
                self.request = requests.delete(self.url, headers=self.headers, json=self.data)
        except ConnectionError:
            pass
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.request = None
