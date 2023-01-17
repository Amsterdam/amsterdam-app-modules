""" All CRUD views for modules, modules order and modules for appversion
"""
import re
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from amsterdam_app_api.models import Module
from amsterdam_app_api.models import ModuleVersions
from amsterdam_app_api.models import ModulesByApp
from amsterdam_app_api.models import ModuleOrder
from amsterdam_app_api.serializers import ModuleSerializer
from amsterdam_app_api.serializers import ModuleVersionsSerializer
from amsterdam_app_api.serializers import ModulesByAppSerializer
from amsterdam_app_api.serializers import ModuleOrderSerializer
from amsterdam_app_api.GenericFunctions.IsAuthorized import IsAuthorized
from amsterdam_app_api.GenericFunctions.SetFilter import SetFilter
from amsterdam_app_api.GenericFunctions.Sort import Sort
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_get
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_post
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_module_order_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_latest
from amsterdam_app_api.swagger.swagger_views_modules import as_module_post
from amsterdam_app_api.swagger.swagger_views_modules import as_module_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_module_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_get
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_post
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_module_slug_get
from amsterdam_app_api.swagger.swagger_views_modules import as_module_slug_status
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_post
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_enable
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


@swagger_auto_schema(**as_modules_by_app_get)
@api_view(['GET'])
def modules_by_app(request):
    """ Get modules by app
    """
    app_version = request.GET.get('appVersion')
    modules_data = list(ModulesByApp.objects.filter(appVersion=app_version).all())
    data = ModulesByAppSerializer(modules_data, many=True).data

    # Remove Key from Dictionary List
    del_key = 'id'
    result = [{key: val for key, val in sub.items() if key != del_key} for sub in data]
    return Response({'status': True, 'result': result}, status=200)


