const scrollToHash = (hash, speed = 1) => {
  const offset = window.pageYOffset;

  // С поправкой на высоту шапки
  const distance = document.querySelector(hash).getBoundingClientRect().top - 64;

  let start = null;
  const step = (time) => {
    start = start || time;
    const progress = time - start;

    let scrollPos = Math.min(offset + progress * speed, offset + distance);
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
};

// Плавная прокрутка к якорю по url на старте
setTimeout(() => {
  if (location.hash) {
    scrollToHash(location.hash, 3);
  }
}, 100);
