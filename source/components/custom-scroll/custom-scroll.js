// Узнаем ширину полосы прокрутки
const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

// Быстрый фикс отмены кастомной прокрутки, если на уровне страницы - нулевая (признак мобильной платформы)
if (!scrollWidth) {
  for (const el of document.querySelectorAll(`.custom-scroll`)) {
    el.classList.remove(`custom-scroll`);
  }
}

document.documentElement.style.setProperty(`--scroll-width`, `${scrollWidth}px`);
