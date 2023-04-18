FROM node:alpine as build-phase-1

# Add source
COPY modules-fe /code/modules-fe

# Build React website
RUN cd /code/modules-fe \
 && npm install \
 && npm run build

FROM python:3.9.0-alpine3.12 as deploy
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=on

# Install python requirements
COPY requirements.txt /code/

RUN apk add --no-cache \
    bash \
    postgresql-client \
    netcat-openbsd \
    procps \
    libjpeg

RUN apk add --no-cache --virtual .build-deps \
    jpeg-dev \
    zlib-dev \
    gcc \
    python3-dev \
    musl-dev \
    postgresql-dev \
    && cd /code && python3 -m pip install -r requirements.txt \
    && apk del --no-cache .build-deps \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*

# Copy sources to container
COPY /static /code/static
COPY --from=build-phase-1 /code/modules-fe/build /code/static/build
COPY init.sh /code/
COPY manage.py /code/
COPY create_user.py /code/
COPY amsterdam_app_backend /code/amsterdam_app_backend
COPY amsterdam_app_api /code/amsterdam_app_api

# Setup run script
RUN chmod +x /code/init.sh