@swagger_auto_schema(**as_modules_for_app_get)
@api_view(['GET'])
def modules_for_app_get(request):
    """ GET module for app (by appVersion header) """
    app_version = request.headers.get('appVersion')
    modules_by_app_data = list(ModulesByApp.objects.filter(appVersion=app_version).all())
    module_order_data = ModuleOrder.objects.filter(appVersion=app_version).first()

    _modules = []
    for module_by_app in modules_by_app_data:
        _module = ModuleVersions.objects.filter(moduleSlug=module_by_app.moduleSlug,
                                                version=module_by_app.moduleVersion).first()
        if _module is not None:
            _modules.append({
                'description': _module.description,
                'icon': _module.icon,
                'slug': _module.moduleSlug,
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


#
# End-points from https://amsterdam-app.stoplight.io/docs/amsterdam-app/
#


def correct_version_format(version):
    """ Check if a version is correctly formatted as int.int.int
    :param version:
    :return:
    """
    pattern = re.compile("^(\d)+$")
    version_split = version.split('.')
    if len(version_split) != 3:
        return False

    for target_string in version_split:
        if not pattern.match(target_string):
            return False
    return True


def slug_status_in_releases(slug):
    """ Get status in releases
    :param slug:
    :return: array [{'status': enum, 'releases': [versions...]}]
    """
    module_versions = list(ModuleVersions.objects.filter(moduleSlug=slug).all())
    _slug_status_in_releases = {}
    for _module_version in module_versions:
        releases = ModulesByApp.objects.filter(moduleSlug=slug, moduleVersion=_module_version.version).all()
        status_in_releases = {}
        for release in releases:
            if release.status in status_in_releases:
                status_in_releases[release.status]['releases'].append(release.appVersion)
            else:
                status_in_releases[release.status] = {'releases': [release.appVersion]}
        _slug_status_in_releases[_module_version.version] = [
            {'status': k, 'releases': v['releases']} for k, v in status_in_releases.items()
        ]
    return _slug_status_in_releases


@swagger_auto_schema(**as_module_post)
@swagger_auto_schema(**as_module_patch)
@swagger_auto_schema(**as_module_delete)
@api_view(['POST', 'PATCH', 'DELETE'])
def module(request):
    """ Create, modify or delete a module slug.

        slug: (string) The human-readable identifier for the module. Example: construction-work.
        status (integer) The status of the module. This allows to deactivate all of its versions in all releases at
        once.

        Allowed status values: [0|1]
    """
    data = dict(request.data)
    if request.method == 'POST':
        try:
            if not all(key in data for key in ['slug', 'status']):
                return Response({"message": 'incorrect request body.'}, status=400)
            _module = Module.objects.create(**data)
            return Response(ModuleSerializer(_module, many=False).data, status=200)
        except IntegrityError:
            return Response({"message": 'module already exists.'}, status=409)

    if request.method == 'PATCH':
        if not all(key in data for key in ['slug', 'status']):
            return Response({"message": 'incorrect request body.'}, status=400)

        _module = Module.objects.filter(slug=data['slug']).first()
        if _module is None:
            return Response({"message": f"Module with slug ‘{data['slug']}’ not found."}, status=404)
        _module.status = data['status']
        _module.save()
        return Response(ModuleSerializer(_module, many=False).data, status=200)

    if request.method == 'DELETE':
        if not all(key in data for key in ['slug']):
            return Response({"message": 'incorrect request body.'}, status=400)

        if list(ModuleVersions.objects.filter(moduleSlug=data['slug']).all()):
            return Response({"message": f"Module with slug ‘{data['slug']}’ is being used in a release."}, status=403)

        Module.objects.filter(slug=data['slug']).delete()
        return Response(status=200)

    return Response('method not allowed', status=500)


@swagger_auto_schema(**as_module_version_get)
@swagger_auto_schema(**as_module_version_patch)
@swagger_auto_schema(**as_module_version_delete)
@api_view(['GET', 'PATCH', 'DELETE'])
def module_version(request, slug=None, version=None):
    """ Query, Create or Patch a new version of an existing module.

        query: Returns a specific version of a module, along with its status in all releases of the app.
    """
    if request.method == 'GET':
        _module_version = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
        if _module_version is None:
            return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)
        serializer = ModuleVersionsSerializer(_module_version, many=False)
        data = serializer.data
        if 'id' in data:
            del data['id']

        status_in_releases = slug_status_in_releases(slug)
        data['statusInReleases'] = status_in_releases[version] if version in status_in_releases else []
        return Response(data, status=200)

    if request.method == 'PATCH':
        _module_version = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
        if _module_version is None:
            return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)

        data = dict(request.data)
        not_allowed = [x for x in data if x not in ['version', 'title', 'description', 'icon']]
        if len(not_allowed):
            return Response({"message": 'incorrect request body.'}, status=400)

        if 'version' in data and not correct_version_format(data['version']):
            return Response({"message": 'incorrect request version formatting.'}, status=400)

        try:
            _module_version.version = data['version'] if 'version' in data else _module_version.version
            _module_version.title = data['title'] if 'title' in data else _module_version.title
            _module_version.description = data['description'] if 'description' in data else _module_version.description
            _module_version.icon = data['icon'] if 'icon' in data else _module_version.icon
            _module_version.save()
            return Response(ModuleVersionsSerializer(_module_version, many=False).data, status=200)
        except IntegrityError:
            return Response({"message": f"Module with slug ‘{slug}’ and version ‘{data['version']}’ already exists."},
                            status=400)

    if request.method == 'DELETE':
        _module_version = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
        if _module_version is None:
            return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)

        _module_version_in_releases = list(ModulesByApp.objects.filter(moduleSlug=slug, moduleVersion=version).all())
        if len(_module_version_in_releases) != 0:
            return Response({"message": f"Module with slug ‘{slug}’ is being used in a release."}, status=403)

        _module_version.delete()
        return Response(status=200)

    return Response('method not allowed', status=500)


@swagger_auto_schema(**as_module_version_post)
@api_view(['POST'])
def post_module_version(request, slug=None):
    """ Create a new version of an existing module.. """
    data = dict(request.data)
    data['moduleSlug'] = slug

    keys = ['version', 'title', 'description', 'icon']
    if not all(key in data for key in keys):
        return Response({"message": 'incorrect request body.'}, status=400)

    _module_version = ModuleVersions.objects.filter(moduleSlug=slug, version=data['version']).first()
    if _module_version is not None:
        return Response({"message": f"Module with slug ‘{slug}’ and version ‘{data['version']}’ already exists."},
                        status=409)

    _module = Module.objects.filter(slug=slug).first()
    if _module is None:
        return Response({"message": f"Module with slug ‘{slug}’ not found."}, status=409)

    if not correct_version_format(data['version']):
        return Response({"message": 'incorrect request version formatting.'}, status=400)

    _new_module_version = ModuleVersions.objects.create(**data)
    return Response(ModuleVersionsSerializer(_new_module_version, many=False).data, status=200)



