#!/usr/bin/env bash

RED='\033[0;31m'
NC='\033[0m' # No Color
retval=0

# shellcheck disable=SC2044
for i in $(find src/__tests__/ -type f -iname '*.php'); do
  if ! php -l "$i" > /dev/null;
  then
    retval=1
  fi
done

if [[ "$retval" -eq "1" ]]; then
  echo "----------------------------------------------------------------------------------------"
  echo -e "${RED}Specimen check failed${NC}: invalid php code found in test data examples. See messages above."
  echo "----------------------------------------------------------------------------------------"
fi

exit $retval
