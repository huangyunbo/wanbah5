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

//压缩kindeditor
gulp.task('kindeditor', function() {
  gulp.src(['kindeditor.js'])
    .pipe(uglify())
    .pipe(concat('kindeditor.min.js'))
    .pipe(gulp.dest('.'));
});

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


// var vainglory_gameid = 82;//82外网测试
// var vainglory_plugin_hero = "plugin_1119";
// var vainglory_plugin_equip = "plugin_1162";
//虚荣
var vainglory_gameid = 99;
var vainglory_plugin_hero = "plugin_1080";
var vainglory_plugin_equip = "plugin_1083";
var vainglory_path = '../';
var vainglory_replace = ['css/', 'js/', 'json/'];
var vainglory_replace_data =  ['css/', 'js/', 'json/'];	
var vainglory_platform = 'android';

gulp.task('vainglory_images', function(){
    gulp.src('./images/vainglory/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/vainglory/'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/'));
});

gulp.task('vainglory_css', function(){
    gulp.src(['./css/data-vainglory.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/css/'));
});

gulp.task('vainglory_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-vainglory-hero.js'])
        .pipe(concat('data-vainglory-hero.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+vainglory_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/js/'));

    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-vainglory-equip.js'])
        .pipe(concat('data-vainglory-equip.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+vainglory_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/js/'));
});

