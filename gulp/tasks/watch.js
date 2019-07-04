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
});

gulp.task(
	'cssInject',
	gulp.series([ 'css' ], () => {
		return gulp.src('./app/temp/styles/styles.css').pipe(browserSynk.stream());
	})
);
