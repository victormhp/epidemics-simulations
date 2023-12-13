from index import app
from flaskwebgui import FlaskUI

if __name__ == '__main__':
    FlaskUI(app=app, server="flask").run()

