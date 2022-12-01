""" All CRUD views for modules, modules order and modules for appversion
"""
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from amsterdam_app_api.models import Modules
from amsterdam_app_api.models import ModulesByApp
from amsterdam_app_api.models import ModuleOrder
from amsterdam_app_api.serializers import ModulesSerializer
from amsterdam_app_api.serializers import ModulesByAppSerializer
from amsterdam_app_api.serializers import ModuleOrderSerializer
from amsterdam_app_api.GenericFunctions.IsAuthorized import IsAuthorized
from amsterdam_app_api.GenericFunctions.Logger import Logger
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_get
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_post
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_module_get
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_get
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_post
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_by_app_get
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_by_app_post
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_by_app_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_by_app_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_for_app_get
from amsterdam_app_api.swagger.swagger_views_modules import as_module_app_versions
from amsterdam_app_api.api_messages import Messages


message = Messages()


@swagger_auto_schema(**as_module_app_versions)
@api_view(['GET'])
def modules_app_versions(request):
    """ GET app versions """
    app_versions = [x['appVersion'] for x in list((ModulesByApp.objects.all().values('appVersion').distinct()))]
    app_versions.sort(reverse=True)
    return Response({'status': True, 'result': app_versions})


@swagger_auto_schema(**as_module_order_get)
@swagger_auto_schema(**as_module_order_post)
@swagger_auto_schema(**as_module_order_patch)
@swagger_auto_schema(**as_module_order_delete)
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def module_order(request):
    """ Module order CRUD, all except GET needs authorization """
    data = Response({'status': False, 'result': 'Unprocessable entity'}, status=422)
    if request.method in ['GET']:
        data = module_order_get(request)

    if request.method in ['POST', 'PATCH', 'DELETE']:
        data = module_order_ppd(request)

    return data


def module_order_get(request):
    """ GET modules order for an appVersion """
    app_version = request.headers.get('appVersion')
    module_order_data = ModuleOrder.objects.filter(appVersion=app_version).first()
    if module_order_data is not None:
        serializer = ModuleOrderSerializer(module_order_data, many=False)
        return Response({'status': True, 'result': serializer.data}, status=200)
    return Response({'status': False, 'result': message.no_record_found}, status=404)


@IsAuthorized
def module_order_ppd(request):
    """ POST, PATCH or DELETE a modules order for an appVersion """
    data = dict(request.data)
    module_order_data = ModuleOrder.objects.filter(appVersion=data.get('appVersion')).first()
    if request.method in ['POST', 'PATCH']:
        if module_order_data is not None:
            ModuleOrder.objects.filter(appVersion=data.get('appVersion')).delete()
        module_order_object = ModuleOrder(**data)
        module_order_object.save()
        return Response({'status': True, 'result': 'Module order updated or created'}, status=200)

    # Delete record
    try:
        data = dict(request.data)
        ModuleOrder.objects.filter(appVersion=data.get('appVersion')).delete()
        return Response({'status': True, 'result': 'Module order deleted'}, status=200)
    except Exception as error:
        logger = Logger()
        logger.error('Module (DELETE): {error}'.format(error=error))
        return Response({'status': False, 'result': str(error)}, status=500)


@swagger_auto_schema(**as_module_get)
@api_view(['GET'])
def module(request):
    """ Get a module by slug and version """
    slug = request.GET.get('slug')
    version = request.GET.get('version')
    modules_data = Modules.objects.filter(slug=slug, version=version).first()
    if modules_data is not None:
        serializer = ModulesSerializer(modules_data, many=False)
        data = serializer.data
        if 'id' in data:
            del data['id']
        return Response({'status': True, 'result': data}, status=200)
    return Response({'status': True, 'result': 'No such module'}, status=404)


@swagger_auto_schema(**as_modules_get)
@swagger_auto_schema(**as_modules_post)
@swagger_auto_schema(**as_modules_patch)
@swagger_auto_schema(**as_modules_delete)
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def modules(request):
    """ CRUD modules (POST, PATCH and DELETE needs authorization) """
    data = Response({'status': False, 'result': 'Unprocessable entity'}, status=422)
    if request.method in ['GET']:
        data = modules_get(request)

    if request.method in ['POST']:
        data = modules_post(request)

    if request.method in ['PATCH']:
        data = modules_patch(request)

    if request.method in ['DELETE']:
        data = modules_delete(request)

    return data


@IsAuthorized
def modules_post(request):
    """ POST modules """
    try:
        data = dict(request.data)
        Modules.objects.create(**data)
        return Response({'status': True, 'result': 'Module created'}, status=200)
    except Exception as error:
        return Response({'status': False, 'result': str(error)}, status=422)


