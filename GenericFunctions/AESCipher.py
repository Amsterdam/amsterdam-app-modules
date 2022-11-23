""" Decrypt/Encrypt module
"""

# pylint: disable=W0703

from hashlib import md5
from Crypto import Random
from Crypto.Cipher import AES
from pybase64 import b64encode, b64decode
import Configuration


class AESCipher:
    """ Implements AESCipher from base64 encoded string
    """
    def __init__(self, data, secret):
        self.logger = Configuration.environment['logger']
        self.data = data
        self.secret = secret.encode()
        block_size = 16
        self.pad = lambda s: s + (block_size - len(s) % block_size) * chr(block_size - len(s) % block_size)
        self.unpad = lambda s: s[:-ord(s[len(s) - 1:])]

    def bytes_to_key(self, data, salt, output=48):
        """

        :param data:
        :param salt:
        :param output:
        :return:
        """
        assert len(salt) == 8, len(salt)
        data += salt
        key = md5(data).digest()
        final_key = key
        while len(final_key) < output:
            key = md5(key + data).digest()
            final_key += key
        return final_key[:output]

    def encrypt(self):
        """ Encrypt string and base64 encode
        :return:
        """
        try:
            salt = Random.new().read(8)
            key_iv = self.bytes_to_key(self.secret, salt, 32+16)
            key = key_iv[:32]
            iv = key_iv[32:]
            aes = AES.new(key, AES.MODE_CBC, iv)
            return b64encode(b"Salted__" + salt + aes.encrypt(self.pad(self.data).encode())).decode()
        except Exception as error:
            self.logger.error(error)
            return None

    def decrypt(self):
        """ Decrypt string and base64 decode
        :return:
        """
        try:
            encrypted = b64decode(self.data)
            assert encrypted[0:8] == b"Salted__"
            salt = encrypted[8:16]
            key_iv = self.bytes_to_key(self.secret, salt, 32+16)
            key = key_iv[:32]
            iv = key_iv[32:]
            aes = AES.new(key, AES.MODE_CBC, iv)
            return self.unpad(aes.decrypt(encrypted[16:])).decode()
        except Exception as error:
            self.logger.error(error)
            return None
