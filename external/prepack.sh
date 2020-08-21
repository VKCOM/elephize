#!/usr/bin/env bash

sed -i.bak -e 's/"main": "src\/cli.ts"/"main": "dist\/src\/cli.js"/g' package.json
