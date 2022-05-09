import threading
import time
import os
import Configuration
from flask import Flask
from routes import *
from wsgiserver import WSGIServer
from flasgger import Swagger

template = {
    "swagger": "2.0",
    "info": {
        "title": "Amsterdam App Modules",
        "description": "Modules Registration Server",
        "contact": {
            "responsibleOrganization": "Gemeente Amsterdam",
            "responsibleDeveloper": "Robert Nagtegaal",
            "email": "r.nagtegaal@amsterdam.nl",
            "url": "https://github.com/masikh",
        },
        "version": "1.0.0"
    },
    "host": "{HOST}:{PORT}".format(HOST=Configuration.environment['flask']['HOST'],
                                   PORT=Configuration.environment['flask']['PORT']),
    "basePath": "/api/v1",
    "schemes": [
        "http",
        "https"
    ],
    "securityDefinitions": {
        "APIKeyAuth": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization"
        }
    },
    "security": [
        {
            "APIKeyAuth": []
        }
    ],
    "static_url_path": "/flasgger",
    "specs_route": "/api/v1/apidocs/",
    "description": "Modules Registration Server",
    "operationId": "getmyData"
}


class APIServer:
    def __init__(self, debug=False):
        self.debug = debug
        self.ip = Configuration.environment['flask']['HOST']
        self.port = Configuration.environment['flask']['PORT']
        self.http_server = None
        Configuration.global_parameters = self.__dict__
        Configuration.global_parameters['backend_host'] = os.getenv('TARGET', 'api-server')
        Configuration.global_parameters['backend_port'] = int(os.getenv('TARGET_PORT', 8000))
        self.app = Flask('WSGI-Flask Server on port: {port}'.format(port=self.port))

        Swagger(self.app, template=template, config={"specs_route": "/api/v1/apidocs/"}, merge=True)

        # threading.Thread(target=self.run).start()

    def __enter__(self):
        threading.Thread(target=self.run).start()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.stop()

    def run(self):
        print('Server is listing on port: {port}'.format(port=self.port), flush=True)
        print('API-DOCS: http://{}:{}/api/v1/apidocs'.format(self.ip, self.port), flush=True)
        self.app.config['JSON_SORT_KEYS'] = True
        self.app.config['TEMPLATES_AUTO_RELOAD'] = True
        self.app.config['SECRET_KEY'] = str(time.time())

        self.app.config['DEBUG'] = self.debug
        self.app.config['SESSION_COOKIE_HTTPONLY'] = True
        self.app.config['REMEMBER_COOKIE_HTTPONLY'] = True
        self.app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'
        self.app.debug = True
        self.app.register_blueprint(routes, url_prefix='/api/v1')

        self.http_server = WSGIServer(self.app, host=self.ip, port=self.port)
        self.http_server.start()

    def stop(self):
        self.http_server.stop()
