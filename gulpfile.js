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


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge = require('gulp-merge-link');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var clean = require('gulp-clean');
var del = require('del');


//炉石传说
var lscs_plugin_data = "plugin_964";
var lscs_plugin_ka = "plugin_963";
var lscs_path = '../';
var lscs_replace = ['css/', 'js/', 'json/'];
var lscs_replace_data =  ['css/', 'js/', 'json/'];
var lscs_platform = 'android';

gulp.task('lscs_images', function(){
    gulp.src('./images/lushichuanshuo/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/images/lushichuanshuo'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/images/'));
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

gulp.task('lscs_data', function(){
	if(lscs_platform == 'android'){
		for(var i=0; i<lscs_replace.length; i++){
			lscs_replace_data[i] = lscs_path + lscs_replace[i];
		}
	}
    gulp.src('data-lushichuanshuo.html')
        .pipe(merge({
            'js/lushichuanshuo.min.js':['js/jquery-2.1.3.min.js','js/data-lushichuanshuo.js']
        }))
		.pipe(replace(lscs_replace[0], lscs_replace_data[0]))
		.pipe(replace(lscs_replace[1], lscs_replace_data[1]))
		.pipe(replace(lscs_replace[2], lscs_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_plugin_data));
});

gulp.task('lscs_ka', function(){
	if(lscs_platform == 'android'){
		for(var i=0; i<lscs_replace.length; i++){
			lscs_replace_data[i] = lscs_path + lscs_replace[i];
		}
	}
    gulp.src('data-lushichuanshuo-ka-index.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replace[0], lscs_replace_data[0]))
		.pipe(replace(lscs_replace[1], lscs_replace_data[1]))
		.pipe(replace(lscs_replace[2], lscs_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_plugin_ka));
		
	gulp.src('data-lushichuanshuo-ka-job.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replace[0], lscs_replace_data[0]))
		.pipe(replace(lscs_replace[1], lscs_replace_data[1]))
		.pipe(replace(lscs_replace[2], lscs_replace_data[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_plugin_ka));
		
	gulp.src('data-lushichuanshuo-ka-detail.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replace[0], lscs_replace_data[0]))
		.pipe(replace(lscs_replace[1], lscs_replace_data[1]))
		.pipe(replace(lscs_replace[2], lscs_replace_data[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_plugin_ka));
		
	gulp.src('data-lushichuanshuo-ka-mygroup.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replace[0], lscs_replace_data[0]))
		.pipe(replace(lscs_replace[1], lscs_replace_data[1]))
		.pipe(replace(lscs_replace[2], lscs_replace_data[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_plugin_ka));
		
	gulp.src('data-lushichuanshuo-ka-mycards.html')
		.pipe(merge({
            'js/lushichuanshuo-ka.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-lushichuanshuo-ka.js']
        }))
		.pipe(replace(lscs_replace[0], lscs_replace_data[0]))
		.pipe(replace(lscs_replace[1], lscs_replace_data[1]))
		.pipe(replace(lscs_replace[2], lscs_replace_data[2]))
        .pipe(gulp.dest('../../chajian/79/'+lscs_platform+'/DataPlugin/'+lscs_plugin_ka));
});

gulp.task('lscs_clean', function(){
	return gulp.src('../../chajian/79/'+lscs_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('lscs_android', ['lscs_clean'], function(){
	gulp.start('lscs_images', 'lscs_css', 'lscs_js', 'lscs_json', 'lscs_data', 'lscs_ka');
});

gulp.task('lscs_ios_inner', ['lscs_clean'], function(){
	gulp.start('lscs_images', 'lscs_css', 'lscs_js', 'lscs_json', 'lscs_data', 'lscs_ka');
});

gulp.task('lscs_ios', function(){
	lscs_platform = 'ios';
	gulp.start('lscs_ios_inner');
});



//拳皇98终极之战OL
var quanhuang98_plugin_data = "plugin_992";
var quanhuang98_path = '../';
var quanhuang98_replace = ['css/', 'js/', 'json/'];
var quanhuang98_replace_data = ['css/', 'js/', 'json/'];
var quanhuang98_platform = 'android';

gulp.task('quanhuang98_images', function(){
    gulp.src('./images/quanhuang98/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/images/quanhuang98'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/images/'));
});

gulp.task('quanhuang98_css', function(){
    gulp.src('./css/data-quanhuang98.css', {buffer: false})
        .pipe(gulp.dest('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/css'));
});

gulp.task('quanhuang98_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-quanhuang98.js'])
        .pipe(concat('quanhuang98.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+quanhuang98_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/js'));
});

gulp.task('quanhuang98_json', function(){
    gulp.src('./json/json-quanhuang98.js', {buffer: false})
        .pipe(gulp.dest('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/json'));
});

gulp.task('quanhuang98_data', function(){
	if(quanhuang98_platform == 'android'){
		for(var i=0; i<quanhuang98_replace.length; i++){
			quanhuang98_replace_data[i] = quanhuang98_path + quanhuang98_replace[i];
		}
	}
    gulp.src('data-quanhuang98.html')
        .pipe(merge({
            'js/quanhuang98.min.js':['js/jquery-2.1.3.min.js','js/data-quanhuang98.js']
        }))
		.pipe(replace(quanhuang98_replace[0], quanhuang98_replace_data[0]))
		.pipe(replace(quanhuang98_replace[1], quanhuang98_replace_data[1]))
		.pipe(replace(quanhuang98_replace[2], quanhuang98_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/'+quanhuang98_plugin_data));
	
	gulp.src('data-quanhuang98-detail.html')
        .pipe(merge({
            'js/quanhuang98.min.js':['js/jquery-2.1.3.min.js','js/data-quanhuang98.js']
        }))
		.pipe(replace(quanhuang98_replace[0], quanhuang98_replace_data[0]))
		.pipe(replace(quanhuang98_replace[1], quanhuang98_replace_data[1]))
		.pipe(replace(quanhuang98_replace[2], quanhuang98_replace_data[2]))
        .pipe(gulp.dest('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/'+quanhuang98_plugin_data));
});

gulp.task('quanhuang98_clean', function(){
	return gulp.src('../../chajian/94/'+quanhuang98_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('quanhuang98_android', ['quanhuang98_clean'], function(){
	gulp.start('quanhuang98_images', 'quanhuang98_css', 'quanhuang98_js', 'quanhuang98_json', 'quanhuang98_data');
});

gulp.task('quanhuang98_ios_inner', ['quanhuang98_clean'], function(){
	gulp.start('quanhuang98_images', 'quanhuang98_css', 'quanhuang98_js', 'quanhuang98_json', 'quanhuang98_data');
});

gulp.task('quanhuang98_ios', function(){
	quanhuang98_platform = 'ios';
	gulp.start('quanhuang98_ios_inner');
});


//奇迹暖暖
var qjnn_plugin_data = "plugin_952";
var qjnn_plugin_pass = "plugin_911";
var qjnn_path = '../';
var qjnn_replace = ['css/', 'js/', 'json/'];
var qjnn_replace_data =  ['css/', 'js/', 'json/'];
var qjnn_platform = 'android';

gulp.task('qjnn_images', function(){
    gulp.src('./images/qjnn/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/images/qjnn'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/images/'));
});

gulp.task('qjnn_css', function(){
    gulp.src(['./css/data-qjnn.css', './css/data-qjnn-pass.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/css'));
});

gulp.task('qjnn_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/easydialog.min.js','./js/data-qjnn.js'])
        .pipe(concat('data-qjnn.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+qjnn_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/js'));
		
	gulp.src(['./js/jquery-2.1.3.min.js','./js/data-qjnn-pass.js'])
        .pipe(concat('data-qjnn-pass.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+qjnn_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/js'));
});

gulp.task('qjnn_json', function(){
    gulp.src(['./json/json-qjnn.js', './json/json-qjnn-pass.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/json'));
});

gulp.task('qjnn_data', function(){
	if(qjnn_platform == 'android'){
		for(var i=0; i<qjnn_replace.length; i++){
			qjnn_replace_data[i] = qjnn_path + qjnn_replace[i];
		}
	}
	
    gulp.src('data-qjnn.html')
        .pipe(merge({
            'js/data-qjnn.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-qjnn.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_data));
		
	gulp.src('data-qjnn-pass.html')
		.pipe(merge({
            'js/data-qjnn-pass.min.js':['js/jquery-2.1.3.min.js','js/data-qjnn-pass.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_pass));
	
	gulp.src('data-qjnn-pass-list.html')
		.pipe(merge({
            'js/data-qjnn-pass.min.js':['js/jquery-2.1.3.min.js','js/data-qjnn-pass.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_pass));
	
	gulp.src('data-qjnn-pass-detail.html')
		.pipe(merge({
            'js/data-qjnn-pass.min.js':['js/jquery-2.1.3.min.js','js/data-qjnn-pass.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_pass));
});

gulp.task('qjnn_clean', function(){
	return gulp.src('../../chajian/78/'+qjnn_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('qjnn_android', ['qjnn_clean'], function(){
	gulp.start('qjnn_images', 'qjnn_css', 'qjnn_js', 'qjnn_json', 'qjnn_data');
});

gulp.task('qjnn_ios_inner', ['qjnn_clean'], function(){
	gulp.start('qjnn_images', 'qjnn_css', 'qjnn_js', 'qjnn_json', 'qjnn_data');
});

gulp.task('qjnn_ios', function(){
	qjnn_platform = 'ios';
	gulp.start('qjnn_ios_inner');
});








