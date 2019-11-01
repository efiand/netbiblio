class HashLinks {
  constructor(element) {
    this.element = element;
    this.hash = element.href.replace(/[^#]*(.*)/, `$1`);

    this.setListeners();
  }

  setListeners() {
    this.element.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (this.hash !== `#`) {
        scrollToHash(this.hash, 3);
      }
    });
  }
}

applyClass(`a[href^="#"]`, HashLinks);
