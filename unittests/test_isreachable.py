import socket
import Configuration
from Decorators.IsReachable import is_reachable
from mock_functions import *
from unittest.mock import patch
from unittest import TestCase


def setup():
    Configuration.global_parameters['backend_host'] = ''
    Configuration.global_parameters['backend_port'] = ''


@patch('builtins.print')
@patch.object(socket.socket, 'connect', side_effect=mocked_socket_connect_ok)
def test_is_reachable(mocked_socket_connect_ok, mock_print):
    @is_reachable
    def function():
        return True

    setup()

    result = function()
    assert result is True


@patch('builtins.print')
@patch('time.sleep', return_value=None)
@patch.object(socket.socket, 'connect', side_effect=mocked_socket_connect_fail)
def test_is_not_reachable(mocked_socket_connect_fail, sleep, mock_print):
    @is_reachable
    def function():
        return True

    setup()

    result = function()
    TestCase().assertDictEqual(result.json, {'status': False, 'result': 'Gateway timeout'})
