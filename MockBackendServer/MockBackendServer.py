""" Mock server implementation
"""

import threading
import socket
import click
from flask import Flask, jsonify, request


class MockBackendServer:
    """ Mock server which provides the backend servers API responses
    """
    def __init__(self, pact=True):
        self.pact = pact
        self.port = 8000
        self.http_server = None
        self.monkey_patch()
        self.app = Flask('Flask Server on port: {port}'.format(port=self.port))
        self.thread = threading.Thread(target=self.run)
        click.echo = self.echo
        click.secho = self.secho
        self.bad_request = {
            "result": {
                "error": "string",
                "request_body": {},
                "required": [
                "string"
                ],
                "schema": {}
            },
            "status": True
        }
        self.unauthorized = {
            "status": False,
            "result": "Access forbidden"
        }

    @staticmethod
    def secho(text, file=None, nl=None, err=None, color=None, **styles):
        """ Mock secho """
        return

    @staticmethod
    def echo(text, file=None, nl=None, err=None, color=None, **styles):
        """ Mock echo """
        return

    @staticmethod
    def monkey_patch():
        """ Monkey patch socket connection
        :return:
        """
        socket.socket._bind = socket.socket.bind

        def my_socket_bind(self, *args, **kwargs):
            self.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            return socket.socket._bind(self, *args, **kwargs)

        socket.socket.bind = my_socket_bind

    def run(self):
        """ Backend-server run method
        :return:
        """

        def get_json(req):
            try:
                return req.json
            except Exception:
                return None

        def get_header(req):
            ingest_authorization_header = req.headers.get('IngestAuthorization', None)
            authorization_header = req.headers.get('Authorization', None)
            app_version_header = req.headers.get('appVersion', None)
            return any([ingest_authorization_header, authorization_header, app_version_header])

        @self.app.route('/api/v1/module_order', methods=['GET'])
        def api_v1_module_order_get():
            if self.pact is True:
                if not get_header(request):
                    result = {"result": "string", "status": False}
                    status_code = 400
                else:
                    result = {'status': True, 'result': ['string']}
                    status_code = 200
            else:
                if request.args.get('appVersion', None) is None:
                    result = {"result": "string", "status": False}
                    status_code = 400
                else:
                    result = {'status': True, 'result': ['string']}
                    status_code = 200

            return jsonify(result), status_code

        @self.app.route('/api/v1/module_order', methods=['POST', 'PATCH', 'DELETE'])
        def api_v1_module_order_ppd():
            if not get_header(request):
                result = self.unauthorized
                status_code = 401
            elif get_json(request) is None:
                result = self.bad_request
                status_code = 400
            else:
                result = {'status': True, 'result': 'string'}
                status_code = 200
            return jsonify(result), status_code

        @self.app.route('/api/v1/modules', methods=['GET'])
        def api_v1_modules_get():
            if request.args.get('slug', None) is None:
                result = self.bad_request
                status_code = 400
            else:
                result = {
                    "result": [
                        {
                            "description": "string",
                            "icon": "string",
                            "slug": "string",
                            "title": "string",
                            "version": "string"
                        }
                    ],
                    "status": True
                }
                status_code = 200
            return jsonify(result), status_code

        @self.app.route('/api/v1/modules', methods=['POST', 'PATCH', 'DELETE'])
        def api_v1_modules_ppd():
            if not get_header(request):
                result = self.unauthorized
                status_code = 401
            elif get_json(request) is None:
                result = self.bad_request
                status_code = 400
            else:
                result = {'status': True, 'result': 'string'}
                status_code = 200
            return jsonify(result), status_code

        @self.app.route('/api/v1/modules_by_app', methods=['GET'])
        def api_v1_modules_by_app_get():
            if request.args.get('appVersion', None) is None:
                result = self.bad_request
                status_code = 400
            else:
                result = {
                    "result": [
                        {
                            "appVersion": "string",
                            "moduleSlug": "string",
                            "moduleVersion": "string",
                            "status": 0
                        }
                    ],
                    "status": True
                }
                status_code = 200
            return jsonify(result), status_code

        @self.app.route('/api/v1/modules_by_app', methods=['POST', 'PATCH', 'DELETE'])
        def api_v1_modules_by_app_ppd():
            if not get_header(request):
                result = self.unauthorized
                status_code = 401
            elif get_json(request) is None:
                result = self.bad_request
                status_code = 400
            else:
                result = {'status': True, 'result': 'string'}
                status_code = 200
            return jsonify(result), status_code

        @self.app.route('/api/v1/modules_for_app', methods=['GET'])
        def api_v1_modules_for_app_get():
            if self.pact is True:
                if not get_header(request):
                    result = {"result": "string", "status": False}
                    status_code = 400
                else:
                    result = {
                        "result": [
                            {
                                "description": "string",
                                "icon": "string",
                                "slug": "string",
                                "status": 0,
                                "title": "string"
                            }
                        ],
                        "status": True
                    }
                    status_code = 200
            else:
                if request.args.get('appVersion', None) is None:
                    result = {"result": "string", "status": False}
                    status_code = 400
                else:
                    result = {
                        "result": [
                            {
                                "description": "string",
                                "icon": "string",
                                "slug": "string",
                                "status": 0,
                                "title": "string"
                            }
                        ],
                        "status": True
                    }
                    status_code = 200
            return jsonify(result), status_code

        self.app.run(host='0.0.0.0', port=8000)

    def __enter__(self):
        self.thread.setDaemon(True)
        self.thread.start()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass
