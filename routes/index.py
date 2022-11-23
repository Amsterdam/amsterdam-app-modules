""" Routes for serving the web gui interface of the modules and versioning system
"""

import os
from flask import Response, abort
from flask import Blueprint
import Configuration


web = Blueprint('web', __name__)


@web.route('/')
@web.route('/<path:path>')
def index(*args, **kwargs):
    """ Main page (index.html)
    :param args:
    :param kwargs:
    :return: http response with html doc
    """
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/index.html'.format(cwd=cwd)
    if os.path.isfile(file):
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='text/html')
    return abort(404)


@web.route('/<filename>')
def index_filename(filename):
    """ Images route
    :param filename:
    :return: http response
    """
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/{filename}'.format(cwd=cwd, filename=filename)
    extension = file.split('.')[-1]

    if not os.path.isfile(file):
        return abort(404)

    if extension in ['svg']:
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='image/svg+xml')
    else:
        with open(file, 'rb') as f:
            content = f.read()
            return Response(content, mimetype=f'image/{extension}')


@web.route('/favicon.ico')
def favicon():
    """ favicon route
    :return: favicon.ico
    """
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/favicon.ico'.format(cwd=cwd)
    if os.path.isfile(file):
        with open(file, 'rb') as f:
            content = f.read()
            return Response(content, mimetype='image/x-icon')
    return abort(404)


@web.route('/static/css/<filename>')
def css_files(filename):
    """ CSS route
    :param filename:
    :return: http response (css)
    """
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/static/css/{filename}'.format(cwd=cwd, filename=filename)
    if os.path.isfile(file):
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='text/css')
    return abort(404)


@web.route('/static/js/<filename>')
def js_files(filename):
    """ Javascript route
    :param filename:
    :return: http response with js files
    """
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/static/js/{filename}'.format(cwd=cwd, filename=filename)
    if os.path.isfile(file):
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='text/javascript')
    return abort(404)


@web.route('/static/media/<filename>')
def img_files(filename):
    """ Images route
    :param filename:
    :return: http response with image file
    """
    cwd = Configuration.cwd
    file = '{cwd}/modules-fe/build/static/media/{filename}'.format(cwd=cwd, filename=filename)
    extension = file.split('.')[-1]

    if not os.path.isfile(file):
        return abort(404)

    if extension in ['svg']:
        with open(file, 'r') as f:
            content = f.read()
            return Response(content, mimetype='image/svg+xml')
    else:
        with open(file, 'rb') as f:
            content = f.read()
            return Response(content, mimetype=f'image/{extension}')
