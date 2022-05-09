import logging
from pact import Verifier
import WSGIServer
import socket
import time
import MockBackendServer
log = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
import os


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

    def setup(self):
        self.mock_backend = MockBackendServer.MockBackendServer()

    def tear_down(self):
        self.mock_backend.stop()

    def run_test(self):
        self.setup()
        with WSGIServer.APIServer(debug=True):
            # Wait until provider is alive
            if self.wait_for_provider_is_alive():
                verifier = Verifier(provider='amsterdam-app-modules',
                                    provider_base_url=self.provider_url)
                output, logs = verifier.verify_pacts('./pact.json')
            else:
                assert False is True
        self.tear_down()
        assert output == 0


if __name__ == '__main__':
    pact_test = PactTests()
    pact_test.run_test()
