// Проверка наличия localStorage

let isStorageSupport = true;

try {
  localStorage.getItem(`test`);
} catch (error) {
  isStorageSupport = false;
}
