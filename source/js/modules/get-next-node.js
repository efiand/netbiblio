// Получение следующего DOM-узла (исколючая текстовые)
const getNextNode = (node) => {
  let next = node.nextSibling;
  if (next) {
    while (next.nextSibling && !(next instanceof HTMLElement)) {
      next = next.nextSibling;
    }
  }
  return (next instanceof HTMLElement) ? next : null;
};
