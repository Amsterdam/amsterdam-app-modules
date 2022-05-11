import os
import socket
import time
from GenericFunctions.ProxyRequest import ProxyRequest
from MockBackendServer.MockBackendServer import MockBackendServer
from unittest import TestCase


def wait_for_provider_is_alive(host, port):
    for i in range(3):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)
                s.connect((host, port))
                return True
        except Exception as error:
            time.sleep(1)
    return False


def test_get():
    os.environ['AES_SECRET'] = 'mock'
    os.environ['TARGET'] = '127.0.0.1'
    with MockBackendServer(pact=False):
        if wait_for_provider_is_alive('127.0.0.1', 8000):
            with ProxyRequest('/api/v1/modules?slug=mock', method='GET') as req:
                result = req.set_result()

            expected_result = {
                'result': [{'description': 'string', 'icon': 'string', 'slug': 'string', 'title': 'string', 'version': 'string'}],
                'status': True
            }

            TestCase().assertDictEqual(result, expected_result)
        else:
            assert False is True


def test_post():
    os.environ['AES_SECRET'] = 'mock'
    os.environ['TARGET'] = '127.0.0.1'
    with MockBackendServer():
        if wait_for_provider_is_alive('127.0.0.1', 8000):
            with ProxyRequest('/api/v1/modules', method='POST', data={}) as req:
                result = req.set_result()

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False is True


def test_patch():
    os.environ['AES_SECRET'] = 'mock'
    os.environ['TARGET'] = '127.0.0.1'
    with MockBackendServer():
        if wait_for_provider_is_alive('127.0.0.1', 8000):
            with ProxyRequest('/api/v1/modules', method='PATCH', data={}) as req:
                result = req.set_result()

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False is True


def test_delete():
    os.environ['AES_SECRET'] = 'mock'
    os.environ['TARGET'] = '127.0.0.1'
    with MockBackendServer():
        if wait_for_provider_is_alive('127.0.0.1', 8000):
            with ProxyRequest('/api/v1/modules', method='DELETE', data={}) as req:
                result = req.set_result()

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False is True
