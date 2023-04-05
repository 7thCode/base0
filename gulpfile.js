"use strict";

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const replace     = require('gulp-replace');

const configured_typescript = typescript.createProject("server_tsconfig.json");

const rimraf = require('rimraf');

gulp.task('dry', function(cb) {
	rimraf('backup', cb);
	rimraf('dist', cb);
	rimraf('dmg', cb);
	rimraf('documentation', cb);
	rimraf('logs/*.log.*', cb);
	rimraf('out-tsc', cb);
	rimraf('product', cb);
	rimraf('public', cb);
});

gulp.task('clean', function(cb) {
	rimraf('product', cb);
});


gulp.task('compile', function() {

	return gulp.src([
		'app.ts',
		'models/**/*.ts',
		'server/**/*.ts',
		'dualuse/**/*.ts',
		'types/**/*.ts'
	], {base: './'})
		.pipe(sourcemaps.init())
		.pipe(configured_typescript())
		.js
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'));

});

gulp.task('build', function() {

	return gulp.src([
		'config/*.json',
		'config/default.js',
		'logs/*',
		'models/**/*.js',
		'models/**/*.json',
		'public/**/*.js',
		'public/**/*.css',
		'public/**/*.html',
		'public/**/*.jpg',
		'public/**/*.map',
		'public/images/**/*.*',
		'public/iconfont/**/*.*',
		'public/icons/**/*.*',
		'public/favicon/**/*.*',
		'public/videos/**/*.*',
		'public/result/*.*',
		'bridge/**/*.js',
		'server/**/*.js',
		'server/**/*.ejs',
		'server/platform/**/*.js',
		'server/platform/assets/**/*.*',
		'views/**/*.ejs',
		'types/**/*.js',
		'tools/*.*',
		'tools/**/*.*',
		'app.js',
		'patch.js',
		'server_tsconfig.json',
		'package.json',
		'package-lock.json',
		'htdigest',
		'cluster.json',
		'*.p8'
	], {base: './', allowEmpty: true})
		.pipe(gulp.dest('product'));

});

gulp.task('sign', function() {
	return gulp.src('src/app/platform/platform.component.html')
		// .pipe(replace(/git_commit_hash\s[A-Za-z0-9]+/, 'git_commit_hash ' + process.env.GIT_COMMIT_HASH))
		.pipe(gulp.dest('src/app/platform/'));
});

gulp.task('debugclient', function() {
	return gulp.src('src/debug/*.html', {allowEmpty: true})
		.pipe(gulp.dest('src'));
});

gulp.task('productionclient', function() {
	return gulp.src('src/production/*.html', {allowEmpty: true})
		.pipe(gulp.dest('src'));
});

gulp.task('default', gulp.series('clean', 'compile', 'build'), function() {

});
