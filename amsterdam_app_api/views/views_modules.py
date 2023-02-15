""" All CRUD views for modules, modules order and modules for releases
"""
import re
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from amsterdam_app_api.models import Module
from amsterdam_app_api.models import ModuleVersions
from amsterdam_app_api.models import ModuleVersionsByRelease
from amsterdam_app_api.models import ModuleOrder
from amsterdam_app_api.models import Releases
from amsterdam_app_api.serializers import ModuleSerializer
from amsterdam_app_api.serializers import ModuleVersionsSerializer
from amsterdam_app_api.GenericFunctions.IsAuthorized import IsAuthorized
from amsterdam_app_api.GenericFunctions.Sort import Sort
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_latest
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_available_for_release
from amsterdam_app_api.swagger.swagger_views_modules import as_module_post
from amsterdam_app_api.swagger.swagger_views_modules import as_module_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_module_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_get
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_post
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_patch
from amsterdam_app_api.swagger.swagger_views_modules import as_module_version_delete
from amsterdam_app_api.swagger.swagger_views_modules import as_module_slug_get
from amsterdam_app_api.swagger.swagger_views_modules import as_module_slug_status
from amsterdam_app_api.swagger.swagger_views_modules import as_post_release
from amsterdam_app_api.swagger.swagger_views_modules import as_patch_release
from amsterdam_app_api.swagger.swagger_views_modules import as_get_release
from amsterdam_app_api.swagger.swagger_views_modules import as_delete_release
from amsterdam_app_api.swagger.swagger_views_modules import as_get_releases
from amsterdam_app_api.swagger.swagger_views_modules import as_modules_for_app_get
from amsterdam_app_api.api_messages import Messages


message = Messages()


