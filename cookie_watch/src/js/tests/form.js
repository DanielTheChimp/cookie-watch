const run = async (url) => {
  let form = document.createElement('form');

  form.method = "post";
  form.action = url;
  form.target = "targetWindow";

  document.body.append(form);
  form.submit();
  await new Promise(r => setTimeout(r, 1000));
  form.remove();
  return;
};

export {run};