gulp.task('vainglory_json', function(){
    gulp.src('./json/json-vainglory.js', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/json/'));
});

gulp.task('vainglory_data', function(){
	if(vainglory_platform == 'android'){
		for(var i=0; i<vainglory_replace.length; i++){
			vainglory_replace_data[i] = vainglory_path + vainglory_replace[i];
		}
	}
	
    gulp.src('data-vainglory-hero.html')
		.pipe(merge({
            'js/data-vainglory-hero.min.js':['js/jquery-2.1.3.min.js','js/data-vainglory-hero.js']
        }))
		.pipe(replace(vainglory_replace[0], vainglory_replace_data[0]))
		.pipe(replace(vainglory_replace[1], vainglory_replace_data[1]))
		.pipe(replace(vainglory_replace[2], vainglory_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/'+vainglory_plugin_hero));

    gulp.src('data-vainglory-hero-detail.html')
		.pipe(merge({
            'js/data-vainglory-hero.min.js':['js/jquery-2.1.3.min.js','js/data-vainglory-hero.js']
        }))
		.pipe(replace(vainglory_replace[0], vainglory_replace_data[0]))
		.pipe(replace(vainglory_replace[1], vainglory_replace_data[1]))
		.pipe(replace(vainglory_replace[2], vainglory_replace_data[2]))
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/'+vainglory_plugin_hero));
		
	gulp.src('data-vainglory-equip.html')
		.pipe(merge({
			'js/data-vainglory-equip.min.js':['js/jquery-2.1.3.min.js','js/data-vainglory-equip.js']
		}))
		.pipe(replace(vainglory_replace[0], vainglory_replace_data[0]))
		.pipe(replace(vainglory_replace[1], vainglory_replace_data[1]))
		.pipe(replace(vainglory_replace[2], vainglory_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/'+vainglory_plugin_equip));

    gulp.src('data-vainglory-equip-detail.html')
		.pipe(merge({
			'js/data-vainglory-equip.min.js':['js/jquery-2.1.3.min.js','js/data-vainglory-equip.js']
		}))
		.pipe(replace(vainglory_replace[0], vainglory_replace_data[0]))
		.pipe(replace(vainglory_replace[1], vainglory_replace_data[1]))
		.pipe(replace(vainglory_replace[2], vainglory_replace_data[2]))
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/'+vainglory_plugin_equip));    
});

gulp.task('vainglory_clean', function(){
	return gulp.src('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('vainglory_android', ['vainglory_clean'], function(){
	gulp.start('vainglory_images','vainglory_json','vainglory_css', 'vainglory_js', 'vainglory_data');
});

gulp.task('vainglory_ios_inner', ['vainglory_clean'], function(){
	gulp.start('vainglory_images','vainglory_json','vainglory_css', 'vainglory_js', 'vainglory_data');
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
var quanminchaoshen_gameid = 100;//100
var quanminchaoshen_plugin_hero = "plugin_1101";//plugin_1101
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


//智龙迷城
var zhilongmicheng_gameid = 101;
var zhilongmicheng_plugin = "plugin_1113";
var zhilongmicheng_path = '../';
var zhilongmicheng_replace = ['css/', 'js/', 'json/'];
var zhilongmicheng_replace_data =  ['css/', 'js/', 'json/'];
var zhilongmicheng_platform = 'android';

/*gulp.task('vainglory_images', function(){
    gulp.src('./images/vainglory/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/vainglory'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/'));
});*/

gulp.task('zhilongmicheng_css', function(){
    gulp.src(['./css/data-zhilongmicheng.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+zhilongmicheng_gameid+'/'+zhilongmicheng_platform+'/DataPlugin/css'));
});

gulp.task('zhilongmicheng_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-zhilongmicheng.js'])
        .pipe(concat('data-zhilongmicheng.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+zhilongmicheng_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+zhilongmicheng_gameid+'/'+zhilongmicheng_platform+'/DataPlugin/js'));
});

/*gulp.task('vainglory_json', function(){
    gulp.src(['./json/json-vainglory.js', './json/json-vainglory.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/json'));
});*/

gulp.task('zhilongmicheng_data', function(){
	if(zhilongmicheng_platform == 'android'){
		for(var i=0; i<zhilongmicheng_replace.length; i++){
			zhilongmicheng_replace_data[i] = zhilongmicheng_path + zhilongmicheng_replace[i];
		}
	}
	
    gulp.src('data-zhilongmicheng.html')
		.pipe(merge({
            'js/data-zhilongmicheng.min.js':['js/jquery-2.1.3.min.js','js/data-zhilongmicheng.js']
        }))
		.pipe(replace(zhilongmicheng_replace[0], zhilongmicheng_replace_data[0]))
		.pipe(replace(zhilongmicheng_replace[1], zhilongmicheng_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+zhilongmicheng_gameid+'/'+zhilongmicheng_platform+'/DataPlugin/'+zhilongmicheng_plugin));
});

gulp.task('zhilongmicheng_clean', function(){
	return gulp.src('../../chajian/'+zhilongmicheng_gameid+'/'+zhilongmicheng_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('zhilongmicheng_android', ['zhilongmicheng_clean'], function(){
	gulp.start('zhilongmicheng_css', 'zhilongmicheng_js', 'zhilongmicheng_data');
});

gulp.task('zhilongmicheng_ios_inner', ['zhilongmicheng_clean'], function(){
	gulp.start('zhilongmicheng_css', 'zhilongmicheng_js', 'zhilongmicheng_data');
});

gulp.task('zhilongmicheng_ios', function(){
	zhilongmicheng_platform = 'ios';
	gulp.start('zhilongmicheng_ios_inner');
});


//王者荣耀
var wangzherongyao_gameid = 104;
var wangzherongyao_plugin_hero = "plugin_1133";
var wangzherongyao_plugin_equip = "plugin_1134";
var wangzherongyao_path = '../';
var wangzherongyao_replace = ['css/', 'js/', 'json/'];
var wangzherongyao_replace_data =  ['css/', 'js/', 'json/'];
var wangzherongyao_platform = 'android';

gulp.task('wangzherongyao_images', function(){
    gulp.src('./images/wangzherongyao/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/images/wangzherongyao'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/images/'));
});

gulp.task('wangzherongyao_css', function(){
    gulp.src(['./css/data-wangzherongyao.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/css'));
});

gulp.task('wangzherongyao_js', function(){
    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-wangzherongyao-hero.js'])
        .pipe(concat('data-wangzherongyao-hero.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+wangzherongyao_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/js'));
    gulp.src('./js/tvp.player.js')
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/js'));
	gulp.src(['./js/jquery-2.1.4.min.js','./js/data-wangzherongyao-equip.js'])
        .pipe(concat('data-wangzherongyao-equip.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+wangzherongyao_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/js'));
});

gulp.task('wangzherongyao_json', function(){
    gulp.src(['./json/json-wangzherongyao.js', './json/json-wangzherongyao.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/json'));
});

gulp.task('wangzherongyao_data', function(){
	if(wangzherongyao_platform == 'android'){
		for(var i=0; i<wangzherongyao_replace.length; i++){
			wangzherongyao_replace_data[i] = wangzherongyao_path + wangzherongyao_replace[i];
		}
	}
	
    gulp.src('data-wangzherongyao-hero.html')
		.pipe(merge({
            'js/data-wangzherongyao-hero.min.js':['js/jquery-2.1.4.min.js','js/data-wangzherongyao-hero.js']
        }))
		.pipe(replace(wangzherongyao_replace[0], wangzherongyao_replace_data[0]))
		.pipe(replace(wangzherongyao_replace[1], wangzherongyao_replace_data[1]))
		.pipe(replace(wangzherongyao_replace[2], wangzherongyao_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/'+wangzherongyao_plugin_hero));

    gulp.src('data-wangzherongyao-hero-detail.html')
		.pipe(merge({
            'js/data-wangzherongyao-hero.min.js':['js/jquery-2.1.4.min.js','js/data-wangzherongyao-hero.js']
        }))
		.pipe(replace(wangzherongyao_replace[0], wangzherongyao_replace_data[0]))
		.pipe(replace(wangzherongyao_replace[1], wangzherongyao_replace_data[1]))
		.pipe(replace(wangzherongyao_replace[2], wangzherongyao_replace_data[2]))
		.pipe(rename('data-wangzherongyao-hero-detail.html'))
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/'+wangzherongyao_plugin_hero));
		
	gulp.src('data-wangzherongyao-equip.html')
		.pipe(merge({
			'js/data-wangzherongyao-equip.min.js':['js/jquery-2.1.4.min.js','js/data-wangzherongyao-equip.js']
		}))
		.pipe(replace(wangzherongyao_replace[0], wangzherongyao_replace_data[0]))
		.pipe(replace(wangzherongyao_replace[1], wangzherongyao_replace_data[1]))
		.pipe(replace(wangzherongyao_replace[2], wangzherongyao_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/'+wangzherongyao_plugin_equip));

    gulp.src('data-wangzherongyao-equip-detail.html')
		.pipe(merge({
			'js/data-wangzherongyao-equip.min.js':['js/jquery-2.1.4.min.js','js/data-wangzherongyao-equip.js']
		}))
		.pipe(replace(wangzherongyao_replace[0], wangzherongyao_replace_data[0]))
		.pipe(replace(wangzherongyao_replace[1], wangzherongyao_replace_data[1]))
		.pipe(replace(wangzherongyao_replace[2], wangzherongyao_replace_data[2]))
		.pipe(rename('data-wangzherongyao-equip-detail.html'))
        .pipe(gulp.dest('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/'+wangzherongyao_plugin_equip));
});

gulp.task('wangzherongyao_clean', function(){
	return gulp.src('../../chajian/'+wangzherongyao_gameid+'/'+wangzherongyao_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('wangzherongyao_android', ['wangzherongyao_clean'], function(){
	gulp.start('wangzherongyao_images', 'wangzherongyao_css', 'wangzherongyao_js', 'wangzherongyao_json', 'wangzherongyao_data');
});

gulp.task('wangzherongyao_ios_inner', ['wangzherongyao_clean'], function(){
	gulp.start('wangzherongyao_images', 'wangzherongyao_css', 'wangzherongyao_js', 'wangzherongyao_json', 'wangzherongyao_data');
});

gulp.task('wangzherongyao_ios', function(){
	wangzherongyao_platform = 'ios';
	gulp.start('wangzherongyao_ios_inner');
});


//CF
var cf_gameid = 105;
var cf_plugin = "plugin_1153";
var cf_path = '../';
var cf_replace = ['css/', 'js/', 'json/'];
var cf_replace_data =  ['css/', 'js/', 'json/'];
var cf_platform = 'android';

/*gulp.task('vainglory_images', function(){
    gulp.src('./images/vainglory/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/vainglory'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/'));
});*/

gulp.task('cf_css', function(){
    gulp.src(['./css/data-cf.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+cf_gameid+'/'+cf_platform+'/DataPlugin/css'));
});

gulp.task('cf_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-cf.js'])
        .pipe(concat('data-cf.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+cf_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+cf_gameid+'/'+cf_platform+'/DataPlugin/js'));
});

/*gulp.task('vainglory_json', function(){
    gulp.src(['./json/json-vainglory.js', './json/json-vainglory.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/json'));
});*/

gulp.task('cf_data', function(){
	if(cf_platform == 'android'){
		for(var i=0; i<cf_replace.length; i++){
			cf_replace_data[i] = cf_path + cf_replace[i];
		}
	}
	
    gulp.src('data-cf.html')
		.pipe(merge({
            'js/data-cf.min.js':['js/jquery-2.1.3.min.js','js/data-cf.js']
        }))
		.pipe(replace(cf_replace[0], cf_replace_data[0]))
		.pipe(replace(cf_replace[1], cf_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+cf_gameid+'/'+cf_platform+'/DataPlugin/'+cf_plugin));
});

gulp.task('cf_clean', function(){
	return gulp.src('../../chajian/'+cf_gameid+'/'+cf_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('cf_android', ['cf_clean'], function(){
	gulp.start('cf_css', 'cf_js', 'cf_data');
});

gulp.task('cf_ios_inner', ['cf_clean'], function(){
	gulp.start('cf_css', 'cf_js', 'cf_data');
});

gulp.task('cf_ios', function(){
	cf_platform = 'ios';
	gulp.start('cf_ios_inner');
});


//火影忍者95
var huoyingrenzhe_gameid = 95;
var huoyingrenzhe_plugin = "plugin_1190";
var huoyingrenzhe_path = '../';
var huoyingrenzhe_replace = ['css/', 'js/', 'json/'];
var huoyingrenzhe_replace_data =  ['css/', 'js/', 'json/'];
var huoyingrenzhe_platform = 'android';

/*gulp.task('vainglory_images', function(){
    gulp.src('./images/vainglory/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/vainglory'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/'));
});*/

gulp.task('huoyingrenzhe_css', function(){
    gulp.src(['./css/data-huoyingrenzhe.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+huoyingrenzhe_gameid+'/'+huoyingrenzhe_platform+'/DataPlugin/css'));
});

gulp.task('huoyingrenzhe_js', function(){
    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-huoyingrenzhe.js'])
        .pipe(concat('data-huoyingrenzhe.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+huoyingrenzhe_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+huoyingrenzhe_gameid+'/'+huoyingrenzhe_platform+'/DataPlugin/js'));
});

/*gulp.task('vainglory_json', function(){
    gulp.src(['./json/json-vainglory.js', './json/json-vainglory.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/json'));
});*/

gulp.task('huoyingrenzhe_data', function(){
	if(huoyingrenzhe_platform == 'android'){
		for(var i=0; i<huoyingrenzhe_replace.length; i++){
			huoyingrenzhe_replace_data[i] = huoyingrenzhe_path + huoyingrenzhe_replace[i];
		}
	}
	
    gulp.src('data-huoyingrenzhe.html')
		.pipe(merge({
            'js/data-huoyingrenzhe.min.js':['js/jquery-2.1.4.min.js','js/data-huoyingrenzhe.js']
        }))
		.pipe(replace(huoyingrenzhe_replace[0], huoyingrenzhe_replace_data[0]))
		.pipe(replace(huoyingrenzhe_replace[1], huoyingrenzhe_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+huoyingrenzhe_gameid+'/'+huoyingrenzhe_platform+'/DataPlugin/'+huoyingrenzhe_plugin));
});

gulp.task('huoyingrenzhe_clean', function(){
	return gulp.src('../../chajian/'+huoyingrenzhe_gameid+'/'+huoyingrenzhe_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('huoyingrenzhe_android', ['huoyingrenzhe_clean'], function(){
	gulp.start('huoyingrenzhe_css', 'huoyingrenzhe_js', 'huoyingrenzhe_data');
});

gulp.task('huoyingrenzhe_ios_inner', ['huoyingrenzhe_clean'], function(){
	gulp.start('huoyingrenzhe_css', 'huoyingrenzhe_js', 'huoyingrenzhe_data');
});

gulp.task('huoyingrenzhe_ios', function(){
	huoyingrenzhe_platform = 'ios';
	gulp.start('huoyingrenzhe_ios_inner');
});


//海岛奇兵
var boombeach_gameid = 52;
var boombeach_plugin_arms = "plugin_716";
var boombeach_plugin_build = "plugin_715";
var boombeach_plugin_defense = "plugin_714";
var boombeach_plugin_statue = "plugin_717";
var boombeach_path = '../';
var boombeach_replace = ['css/', 'js/', 'json/'];
var boombeach_replace_data =  ['css/', 'js/', 'json/'];
var boombeach_platform = 'android';

gulp.task('boombeach_images', function(){
    gulp.src('./images/boombeach/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/images/boombeach'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/images/'));
});

gulp.task('boombeach_css', function(){
    gulp.src(['./css/data-boombeach.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/css'));
});

gulp.task('boombeach_js', function(){
    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-boombeach-arms.js'])
        .pipe(concat('data-boombeach-arms.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+boombeach_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/js'));

    gulp.src('./js/tvp.player.js')
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/js'));
        
	gulp.src(['./js/jquery-2.1.4.min.js','./js/data-boombeach-build.js'])
        .pipe(concat('data-boombeach-build.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+boombeach_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/js'));

    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-boombeach-defense.js'])
        .pipe(concat('data-boombeach-defense.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+boombeach_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/js'));

    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-boombeach-statue.js'])
        .pipe(concat('data-boombeach-statue.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+boombeach_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/js'));    

});

gulp.task('boombeach_json', function(){
    gulp.src(['./json/json-boombeach.js', './json/json-boombeach.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/json'));
});

gulp.task('boombeach_data', function(){
	if(boombeach_platform == 'android'){
		for(var i=0; i<boombeach_replace.length; i++){
			boombeach_replace_data[i] = boombeach_path + boombeach_replace[i];
		}
	}
	
    gulp.src('data-boombeach-arms.html')
		.pipe(merge({
            'js/data-boombeach-arms.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-arms.js']
        }))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_arms));

    gulp.src('data-boombeach-arms-details.html')
		.pipe(merge({
            'js/data-boombeach-arms.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-arms.js']
        }))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('data-boombeach-arms-details.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_arms));
		
	gulp.src('data-boombeach-building.html')
		.pipe(merge({
			'js/data-boombeach-build.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-build.js']
		}))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_build));

    gulp.src('data-boombeach-building-details.html')
		.pipe(merge({
			'js/data-boombeach-build.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-build.js']
		}))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('data-boombeach-building-details.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_build));

    gulp.src('data-boombeach-defense.html')
		.pipe(merge({
			'js/data-boombeach-defense.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-defense.js']
		}))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_defense));


    gulp.src('data-boombeach-defense-list.html')
		.pipe(merge({
			'js/data-boombeach-defense.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-defense.js']
		}))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('data-boombeach-defense-list.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_defense));    

    gulp.src('data-boombeach-defense-details.html')
		.pipe(merge({
			'js/data-boombeach-defense.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-defense.js']
		}))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('data-boombeach-defense-details.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_defense));


    gulp.src('data-boombeach-statue.html')
		.pipe(merge({
			'js/data-boombeach-statue.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-statue.js']
		}))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_statue));


    gulp.src('data-boombeach-statue-details.html')
		.pipe(merge({
			'js/data-boombeach-statue.min.js':['js/jquery-2.1.4.min.js','js/data-boombeach-statue.js']
		}))
		.pipe(replace(boombeach_replace[0], boombeach_replace_data[0]))
		.pipe(replace(boombeach_replace[1], boombeach_replace_data[1]))
		.pipe(replace(boombeach_replace[2], boombeach_replace_data[2]))
		.pipe(rename('data-boombeach-statue-details.html'))
        .pipe(gulp.dest('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/'+boombeach_plugin_statue));      
});

gulp.task('boombeach_clean', function(){
	return gulp.src('../../chajian/'+boombeach_gameid+'/'+boombeach_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('boombeach_android', ['boombeach_clean'], function(){
	gulp.start('boombeach_images', 'boombeach_css', 'boombeach_js', 'boombeach_json', 'boombeach_data');
});

gulp.task('boombeach_ios_inner', ['boombeach_clean'], function(){
	gulp.start('boombeach_images', 'boombeach_css', 'boombeach_js', 'boombeach_json', 'boombeach_data');
});

gulp.task('boombeach_ios', function(){
	boombeach_platform = 'ios';
	gulp.start('boombeach_ios_inner');
});


//部落冲突:皇室战争
var huangshizhanzheng_gameid = 106;
var huangshizhanzheng_plugin = "plugin_1194";
var huangshizhanzheng_path = '../';
var huangshizhanzheng_replace = ['css/', 'js/', 'json/'];
var huangshizhanzheng_replace_data =  ['css/', 'js/', 'json/'];
var huangshizhanzheng_platform = 'android';

gulp.task('huangshizhanzheng_images', function(){
    gulp.src('./images/huangshizhanzheng/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/images/huangshizhanzheng'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/images/'));
});

gulp.task('huangshizhanzheng_css', function(){
    gulp.src(['./css/data-huangshizhanzheng.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/css'));
});

gulp.task('huangshizhanzheng_js', function(){
    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-huangshizhanzheng.js'])
        .pipe(concat('data-huangshizhanzheng.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+huangshizhanzheng_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/js'));
});

gulp.task('huangshizhanzheng_json', function(){
    gulp.src(['./json/json-huangshizhanzheng.js', './json/json-huangshizhanzheng.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/json'));
});

gulp.task('huangshizhanzheng_data', function(){
	if(huangshizhanzheng_platform == 'android'){
		for(var i=0; i<huangshizhanzheng_replace.length; i++){
			huangshizhanzheng_replace_data[i] = huangshizhanzheng_path + huangshizhanzheng_replace[i];
		}
	}
	
    gulp.src('data-haungshizhanzheng-weapon.html')
		.pipe(merge({
            'js/data-huangshizhanzheng.min.js':['js/jquery-2.1.4.min.js','js/data-huangshizhanzheng.js']
        }))
		.pipe(replace(huangshizhanzheng_replace[0], huangshizhanzheng_replace_data[0]))
		.pipe(replace(huangshizhanzheng_replace[1], huangshizhanzheng_replace_data[1]))
		.pipe(replace(huangshizhanzheng_replace[2], huangshizhanzheng_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/'+huangshizhanzheng_plugin));

	gulp.src('data-huangshizhanzheng-weapon-detail.html')
		.pipe(merge({
            'js/data-huangshizhanzheng.min.js':['js/jquery-2.1.4.min.js','js/data-huangshizhanzheng.js']
        }))
		.pipe(replace(huangshizhanzheng_replace[0], huangshizhanzheng_replace_data[0]))
		.pipe(replace(huangshizhanzheng_replace[1], huangshizhanzheng_replace_data[1]))
		.pipe(replace(huangshizhanzheng_replace[2], huangshizhanzheng_replace_data[2]))
        .pipe(gulp.dest('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/'+huangshizhanzheng_plugin));
});

gulp.task('huangshizhanzheng_clean', function(){
	return gulp.src('../../chajian/'+huangshizhanzheng_gameid+'/'+huangshizhanzheng_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('huangshizhanzheng_android', ['huangshizhanzheng_clean'], function(){
	gulp.start('huangshizhanzheng_images','huangshizhanzheng_css', 'huangshizhanzheng_js','huangshizhanzheng_json', 'huangshizhanzheng_data');
});

gulp.task('huangshizhanzheng_ios_inner', ['huangshizhanzheng_clean'], function(){
	gulp.start('huangshizhanzheng_images','huangshizhanzheng_css', 'huangshizhanzheng_js','huangshizhanzheng_json','huangshizhanzheng_data');
});

gulp.task('huangshizhanzheng_ios', function(){
	huangshizhanzheng_platform = 'ios';
	gulp.start('huangshizhanzheng_ios_inner');
});


//怪物猎人
var guaiwulieren_gameid = 107;
var guaiwulieren_plugin_data = "plugin_1214";
var guaiwulieren_plugin_dapeiqi = "plugin_1216";
var guaiwulieren_plugin_weapon = "plugin_1217";
var guaiwulieren_path = '../';
var guaiwulieren_replace = ['css/', 'js/', 'json/'];
var guaiwulieren_replace_data =  ['css/', 'js/', 'json/'];
var guaiwulieren_platform = 'android';


gulp.task('guaiwulieren_images', function(){
    gulp.src('./images/guaiwulieren/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/images/guaiwulieren'));
	if(guaiwulieren_platform == 'android'){
		gulp.src('./images/.nomedia', {buffer: false})
	        .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/images/'));
    }
});

gulp.task('guaiwulieren_css', function(){
    gulp.src(['./css/data-guaiwulieren.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/css'));
});

gulp.task('guaiwulieren_js', function(){
    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-guaiwulieren.js'])
        .pipe(concat('data-guaiwulieren.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+guaiwulieren_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/js'));
});

gulp.task('guaiwulieren_json', function(){
    gulp.src(['./json/json-guaiwulieren.js', './json/json-guaiwulieren.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/json'));
});

gulp.task('guaiwulieren_data', function(){
	if(guaiwulieren_platform == 'android'){
		for(var i=0; i<guaiwulieren_replace.length; i++){
			guaiwulieren_replace_data[i] = guaiwulieren_path + guaiwulieren_replace[i];
		}
	}
	
    gulp.src('data-guaiwulieren-data.html')
		.pipe(merge({
            'js/data-guaiwulieren.min.js':['js/jquery-2.1.4.min.js','js/data-guaiwulieren.js']
        }))
		.pipe(replace(guaiwulieren_replace[0], guaiwulieren_replace_data[0]))
		.pipe(replace(guaiwulieren_replace[1], guaiwulieren_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/'+guaiwulieren_plugin_data));

    gulp.src('data-guaiwulieren-dapeiqi.html')
	.pipe(merge({
        'js/data-guaiwulieren.min.js':['js/jquery-2.1.4.min.js','js/data-guaiwulieren.js']
    }))
	.pipe(replace(guaiwulieren_replace[0], guaiwulieren_replace_data[0]))
	.pipe(replace(guaiwulieren_replace[1], guaiwulieren_replace_data[1]))
	.pipe(rename('index.html'))
    .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/'+guaiwulieren_plugin_dapeiqi));

    gulp.src('data-guaiwulieren-weapon.html')
	.pipe(merge({
        'js/data-guaiwulieren.min.js':['js/jquery-2.1.4.min.js','js/data-guaiwulieren.js']
    }))
	.pipe(replace(guaiwulieren_replace[0], guaiwulieren_replace_data[0]))
	.pipe(replace(guaiwulieren_replace[1], guaiwulieren_replace_data[1]))
	.pipe(replace(guaiwulieren_replace[2], guaiwulieren_replace_data[2]))
	.pipe(rename('index.html'))
    .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/'+guaiwulieren_plugin_weapon));

    gulp.src('data-guaiwulieren-weapon-detail.html')
	.pipe(merge({
        'js/data-guaiwulieren.min.js':['js/jquery-2.1.4.min.js','js/data-guaiwulieren.js']
    }))
	.pipe(replace(guaiwulieren_replace[0], guaiwulieren_replace_data[0]))
	.pipe(replace(guaiwulieren_replace[1], guaiwulieren_replace_data[1]))
	.pipe(replace(guaiwulieren_replace[2], guaiwulieren_replace_data[2]))	
	.pipe(rename('data-guaiwulieren-weapon-detail.html'))
    .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/'+guaiwulieren_plugin_weapon));
});

gulp.task('guaiwulieren_clean', function(){
	return gulp.src('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('guaiwulieren_android', ['guaiwulieren_clean'], function(){
	gulp.start('guaiwulieren_images','guaiwulieren_json','guaiwulieren_css', 'guaiwulieren_js', 'guaiwulieren_data');
});

gulp.task('guaiwulieren_ios_inner', ['guaiwulieren_clean'], function(){
	gulp.start('guaiwulieren_images','guaiwulieren_json','guaiwulieren_css', 'guaiwulieren_js', 'guaiwulieren_data');
});

gulp.task('guaiwulieren_ios', function(){
	guaiwulieren_platform = 'ios';
	gulp.start('guaiwulieren_ios_inner');
});

//我的世界
var myworld_gameid = 109;
var myworld_plugin_hechengbiao = "plugin_1252";
var myworld_plugin_zhibo = "plugin_1253";
var myworld_path = '../';
var myworld_replace = ['css/', 'js/', 'json/'];
var myworld_replace_data =  ['css/', 'js/', 'json/'];
var myworld_platform = 'android';


gulp.task('myworld_images', function(){
    gulp.src('./images/myworld/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/images/myworld'));
	if(myworld_platform == 'android'){
		gulp.src('./images/.nomedia', {buffer: false})
	        .pipe(gulp.dest('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/images/'));
    }
});

gulp.task('myworld_css', function(){
    gulp.src(['./css/data-myworld.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/css'));
});

gulp.task('myworld_js', function(){
    gulp.src(['./js/jquery-2.1.4.min.js','./js/data-myworld-hechengbiao.js'])
        .pipe(concat('data-myworld-hechengbiao.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+myworld_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/js'));
});

// gulp.task('guaiwulieren_json', function(){
//     gulp.src(['./json/json-guaiwulieren.js', './json/json-guaiwulieren.js'], {buffer: false})
//         .pipe(gulp.dest('../../chajian/'+guaiwulieren_gameid+'/'+guaiwulieren_platform+'/DataPlugin/json'));
// });

gulp.task('myworld_data', function(){
	if(myworld_platform == 'android'){
		for(var i=0; i<myworld_replace.length; i++){
			myworld_replace_data[i] = myworld_path + myworld_replace[i];
		}
	}
	
    gulp.src('data-myworld-hechengbiao.html')
		.pipe(merge({
            'js/data-myworld-hechengbiao.min.js':['js/jquery-2.1.4.min.js','js/data-myworld-hechengbiao.js']
        }))
		.pipe(replace(myworld_replace[0], myworld_replace_data[0]))
		.pipe(replace(myworld_replace[1], myworld_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/'+myworld_plugin_hechengbiao));

    

    gulp.src('data-myworld-biao-details.html')
	.pipe(merge({
        'js/data-myworld-hechengbiao.min.js':['js/jquery-2.1.4.min.js','js/data-myworld-hechengbiao.js']
    }))
	.pipe(replace(myworld_replace[0], myworld_replace_data[0]))
	.pipe(replace(myworld_replace[1], myworld_replace_data[1]))	
	.pipe(rename('data-myworld-biao-details.html'))
    .pipe(gulp.dest('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/'+myworld_plugin_hechengbiao));

    gulp.src('data-myworld-zhibo.html')
	.pipe(merge({
        'js/data-myworld-hechengbiao.min.js':['js/jquery-2.1.4.min.js','js/data-myworld-hechengbiao.js']
    }))
	.pipe(replace(myworld_replace[0], myworld_replace_data[0]))
	.pipe(replace(myworld_replace[1], myworld_replace_data[1]))	
	.pipe(rename('index.html'))
    .pipe(gulp.dest('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/'+myworld_plugin_zhibo));
});

gulp.task('myworld_clean', function(){
	return gulp.src('../../chajian/'+myworld_gameid+'/'+myworld_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('myworld_android', ['myworld_clean'], function(){
	gulp.start('myworld_images','myworld_css', 'myworld_js', 'myworld_data');
});

gulp.task('myworld_ios_inner', ['myworld_clean'], function(){
	gulp.start('myworld_images','myworld_css', 'myworld_js', 'myworld_data');
});

gulp.task('myworld_ios', function(){
	myworld_platform = 'ios';
	gulp.start('myworld_ios_inner');
});

//守望先锋
var shouwangxianfeng_gameid = 111;
var shouwangxianfeng_plugin_hero = "plugin_1307";
var shouwangxianfeng_path = '../';
var shouwangxianfeng_replace = ['css/', 'js/', 'json/'];
var shouwangxianfeng_replace_data =  ['css/', 'js/', 'json/'];	
var shouwangxianfeng_platform = 'android';

gulp.task('shouwangxianfeng_images', function(){
    gulp.src('./images/shouwangxianfeng/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/images/shouwangxianfeng/'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/images/'));
});

gulp.task('shouwangxianfeng_css', function(){
    gulp.src(['./css/data-shouwangxianfeng.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/css/'));
});

gulp.task('shouwangxianfeng_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-shouwangxianfeng-hero.js'])
        .pipe(concat('data-shouwangxianfeng-hero.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+shouwangxianfeng_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/js/'));
});

gulp.task('shouwangxianfeng_json', function(){
    gulp.src('./json/json-shouwangxianfeng.js', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/json/'));
});

gulp.task('shouwangxianfeng_data', function(){
	if(shouwangxianfeng_platform == 'android'){
		for(var i=0; i<shouwangxianfeng_replace.length; i++){
			shouwangxianfeng_replace_data[i] = shouwangxianfeng_path + shouwangxianfeng_replace[i];
		}
	}
	
    gulp.src('data-shouwangxianfeng-hero.html')
		.pipe(merge({
            'js/data-shouwangxianfeng-hero.min.js':['js/jquery-2.1.4.min.js','js/data-shouwangxianfeng-hero.js']
        }))
		.pipe(replace(shouwangxianfeng_replace[0], shouwangxianfeng_replace_data[0]))
		.pipe(replace(shouwangxianfeng_replace[1], shouwangxianfeng_replace_data[1]))
		.pipe(replace(shouwangxianfeng_replace[2], shouwangxianfeng_replace_data[2]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/'+shouwangxianfeng_plugin_hero));

    gulp.src('data-shouwangxianfeng-hero-detail.html')
		.pipe(merge({
            'js/data-shouwangxianfeng-hero.min.js':['js/jquery-2.1.4.min.js','js/data-shouwangxianfeng-hero.js']
        }))
		.pipe(replace(shouwangxianfeng_replace[0], shouwangxianfeng_replace_data[0]))
		.pipe(replace(shouwangxianfeng_replace[1], shouwangxianfeng_replace_data[1]))
		.pipe(replace(shouwangxianfeng_replace[2], shouwangxianfeng_replace_data[2]))
        .pipe(gulp.dest('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/'+shouwangxianfeng_plugin_hero));
		
	   
});

gulp.task('shouwangxianfeng_clean', function(){
	return gulp.src('../../chajian/'+shouwangxianfeng_gameid+'/'+shouwangxianfeng_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('shouwangxianfeng_android', ['shouwangxianfeng_clean'], function(){
	gulp.start('shouwangxianfeng_images','shouwangxianfeng_json','shouwangxianfeng_css', 'shouwangxianfeng_js', 'shouwangxianfeng_data');
});

gulp.task('shouwangxianfeng_ios_inner', ['shouwangxianfeng_clean'], function(){
	gulp.start('shouwangxianfeng_images','shouwangxianfeng_json','shouwangxianfeng_css', 'shouwangxianfeng_js', 'shouwangxianfeng_data');
});

gulp.task('shouwangxianfeng_ios', function(){
	shouwangxianfeng_platform = 'ios';
	gulp.start('shouwangxianfeng_ios_inner');
});

//球球大作战112
var qiuqiudazuozhan_gameid = 112;
var qiuqiudazuozhan_plugin = "plugin_1372";
var qiuqiudazuozhan_path = '../';
var qiuqiudazuozhan_replace = ['css/', 'js/'];
var qiuqiudazuozhan_replace_data =  ['css/', 'js/'];
var qiuqiudazuozhan_platform = 'android';

/*gulp.task('vainglory_images', function(){
    gulp.src('./images/vainglory/**', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/vainglory'));
	
	gulp.src('./images/.nomedia', {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/images/'));
});*/

gulp.task('qiuqiudazuozhan_css', function(){
    gulp.src(['./css/data-qiuqiudazuozhan.css'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+qiuqiudazuozhan_gameid+'/'+qiuqiudazuozhan_platform+'/DataPlugin/css'));
});

gulp.task('qiuqiudazuozhan_js', function(){
    gulp.src(['./js/jquery-2.1.3.min.js','./js/data-qiuqiudazuozhan.js'])
        .pipe(concat('data-qiuqiudazuozhan.min.js'))
		.pipe(replace('platform:"web"', 'platform:"'+qiuqiudazuozhan_platform+'"'))
        .pipe(uglify())
        .pipe(gulp.dest('../../chajian/'+qiuqiudazuozhan_gameid+'/'+qiuqiudazuozhan_platform+'/DataPlugin/js'));
});

/*gulp.task('vainglory_json', function(){
    gulp.src(['./json/json-vainglory.js', './json/json-vainglory.js'], {buffer: false})
        .pipe(gulp.dest('../../chajian/'+vainglory_gameid+'/'+vainglory_platform+'/DataPlugin/json'));
});*/

gulp.task('qiuqiudazuozhan_data', function(){
	if(qiuqiudazuozhan_platform == 'android'){
		for(var i=0; i<qiuqiudazuozhan_replace.length; i++){
			qiuqiudazuozhan_replace_data[i] = qiuqiudazuozhan_path + qiuqiudazuozhan_replace[i];
		}
	}
	
    gulp.src('data-qiuqiudazuozhan.html')
		.pipe(merge({
            'js/data-qiuqiudazuozhan.min.js':['js/jquery-2.1.3.min.js','js/data-qiuqiudazuozhan.js']
        }))
		.pipe(replace(qiuqiudazuozhan_replace[0], qiuqiudazuozhan_replace_data[0]))
		.pipe(replace(qiuqiudazuozhan_replace[1], qiuqiudazuozhan_replace_data[1]))
		.pipe(rename('index.html'))
        .pipe(gulp.dest('../../chajian/'+qiuqiudazuozhan_gameid+'/'+qiuqiudazuozhan_platform+'/DataPlugin/'+qiuqiudazuozhan_plugin));
});

gulp.task('qiuqiudazuozhan_clean', function(){
	return gulp.src('../../chajian/'+qiuqiudazuozhan_gameid+'/'+qiuqiudazuozhan_platform+'/DataPlugin/*', {read: false})
	.pipe(clean({force: true}));
});

gulp.task('qiuqiudazuozhan_android', ['qiuqiudazuozhan_clean'], function(){
	gulp.start('qiuqiudazuozhan_css', 'qiuqiudazuozhan_js', 'qiuqiudazuozhan_data');
});

gulp.task('qiuqiudazuozhan_ios_inner', ['qiuqiudazuozhan_clean'], function(){
	gulp.start('qiuqiudazuozhan_css', 'qiuqiudazuozhan_js', 'qiuqiudazuozhan_data');
});

gulp.task('qiuqiudazuozhan_ios', function(){
	qiuqiudazuozhan_platform = 'ios';
	gulp.start('qiuqiudazuozhan_ios_inner');
});




