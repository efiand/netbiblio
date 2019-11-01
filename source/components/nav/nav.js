class Nav {
  constructor(element) {
    this.element = element;
    this.list = element.querySelector(`.nav__list`);
    this.prev = element.querySelector(`.nav__link--prev`);
    this.toc = element.querySelector(`.nav__link--toc`);
    this.next = element.querySelector(`.nav__link--next`);

    this.setInitials();
    this.setListeners();
  }

  setInitials() {
    // Предотвращение ухода правой части за прокрутку модального окна
    // (для всех браузеров кроме Firefox для Windows XP)
    if (!/NT 5.*Firefox/.test(navigator.userAgent)) {
      this.list.style.maxWidth = `calc(100vw - ${scrollWidth}px)`;
    }
  }

  setListeners() {
    document.addEventListener(`keydown`, (evt) => {
      if (!evt.ctrlKey && !evt.shiftKey && !evt.altKey
        && !evt.target.classList.contains(`field`)) {

        // Стрелка влево
        if (evt.keyCode === 37) {
          evt.preventDefault();
          window.location = this.prev.href;
        } else if (evt.keyCode === 39) {

          // Стрелка вправо
          evt.preventDefault();
          window.location = this.next.href;
        } else if (evt.keyCode === 8) {

          // Backspace
          evt.preventDefault();
          // Пасхалочка :-)
          window.location = (this.toc) ? this.toc.href : `https://efiand.ru`;
        }
      }
    });
  }
}

applyClass(`.nav`, Nav);