@swagger_auto_schema(**as_module_slug_get)
@api_view(['GET'])
def module_slug(request, slug=None):
    """ Get details for a module by slug. It returns all the module versions for that slug
        and the status of that module across all releases
    """

    # Get all modules for given slug
    _module = Module.objects.filter(slug=slug).first()
    if _module is None:
        return Response({"message": f"Module with slug ‘{slug}’ not found."}, status=404)

    # Get status in releases
    status_in_releases = slug_status_in_releases(slug)

    # Build result
    module_versions = list(ModuleVersions.objects.filter(moduleSlug=slug).all())
    result = {
        "slug": slug,
        "status": _module.status,
        "versions": [
            {
                "title": x.title,
                "moduleSlug": x.moduleSlug,
                "description": x.description,
                "version": x.version,
                "icon": x.icon,
                "statusInReleases": status_in_releases[x.version]
            } for x in module_versions]
    }

    return Response(result, status=200)


@swagger_auto_schema(**as_modules_latest)
@api_view(['GET'])
def modules_latest(request):
    """ Request a list of modules. If a slug has multiple entries in the db,
        it only returns the latest version. E.g. if 1.6.2 and 2.0.0 is present
        it only returns version 2.0.0. All available fields for a module are returned.
        The result is ordered by title, ascending.
    """
    def version_key(_module):
        # Split the version string on the '.' character and convert the components to integers
        return [int(x) for x in _module['version'].split('.')]

    del_key = 'id'
    module_objects = list(ModuleVersions.objects.all())
    modules_data = ModuleVersionsSerializer(module_objects, many=True).data
    sorted_modules_data = sorted(modules_data, key=version_key, reverse=False)
    data = {x['moduleSlug']: dict(x) for x in sorted_modules_data}
    data = [data[x] for x in data]

    # Remove Key from Dictionary List
    result = [{key: val for key, val in sub.items() if key != del_key} for sub in data]
    sorted_result = Sort().list_of_dicts(items=result, key='title', sort_order='asc')

    return Response(sorted_result, status=200)


@swagger_auto_schema(**as_module_slug_status)
@api_view(['PATCH'])
def module_version_status(request, slug, version):
    """ Disable or enable a version of a module in one or more releases. """
    data = request.data

    # Check if the moduleVersion exists (guard)
    _module = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
    if _module is None:
        return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)

    # Check if all appVersions in the body have a given moduleSlug and moduleVersion (guard)
    for i in range(len(data)):
        _app_versions = data[i]['releases']
        for _app_version in _app_versions:
            module_by_app = ModulesByApp.objects.filter(moduleSlug=slug,
                                                        moduleVersion=version,
                                                        appVersion=_app_version).first()
            if module_by_app is None:
                response = {
                    "message": "specified a release that doesn’t contain the module version or doesn’t even exist."
                }
                return Response(response, status=400)

    # Update the status of each module
    for i in range(len(data)):
        _app_versions = data[i]['releases']
        for _app_version in _app_versions:
            module_by_app = ModulesByApp.objects.filter(moduleSlug=slug,
                                                        moduleVersion=version,
                                                        appVersion=_app_version).first()
            module_by_app.status = data[i]['status']
            module_by_app.save()

    # Retrieve (modified) modules from database
    _releases = {}
    _modules_by_app = list(ModulesByApp.objects.filter(moduleSlug=slug, moduleVersion=version).all())
    for _module in _modules_by_app:
        if str(_module.status) not in _releases:
            _releases[str(_module.status)] = [_module.appVersion]
        else:
            _releases[str(_module.status)].append(_module.appVersion)

    # Send response
    return Response([{'status': int(k), 'releases': v} for k, v in _releases.items()], status=200)
