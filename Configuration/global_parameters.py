import os

host = os.getenv('HOST', '0.0.0.0')
port = os.getenv('PORT', 8001)

# Flask server settings
environment = {
    'key': 'Gnomes are not little friends with pointy hats, hence rather different',
    'flask': {
        'HOST': host,
        'PORT': port
    }
}

# Applications working directory
cwd = os.getcwd()

# Global parameters populated in: WSGIServer.app()
global_parameters = {}
