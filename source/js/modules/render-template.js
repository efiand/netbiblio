// заменяет в строке вхождение вида {{something}} на элемент массива data
// для полного преобразования число элементов должно быть равно числу вхождений

window.renderTemplate = (str, data) => {
  const params = { i: -1 };
  return str.replace(/{{.*?}}/g, (match) => {
    params.i++;
    return data[params.i] || match;
  });
};
