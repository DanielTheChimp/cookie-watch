const run = async (url) => {
    const req = new XMLHttpRequest();
    req.withCredentials = true;
    req.open("POST", url);
    req.send();
    return;
};

export {run};