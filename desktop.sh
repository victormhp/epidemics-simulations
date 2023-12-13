#!/usr/bin/bash

cd ./server/
pyinstaller -w -F --name "epidemics" --clean --add-data "src/build:build" desktop.py