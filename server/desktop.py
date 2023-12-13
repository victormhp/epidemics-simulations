from src import init_app
from flaskwebgui import FlaskUI


app = init_app()
ui = FlaskUI(app=app, server="flask")


if __name__ == '__main__':
    ui.run()
