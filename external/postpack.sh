#!/usr/bin/env bash

mv package.json.bak package.json

# shellcheck disable=SC2154
git tag "$npm_package_version"
git push origin refs/tags/"$npm_package_version"
