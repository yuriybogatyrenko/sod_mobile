/* DEV PLUGINS------------------------------------------------------------------
 ---------------------------------------------------------------------------- */
var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    pug          = require('gulp-pug'),
    twig         = require('gulp-twig'),
    htmlbeautify = require('gulp-html-beautify'),
    sass         = require("gulp-sass"),
    prefix       = require("gulp-autoprefixer"),
    minifyCss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    sourcemaps   = require("gulp-sourcemaps"),
    callback     = require('gulp-callback'),
    clean        = require('gulp-clean'),
    notify       = require('gulp-notify'),
    browserSync  = require('browser-sync'),
    compass      = require('gulp-compass');

/* PRODUCTION PLUGINS ----------------------------------------------------------
 ---------------------------------------------------------------------------- */
var useref       = require('gulp-useref'),
    wiredep      = require('wiredep').stream,
    gulpif       = require('gulp-if');

/* SOURCES --------------------------------------------------------------------
 ---------------------------------------------------------------------------- */
var sources = {
    html: {
        src: 'app/*.html',
        dist: 'app/'
    },
    css: {
        dist: 'app/css'
    },
    js: {
        dist: 'app/js',
        watch: 'app/js/*.js'
    },
    pug: {
        src: 'app/pug/*.pug',
        watch: 'app/pug/**/*.pug',
        dist: 'app/'
    },
    twig: {
        src: 'app/twig/*.twig',
        watch: 'app/twig/**/*.twig',
        temp_dist: 'app/.twig-temp/',
        temp_dist_html: 'app/.twig-temp/*.html',
        dist: 'app/'
    },
    sass: {
        src: 'app/sass/*.sass',
        watch: 'app/sass/**/*.sass',
        dist: 'app/sass'
    },
    bower: {src: 'app/bower_components'},
    images: {
        icons: {
            default: 'app/images/icons/*.png',
            retina: 'app/images/icons/*@2x.png'
        },
        dist: 'app/images'
    }
};

/* DEVELOPMENT GULP TASKS ------------------------------------------------------
 ---------------------------------------------------------------------------- */

/* Error Handler ---------------------------------------------------------------
 ---------------------------------------------------------------------------- */

var onError = function(err) {
    console.log(err);
    this.emit('end');
};

/* PUG ---------------------------------------------------------------------- */
gulp.task('pug', function () {
    gulp.src(sources.pug.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(sources.pug.dist))
        .pipe(browserSync.reload({stream: true}));
    // .pipe(notify('PUG was compiled'));
});

/* TWIG --------------------------------------------------------------------- */
gulp.task('twig', function () {
    gulp.src(sources.twig.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(twig())
        .pipe(gulp.dest(sources.twig.temp_dist))
        .pipe(callback(function () {
            gulp.src(sources.twig.temp_dist_html)
                .pipe(htmlbeautify())
                .pipe(gulp.dest(sources.twig.dist))
                /*.pipe(callback(function () {
                 setTimeout(function () {
                 gulp.src(sources.twig.temp_dist, {read: false})
                 .pipe(clean());
                 }, 1000);
                 }))*/
                .pipe(browserSync.reload({stream: true}));
            // .pipe(notify('TWIG was compiled'));
        }));

    return null;
});

/* COMPASS ------------------------------------------------------------------ */
gulp.task('compass', function () {
    gulp.src(sources.sass.watch)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(compass({
            sass: sources.sass.dist,
            css: sources.css.dist,
            js: sources.js.dist,
            sourcemap: true,
            image: 'app/images'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sources.css.dist))
        .pipe(browserSync.reload({stream: true}));
});

/*/!* SASS --------------------------------------------------------------------- *!/
gulp.task('sass', ["compass"], function() {
    return gulp.src(sources.sass.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sources.css.dist))
        .pipe(browserSync.reload({stream: true}));
    // .pipe(notify('SASS was compiled'));
});*/

/* BOWER --------------------------------------------------------------------- */
gulp.task('bower', function () {
    gulp.src(sources.html.src)
        .pipe(wiredep({
            directory: sources.bower.src
        }))
        .pipe(gulp.dest('app'));
});

/* BROWSER SYNC -------------------------------------------------------------- */
gulp.task('browser-sync', function () {
    browserSync.init({
        server: "./app"
    });
});

/* PRODUCTION GULP TASKS ------------------------------------------------------
 ---------------------------------------------------------------------------- */

/* SFTP --------------------------------------------------------------------- */
gulp.task('sftp', function(){
    gulp.src("dist/**/*")
        .pipe(sftp({
            host: "",
            user: "",
            pass: "",
            remotePath: ""
        }));
});

/* CLEAN -------------------------------------------------------------------- */
gulp.task('clean', function(){
    gulp.src('dist', {read: false})
        .pipe(clean());
});

/* BUILD -------------------------------------------------------------------- */
gulp.task('build',["clean"], function(){
    setTimeout(function () {
        gulp.start('build_dist');
        gulp.start('fonts');
        gulp.start('images');
        gulp.start('js');
        gulp.start('css');
        gulp.start('fontello');
    }, 500);
});

gulp.task('build_dist', function(){
    gulp.src(sources.html.src)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    gulp.src([
        'app/js/**'
    ])
        .pipe(gulp.dest('dist/js'));
});

gulp.task('fontello', function () {
    gulp.src([
        'app/fontello/**'
    ])
        .pipe(gulp.dest('dist/fontello'));
});

gulp.task('css', function () {
    gulp.src([
        'app/css/**'
    ])
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    gulp.src([
        'app/bower_components/uikit/fonts/**',
        'app/fonts/**'
    ])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
    gulp.src([
        'app/images/**',
        '!app/images/icons',
        '!app/images/icons-2x',
        '!app/images/icons/**',
        '!app/images/icons-2x/**'
    ])
        .pipe(gulp.dest('dist/images'));
});

/* DEFAULT AND GULP WATCHER ----------------------------------------------------
 ---------------------------------------------------------------------------- */
gulp.task('watch', function () {
    // gulp.watch('bower.json', ["bower"]);
    // gulp.watch(sources.sass.watch, ['sass']);
    gulp.watch(sources.sass.watch, ['compass']);
    // gulp.watch(sources.pug.watch, ["pug"]);
    // gulp.watch(sources.twig.watch, ["twig"]);
    gulp.watch(sources.js.watch).on('change', browserSync.reload);
    gulp.watch(sources.html.src).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'compass', 'watch']);