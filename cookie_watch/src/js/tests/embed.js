const run = async (url) => {
    let embed = document.createElement('embed');
    embed.src = url;
    // embed.style = "display:none"; // NO REQUEST SEND WHEN ACTIVE
    embed.width = "0";
    embed.height = "0";

    document.body.append(embed);
    await new Promise(r => setTimeout(r, 1000));
    embed.remove();

    return;
};

export {run};