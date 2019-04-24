#!/bin/bash
#
# Checks to see if application is running

status=$(curl \
  -s -o /dev/null \
  -w "%{http_code}" \
  http://localhost:8080/${BASE_HREF}/index.html \
);

if [ ${status} -eq 200 ]; then
  exit 0;
else
  exit 1;
fi
