""" Test for AppVersion headers check
"""

from unittest import TestCase
from flask import Flask
from mock_functions import FooBar
from Decorators.AppVersion import app_version_header

app = Flask(__name__)


def test_header_set():
    """ Test on appVersion header
    :return: void
    """
    @app_version_header
    def foobar():
        """ dummy function
        :return: boolean
        """
        return True

    with app.test_request_context() as context:
        context.request.headers = {'appVersion': 'mock'}
        result = foobar()

    assert result is True


def test_header_not_set():
    """ test missing appVersion header
    :return:
    """
    with app.test_request_context():
        dummy = FooBar()
        result = dummy.appversion()

    assert result.status == '400 BAD REQUEST'
    assert result.status_code == 400
    TestCase().assertDictEqual(result.json, {'status': False, 'result': 'App-Version header missing'})
