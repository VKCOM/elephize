#!/usr/bin/env bash

if [ -z "$(which docker)" ]; then
  echo '[ERROR] Docker not found in distribution. It is required to run kphp checks.';
  exit 0 # it's generally fine, just skip check for this case.
fi

if ! docker pull vkcom/kphp; then
  echo '[ERROR] Docker failed to receive kphp image. Make sure you have sufficient rights (e.g. your user is in the docker group).';
  exit 1
fi

docker run --log-driver none -v `pwd`/demo:/tmp:rw vkcom/kphp /bin/sh -c 'cd /tmp/public && ./compiled_demo --once > compiled_output.txt && chmod 777 compiled_output.txt'
cat demo/public/compiled_output.txt | ./external/htmlformat > demo/public/compiled_formatted.txt
