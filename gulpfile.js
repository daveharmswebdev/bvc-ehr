'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const ngAnnotate = require('gulp-ng-annotate')
const sass = require('gulp-sass')
const gutil = require('gulp-util')
const notify = require('gulp-notify')

const handleError = function(task) {
  return function(err) {

    notify.onError({
      message: task + ' failed, check the logs..',
      sound: false
    })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

gulp.task('js', function() {
	gulp.src(['src/main.js', 'src/**/*.js'])
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(concat('app.js'))
			.pipe(ngAnnotate())
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('client/js'))
})

gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
    // sourcemaps + sass + error handling
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceComments: true,
      outputStyle: 'compressed'  // nested || compressed
    }))
    .on('error', handleError('SASS'))
    // generate .maps
    .pipe(sourcemaps.write({
      'includeContent': false,
      'sourceRoot': '.'
    }))
    .pipe(sourcemaps.write({
      'includeContent': true
    }))
    // write sourcemaps to a specific directory
    // give it a file and save
    .pipe(gulp.dest('./client/css'))
})

gulp.task('watch', ['js'], function() {
	gulp.watch('src/**/*.js', ['js'])
  gulp.watch('./sass/**/*.scss', ['sass']);
})

gulp.task('default', ['js', 'sass']);
