####
# Deploy nshmp-apps in NGINX.
#
# Build:
#   docker build --build-arg BASE_HREF=<some/path> <IMAGE_NAME>:<IMAGE_TAG> .
#
# Run:
#   docker run -p <PORT>:8080 -d usgsnshmp/nshmp-apps
####

# Project name
ARG PROJECT=nshmp-apps

# The builder environment working directory
ARG BUILDER_WORKDIR=/${PROJECT}

# Base url for nshmp-apps
ARG BASE_HREF=nshmp

####
# From Image: usgs/node:10
# Description: Compile Angular source into distribution bundle.
####
FROM usgs/node:10 as builder

# Get builder working directory
ARG BUILDER_WORKDIR

# Get application base url
ARG BASE_HREF

# Copy project to container
COPY --chown=usgs-user:usgs-user . ${BUILDER_WORKDIR}

# Set working diretory
WORKDIR ${BUILDER_WORKDIR}

# Build application
RUN /bin/bash --login -c "\
  npm install --no-save \
  && npm run build -- --prod --base-href /${BASE_HREF}/ \
  "

####
# From Image: usgs/nginx
# Description: Deploy nshmp-apps to nginx
####
FROM usgs/nginx

# Get builder working directory
ARG BUILDER_WORKDIR

# Get application base url
ARG BASE_HREF

# Get project name
ARG PROJECT

# Location of default healthcheck script
ENV HEALTHCHECK_SCRIPT=/healthcheck.sh

# NGINX
ENV DOCUMENT_ROOT=/usr/share/nginx/html

# Environment variables for hooks
ENV BASE_HREF=${BASE_HREF}
ENV NGINX_CONF_DIR=/etc/nginx/default.d

# Copy hooks to container
COPY docker-nginx /hooks

# Set user to root
USER root

# Remove boiler plate files
RUN rm -rf ${DOCUMENT_ROOT}

# Link new healthcheck script
RUN ln -sf /hooks/healthcheck.sh ${HEALTHCHECK_SCRIPT} \
  && chmod +x ${HEALTHCHECK_SCRIPT}

# Set user to usgs-user
USER usgs-user

# Set working directory
WORKDIR ${DOCUMENT_ROOT}

# Copy distribution bundle from builder image
COPY --from=builder ${BUILDER_WORKDIR}/dist/${PROJECT} ${BASE_HREF}

# Remove default config files and create a new one
RUN rm -rf ${NGINX_CONF_DIR}/*.conf \
  && /bin/bash /hooks/nginx-conf.sh