@IsAuthorized
def modules_patch(request):
    """ PATCH modules """
    data = dict(request.data)
    modules_data = Modules.objects.filter(slug=data.get('slug'), version=data.get('version')).first()
    if modules_data is not None:
        modules_data.partial_update(**data)
        return Response({'status': True, 'result': 'Module patched'}, status=200)
    return Response({'status': True, 'result': message.no_record_found}, status=404)


@IsAuthorized
def modules_delete(request):
    """ DELETE modules """
    # TODO Only delete if slug+version doesn't exist in any appVersion

    data = dict(request.data)
    modules_data = Modules.objects.filter(slug=data.get('slug'), version=data.get('version')).first()
    if modules_data is not None:
        modules_data.delete()
        return Response({'status': True, 'result': 'Module deleted'}, status=200)
    return Response({'status': True, 'result': message.no_record_found}, status=404)


def modules_get(request):
    """ Get modules by slug (returns all for given slug) or if the slug is omitted
        return a (distinct slugs) list with the latest (highest) version number
    """
    slug = request.GET.get('slug', None)
    if slug is None:
        modules_data = list(Modules.objects.all().order_by('version'))
        data = {x['slug']: dict(x) for x in ModulesSerializer(modules_data, many=True).data}
        response = [data[x] for x in data]
        # TODO: Sort by title
        return Response({'status': True, 'result': response}, status=200)

    modules_data = list(Modules.objects.filter(slug=slug).all())
    serializer = ModulesSerializer(modules_data, many=True)
    # TODO: Sort by version (reversed, newest on top)
    return Response({'status': True, 'result': serializer.data}, status=200)


@swagger_auto_schema(**as_modules_by_app_get)
@swagger_auto_schema(**as_modules_by_app_post)
@swagger_auto_schema(**as_modules_by_app_patch)
@swagger_auto_schema(**as_modules_by_app_delete)
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def modules_by_app(request):
    """ CRUD modules by app (POST, PATCH and DELETE needs authorization header) """
    data = Response({'status': False, 'result': 'Unprocessable entity'}, status=422)
    if request.method in ['GET']:
        data = modules_by_app_get(request)

    if request.method in ['POST']:
        data = modules_by_app_post(request)

    if request.method in ['PATCH']:
        data = modules_by_app_patch(request)

    if request.method in ['DELETE']:
        data = modules_by_app_delete(request)

    return data

@IsAuthorized
def modules_by_app_post(request):
    """ POST modules by app """
    data = dict(request.data)
    ModulesByApp.objects.create(**data)
    return Response({'status': True, 'result': 'ModuleByApp created'}, status=200)


@IsAuthorized
def modules_by_app_patch(request):
    """ PATCH modules by app """
    data = dict(request.data)
    modules_data = ModulesByApp.objects.filter(moduleSlug=data.get('moduleSlug'),
                                               appVersion=data.get('appVersion')).first()
    if modules_data is not None:
        modules_data.partial_update(**data)
        return Response({'status': True, 'result': 'ModuleByApp patched'}, status=200)
    return Response({'status': True, 'result': message.no_record_found}, status=404)


@IsAuthorized
def modules_by_app_delete(request):
    """ DELETE module by app """
    data = dict(request.data)
    modules_data = ModulesByApp.objects.filter(moduleSlug=data.get('moduleSlug'),
                                               appVersion=data.get('appVersion')).first()
    if modules_data is not None:
        modules_data.delete()
        return Response({'status': True, 'result': 'ModuleByApp deleted'}, status=200)
    return Response({'status': True, 'result': message.no_record_found}, status=404)


def modules_by_app_get(request):
    """ GET module by app """
    app_version = request.GET.get('appVersion')
    modules_data = list(ModulesByApp.objects.filter(appVersion=app_version).all())
    serializer = ModulesByAppSerializer(modules_data, many=True)
    return Response({'status': True, 'result': serializer.data}, status=200)


@swagger_auto_schema(**as_modules_for_app_get)
@api_view(['GET'])
def modules_for_app_get(request):
    """ GET module for app (by appVersion header) """
    app_version = request.headers.get('appVersion')
    modules_by_app_data = list(ModulesByApp.objects.filter(appVersion=app_version).all())
    module_order_data = ModuleOrder.objects.filter(appVersion=app_version).first()

    _modules = []
    for module_by_app in modules_by_app_data:
        _module = Modules.objects.filter(slug=module_by_app.moduleSlug).first()
        if _module is not None:
            _modules.append({
                'description': _module.description,
                'icon': _module.icon,
                'slug': _module.slug,
                'status': module_by_app.status,
                'title': _module.title,
                'version': _module.version
            })

    modules_ordered = []
    if module_order_data is not None:
        for slug in module_order_data.order:
            for i in range(len(_modules) - 1, -1, -1):
                if slug == _modules[i]['slug']:
                    modules_ordered.append(_modules[i])
                    _modules.pop(i)

    result = modules_ordered + _modules
    return Response({'status': True, 'result': result}, status=200)
