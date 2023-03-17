const run = async (url) => {
    try {
        await import(url);
    } catch {};
    
    return;
};

export {run};