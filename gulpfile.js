const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const siteName = 'site'; // set your siteName here
const userName = 'heart'; // set your macOS userName here

// Set assets paths.
var paths = {
    php: [ '*.php', '**/*.php' ],
    scripts: [ 'js/*.js' ],
    styles: [ '*.css', 'css/*.css' ]
};

/**
 * Reload browser after PHP & JS file changes and inject CSS changes.
 *
 * https://browsersync.io/docs/gulp
 */
gulp.task( 'default', function() {
    browserSync.init({
        proxy: 'https://' + siteName + '.test',
        host: siteName + '.test',
        open: 'external',
        port: 8000,
        https: {
            key:
                '/Users/' +
                userName +
                '/.config/valet/Certificates/' +
                siteName +
                '.test.key',
            cert:
                '/Users/' +
                userName +
                '/.config/valet/Certificates/' +
                siteName +
                '.test.crt'
        }
    });

    gulp.watch( paths.php ).on( 'change', browserSync.reload );
    gulp.watch( paths.scripts ).on( 'change', browserSync.reload );

    gulp.watch( paths.styles, function() {
        gulp.src( paths.styles ).pipe( browserSync.stream() );
    });
});