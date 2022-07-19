import Configuration
import os
from . import routes
from flask import Response, abort


@routes.route('/')
def index():
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/index.html'.format(cwd=cwd)
    if os.path.isfile(file):
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='text/html')
    abort(404)


@routes.route('/favicon.ico')
def favicon():
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/favicon.ico'.format(cwd=cwd)
    if os.path.isfile(file):
        with open(file, 'rb') as f:
            content = f.read()
            return Response(content, mimetype='image/x-icon')
    abort(404)


@routes.route('/static/css/<filename>')
def css_files(filename):
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/static/css/{filename}'.format(cwd=cwd, filename=filename)
    if os.path.isfile(file):
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='text/css')
    abort(404)


@routes.route('/static/js/<filename>')
def js_files(filename):
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/static/js/{filename}'.format(cwd=cwd, filename=filename)
    if os.path.isfile(file):
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='text/javascript')
    abort(404)


@routes.route('/static/media/<filename>')
def img_files(filename):
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/static/media/{filename}'.format(cwd=cwd, filename=filename)
    extension = file.split('.')[-1]

    if not os.path.isfile(file):
        abort(404)

    elif extension in ['svg']:
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='image/svg+xml')
    else:
        with open(file, 'rb') as f:
            content = f.read()
            return Response(content, mimetype=f'image/{extension}')
