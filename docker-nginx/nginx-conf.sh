#!/bin/bash
#
# Creates a NGINX configuration file

cat<<-EO_CONFIG> ${NGINX_CONF_DIR}/${BASE_HREF}.conf

location /${BASE_HREF} {
  try_files \$uri \$uri/ \$uri.html \$uri/index.html @angular-fallback;
}

location  @angular-fallback {
  rewrite  ^(.*)\$  /${BASE_HREF}/index.html last;
}

EO_CONFIG
