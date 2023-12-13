![](client/static/images/eon.png)

# Epidemics Simulations

Epidemics Simulations is a web application that allows you to create and visualize epidemics on networks. The application is built using SvelteKit as a Static Site Generator (SSG) for the frontend and Flask as the backend web server.

## Requirements

Ensure you have the following prerequisites installed on your system:

- Python 3.9 - 3.10
- pnpm
- Google Chrome (Only for desktop app)

## Installation

Clone the repository

```sh
git clone https://github.com/victormhp/epidemics-sveltekit-flask.git
```

Navigate to the project directory

```sh
cd epidemics-sveltkit-flask.git
```

Use the provided build script for a quick setup

```sh
chmod +x build.sh
./build.sh
```

or do it manually

```sh
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
```

Run the flask server

```sh
python index.py
```

## Desktop App

To run the desktop app, it will be built using [FlaskWebGui](https://github.com/ClimenteA/flaskwebgui). Please ensure that Google Chrome or Chromium is installed on your system.

```sh
python desktop.py
```

## Executable for Desktop App

to create an executable for the desktop app, we utilize [PyInstaller](https://github.com/pyinstaller/pyinstaller). You have two options to build the app:

### Option 1: Run the provided script

```sh
chmod +x desktop.sh
./desktop.sh
```

### Option 2: Run the pyinstaller command manually.

```sh
cd ./server/
pyinstaller -w -F --name "epidemics" --clean --add-data "src/build:build" desktop.py
```

**Note**: In the --add-data argument the path separator is platform specific, os.pathsep (which is ; on Windows and : on most unix systems) is used.

Run the app

```sh
./dist/epidemics
```

## EoN Module

The simulations are made possible by [EoN](https://github.com/springer-math/Mathematics-of-Epidemics-on-Networks), a Python package designed for simulating epidemics on networks and solving Ordinary Differential Equation (ODE) models of disease spread.

For more details on using the EoN module, refer to the [Epidemics on Networks Documenation](https://epidemicsonnetworks.readthedocs.io/en/latest/EoN.html). It provides comprehensive information on utilizing the EoN package.
