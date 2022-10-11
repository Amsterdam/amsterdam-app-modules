FROM node:current-alpine3.16 as build-phase-1

# Add source
COPY modules-fe /code/modules-fe

# Build vue webside
RUN cd /code/modules-fe \
 && npm install \
 && npm run build

FROM python:3.9-alpine3.15 as build-phase-2
COPY build-docker-image/requirements.txt /root
RUN apk add --no-cache --virtual .build-deps gcc musl-dev \
 && mkdir /code \
 && python3 -m venv --copies /code/venv \
 && . /code/venv/bin/activate \
 && python3 -m pip --no-cache-dir install -r /root/requirements.txt \
 && rm -rf /tmp/* \
 && find / -name "*.so" -exec strip --strip-all {} \; \
 && find / -name "*.c" -delete \
 && find / -name "*.pyc" -delete \
 && apk del .build-deps

FROM python:3.9-alpine as PROD_IMAGE
#
# BUILD PRODUCTION IMAGE AND COPY DEPS FROM BASE_IMAGE
#

# Copy source into image
COPY --from=build-phase-1 /code/modules-fe/build /code/modules-fe/build
COPY --from=build-phase-2 /code/venv /code/venv/
COPY APIDocs/* /code/APIDocs/
COPY Configuration/* /code/Configuration/
COPY Decorators/* /code/Decorators/
COPY GenericFunctions/* /code/GenericFunctions/
COPY routes/* /code/routes/
COPY WSGIServer/* /code/WSGIServer/
COPY init.sh /code/
COPY main.py /code/

# Install python requirements
RUN chmod +x /code/init.sh
EXPOSE 9000
CMD ["/bin/sh", "/code/init.sh"]
