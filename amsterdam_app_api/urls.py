""" Routes configuration
"""
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from amsterdam_app_api.views import views_modules


schema_view = get_schema_view(
    openapi.Info(
        title="Amsterdam APP Module: Modules",
        default_version='v1',
        description="API backend server for: Modules"
    ),
    public=True,
    permission_classes=([permissions.AllowAny])
)

""" Base path: /api/v1
"""

urlpatterns = [
    # Swagger (drf-yasg framework)
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^apidocs/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Path to obtain a new access and refresh token (refresh token expires after 24h)
    path('token/access', csrf_exempt(TokenObtainPairView.as_view()), name='token_obtain_pair'),
    path('token/refresh', csrf_exempt(TokenRefreshView.as_view()), name='token_refresh'),

    # Legacy API app-version < 0.28.0
    path('modules_for_app', csrf_exempt(views_modules.modules_for_app_get)),

    # Modules
    path('modules_app_versions', csrf_exempt(views_modules.modules_app_versions)),
    path('modules_by_app', csrf_exempt(views_modules.modules_by_app)),

    # End-points from https://amsterdam-app.stoplight.io/docs/amsterdam-app/
    path('module/<str:slug>/version/<str:version>/status', csrf_exempt(views_modules.module_version_status)),
    path('module/<str:slug>/version/<str:version>', csrf_exempt(views_modules.module_version)),
    path('module', csrf_exempt(views_modules.module)),
    path('module/<str:slug>', csrf_exempt(views_modules.module_slug)),
    path('module/<str:slug>/version', csrf_exempt(views_modules.post_module_version)),
    path('modules/latest', csrf_exempt(views_modules.modules_latest)),

    path('release', csrf_exempt(views_modules.post_release)),
    path('release/<str:version>', csrf_exempt(views_modules.release)),
    path('releases', csrf_exempt(views_modules.get_releases))
]
