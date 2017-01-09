
'use strict';

const 		gulp 				= require('gulp'),
			pug 	 			= require('gulp-pug'),
			sass 				= require('gulp-sass'),
			babel 				= require('gulp-babel'),
			imagemin 			= require('gulp-imagemin'),
			pngquant 			= require('imagemin-pngquant'),
			svgmin				= require('gulp-svgmin'),
			webp 				= require('gulp-webp'),
			useref 				= require('gulp-useref'),
			concat 				= require('gulp-concat'),
			uncss 				= require('gulp-uncss'),
			autoprefixier		= require('gulp-autoprefixer'),
			cleanCSS 			= require('gulp-clean-css'),
			uglify				= require('gulp-uglify'),

			dir = {
				src 	: 'src',
				dist 	: 'dist',
				nm 		: 'node_modules'
			},

			files = {
				CSS: [
					`${dir.nm}/animate.css/animate.min.css`,
					`${dir.nm}/font-awesome/css/font-awesome.min.css`,
					`${dir.nm}/responsimple/responsimple.min.css`,
					`${dir.nm}/owl.carousel/dist/assets/owl.theme.default.min.css`,
					`${dir.dist}/css/estilos.css`
				],
				mCSS: 'estilos.min.css',
				JS: [
					`${dir.nm}/jquery/dist/jquery.min.js`,
					`${dir.nm}/owl.carousel/dist/owl.carousel.min.js`,
					`${dir.nm}/wowjs/dist/wow.min.js`,
					`${dir.dist}/js/codigos.js`
				],
				mJSS: 'codigos.min.js',
				fonts: [
					`${dir.nm}/font-awsome/fonts/*.*`
				],
			},

			opts = {
				pug: {
					pretty: true,
					locals: {
						title: 'Maraton',
						files: files
					}
				},

				sass: {
					outputStyle: 'nested',
				},

				es6: {
					presets: ['es2015']
				},
				imagemin: {
					progressive: true,
					use : [ pngquant() ]
				},
				svgmin: {
					plugins: [
						{ convertColors: false },
						{ removeAttrs: { attrs : ['fill'] } }
					]
				}
			};

gulp.task('pug', () => {
	gulp
		.src(`${dir.src}/pug/views/**/*.pug`)
		.pipe( pug( opts.pug ) )
		.pipe( gulp.dest( dir.dist ) );
});

gulp.task('sass', () => {
	gulp
		.src(`${dir.src}/scss/*.scss`)
		.pipe( sass( opts.sass ) )
		.pipe( gulp.dest(`${dir.dist}/css`) );
});

gulp.task('es6', () => {
	gulp
		.src(`${dir.src}/es6/*.js`)
		.pipe( babel(opts.es6) )
		.pipe( gulp.dest(`${dir.dist}/js`) );
});


gulp.task('img', () => {
	gulp
		.src(`${dir.src}/img/*.+(png|jpeg|jpg|gif)`)
		.pipe( imagemin(opts.imagemin) )
		.pipe( gulp.dest(`${dir.dist}/img`) );
});

gulp.task('svg', ()=> {
	gulp
		.src( `${dir.src}/img/*.svg` )
		.pipe( svgmin(opts.svgmin) )
		.pipe( gulp.dest(`${dir.dist}/img`) );
});

gulp.task('webp', ()=> {
	gulp
		.src( `${dir.src}/img/*.+(png|jpeg|jpg)` )
		.pipe( webp() )
		.pipe( gulp.dest(`${dir.dist}/img/webp`) )
});
