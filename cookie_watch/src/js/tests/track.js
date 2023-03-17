const run = async (url) => {
    let video = document.createElement('video');
    let track = document.createElement('track');

    track.setAttribute('default', 'default');
    track.src = url;

    video.append(track);
    return;
};

export {run};