from flask import Blueprint, render_template, redirect, url_for, request, render_template_string
from src import db

bp = Blueprint('comparison', __name__)

test_names = [
    'Fetch GET','Fetch POST','XMLHttpRequest GET','XMLHttpRequest POST',
    'Hyperlink','Hyperlink iFrame','Form','Form iFrame','iFrame','Embed',
    'Window Open','Window Open iFrame','WebSocket','Audio','Video',
    'Image','SVG','Link Icon','Link Stylesheet','Link Prefetch',
    'Link Preload Font','Link Preload Image','Link Preload ImageSrcSet',
    'Link Preload Script','Link Preload Style','Import','Object','Script'
]

def get_results():
    database = db.get_db()
    all_entries = list(database["comparison"].find())

    # Create list of all performed tests included in database
    tests = {}
    for test in test_names:
            tests[test] = []
    browsers = []
    for browser in all_entries:
        browsers.append((browser["tag"], browser["version"]))

    cookies = ["Default", "SameSite_None", "SameSite_None_Secure", "SameSite_Lax", "SameSite_Strict"]
    # Populate List
    for browser in all_entries:
        for name, results in tests.items():
            if name not in browser["tests"]:
                results.append(["","","","",""])
                continue
            
            res = browser["tests"][name]
            out = []

            for cookie in cookies:
                if cookie in res:
                    out.append("+")
                else:
                    out.append("-")
            tests[name].append(out)
    return tests, browsers

@bp.route("/comparison/to_latex", methods=["GET"])
def to_latex():
    output = r"\begin{tabular}"
    tests, browsers = get_results()

    # HEADER
    # Formatting
    output += r"{l"
    for _ in browsers:
        output += r"|ccccc"
    output += r"|} "

    # Browser - Row
    output += r"\begin{tabular}{@{}l@{}}Browser\\Settings\end{tabular} "
    for b in browsers:
        name, mode = b[0].split(" ", 1)
        output += r" & \multicolumn{5}{l|}{\begin{tabular}[c]{@{}l@{}}" + name + r" " + b[1] + r"\\ " + mode + r"\end{tabular}}"
    output += r"\\ "

    # Cookies - Row
    output += r"Cookies "
    for b in browsers:
        output += r"& \rotatebox{90}{Default} & \rotatebox{90}{None"

        # Chrome never allows None to be set
        if(b[0].split(" ", 1)[0] == "Chrome"):
            output += r"*"

        output += r"} & \rotatebox{90}{None Secure\,} & \rotatebox{90}{Lax} & \rotatebox{90}{Strict}"
    output += r"\\ "

    # BODY
    output += r"\midrule "
    for name, results in tests.items():
        output += name
        for t in results:
            for i in range(5):
                output += r" & "
                if(t[i] == "+"):
                    output += r"\faCircle"
                elif(t[i] == "-"):
                    output += r"\faCircleO"
                else:
                    output += r"--"
        output += r"\\ "

    # FINISH
    colls = len(browsers) * 5 + 1
    output += r"\midrule "
    output += r"\multicolumn{" + str(colls) + r"}{c}{"
    output += r"* No cookie set \quad \faCircle \, Cookie received \quad \faCircleO \, No cookie received \quad -- \, No request received \quad \faAdjust \, Only in the first 120 seconds} "
    output += r"\end{tabular}"

    return render_template_string(output)

@bp.route("/comparison", methods=["GET"])
def show():
    output_tests, output_browser = get_results()

    return render_template("comparison.html", tests=output_tests, browser=output_browser)

@bp.route("/comparison", methods=["POST"])
def transfer_collection():
    database = db.get_db()
    entry_list = list(database["results"].find({},{ "time": 0, "user_agent": 0 }))
    tests = {}

    for entry in entry_list:
        tests[entry["test"]] = entry["cookies"]

    database["comparison"].insert_one(
        {
            "browser":entry_list[0]["browser"],
            "version":entry_list[0]["version"],
            "tag":request.form["tag"],
            "tests":tests,
        }
    )

    return redirect(url_for('comparison'))

@bp.route("/comparison/drop", methods=["POST"])
def drop_collection():
    database = db.get_db()
    database["comparison"].drop()
    return redirect(url_for('comparison'))