""" Unittest JWT authentication
"""
from django.contrib.auth import get_user_model
from django.test import Client
from django.test import RequestFactory
from django.test import TestCase
from amsterdam_app_api.GenericFunctions.IsAuthorized import IsAuthorized

username = 'mock'
password = 'unsave'
email = 'mock@localhost'


class FooBar:
    """ Dummy class
    """

    def __init__(self):
        self.status_code = 200
        self.reason_phrase = 'mock'

    @IsAuthorized
    def route(self, *args, **kwargs):
        """ Dummy function
        :return: self
        """
        return 'success'


class TestIsAuthorized(TestCase):
    """ JWT authentication tests
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def setUp(self):
        """ Setup mock data: Create user for token """
        users = get_user_model()
        self.user = users.objects.create_user(username=username,
                                              password=password,
                                              email=email)
        self.user.save()
        response = self.client.post('/api/v1/token/access', {'username': username, 'password': password})
        self.jwt_token = response.data['access']

        self.factory = RequestFactory()

    def test_invalid_token(self):
        """ Test token is invalid """
        headers = {'Accept': 'application/json', 'UserAuthorization': 'invalid'}
        self.factory.post('/', headers=headers)
        dummy = FooBar()
        result = dummy.route()
        self.assertEqual(result.reason_phrase, 'Internal Server Error')

    def test_no_token(self):
        """ JWT token is absent """
        headers = {'Accept': 'application/json'}
        self.factory.post('/', headers=headers)
        dummy = FooBar()
        result = dummy.route()
        self.assertEqual(result.reason_phrase, 'Internal Server Error')

    def test_jwt_token_valid(self):
        """ JWT token is valid """
        headers = {'Accept': 'application/json', 'AUTHORIZATION': self.jwt_token}
        request = self.factory.post('/', headers=headers)
        dummy = FooBar()
        result = dummy.route(request)
        self.assertEqual(result, 'success')

    def test_jwt_token_invalid(self):
        """ Test JWT-token is invalid """
        c = Client()
        data = {}
        response = c.post('/api/v1/module',
                          data=data,
                          HTTP_AUTHORIZATION='bogus',
                          content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.reason_phrase, 'Unauthorized')
