""" Class for proxying incoming request to backend server
"""

import json
import requests
import requests.exceptions
from flask import Response
import Configuration


class ProxyRequest:
    """ ProxyRequest class:
        path: url
        method: GET POST DELETE PATCH
        data: payload to send alongside the request
        authorization_header: header for authorization
    """
    def __init__(self, path, method, data=None, authorization_header=None):
        self.path = path
        self.method = method
        self.data = data
        self.request = None
        self.url = None
        self.headers = {'Accept': 'application/json', 'AUTHORIZATION': authorization_header}
        self.response = None

    def set_result(self):
        """ Set result based on the response of an upstream server
        :return: void
        """
        try:
            if self.request is None:
                self.response = Response(json.dumps({'status': False, 'result': '504 Gateway timeout'}), status=504)
            elif self.request.status_code == 403:
                self.response = Response(json.dumps({'status': False, 'result': self.request.reason}),
                                         status=self.request.status_code)
            else:
                headers = {'Content-Type': 'application/json'}
                response_body = json.dumps(self.request.json())
                self.response = Response(response_body, headers=headers, status=self.request.status_code)
        except requests.exceptions.JSONDecodeError:
            self.response = Response(json.dumps({'status': False, 'result': 'JSONDecodeError'}), status=500)

    def set_url(self):
        """ Set the url and protocol used for the upstream server
        :return: void
        """
        host = Configuration.environment['TARGET']
        port = Configuration.environment['TARGET_PORT']
        protocol = 'https' if port == 443 else 'http'
        self.url = '{protocol}://{host}:{port}{path}'.format(protocol=protocol, host=host, port=port, path=self.path)

    def __enter__(self):
        self.set_url()

        try:
            if self.method == 'GET':
                self.request = requests.get(self.url, headers=self.headers, timeout=30)
            elif self.method == 'POST':
                self.request = requests.post(self.url, headers=self.headers, json=self.data, timeout=30)
            elif self.method == 'PATCH':
                self.request = requests.patch(self.url, headers=self.headers, json=self.data, timeout=30)
            elif self.method == 'DELETE':
                self.request = requests.delete(self.url, headers=self.headers, json=self.data, timeout=30)
        except requests.exceptions.ConnectionError:
            pass
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.request = None
