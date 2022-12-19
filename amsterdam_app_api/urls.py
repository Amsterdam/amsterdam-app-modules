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
    permission_classes=(permissions.AllowAny,),
)

""" Base path: /api/v1
"""

urlpatterns = [
    # Swagger (drf-yasg framework)
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^apidocs/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Path to obtain a new access and refresh token (refresh token expires after 24h)
    path('get-token/', csrf_exempt(TokenObtainPairView.as_view()), name='token_obtain_pair'),

    # Submit your refresh token to this path to obtain a fresh access-token
    path('refresh-token/', csrf_exempt(TokenRefreshView.as_view()), name='token_refresh'),

    # Modules
    path('modules_app_versions', csrf_exempt(views_modules.modules_app_versions)),
    path('modules_order', csrf_exempt(views_modules.module_order)),
    path('module', csrf_exempt(views_modules.module)),
    path('modules', csrf_exempt(views_modules.modules)),
    path('modules_by_app', csrf_exempt(views_modules.modules_by_app)),
    path('modules_by_app/status', csrf_exempt(views_modules.modules_enable)),
    path('modules_for_app', csrf_exempt(views_modules.modules_for_app_get)),
    path('modules/latest', csrf_exempt(views_modules.modules_latest))
]
