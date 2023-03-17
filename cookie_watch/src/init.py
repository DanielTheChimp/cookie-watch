from flask import Flask 
import os

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MONGO_USER='root',
        MONGO_PW='example',
    )

    if test_config is None:
        # overrides the default configuration with values taken from the config.py 
        # file in the instance folder if it exists.
        if(app.config.from_pyfile("config.py", silent=True)):
            app.config["MONGO_USER"] = os.environ["MONGO_USER"]
            app.config["MONGO_PW"] = os.environ["MONGO_PW"]
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from src import index
    app.register_blueprint(index.bp)
    app.add_url_rule("/", endpoint="index")

    from src import results
    app.register_blueprint(results.bp)
    app.add_url_rule("/results", endpoint="results")

    from src import comparison
    app.register_blueprint(comparison.bp)
    app.add_url_rule("/comparison", endpoint="comparison")

    return app