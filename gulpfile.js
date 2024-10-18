const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const { src, dest, watch, series } = require('gulp');

// Компиляция SCSS в CSS
function compileSass() {
    return src('src/styles/*.scss')
        .pipe(sass({quietDeps: true, }).on('error', sass.logError))
        .pipe(dest('dist/styles'))
        .pipe(browserSync.stream());
}

// Перезагрузка браузера при изменении HTML
function reloadHtml() {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Копирование и перезагрузка при изменении JS
function reloadJs() {
    return src('src/scripts/*.js')
        .pipe(dest('dist/scripts'))
        .pipe(browserSync.stream());
}

// Инициализация сервера
function serve() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    // Наблюдение за изменениями файлов
    watch('src/styles/*.scss', compileSass);
    watch('src/*.html', reloadHtml);
    watch('src/scripts/*.js', reloadJs);
}

exports.default = series(compileSass, reloadHtml, reloadJs, serve);
