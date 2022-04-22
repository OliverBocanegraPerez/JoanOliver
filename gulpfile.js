// -----------------
// Gulp + Plugins
// -----------------

const { src, dest, series, parallel, watch } = require('gulp')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const del = require('del')

// -----------------
// Global config
// -----------------
const srcPath = './src/'
const destPath = '/home/daw/ftp/html'
// -----------------
// Private tasks
// -----------------

// Task A
function copySourceFiles(cb) {
    // Remove previous files
    del([destPath + '**/*.*'], cb)
    // Copy new files
    return src([srcPath + '**/*.{html,css,js,svg,png,jpg,jpeg}'])
        .pipe(dest(destPath))
}
//Aquesta tasca elimina els fitxers anteriors i copia els nous, dirigint-los a la ruta de
//destinacio que tenim posada a la constant DestPath i incloint-li el tipus d'arxiu que es (jpg,css,html,etc)


// Task B
function minifyCss(cb) {
    return src([srcPath + 'styles/*.css'])
        .pipe(cleanCSS())
        .pipe(dest(destPath + 'styles/'))
}
//Aquesta tasca busca un css dins de styles/ a la ruta especificada a la constant srcPath.
//Seguidament fem us de cleanCSS per netejar i minimitzar el codi, el qual redirigim a la ruta de la constant DestPath, buscant dins una carpeta anomenada styles/


// Task C
function minifyJs(cb) {
    return src([srcPath + 'scripts/*.js'])
       	.pipe(uglify())
        .pipe(dest(destPath + 'scripts/'))
}

// -----------------
// Public tasks
// -----------------

// Task 1. Copy source files (A)
exports.update = copySourceFiles
//Quan cridem la tasca publica update, rapidament crida a la tasca privada copySourceFiles, documentada anteriorment


// Task 2. Minify CSS and JS (B+C)
exports.minify = parallel(
    minifyCss,
    minifyJs
)
//Quan cridem la tasca publica minify, aquesta fa crida paralelament de dues tasques privades, que son minifyCss i minifyJs (nosaltres hem documentat la tasca minifyCss
//pero l'altre fa lo mateix)


// Task 3. Execute tasks when a change occurs
exports.watch = function(cb) {
   watch('src', function() {
	series(this.default)
   });
};

// Task 4. Execute tasks 1 and 2
exports.default = series(
    this.update,
    this.minify
)
//Quan cridem la tasca publica default, fa una crida en serie (es a dir, de 1 en 1) de les tasques publiques update i minify (les quals hem documentat justament adalt)
