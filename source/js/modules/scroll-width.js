// Узнаем ширину полосы прокрутки

// Создадим элемент с прокруткой
let div = document.createElement(`div`);

div.style.overflowY = `scroll`;
div.style.width = `50px`;
div.style.height = `50px`;
div.style.visibility = `hidden`;

document.body.appendChild(div);

const scrollWidth = div.offsetWidth - div.clientWidth;
document.body.removeChild(div);
