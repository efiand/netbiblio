class Feedback {
  constructor(element) {
    this.element = element;
    this.errorNote = element.querySelector(`.feedback__error-note`);

    this.setInitials();
  }

  setInitials() {
    // Скрытие nojs-инструкции по сообщению об ошибке
    this.errorNote.classList.add(`hidden`);
  }
}

applyClass(`.feedback`, Feedback);
