import os
import requests
import json
from GenericFunctions.AESCipher import AESCipher
from uuid import uuid4
from flask import Response


class ProxyRequest:
    def __init__(self, path, method, data=None):
        self.path = path
        self.method = method
        self.data = data
        self.request = None
        self.url = None
        self.token = AESCipher(str(uuid4()), os.getenv('AES_SECRET')).encrypt()
        self.headers = {'Accept': 'application/json', 'IngestAuthorization': self.token}
        self.response = None

    def set_result(self):
        if self.request.status_code == 403:
            self.response = Response(json.dumps({'status': False, 'result': self.request.reason}), status=self.request.status_code)
        else:
            headers = {'Content-Type': 'application/json'}
            response_body = json.dumps(self.request.json())
            self.response = Response(response_body, headers=headers, status=self.request.status_code)

    def set_url(self):
        host = os.getenv('TARGET', 'api-server')
        port = int(os.getenv('TARGET_PORT', 8000))
        protocol = 'https' if port == 443 else 'http'
        self.url = '{protocol}://{host}:{port}{path}'.format(protocol=protocol, host=host, port=port, path=self.path)

    def __enter__(self):
        self.set_url()

        if self.method == 'GET':
            self.request = requests.get(self.url, headers=self.headers)
        elif self.method == 'POST':
            self.request = requests.post(self.url, headers=self.headers, json=self.data)
        elif self.method == 'PATCH':
            self.request = requests.patch(self.url, headers=self.headers, json=self.data)
        elif self.method == 'DELETE':
            self.request = requests.delete(self.url, headers=self.headers, json=self.data)

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.request = None
