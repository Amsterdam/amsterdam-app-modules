""" Mock data for unittests
"""


class TestData:
    """ Testdata used in unittests """
    def __init__(self):
        self.modules = [
            {'slug': 'slug0', 'status': 1},
            {'slug': 'slug1', 'status': 1},
            {'slug': 'slug2', 'status': 1},
            {'slug': 'slug3', 'status': 0}
        ]

        self.module_versions = [
            {
                'moduleSlug': 'slug0',
                'title': 'title',
                'icon': 'icon',
                'version': '1.2.3',
                'description': 'description'
            }, {
                'moduleSlug': 'slug0',
                'title': 'title',
                'icon': 'icon',
                'version': '1.2.20',
                'description': 'description'
            }, {
                'moduleSlug': 'slug1',
                'title': 'title',
                'icon': 'icon',
                'version': '1.3.4',
                'description': 'description'
            }, {
                'moduleSlug': 'slug2',
                'title': 'title',
                'icon': 'icon',
                'version': '1.30.4',
                'description': 'description'
            }, {
                'moduleSlug': 'slug3',
                'title': 'title',
                'icon': 'icon',
                'version': '2.10.2',
                'description': 'description'
            }, {
                'moduleSlug': 'slug4',
                'title': 'title',
                'icon': 'icon',
                'version': '10.3.2',
                'description': 'description'
            }
        ]

        self.modules_by_app = [
            {'appVersion': '0.0.1', 'moduleSlug': 'slug0', 'moduleVersion': '1.2.3', 'status': 1},
            {'appVersion': '0.0.2', 'moduleSlug': 'slug0', 'moduleVersion': '1.2.3', 'status': 1},
            {'appVersion': '0.1.1', 'moduleSlug': 'slug0', 'moduleVersion': '1.2.20', 'status': 1},
            {'appVersion': '0.0.1', 'moduleSlug': 'slug1', 'moduleVersion': '1.3.4', 'status': 0},
            {'appVersion': '0.0.1', 'moduleSlug': 'slug2', 'moduleVersion': '1.30.4', 'status': 1},
            {'appVersion': '0.0.1', 'moduleSlug': 'slug3', 'moduleVersion': '2.10.2', 'status': 1},
            {'appVersion': '0.0.0', 'moduleSlug': 'slug4', 'moduleVersion': '10.3.2', 'status': 1}
        ]

        self.module_order = [
            {'appVersion': '0.0.0', 'order': ['slug0']},
            {'appVersion': '0.0.1', 'order': ['slug0', 'slug1', 'slug2']}
        ]

        self.releases = [
            {
                "version": "0.0.0",
                "releaseNotes": "release 0.0.0",
                "published": "1970-01-01",
                "unpublished": "1970-12-31"
            },
            {
                "version": "0.0.1",
                "releaseNotes": "release 0.0.1",
                "published": "1971-01-01",
                "unpublished": "1971-12-31"
            },
        ]
