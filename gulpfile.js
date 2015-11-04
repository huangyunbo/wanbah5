/*
	cnpm install gulp gulp-concat gulp-uglify gulp-merge-link gulp-rename gulp-replace gulp-clean del --save-dev
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
	
	if(qjnn_platform == 'android'){
		gulp.src('./images/.nomedia', {buffer: false})
			.pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/images'));
	}
});

gulp.task('qjnn_css', function(){
    gulp.src(['./css/data-qjnn-choice.css', './css/data-qjnn-pass.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/css'));
});

gulp.task('qjnn_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/easydialog.min.js','./js/data-qjnn-choice.js'])
        .pipe(concat('data-qjnn-choice.min.js'))
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
    gulp.src(['./json/json-qjnn-choice.js', './json/json-qjnn-pass.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/json'));
});

gulp.task('qjnn_data', function(){
	if(qjnn_platform == 'android'){
		for(var i=0; i<qjnn_replace.length; i++){
			qjnn_replace_data[i] = qjnn_path + qjnn_replace[i];
		}
	}
	
    gulp.src('data-qjnn-choice-index.html')
        .pipe(merge({
            'js/data-qjnn-choice.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-qjnn-choice.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_data));
	
	gulp.src('data-qjnn-choice-dress.html')
        .pipe(merge({
            'js/data-qjnn-choice.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-qjnn-choice.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_data));
	
	gulp.src('data-qjnn-choice-my.html')
        .pipe(merge({
            'js/data-qjnn-choice.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-qjnn-choice.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_data));
	
	gulp.src('data-qjnn-choice-mydetail.html')
        .pipe(merge({
            'js/data-qjnn-choice.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-qjnn-choice.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
        .pipe(gulp.dest('../../chajian/78/'+qjnn_platform+'/DataPlugin/'+qjnn_plugin_data));
	
	gulp.src('data-qjnn-choice-manual.html')
        .pipe(merge({
            'js/data-qjnn-choice.min.js':['js/jquery-2.1.3.min.js','js/easydialog.min.js','js/data-qjnn-choice.js']
        }))
		.pipe(replace(qjnn_replace[0], qjnn_replace_data[0]))
		.pipe(replace(qjnn_replace[1], qjnn_replace_data[1]))
		.pipe(replace(qjnn_replace[2], qjnn_replace_data[2]))
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

//虚荣
var vainglory_gameid = 99;
var vainglory_plugin_hero = "plugin_1080";
var vainglory_plugin_equip = "plugin_1083";
var vainglory_path = '../';
var vainglory_replace = ['css/', 'js/', 'json/'];
var vainglory_replace_data =  ['css/', 'js/', 'json/'];
var vainglory_platform = 'android';

/*gulp.task('vainglory_images', function(){
    gulp.src('./images/vainglory/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/vainglory'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/'));
});*/

gulp.task('vainglory_css', function(){
    gulp.src(['./css/data-vainglory.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/css'));
});

gulp.task('vainglory_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-vainglory.js'])
        .pipe(concat('data-vainglory.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+vainglory_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/js'));
});

/*gulp.task('vainglory_json', function(){
    gulp.src(['./json/json-vainglory.js', './json/json-vainglory.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/json'));
});*/