@swagger_auto_schema(**as_modules_for_app_get)
@api_view(['GET'])
def modules_for_app_get(request):
    """ GET modules for release with (obsoleted) appVersion header. """
    release_version = request.headers.get('appVersion')
    modules_by_release_version = list(ModuleVersionsByRelease.objects.filter(releaseVersion=release_version).all())
    module_order_data = ModuleOrder.objects.filter(releaseVersion=release_version).first()

    _modules = []
    for module_by_release_version in modules_by_release_version:
        _module_version = ModuleVersions.objects.filter(moduleSlug=module_by_release_version.moduleSlug,
                                                        version=module_by_release_version.moduleVersion).first()
        _module = Module.objects.filter(slug=module_by_release_version.moduleSlug).first()
        if _module_version is not None:
            _modules.append({
                'description': _module_version.description,
                'icon': _module_version.icon,
                'slug': _module_version.moduleSlug,
                'status': _module.status if _module.status == 0 else module_by_release_version.status,
                'title': _module_version.title,
                'version': _module_version.version
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


def get_highest_version(versions):
    """ Get the latest version from a list of versions
        e.g from ["1.2.3", "2.0.0", "1.5.8"] it returns "2.0.0"
    """
    def version_to_tuple(version):
        return tuple(map(int, version.split(".")))
    return max(versions, key=version_to_tuple)


def is_less_or_equal_version(d, version):
    """ Check if version is less or equal """
    d_version = d.get('version', '')
    d_version_list = [int(x) for x in d_version.split('.')]
    version_list = [int(x) for x in version.split('.')]
    return d_version_list <= version_list


def is_higher_or_equal_version(d, version):
    """ Check if version is higher or equal """
    d_version = d.get('version', '')
    d_version_list = [int(x) for x in d_version.split('.')]
    version_list = [int(x) for x in version.split('.')]
    return d_version_list >= version_list


def slug_status_in_releases(slug):
    """ Get status in releases
    :param slug:
    :return: array [{'status': enum, 'releases': [versions...]}]
    """
    module_versions = list(ModuleVersions.objects.filter(moduleSlug=slug).all())
    _slug_status_in_releases = {}
    for _module_version in module_versions:
        releases = ModuleVersionsByRelease.objects.filter(moduleSlug=slug, moduleVersion=_module_version.version).all()
        status_in_releases = {}
        for _release in releases:
            if _release.status in status_in_releases:
                status_in_releases[_release.status]['releases'].append(_release.releaseVersion)
            else:
                status_in_releases[_release.status] = {'releases': [_release.releaseVersion]}
        _slug_status_in_releases[_module_version.version] = [
            {'status': k, 'releases': v['releases']} for k, v in status_in_releases.items()
        ]
    return _slug_status_in_releases


@swagger_auto_schema(**as_module_slug_get)
@swagger_auto_schema(**as_module_patch)
@swagger_auto_schema(**as_module_delete)
@api_view(['GET', 'PATCH', 'DELETE'])
def module_slug(request, slug=None, version=None):
    """ Get: Details for a module by slug. It returns all the module versions for that slug
        and the status of that module across all releases
        PATCH: Change the status for a module slug.

        slug: (string) The human-readable identifier for the module. Example: construction-work.
        status (integer) The status of the module. This allows to deactivate all of its versions in all releases at
        once.

        Allowed status values: [0|1]
    """
    if request.method == 'GET':
        result = module_slug_get(request, slug=slug)
        return result

    if request.method == 'PATCH':
        result = module_slug_patch(request, slug=slug)
        return result

    if request.method == 'DELETE':
        result = module_slug_delete(request, slug=slug)
        return result
    return Response({'message': 'Method not allowed'}, status=401)


def module_slug_get(request, slug=None):
    """ Get details for a module by slug. It returns all the module versions for that slug
        and the status of that module across all releases
    """
    def version_key(_module):
        # Split the version string on the '.' character and convert the components to integers
        return [int(x) for x in _module['version'].split('.')]

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

    # Sort versions on version in result
    result['versions'] = sorted(result['versions'], key=version_key, reverse=True)

    return Response(result, status=200)


@IsAuthorized
def module_slug_patch(request, slug=None):
    """ Patch module slug """
    data = dict(request.data)
    if not all(key in data for key in ['status']):
        return Response({"message": 'incorrect request body.'}, status=400)

    _module = Module.objects.filter(slug=slug).first()
    if _module is None:
        return Response({"message": f"Module with slug ‘{slug}’ not found."}, status=404)
    _module.status = data['status']
    _module.save()
    return Response(ModuleSerializer(_module, many=False).data, status=200)


@IsAuthorized
def module_slug_delete(request, slug=None):
    """ Delete module slug"""
    _module = ModuleVersions.objects.filter(moduleSlug=slug).first()
    if _module is not None:
        _message = f"Cannot delete module with slug ‘{slug}’ while its version ‘{_module.version}’ exists."
        return Response({"message": _message}, status=403)

    Module.objects.filter(slug=slug).delete()
    return Response(status=200)


@swagger_auto_schema(**as_module_post)
@api_view(['POST'])
@IsAuthorized
def module(request):
    """ Create module

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
        result = module_version_get(request, slug=slug, version=version)
        return result

    if request.method == 'PATCH':
        result = module_version_patch(request, slug=slug, version=version)
        return result

    if request.method == 'DELETE':
        result = module_version_delete(request, slug=slug, version=version)
        return result
    return Response({'message': 'Method not allowed'}, status=401)


def module_version_get(request, slug=None, version=None):
    """ Get module version """
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


@IsAuthorized
def module_version_patch(request, slug=None, version=None):
    """ patch module version """
    _module_version = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
    if _module_version is None:
        return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)

    data = dict(request.data)
    not_allowed = [x for x in data if x not in ['version', 'title', 'description', 'icon']]
    if len(not_allowed):
        return Response({"message": 'incorrect request body.'}, status=400)

    if 'version' in data and not correct_version_format(data['version']):
        return Response({"message": 'incorrect request version formatting.'}, status=400)

    _module_by_app = ModuleVersionsByRelease.objects.filter(moduleSlug=slug, moduleVersion=version).first()
    if 'version' in data and version != data['version'] and _module_by_app is not None:
        _message = f"Module with slug ‘{slug}’ and version ‘{version}’ " \
                   f"in use by release ‘{_module_by_app.releaseVersion}‘."
        return Response({"message": _message}, status=403)

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


@IsAuthorized
def module_version_delete(request, slug=None, version=None):
    """ delete module version """
    _module_version = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
    if _module_version is None:
        return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)

    _module_version_in_releases = list(ModuleVersionsByRelease.objects.filter(moduleSlug=slug,
                                                                              moduleVersion=version).all())
    if len(_module_version_in_releases) != 0:
        return Response({"message": f"Module with slug ‘{slug}’ is being used in a release."}, status=403)

    _module_version.delete()
    return Response(status=200)


@swagger_auto_schema(**as_module_version_post)
@api_view(['POST'])
@IsAuthorized
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


@swagger_auto_schema(**as_modules_available_for_release)
@api_view(['GET'])
def modules_available_for_release(request, release_version):
    """ Returns a list of all module versions eligible to be included in a new release with the given version.
        The list is ordered by slug ascending, then by version number descending.

        A module version is available if its version number is equal to or greater than the highest version number
        of that module to have appeared in any release before the one with the given version. Additionally, all versions
        of each module that has not appeared in a release is available.
    """

    # Algorithm:
    #
    # For each module:
    # - Does any release less or equal to the requested release contain this module?
    #     - Yes:
    #         Return that version of the module plus any higher versions
    #     - No:
    #         Return all versions of that module
    # sorteren on `slug` and secondly on `moduleVersion`
    def release_version_to_int_list(_module):
        return [int(x) for x in _module.releaseVersion.split('.')]

    def module_version_to_int_list(_module):
        return [int(x) for x in _module.version.split('.')]

    def slug_from_module(_module):
        return _module.slug

    _modules = list(Module.objects.filter().all())
    sorted_modules = sorted(_modules, key=slug_from_module, reverse=False)
    _slug_in_releases = []
    result = []
    for _module in sorted_modules:
        _slug_in_releases = list(ModuleVersionsByRelease.objects.filter(moduleSlug=_module.slug).all())
        _slug_in_releases_sorted_by_release_version = sorted(_slug_in_releases,
                                                             key=release_version_to_int_list,
                                                             reverse=True)
        any_release_less_or_equal = [x for x in _slug_in_releases_sorted_by_release_version
                                     if is_less_or_equal_version({'version': x.releaseVersion}, release_version)]

        # Return that version of the module plus any higher versions
        _module_versions = list(ModuleVersions.objects.filter(moduleSlug=_module.slug).all())
        if any_release_less_or_equal:
            last_module_version = any_release_less_or_equal[0].moduleVersion
            _module_versions_sorted = sorted(_module_versions, key=module_version_to_int_list, reverse=True)
            result += [x for x in _module_versions_sorted
                       if is_higher_or_equal_version({'version': x.version}, last_module_version)]
        # Return all versions of that module sorted on moduleVersion
        else:
            result += sorted(_module_versions, key=module_version_to_int_list, reverse=True)
    return Response(ModuleVersionsSerializer(result, many=True).data, status=200)


@swagger_auto_schema(**as_module_slug_status)
@api_view(['PATCH'])
@IsAuthorized
def module_version_status(request, slug, version):
    """ Disable or enable a version of a module in one or more releases. """
    data = request.data

    # Check if the moduleVersion exists (guard)
    _module = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
    if _module is None:
        return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)

    # Check if all releaseVersions in the body have a given moduleSlug and moduleVersion (guard)
    for i in range(len(data)):
        _release_versions = data[i]['releases']
        for _release_version in _release_versions:
            module_by_app = ModuleVersionsByRelease.objects.filter(moduleSlug=slug,
                                                                   moduleVersion=version,
                                                                   releaseVersion=_release_version).first()
            if module_by_app is None:
                response = {
                    "message": "specified a release that doesn’t contain the module version or doesn’t even exist."
                }
                return Response(response, status=400)

    # Update the status of each module
    for i in range(len(data)):
        _release_versions = data[i]['releases']
        for _release_version in _release_versions:
            module_by_app = ModuleVersionsByRelease.objects.filter(moduleSlug=slug,
                                                                   moduleVersion=version,
                                                                   releaseVersion=_release_version).first()
            module_by_app.status = data[i]['status']
            module_by_app.save()

    # Retrieve (modified) modules from database
    _releases = {}
    _modules_by_app = list(ModuleVersionsByRelease.objects.filter(moduleSlug=slug, moduleVersion=version).all())
    for _module in _modules_by_app:
        if str(_module.status) not in _releases:
            _releases[str(_module.status)] = [_module.releaseVersion]
        else:
            _releases[str(_module.status)].append(_module.releaseVersion)

    # Send response
    return Response([{'status': int(k), 'releases': v} for k, v in _releases.items()], status=200)


@swagger_auto_schema(**as_get_release)
@swagger_auto_schema(**as_delete_release)
@swagger_auto_schema(**as_patch_release)
@api_view(['GET', 'DELETE', 'PATCH'])
def release(request, version):
    """ [GET]       Returns a specific release and the versions of the modules it consists of. Path parameter is x.y.z
                    or latest
        [DELETE]    Deletes a release.
        [PATCH]     Updates details of a release. Path parameter is x.y.z or latest
    """
    if request.method == 'GET':
        response = get_release(request, version)
        return response
    if request.method == 'DELETE':
        response = delete_release(request, version)
        return response
    if request.method == 'PATCH':
        response = patch_release(request, version)
        return response
    return Response({'message': 'Method not allowed'}, status=403)


def get_release(request, version):
    """ Returns a specific release and the versions of the modules it consists of. """
    if version == 'latest':
        _releases = list(Releases.objects.all())
        if not _releases:
            return Response({'message': 'No releases found.'}, status=404)
        version = get_highest_version([x.version for x in _releases])

    _release = Releases.objects.filter(version=version).first()
    if _release is None:
        return Response({'message': 'Release version does not exists.'}, status=404)

    try:
        _module_order = ModuleOrder.objects.filter(releaseVersion=version).first()
        _modules = []
        for _slug in _module_order.order:

            _module_by_app = ModuleVersionsByRelease.objects.filter(releaseVersion=version, moduleSlug=_slug).first()
            _module_version = ModuleVersions.objects.filter(moduleSlug=_slug,
                                                            version=_module_by_app.moduleVersion).first()
            _module = Module.objects.filter(slug=_slug).first()

            _modules.append({
                "moduleSlug": _slug,
                "version": _module_by_app.moduleVersion,
                "title": _module_version.title,
                "description": _module_version.description,
                "icon": _module_version.icon,
                "status": _module.status if _module.status == 0 else _module_by_app.status
            })

        result = {
            "version": version,
            "releaseNotes": _release.releaseNotes,
            "published": _release.published,
            "unpublished": _release.unpublished,
            "created": _release.created,
            "modified": _release.modified,
            "modules": _modules
        }
        return Response(result, status=200)
    except Exception as error:
        return Response({'message': f'Integrity error ‘{error}‘ encountered. Check your database.'}, status=409)


@swagger_auto_schema(**as_post_release)
@api_view(['POST'])
@IsAuthorized
def post_release(request):
    """ Creates a release, storing its details and the list of module versions belonging to it.
        The order of modules in the request body is the order of appearance in the app
    """
    data = request.data

    # Guards...
    if not all(key in data for key in ('version', 'releaseNotes', 'published', 'unpublished', 'modules')):
        return Response({"message": "incorrect request body."}, status=400)

    if not isinstance(data['modules'], list):
        return Response({"message": "incorrect request body."}, status=400)

    for _module_version in data['modules']:
        if not all(key in _module_version for key in ('moduleSlug', 'version', 'status')):
            return Response({"message": "incorrect request body."}, status=400)

    for key in ('version', 'releaseNotes'):
        if not isinstance(data[key], str):
            return Response({"message": "incorrect request body."}, status=400)

    _release = Releases.objects.filter(version=data['version']).first()
    if _release is not None:
        return Response({'message': 'Release version already exists.'}, status=409)

    for _module_version in data['modules']:
        slug = _module_version['moduleSlug']
        version = _module_version['version']
        _module = ModuleVersions.objects.filter(moduleSlug=slug, version=version).first()
        if _module is None:
            return Response({"message": f"Module with slug ‘{slug}’ and version ‘{version}’ not found."}, status=404)

    #
    # Create new app version
    #

    # Create new release
    _new_release = {
        "version": data['version'],
        "releaseNotes": data['releaseNotes'],
        "published": data['published'],
        "unpublished": data['unpublished']
    }
    Releases.objects.create(**_new_release)

    # Add modules to release
    _module_order = {'releaseVersion': data['version'], 'order': []}
    for _module in data['modules']:
        _module_order['order'].append(_module['moduleSlug'])
        _module_by_app = {
            'releaseVersion': data['version'],
            'moduleSlug': _module['moduleSlug'],
            'moduleVersion': _module['version'],
            'status': _module['status']
        }
        ModuleVersionsByRelease.objects.create(**_module_by_app)

    # Add new modules order
    ModuleOrder.objects.create(**_module_order)

    #
    # return object from database
    #

    _release = Releases.objects.filter(version=data['version']).first()
    _module_order = ModuleOrder.objects.filter(releaseVersion=data['version']).first()
    _modules = []
    for _slug in _module_order.order:
        _module = ModuleVersionsByRelease.objects.filter(releaseVersion=data['version'], moduleSlug=_slug).first()
        _modules.append({'moduleSlug': _module.moduleSlug, 'version': _module.moduleVersion, 'status': _module.status})

    result = {
        "version": _release.version,
        "releaseNotes": _release.releaseNotes,
        "published": _release.published,
        "unpublished": _release.unpublished,
        "created": _release.created,
        "modified": _release.modified,
        "modules": _modules
    }
    return Response(result, status=200)


@IsAuthorized
def patch_release(request, version=None):
    """ Patches a release, storing its details and the list of module versions belonging to it.
        The order of modules in the request body is the order of appearance in the app
    """
    data = request.data

    # Guards...
    current_release = Releases.objects.filter(version=version).first()

    if current_release is None:
        return Response({'message': f'Release version ‘{version}‘ not found.'}, status=404)

    if 'version' in data and version != data['version']:
        target_release = Releases.objects.filter(version=data['version']).first()
        if target_release is not None:
            return Response({'message': 'Release version already exists.'}, status=409)

        if current_release.published is not None:
            return Response({'message': f'Release version ‘{version}‘ already published.'}, status=403)

    if 'modules' in data:
        data_modules = data['modules']
        if not isinstance(data_modules, list):
            return Response({"message": "incorrect request body."}, status=400)

        for _module_version in data['modules']:
            if not all(key in _module_version for key in ('moduleSlug', 'version', 'status')):
                return Response({"message": "incorrect request body. (modules)"}, status=400)

    for _modules_version in data['modules']:
        slug = _modules_version['moduleSlug']
        _module_version = _modules_version['version']
        _module = ModuleVersions.objects.filter(moduleSlug=slug, version=_module_version).first()
        if _module is None:
            return Response({"message": f"Module with slug ‘{slug}’ and version ‘{_module_version}’ not found."},
                            status=404)

    #
    # Create new app version
    #

    # If there's a modules patch
    if 'modules' in data:
        ModuleVersionsByRelease.objects.filter(releaseVersion=version).delete()
        ModuleOrder.objects.filter(releaseVersion=version).delete()

        # Add modules to release
        _module_order = {'releaseVersion': data['version'] if 'version' in data else version, 'order': []}
        for _module in data['modules']:
            _module_order['order'].append(_module['moduleSlug'])
            _module_by_app = {
                'releaseVersion': data['version'] if 'version' in data else version,
                'moduleSlug': _module['moduleSlug'],
                'moduleVersion': _module['version'],
                'status': _module['status']
            }
            ModuleVersionsByRelease.objects.create(**_module_by_app)

        # Add new modules order
        ModuleOrder.objects.create(**_module_order)

    _patch_release = Releases.objects.filter(version=version).first()
    _patch_release.version = data['version'] if 'version' in data else _patch_release.version
    _patch_release.releaseNotes = data['releaseNotes'] if 'releaseNotes' in data else _patch_release.releaseNotes
    _patch_release.published = data['published'] if 'published' in data else _patch_release.published
    _patch_release.unpublished = data['unpublished'] if 'unpublished' in data else _patch_release.unpublished
    _patch_release.save()

    #
    # return object from database
    #
    new_version = data['version'] if 'version' in data else version
    _release = Releases.objects.filter(version=new_version).first()
    _module_order = ModuleOrder.objects.filter(releaseVersion=new_version).first()
    _modules = []
    for _slug in _module_order.order:
        _module = ModuleVersionsByRelease.objects.filter(releaseVersion=new_version, moduleSlug=_slug).first()
        _modules.append({'moduleSlug': _module.moduleSlug, 'version': _module.moduleVersion, 'status': _module.status})

    result = {
        "version": _release.version,
        "releaseNotes": _release.releaseNotes,
        "published": _release.published,
        "unpublished": _release.unpublished,
        "created": _release.created,
        "modified": _release.modified,
        "modules": _modules
    }

    return Response(result, status=200)


def delete_release(request, version=None):
    """ Delete a release """
    _release = Releases.objects.filter(version=version).first()
    if _release is None:
        return Response({'message': f'Release version ‘{version}’ not found.'}, status=404)
    if _release.published is not None:
        return Response({'message': f'Release version ‘{version}’ is already published.'}, status=403)
    _release.delete()
    ModuleVersionsByRelease.objects.filter(releaseVersion=version).delete()
    ModuleOrder.objects.filter(releaseVersion=version).delete()
    return Response(status=200)


@swagger_auto_schema(**as_get_releases)
@api_view(['GET'])
def get_releases(request):
    """ Returns a specific release and the versions of the modules it consists of. """
    _releases = list(Releases.objects.filter().all())

    results = []
    for _release in _releases:
        _module_order = ModuleOrder.objects.filter(releaseVersion=_release.version).first()
        _modules = []
        for _slug in _module_order.order:
            try:
                _module_by_app = ModuleVersionsByRelease.objects.filter(releaseVersion=_release.version,
                                                                        moduleSlug=_slug).first()
                _module_version = ModuleVersions.objects.filter(moduleSlug=_slug,
                                                                version=_module_by_app.moduleVersion).first()

                _modules.append({
                    "moduleSlug": _slug,
                    "version": _module_by_app.moduleVersion,
                    "title": _module_version.title,
                    "description": _module_version.description,
                    "icon": _module_version.icon,
                    "status": _module_by_app.status
                })
            except Exception as error:  # pylint: disable=unused-variable
                pass
        try:
            results.append({
                "version": _release.version,
                "releaseNotes": _release.releaseNotes,
                "published": _release.published,
                "unpublished": _release.unpublished,
                "created": _release.created,
                "modified": _release.modified,
                "modules": _modules
            })
        except Exception as error:  # pylint: disable=unused-variable
            pass

    sorted_result = Sort().list_of_dicts(results, key='version',sort_order='desc')
    return Response(sorted_result, status=200)
