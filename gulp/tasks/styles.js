const gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	browserSynk = require('browser-sync').create();

gulp.task('css', () => {
	return gulp
		.src('./app/assets/styles/styles.css')
		.pipe(postcss([ cssImport, autoprefixer, cssvars, nested ]))
		.on('error', function(err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/temp/styles'));
});
