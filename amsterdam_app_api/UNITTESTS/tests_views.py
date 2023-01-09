""" Unittest for views
"""
from django.test import Client
from django.test import TestCase
from django.contrib.auth import get_user_model
from amsterdam_app_api.UNITTESTS.TestData import TestData
from amsterdam_app_api.models import ModuleVersions, ModulesByApp, ModuleOrder
from amsterdam_app_api.serializers import ModulesByAppSerializer

username = 'mock'
password = 'unsave'
email = 'mock@localhost'


class SetUp:
    """ Setup Mock data for testing the ModuleManager views
    """
    def __init__(self):
        self.data = TestData()
        for module in self.data.module_versions:
            ModuleVersions.objects.create(**module)

        for module_by_app in self.data.modules_by_app:
            ModulesByApp.objects.create(**module_by_app)

        for module_order in self.data.module_order:
            ModuleOrder.objects.create(**module_order)

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
        response = self.client.post('/api/v1/get-token/', {'username': username, 'password': password})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class Module(TestCase):
    """ tests for /api/v1/module """
    def setUp(self):
        """ Setup mock data """
        SetUp()
        response = self.client.post('/api/v1/get-token/', {'username': username, 'password': password})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.authorization_header = response.data['access']

    def test_module_get_exist(self):
        """ get module by slug and version (exists) """
        c = Client()
        response = c.get('/api/v1/module?slug=slug0&version=1.2.3')
        expected_result = {
            'status': True,
            'result': {
                'moduleSlug': 'slug0',
                'title': 'title',
                'icon': 'icon',
                'version': '1.2.3',
                'description': 'description'
            }
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_module_get_does_not_exist(self):
        """ get module by slug and version (does not exist) """
        c = Client()
        response = c.get('/api/v1/module?slug=bogus0&version=0.0.0')
        expected_result = {'status': False, 'result': 'No such module'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_app_versions(self):
        """ get all app versions """
        c = Client()
        response = c.get('/api/v1/modules_app_versions')
        expected_result = {'status': True, 'result': ['0.1.1', '0.0.1', '0.0.0']}
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

    def test_modules_order_get_200(self):
        """ Test modules order """
        c = Client()
        response = c.get('/api/v1/modules_order', HTTP_appVersion='0.0.0')
        expected_result = {'status': True, 'result': {'appVersion': '0.0.0', 'order': ['slug0']}}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_order_get_404(self):
        """ Test modules order: no such record """
        c = Client()
        response = c.get('/api/v1/modules_order', HTTP_appVersion='-1.-1.-1')
        expected_result = {'status': False, 'result': 'No record found'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_order_ppd_unauthorized(self):
        """ Test unauthorized request to post patch or delete """
        c = Client()
        response = c.post('/api/v1/modules_order')
        self.assertEqual(response.status_code, 403)

    def test_modules_order_post_patch(self):
        """ Test request for post or patch """
        c = Client()
        data = {'appVersion': '0.0.1', 'order': ['slug2', 'slug1', 'slug0']}
        response = c.post('/api/v1/modules_order',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {'status': True, 'result': 'Module order updated or created'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_order_delete(self):
        """ Test request for delete """
        c = Client()
        data = {'appVersion': '0.0.1'}
        response = c.delete('/api/v1/modules_order',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        expected_result = {'status': True, 'result': 'Module order deleted'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_latest(self):
        """ test modules/latest """
        c = Client()
        response = c.get('/api/v1/modules/latest', HTTP_appVersion='0.0.0')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 5)

#     def test_modules_get_no_slug(self):
#         """ test modules get (slug = None) """
#         c = Client()
#         response = c.get('/api/v1/modules', HTTP_appVersion='0.0.0')
#         expected_result = {
#             'status': True,
#             'result': [
#                 {'slug': 'slug0', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
#                 {'slug': 'slug1', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
#                 {'slug': 'slug2', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
#                 {'slug': 'slug3', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'}
#             ]
#         }
#         self.assertEqual(response.status_code, 200)
#         self.assertDictEqual(response.data, expected_result)

#     def test_modules_get_slug(self):
#         """ test modules get (slug = slug0) """
#         c = Client()
#         response = c.get('/api/v1/modules',
#                          data={'slug': 'slug0'},
#                          HTTP_appVersion='0.0.0',
#                          content_type='application/json')

#         expected_result = {
#             'status': True,
#             'result': [
#                 {'slug': 'slug0', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
#                 {'slug': 'slug0', 'title': 'title', 'icon': 'icon', 'version': '0.0.0', 'description': 'description'}
#             ]
#         }
#         self.assertEqual(response.status_code, 200)
#         self.assertDictEqual(response.data, expected_result)

    def test_modules_post_200(self):
        """ Test create new module """
        c = Client()
        data = {
            'moduleSlug': 'slug0',
            'title': 'title',
            'icon': 'icon',
            'version': '0.0.5',
            'description': 'description'
        }
        response = c.post('/api/v1/modules',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {'status': True, 'result': 'Module created'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_post_422(self):
        """ Test create new module (constraint error) """
        c = Client()
        data = {
            'moduleSlug': 'slug0',
            'title': 'title',
            'icon': 'icon',
            'version': '1.2.3',
            'description': 'description'
        }
        response = c.post('/api/v1/modules',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {
            'status': False,
            'result': 'duplicate key value violates unique constraint "unique_slug_version"\n'
                      'DETAIL:  Key ("moduleSlug", version)=(slug0, 1.2.3) already exists.\n'
        }
        self.assertEqual(response.status_code, 422)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_patch_200(self):
        """ Test patch module """
        c = Client()
        data = {
            'moduleSlug': 'slug0',
            'title': 'new title',
            'icon': 'icon',
            'version': '1.2.3',
            'description': 'description'
        }
        response = c.patch('/api/v1/modules',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        expected_result = {'status': True, 'result': 'Module patched'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_patch_404(self):
        """ Test patch module """
        c = Client()
        data = {'slug': 'bogus', 'title': 'title', 'icon': 'icon', 'version': '0.0.0', 'description': 'description'}
        response = c.patch('/api/v1/modules',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        expected_result = {'status': False, 'result': 'No record found'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_delete_409(self):
        """ Test delete in use """
        c = Client()
        data = {'slug': 'slug0', 'version': '1.2.3'}
        response = c.delete('/api/v1/modules',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {
            'status': False,
            'result': 'Cowardly refused to remove the module because the module is still in use'
        }
        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_delete_200(self):
        """ Test delete module """
        c = Client()
        data = {
            'moduleSlug': 'slug0',
            'title': 'title',
            'icon': 'icon',
            'version': '0.0.5',
            'description': 'description'
        }
        response = c.post('/api/v1/modules',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json')
        expected_result = {'status': True, 'result': 'Module created'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

        data = {'moduleSlug': 'slug0', 'version': '0.0.5'}
        response = c.delete('/api/v1/modules',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {'status': True, 'result': 'Module deleted'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_delete_404(self):
        """ Test delete module not found """
        c = Client()
        data = {'slug': 'bogus', 'version': '0.0.0'}
        response = c.delete('/api/v1/modules',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {'status': False, 'result': 'No record found'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_enable_slug(self):
        """ Test enable modules by slug """
        c = Client()
        data = {'slug': 'slug0', 'status': 0}
        response = c.patch('/api/v1/modules_by_app/status',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {'status': True, 'result': 'Module(s) patched'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)
        modules = ModulesByApp.objects.filter(status=0).all()
        data = ModulesByAppSerializer(modules, many=True).data
        self.assertEqual(len(data), 3)

    def test_modules_enable_slug_moduleversion(self):
        """ Test enable modules by slug and moduleVersion """
        c = Client()
        data = {'slug': 'slug0', 'moduleVersion': '0.0.0', 'status': 0}
        response = c.patch('/api/v1/modules_by_app/status',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json')
        expected_result = {'status': True, 'result': 'Module(s) patched'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)
        modules = ModulesByApp.objects.filter(status=0).all()
        data = ModulesByAppSerializer(modules, many=True).data
        self.assertEqual(len(data), 1)

    def test_modules_enable_slug_moduleversion_appversion(self):
        """ Test enable modules by slug, moduleVersion and appVersion """
        c = Client()
        data = {'slug': 'slug1', 'moduleVersion': '1.3.4', 'appVersion': '0.0.1', 'status': 1}
        response = c.patch('/api/v1/modules_by_app/status',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        expected_result = {'status': True, 'result': 'Module(s) patched'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)
        modules = ModulesByApp.objects.filter(status=0).all()
        data = ModulesByAppSerializer(modules, many=True).data
        self.assertEqual(len(data), 0)

    def test_modules_enable_appversion(self):
        """ Test enable modules by appVersion """
        c = Client()
        data = {'appVersion': '0.0.1', 'status': 0}
        response = c.patch('/api/v1/modules_by_app/status',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json')
        expected_result = {'status': True, 'result': 'Module(s) patched'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)
        modules = ModulesByApp.objects.filter(status=0).all()
        data = ModulesByAppSerializer(modules, many=True).data
        self.assertEqual(len(data), 4)

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

    def test_modules_by_app_post(self):
        """ test add new module by app """
        c = Client()
        data = {'appVersion': '0.0.1', 'moduleSlug': 'slug4', 'moduleVersion': '10.3.2', 'status': 1}
        response = c.post('/api/v1/modules_by_app',
                          data=data,
                          HTTP_AUTHORIZATION=self.authorization_header,
                          content_type='application/json',
                          accept='application/json')
        expected_result = {'status': True, 'result': 'ModuleByApp created'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_by_app_patch_200(self):
        """ patch module by app """
        c = Client()
        data = {'appVersion': '0.0.1', 'moduleSlug': 'slug2', 'moduleVersion': '0.0.1'}
        response = c.patch('/api/v1/modules_by_app',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json',
                           accept='application/json')
        expected_result = {'status': True, 'result': 'ModuleByApp patched'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_by_app_patch_404(self):
        """ patch module by app (no such record) """
        c = Client()
        data = {'appVersion': '0.0.1', 'moduleSlug': 'bogus', 'moduleVersion': '0.0.1'}
        response = c.patch('/api/v1/modules_by_app',
                           data=data,
                           HTTP_AUTHORIZATION=self.authorization_header,
                           content_type='application/json',
                           accept='application/json')
        expected_result = {'status': False, 'result': 'No record found'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_by_app_delete_200(self):
        """ delete module by app """
        c = Client()
        data = {'appVersion': '0.0.1', 'moduleSlug': 'slug0'}
        response = c.delete('/api/v1/modules_by_app',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json',
                            accept='application/json')
        expected_result = {'status': True, 'result': 'ModuleByApp deleted'}
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)

    def test_modules_by_app_delete_404(self):
        """ delete module by app (no such record) """
        c = Client()
        data = {'appVersion': '0.0.1', 'moduleSlug': 'bogus'}
        response = c.delete('/api/v1/modules_by_app',
                            data=data,
                            HTTP_AUTHORIZATION=self.authorization_header,
                            content_type='application/json',
                            accept='application/json')
        expected_result = {'status': False, 'result': 'No record found'}
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(response.data, expected_result)
