""" Decorator for routes to prevent unauthorized access
"""
import functools
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidSignatureError
from django.http.response import HttpResponse
from amsterdam_app_backend.settings import SECRET_KEY


class IsAuthorized:
    """ This class is a decorator for APIs specific for project managers. It will check if a correct HTTP_TOKEN is set.
        If the token is valid, the calling function will be executed. If the token is invalid, the HTTP request will
        be aborted with a 401 response

        Usage:

        @isAuthorized
        def example(request):
            <method body>
    """

    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func

    def __call__(self, *args, **kwargs):
        try:
            request = args[0]
            jwt_token = request.META.get('HTTP_AUTHORIZATION', None)
            header_jwt_token = request.META.get('headers', {}).get('HTTP_AUTHORIZATION', None)

            jwtauthorization = header_jwt_token.encode('utf-8') if header_jwt_token is not None else jwt_token

            if jwtauthorization is not None:
                if self.is_valid_jwt_token(jwt_encrypted_token=jwtauthorization):
                    return self.func(*args, **kwargs)
        except Exception as error:  # pragma: no cover
            return HttpResponse(f'Server error: {error}', status=500)

        # Access is not allowed, abort with 401
        return HttpResponse('Unauthorized', status=401)

    @staticmethod
    def is_valid_jwt_token(jwt_encrypted_token=None):
        """ Check if jwt token is valid """
        try:
            token_dict = jwt.decode(jwt_encrypted_token, SECRET_KEY, algorithms=["HS256"])
            return isinstance(token_dict, dict)
        except (InvalidSignatureError, ExpiredSignatureError, Exception):  # pragma: no cover
            return False
