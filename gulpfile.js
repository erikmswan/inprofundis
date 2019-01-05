
const gulp = require('gulp');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const nano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const html = require('gulp-html-import');
const inject = require('gulp-style-inject');

const isProd = process.argv[2] === '--prod';

// del
gulp.task('del', () => del('dist/**', { force: true }));
gulp.task('del tmp', () => del('tmp', { force: true }));

// sass
const devSass = () => gulp.src('src/css/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  // compiled styles are put in a temporary folder to be injected
  //  inline in our html by a later task. This is then deleted.
  .pipe(gulp.dest('tmp'));

const prodSass = () => gulp.src('src/css/style.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(nano())
  .pipe(gulp.dest('tmp'));

gulp.task('sass', isProd ? prodSass : devSass);

// img
const devImg = () => gulp.src('src/img/*')
  .pipe(gulp.dest('dist/img'));

const prodImg = () => gulp.src('src/img/*')
  // image optimization is an expensive operation, so we only do it for prod
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));

gulp.task('img', isProd ? prodImg : devImg);

// js
gulp.task('js', () => gulp.src('src/js/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('dist/js'))
);

// html
gulp.task('html', () => gulp.src([
    'src/**/*.html',
    '!src/partials/*'
  ])
  // we inject our header and footer
  .pipe(html('src/partials/'))
  // we inject our css
  .pipe(inject({
    path: 'src/css/'
  }))
  .pipe(gulp.dest('dist/'))
);

// build else
//  This is for simply copying files over that aren't processed by a task.
gulp.task('build font', () => gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts/'))
);

gulp.task('build svg', () => gulp.src('src/img/svg/*.svg')
  .pipe(gulp.dest('dist/img/svg/'))
);

gulp.task('build-else', gulp.parallel('build font', 'build svg'));

// main tasks
const seriesTask = gulp.series('del', 'sass', 'html', 'del tmp', 'js', 'img', 'build-else');

gulp.task('default', seriesTask);
gulp.task('watch', () => gulp.watch('src/**/*', seriesTask));
