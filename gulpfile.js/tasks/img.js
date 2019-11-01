'use strict';

const { gulp, plugins, settings } = require(`../store`);
const { img, svgo } = settings.tasks;

gulp.task(`img`, () => {
  return gulp.src(img.src)
    .pipe(plugins.imagemin([
      plugins.imagemin.svgo(svgo),
      plugins.imagemin.optipng(),
      require(`imagemin-jpegoptim`)(img.jpegoptim)
    ]))
    .pipe(gulp.dest(img.dest));
});
