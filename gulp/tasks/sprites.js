var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite'),
	rename = require('gulp-rename'),
	del = require('del'),
	svg2png = require('gulp-svg2png');

var config = {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: function() {
					return function(sprite, render) {
						return render(sprite).split('.svg').join('.png');
					};
				}
			},
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
};

gulp.task('clearTemp', function() {
	return del([ './app/temp/sprite' ]);
});

gulp.task('clearImages', function() {
	return del([ './app/assets/images/sprites' ]);
});

gulp.task('beginClean', gulp.series([ 'clearTemp', 'clearImages' ]));

gulp.task(
	'createSprite',
	gulp.series(function() {
		return gulp
			.src('./app/assets/images/icons/**/*.svg')
			.pipe(svgSprite(config))
			.pipe(gulp.dest('./app/temp/sprite/'));
	})
);

gulp.task(
	'createPngCopy',
	gulp.series([ 'createSprite' ], function() {
		return gulp.src('./app/temp/sprite/css/*.svg').pipe(svg2png()).pipe(gulp.dest('./app/temp/sprites/css'));
	})
);

gulp.task(
	'copySpriteGraphicSvg',
	gulp.series([ 'createPngCopy' ], function() {
		return gulp.src('./app/temp/sprite/css/**/*.svg').pipe(gulp.dest('./app/assets/images/sprites'));
	})
);

gulp.task(
	'copySpriteGraphicPng',
	gulp.series(function() {
		return gulp.src('./app/temp/sprite/css/**/*.png').pipe(gulp.dest('./app/assets/images/sprites'));
	})
);

gulp.task(
	'copySpriteCSS',
	gulp.series([ 'createSprite' ], function() {
		return gulp
			.src('./app/temp/sprite/css/*.css')
			.pipe(rename('_sprite.css'))
			.pipe(gulp.dest('./app/assets/styles/modules'));
	})
);

gulp.task(
	'endClean',
	gulp.series([ 'copySpriteGraphicSvg', 'copySpriteGraphicPng', 'copySpriteCSS' ], function() {
		return del('./app/temp/sprite');
	})
);

gulp.task(
	'icons',
	gulp.series([
		'beginClean',
		'createSprite',
		'createPngCopy',
		'copySpriteGraphicSvg',
		'copySpriteGraphicPng',
		'copySpriteCSS',
		'endClean'
	])
);
