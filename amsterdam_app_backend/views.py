""" Web site routes
"""
import io
import mimetypes
from PIL import Image as PILImage
from django.http import HttpResponse
from amsterdam_app_backend.settings import BASE_DIR


def static(request):
    """ All static data """
    path = request.path
    save_path = path.replace('..', '')
    filepath = '{base_dir}{save_path}'.format(base_dir=BASE_DIR, save_path=save_path)
    mimetype = mimetypes.guess_type(filepath, strict=True)[0]
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        return HttpResponse(content, content_type=mimetype, status=200)
    except Exception:
        pass

    try:
        with open(filepath, 'rb') as f:
            content = f.read()
        return HttpResponse(content, content_type=mimetype, status=200)
    except Exception:
        pass
    return HttpResponse(status=404)


def index(request):
    """ Main page file """
    path = '{base_dir}/static/build'.format(base_dir=BASE_DIR)
    with open('{path}/index.html'.format(path=path), 'r') as f:
        content = f.read()
        return HttpResponse(content, content_type='text/html')


def css_files(request):
    """ CSS files """
    path = '{base_dir}/static/build'.format(base_dir=BASE_DIR)
    with open('{path}/{filename}'.format(path=path, filename=request.path), 'r') as f:
        content = f.read()
        return HttpResponse(content, content_type='text/css')


def js_files(request):
    """ Javascript files """
    path = '{base_dir}/static/build'.format(base_dir=BASE_DIR)
    with open('{path}/{filename}'.format(path=path, filename=request.path), 'r') as f:
        content = f.read()
        return HttpResponse(content, content_type='text/javascript')


def img_files(request):
    """ Images """
    path = '{base_dir}/static/build'.format(base_dir=BASE_DIR)
    with open('{path}/{filename}'.format(path=path, filename=request.path), 'rb') as f:
        data = f.read()
        if '.svg' in request.path:
            return HttpResponse(data, content_type='image/svg+xml')
        buffer = io.BytesIO(data)
        pil_image = PILImage.open(buffer)
        return HttpResponse(data, content_type=PILImage.MIME[pil_image.format])


def favicon(request):
    """ Favicon """
    try:
        with open('{base_dir}/static/favicon.ico'.format(base_dir=BASE_DIR), 'rb') as f:
            content = f.read()
        return HttpResponse(content, content_type='image/x-icon', status=200)
    except Exception:
        pass
    return HttpResponse(status=404)
