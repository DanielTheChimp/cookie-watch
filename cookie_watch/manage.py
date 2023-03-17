from flask.cli import FlaskGroup
from src import init

app = init.create_app()
cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()