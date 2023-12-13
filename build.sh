#!/usr/bin/bash

# Install and build frontend
cd ./client/
pnpm install
pnpm run build


# Create and activate venv
cd ../server/
python -m venv venv
source ./venv/bin/activate

# Install python libraries 
pip install -r requirements.txt
