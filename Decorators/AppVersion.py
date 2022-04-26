import json
from flask import request, Response
from functools import wraps


def app_version_header(f):
    @wraps(f)
    def decoration(*args, **kwargs):
        if request.headers.get('App-Version', None) is not None:
            return f(*args, **kwargs)

        return Response(json.dumps({'status': False, 'result': 'App-Version header missing'}),
                        status=400,
                        mimetype='application/json')
    return decoration
