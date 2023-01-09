""" Unittest for models
"""
from django.test import TestCase
from amsterdam_app_api.serializers import ModuleOrderSerializer
from amsterdam_app_api.models import ModuleVersions, ModuleOrder, ModulesByApp


class AllModulesModels(TestCase):
    """ Test all modules models
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # super(AllModulesModels, self).__init__(*args, **kwargs)
        self.module_versions = [
            {'moduleSlug': 'slug0', 'title': 'title', 'icon': 'icon', 'version': '0.0.0', 'description': 'description'},
            {'moduleSlug': 'slug0', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
            {'moduleSlug': 'slug1', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
            {'moduleSlug': 'slug2', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'}

        ]
        self.modules_by_app = [
            {'appVersion': '0.0.0', 'moduleSlug': 'slug0', 'moduleVersion': '0.0.0', 'status': 1},
            {'appVersion': '0.0.1', 'moduleSlug': 'slug0', 'moduleVersion': '0.0.0', 'status': 1},
            {'appVersion': '0.0.1', 'moduleSlug': 'slug1', 'moduleVersion': '0.0.0', 'status': 1},
            {'appVersion': '0.0.1', 'moduleSlug': 'slug2', 'moduleVersion': '0.0.0', 'status': 1}
        ]
        self.module_order = [
            {'appVersion': '0.0.0', 'order': ['slug0']},
            {'appVersion': '0.0.1', 'order': ['slug0', 'slug1', 'slug2']}
        ]

    def setUp(self):
        ModuleVersions.objects.all().delete()
        ModuleOrder.objects.all().delete()
        ModulesByApp.objects.all().delete()

    def init_modules(self):
        """ Test creating objects in database
        :return: void
        """
        for module in self.module_versions:
            ModuleVersions.objects.create(**module)
        for module_by_app in self.modules_by_app:
            ModulesByApp.objects.create(**module_by_app)
        for order in self.module_order:
            ModuleOrder.objects.create(**order)

    def test_modules_save(self):
        """ Test saving module
        :return: void
        """
        for module in self.module_versions:
            ModuleVersions.objects.create(**module)

        modules = list(ModuleVersions.objects.all())
        self.assertEqual(len(modules), 4)

    def test_modules_constraint_violation(self):
        """ check if constraints are working on modules
        :return: void
        """
        ModuleVersions.objects.create(**self.module_versions[0])
        modules = list(ModuleVersions.objects.all())
        self.assertRaises(Exception, ModuleVersions.objects.create, **self.module_versions[0])
        self.assertEqual(len(modules), 1)

    def test_modules_update_partial(self):
        """ Test a partial update (patch)
        :return: void
        """
        ModuleVersions.objects.create(**self.module_versions[0])
        module = ModuleVersions.objects.filter(moduleSlug='slug0', version='0.0.0').first()
        module.partial_update(icon='test')
        data = ModuleVersions.objects.filter(moduleSlug='slug0', version='0.0.0').first()
        self.assertEqual(data.icon, 'test')

    def test_modules_by_app_save(self):
        """ Test saving module_by_app
        :return: void
        """
        ModulesByApp.objects.create(**self.modules_by_app[0])
        data = list(ModulesByApp.objects.all())
        self.assertEqual(len(data), 1)

    def test_modules_by_app_constraint_violation(self):
        """ check if constraints are working on modules_by_app
        :return: void
        """
        ModulesByApp.objects.create(**self.modules_by_app[0])
        data = list(ModulesByApp.objects.all())
        self.assertRaises(Exception, ModulesByApp.objects.create, **self.modules_by_app[0])
        self.assertEqual(len(data), 1)

    def test_modules_by_app_delete(self):
        """ Test delete on modules_by_app
        :return: void
        """
        self.init_modules()

        module = ModulesByApp.objects.filter(appVersion='0.0.1', moduleSlug='slug1').first()
        module.delete()
        order = ModuleOrderSerializer(ModuleOrder.objects.filter(appVersion='0.0.1').first(), many=False).data
        modules_by_app = list(ModulesByApp.objects.all())
        self.assertEqual(len(modules_by_app), 3)
        self.assertDictEqual(order, {'appVersion': '0.0.1', 'order': ['slug0', 'slug2']})

    def test_modules_by_app_partial_update(self):
        """ Test partial update on modules_by_app (patch)
        :return: void
        """
        ModulesByApp.objects.create(**self.modules_by_app[0])
        module = ModulesByApp.objects.filter(moduleSlug='slug0', appVersion='0.0.0').first()
        module.partial_update(status=0)
        data = ModulesByApp.objects.filter(moduleSlug='slug0', appVersion='0.0.0').first()
        self.assertEqual(data.status, 0)
