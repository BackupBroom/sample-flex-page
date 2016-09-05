var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSeq = require('run-sequence');
var browserSync = require('browser-sync').create();



// dev

// server
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		port: 8081
	});
});



// optimization & dist

gulp.task('html', function(){
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
      		stream: true
    	}));
});



gulp.task('sass', function(){
	return gulp.src('src/scss/**/*.scss')
		.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sass())
			.on('error', swallowError)
			.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
      		stream: true
    	}));
});



// watchers
gulp.task('watch', ['browserSync'], function(){
	gulp.watch('src/scss/**/*.scss' , ['sass']);
	gulp.watch('src/index.html', ['html']);
});



//clean
gulp.task('clean:dist', function(){
	return del.sync('dist');
});



// build
gulp.task('default', function(){
	runSeq('clean:dist', ['html', 'sass', 'browserSync', 'watch']);
});


function swallowError (error) {

	console.log(error.toString())

	this.emit('end')
}
