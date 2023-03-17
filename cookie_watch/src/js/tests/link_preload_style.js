const run = async (url) => {
    let link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style'
    link.href = url;

    document.body.append(link);
    await new Promise(r => setTimeout(r, 1000));
    link.remove();

    return;
};

export {run};