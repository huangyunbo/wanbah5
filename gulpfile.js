/*
	cnpm install gulp-concat gulp-uglify gulp-merge-link gulp-rename gulp-rename gulp-replace del --save-dev
*/

var gulp = require('gulp');

// 引入组件
/*var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');*/

// 合并，压缩文件
/*gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});*/

// 默认任务
/*gulp.task('default', function(){
    gulp.run('scripts');
	
});*/

//炉石传说android
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge = require('gulp-merge-link');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var del = require('del');

var lscs_platename_data = "plugin_925";
var lscs_platename_ka = "plugin_926";
var path = '../';
var lscs_replacename = ['css/', 'js/', 'json/'];

gulp.task('lscs_images', function(){
    gulp.src('./images/lushichuanshuo/**')
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/images/lushichuanshuo'));
});

gulp.task('lscs_css', function(){
    gulp.src('./css/data-lushichuanshuo.css')
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/css'));
});

gulp.task('lscs_js_android', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-lushichuanshuo.js'])
        .pipe(concat('lushichuanshuo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/js'));
		
	gulp.src(['./js/jquery-2.1.3.min.js','./js/easydialog.min.js','./js/data-lushichuanshuo-ka.js'])
        .pipe(concat('lushichuanshuo-ka.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/js'));
});

gulp.task('lscs_js_ios', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-lushichuanshuo.js'])
        .pipe(concat('lushichuanshuo.min.js'))
		.pipe(replace('platform:"android"', 'platform:"ios"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/js'));
		
	gulp.src(['./js/jquery-2.1.3.min.js','./js/easydialog.min.js','./js/data-lushichuanshuo-ka.js'])
        .pipe(concat('lushichuanshuo-ka.min.js'))
		.pipe(replace('platform:"android"', 'platform:"ios"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/js'));
});

gulp.task('lscs_json', function(){
    gulp.src('./json/json-lushichuanshuo.js')
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/json'));
});

gulp.task('lscs_data_mergejs_android', function(){
    gulp.src('./data-lushichuanshuo.html')
        .pipe(merge({
            'js/lushichuanshuo.min.js':['js/jquery-2.1.3.min.js','js/data-lushichuanshuo.js']
        }))
		.pipe(replace(replaceName[0], path + replaceName[0]))
		.pipe(replace(replaceName[1], path + replaceName[1]))
		.pipe(replace(replaceName[2], path + replaceName[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/'+lscs_platename_data));
});

gulp.task('lscs_ka_mergejs_android', function() {
    gulp.src('./data-lushichuanshuo-ka-index.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(replaceName[0], path + replaceName[0]))
		.pipe(replace(replaceName[1], path + replaceName[1]))
		.pipe(replace(replaceName[2], path + replaceName[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('./data-lushichuanshuo-ka-job.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(replaceName[0], path + replaceName[0]))
		.pipe(replace(replaceName[1], path + replaceName[1]))
		.pipe(replace(replaceName[2], path + replaceName[2]))
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('./data-lushichuanshuo-ka-detail.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(replaceName[0], path + replaceName[0]))
		.pipe(replace(replaceName[1], path + replaceName[1]))
		.pipe(replace(replaceName[2], path + replaceName[2]))
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('./data-lushichuanshuo-ka-mygroup.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(replaceName[0], path + replaceName[0]))
		.pipe(replace(replaceName[1], path + replaceName[1]))
		.pipe(replace(replaceName[2], path + replaceName[2]))
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('./data-lushichuanshuo-ka-mycards.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(replaceName[0], path + replaceName[0]))
		.pipe(replace(replaceName[1], path + replaceName[1]))
		.pipe(replace(replaceName[2], path + replaceName[2]))
        .pipe(gulp.dest('../../chajian/79/android/DataPlugin/'+lscs_platename_ka));
});

gulp.task('lscs_android', function(){
	gulp.start('lscs_images', 'lscs_css', 'lscs_js_android', 'lscs_json', 'lscs_data_mergejs_android', 'lscs_ka_mergejs_android');
});















