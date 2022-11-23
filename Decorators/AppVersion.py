""" Decorator for catching the appVersion from request header
"""

import json
from functools import wraps
from flask import request, Response


def app_version_header(func):
    """ Function wrapper for checking header
    :param func:
    :return: function or http-response
    """
    @wraps(func)
    def decoration(*args, **kwargs):
        if request.headers.get('appVersion', None) is not None:
            return func(*args, **kwargs)

        return Response(json.dumps({'status': False, 'result': 'App-Version header missing'}),
                        status=400,
                        mimetype='application/json')
    return decoration
