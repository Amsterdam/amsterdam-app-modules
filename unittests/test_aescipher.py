""" Unittest file for AESCipher class
"""

from GenericFunctions.AESCipher import AESCipher


def test_encryption_ok():
    """ Encryption should succeed
    :return: void
    """
    test_string = 'test string'
    aes = AESCipher(test_string, 'secret')
    encrypted = aes.encrypt()
    aes.data = encrypted
    cleartext = aes.decrypt()
    assert test_string == cleartext


def test_encrypt_fail():
    """ Encryption should fail
    :return: void
    """
    aes = AESCipher(b'', 'secret')
    result = aes.encrypt()
    assert result is None


def test_decrypt_fail():
    """ Decryption should fail
    :return: void
    """
    aes = AESCipher(b'', 'secret')
    result = aes.decrypt()
    assert result is None
