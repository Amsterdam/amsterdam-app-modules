""" Unittest for handling proxy requests
"""

import uuid
import socket
import time
from unittest import TestCase
import Configuration
from GenericFunctions.AESCipher import AESCipher
from GenericFunctions.ProxyRequest import ProxyRequest
from MockBackendServer.MockBackendServer import MockBackendServer


def wait_for_provider_is_alive(host, port):
    """ Helper function for checking if the mock-server is alive
    :param host:
    :param port:
    :return: boolean
    """
    for _ in range(3):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)
                s.connect((host, port))
                return True
        except ConnectionError:
            time.sleep(1)
    return False


def test_get():
    """ Test modules GET request
    :return: void
    """
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000

    with MockBackendServer(pact=False):
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules?slug=mock', method='GET') as req:
                req.set_result()
                result = req.response.json

            expected_result = {
                'result': [
                    {
                        'description': 'string',
                        'icon': 'string',
                        'slug': 'string',
                        'title': 'string',
                        'version': 'string'
                    }
                ],
                'status': True
            }

            TestCase().assertDictEqual(result, expected_result)
        else:
            assert False


def test_post():
    """ Test POST method to modules api
    :return: void
    """
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000

    identifier = str(uuid.uuid4())
    secret = AESCipher(identifier, Configuration.environment['AES_SECRET']).encrypt()

    with MockBackendServer():
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules', method='POST', data={}, authorization_header=secret) as req:
                req.set_result()
                result = req.response.json

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False


def test_patch():
    """ Test PATCH method to modules api
    :return: void
    """
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000

    identifier = str(uuid.uuid4())
    secret = AESCipher(identifier, Configuration.environment['AES_SECRET']).encrypt()

    with MockBackendServer():
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules', method='PATCH', data={}, authorization_header=secret) as req:
                req.set_result()
                result = req.response.json

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False


def test_delete():
    """ Test DELETE method to modules api
    :return: void
    """
    Configuration.environment['AES_SECRET'] = 'mock'
    Configuration.environment['TARGET'] = '127.0.0.1'
    Configuration.environment['TARGET_PORT'] = 8000

    identifier = str(uuid.uuid4())
    secret = AESCipher(identifier, Configuration.environment['AES_SECRET']).encrypt()

    with MockBackendServer():
        if wait_for_provider_is_alive(Configuration.environment['TARGET'], Configuration.environment['TARGET_PORT']):
            with ProxyRequest('/api/v1/modules', method='DELETE', data={}, authorization_header=secret) as req:
                req.set_result()
                result = req.response.json

            TestCase().assertDictEqual(result, {"result": "string", "status": True})
        else:
            assert False
