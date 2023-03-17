from flask import Blueprint, render_template, redirect, url_for
from src import db

bp = Blueprint('results', __name__)

@bp.route("/results", methods=["GET"])
def show():
    database = db.get_db()
    dump = list(database["results"].find())
    return render_template("results.html", dump=dump)

@bp.route("/results/drop", methods=["POST"])
def drop_collection():
    database = db.get_db()
    database["results"].drop()
    return redirect(url_for('results'))