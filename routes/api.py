from . import routes
from APIDocs.APIDocs import APIDocs
from Decorators.IsReachable import is_reachable
from Decorators.AppVersion import app_version_header
from flasgger import swag_from
from flask import request, abort, Response
import json


def validation_error_inform_error(err, data, schema):
    response = {
        "status": False,
        "result": {
            'error': str(err.message),
            'request_body': data,
            'schema': schema['properties'],
            'required': schema['required']
        }
    }
    abort(Response(json.dumps(response), status=400, mimetype='application/json'))


@routes.route('/module', methods=['POST'])
@swag_from(APIDocs.module_post, validation=True, validation_error_handler=validation_error_inform_error)
@is_reachable
def module_post():
    data = request.json
    return {'status': True, 'result': 'A valid request body was accepted'}


@routes.route('/module', methods=['PATCH'])
@swag_from(APIDocs.module_patch, validation=True, validation_error_handler=validation_error_inform_error)
@is_reachable
def module_patch():
    data = request.json
    return {'status': True, 'result': 'A valid request body was accepted'}


@routes.route('/modules/order', methods=['POST', 'PATCH'])
@swag_from(APIDocs.module_order, validation=True, validation_error_handler=validation_error_inform_error)
@is_reachable
def modules_order():
    data = request.json
    return {'status': True, 'result': 'A valid request body was accepted'}


@routes.route('/modules', methods=['GET'])
@swag_from(APIDocs.modules)
@app_version_header
@is_reachable
def modules():
    return {'status': True, 'result': 'A valid header was accepted'}
