var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var dir_path = './';

var files = {
    css: {
        vendor: [
            dir_path+'bower_components/bootstrap/dist/css/bootstrap.min.css',
            dir_path+'bower_components/owl.carousel/dist/assets/owl.carousel.min.css'
        ],
        custom: [dir_path+'assets/css/*.css'],
        sassFile: [dir_path+'assets/styles/*.scss']
    },
    js: {
        vendor: [
            dir_path+'bower_components/jquery/dist/jquery.min.js',
            dir_path+'bower_components/bootstrap/dist/js/bootstrap.min.js',
            dir_path+'bower_components/owl.carousel/dist/owl.carousel.min.js'
        ],
        custom: [
        ]
    }
};

gulp.task('vendorcss', function() {
    return gulp.src(files.css.vendor)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest(dir_path+'dist/css'));
});

gulp.task('customcss', function() {
    return gulp.src(files.css.custom)
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(dir_path+'dist/css'));
});

gulp.task('vendorjs', function() {
    return gulp.src(files.js.vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(dir_path+'dist/js'));
});

// gulp.task('customjs', function() {
//     return gulp.src(files.js.custom)
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(concat('app.js'))
//         .pipe(gulp.dest('dist/js'))
//         .pipe(uglify())
//         .pipe(concat('app.min.js'))
//         .pipe(gulp.dest(dir_path+'dist/js'));
// });


gulp.task('sass', function() {
    return gulp.src(files.css.sassFile)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(dir_path+'assets/css'));
});

gulp.task('moveCss', function() {
    return gulp.src([dir_path+'bower_components/bootstrap/dist/css/bootstrap.min.css.map'])
        .pipe(gulp.dest(dir_path+'dist/css'));
});

gulp.task('moveFonts', ['moveCustomFonts', 'moveOwl'], function() {
    return gulp.src([dir_path+'bower_components/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest(dir_path+'dist/fonts'));
});

gulp.task('moveCustomFonts', function() {
    return gulp.src([dir_path+'assets/styles/fonts/**/*'])
        .pipe(gulp.dest(dir_path+'dist/fonts'));
});

gulp.task('moveOwl', function() {
    return gulp.src([dir_path+'bower_components/owl.carousel/dist/assets/**/*'])
        .pipe(gulp.dest(dir_path+'dist/js/assets'));
});

gulp.task('compact', ['sass',
    'customcss', 
    'vendorcss', 
    'vendorjs', 
    'moveCss', 
    'moveFonts'
]);

gulp.task('watchfiles', function() {
    gulp.watch(files.js.admin_custom, ['admin_customjs']);
    gulp.watch(files.css.custom, ['customcss']);
    gulp.watch(files.css.sassFile, ['sass']);
});

gulp.task('default', ['compact']);

gulp.task('watch', ['compact', 'watchfiles']);
