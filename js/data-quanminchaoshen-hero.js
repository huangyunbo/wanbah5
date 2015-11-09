(function(window){
	var QmcsHero = function(){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {
			platform:"web",
			plugin:"plugin_1101",//plugin_1101
			plugin_equip:"plugin_1103",
			url:"images/quanminchaoshen/",
			type:0,//英雄类别数组下标
			piece:{},//英雄单个详情object
			herodHeight:300,//默认距顶部高度
			danceTime:[]//清空生命力、攻击力/法强跳动时间
		};
		if(this.o.platform == "android"){
			this.o.url="../images/quanminchaoshen/";
		}
		this.init();
	};
	
	QmcsHero.prototype = {
		setBlur: function(){//模糊
			var $win = $(window),
				scrollTopH = 0,//滑动条的实时高度
				starScrollTopH = 0,
				h = this.o.herodHeight,
				blankH = h*0.2, //图片顶部的20%不模糊高度
				actualH = h*0.8, //实际需要模糊的80%高度
				blurOne = actualH/20, //再计算出20段，每段距离是多少
				blurValue = 0,//模糊的值
				dom = $("#herod_bg"),//模糊对象
				$baike = $("#baike"),//ios需要的定级遮罩层
				$herod = $("#herod"),
				touchStarY,
				touchMoveY,
				starMarginTop,
				marginTop,
				leave = 0;
			
			function calcGaussblur(){//计算高斯模糊
				if(scrollTopH < blankH){
					dom.removeClass("last_blur").addClass("first_blur");
				}else if(scrollTopH >= h){
					dom.removeClass("first_blur").addClass("last_blur");
				}else if(scrollTopH >= blankH){
					dom.removeClass("first_blur last_blur");
					blurValue = (scrollTopH-blankH)/blurOne;
					dom.css({"-webkit-filter":"blur("+blurValue+"px)"});
				}
			}
			
			if(this.o.platform == "ios"){
				$baike.addClass("baike");
				$baike.on("touchstart", function(e){
					e.preventDefault();
					touchStarY = e.originalEvent.changedTouches[0].pageY;
					starMarginTop = parseInt($herod.css("margin-top"));
					starScrollTopH = $win.scrollTop();
				});
				$baike.on("touchmove", function(e){
					e.preventDefault();
					if(leave != 0) return;
					touchMoveY = e.originalEvent.changedTouches[0].pageY;
					marginTop = starMarginTop + (touchMoveY - touchStarY);//设置的距离=起始的点+滑动的距离
					
					if(marginTop >= h + starScrollTopH){//超出往下滑范围，禁止
						$herod.css("margin-top",h + starScrollTopH);
						scrollTopH = 0;
					}else{//往上滑(正常范围+超出往上滑范围)
						$herod.css("margin-top",marginTop);
						scrollTopH = h - marginTop + starScrollTopH;
					}
					calcGaussblur();
				});
				$baike.on("touchend", function(e){
					if(leave == 0 && marginTop <= 0){
						leave = 1;
						$herod.css("margin-top",h);
						$win.scrollTop(scrollTopH);
						$baike.removeClass("baike");
					}
				});
				
				$win.scroll(function(){
					scrollTopH = $win.scrollTop();
					if(leave == 1 && scrollTopH < h){//当进入顶部区域，只需要执行一次
						leave = 0;
						$baike.addClass("baike");
					}
					calcGaussblur();
				});
			}else{
				$win.scroll(function(){
					scrollTopH = $win.scrollTop();
					calcGaussblur();
				});
			}
		},
		setSlidebar: function(){//滑动条
			var that = this,
				$barlevel = $("#barlevel"),
				$bar = $("#bar"),
				$barhandle = $("#barhandle"),
				$thumb = $barhandle.children(),
				barW = $bar.width(),
				barhandleW = $barhandle.width(),
				barW_max = barW-barhandleW,
				touchMoveX,
				barO_l = $bar.offset().left,
				distanceX,
				paragraph = barW_max/10,
				level = 1;//初始化

			function slide(rangeX){
				var _level = Math.ceil(rangeX/paragraph);
				
				_level = _level == 0 ? 1 : _level;
				$barhandle.css({"left":rangeX+"px"});
				if(_level == level) return;//减少后面的调用
				clearInterval(that.o.danceTime[0]);//清空第1个跑数值跳动
				clearInterval(that.o.danceTime[1]);//清空第2个跑数值跳动
				level = _level;
				$("#barlevel").html(level);
				that.setFigure("no",level);
			}

			$thumb.on("touchstart", function(e){
				e.preventDefault();
			});
			$thumb.on("touchmove", function(e){
				e.preventDefault();
    			touchMoveX = e.originalEvent.changedTouches[0].pageX;
				distanceX = touchMoveX - barO_l;
				if(distanceX < 0){
					slide(0);
				}else if(distanceX > barW_max){
					slide(barW_max);
				}else{
					slide(distanceX);
				}
			});
		},
		setNumbersroll: function(){//数值跳动(生命值、攻击力/法强)
			var that = this,
				$win = $(window),
				scrollTopH,//滑动条的实时高度
				startTopH = $("#figure_lt").offset().top - that.o.herodHeight,//数值跳动从屏幕刚到开始跳动
				isDance = 0;

			startTopH = startTopH < 0 ? 0 : startTopH;
			function dance(element, millisec){
				var dom = $("."+element),
					num = Number(dom.attr("data-num")),
					i = 0,
					beat = function(){
						i++;
						if(num >= i){
							dom.html(i);
						}
					};
				
				that.o.danceTime.push(setInterval(beat, millisec));//拖动滑动条的时候需要立马清空
			}
			$win.scroll(function(){
				scrollTopH = $win.scrollTop();
				if(isDance == 0 && scrollTopH >= startTopH){//数值跳动
					isDance = 1;
					dance("num_green", 1);
					dance("num_red", 40);
				}
			});
		},
		setVideo: function(){
			var that = this,
				$skills_content = $("#skills_content"),
				v_width = $skills_content.width(),
				v_height = parseInt(v_width/320*189),
				video,
				player;

			$skills_content.children().each(function(index, element){
                if(index <= 2){//只有前3个主动技能有视频
					var self = $(element).children(".video"),
						videoid = self.attr("data-id");

					video = new tvp.VideoInfo();
					video.setVid(videoid);//视频vid
					player = new tvp.Player(v_width, v_height);//视频宽高
					player.setCurVideo(video);
					player.addParam("autoplay", "0");//是否自动播放，1为自动播放，0为不自动播放
					player.addParam("player", "html5");//设置html5
					player.addParam("pic", that.o.url+"video_default.png");//默认图片地址
					player.addParam("showend",0);//结束是该视频本身结束
					//player.addParam("wmode","opaque");//flash才用到
					//player.addParam("flashskin", "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");//是否调用精简皮肤，不使用则删掉此行代码
					player.write("videocon"+index);//elementId
				}
            });			
		},
		setHerodtop: function(){//初始设置英雄详情的高度
			var win_h = $(window).height(),
				head_h = $("#herod_head").height(),
				h = 0;
			
			if(win_h >= 400){
				h = win_h - head_h;
			}else{
				h = 300;
			}
			if(this.o.platform != "ios"){
				$("#herod_bg").css("top",45);
			}
			this.o.herodHeight = h;
			$("#herod").css("margin-top",h);
		},
		setFigure: function(isstart,level){//设置英雄等级数值数据
			var type = this.o.type,
				piece = this.o.piece,
				html_figure_lt = '',
				html_figure_other = '',
				html_figure_lb = '',
				level = level === 1 ? 0 : level-1;
			
			if($.isEmptyObject(piece)) return;
			
			if(isstart === 1){//第一次的时候需要从0开始数值跳动
				html_figure_lt = '<div class="num num_green" data-num="'+piece.figure.shengming[0]+'">0</div>';
			}else{
				html_figure_lt = '<div class="num num_green">'+(piece.figure.shengming[0]+level*piece.figure.shengming[1])+'</div>';
			}
			html_figure_lt += '<div class="k">生命值</div>'+
							 '<div class="v">每级增加'+piece.figure.shengming[1]+'</div>';
			
			if(type == 0 || type == 2){
				if(isstart === 1){//第一次的时候需要从0开始数值跳动
					html_figure_lb = '<div class="num num_red" data-num="'+piece.figure.gongji[0]+'">0</div>';
				}else{
					html_figure_lb = '<div class="num num_red">'+(piece.figure.gongji[0]+level*piece.figure.gongji[1])+'</div>';
				}
				html_figure_lb += '<div class="k">攻击力</div>'+
								  '<div class="v">每级增加'+piece.figure.gongji[1]+'</div>';
				html_figure_other = '<dl>'+
										'<dt>法术强度</dt><dd>'+(piece.figure.fashu[0]+level*piece.figure.fashu[1])+'(+'+piece.figure.fashu[1]+'每级)</dd>'+
									'</dl>';
			}else{
				if(isstart === 1){//第一次的时候需要从0开始数值跳动
					html_figure_lb = '<div class="num num_red" data-num="'+piece.figure.fashu[0]+'">0</div>';
				}else{
					html_figure_lb = '<div class="num num_red">'+(piece.figure.fashu[0]+level*piece.figure.fashu[1])+'</div>';
				}
				html_figure_lb += '<div class="k">法术强度</div>'+
								  '<div class="v">每级增加'+piece.figure.fashu[1]+'</div>';
				html_figure_other = '<dl>'+
										'<dt>攻击力</dt><dd>'+(piece.figure.gongji[0]+level*piece.figure.gongji[1])+'(+'+piece.figure.gongji[1]+'每级)</dd>'+
									'</dl>';
			}
			html_figure_other += '<dl>'+
									'<dt>护甲值</dt><dd>'+(piece.figure.hujia[0]+level*piece.figure.hujia[1])+'(+'+piece.figure.hujia[1]+'每级)</dd>'+
								'</dl>'+
								'<dl>'+
									'<dt>法术抗性</dt><dd>'+(piece.figure.fakang[0]+level*piece.figure.fakang[1])+'(+'+piece.figure.fakang[1]+'每级)</dd>'+
								'</dl>'+
								'<dl>'+
									'<dt>生命恢复/5s</dt><dd>'+(piece.figure.shenghui[0]+level*piece.figure.shenghui[1])+'(+'+piece.figure.shenghui[1]+'每级)</dd>'+
								'</dl>';
									
			$("#figure_lt").html(html_figure_lt);
			$("#figure_other").html(html_figure_other);
			$("#figure_lb").html(html_figure_lb);
		},
		setCircle: function(pieArray){//伤害 辅助 生存 上手			
			$("#labelvalue").children(".item").each(function(index, element){
				var $circle = $(this).children(".circle"),
					$num = $circle.children(".num"),
					pie = pieArray[index]*36,
					duration = 0;
					
				$num.html(pieArray[index]);
				if(index == 0){//每个挨着延迟500ms再动
					duration = 500;
				}else{
					duration = index*500+500;
				}

				if(pie > 180){//如果超过180度，先转右边的，到-135至45度就满180度，再转左边的
					$circle.children(".r").children("i").delay(duration).animate({
						"backgroundPosition": 45
					},{
						duration: 500,
						step: function(now,tween){
							$(this).css('-webkit-transform','rotate('+now+'deg)');
						},
						done: function(){
							var pie_over = pie-180;
							$circle.children(".l").children("i").animate({
								"backgroundPosition": -135+pie_over
							},{
								duration: 500,
								step: function(now,tween){
									$(this).css('-webkit-transform','rotate('+now+'deg)');
								}
							});
						}
					});
				}else{//如果小于等于180度，就只转右边，从-135度也就是0度开始
					$circle.children(".r").children("i").delay(duration).animate({
						"backgroundPosition": -135+pie
					},{
						duration: 1000,
						step: function(now,tween){
							$(this).css('-webkit-transform','rotate('+now+'deg)');
						}
					});
				}
			});
		},
		printHerodetail: function(){//打印英雄详情
			var id = Number(this.getsession("wbgl-quanminchaoshen-hero-id")),
				type = this.o.type,
				piece,
				html_herod_head_tit ='',
				html_herod_head_label = '',
				html_equipchoice = '',
				html_addskill = '',
				html_skills_head = '',
				html_skills_content = '',
				html_zuanshi = '',
				html_getsuipian = '';
			
			for(var i=0; i<this.data[type].data.length; i++){
				if(this.data[type].data[i].id == id){
					piece = this.data[type].data[i];
					this.o.piece = piece;
					break;
				}
			}
			
			if(piece === undefined) return;
			
			$("#herod_bg").attr("src",this.o.url+"DBPic/d_"+id+".jpg");//大背景图片
			
			html_herod_head_tit = piece.title + '-' + piece.name + '<div>' + piece.pos + '</div>';
			$("#herod_head").children(".tit").html(html_herod_head_tit);//称号+名字+定位
			
			for(var i=0; i<piece.label.length; i++){
				html_herod_head_label += '<span>'+piece.label[i]+'</span>';
			}
			$("#herod_head").children(".label").html(html_herod_head_label);//标签
			
			this.setCircle(piece.pie);//绘制圆形进度条

			$("#herod_head").children("p").html(piece.aword);//描述
			
			$("#groom").html(piece.groom);//推荐玩法
			
			for(var i=0; i<piece.equip.length; i++){
				html_equipchoice += '<li><img src="'+this.o.url+'equip/'+piece.equip[i]+'.png"></li>';
			}
			$("#equipchoice").html(html_equipchoice);//装备选择
			
			for(var i=0; i<piece.addskill.length; i++){
				html_addskill += '<li><img src="'+this.o.url+'skillPic/skill'+piece.id+'_'+piece.addskill[i]+'.png"></li>';
			}
			$("#addskill").html(html_addskill);//加点路线
			
			$("#graphical").children("li").each(function(index){//英雄数据
				$(this).find(".star").addClass("star"+piece.graphical[index]);
			});
			
			this.setFigure(1,1);//第一次设置英雄等级数值数据
			
			for(var i=0; i<piece.sname.length; i++){//英雄技能
				html_skills_head += '<li>'+
										'<div><img src="'+this.o.url+'skillPic/skill'+piece.id+'_'+(i+1)+'.png"></div>'+
									'</li>';
				
				html_skills_content += '<div class="item">'+
											'<div class="key">'+
												'<div class="name">'+piece.sname[i]+'</div>'+
												'<p>'+piece.sdesc[i]+'</p>'+
											'</div>'+
											'<div class="desc">'+
												piece.sintro[i]+
											'</div>';

				if(i != piece.sname.length-1){//视频只有前3个
					html_skills_content += '<div class="video" id="videocon'+i+'" data-id="'+piece.svideo[i]+'"></div>';
				}

				html_skills_content += '</div>';
			}
			$("#skills_head").html(html_skills_head);
			$("#skills_content").html(html_skills_content);
			
			
			$("#suipian").html(piece.suipian);//获得途径			
			for(var i=0; i<piece.getsuipian.length; i++){
				html_getsuipian += '<label>'+piece.getsuipian[i]+'</label>';
			}
			$("#suipian").parent().after(html_getsuipian);
			
			if(piece.zuanshi == -1){
				html_zuanshi = '暂时不卖';
			}else{
				html_zuanshi = '<i class="icon_zuanshi"></i>x<code>'+piece.zuanshi+'</code>';
			}
			$("#zuanshi").html(html_zuanshi);
			
			$("#story").html(piece.story);//英雄故事
			
		},
		htmlHerodetail: function(){//英雄详情
			var that = this;

			that.o.type = Number(that.getsession("wbgl-quanminchaoshen-hero-type"));
			that.printHerodetail();
			that.setHerodtop();
			that.setVideo();//英雄技能视频
			
			$("#question").click(function(){
				$("#tips").toggleClass("hide");
			});
			$("#skills_head").on("click", "li",function(){
				var _index = $(this).parents().children().index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				$("#skills_content").children().siblings().removeClass("on").eq(_index).addClass("on");
				
			}).children("li").eq(0).trigger("click");
			
			that.setBlur();//模糊
			that.setNumbersroll();//数值跳动
			that.setSlidebar();//滑动条
		},
		printIndex: function(){//打印英雄列表
			var piece,
				html_head = '',
				html_content = '',
				html_content_temp = '',
				html_content_all = '';
			
			for(var i=0; i<this.data.length; i++){
				if(i == 0){
					html_head += '<div class="item">全部</div>';
				}
				html_head += '<div class="item">'+this.data[i].tname+'</div>';
				html_content += '<ul>';
				html_content_temp = '';
				for(var j=0; j<this.data[i].data.length; j++){
					piece = this.data[i].data[j];
					html_content_temp += '<li data-id="'+piece.id+'" data-type="'+i+'"><img src="'+this.o.url+'DBPic/'+piece.id+'.jpg" alt="'+piece.title+'"><p>'+piece.title+'</p></li>';
					
				}
				html_content += html_content_temp;
				html_content_all += html_content_temp;
				html_content += '</ul>';
			}
			
			html_content_all = '<ul>' + html_content_all + '</ul>' + html_content;
			
			$("#herolist_head").html(html_head);
			$("#herolist_content").html(html_content_all);
		},
		htmlIndex: function(){//英雄列表
			var that = this,
				$herolist_head = $("#herolist_head"),
				$herolist_content = $("#herolist_content"),
				tindex = Number(that.getsession("wbgl-quanminchaoshen-hero-tindex"));
			
			that.printIndex();
			
			$herolist_head.on("click", ".item", function(){
				tindex = $herolist_head.children().index(this);
				that.setsession("wbgl-quanminchaoshen-hero-tindex",tindex);
				$herolist_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$herolist_content.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(tindex).trigger("click");
			
			$herolist_content.on("click", "li", function(){
				var _id = Number($(this).attr("data-id")),
					_herotype = Number($(this).attr("data-type"));
				
				that.setsession("wbgl-quanminchaoshen-hero-id",_id);
				that.setsession("wbgl-quanminchaoshen-hero-type",_herotype);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-quanminchaoshen-hero-detail.html';
				}else{
					location.href = 'data-quanminchaoshen-hero-detail.html';
				}
			});
		},
		getsession: function(){
			var sessionname = arguments[0];
			if(this.o.platform == "ios"){
				return this.cookie(sessionname);
			}else{
				return sessionStorage.getItem(sessionname);
			}
		},
		setsession: function(){
			var sessionname = arguments[0],
			sessionvalue = arguments[1];
			if(this.o.platform == "ios"){
				this.cookie(sessionname,sessionvalue);
			}else{
				sessionStorage.setItem(sessionname, sessionvalue);
			}
		},
		cookie: function(name, value, options){
			if(typeof value != 'undefined'){// name and value given, set cookie
				options = options || {};
				if(value === null){
					value = '';
					options.expires = -1;
				}
				var expires = '';
				if(options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if(typeof options.expires == 'number') {
						date = new Date();
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					}else{
						date = options.expires;
					}
					expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
				}
				// CAUTION: Needed to parenthesize options.path and options.domain
				// in the following expressions, otherwise they evaluate to undefined
				// in the packed version for some reason...
				var path = options.path ? '; path=' + (options.path) : '';
				var domain = options.domain ? '; domain=' + (options.domain) : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
			}else{ // only name given, get cookie
				var cookieValue = null;
				if(document.cookie && document.cookie != ''){
					var cookies = document.cookie.split(';');
					for(var i = 0; i < cookies.length; i++){
						var cookie = jQuery.trim(cookies[i]);
						// Does this cookie string begin with the name we want?
						if(cookie.substring(0, name.length + 1) == (name + '=')){
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}
		},
		checkversion: function(){//检查版本
			if(!window.localStorage){
				alert("错误，你的版本过低，请升级你的设备");
				return false;
			}
			if(this.o.platform == "android"){
				try{
					window.jstojava.getHostVersion();
				}catch(err){
					alert("错误，请升级Android玩吧专业版2.5以上");
					return false;
				}
			}
			return true;
		},
		isplatform: function(i){//判断打包平台显示相应内容
			function removehide(){
				$("#header").removeClass("hide");
			}
			
			switch(i){
				case "index":
					if(this.o.platform == "web"){
						removehide();
						this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
					}else if(this.o.platform == "android"){
						removehide();
						this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}else if(this.o.platform == "ios"){
						$("#herolist").addClass("mt_0");
					}
				break;
				case "herodetail":
					if(this.o.platform == "web"){
						removehide();
						if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href","data-quanminchaoshen-equip-detail.html");
						}
					}else if(this.o.platform == "android"){
						removehide();
						if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href",'../'+this.o.plugin_equip+'/data-quanminchaoshen-equip-detail.html');
						}else{
							$("#header").children(".back").attr("href","index.html");
						}
					}
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;
			var href = $("body").attr("data-url");			
			switch(true){
				case (href == "index.html"):
					this.isplatform("index");
					this.htmlIndex();
					break;
				case (href == "herodetail.html"):
					this.isplatform("herodetail");
					this.htmlHerodetail();
					break;
			}
		},
		init: function(){			
			this.ispage();
		}
	}
	
	window.QmcsHero = QmcsHero;
})(window);


/*
第1数组 战士
第2数组 法师
第3数组 肉盾
第4数组 辅助


[{"tid":1,"tname":"战士","data":[{"id":1,"title":"精灵女神",name:"狄安娜","pos":"近战 肉盾 攻击型","label":["治疗","辅助","AOE2"],"pie":[3,9,2,5],"aword":"具备高伤害的远程战士，攻击范围远且上手难度低","groom":"让他的普通攻击获得了吸血效果的加成，配合技能撕裂的被动，让他在打野的时候可以做到几乎无损耗!迅速的清野效果加上技能扑击的范围性眩晕。","equip":[1,2,3,4,5,6],"addskill":[1,2,3,4,1,2,3,4,1,2],"graphical":[1,2,3,10],"figure":{"shengming":[645,2],"gongji":[64,4],"fashu":[5,6],"hujia":[7,8],"fakang":[9,10],"shenghui":[11,12]},"sname":["虚拟一击1","虚拟一击2","虚拟一击3","虚拟一击4"],"sdesc":["每当...","每当...","每当...","每当..."],"sintro":["技能描述朵朵","技能描述朵朵","技能描述朵朵","技能描述朵朵"],"svideo":[],"suipian":18,"zuanshi":-1,"getsuipian":["挑战模式3","闯关模式"],"story":"故事..."}]}];
*/
