var gulp=require("gulp");
var uglifyhtml=require("gulp-minify-html");
var uglifycss=require("gulp-minify-css");
var concat=require("gulp-concat");
var rename=require("gulp-rename");
var uglify=require("gulp-uglify");
var watch=require("gulp-watch");
var  babel = require('gulp-babel');

gulp.task("ughtml",function () {
	gulp.src("src/*.html")
	.pipe(uglifyhtml())
	.pipe(gulp.dest("dist/"))
})

gulp.task("ugcss",function () {
	gulp.src("src/css/*.css")
	.pipe(uglifycss())
	.pipe(gulp.dest("dist/css/"));
})

/*gulp.task('taskES6', function(){
    gulp.src('src/script/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({suffix: 'build_es6'}))
        .pipe(gulp.dest('build/build_ES6'));
});
gulp.task('startWatch', function(){
    gulp.watch('build/js/*.js', ['taskES6']);
});*/


gulp.task("ugjs",function () {
	gulp.src("src/script/js/*.js")
	.pipe(concat("allfile.js"))
	.pipe(babel())
	.pipe(uglify())
	.pipe(rename("allfile.min.js"))
	.pipe(gulp.dest("dist/js/"))
})
/*//压缩html
gulp.task("copyhtml",function () {
	 gulp.src("src/*.html")
	.pipe(uglifyhtml())
	.pipe(gulp.dest("dist/"))
})

//压缩css
gulp.task("ugcss",function () {
	gulp.src("src/css/*.css")
	.pipe(uglifycss())
	.pipe(gulp.dest("dist/css/"))
})

//合并压缩并重命名js
gulp.task("contentjs",function () {
	gulp.src("src/script/js/*.js")
	.pipe(concat("conjs.js"))//合并生成一个conjs.js文件
	//.pipe(uglify())//压缩生成的文件
	//.pipe(rename("conjs.min.js"))//将压缩文件命名
	.pipe(gulp.dest("dist/js/"))
})

//实现监听
gulp.task("watchs",function () {
	watch("src/*.html",gulp.parallel("copyhtml"));
})*/

