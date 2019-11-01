'use strict';
// Расстановка неразрывных пробелов после висячих предлогов, между тире
// preposSpace — пробел около предлога (например, явный 0160)
// mdashSpace — пробел около длинного тире (например, &thinsp;)

const { filters } = require(`../store`);

filters.typograph = (str, preposSpace = `&nbsp;`, mdashSpace = `&nbsp;`) => {

  // Висячие предлоги
  str = str.replace(/( | |&nbsp;|\(|>){1}([№а-уА-У]{1}|\d+) /gu, `$1$2${preposSpace}`);

  // Пробелы вокруг длинного тире (передача простого пробела отключает функционал)
  if (mdashSpace !== ` `) {
    str = str.replace(/( | |&nbsp;)—/g, `${mdashSpace}—`)
    .replace(/—( | |&nbsp;)/g, `—${mdashSpace}`)
    .replace(new RegExp(` ( |&nbsp;${mdashSpace})`, `g`), ` `);
  }

  // Пробелы после page__mark (чтобы при выравнивании по ширине величина отступа от основного контента не менялсь)
  str = str.replace(/(page__mark.*?\/span>) /g, `$1&thinsp;`);

  return str;
};
