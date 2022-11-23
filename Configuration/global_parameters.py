""" Global parameters used in FLASK application
"""

import os
import logging
import sys
from distutils.util import strtobool


# Current working directory
cwd = os.getcwd()

DEBUG = bool(strtobool(os.getenv('DEBUG', 'false')))

# Setup logging
file_handler = logging.FileHandler(filename='tmp.log')
stdout_handler = logging.StreamHandler(sys.stdout)

if DEBUG is True:
    handlers = [file_handler, stdout_handler]
    LOG_FORMAT = '[%(filename)s:%(lineno)d] %(levelname)s - %(message)s'
else:
    handlers = [file_handler]
    LOG_FORMAT = '[%(asctime)s] %(levelname)s - %(message)s'

logging.basicConfig(
    level=logging.INFO,
    format=LOG_FORMAT,
    handlers=handlers
)

logger = logging.getLogger(__name__)


environment = {
    'flask': {
        'HOST': os.getenv('HOST', '0.0.0.0'),
        'PORT': int(os.getenv('PORT', '8001'))
    },
    'TARGET': os.getenv('TARGET', 'api-server'),
    'TARGET_PORT': int(os.getenv('TARGET_PORT', '8000')),
    'DEBUG': DEBUG,
    'AES_SECRET': os.getenv('AES_SECRET'),
    'logger': logger
}
