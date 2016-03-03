
// .create()
// gulp-sass
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
// var autoprefixer = require('gulp-autoprefixer');
// var plugin1 = require('gulp-plugin1');
// var plugin2 = require('gulp-plugin2');
// var sourcemaps = require('gulp-sourcemaps');


var markup = './markup';
var dist = './dist';

var markupPaths = {
	html: [markup + '/**/*.html'],
	js: [markup + '/assets/js/**/*.js'],
	scss: [markup + '/assets/scss/**/*.scss']
}

 gulp.task('html', function () {
  return gulp.src(markupPaths.html)
    .pipe(gulp.dest('./dist'))
    .pipe(reload({
    	stream: true
    }));
});

gulp.task('js', function () {
  return gulp.src(markupPaths.js)
    .pipe(concat('assets.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(reload({
    	stream: true
    }));
});

gulp.task('sass', function () {
  return gulp.src(markupPaths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(reload({
    	stream: true
    }));
});

// browser-sync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './dist'
		},
		logConnection: true,
		debugInfo: true,
		injectChanges: false,
		port: 3004,
		open: true,
		browser: 'default',
		startPath: '/index.html',
		notify: true,
		reloadOnRestart: true
	});
});

// watcher
gulp.task('watch', function () {
    watch(markupPaths.html, function(){
    	gulp.start('html')
    });
    watch(markupPaths.js, function(){
    	gulp.start('js')
    });
    watch(markupPaths.scss, function(){
    	gulp.start('sass')
    });
});

// // autoprefixer
// gulp.task('prefix', function () {
//     return gulp.src(markupPaths.scss)
//         .pipe(autoprefixer({
//             browsers: ['last 5 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('./dist/assets/css'));
// });

// // source-maps
// gulp.task('maps', function() {
//   gulp.src('src/**/*.js')
//     .pipe(sourcemaps.init())
//       .pipe(plugin1())
//       .pipe(plugin2())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist'));
// });


gulp.task('dev', ['watch', 'browser-sync']);



