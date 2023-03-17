from flask import Blueprint, render_template, render_template_string, request, make_response
from src import db
from datetime import datetime
from re import search

bp = Blueprint('index', __name__)

USE_CHIPS = False

@bp.route("/", methods=["GET"])
def show():
    return render_template("index.html")

@bp.route("/<method>", methods=["GET"])
def handle_cookies(method):
    resp = make_response(render_template_string("OK"))

    if(method == "set"):
        if USE_CHIPS:
            resp.headers.add("Set-Cookie", "Default=1;Secure;Path=/;Partitioned")
            resp.headers.add("Set-Cookie", "SameSite_None_Secure=1; SameSite=None;Secure;Path=/;Partitioned")
            resp.headers.add("Set-Cookie", "SameSite_Lax=1; SameSite=Lax;Secure;Path=/;Partitioned")
            resp.headers.add("Set-Cookie", "SameSite_Strict=1; SameSite=Strict;Secure;Path=/;Partitioned")
        else:
            resp.headers.add("Set-Cookie", "Default=1")
            resp.headers.add("Set-Cookie", "SameSite_None=1; SameSite=None")
            resp.headers.add("Set-Cookie", "SameSite_None_Secure=1; SameSite=None;Secure")
            resp.headers.add("Set-Cookie", "SameSite_Lax=1; SameSite=Lax")
            resp.headers.add("Set-Cookie", "SameSite_Strict=1; SameSite=Strict")      
    elif(method == "unset"):
        resp.delete_cookie("Default")
        resp.delete_cookie("SameSite_None")
        resp.delete_cookie("SameSite_None_Secure")
        resp.delete_cookie("SameSite_Lax")
        resp.delete_cookie("SameSite_Strict")
    else:
        resp = make_response(render_template_string("WRONG METHOD"))

    return resp

@bp.route("/test/<name>", methods=["GET", "POST"])
def catch(name):
    save_result(name)
    return render_template_string("OK")
    
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
def browser_detection(user_agent):
    res = ["BROWSER NOT DETECTED", "ERROR"]
    firefox = search("Firefox\/[0-9,\.]+", user_agent)
    safari = search("Safari\/[0-9,\.]+", user_agent)
    chrome = search("Chrome\/[0-9,\.]+", user_agent)

    if firefox:
        res = firefox.group().split("/")
    elif safari:
        if chrome:
            res = chrome.group().split("/")
        else:
            res = safari.group().split("/")
        
    return res[0], res[1]

def save_result(name):
    database = db.get_db()

    current_date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    browser, version = browser_detection(request.user_agent.string)
    test_name = name.replace("_", " ").title()

    # special cases for coherent test names
    test_name = test_name.replace("Get", "GET").replace("Post", "POST")
    test_name = test_name.replace("Iframe", "iFrame").replace("Xmlhttprequest", "XMLHttpRequest")
    test_name = test_name.replace("Imagesrcset", "ImageSrcSet").replace("Svg", "SVG")
    test_name = test_name.replace("Websocket", "WebSocket")

    database["results"].insert_one(
        {
            "time":current_date,
            "user_agent":request.user_agent.string,
            "browser":browser,
            "version":version,
            "test":test_name,
            "cookies":request.cookies,
        }
    )