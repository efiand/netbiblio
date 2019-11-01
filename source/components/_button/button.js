class Button {
  constructor(element) {
    this.element = element;

    this.setInitials();
  }

  setInitials() {
    // Отменяем скрытие кнопок, ненужных без js
    this.element.classList.remove(`hidden`);
  }
}

applyClass(`.button`, Button);
