""" Unittests for authorization
"""

import uuid
from unittest import TestCase
from flask import Flask
from mock_functions import FooBar
import Configuration
from Decorators.IsAuthorized import IsAuthorized
from GenericFunctions.AESCipher import AESCipher

app = Flask(__name__)


def test_authorized():
    """ Test correct authorization header
    :return:
    """
    @IsAuthorized
    def foobar():
        return True

    Configuration.environment['AES_SECRET'] = 'mock'
    identifier = str(uuid.uuid4())
    secret = AESCipher(identifier, Configuration.environment['AES_SECRET']).encrypt()

    with app.test_request_context() as context:
        context.request.headers = {'AUTHORIZATION': secret}
        result = foobar()

    assert result is True


def test_unauthorized():
    """ Test incorrect authorization header
    :return:
    """
    Configuration.environment['AES_SECRET'] = 'mock'

    with app.test_request_context() as context:
        context.request.headers = {'AUTHORIZATION': None}
        dummy = FooBar()
        result = dummy.authorized()

    assert result.status == '401 UNAUTHORIZED'
    assert result.status_code == 401
    TestCase().assertDictEqual(result.json, {'status': False, 'result': 'Access forbidden'})
