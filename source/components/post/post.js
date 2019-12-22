class Post {
  constructor(element) {
    this.form = element;
    this.opener = document.querySelector(`[data-open="${element.parentElement.id}"]`);
    this.submit = element.querySelector(`.post__submit`);
    this.fields = element.querySelectorAll(`.field`);
    this.preloader = element.querySelector(`.preloader`);
    this.statusBlock = element.querySelector(`.post__status-block`);
    this.statusString = element.querySelector(`.post__status`);
    this.statusCloser = this.statusBlock.querySelector(`.post__status-closer`);
    this.messageField = element.querySelector(`.field--message`);
    this.answerBlock = element.querySelector(`.feedback__group--answer`);
    this.answerField = this.answerBlock.querySelector(`.field--answer`);
    this.formData = {};
    this.fieldSeries = {};
    this.fieldNames = [];

    // Обрабатывает ли форма отправку сообщения об ошибке
    this.isSiteErrorSend = this.messageField.classList.contains(`field--site-error-place`);

    this.setInitials();
    this.setListeners();
  }

  setInitials() {
    // Чтобы до сабмита красные поля не смущали пользователей
    this.form.classList.remove(`post--invalid-detect`);

    this.fieldNames = window.data.FIELDS;
    for (let i = 0; i < this.fieldNames.length; i++) {
      this.fieldSeries[this.fieldNames[i]] = this.form.querySelector(`[name="${this.fieldNames[i]}"]`);
    }
  }

  setListeners() {
    const self = this;

    this.submit.addEventListener(`click`, (evt) => {
      this.submitHandler(evt);
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

    self.statusCloser.addEventListener(`click`, () => {
      self.closeStatusHandler();
    });

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

  submitHandler(evt) {
    evt.preventDefault();

    // Чтобы после первого сабмита красные поля появлялись
    this.form.classList.remove(`post--invalid-detect`);
    setTimeout(() => {
      this.form.classList.add(`post--invalid-detect`);
    }, 33);

    if (this.form.checkValidity()) {
      this.action = this.form.action;
      this.preloader.classList.remove(`hidden`);

      for (let i = 0; i < this.fieldNames.length; i++) {
        this.formData[this.fieldNames[i]] = this.fieldSeries[this.fieldNames[i]].value.trim();
      }

      this.formData.answer = this.answerField.value.trim();
      window.ajaxHandler(this);
    }
  }

  responseHandler() {
    const self = this;
    self.statusString.innerHTML = self.status;
    self.preloader.classList.add(`hidden`);
    if (self.statusBlock) {
      self.statusBlock.classList.remove(`hidden`);
    }
  }

  closeStatusHandler() {
    const self = this;
    self.formData = {};
    self.form.classList.remove(`post--invalid-detect`);
    self.form.reset();
    self.statusBlock.classList.add(`hidden`);
  }
}

applyClass(`.post`, Post);
