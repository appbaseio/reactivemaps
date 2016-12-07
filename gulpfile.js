var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var dir_path = './app/';

var files = {
	css: {
		vendor: [
			// 'bower_components/bootstrap/dist/css/bootstrap.min.css',
			// 'bower_components/materialize/dist/css/materialize.min.css',
			'node_modules/react-select/dist/react-select.min.css',
			'node_modules/react-input-range/dist/react-input-range.min.css',
			'node_modules/rc-slider/assets/index.css',
			'bower_components/font-awesome/css/font-awesome.min.css'
		],
		custom: [dir_path+'assets/css/*.css'],
		sassFile: [dir_path+'assets/styles/*.scss']
	},
	js: {
		vendor: [
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/lodash/dist/lodash.min.js',
			'node_modules/appbase-js/browser/appbase.js'
		],
		custom: [
		]
	}
};

gulp.task('vendorcss', function() {
	return gulp.src(files.css.vendor)
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('customcss', ['sass'], function() {
	return gulp.src(files.css.custom)
		.pipe(minifyCSS())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('vendorjs', function() {
	return gulp.src(files.js.vendor)
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('dist/js'));
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

gulp.task('moveCss', ['customcss'], function() {
	return gulp.src([
			'bower_components/bootstrap/dist/css/bootstrap.min.css.map',
			'bower_components/bootstrap/dist/css/bootstrap.min.css',
			'bower_components/materialize/dist/css/materialize.min.css',
			'app/assets/css/bootstrap.polyfill.css',
			'app/assets/css/material.polyfill.css'
		])
		.pipe(gulp.dest('dist/css'));
});


gulp.task('moveListCss', function() {
	return gulp.src(['examples/list/*.css'])
		.pipe(gulp.dest('dist/examplesCss'));
});

gulp.task('moveFonts', function() {
	return gulp.src(['bower_components/bootstrap/dist/fonts/*',
		'bower_components/font-awesome/fonts/*',
		'bower_components/materialize/dist/fonts/**/*',
		'app/assets/styles/fonts/**/*'
		])
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('moveImages', function() {
	return gulp.src([dir_path+'assets/images/*'])
		.pipe(gulp.dest('dist/images'));
});

gulp.task('compact', [
	'vendorcss',
	'vendorjs',
	'moveCss',
	'moveFonts',
	'moveImages',
	'moveListCss'
]);

gulp.task('watchfiles', function() {
	// gulp.watch(files.css.custom, ['customcss']);
	gulp.watch(files.css.sassFile, ['moveCss']);
});

gulp.task('default', ['compact']);

gulp.task('watch', ['compact', 'watchfiles']);
