class Post {
  constructor(element) {
    this.element = element;
    this.opener = document.querySelector(`[data-open="${element.parentElement.id}"]`);
    this.submit = element.querySelector(`.post__submit`);
    this.fields = element.querySelectorAll(`.field`);
    this.messageField = element.querySelector(`.field--message`);

    // Обрабатывает ли форма отправку сообщения об ошибке
    this.isSiteErrorSend = this.messageField.classList.contains(`field--site-error-place`);

    this.setInitials();
    this.setListeners();
  }

  setInitials() {
    // Чтобы до сабмита красные поля не смущали пользователей
    this.element.classList.remove(`post--invalid-detect`);
  }

  setListeners() {
    this.submit.addEventListener(`click`, () => {
      this.submitHandler();
    });

    if (this.opener) {
      this.opener.addEventListener(`click`, () => {
        this.openHandler();
      });

      if (this.isSiteErrorSend) {
        document.addEventListener(`keydown`, (evt) => {
          if (evt.keyCode === 13 && evt.ctrlKey) {
            this.openHandler();
          }
        });
      }
    }

    // Отправка формы по Ctrl + Enter из поля текстового ввода
    this.messageField.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === 13 && evt.ctrlKey) {
        evt.preventDefault();

        this.submit.click();
      }
    });
  }

  openHandler() {
    setTimeout(() => {
      this.setFocus();
    }, 0);

    if (this.isSiteErrorSend) {
      const selection = window.getSelection().toString();

      if (selection) {
        this.messageField.value = `Текст ошибки:\n${selection}\n\nКомментарий к ошибке:\n`;
      }
    }
  }

  // Фокусируемся на первом незаполненном элементе
  setFocus() {
    let focusedIndex = -1;
    for (let i = 0; i < this.fields.length; i++) {
      if (!this.fields[i].value) {
        focusedIndex = i;
        break;
      }
    }
    if (focusedIndex < 0) {
      focusedIndex = this.fields.length - 1;
    }
    this.fields[focusedIndex].focus();
  }

  submitHandler() {
    // Чтобы после первого сабмита красные поля появлялись
    this.element.classList.add(`post--invalid-detect`);
  }
}

applyClass(`.post`, Post);
