const { task, src, dest, series } = require('gulp');
const plumber = require('gulp-plumber');
const scss = require('gulp-sass');
scss.compiler = require('node-sass');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minifyJS = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

task('scss', () => {
  return src('src/scss/index.scss')
    .pipe(plumber())
    .pipe(scss().on('error', scss.logError))
    .pipe(autoprefixer({
      cascade: false,
      browsers: ['last 2 versions']
    }))
    .pipe(rename('bundle.css'))
    .pipe(dest('build/css'))
    .pipe(minifyCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(dest('build/css'))
  ;
});

task('js', () => {
  return src(
    [
      'src/js/utils.js',
      'src/js/scripts.js'
    ]
  )
  .pipe(concat('bundle.js'))
  .pipe(dest('build/js'))
  .pipe(minifyJS())
  .pipe(rename('bundle.min.js'))
  .pipe(dest('build/js'))
  ;
});

task('build', () => {
  return series('scss', 'js')();
});