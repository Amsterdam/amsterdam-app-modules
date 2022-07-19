from flask import Blueprint
routes = Blueprint('api_routes', __name__)

from .api import *
from .index import *
