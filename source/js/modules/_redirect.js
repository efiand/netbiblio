// прогрессивное улучшение для статических страниц по форсированному переходу на https

const url = window.location.href;
if (window.location.protocol === `http:`) {
  window.location.replace(url.replace(`http:`, `https:`));
}
