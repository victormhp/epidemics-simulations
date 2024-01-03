#!/usr/bin/bash

mkdir -p app && cd app
pyinstaller -w -F --name "epidemics" --clean --add-data "../build:build" "../server/desktop.py"