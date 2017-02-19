#!/usr/bin/env babel-node
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import server from 'gulp-develop-server';

const config = {
  build: './build/',
  src: './src/**/*.js',
  data: './src/data.json',
  app: './index.js',
};

gulp.task('startup', () => {
  server.listen( { path: config.app } );
});

gulp.task('clean', () => {
  return del([config.build + '/**/*']);
});

gulp.task('build', ['clean'], () => {
  gulp.src(config.data)
    .pipe(gulp.dest(config.build));

  return gulp.src(config.src)
    .pipe(babel())
    .pipe(gulp.dest(config.build));
});

// main development task
gulp.task('develop', ['startup'], () => {
  gulp.watch(config.src, server.restart);
});
