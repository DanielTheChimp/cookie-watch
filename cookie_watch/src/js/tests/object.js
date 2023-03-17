const run = async (url) => {
    let object = document.createElement('object');
    object.data = url;
    // object.style = "display:none"; // NO REQUEST SEND WHEN ACTIVE
    object.width = "0";
    object.height = "0";

    document.body.append(object);
    await new Promise(r => setTimeout(r, 1000));
    object.remove();

    return;
};

export {run};