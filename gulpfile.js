var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatCSS = require('gulp-concat-css'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    concatJS = require('gulp-concat'),
    minCSS = require('gulp-cssnano'),
    minJS = require('gulp-uglify'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('gulp-sequence'),
    clean = require('gulp-clean'),
    minIMG = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    reload = browserSync.reload;

src = {
    js: [
        'src/js/lib/*.js',
        //'src/js/lib/jquery.min.js',
        'src/js/main.js'
    ],
    css: [
        '/src/css/lib/*.css',
        '/src/css/main.css'
    ],
    sass: 'src/scss/**/*.scss',
    jade: 'src/templates/**/*.jade',
    /*fonts: 'src/fonts/!**!/!*',*/
    img: 'src/img/**/*'
};

gulp.task('server', function (callback) {
    runSequence('jade', 'sass-reload', 'js-dev', 'move', callback);
    browserSync.init({
        /*proxy: "rplus.zeema.org.ua/"*/

        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch(src.sass, ['sass-reload']);
    gulp.watch(src.js, ['js-dev']).on('change', reload);
    gulp.watch(src.jade, ['jade']).on('change', reload);
});

gulp.task('move', function () {
    gulp.src('src/css/lib/**/*.css')
        .pipe(gulp.dest('dev/css/'));
    gulp.src('src/js/lib/**/*.js')
        .pipe(gulp.dest('dev/js/'));
    gulp.src('dev/img/**/*')
        .pipe(gulp.dest('dist/img'));
    gulp.src('dev/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass-reload', function (callback) {
    runSequence('clean-css', 'compile-sass', 'reload', callback);
});

gulp.task('clean-dist', function () {
    return gulp.src(['dist/common.min.js', 'dist/common.min.css'], {read: false})
        .pipe(clean());
});

gulp.task('clean-css', function () {
    return gulp.src('dev/css/common.css', {read: false})
        .pipe(clean());
});
gulp.task('clean-img', function () {
    return gulp.src('dev/img/**.*', {read: false})
        .pipe(clean());
});

gulp.task('compile-sass', function () {
    return gulp.src(src.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dev/css'));
});

gulp.task('reload', function () {
    reload();
});

gulp.task('styles', function () {
    return gulp.src('dev/css/*.css')
        .pipe(concatCSS('common.css'))
        .pipe(minCSS())
        .pipe(rename('common.min.css'))
        .pipe(gulp.dest('dist'))
});

gulp.task('js-dev', function () {
    return gulp.src(src.js)
        .pipe(plumber())
        .pipe(gulp.dest('dev/js'))
});

gulp.task('js-dist', function () {
    return gulp.src(src.js)
        .pipe(plumber())
        .pipe(concatJS('common.js'))
        .pipe(minJS())
        .pipe(rename('common.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('min-img', function () {
    return gulp.src(src.img)
        .pipe(minIMG())
        .pipe(gulp.dest('dev/img'))
        .pipe(notify({
            message: ' ',
            title: 'IMG done!',
            onLast: true
        }));
});

gulp.task('jade', function () {
    return gulp.src(src.jade)
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest('dev/'));
});

/// MAIN TASKS ----> ///

gulp.task('dist', function (callback) {
    runSequence('clean-dist', 'jade', 'sass-reload', 'styles', 'js-dist', 'clean-img', 'min-img', 'move',  callback);
});

gulp.task('default', function (callback) {
    runSequence('clean-css', 'server', callback);
});




