class Reviews {
  constructor(element) {
    this.element = element;
    this.heading = element.querySelector(`.reviews__heading`);
    this.errorNote = element.querySelector(`.reviews__error-note`);
    this.shower = element.querySelector(`.reviews__button--shower`);
    this.wrapper = element.querySelector(`.reviews__wrapper`);
    this.reviews = element.querySelectorAll(`.reviews__item:not(.reviews__item--answer)`);

    this.setInitials();
    this.setListeners();
  }

  setInitials() {
    // Показ инструкции по сообщению об ошибке
    this.errorNote.classList.remove(`hidden`);

    // Скрыть отзывы, если они есть
    if (this.reviews.length) {
      this.shower.textContent = `${this.shower.textContent} (${this.reviews.length})`;

      this.wrapper.classList.add(`hidden`);
    } else {
      this.shower.classList.add(`hidden`);

      // Заголовок без отзывов нет смысла включать в выделенный текст
      this.heading.classList.add(`page__noselect`);
    }
  }

  setListeners() {
    this.shower.addEventListener(`click`, () => {
      this.shower.classList.add(`hidden`);
      this.wrapper.classList.remove(`hidden`);
    });
  }
}

applyClass(`.reviews`, Reviews);
