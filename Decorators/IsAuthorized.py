import functools
import json
import Configuration
from uuid import UUID
from flask import Response, request
from GenericFunctions.AESCipher import AESCipher


class IsAuthorized:
    """ Usage:

        @IsAuthorized
        def example(request):
            <method body>
    """

    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func

    def __call__(self, *args, **kwargs):
        # Check if an authorization header is set. The authorization validity checked on the upstream server
        jwt_token = request.headers.get('AUTHORIZATION', None)
        if jwt_token is not None:
            return self.func(*args, **kwargs)

        # Access is not allowed, abort with 401
        return Response(json.dumps({'status': False, 'result': 'Access forbidden'}),
                        status=401,
                        mimetype='application/json')
