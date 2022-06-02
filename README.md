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

### Create container on m1 arch for amd64
    
    docker buildx build --platform=linux/amd64 -f build-docker-image/Dockerfile . -t registry-ams.luscinia-solutions.com/backend-modules:tst-latest
    docker buildx build --platform=linux/amd64 -f build-docker-image/Dockerfile . -t registry-ams.luscinia-solutions.com/backend-modules:prd-latest

# Execute
create a file called 'env' in the root of the project and populated the parameters

Explanation of the parameters

- HOST: The ip-address where this services is reachable (e.g. 0.0.0.0 all)
- PORT: The port number where this services is reachable (e.g. 9000)
- AES_SECRET: A shared secret (required)
- TARGET: FQDN or ip address of the recieving end (default: api-server)
- TARGET_PORT: The tcp port on the recieving end (default: 8000)
  
Example:

    HOST=0.0.0.0
    PORT=9001
    TARGET=api.test.backend.luscinia-solutions.com
    TARGET_PORT=8001
    AES_SECRET=some-secret

You can start the container by running the start.sh script. This will build and run the image with set parameters.
    
# API documentation

    /api/v1/apidocs

# Dependencies

This software works in conjunction with https://github.com/Amsterdam/amsterdam-app-backend as a TARGET.
