'use strict'; // Диспетчер подключений для сборки javascript-кода из фрагментов с помощью gulp-include
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
(function() {
  // Клиентские модули
  // Применение класса к набору DOM-элементов
  var applyClass = function applyClass(selector, Class) {
    var nodeList = document.querySelectorAll(selector);
    for (var i = 0; i < nodeList.length; i++) {
      new Class(nodeList[i]);
    }
  }; // Получение path для event.target
  var getTargetPath = function getTargetPath(target) {
    var path = [];
    while (target) {
      path.push(target);
      target = target.parentElement;
    }
    return path;
  };
  var url = window.location.href;
  if (window.location.protocol === "http:") {
    window.location.replace(url.replace("http:", "https:"));
  }
  var scrollToHash = function scrollToHash(hash) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var offset = window.pageYOffset; // С поправкой на высоту шапки
    var distance = document.querySelector(hash).getBoundingClientRect().top - 64;
    var start = null;
    var step = function step(time) {
      start = start || time;
      var progress = time - start;
      var scrollPos = Math.min(offset + progress * speed, offset + distance);
      if (distance < 0) {
        scrollPos = Math.max(offset - progress * speed, offset + distance);
      }
      window.scrollTo(0, scrollPos);
      if (scrollPos !== offset + distance) {
        requestAnimationFrame(step);
      } else {
        location.hash = hash;
      }
    };
    requestAnimationFrame(step);
  }; // Плавная прокрутка к якорю по url на старте
  setTimeout(function() {
    if (location.hash) {
      scrollToHash(location.hash, 3);
    }
  }, 100); // Проверка наличия localStorage
  var isStorageSupport = true;
  try {
    localStorage.getItem("test");
  } catch (error) {
    isStorageSupport = false;
  } // Получение следующего DOM-узла (исколючая текстовые)
  var getNextNode = function getNextNode(node) {
    var next = node.nextSibling;
    if (next) {
      while (next.nextSibling && !(next instanceof HTMLElement)) {
        next = next.nextSibling;
      }
    }
    return next instanceof HTMLElement ? next : null;
  };
  var HashLinks =
    /*#__PURE__*/
    function() {
      function HashLinks(element) {
        _classCallCheck(this, HashLinks);
        this.element = element;
        this.hash = element.href.replace(/[^#]*(.*)/, "$1");
        this.setListeners();
      }
      _createClass(HashLinks, [{
        key: "setListeners",
        value: function setListeners() {
          var _this = this;
          this.element.addEventListener("click", function(evt) {
            evt.preventDefault();
            if (_this.hash !== "#") {
              scrollToHash(_this.hash, 3);
            }
          });
        }
      }]);
      return HashLinks;
    }();
  applyClass("a[href^=\"#\"]", HashLinks); // Узнаем ширину полосы прокрутки
  // Создадим элемент с прокруткой
  var div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.visibility = "hidden";
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div); // Классы компонентов
  var Button =
    /*#__PURE__*/
    function() {
      function Button(element) {
        _classCallCheck(this, Button);
        this.element = element;
        this.setInitials();
      }
      _createClass(Button, [{
        key: "setInitials",
        value: function setInitials() {
          // Отменяем скрытие кнопок, ненужных без js
          this.element.classList.remove("hidden");
        }
      }]);
      return Button;
    }();
  applyClass(".button", Button);
  var Field =
    /*#__PURE__*/
    function() {
      function Field(element) {
        _classCallCheck(this, Field);
        this.element = element;
        this.isStored = isStorageSupport && element.classList.contains("field--stored");
        this.setInitials();
        this.setListeners();
      }
      _createClass(Field, [{
        key: "setInitials",
        value: function setInitials() {
          // Получение значения из хранилища браузера
          if (this.isStored) {
            this.element.value = localStorage.getItem(this.element.name);
          }
        }
      }, {
        key: "setListeners",
        value: function setListeners() {
          var _this2 = this;
          this.element.addEventListener("input", function() {
            _this2.inputHandler();
          });
        }
      }, {
        key: "inputHandler",
        value: function inputHandler() {
          var input = this.element;
          if (this.isStored && (input.validity.valid || !input.value)) {
            localStorage.setItem(input.name, input.value);
          }
        }
      }]);
      return Field;
    }();
  applyClass(".field", Field);
  var Feedback =
    /*#__PURE__*/
    function() {
      function Feedback(element) {
        _classCallCheck(this, Feedback);
        this.element = element;
        this.errorNote = element.querySelector(".feedback__error-note");
        this.setInitials();
      }
      _createClass(Feedback, [{
        key: "setInitials",
        value: function setInitials() {
          // Скрытие nojs-инструкции по сообщению об ошибке
          this.errorNote.classList.add("hidden");
        }
      }]);
      return Feedback;
    }();
  applyClass(".feedback", Feedback);
  var Modal =
    /*#__PURE__*/
    function() {
      function Modal(element) {
        _classCallCheck(this, Modal);
        this.element = element;
        this.id = element.getAttribute("id");
        this.inner = element.querySelector(".modal__inner");
        this.openers = document.querySelectorAll("[data-open=\"".concat(this.id, "\"]"));
        this.closer = element.querySelector(".modal__closer");
        this.offset = 0; // Первый элемент модального блока, способный поймать фокус
        this.firstFocusable = element.querySelector("input, textarea, a, button, [tabindex]"); // Есть ли в модальном блоке форма с поддержкой сообщения об ошибке:
        this.siteErrorSender = element.querySelector(".field--site-error-place");
        this.setInitials();
        this.setListeners();
      }
      _createClass(Modal, [{
        key: "setInitials",
        value: function setInitials() {
          this.element.classList.add("modal--js");
          this.overflowHandler();
        }
      }, {
        key: "setListeners",
        value: function setListeners() {
          var _this3 = this;
          for (var i = 0; i < this.openers.length; i++) {
            this.openers[i].addEventListener("click", function(evt) {
              _this3.openHandler(evt);
            });
          } // Если внутри форма с поддержкой отправки ошибок - открытие по Ctrl + Enter
          if (this.siteErrorSender) {
            document.addEventListener("keydown", function(evt) {
              if (!document.body.classList.contains("modal-mode") && evt.keyCode === 13 && evt.ctrlKey) {
                _this3.openHandler(evt);
              }
            });
          }
          this.closer.addEventListener("click", function(evt) {
            _this3.closeHandler(evt);
          }); // Закрытие модального окна по Esc
          document.addEventListener("keydown", function(evt) {
            if (evt.keyCode === 27) {
              _this3.closeHandler(evt);
            }
          });
          window.addEventListener("resize", function() {
            _this3.overflowHandler();
          }); // Защита модального блока от потери фокуса
          document.addEventListener("focus", function(evt) {
            if (_this3.element.classList.contains("modal--target")) {
              var path = evt.path || getTargetPath(evt.target);
              if (path.indexOf(_this3.element) === -1) {
                _this3.firstFocusable.focus();
              }
            }
          }, true);
        }
      }, {
        key: "overflowHandler",
        value: function overflowHandler() {
          if (this.inner.clientHeight > window.innerHeight) {
            this.inner.classList.add("modal__inner--overflowed");
          } else {
            this.inner.classList.remove("modal__inner--overflowed");
          }
        }
      }, {
        key: "openHandler",
        value: function openHandler(evt) {
          evt.preventDefault();
          this.offset = window.pageYOffset;
          this.element.classList.add("modal--target");
          document.body.classList.add("modal-mode");
          document.body.style.width = "calc(100% - ".concat(scrollWidth, "px)");
          document.body.style.top = "-".concat(this.offset, "px");
          if (!evt.keyCode) {
            evt.target.blur();
          }
        }
      }, {
        key: "closeHandler",
        value: function closeHandler(evt) {
          evt.preventDefault();
          this.element.classList.remove("modal--target");
          this.inner.classList.remove("post--invalid-detect");
          document.body.classList.remove("modal-mode");
          document.body.style.width = "100%";
          window.scrollTo(0, this.offset);
        }
      }]);
      return Modal;
    }();
  applyClass(".modal", Modal);
  var Nav =
    /*#__PURE__*/
    function() {
      function Nav(element) {
        _classCallCheck(this, Nav);
        this.element = element;
        this.list = element.querySelector(".nav__list");
        this.prev = element.querySelector(".nav__link--prev");
        this.toc = element.querySelector(".nav__link--toc");
        this.next = element.querySelector(".nav__link--next");
        this.setInitials();
        this.setListeners();
      }
      _createClass(Nav, [{
        key: "setInitials",
        value: function setInitials() {
          // Предотвращение ухода правой части за прокрутку модального окна
          // (для всех браузеров кроме Firefox для Windows XP)
          if (!/NT 5.*Firefox/.test(navigator.userAgent)) {
            this.list.style.maxWidth = "calc(100vw - ".concat(scrollWidth, "px)");
          }
        }
      }, {
        key: "setListeners",
        value: function setListeners() {
          var _this4 = this;
          document.addEventListener("keydown", function(evt) {
            if (!evt.ctrlKey && !evt.shiftKey && !evt.altKey && !evt.target.classList.contains("field")) {
              // Стрелка влево
              if (evt.keyCode === 37) {
                evt.preventDefault();
                window.location = _this4.prev.href;
              } else if (evt.keyCode === 39) {
                // Стрелка вправо
                evt.preventDefault();
                window.location = _this4.next.href;
              } else if (evt.keyCode === 8) {
                // Backspace
                evt.preventDefault(); // Пасхалочка :-)
                window.location = _this4.toc ? _this4.toc.href : "https://efiand.ru";
              }
            }
          });
        }
      }]);
      return Nav;
    }();
  applyClass(".nav", Nav);
  var Post =
    /*#__PURE__*/
    function() {
      function Post(element) {
        _classCallCheck(this, Post);
        this.element = element;
        this.opener = document.querySelector("[data-open=\"".concat(element.parentElement.id, "\"]"));
        this.submit = element.querySelector(".post__submit");
        this.fields = element.querySelectorAll(".field");
        this.messageField = element.querySelector(".field--message"); // Обрабатывает ли форма отправку сообщения об ошибке
        this.isSiteErrorSend = this.messageField.classList.contains("field--site-error-place");
        this.setInitials();
        this.setListeners();
      }
      _createClass(Post, [{
        key: "setInitials",
        value: function setInitials() {
          // Чтобы до сабмита красные поля не смущали пользователей
          this.element.classList.remove("post--invalid-detect");
        }
      }, {
        key: "setListeners",
        value: function setListeners() {
          var _this5 = this;
          this.submit.addEventListener("click", function() {
            _this5.submitHandler();
          });
          if (this.opener) {
            this.opener.addEventListener("click", function() {
              _this5.openHandler();
            });
            if (this.isSiteErrorSend) {
              document.addEventListener("keydown", function(evt) {
                if (evt.keyCode === 13 && evt.ctrlKey) {
                  _this5.openHandler();
                }
              });
            }
          } // Отправка формы по Ctrl + Enter из поля текстового ввода
          this.messageField.addEventListener("keydown", function(evt) {
            if (evt.keyCode === 13 && evt.ctrlKey) {
              evt.preventDefault();
              _this5.submit.click();
            }
          });
        }
      }, {
        key: "openHandler",
        value: function openHandler() {
          var _this6 = this;
          setTimeout(function() {
            _this6.setFocus();
          }, 0);
          if (this.isSiteErrorSend) {
            var selection = window.getSelection().toString();
            if (selection) {
              this.messageField.value = "\u0422\u0435\u043A\u0441\u0442 \u043E\u0448\u0438\u0431\u043A\u0438:\n".concat(selection, "\n\n\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u043E\u0448\u0438\u0431\u043A\u0435:\n");
            }
          }
        } // Фокусируемся на первом незаполненном элементе
      }, {
        key: "setFocus",
        value: function setFocus() {
          var focusedIndex = -1;
          for (var i = 0; i < this.fields.length; i++) {
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
      }, {
        key: "submitHandler",
        value: function submitHandler() {
          // Чтобы после первого сабмита красные поля появлялись
          this.element.classList.add("post--invalid-detect");
        }
      }]);
      return Post;
    }();
  applyClass(".post", Post);
  var Reviews =
    /*#__PURE__*/
    function() {
      function Reviews(element) {
        _classCallCheck(this, Reviews);
        this.element = element;
        this.heading = element.querySelector(".reviews__heading");
        this.errorNote = element.querySelector(".reviews__error-note");
        this.shower = element.querySelector(".reviews__button--shower");
        this.wrapper = element.querySelector(".reviews__wrapper");
        this.reviews = element.querySelectorAll(".reviews__item:not(.reviews__item--answer)");
        this.setInitials();
        this.setListeners();
      }
      _createClass(Reviews, [{
        key: "setInitials",
        value: function setInitials() {
          // Показ инструкции по сообщению об ошибке
          this.errorNote.classList.remove("hidden"); // Скрыть отзывы, если они есть
          if (this.reviews.length) {
            this.shower.textContent = "".concat(this.shower.textContent, " (").concat(this.reviews.length, ")");
            this.wrapper.classList.add("hidden");
          } else {
            this.shower.classList.add("hidden"); // Заголовок без отзывов нет смысла включать в выделенный текст
            this.heading.classList.add("page__noselect");
          }
        }
      }, {
        key: "setListeners",
        value: function setListeners() {
          var _this7 = this;
          this.shower.addEventListener("click", function() {
            _this7.shower.classList.add("hidden");
            _this7.wrapper.classList.remove("hidden");
          });
        }
      }]);
      return Reviews;
    }();
  applyClass(".reviews", Reviews);
  var Toc =
    /*#__PURE__*/
    function() {
      function Toc(element) {
        _classCallCheck(this, Toc);
        this.element = element;
        this.next = getNextNode(element); // Кнопка-переключатель показа оглавления
        this.toggler = null;
        this.setInitials();
        this.setListeners();
      }
      _createClass(Toc, [{
        key: "setInitials",
        value: function setInitials() {
          if (this.next && this.next.classList.contains("page__toc-toggler")) {
            this.toggler = this.next;
            this.element.classList.add("collapse");
          }
        }
      }, {
        key: "setListeners",
        value: function setListeners() {
          var _this8 = this;
          if (this.toggler) {
            this.toggler.addEventListener("click", function() {
              _this8.tocToggleHandler();
            }); // Открытие оглавления по якорной ссылке
            if (window.location.hash === "#".concat(this.element.id)) {
              this.toggler.click();
            }
          }
        }
      }, {
        key: "tocToggleHandler",
        value: function tocToggleHandler() {
          var togglerWords = this.toggler.innerText.split(" ");
          togglerWords[0] = togglerWords[0] === "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C" ? "\u0421\u043A\u0440\u044B\u0442\u044C" : "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C";
          this.toggler.innerText = togglerWords.join(" ");
          this.element.classList.toggle("collapse");
        }
      }]);
      return Toc;
    }();
  applyClass(".toc", Toc);
})();
