""" Some mock functions for unittests
"""

from Decorators.AppVersion import app_version_header
from Decorators.IsAuthorized import IsAuthorized


def mocked_socket_connect_ok(*args):
    """ Function that always succeeds (and accepts any number of arguments)
    :param args:
    :return: void
    """
    return


def mocked_socket_connect_fail(*args):
    """ Function that will raise an exception, regardless
    :param args:
    :return: void
    """
    raise Exception('Connection error')


class FooBar:
    """ Dummy class
    """

    def __init__(self):
        self.status = 'OK'
        self.status_code = 200
        self.json = {}

    @app_version_header
    def appversion(self):
        """ Dummy function
        :return: self
        """
        return self

    @IsAuthorized
    def authorized(self):
        """ Dummy function
        :return: self
        """
        return self
