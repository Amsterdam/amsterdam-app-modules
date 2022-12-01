""" Test sorting a list of dicts by key in dict """
from django.test import TestCase
from amsterdam_app_api.GenericFunctions.Sort import Sort


class TestSort(TestCase):
    """ Test sorting a list of dicts by key in dict """
    def test_sort_dict_asc(self):
        """ test sorting ascending """
        data = [{'data': 1}, {'data': 0}]
        sort = Sort()
        result = sort.list_of_dicts(data, key='data', sort_order='asc')

        self.assertEqual(result, [{'data': 0}, {'data': 1}])

    def test_sort_dict_desc(self):
        """ Test sorting descending """
        data = [{'data': 0}, {'data': 1}]
        sort = Sort()
        result = sort.list_of_dicts(data, key='data', sort_order='desc')

        self.assertEqual(result, [{'data': 1}, {'data': 0}])

    def test_sort_erroneous_data(self):
        """ Test sorting mal-formed data """
        data = [{'data': 0}, None]
        sort = Sort()
        result = sort.list_of_dicts(data, key='data')

        self.assertEqual(result, [{'data': 0}, None])
