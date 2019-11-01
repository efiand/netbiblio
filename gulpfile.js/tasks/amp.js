'use strict';

const { gulp, plugins, functions, settings } = require(`../store`);
const { amp } = settings.tasks;

// Компиляция AMP-страниц шаблонизатором nunjucks
gulp.task(`amp:create`, () => {
  settings.project.isAmp = true;

  // Функция добавляется в задаче html
  return functions.html()
    .pipe(gulp.dest(amp.dest))
    .pipe(plugins.amphtmlValidator.validate())
    .pipe(plugins.amphtmlValidator.format());
});

// Копирование файлов основной версии в каталог с AMP
gulp.task(`amp:files`, () => {
  return gulp.src(...amp.files)
    .pipe(gulp.dest(amp.dest));
});

gulp.task(`amp`, gulp.parallel(`amp:create`, `amp:files`));
