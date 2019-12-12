var gulp = require('gulp');

var load = require('gulp-load-plugins')();

var browser = require('browser-sync').create();
// var uglify = require('gulp-uglify')
// var minifyCss= require('gulp-minify-css')
// var minifyHtml = require('gulp-minify-html')
// var babel = require('gulp-babel')
// var rename = require('gulp-rename')
// var imagemin = require('gulp-imagemin')


var concat = require('gulp-concat');

gulp.task('html',function(done){
	gulp.src('./src/*.html')
	.pipe(load.minifyHtml())	
	.pipe(gulp.dest('./dist/'))
	done()
})
gulp.task('js',function(done){
	gulp.src('./src/js/*.js')
	.pipe(load.babel({
		'presets':['@babel/env']
	}))
	
	.pipe(load.uglify())
	.pipe(gulp.dest('./dist/js/'))
	done()
})
gulp.task('sass',function(done){
	gulp.src('./src/css/*.scss')
	.pipe(load.sass())
	.pipe(load.rename('index.css'))
	.pipe(gulp.dest('./dist/css/'))
	done()
})
gulp.task('css',function(done){
	gulp.src('./src/css/*.css')
	.pipe(load.minifyCss())
	
	.pipe(gulp.dest('./dist/css/'))
	done()
})
gulp.task('image',function(done){
	gulp.src('./src/images/**')
	.pipe(load.imagemin())
	.pipe(gulp.dest('./dist/images/'))
	done()
})
gulp.task('save',gulp.series(gulp.parallel('html','js','css','sass'),function(done){
	browser.reload()
	done()
}))

gulp.task('server',gulp.series(gulp.parallel('html','js','css','sass'),function(done){
	browser.init({
		server:'./dist',
		port:9090
	})
	gulp.watch('./src/',gulp.series('save'))
	done()
}))