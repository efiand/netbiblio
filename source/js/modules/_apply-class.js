// Применение класса к набору DOM-элементов
const applyClass = (selector, Class) => {
  const nodeList = document.querySelectorAll(selector);

  for (let i = 0; i < nodeList.length; i++) {
    new Class(nodeList[i]);
  }
};
