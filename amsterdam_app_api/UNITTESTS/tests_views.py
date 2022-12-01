""" Unittest for views
"""

from django.test import Client
from django.test import TestCase
from django.contrib.auth import get_user_model
from amsterdam_app_api.UNITTESTS.TestData import TestData
from amsterdam_app_api.models import Modules, ModulesByApp, ModuleOrder

username = 'mock'
password = 'unsave'
email = 'mock@localhost'


class SetUp:
    """ Setup Mock data for testing the ModuleManager views
    """
    def __init__(self):
        self.data = TestData()
        for module in self.data.modules:
            Modules.objects.create(**module)

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

    def test_valid_query(self):
        """ get module by slug and version """
        c = Client()
        response = c.get('/api/v1/module?slug=slug0&version=0.0.0')
        expected_result = {
            'status': True,
            'result': {
                'slug': 'slug0',
                'title': 'title',
                'icon': 'icon',
                'version': '0.0.0',
                'description': 'description'
            }
        }
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_result)
