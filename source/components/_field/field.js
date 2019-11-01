class Field {
  constructor(element) {
    this.element = element;
    this.isStored = isStorageSupport && element.classList.contains(`field--stored`);

    this.setInitials();
    this.setListeners();
  }

  setInitials() {
    // Получение значения из хранилища браузера
    if (this.isStored) {
      this.element.value = localStorage.getItem(this.element.name);
    }
  }

  setListeners() {
    this.element.addEventListener(`input`, () => {
      this.inputHandler();
    });
  }

  inputHandler() {
    const input = this.element;

    if (this.isStored && (input.validity.valid || !input.value)) {
      localStorage.setItem(input.name, input.value);
    }
  }
}

applyClass(`.field`, Field);
