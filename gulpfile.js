var gulp = require('gulp');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

gulp.task('templates', function() {
	return gulp.src(['src/templates/**/*.hbs'])
		.pipe(handlebars())
		.pipe(rename(function(path) {
			path.extname = '.html'
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('images', function() {
	gulp.src('src/img/**/*')
		.pipe(imageMin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	gulp.src('src/scripts/main.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.stream());
});

gulp.task('styles', function() {
	gulp.src(['src/styles/**/*.css'])
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['styles', 'scripts', 'images', 'templates'], function() {
	browserSync.init({
		server: './'
	});
	gulp.watch('src/styles/**/*.css', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/img/**/*', ['images']);
	gulp.watch('src/templates/**/*.hbs', ['templates']);
	gulp.watch('*.html', browserSync.reload);
});
