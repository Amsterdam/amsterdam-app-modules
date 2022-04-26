import Configuration
import json
import socket
import time
from flask import Response
from functools import wraps


def is_reachable(f):
    @wraps(f)
    def decoration(*args, **kwargs):
        timeout = 3
        host = (Configuration.global_parameters['backend_host'], Configuration.global_parameters['backend_port'])

        for i in range(timeout):
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.settimeout(1)
                    s.connect(host)
                return f(*args, **kwargs)
            except Exception as error:
                time.sleep(0.2)

        return Response(json.dumps({'status': False, 'result': 'Gateway timeout'}),
                        status=504,
                        mimetype='application/json')
    return decoration

