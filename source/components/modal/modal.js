class Modal {
  constructor(element) {
    this.element = element;
    this.id = element.getAttribute(`id`);
    this.inner = element.querySelector(`.modal__inner`);
    this.openers = document.querySelectorAll(`[data-open="${this.id}"]`);
    this.closer = element.querySelector(`.modal__closer`);
    this.offset = 0;

    // Первый элемент модального блока, способный поймать фокус
    this.firstFocusable = element.querySelector(`input, textarea, a, button, [tabindex]`);

    // Есть ли в модальном блоке форма с поддержкой сообщения об ошибке:
    this.siteErrorSender = element.querySelector(`.field--site-error-place`);

    this.setInitials();
    this.setListeners();
  }

  setInitials() {
    this.element.classList.add(`modal--js`);

    this.overflowHandler();
  }

  setListeners() {
    for(let i = 0; i < this.openers.length; i++) {
      this.openers[i].addEventListener(`click`, (evt) => {
        this.openHandler(evt);
      });
    }

    // Если внутри форма с поддержкой отправки ошибок - открытие по Ctrl + Enter
    if (this.siteErrorSender) {
      document.addEventListener(`keydown`, (evt) => {
        if (evt.defaultPrevented) {
          return;
        }

        if (!document.documentElement.classList.contains(`modal-mode`) && evt.key === `Enter` && evt.ctrlKey) {
          this.openHandler(evt);
        }
      });
    }

    this.closer.addEventListener(`click`, (evt) => {
      this.closeHandler(evt);
    });

    // Закрытие модального окна по Esc
    document.addEventListener(`keydown`, (evt) => {
      if (evt.defaultPrevented) {
        return;
      }

      if (evt.key === `Escape`) {
        this.closeHandler(evt);
      }
    });

    window.addEventListener(`resize`, () => {
      this.overflowHandler();
    });

    // Защита модального блока от потери фокуса
    document.addEventListener(`focus`, (evt) => {
      if (this.element.classList.contains(`modal--target`)) {
        const path = evt.path || getTargetPath(evt.target);

        if (path.indexOf(this.element) === -1) {
          this.firstFocusable.focus();
        }
      }
    }, true);
  }

  overflowHandler() {
    if (this.inner.clientHeight > window.innerHeight) {
      this.inner.classList.add(`modal__inner--overflowed`);
    } else {
      this.inner.classList.remove(`modal__inner--overflowed`);
    }
  }

  openHandler(evt) {
    evt.preventDefault();
    this.offset = window.pageYOffset;

    this.element.classList.add(`modal--target`);
    document.documentElement.classList.add(`modal-mode`);
    document.documentElement.style.top = `-${this.offset}px`;

    if (!evt.keyCode) {
      evt.target.blur();
    }
  }

  closeHandler(evt) {
    evt.preventDefault();

    this.element.classList.remove(`modal--target`);
    this.inner.classList.remove(`post--invalid-detect`);
    document.documentElement.classList.remove(`modal-mode`);
    window.scrollTo(0, this.offset);
  }
}

applyClass(`.modal`, Modal);
