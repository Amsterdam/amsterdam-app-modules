"""
amsterdam_app_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include, re_path
from amsterdam_app_backend import views

urlpatterns = [
    #
    # MAIN API for module backend
    #

    path('api/v1/', include('amsterdam_app_api.urls')),

    #
    # WEB INTERFACE (react website for module and version management)
    #

    # CSS files
    re_path(r'^static/css/.*$', views.css_files),

    # JS files
    re_path(r'^static/js/.*$', views.js_files),

    # ASSETS files
    re_path(r'^static/media/.*$', views.assets),

    # FAVICON
    re_path(r'^favicon.ico$', views.favicon),

    # Static files
    re_path(r'^static/.*$', views.static),

    # Main index file
    re_path(r'^.*$', views.index)
]
