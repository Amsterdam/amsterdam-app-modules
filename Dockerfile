FROM python:3.9.0-slim-buster as deploy
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=on

# Install python requirements
COPY requirements.txt /code/
RUN cd /code && python3 -m pip install -r requirements.txt

RUN apt-get update  \
 && apt-get -y install --no-install-recommends \
    netcat \
    procps \
    postgresql-client-11 \
 && rm -rf /var/lib/apt/lists/* /var/cache/debconf/*-old \
 && apt-get autoremove -y \
 && rm -rf /tmp/*

# Copy sources to container
COPY /static /code/static
COPY init.sh /code/
COPY manage.py /code/
COPY create_user.py /code/
COPY amsterdam_app_backend /code/amsterdam_app_backend
COPY amsterdam_app_api /code/amsterdam_app_api

# Setup run script
RUN chmod +x /code/init.sh
