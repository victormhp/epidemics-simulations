#!/usr/bin/bash

# Install and build frontend
cd ./client/
pnpm install
pnpm run build


# Create venv
cd ../api/
python -m venv venv
source ./venv/bin/activate

# Install libraries and run flask app
pip install -r requirements.txt
