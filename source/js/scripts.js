'use strict';
// Диспетчер подключений для сборки javascript-кода из фрагментов с помощью gulp-include

(() => {
  //=require data.js

  // Клиентские модули
  //=require modules/**/*.js

  // Классы компонентов
  //=require ../components/**/*.js

  if (typeof snowfall !== `undefined`) { // eslint-disable-line
    snowfall.start({ // eslint-disable-line
      bg: `transparent`,
      primary: `#ffffff`,
      secondary: `#ffffff`,
      density: 100,
      wave: {
        frequency: 0.02,
        amplitude: 2
      },
      gravity: {
        angle: 90,
        strength: 0.3
      },
      wind: {
        angle: 4,
        strength: 0
      }
    });
  }
})();
