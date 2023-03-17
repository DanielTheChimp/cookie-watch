const run = async (url) => {
    let link = document.createElement('link');
    link.rel = 'icon';
    link.href = url;

    document.head.append(link);
    await new Promise(r => setTimeout(r, 1000));
    link.remove();

    return;
};

export {run};