gulp.task('vainglory_data', function(){
	if(vainglory_platform == 'android'){
		for(var i=0; i<vainglory_replace.length; i++){
			vainglory_replace_data[i] = vainglory_path + vainglory_replace[i];
		}
	}
	
    gulp.src('data-vainglory-hero.html')
		.pipe(merge({
            'js/data-vainglory.min.js':['js/jquery-2.1.3.min.js','js/data-vainglory.js']
        }))
		.pipe(replace(vainglory_replace[0], vainglory_replace_data[0]))
		.pipe(replace(vainglory_replace[1], vainglory_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/'+vainglory_plugin_hero));
		
	gulp.src('data-vainglory-equip.html')
		.pipe(merge({
			'js/data-vainglory.min.js':['js/jquery-2.1.3.min.js','js/data-vainglory.js']
		}))
		.pipe(replace(vainglory_replace[0], vainglory_replace_data[0]))
		.pipe(replace(vainglory_replace[1], vainglory_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/'+vainglory_plugin_equip));
});

gulp.task('vainglory_clean', function(){
	return gulp.src('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('vainglory_android', ['vainglory_clean'], function(){
	gulp.start('vainglory_css', 'vainglory_js', 'vainglory_data');
});

gulp.task('vainglory_ios_inner', ['vainglory_clean'], function(){
	gulp.start('vainglory_css', 'vainglory_js', 'vainglory_data');
});

gulp.task('vainglory_ios', function(){
	vainglory_platform = 'ios';
	gulp.start('vainglory_ios_inner');
});


//保卫萝卜3
var luobo3_gameid = 86;
var luobo3_plugin = "plugin_1098";
var luobo3_path = '../';
var luobo3_replace = ['css/', 'js/', 'json/'];
var luobo3_replace_data =  ['css/', 'js/', 'json/'];
var luobo3_platform = 'android';

/*gulp.task('vainglory_images', function(){
    gulp.src('./images/vainglory/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/vainglory'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/'));
});*/

gulp.task('luobo3_css', function(){
    gulp.src(['./css/data-luobo3.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+luobo3_gameid+'/'+luobo3_platform+'/DataPlugin/css'));
});

gulp.task('luobo3_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-luobo3.js'])
        .pipe(concat('data-luobo3.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+luobo3_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+luobo3_gameid+'/'+luobo3_platform+'/DataPlugin/js'));
});

/*gulp.task('vainglory_json', function(){
    gulp.src(['./json/json-vainglory.js', './json/json-vainglory.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/json'));
});*/

gulp.task('luobo3_data', function(){
	if(luobo3_platform == 'android'){
		for(var i=0; i<luobo3_replace.length; i++){
			luobo3_replace_data[i] = luobo3_path + luobo3_replace[i];
		}
	}
	
    gulp.src('data-luobo3.html')
		.pipe(merge({
            'js/data-luobo3.min.js':['js/jquery-2.1.3.min.js','js/data-luobo3.js']
        }))
		.pipe(replace(luobo3_replace[0], luobo3_replace_data[0]))
		.pipe(replace(luobo3_replace[1], luobo3_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+luobo3_gameid+'/'+luobo3_platform+'/DataPlugin/'+luobo3_plugin));
});

gulp.task('luobo3_clean', function(){
	return gulp.src('../../chajian/'+luobo3_gameid+'/'+luobo3_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('luobo3_android', ['luobo3_clean'], function(){
	gulp.start('luobo3_css', 'luobo3_js', 'luobo3_data');
});

gulp.task('luobo3_ios_inner', ['luobo3_clean'], function(){
	gulp.start('luobo3_css', 'luobo3_js', 'luobo3_data');
});

gulp.task('luobo3_ios', function(){
	luobo3_platform = 'ios';
	gulp.start('luobo3_ios_inner');
});


//全民超神
var quanminchaoshen_gameid = 82;//100
var quanminchaoshen_plugin_hero = "plugin_1119";//plugin_1101
var quanminchaoshen_plugin_equip = "plugin_1103";
var quanminchaoshen_path = '../';
var quanminchaoshen_replace = ['css/', 'js/', 'json/'];
var quanminchaoshen_replace_data =  ['css/', 'js/', 'json/'];
var quanminchaoshen_platform = 'android';

gulp.task('quanminchaoshen_images', function(){
    gulp.src('./images/quanminchaoshen/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/images/quanminchaoshen'));
	
	if(quanminchaoshen_platform == 'android'){
		gulp.src('./images/.nomedia', {buffer: false})
			.pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/images'));
	}
});

gulp.task('quanminchaoshen_css', function(){
    gulp.src(['./css/data-quanminchaoshen.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/css'));
});

gulp.task('quanminchaoshen_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/tvp.player.js','./js/data-quanminchaoshen-hero.js'])
        .pipe(concat('data-quanminchaoshen-hero.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+quanminchaoshen_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/js'));
	
	gulp.src(['./js/jquery-2.1.3.min.js','./js/data-quanminchaoshen-equip.js'])
        .pipe(concat('data-quanminchaoshen-equip.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+quanminchaoshen_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/js'));
});

gulp.task('quanminchaoshen_json', function(){
    gulp.src('./json/json-quanminchaoshen.js', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/json'));
});

gulp.task('quanminchaoshen_data', function(){
	if(quanminchaoshen_platform == 'android'){
		for(var i=0; i<quanminchaoshen_replace.length; i++){
			quanminchaoshen_replace_data[i] = quanminchaoshen_path + quanminchaoshen_replace[i];
		}
	}
	
    gulp.src('data-quanminchaoshen-hero.html')
		.pipe(merge({
            'js/data-quanminchaoshen-hero.min.js':['js/jquery-2.1.3.min.js','js/tvp.player.js','js/data-quanminchaoshen-hero.js']
        }))
		.pipe(replace(quanminchaoshen_replace[0], quanminchaoshen_replace_data[0]))
		.pipe(replace(quanminchaoshen_replace[1], quanminchaoshen_replace_data[1]))
		.pipe(replace(quanminchaoshen_replace[2], quanminchaoshen_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/'+quanminchaoshen_plugin_hero));
	
	gulp.src('data-quanminchaoshen-hero-detail.html')
		.pipe(merge({
            'js/data-quanminchaoshen-hero.min.js':['js/jquery-2.1.3.min.js','js/tvp.player.js','js/data-quanminchaoshen-hero.js']
        }))
		.pipe(replace(quanminchaoshen_replace[0], quanminchaoshen_replace_data[0]))
		.pipe(replace(quanminchaoshen_replace[1], quanminchaoshen_replace_data[1]))
		.pipe(replace(quanminchaoshen_replace[2], quanminchaoshen_replace_data[2]))
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/'+quanminchaoshen_plugin_hero));
	
	gulp.src('data-quanminchaoshen-equip.html')
		.pipe(merge({
            'js/data-quanminchaoshen-equip.min.js':['js/jquery-2.1.3.min.js','js/data-quanminchaoshen-equip.js']
        }))
		.pipe(replace(quanminchaoshen_replace[0], quanminchaoshen_replace_data[0]))
		.pipe(replace(quanminchaoshen_replace[1], quanminchaoshen_replace_data[1]))
		.pipe(replace(quanminchaoshen_replace[2], quanminchaoshen_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/'+quanminchaoshen_plugin_equip));
	
	gulp.src('data-quanminchaoshen-equip-detail.html')
		.pipe(merge({
            'js/data-quanminchaoshen-equip.min.js':['js/jquery-2.1.3.min.js','js/data-quanminchaoshen-equip.js']
        }))
		.pipe(replace(quanminchaoshen_replace[0], quanminchaoshen_replace_data[0]))
		.pipe(replace(quanminchaoshen_replace[1], quanminchaoshen_replace_data[1]))
		.pipe(replace(quanminchaoshen_replace[2], quanminchaoshen_replace_data[2]))
        .pipe(gulp.dest('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/'+quanminchaoshen_plugin_equip));
});

gulp.task('quanminchaoshen_clean', function(){
	return gulp.src('../../chajian/'+quanminchaoshen_gameid+'/'+quanminchaoshen_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('quanminchaoshen_android', ['quanminchaoshen_clean'], function(){
	gulp.start('quanminchaoshen_images', 'quanminchaoshen_css', 'quanminchaoshen_js', 'quanminchaoshen_json', 'quanminchaoshen_data');
});

gulp.task('quanminchaoshen_ios_inner', ['quanminchaoshen_clean'], function(){
	gulp.start('quanminchaoshen_images', 'quanminchaoshen_css', 'quanminchaoshen_js', 'quanminchaoshen_json', 'quanminchaoshen_data');
});

gulp.task('quanminchaoshen_ios', function(){
	quanminchaoshen_platform = 'ios';
	gulp.start('quanminchaoshen_ios_inner');
});







