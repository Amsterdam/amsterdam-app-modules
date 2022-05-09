import os
import functools
import json
from uuid import UUID
from flask import Response, request
from GenericFunctions.AESCipher import AESCipher


class IsAuthorized:
    """ This class is a decorator for APIs specific for project managers. It will check if a correct HTTP_TOKEN is set.
        If the token is valid, the calling function will be executed. If the token is invalid, the HTTP request will
        be aborted with a 401 response

        Usage:

        @IsAuthorized
        def example(request):
            <method body>
    """

    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func

    def __call__(self, *args, **kwargs):
        try:
            http_authorization = request.headers.get('AUTHORIZATION', None)

            if http_authorization is not None:
                if self.is_valid_authorization_token(encrypted_token=http_authorization):
                    return self.func(*args, **kwargs)
        except Exception as error:  # pragma: no cover
            pass

        # Access is not allowed, abort with 401
        return Response(json.dumps({'status': False, 'result': 'Access forbidden'}),
                        status=401,
                        mimetype='application/json')

    @staticmethod
    def is_valid_authorization_token(encrypted_token=None):
        try:
            token = UUID(AESCipher(encrypted_token, os.getenv('AES_SECRET')).decrypt(), version=4)
            return isinstance(token, UUID)
        except:
            return False
