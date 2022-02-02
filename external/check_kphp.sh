#!/usr/bin/env bash

if [ -z "$(which docker)" ]; then
  echo '[ERROR] Docker not found in distribution. It is required to run kphp checks.';
  exit 0 # it's generally fine, just skip check for this case.
fi

if ! docker pull vkcom/kphp; then
  echo '[ERROR] Docker failed to receive kphp image. Make sure you have sufficient rights (e.g. your user is in the docker group).';
  exit 1
fi

test -t 1 && USE_TTY="-t"

mkdir `pwd`/demo/public/kphp_out

docker run ${USE_TTY} -i -v `pwd`/demo/public:/tmp/dev:rw -v`pwd`/demo/public/kphp_out:/kphp_out:rw vkcom/kphp /bin/sh -c 'kphp /tmp/dev/index.php -o /tmp/dev/compiled_demo --include-dir "/tmp/dev/build/" --verbosity 3'
exit $?
