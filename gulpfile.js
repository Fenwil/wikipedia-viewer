const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('minify-css', () => {
    gulp.src('src/css/styles.css')
        .pipe(cleanCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('minify-img', () =>
    gulp.src('src/img/*.svg')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
);

gulp.task('transpile-js', () => {
    gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('minify-js', () => {
    gulp.src('dist/js/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/js'))
})