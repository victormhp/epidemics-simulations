from src import init_app

app = init_app()

if __name__ == "__main__":
    app.run("0.0.0.0", 8997, debug=True)
