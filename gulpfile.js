"use strict";

/* paths configuration */
var path = {
    build: {
        html: "./dist/",
        js: "./dist/js/",
        css: "./dist/css/",
        img: "./dist/img/",
        fonts: "./dist/fonts/",
        fontIcons: "./dist/fonts/",
    },
    src: {
        html: "./src/*.html",
        js: "./src/js/main.js",
        style: "./src/style/main.scss",
        fontIcons: "./src/font_icons/icons/*.svg",
        img: [
            "./src/img/**/*.*",
        ],
        fonts: [
            "./src/fonts/**/*.*",
        ]
    },
    watch: {
        html: "./src/**/*.html",
        js: "./src/js/**/*.js",
        css: "./src/style/**/*.scss",
        img: "./src/img/**/*.*",
        fonts: "./srs/fonts/**/*.*",
        fontIcons: "./src/font_icons/icons/*.svg",

        static: [
            "./src/style/**/*.scss",
            "./src/js/**/*.js",
            "./srs/fonts/**/*.*",
            "./src/font_icons/icons/*.svg",
            "!./src/style/theme/_icons.scss"
        ]
    },
    clean: "./dist/*",
};

/* Web server config */
var config = {
    server: {
        baseDir: "./dist",
    },
    notify: false,
};

/* Gulp config */
const sass = require('gulp-sass')(require('sass'));
var gulp = require("gulp"),
    minify = require("gulp-minify"),
    webserver = require("browser-sync"),
    plumber = require("gulp-plumber"),
    rigger = require("gulp-rigger"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    cache = require("gulp-cache"),
    imagemin = require("gulp-imagemin"),
    jpegrecompress = require("imagemin-jpeg-recompress"),
    pngquant = require("imagemin-pngquant"),
    rimraf = require("gulp-rimraf"),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    rename = require("gulp-rename"),
    webpack = require('webpack-stream');

/* Main tasks */

/**
 * Start a web server
 */
gulp.task("webserver", function() {
    webserver(config);
});

/**
 * Build html
 */
gulp.task("html:build", function() {
    return gulp
        .src(path.src.html) 
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({ stream: true }));
});

/**
 * Process images
 */
gulp.task("image:build", function() {
    return gulp
        .src(path.src.img)
        .pipe(
            cache(
                imagemin([
                    imagemin.gifsicle({ interlaced: true }),
                    jpegrecompress({
                        progressive: true,
                        max: 90,
                        min: 80,
                    }),
                    pngquant(),
                    imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
                ])
            )
        )
        .pipe(gulp.dest(path.build.img));
});

/**
 * Clean build
 */
gulp.task("clean:build", function() {
    return gulp.src(path.clean, { read: false }).pipe(rimraf());
});

/**
 * Clean the cache
 */
gulp.task("cache:clear", function() {
    cache.clearAll();
});

/**
 * Builds assets using webpack
 */
gulp.task('assets:build', function() {
    return gulp.src(path.src.js)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/assets/'));
});

/**
 * Main build task
 */
gulp.task(
    "build",
    gulp.series(
        "clean:build",
        gulp.parallel(
            "html:build",
            "assets:build",
            "image:build",
        )
    )
);

/**
 * Watch task
 */
gulp.task("watch", function() {
    gulp.watch(path.watch.html, gulp.series("html:build"));
    gulp.watch(path.watch.static, gulp.series("assets:build"));
    gulp.watch(path.watch.img, gulp.series("image:build"));
});

/**
 * Default task
 */
gulp.task("default", gulp.series("build", gulp.parallel("webserver", "watch")));