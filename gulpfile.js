const { src, dest, series, task } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const lib = require("./lib.js");

function clean(cb) {
	cb();
}

function codemirror() {
	return src([
			'./node_modules/style-mod/dist/style-mod.cjs',
			'./node_modules/w3c-keyname/index.cjs',
			'./node_modules/@codemirror/state/dist/index.cjs',
			'./node_modules/@codemirror/view/dist/index.cjs',
		])
		.pipe(lib.defModule({
			"modules": [
				"@codemirror/state",
				"@codemirror/view",
				"style-mod",
				"w3c-keyname",
			],
		}))
		.pipe(concat('codemirror.min.js'))
		.pipe(dest('./resources'))
	;
}

function min()
{
	return src([
			'./resources/codemirror.js',
		])
		.pipe(concat('codemirror.min.js'))
		.pipe(uglify())
		.pipe(dest('./resources'))
	;
}

// Tasks
task('clean', clean);
task('js', codemirror);
task('min', min);

// Build
exports.build = series('clean', 'js', 'min');
