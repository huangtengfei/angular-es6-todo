var gulp = require('gulp');
var babelify = require('babelify');
var concat = require('gulp-concat'); 
var minifyCss = require('gulp-minify-css');  
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

// Load all gulp plugins into the plugins object.
var plugins = require('gulp-load-plugins')();

var src = {
	templates: 'src/**/*.html',
	libs: 'src/libs/**',
	styles: 'src/styles/**/*.css',
	scripts: {
		all: 'src/scripts/**/*.js',
		app: 'src/scripts/app.js'
	}
};

var build = 'build/';
var out = {
	libs: build + 'libs/',
	styles: {
		file: 'app.min.css',
		folder: build + 'styles/'
	},
	scripts: {
		file: 'app.min.js',
		folder: build + 'scripts/'
	}
}

gulp.task('templates', function() {
	return gulp.src(src.templates)
		.pipe(gulp.dest(build))
		.pipe(plugins.connect.reload());
});

gulp.task('styles', function(){
	return gulp.src(src.styles)
		.pipe(concat(out.styles.file))
		.pipe(minifyCss())
		.pipe(gulp.dest(out.styles.folder));
})

/* The jshint task runs jshint with ES6 support. */
gulp.task('jshint', function() {
	return gulp.src(src.scripts.all)
		.pipe(plugins.jshint({
			esnext: true // Enable ES6 support
		}))
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('libs', function() {
	/* In a real project you of course would use npm or bower to manage libraries. */
	return gulp.src(src.libs)
		.pipe(gulp.dest(out.libs))
		.pipe(plugins.connect.reload());
});

/* Compile all script files into one output minified JS file. */
gulp.task('scripts', ['jshint'], function() {

	var sources = browserify({
		entries: src.scripts.app,
		debug: true // Build source maps
	})
	.transform(babelify.configure({
		// You can configure babel here!
		// https://babeljs.io/docs/usage/options/
	}));

	return sources.bundle()
		.pipe(vinylSourceStream(out.scripts.file))
		.pipe(vinylBuffer())
		.pipe(plugins.sourcemaps.init({
			loadMaps: true // Load the sourcemaps browserify already generated
		}))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./', {
			includeContent: true
		}))
		.pipe(gulp.dest(out.scripts.folder))
		.pipe(plugins.connect.reload());

});

gulp.task('serve', ['build', 'watch'], function() {
	plugins.connect.server({
		root: build,
		port: 3333,
		livereload: true,
		fallback: build + 'index.html'
	});
});

gulp.task('watch', function() {
	gulp.watch(src.libs, ['libs']);
	gulp.watch(src.templates, ['templates']);
	gulp.watch(src.styles, ['styles']);
	gulp.watch(src.scripts.all, ['scripts']);
})

gulp.task('build', ['scripts', 'styles', 'templates', 'libs']);
gulp.task('default', ['serve']);