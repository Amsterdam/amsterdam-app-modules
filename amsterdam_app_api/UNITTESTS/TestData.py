""" Mock data for unittests
"""


class TestData:
    """ Testdata used in unittests """
    def __init__(self):
        self.modules = [
            {'slug': 'slug0', 'title': 'title', 'icon': 'icon', 'version': '0.0.0', 'description': 'description'},
            {'slug': 'slug0', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
            {'slug': 'slug1', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
            {'slug': 'slug2', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'},
            {'slug': 'slug3', 'title': 'title', 'icon': 'icon', 'version': '0.0.1', 'description': 'description'}
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
