// Узнаем ширину полосы прокрутки
const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

// Задел на рефакторинг
document.documentElement.style.setProperty(`--scroll-width`, `${scrollWidth}px`);
