import os
import socket
import time
from pact import Verifier
from MockBackendServer.MockBackendServer import MockBackendServer
from WSGIServer.app import APIServer


class PactTests:
    def __init__(self):
        self.provider_host = 'localhost'
        self.provider_port = 8001
        self.provider_url = 'http://{host}:{port}'.format(host=self.provider_host, port=self.provider_port)
        self.provider_thread = None
        self.mock_backend = None
        os.environ['TARGET'] = 'localhost'
        os.environ['AES_SECRET'] = 'mock'

    def wait_for_provider_is_alive(self):
        for i in range(3):
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.settimeout(1)
                    s.connect((self.provider_host, self.provider_port))
                    return True
            except Exception as error:
                time.sleep(0.2)
        return False

    def run_test(self):
        with MockBackendServer(pact=True):
            with APIServer(debug=True):
                if self.wait_for_provider_is_alive():
                    verifier = Verifier(provider='amsterdam-app-modules',
                                        provider_base_url=self.provider_url)
                    output, logs = verifier.verify_pacts('./pact.json')
                else:
                    assert False is True
        assert output == 0


if __name__ == '__main__':
    pact_test = PactTests()
    pact_test.run_test()
