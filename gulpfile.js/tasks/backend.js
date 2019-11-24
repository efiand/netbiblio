'use strict';
// Синхронизация бэкенда с VDS

const { gulp, plugins } = require(`../store`);

gulp.task(`backend:sync`, () => {
  return gulp.src(`backend/**`)
    .pipe(plugins.plumber())
    .pipe(plugins.rsync({
      root: `backend/`,
      hostname: `efiand@efiand.ru`,
      destination: `netbiblio.efiand.ru/public/`,
      archive: true,
      recursive: true,
      compress: true
    }));
});

gulp.task(`backend:watch`, () => {
  gulp.watch(`backend/**/*`, gulp.series(`backend:sync`));
});

gulp.task(`backend`, (callback) => {
  return gulp.series(`backend:sync`, `backend:watch`)(callback);
});
