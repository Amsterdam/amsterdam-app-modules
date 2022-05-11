import os
import uuid
from Decorators.IsAuthorized import IsAuthorized
from GenericFunctions.AESCipher import AESCipher
from flask import Flask
from unittest import TestCase

app = Flask(__name__)


def test_authorized():
    @IsAuthorized
    def foo():
        return True

    os.environ['AES_SECRET'] = 'mock'
    id = str(uuid.uuid4())
    secret = AESCipher(id, os.getenv('AES_SECRET')).encrypt()

    with app.test_request_context() as context:
        context.request.headers = {'AUTHORIZATION': secret}
        result = foo()

    assert result is True


def test_unauthorized():
    @IsAuthorized
    def foo():
        return True

    os.environ['AES_SECRET'] = 'mock'

    with app.test_request_context() as context:
        context.request.headers = {'AUTHORIZATION': 'foo'}
        result = foo()

    assert result.status == '401 UNAUTHORIZED'
    assert result.status_code == 401
    TestCase().assertDictEqual(result.json, {'status': False, 'result': 'Access forbidden'})
