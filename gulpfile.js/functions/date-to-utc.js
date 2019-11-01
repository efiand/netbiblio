'use strict';
// Конвертация DD.MM.YYYY в YYYY-MM-DD с добавлением времени

const { functions, filters } = require(`../store`);

functions.dateToUtc = (str, timeZone = null, time = null) => {
  const dateParts = str.split(`.`);
  let date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  // Если передан часовой пояс восточного полушария, добавляем переданное время или полночь
  if (typeof timeZone === `number` && timeZone > 0) {
    return `${date}T${time ? time : `00:00`}:00+${functions.outputWithLeadZero(timeZone)}:00`;
  }
  return date;
};

filters.dateToUtc = functions.dateToUtc;
