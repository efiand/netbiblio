'use strict';

const { gulp, plugins, settings } = require(`../store`);
const { webp } = settings.tasks;

gulp.task(`webp`, () => {
  return gulp.src(webp.src)
    .pipe(plugins.webp(webp.options))
    .pipe(gulp.dest(webp.dest));
});
