const run = async (url) => {
    let script = document.createElement('script');
    script.src = url;

    document.body.append(script);
    await new Promise(r => setTimeout(r, 1000));
    script.remove();

    return;
};

export {run};