'use strict';
// Создание sitemap.xml с помощью nunjucks
// В шаблон передаётся список страниц проекта,
// поэтому перед этой задачей нужно запустить таск pages

const { gulp, plugins, settings } = require(`../store`);
const { sitemap, html, common } = settings.tasks;

gulp.task(`sitemap`, () => {
  return gulp.src(sitemap.src)
    .pipe(plugins.plumber())
    .pipe(plugins.nunjucksRender({
      manageEnv: (env) => {
        env.addGlobal(`host`, settings.project.host);
        env.addGlobal(`pages`, settings.pages);
      }
    }))
    .pipe(plugins.htmlmin(html.min))
    .pipe(plugins.rename(sitemap.rename))
    .pipe(gulp.dest(common.dest));
});
