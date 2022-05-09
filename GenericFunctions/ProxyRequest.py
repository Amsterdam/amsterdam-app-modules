import os
import requests
from GenericFunctions.AESCipher import AESCipher
from uuid import uuid4


class ProxyRequest:
    def __init__(self, path, method, data=None):
        self.path = path
        self.method = method
        self.data = data
        self.request = None
        self.url = None
        self.token = AESCipher(str(uuid4()), os.getenv('AES_SECRET')).encrypt()
        self.headers = {'Accept': 'application/json', 'IngestAuthorization': self.token}

    def set_result(self):
        if self.request.status_code == 403:
            return {'status': False, 'result': self.request.reason}
        else:
            self.request.headers['Content-Type'] = 'application/json; charset=utf-8'
            return self.request.json()

    def set_url(self):
        host = os.getenv('TARGET', 'api-server')
        port = int(os.getenv('TARGET_PORT', 8000))
        self.url = 'http://{host}:{port}{path}'.format(host=host, port=port, path=self.path)
        if port == 443:
            self.url = 'https://{host}{path}'.format(host=host, path=self.path)

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


if __name__ == '__main__':
    with ProxyRequest('/api/v1/project/warning/image', 'POST', {'test': True}) as pr:
        result = pr.set_result()
    pass
