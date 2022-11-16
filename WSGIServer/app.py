import threading
import time
import Configuration
from flask import Flask
from flask_cors import CORS
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
    "basePath": "",
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
    def __init__(self):
        self.logger = Configuration.environment['logger']
        self.debug = Configuration.environment['DEBUG']
        self.ip = Configuration.environment['flask']['HOST']
        self.port = Configuration.environment['flask']['PORT']
        self.http_server = None
        self.app = Flask('Amsterdam-App-Module Server on port: {port}'.format(port=self.port))
        cors = CORS(self.app, resources={r"/api/v1/*": {"origins": "*"}})
        self.thread = None
        Swagger(self.app, template=template, config={"specs_route": "/api/v1/apidocs/"}, merge=True)

    def __enter__(self):
        self.thread = threading.Thread(target=self.run)
        self.thread.start()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.stop()

    def run(self):
        self.logger.info('Server is listing on port: {port}'.format(port=self.port))
        self.logger.info('API-DOCS: http://{}:{}/api/v1/apidocs'.format(self.ip, self.port))
        self.app.config['JSON_SORT_KEYS'] = True
        self.app.config['TEMPLATES_AUTO_RELOAD'] = True
        self.app.config['SECRET_KEY'] = str(time.time())

        self.app.config['DEBUG'] = self.debug
        self.app.config['SESSION_COOKIE_HTTPONLY'] = True
        self.app.config['REMEMBER_COOKIE_HTTPONLY'] = True
        self.app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'
        self.app.debug = True
        self.app.register_blueprint(routes, url_prefix='')

        self.http_server = WSGIServer(self.app, host=self.ip, port=self.port)
        self.http_server.start()

    def stop(self):
        try:
            self.http_server.stop()
        except AttributeError:
            pass

