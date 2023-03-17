const run = async (url) => {
    let iframe = document.createElement('iframe');
  
    iframe.name = "hidden-frame";
    iframe.style = "display:none";
 
    document.body.append(iframe);
    window.open(url, "hidden-frame");
    await new Promise(r => setTimeout(r, 1000));
    iframe.remove();
    return;
  };
  
  export {run};