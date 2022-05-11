def mocked_socket_connect_ok(*args):
    pass


def mocked_socket_connect_fail(*args):
    raise Exception('Connection error')
