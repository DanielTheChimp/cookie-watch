const run = async (url) => {
    let link = document.createElement('a');

    link.href = url;
    link.target = "targetWindow";

    document.body.append(link);
    link.click();
    await new Promise(r => setTimeout(r, 1000));
    link.remove();
    return;
};

export {run};