const gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	browserSynk = require('browser-sync').create();

gulp.task('previewDist', function() {
	browserSynk.init({
		notify: false,
		server: {
			baseDir: 'docs'
		}
	});
});

gulp.task('deleteDistFolder', function() {
	return del('./docs');
});

gulp.task(
	'copyGeneralFiles',
	gulp.series([ 'deleteDistFolder' ], function() {
		const pathsToCopy = [
			'./app/**/*',
			'!./app/index.html',
			'!./app/assets/images/**',
			'!./app/assets/styles/**',
			'!./app/assets/scripts/**',
			'!./app/temp',
			'!./app/temp/**'
		];
		return gulp.src(pathsToCopy).pipe(gulp.dest('./docs'));
	})
);

gulp.task(
	'optimizeImages',
	gulp.series([
		[ 'deleteDistFolder' ],
		function() {
			return gulp
				.src([ './app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*' ])
				.pipe(
					imagemin({
						progressive: true,
						interlaced: true,
						multipass: true
					})
				)
				.pipe(gulp.dest('./docs/assets/images'));
		}
	])
);

gulp.task(
	'usemin',
	gulp.series([ 'css', 'scripts' ], function() {
		return gulp
			.src('./app/index.html')
			.pipe(
				usemin({
					css: [
						function() {
							return rev();
						},
						function() {
							return cssnano();
						}
					],
					js: [
						function() {
							return rev();
						},
						function() {
							return uglify();
						}
					]
				})
			)
			.pipe(gulp.dest('./docs'));
	})
);

gulp.task('build', gulp.series([ 'deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin' ]));
