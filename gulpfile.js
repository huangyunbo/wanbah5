/*
	cnpm install gulp-concat gulp-uglify gulp-merge-link gulp-rename gulp-rename gulp-replace gulp-clean del --save-dev
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
var clean = require('gulp-clean');
var del = require('del');

var lscs_platename_data = "plugin_964";
var lscs_platename_ka = "plugin_963";
var lscs_path = '../';
var lscs_replacename = ['css/', 'js/', 'json/'];
var lscs_replacename_data_tmp = [];
var lscs_replacename_ka_tmp = [];
var lscs_platform = 'android';

if(lscs_platform == 'android'){
	for(var i=0; i<lscs_replacename.length; i++){
		lscs_replacename_data_tmp[i] = lscs_path + lscs_replacename[i];
		lscs_replacename_ka_tmp[i] = lscs_path + lscs_replacename[i];
	}
}

gulp.task('lscs_images', function(){
    gulp.src('./images/lushichuanshuo/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/images/lushichuanshuo'));
});

gulp.task('lscs_css', function(){
    gulp.src('./css/data-lushichuanshuo.css', {buffer: false})
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/css'));
});

gulp.task('lscs_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-lushichuanshuo.js'])
        .pipe(concat('lushichuanshuo.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+lscs_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/js'));
		
	gulp.src(['./js/jquery-2.1.3.min.js','./js/easydialog.min.js','./js/data-lushichuanshuo-ka.js'])
        .pipe(concat('lushichuanshuo-ka.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+lscs_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/js'));
});

gulp.task('lscs_json', function(){
    gulp.src('./json/json-lushichuanshuo.js', {buffer: false})
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/json'));
});

gulp.task('lscs_data_replace', function(){
	if(lscs_platform == 'ios'){
		for(var i=0; i<lscs_replacename.length; i++){
			lscs_replacename_data_tmp[i] = lscs_replacename[i];
		}
	}
    gulp.src('data-lushichuanshuo.html')
        .pipe(merge({
            'js/lushichuanshuo.min.js':['js/jquery-2.1.3.min.js','js/data-lushichuanshuo.js']
        }))
		.pipe(replace(lscs_replacename[0], lscs_replacename_data_tmp[0]))
		.pipe(replace(lscs_replacename[1], lscs_replacename_data_tmp[1]))
		.pipe(replace(lscs_replacename[2], lscs_replacename_data_tmp[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_platename_data));
});

gulp.task('lscs_ka_replace', function(){
	if(lscs_platform == 'ios'){
		for(var i=0; i<lscs_replacename.length; i++){
			lscs_replacename_ka_tmp[i] = lscs_replacename[i];
		}
	}

    gulp.src('data-lushichuanshuo-ka-index.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replacename[0], lscs_replacename_ka_tmp[0]))
		.pipe(replace(lscs_replacename[1], lscs_replacename_ka_tmp[1]))
		.pipe(replace(lscs_replacename[2], lscs_replacename_ka_tmp[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('data-lushichuanshuo-ka-job.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replacename[0], lscs_replacename_ka_tmp[0]))
		.pipe(replace(lscs_replacename[1], lscs_replacename_ka_tmp[1]))
		.pipe(replace(lscs_replacename[2], lscs_replacename_ka_tmp[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('data-lushichuanshuo-ka-detail.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replacename[0], lscs_replacename_ka_tmp[0]))
		.pipe(replace(lscs_replacename[1], lscs_replacename_ka_tmp[1]))
		.pipe(replace(lscs_replacename[2], lscs_replacename_ka_tmp[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('data-lushichuanshuo-ka-mygroup.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replacename[0], lscs_replacename_ka_tmp[0]))
		.pipe(replace(lscs_replacename[1], lscs_replacename_ka_tmp[1]))
		.pipe(replace(lscs_replacename[2], lscs_replacename_ka_tmp[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_platename_ka));
		
	gulp.src('data-lushichuanshuo-ka-mycards.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replacename[0], lscs_replacename_ka_tmp[0]))
		.pipe(replace(lscs_replacename[1], lscs_replacename_ka_tmp[1]))
		.pipe(replace(lscs_replacename[2], lscs_replacename_ka_tmp[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_platename_ka));
});

gulp.task('lscs_clean', function(){
	return gulp.src('../../chajian/79/'+lscs_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('lscs_android', ['lscs_clean'], function(){
	gulp.start('lscs_images', 'lscs_css', 'lscs_js', 'lscs_json', 'lscs_data_replace', 'lscs_ka_replace');
});

gulp.task('lscs_ios', ['lscs_clean'], function(){
	lscs_platform = 'ios';
	gulp.start('lscs_images', 'lscs_css', 'lscs_js', 'lscs_json', 'lscs_data_replace', 'lscs_ka_replace');
});













