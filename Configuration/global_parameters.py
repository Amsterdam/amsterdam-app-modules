import os

# Flask server settings
environment = {
    'key': 'Gnomes are not little friends with pointy hats, hence rather different',
    'flask': {
        'HOST': os.getenv('HOST', '0.0.0.0'),
        'PORT': os.getenv('PORT', 8001)
    }
}

# Applications working directory
cwd = os.getcwd()

# Global parameters populated in: WSGIServer.app()
global_parameters = {}
