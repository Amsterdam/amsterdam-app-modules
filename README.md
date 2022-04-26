# Amsterdam App Modules
The purpose of this software is to register modules for the Amsterdam App. You can select which modules are (in-)active.

# Setup your development environment
Clone this project and in the root folder of this project run the command below to set up your development environment
    
    python3 -m venv venv
    python3 -m pip install -r build-docker-image/requirements.txt

# Unit testing
Make sure you've installed the test-requirements. You can find them in build-docker-image/requirements-unittest.txt

    python3 -m pip install -r build-docker-image/requirements-unittest.txt

Clone this project and in the root folder of this project run the command below to run the unit-tests

    PYTHONPATH=`pwd` pytest --no-header --no-summary -q unittests/

# Docker build
Clone this project and in the root folder of this project run the command below to build the docker image.

    docker build -t amsterdam-app-modules -f build-docker-image/Dockerfile .

# Execute
You can point to an TARGET server of your choosing by passing the environment parameter TARGET with the docker run 
command. This can either be a fully qualified domain name or ip-address. You can also pass a TARGET-PORT parameter. 

    AES_SECRET: A shared secret (required)
    TARGET: FQDN or ip address of the recieving end (default: api-server)
    TARGET_PORT: The tcp port on the recieving end (default: 8000)
    
    docker run --name amsterdam-app-modules -p 8000:8000 -e <AES_SECRET> -e TARGET=<FQDN or ip-address> TARGET_PORT=<int> amsterdam-app-modules
    
# API documentation

    /api/v1/apidocs

# Dependencies
This software works in conjunction with https://github.com/Amsterdam/amsterdam-app-backend as a TARGET.
