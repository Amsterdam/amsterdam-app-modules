""" Routes for all module API's
"""

import json
from flasgger import swag_from
from flask import request, abort, Response
from flask import Blueprint
from APIDocs.APIDocs import APIDocs
from Decorators.AppVersion import app_version_header
from Decorators.IsAuthorized import IsAuthorized
from GenericFunctions.ProxyRequest import ProxyRequest


api = Blueprint('api', __name__)


def validation_error_inform_error(err, data, schema):
    """ Generic error response
    :param err: object
    :param data: request body
    :param schema: swagger schema
    :return: http response
    """
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


@api.route('/api/v1/get-token', methods=['POST'])
@swag_from(APIDocs.get_token)
def get_token():
    """ Request token from upstream server
    :return: http response
    """
    data = request.json
    with ProxyRequest('/api/v1/get-token/', 'POST', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/refresh-token', methods=['POST'])
@swag_from(APIDocs.refresh_token)
def refresh_token():
    """ Request refresh-token from upstream server
    :return: http response
    """
    data = request.json
    with ProxyRequest('/api/v1/refresh-token/', 'POST', data=data) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/module', methods=['GET'])
@swag_from(APIDocs.module_get)
def module_get():
    """ Get module by slug
    :return: http response
    """
    slug = request.args.get('slug')
    version = request.args.get('version')
    url = '/api/v1/module?slug={slug}&version={version}'.format(slug=slug, version=version)
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules', methods=['GET'])
@swag_from(APIDocs.modules_get)
def modules_get():
    """ Get modules by slug
    :return: http response
    """
    url = '/api/v1/modules?slug={slug}'.format(slug=request.args.get('slug'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules', methods=['POST'])
@swag_from(APIDocs.modules_post, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_post():
    """ Create new module
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules', 'POST', data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules', methods=['PATCH'])
@swag_from(APIDocs.modules_patch, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_patch():
    """ Patch modules
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules', 'PATCH', data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules', methods=['DELETE'])
@swag_from(APIDocs.modules_delete, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_delete():
    """ Remove modules
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules', 'DELETE', data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_by_app', methods=['GET'])
@swag_from(APIDocs.modules_by_app_get)
def modules_by_app_get():
    """ Get modules for appVersion
    :return: http response
    """
    url = '/api/v1/modules_by_app?appVersion={appVersion}'.format(appVersion=request.args.get('appVersion'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_by_app', methods=['POST'])
@swag_from(APIDocs.modules_by_app_post, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_by_app_post():
    """ Set modules for appVersion
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules_by_app', 'POST', data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_by_app', methods=['PATCH'])
@swag_from(APIDocs.modules_by_app_patch, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_by_app_patch():
    """ Patch modules for appVersion
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules_by_app', 'PATCH', data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_by_app', methods=['DELETE'])
@swag_from(APIDocs.modules_by_app_delete, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_by_app_delete():
    """ Remove modules for appVersion
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules_by_app', 'DELETE', data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_order', methods=['GET'])
@swag_from(APIDocs.module_order_get)
@app_version_header
def module_order_get():
    """ Get order of modules for appVersion
    :return: http response
    """
    url = '/api/v1/modules_order?appVersion={appVersion}'.format(appVersion=request.headers.get('appVersion'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_order', methods=['POST'])
@swag_from(APIDocs.module_order_post, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def modules_order_post():
    """ Set order of modules for appVersion
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules_order', request.method, data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_order', methods=['PATCH'])
@swag_from(APIDocs.module_order_patch, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def module_order_patch():
    """ Patch order of modules for appVersion
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules_order', request.method, data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_order', methods=['DELETE'])
@swag_from(APIDocs.module_order_delete, validation=True, validation_error_handler=validation_error_inform_error)
@IsAuthorized
def module_order_delete():
    """ Delete order of modules for appVersion
    :return: http response
    """
    data = request.json
    auth = request.headers.get('AUTHORIZATION')
    with ProxyRequest('/api/v1/modules_order', request.method, data=data, authorization_header=auth) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_for_app', methods=['GET'])
@swag_from(APIDocs.modules_for_app_get)
def modules_for_app_get():
    """ Get modules for appVersion
    :return: http response
    """
    url = '/api/v1/modules_for_app?appVersion={appVersion}'.format(appVersion=request.headers.get('appVersion'))
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response


@api.route('/api/v1/modules_app_versions', methods=['GET'])
@swag_from(APIDocs.modules_app_versions)
def modules_all():
    """ Get all modules
    :return: http response
    """
    url = '/api/v1/modules_app_versions'
    with ProxyRequest(url, request.method) as proxy_request:
        proxy_request.set_result()
    return proxy_request.response
