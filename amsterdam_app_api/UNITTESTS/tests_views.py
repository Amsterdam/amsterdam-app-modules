""" Unittest for views
"""
from django.test import Client
from django.test import TestCase
from django.contrib.auth import get_user_model
from amsterdam_app_api.UNITTESTS.TestData import TestData
from amsterdam_app_api.models import Module, ModuleVersions, ModulesByApp, ModuleOrder, Releases
from amsterdam_app_api.serializers import ModulesByAppSerializer

username = 'mock'
password = 'unsave'
email = 'mock@localhost'


class SetUp:
    """ Setup Mock data for testing the ModuleManager views
    """
    def __init__(self):
        self.data = TestData()
        for module in self.data.modules:
            Module.objects.create(**module)

        for module in self.data.module_versions:
            ModuleVersions.objects.create(**module)

        for module_by_app in self.data.modules_by_app:
            ModulesByApp.objects.create(**module_by_app)

        for module_order in self.data.module_order:
            ModuleOrder.objects.create(**module_order)

        for release in self.data.releases:
            Releases.objects.create(**release)

        self.user = get_user_model().objects.create_user(username=username,
                                                         password=password,
                                                         email=email)
        self.user.save()


class GetToken(TestCase):
    """ tests for /api/v1/module """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def setUp(self):
        """ Setup mock data """
        SetUp()

    def test_get_token(self):
        """ Acquire token and check if it has len 2 (access/refresh token)"""
        response = self.client.post('/api/v1/token/access', {'username': username, 'password': password})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class Views(TestCase):
    """ tests for /api/v1/module """
    def setUp(self):
        """ Setup mock data """
        SetUp()
        response = self.client.post('/api/v1/token/access', {'username': username, 'password': password})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.authorization_header = response.data['access']

    def test_module_slug(self):
        """ get module by slug and version (exists) """
        c = Client()
        response = c.get('/api/v1/module/slug0')
        expected_result = {
            'slug': 'slug0',
            'status': 1,
            'versions': [
                {
                    'title': 'title',
                    'moduleSlug': 'slug0',
                    'description': 'description',
                    'version': '1.2.20',
                    'icon': 'icon',
                    'statusInReleases': [{'status': 1, 'releases': ['0.1.1']}]},
                {
                    'title': 'title',
                    'moduleSlug': 'slug0',
                    'description': 'description',
                    'version': '1.2.3',
                    'icon': 'icon',
                    'statusInReleases': [{'status': 1, 'releases': ['0.0.1', '0.0.2']}]
                }
            ]
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_bogus(self):
        """ get module by slug and version (exists) """
        c = Client()
        response = c.get('/api/v1/module/bogus')
        expected_result = {"message": "Module with slug ‘bogus’ not found."}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_module_post_incorrect_request_body(self):
        """ test incorrect request body """
        c = Client()
        data = {}
        response = c.post('/api/v1/module',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {"message": "incorrect request body."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_post_integrity_error(self):
        """ test integrity error """
        c = Client()
        data = {'slug': 'slug0', 'status': 1}
        response = c.post('/api/v1/module',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {"message": "module already exists."}
        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(response.data, expected_result)

    def test_module_post_ok(self):
        """ test create new module """
        c = Client()
        data = {'slug': 'new', 'status': 1}
        response = c.post('/api/v1/module',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {'slug': 'new', 'status': 1}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_module_patch_incorrect_request_body(self):
        """ test incorrect request body """
        c = Client()
        data = {'slug': 'slug0'}
        response = c.patch('/api/v1/module',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        expected_result = {"message": "incorrect request body."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_patch_module_not_found(self):
        """ tet patch but module not found """
        c = Client()
        data = {'slug': 'bogus', 'status': 1}
        response = c.patch('/api/v1/module',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        expected_result = {"message": "Module with slug ‘bogus’ not found."}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_module_patch_ok(self):
        """ test module patch ok """
        c = Client()
        data = {'slug': 'slug0', 'status': 0}
        response = c.patch('/api/v1/module',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, data)

    def test_module_delete_incorrect_request_body(self):
        """ test incorrect request body """
        c = Client()
        data = {}
        response = c.delete('/api/v1/module',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "incorrect request body."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_delete_module_in_use(self):
        """ test delete model in use"""
        c = Client()
        data = {'slug': 'slug0'}
        response = c.delete('/api/v1/module',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "Module with slug ‘slug0’ is being used in a release."}
        self.assertEqual(response.status_code, 403)
        self.assertDictEqual(response.data, expected_result)

    def test_module_delete_ok(self):
        """ test module delete ok """
        c = Client()
        data = {'slug': 'new', 'status': 1}
        c.post('/api/v1/module',
               data=data,
               HTTP_AUTHORIZATION=self.authorization_header,
               content_type='application/json')
        data = {'slug': 'new'}
        response = c.delete('/api/v1/module',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, None)

    def test_module_slug_version_post_incorrect_request_body_1(self):
        """ test incorrect request body """
        c = Client()
        data = {}
        response = c.post('/api/v1/module/string/version',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "incorrect request body."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_post_integrity_error_1(self):
        """ test integrity error """
        c = Client()
        data = {'moduleSlug': 'slug0', 'title': 'string', 'version': '1.2.3', 'description': 'string', 'icon': 'icon'}
        response = c.post('/api/v1/module/slug0/version',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {"message": "Module with slug ‘slug0’ and version ‘1.2.3’ already exists."}
        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_post_integrity_error_2(self):
        """ test integrity error """
        c = Client()
        data = {'moduleSlug': 'bogus', 'title': 'string', 'version': '2.3.4', 'description': 'string', 'icon': 'icon'}
        response = c.post('/api/v1/module/bogus/version',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {"message": "Module with slug ‘bogus’ not found."}
        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_post_incorrect_version_1(self):
        """ test integrity error """
        c = Client()
        data = {'moduleSlug': 'slug0', 'title': 'string', 'version': '1.2.3a', 'description': 'string', 'icon': 'icon'}
        response = c.post('/api/v1/module/slug0/version',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {"message": "incorrect request version formatting."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_post_incorrect_version_2(self):
        """ test integrity error """
        c = Client()
        data = {'moduleSlug': 'slug0', 'title': 'string', 'version': '1.2.3.4', 'description': 'string', 'icon': 'icon'}
        response = c.post('/api/v1/module/slug0/version',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {"message": "incorrect request version formatting."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_post_ok(self):
        """ test integrity error """
        c = Client()
        data = {'moduleSlug': 'slug0', 'title': 'string', 'version': '2.3.4', 'description': 'string', 'icon': 'icon'}
        response = c.post('/api/v1/module/slug0/version',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, data)

    def test_module_slug_version_patch_incorrect_request_body_1(self):
        """ test incorrect request body """
        c = Client()
        data = {'moduleSlug': 'slug0', 'version': '3.4.5'}
        response = c.patch('/api/v1/module/slug0/version/1.2.3',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "incorrect request body."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_patch_not_found(self):
        """ test incorrect request body """
        c = Client()
        data = {}
        response = c.patch('/api/v1/module/slug0/version/3.4.5',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "Module with slug ‘slug0’ and version ‘3.4.5’ not found."}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_patch_incorrect_version(self):
        """ test incorrect request body """
        c = Client()
        data = {'version': '3.4.5a'}
        response = c.patch('/api/v1/module/slug0/version/1.2.3',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "incorrect request version formatting."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_patch_in_use(self):
        """ test incorrect request body """
        c = Client()
        data = {'version': '10.11.12'}
        response = c.patch('/api/v1/module/slug0/version/1.2.3',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {'message': 'Module with slug ‘slug0’ and version ‘1.2.3’ in use by release ‘0.0.1‘.'}
        self.assertEqual(response.status_code, 403)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_patch_integrity_error(self):
        """ test incorrect request body """
        c = Client()
        data = {'version': '1.2.20'}
        _module_version = {
            'moduleSlug': 'slug0',
            'title': 'title',
            'icon': 'icon',
            'version': '9.9.9',
            'description': 'description'
        }
        ModuleVersions.objects.create(**_module_version)
        response = c.patch('/api/v1/module/slug0/version/9.9.9',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "Module with slug ‘slug0’ and version ‘1.2.20’ already exists."}
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_patch_ok(self):
        """ test incorrect request body """
        c = Client()
        data = {'version': '4.6.7'}
        _module_version = {
            'moduleSlug': 'slug10',
            'title': 'title',
            'icon': 'icon',
            'version': '9.9.9',
            'description': 'description'
        }
        ModuleVersions.objects.create(**_module_version)
        response = c.patch('/api/v1/module/slug10/version/9.9.9',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {
            'moduleSlug': 'slug10',
            'title': 'title',
            'version': '4.6.7',
            'description': 'description',
            'icon': 'icon'
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_delete_not_found(self):
        """ test incorrect request body """
        c = Client()
        response = c.delete('/api/v1/module/slug0/version/4.5.6',
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "Module with slug ‘slug0’ and version ‘4.5.6’ not found."}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_delete_in_use(self):
        """ test incorrect request body """
        c = Client()
        response = c.delete('/api/v1/module/slug0/version/1.2.3',
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {"message": "Module with slug ‘slug0’ is being used in a release."}
        self.assertEqual(response.status_code, 403)
        self.assertDictEqual(response.data, expected_result)

    def test_module_slug_version_delete_ok(self):
        """ Create new module and delete it """
        c = Client()
        data = {'moduleSlug': 'slug0', 'title': 'string', 'version': '2.3.4', 'description': 'string', 'icon': 'icon'}
        c.post('/api/v1/module/slug0/version',
               data=data,
               HTTP_AUTHORIZATION=self.authorization_header,
               content_type='application/json')

        response = c.delete('/api/v1/module/slug0/version/2.3.4',
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_module_version_get_exist(self):
        """ get module by slug and version (exists) """
        c = Client()
        response = c.get('/api/v1/module/slug0/version/1.2.3')
        expected_result = {
            'moduleSlug': 'slug0',
            'title': 'title',
            'icon': 'icon',
            'version': '1.2.3',
            'description': 'description',
            'statusInReleases': [
                {'status': 1, 'releases': ['0.0.1', '0.0.2']}
            ]
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_module_version_get_does_not_exist(self):
        """ get module by slug and version (does not exist) """
        c = Client()
        response = c.get('/api/v1/module/bogus0/version/0.0.0')
        expected_result = {'message': 'Module with slug ‘bogus0’ and version ‘0.0.0’ not found.'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_app_versions(self):
        """ get all app versions """
        c = Client()
        response = c.get('/api/v1/modules_app_versions')
        expected_result = {'status': True, 'result': ['0.1.1', '0.0.2', '0.0.1', '0.0.0']}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_for_app_no_header(self):
        """ test modules for app get (no app version) """
        c = Client()
        response = c.get('/api/v1/modules_for_app')
        expected_result = {'status': True, 'result': []}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_for_app_header(self):
        """ test modules for app get (no app version) """
        c = Client()
        response = c.get('/api/v1/modules_for_app', HTTP_appVersion='0.0.0')
        expected_result = {
            'status': True,
            'result': [
                {
                    'description': 'description',
                    'icon': 'icon',
                    'slug': 'slug4',
                    'status': 1,
                    'title': 'title',
                    'version': '10.3.2'
                }
            ]
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_latest(self):
        """ test modules/latest """
        c = Client()
        response = c.get('/api/v1/modules/latest', HTTP_appVersion='0.0.0')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 5)

    def test_modules_by_app_get(self):
        """ test get modules by app """
        c = Client()
        data = {'appVersion': '0.0.1'}
        response = c.get('/api/v1/modules_by_app',
                         data=data,
                         HTTP_AUTHORIZATION=self.authorization_header,
                         content_type='application/json',
                         accept='application/json')
        expected_result = {
            'status': True,
            'result': [
                {'appVersion': '0.0.1', 'moduleSlug': 'slug0', 'moduleVersion': '1.2.3', 'status': 1},
                {'appVersion': '0.0.1', 'moduleSlug': 'slug1', 'moduleVersion': '1.3.4', 'status': 0},
                {'appVersion': '0.0.1', 'moduleSlug': 'slug2', 'moduleVersion': '1.30.4', 'status': 1},
                {'appVersion': '0.0.1', 'moduleSlug': 'slug3', 'moduleVersion': '2.10.2', 'status': 1}
            ]
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_module_version_status_path_404(self):
        """ Test /api/v1/module/{slug}/version/{version}/status 404 """
        c = Client()
        data = []
        response = c.patch('/api/v1/module/bogus/version/0.0.0/status',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json',
                           accept='application/json')
        expected_result = {"message": "Module with slug ‘bogus’ and version ‘0.0.0’ not found."}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_module_version_status_path_400(self):
        """ Test /api/v1/module/{slug}/version/{version}/status 400 """
        c = Client()
        data = [{'status': 1, 'releases': ['0.0.0']}]
        response = c.patch('/api/v1/module/slug0/version/1.2.3/status',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json',
                           accept='application/json')
        expected_result = {
            "message": "specified a release that doesn’t contain the module version or doesn’t even exist."
        }
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, expected_result)

    def test_module_version_status_path_200(self):
        """ Test /api/v1/module/{slug}/version/{version}/status 200 """
        c = Client()
        data = [{'status': 1, 'releases': ['0.0.1']}]
        response = c.patch('/api/v1/module/slug0/version/1.2.3/status',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json',
                           accept='application/json')
        expected_result = [{'status': 1, 'releases': ['0.0.2', '0.0.1']}]
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertDictEqual(response.data[0], expected_result[0])

    def test_release_get_404(self):
        """ Test get release not existing """
        c = Client()
        response = c.get('/api/v1/release/10.0.0',
                         HTTP_AUTHORIZATION=self.authorization_header,
                         content_type='application/json',
                         accept='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, {'message': 'Release version does not exists.'})

    def test_release_get_200(self):
        """ Test get release existing """
        import datetime  # pylint: disable=unused-import
        c = Client()
        response = c.get('/api/v1/release/0.0.1',
                         HTTP_AUTHORIZATION=self.authorization_header,
                         content_type='application/json',
                         accept='application/json')
        expected_result = {
            'version': '0.0.1',
            'releaseNotes': 'release 0.0.1',
            'published': '1971-01-01',
            'unpublished': '1971-12-31',
            'created': response.data['created'],
            'modified': None,
            'modules': [
                {
                    'moduleSlug': 'slug0',
                    'version': '1.2.3',
                    'title': 'title',
                    'description': 'description',
                    'icon': 'icon',
                    'status': 1
                }, {
                    'moduleSlug': 'slug1',
                    'version': '1.3.4',
                    'title': 'title',
                    'description': 'description',
                    'icon': 'icon',
                    'status': 0
                }, {
                    'moduleSlug': 'slug2',
                    'version': '1.30.4',
                    'title': 'title',
                    'description': 'description',
                    'icon': 'icon',
                    'status': 1
                }
            ]
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_release_get_409(self):
        """ Test get release integrity error """
        ModuleOrder.objects.filter(appVersion='0.0.1').delete()
        c = Client()
        response = c.get('/api/v1/release/0.0.1',
                         HTTP_AUTHORIZATION=self.authorization_header,
                         content_type='application/json',
                         accept='application/json')
        expected_result = {'message': "Integrity error ‘'NoneType' object has no attribute 'order'‘ encountered. "
                                      "Check your database."}
        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(response.data, expected_result)

    def test_release_post_400_1(self):
        """ test release pot missing keys """
        c = Client()
        data = {}
        response = c.post('/api/v1/release',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {"message": "incorrect request body."})

    def test_release_post_400_2(self):
        """ test release pot missing keys """
        c = Client()
        data = {'version': None, 'releaseNotes': None, 'published': None, 'unpublished': None, 'modules': None}
        response = c.post('/api/v1/release',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {"message": "incorrect request body."})

    def test_release_post_400_3(self):
        """ test release pot missing keys """
        c = Client()
        data = {'version': '', 'releaseNotes': None, 'modules': []}
        response = c.post('/api/v1/release',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {"message": "incorrect request body."})

    def test_release_post_409(self):
        """ test release pot missing keys """
        c = Client()
        data = {'version': '0.0.0', 'releaseNotes': '', 'published': '', 'unpublished': '', 'modules': []}
        response = c.post('/api/v1/release',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(response.data, {'message': 'Release version already exists.'})

    def test_release_post_404(self):
        """ test release pot missing keys """
        c = Client()
        data = {
            'version': '10.0.0',
            'releaseNotes': '',
            'published': '',
            'unpublished': '',
            'modules': [{'moduleSlug': 'bogus', 'version': '0.0.0', 'status': 0}]
        }
        response = c.post('/api/v1/release',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, {"message": "Module with slug ‘bogus’ and version ‘0.0.0’ not found."})

    def test_release_post_200(self):
        """ test release pot missing keys """
        import datetime  # pylint: disable=unused-import
        c = Client()
        data = {
            'version': '10.0.0',
            'releaseNotes': 'test',
            'published': '1970-01-01',
            'unpublished': '',
            'modules': [{'moduleSlug': 'slug0', 'version': '1.2.3', 'status': 0}]
        }
        response = c.post('/api/v1/release',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')

        expected_result = {
            'version': '10.0.0',
            'releaseNotes': 'test',
            'published': '1970-01-01',
            'unpublished': '',
            'created': response.data['created'],
            'modified': None,
            'modules': [{'moduleSlug': 'slug0', 'version': '1.2.3', 'status': 0}]}

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

        module_order = ModuleOrder.objects.filter(appVersion='10.0.0').first()
        self.assertEqual(module_order.appVersion, '10.0.0')
        self.assertListEqual(module_order.order, ['slug0'])

        _modules_by_app = list(ModulesByApp.objects.filter(appVersion='10.0.0').all())
        _modules_by_app_serialized = ModulesByAppSerializer(_modules_by_app, many=True).data

        self.assertEqual(len(_modules_by_app_serialized), 1)

    def test_releases_get(self):
        """ test releases """
        import datetime  # pylint: disable=unused-import
        _module_by_app = {'appVersion': '0.0.0', 'moduleSlug': 'slug0', 'moduleVersion': '0.0.1', 'status': 1}
        ModulesByApp.objects.create(**_module_by_app)

        _module_version = {
            'moduleSlug': 'slug0',
            'title': 'title',
            'icon': 'icon',
            'version': '0.0.1',
            'description': 'description'
        }
        ModuleVersions.objects.create(**_module_version)
        c = Client()
        response = c.get('/api/v1/releases',
                         HTTP_AUTHORIZATION=self.authorization_header,
                         content_type='application/json')
        expected_result = [
            {
                'version': '0.0.1',
                'releaseNotes': 'release 0.0.1',
                'published': '1971-01-01',
                'unpublished': '1971-12-31',
                'created': response.data[0]['created'],
                'modified': None,
                'modules': [
                    {
                        'moduleSlug': 'slug0',
                        'version': '1.2.3',
                        'title': 'title',
                        'description': 'description',
                        'icon': 'icon',
                        'status': 1
                    },
                    {
                        'moduleSlug': 'slug1',
                        'version': '1.3.4',
                        'title': 'title',
                        'description': 'description',
                        'icon': 'icon',
                        'status': 0
                    },
                    {
                        'moduleSlug': 'slug2',
                        'version': '1.30.4',
                        'title': 'title',
                        'description': 'description',
                        'icon': 'icon',
                        'status': 1
                    }
                ]
            },
            {
                'version': '0.0.0',
                'releaseNotes': 'release 0.0.0',
                'published': '1970-01-01',
                'unpublished': '1970-12-31',
                'created': response.data[1]['created'],
                'modified': None,
                'modules': [
                    {
                        'moduleSlug': 'slug0',
                        'version': '0.0.1',
                        'title': 'title',
                        'description': 'description',
                        'icon': 'icon',
                        'status': 1
                    }
                ]
            }
        ]

        self.assertEqual(response.status_code, 200)
        for i in range(len(response.data)):
            self.assertDictEqual(response.data[i], expected_result[i])

    def test_delete_release_404(self):
        """ test delete release 404 """
        c = Client()
        response = c.delete('/api/v1/release/10.0.0',
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {'message': 'Release version ‘10.0.0’ not found.'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_delete_release_403(self):
        """ test delete release 403 """
        c = Client()
        response = c.delete('/api/v1/release/0.0.1',
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {'message': 'Release version ‘0.0.1’ is already published.'}
        self.assertEqual(response.status_code, 403)
        self.assertDictEqual(response.data, expected_result)

    def test_delete_release_200(self):
        """ test delete release 200 """
        c = Client()
        data = {
            'version': '10.0.0',
            'releaseNotes': 'test',
            'published': None,
            'unpublished': None,
            'modules': [{'moduleSlug': 'slug0', 'version': '1.2.3', 'status': 0}]
        }
        c.post('/api/v1/release',
               data=data,
               HTTP_AUTHORIZATION=self.authorization_header,
               content_type='application/json')

        response = c.delete('/api/v1/release/10.0.0',
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, None)

    def test_release_patch_400_1(self):
        """ test release patch missing keys """
        c = Client()
        data = {}
        response = c.patch('/api/v1/release/0.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {"message": "incorrect request body."})

    def test_release_patch_400_2(self):
        """ test release patch missing keys """
        c = Client()
        data = {'version': None, 'releaseNotes': None, 'published': None, 'unpublished': None, 'modules': None}
        response = c.patch('/api/v1/release/0.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {"message": "incorrect request body."})

    def test_release_patch_400_3(self):
        """ test release patch missing keys """
        c = Client()
        data = {'version': '', 'releaseNotes': None, 'published': None, 'unpublished': None, 'modules': [{}]}
        response = c.patch('/api/v1/release/0.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {"message": "incorrect request body."})

    def test_release_patch_400_4(self):
        """ test release patch missing keys """
        c = Client()
        data = {'version': '', 'releaseNotes': None, 'published': None, 'unpublished': None, 'modules': []}
        response = c.patch('/api/v1/release/0.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(response.data, {"message": "incorrect request body."})

    def test_release_patch_409(self):
        """ test release patch missing keys """
        c = Client()
        data = {'version': '0.0.0', 'releaseNotes': '', 'published': '', 'unpublished': '', 'modules': []}
        response = c.patch('/api/v1/release/0.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(response.data, {'message': 'Release version already exists.'})

    def test_release_patch_403(self):
        """ test release patch missing keys """
        c = Client()
        data = {
            'version': '10.0.0',
            'releaseNotes': '',
            'published': '',
            'unpublished': '',
            'modules': [{'moduleSlug': 'bogus', 'version': '0.0.0', 'status': 0}]
        }
        response = c.patch('/api/v1/release/0.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 403)
        self.assertDictEqual(response.data, {'message': 'Release version ‘0.0.0‘ already published.'})

    def test_release_patch_404(self):
        """ test release patch missing keys """
        c = Client()
        data = {
            'version': '14.0.0',
            'releaseNotes': '',
            'published': '',
            'unpublished': '',
            'modules': [{'moduleSlug': 'bogus', 'version': '0.0.0', 'status': 0}]
        }

        _release = {
            'version': '12.0.0',
            'releaseNotes': 'test',
            'published': None,
            'unpublished': None
        }

        Releases.objects.create(**_release)
        response = c.patch('/api/v1/release/12.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, {'message': 'Module with slug ‘bogus’ and version ‘0.0.0’ not found.'})

    def test_release_patch_200(self):
        """ test release patch missing keys """
        import datetime  # pylint: disable=unused-import
        c = Client()
        data = {
            'version': '10.0.0',
            'releaseNotes': 'test',
            'published': '1970-01-01',
            'unpublished': '',
            'modules': [{'moduleSlug': 'slug0', 'version': '1.2.3', 'status': 0}]
        }

        _release = Releases.objects.filter(version='0.0.0').first()
        _release.published = None
        _release.unpublished = None
        _release.save()

        response = c.patch('/api/v1/release/0.0.0',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')

        expected_result = {
            'version': '10.0.0',
            'releaseNotes': 'test',
            'published': '1970-01-01',
            'unpublished': '',
            'created': response.data['created'],
            'modified': None,
            'modules': [{'moduleSlug': 'slug0', 'version': '1.2.3', 'status': 0}]}

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

        module_order = ModuleOrder.objects.filter(appVersion='10.0.0').first()
        self.assertEqual(module_order.appVersion, '10.0.0')
        self.assertListEqual(module_order.order, ['slug0'])

        _modules_by_app = list(ModulesByApp.objects.filter(appVersion='10.0.0').all())
        _modules_by_app_serialized = ModulesByAppSerializer(_modules_by_app, many=True).data

        self.assertEqual(len(_modules_by_app_serialized), 1)
