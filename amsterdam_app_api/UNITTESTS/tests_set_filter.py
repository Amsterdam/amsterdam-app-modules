""" Test SetFilter """
from django.test import TestCase
from amsterdam_app_api.GenericFunctions.SetFilter import SetFilter


class TestSetFilter(TestCase):
    """ Test set filter """
    def test_set_filter(self):
        """ Test SetFilter.get() """
        set_filter = SetFilter(unit='test', bogus=None)
        result = set_filter.get()
        assert result == {'unit': 'test'}
