const run = async (url) => {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let image = document.createElement('image');
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);
    svg.append(image);

    document.body.append(svg);
    svg.innerHTML += "";
    await new Promise(r => setTimeout(r, 1000));
    svg.remove();

    return;
};

export {run};