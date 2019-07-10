const gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSynk = require('browser-sync').create();

gulp.task('watch', () => {
	browserSynk.init({
		notify: false,
		server: {
			baseDir: 'app'
		}
	});
	watch(
		'./app/index.html',
		gulp.series(() => {
			browserSynk.reload();
		})
	);
	watch('./app/assets/styles/**/*.css', gulp.series('cssInject'));

	watch('./app/assets/scripts/**/*.js', gulp.series('scriptsRefresh'));
});

gulp.task(
	'cssInject',
	gulp.series([ 'css' ], () => {
		return gulp.src('./app/temp/styles/styles.css').pipe(browserSynk.stream());
	})
);

gulp.task(
	'scriptsRefresh',
	gulp.series([ 'scripts' ], (done) => {
		browserSynk.reload();
		done();
	})
);
