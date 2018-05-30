'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var browserpx = "http://localhost:8080";
    

// PATHS INIT FILES
var source = './src',
    dest = './assets';

// PATHS TOOLS
var paths = {
    foundation: './node_modules/foundation-sites',
    slick: './node_modules/slick-carousel/slick',
    jquery: './node_modules/jquery'
};

// SCSS CONFIG
var scss = {
  in: source + '/scss/app.scss',
  out: dest + '/css/',
  sassOpts: {
    precison: 3,
    errLogToConsole: true,
    includePaths: [
        paths.foundation + '/scss',
        paths.slick 
    ]
  }
};

var jsPaths = [
	/* Jquery */
	paths.jquery + '/dist/jquery.js',

	/* Libraries required by Foundation */
	paths.foundation + '/dist/js/plugins/foundation.core.js',
	paths.foundation + '/dist/js/plugins/foundation.util.*.js',

	/* Individual Foundation components */
	/* If you aren't using a component, just remove it from the list */
	paths.foundation +  "/dist/js/plugins/foundation.abide.js",
	paths.foundation +  "/dist/js/plugins/foundation.accordion.js",
	paths.foundation +  "/dist/js/plugins/foundation.accordionMenu.js",
	paths.foundation +  "/dist/js/plugins/foundation.drilldown.js",
	paths.foundation +  "/dist/js/plugins/foundation.dropdown.js",
	paths.foundation +  "/dist/js/plugins/foundation.dropdownMenu.js",
	paths.foundation +  "/dist/js/plugins/foundation.equalizer.js",
	paths.foundation +  "/dist/js/plugins/foundation.interchange.js",
	paths.foundation +  "/dist/js/plugins/foundation.magellan.js",
	paths.foundation +  "/dist/js/plugins/foundation.offcanvas.js",
	paths.foundation +  "/dist/js/plugins/foundation.orbit.js",
	paths.foundation +  "/dist/js/plugins/foundation.responsiveMenu.js",
	paths.foundation +  "/dist/js/plugins/foundation.responsiveToggle.js",
	paths.foundation +  "/dist/js/plugins/foundation.reveal.js",
	paths.foundation +  "/dist/js/plugins/foundation.slider.js",
	paths.foundation +  "/dist/js/plugins/foundation.sticky.js",
	paths.foundation +  "/dist/js/plugins/foundation.tabs.js",
	paths.foundation +  "/dist/js/plugins/foundation.toggler.js",
	paths.foundation +  "/dist/js/plugins/foundation.tooltip.js",
	paths.foundation +  "/dist/js/plugins/foundation.zf.responsiveAccordionTabs.js",

	/* SLICK */
	paths.slick + "/slick.js",

	/* ALL SCRIPT */
	source + '/js/!(app).js',
	source + '/js/app.js',

];

//SASS
gulp.task('sass', function(){
    return gulp.src(scss.in)
    .pipe(sourcemaps.init())
    .pipe(sass(scss.sassOpts))
    .pipe(sass({
    	outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(scss.out));
});

//JS
gulp.task('js', function() {
  return gulp.src(jsPaths)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('serve', ['sass', 'js'], function() {
  browserSync.init({
      proxy: browserpx,
      open: true
  });
  gulp.watch("./src/js/**/*.js", ['js']);
  gulp.watch("./src/scss/**/*.scss", ['sass']);
  gulp.watch("./**/*.php").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);