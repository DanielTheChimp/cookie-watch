const run = async (url) => {
  let link = document.createElement('a');
  let iframe = document.createElement('iframe');

  iframe.name = "hidden-frame";
  iframe.style = "display:none";

  link.href = url;
  link.target = "hidden-frame";

  document.body.append(iframe);
  document.body.append(link);
  link.click();
  await new Promise(r => setTimeout(r, 1000));
  link.remove();
  iframe.remove();
  return;
};

export {run};