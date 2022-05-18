import os
import socket
import time
import Configuration
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
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000

    with MockBackendServer(pact=False):
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules?slug=mock', method='GET') as req:
                req.set_result()
                result = req.response.json

            expected_result = {
                'result': [{'description': 'string', 'icon': 'string', 'slug': 'string', 'title': 'string', 'version': 'string'}],
                'status': True
            }

            TestCase().assertDictEqual(result, expected_result)
        else:
            assert False is True


def test_post():
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000
    with MockBackendServer():
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules', method='POST', data={}) as req:
                req.set_result()
                result = req.response.json

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False is True


def test_patch():
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000
    with MockBackendServer():
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules', method='PATCH', data={}) as req:
                req.set_result()
                result = req.response.json

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False is True


def test_delete():
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000
    with MockBackendServer():
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules', method='DELETE', data={}) as req:
                req.set_result()
                result = req.response.json

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False is True
