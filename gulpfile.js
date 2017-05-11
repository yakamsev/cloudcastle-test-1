var gulp = require('gulp'),
	connect = require('gulp-connect'),
	livereload = require('gulp-refresh'),
	prefix = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	less = require('gulp-less');

// sever start
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// less - to css
gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css'));
});


// css - concat, prefixes, moving, reloading
gulp.task('css', function() {
	gulp.src('app/css/*.css')
	.pipe(concat('main.css'))
	.pipe(prefix({
		browsers: ['last 2 versions', '>5%'],
	}))
	.pipe(gulp.dest('app/styles'))
	.pipe(connect.reload());
});

// html - just reload on changes
gulp.task('html', function() {
	gulp.src('app/*.html')
	.pipe(connect.reload());
});

// watch everything
gulp.task('watch', function() {
	gulp.watch('app/less/*.less', ['less']);
	gulp.watch('app/css/*.css', ['css']);
	gulp.watch('app/index.html', ['html']);
});

// default
gulp.task('default', ['connect', 'less', 'css', 'html', 'watch']);