const { src, dest, series, task } = require('gulp');
var clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const lib = require("./lib.js");

function taskClean() {
	return src(['resources/*'])
		.pipe(clean())
	;
}

function taskJs() {
	return src([
			'./node_modules/crelt/dist/index.cjs',
			'./node_modules/style-mod/dist/style-mod.cjs',
			'./node_modules/w3c-keyname/index.cjs',
			'./node_modules/@lezer/common/dist/index.cjs',
			'./node_modules/@lezer/highlight/dist/index.cjs',
			'./node_modules/@codemirror/state/dist/index.cjs',
			'./node_modules/@codemirror/view/dist/index.cjs',
			'./node_modules/@codemirror/language/dist/index.cjs',
			'./node_modules/@codemirror/commands/dist/index.cjs',
			'./node_modules/@codemirror/lint/dist/index.cjs',
		])
		.pipe(lib.defModule({
			"modules": [
				"@codemirror/commands",
				"@codemirror/language",
				"@codemirror/lint",
				"@codemirror/state",
				"@codemirror/view",
				"@lezer/common",
				"@lezer/highlight",
				"crelt",
				"style-mod",
				"w3c-keyname",
			],
		}))
		.pipe(concat('codemirror.js'))
		.pipe(dest('./resources'))
	;
}

function taskMin()
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
task('clean', taskClean);
task('js', taskJs);
task('min', taskMin);

// Build
exports.build = series('clean', 'js', 'min');
