
/*!!
 *
 * gulpfile.js
 * @author: Jan Sanchez
 *
 */

var gulp = require('gulp'),
    mi = require('gulp-complexity');

/*!!
 *
 * Tarea para evaluar la mantenibilidad
 * del código fuente 
 *
 */

gulp.task('mi', function(){
    return gulp.src(['jquery-for-test/**/**/*.js'])
    .pipe(mi({breakOnErrors: false}));
});