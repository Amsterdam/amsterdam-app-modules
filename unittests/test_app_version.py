from Decorators.AppVersion import app_version_header
from flask import Flask
from unittest import TestCase

app = Flask(__name__)


def test_header_set():
    @app_version_header
    def foo():
        return True

    with app.test_request_context() as context:
        context.request.headers = {'appVersion': 'mock'}
        result = foo()

    assert result is True


def test_header_not_set():
    @app_version_header
    def foo():
        return True

    with app.test_request_context():
        result = foo()

    assert result.status == '400 BAD REQUEST'
    assert result.status_code == 400
    TestCase().assertDictEqual(result.json, {'status': False, 'result': 'App-Version header missing'})
