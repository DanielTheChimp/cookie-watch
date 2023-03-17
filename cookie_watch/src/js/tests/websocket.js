const run = async (url) => {
    new WebSocket("wss:" + url.split(":")[1]);
    return;
};

export {run};