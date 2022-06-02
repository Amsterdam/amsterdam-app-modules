import os
import requests
import socket
import time
import json
from unittest.mock import patch
from WSGIServer.app import APIServer


def wait_for_provider_is_alive():
    for i in range(3):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)
                s.connect(('127.0.0.1', 8001))
                return True
        except Exception as error:
            time.sleep(0.2)
    return False


@patch('builtins.print')
def test_apidocs(mock_print):
    os.environ['HOST'] = '127.0.0.1'
    os.environ['PORT'] = '8001'
    os.environ['AES_SECRET'] = 'mock'
    os.environ['DEBUG'] = 'false'
    with APIServer() as server:
        if wait_for_provider_is_alive():
            result = requests.get('http://127.0.0.1:8001/apispec_1.json')

    assert isinstance(json.loads(result.text), dict)
    assert result.status_code == 200

