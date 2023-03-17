const run = async (url) => {
  let iframe = document.createElement('iframe');

  iframe.style = "display:none";
  iframe.src = url;

  document.body.append(iframe);
  await new Promise(r => setTimeout(r, 1000));
  iframe.remove();
  return;
};

export {run};