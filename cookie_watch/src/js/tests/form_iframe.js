const run = async (url) => {
  let form = document.createElement('form');
  let iframe = document.createElement('iframe');

  iframe.name = "hidden-frame";
  iframe.style = "display:none";

  form.method = "post";
  form.action = url;
  form.target = "hidden-frame";

  document.body.append(iframe);
  document.body.append(form);
  form.submit();
  await new Promise(r => setTimeout(r, 1000));
  form.remove();
  iframe.remove();
  return;
};

export {run};