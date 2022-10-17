FROM python:3.9-alpine3.15 as BASE_IMAGE
COPY build-docker-image/requirements.txt /root
RUN apk update \
 && apk add --no-cache --virtual .build-deps gcc musl-dev build-base \
 && mkdir /code \
 && python3 -m venv --copies /code/venv \
 && . /code/venv/bin/activate \
 && python3 -m pip install -U wheel setuptools \
 && python3 -m pip --no-cache-dir install -r /root/requirements.txt \
 && rm -rf /tmp/* \
 && find / -name "*.so" -exec strip --strip-all {} \; \
 && find / -name "*.c" -delete \
 && find / -name "*.pyc" -delete \
 && apk del .build-deps

#
# BUILD PRODUCTION IMAGE AND COPY DEPS FROM BASE_IMAGE
#

FROM python:3.9-alpine as PROD_IMAGE
COPY --from=BASE_IMAGE /code/venv /code/venv/

# Copy source into imagek
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
