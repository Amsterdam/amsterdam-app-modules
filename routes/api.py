import json
from . import routes
from APIDocs.APIDocs import APIDocs
from Decorators.AppVersion import app_version_header
from Decorators.IsAuthorized import IsAuthorized
from flasgger import swag_from
from flask import request, abort, Response
from GenericFunctions.ProxyRequest import ProxyRequest


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


@routes.route('/api/v1/get-token', methods=['POST'])
@swag_from(APIDocs.get_token)
def get_token():
    data = request.json
    with ProxyRequest('/api/v1/get-token/', 'POST', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/refresh-token', methods=['POST'])
@swag_from(APIDocs.refresh_token)
def refresh_token():
    data = request.json
    with ProxyRequest('/api/v1/refresh-token/', 'POST', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules', methods=['GET'])
@swag_from(APIDocs.modules_get)
def modules_get():
    url = '/api/v1/modules?slug={slug}'.format(slug=request.args.get('slug'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules', methods=['POST'])
@swag_from(APIDocs.modules_post, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_post():
    data = request.json
    authorization = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules', 'POST', data=data, authorization_header=authorization) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules', methods=['PATCH'])
@swag_from(APIDocs.modules_patch, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_patch():
    data = request.json
    with ProxyRequest('/api/v1/modules', 'PATCH', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules', methods=['DELETE'])
@swag_from(APIDocs.modules_delete, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_delete():
    data = request.json
    with ProxyRequest('/api/v1/modules', 'DELETE', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_by_app', methods=['GET'])
@swag_from(APIDocs.modules_by_app_get)
def modules_by_app_get():
    url = '/api/v1/modules_by_app?appVersion={appVersion}'.format(appVersion=request.args.get('appVersion'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_by_app', methods=['POST'])
@swag_from(APIDocs.modules_by_app_post, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_by_app_post():
    data = request.json
    with ProxyRequest('/api/v1/modules_by_app', 'POST', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_by_app', methods=['PATCH'])
@swag_from(APIDocs.modules_by_app_patch, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_by_app_patch():
    data = request.json
    with ProxyRequest('/api/v1/modules_by_app', 'PATCH', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_by_app', methods=['DELETE'])
@swag_from(APIDocs.modules_by_app_delete, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_by_app_delete():
    data = request.json
    with ProxyRequest('/api/v1/modules_by_app', 'DELETE', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_order', methods=['GET'])
@swag_from(APIDocs.module_order_get)
@app_version_header
def module_order_get():
    url = '/api/v1/modules_order?appVersion={appVersion}'.format(appVersion=request.headers.get('appVersion'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_order', methods=['POST'])
@swag_from(APIDocs.module_order_post, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_order_post():
    data = request.json
    with ProxyRequest('/api/v1/modules_order', request.method, data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_order', methods=['PATCH'])
@swag_from(APIDocs.module_order_patch, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def module_order_patch():
    data = request.json
    with ProxyRequest('/api/v1/modules_order', request.method, data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_order', methods=['DELETE'])
@swag_from(APIDocs.module_order_delete, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def module_order_delete():
    data = request.json
    with ProxyRequest('/api/v1/modules_order', request.method, data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_for_app', methods=['GET'])
@swag_from(APIDocs.modules_for_app_get)
def modules_for_app_get():
    url = '/api/v1/modules_for_app?appVersion={appVersion}'.format(appVersion=request.headers.get('appVersion'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@routes.route('/api/v1/modules_app_versions', methods=['GET'])
@swag_from(APIDocs.modules_app_versions)
def modules_all():
    url = '/api/v1/modules_app_versions'
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response
