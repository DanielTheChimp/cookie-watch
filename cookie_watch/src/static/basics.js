const status_busy = (text = '') => {
    let status = document.getElementById("status");

    status.setAttribute("aria-busy", "true");
    status.setAttribute("style", "margin-bottom: 15px;");

    if(text == '') {
        status.innerText = "Request pending ...";
    } else {
        status.innerText = text;
    }
    
};

const status_result = (success, text) => {
    let status = document.getElementById("status");

    if(success) {
        status.setAttribute("style", "margin-bottom: 15px; color: #388e3c");
        status.innerText = "✔\t" + text;
    } else {
        status.setAttribute("style", "margin-bottom: 15px; color: #c62828");
        status.innerText = "❌\t" + text;
    }

    status.setAttribute("aria-busy", "false");
};

const all_buttons_disabled = (target = true) => {
    all_buttons = document.querySelectorAll("button");

    for(let button of all_buttons) {
        button.disabled = target;
    }
};

testmode_iframe = false;

const toggle_mode = async () => {
    testmode_iframe = document.getElementById("switch").checked
    label = document.getElementById("cookie_text");

    if(testmode_iframe) {
        label.innerText = "Set cookies as third-party";
    } else {
        label.innerText = "Set cookies as first-party";
    }
}

const set_cookies = async () => {
    status_busy();

    if(testmode_iframe) {
        let iframe = document.createElement('iframe');

        iframe.style = "display:none";
        iframe.src = "https://cookie.danielp.work/set";

        document.body.append(iframe);
        await new Promise(r => setTimeout(r, 1000));
        iframe.remove();
    } else {
        window.open("https://cookie.danielp.work/set", "_self");
        await new Promise(r => setTimeout(r, 1000));
    }
    status_result(true, "Cookies set");
}

const unset_cookies = async () => {
    status_busy();

    if(testmode_iframe) {
        let iframe = document.createElement('iframe');

        iframe.style = "display:none";
        iframe.src = "https://cookie.danielp.work/unset";

        document.body.append(iframe);
        await new Promise(r => setTimeout(r, 1000));
        iframe.remove();
    } else {
        window.open("https://cookie.danielp.work/unset", "_self");
        await new Promise(r => setTimeout(r, 1000));
    }
    status_result(true, "Cookies removed");
}
