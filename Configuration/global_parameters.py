import os
import logging
import sys
from distutils.util import strtobool

debug = bool(strtobool(os.getenv('DEBUG', 'false')))

# Setup logging
file_handler = logging.FileHandler(filename='tmp.log')
stdout_handler = logging.StreamHandler(sys.stdout)

if debug is True:
    handlers = [file_handler, stdout_handler]
    log_format = '[%(filename)s:%(lineno)d] %(levelname)s - %(message)s'
else:
    handlers = [file_handler]
    log_format = '[%(asctime)s] %(levelname)s - %(message)s'

logging.basicConfig(
    level=logging.INFO,
    format=log_format,
    handlers=handlers
)

logger = logging.getLogger(__name__)


environment = {
    'flask': {
        'HOST': os.getenv('HOST', '0.0.0.0'),
        'PORT': int(os.getenv('PORT', 8001))
    },
    'TARGET': os.getenv('TARGET', 'api-server'),
    'TARGET_PORT': int(os.getenv('TARGET_PORT', 8000)),
    'DEBUG': debug,
    'AES_SECRET': os.getenv('AES_SECRET'),
    'logger': logger
}
