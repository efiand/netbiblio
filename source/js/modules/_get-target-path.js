// Получение path для event.target
const getTargetPath = (target) => {
  let path = [];

  while (target) {
    path.push(target);
    target = target.parentElement;
  }
  return path;
};
