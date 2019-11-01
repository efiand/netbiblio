class Toc {
  constructor(element) {
    this.element = element;
    this.next = getNextNode(element);

    // Кнопка-переключатель показа оглавления
    this.toggler = null;

    this.setInitials();
    this.setListeners();
  }

  setInitials() {
    if (this.next && this.next.classList.contains(`page__toc-toggler`)) {
      this.toggler = this.next;

      this.element.classList.add(`collapse`);
    }
  }

  setListeners() {
    if (this.toggler) {
      this.toggler.addEventListener(`click`, () => {
        this.tocToggleHandler();
      });

      // Открытие оглавления по якорной ссылке
      if (window.location.hash === `#${this.element.id}`) {
        this.toggler.click();
      }
    }
  }

  tocToggleHandler() {
    const togglerWords = this.toggler.innerText.split(` `);
    togglerWords[0] = (togglerWords[0] === `Показать`) ? `Скрыть` : `Показать`;
    this.toggler.innerText = togglerWords.join(` `);
    this.element.classList.toggle(`collapse`);
  }
}

applyClass(`.toc`, Toc);
