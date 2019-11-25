const xhr = new XMLHttpRequest();
const api = {
  ctx: null
};

xhr.addEventListener(`load`, () => {
  if (xhr.status === 200) {
    api.ctx.res = window.data.isIE ? JSON.parse(xhr.response) : xhr.response;
    api.ctx.status = api.ctx.res.status;
  } else {
    api.ctx.status = window.renderTemplate(window.data.ERRORS.status, [xhr.status, xhr.statusText]);
  }
  api.ctx.responseHandler();
});

xhr.addEventListener(`error`, () => {
  api.ctx.status = window.data.ERRORS.connect;
  api.ctx.responseHandler();
});

xhr.addEventListener(`timeout`, () => {
  api.ctx.status = window.renderTemplate(window.data.ERRORS.timeout, [xhr.timeout]);
  api.ctx.responseHandler();
});

window.ajaxHandler = (incomingCtx) => {
  api.ctx = incomingCtx;
  xhr.open(api.ctx.form.method, api.ctx.action);
  xhr.responseType = `json`;
  xhr.setRequestHeader(`Content-Type`, `application/x-www-form-urlencoded`);
  xhr.send(api.ctx.formData ? `data=${encodeURIComponent(JSON.stringify(api.ctx.formData))}` : null);
};
