(function(window){
	var WzryHero = function(){
		if(arguments[0] === undefined) return false;
		this.mData = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.data = this.mData.data_hero;	
		this.data_equip = this.mData.data_equip;	
		this.o = {
			platform:"web",
			plugin:"plugin_1101",//plugin_1101
			plugin_equip:"plugin_1103",
			url:"images/wangzherongyao/",
			type:0,//英雄类别数组下标
			piece:{},//英雄单个详情object
			herodHeight:300,//默认距顶部高度
			numDance:[]//[{k:element,v:time}]需要清空数值跳动time
		};
		if(this.o.platform == "android"){
			this.o.url="../images/wangzherongyao/";
		}
		this.init();
	};
	
	WzryHero.prototype = {

		setHerodtop: function(){//初始设置英雄详情的高度
			var win_h = $(window).height(),
				head_h = $("#herod_head").outerHeight(true),
				img = new Image(),
				img_h = 0,
				h = 0;
			
			img.onload = function(){
				img_h = $("#herod_bg").height();
				if(win_h - head_h > img_h) return;
				h = img_h + head_h - win_h;					
				$("#herod").css("margin-top",-h);
				$("#herod_bg").prev().css("height",h);
			}
			img.src = $("#herod_bg").attr("src");		
		},

		
		// setSlidebar: function(){//滑动条
		// 	var that = this,
		// 		$barlevel = $("#barlevel"),
		// 		$bar = $("#bar"),
		// 		$barhandle = $("#barhandle"),
		// 		$thumb = $barhandle.children(),
		// 		barW = $bar.width(),
		// 		barhandleW = $barhandle.width(),
		// 		barW_max = barW-barhandleW,
		// 		barhandleM = barhandleW/2,
		// 		touchMoveX,
		// 		barO_l = $bar.offset().left,
		// 		distanceX,
		// 		paragraph = barW_max/10,
		// 		level = 1;//初始化

		// 	function slide(rangeX){
		// 		var _level = Math.ceil(rangeX/paragraph);
				
		// 		_level = _level == 0 ? 1 : _level;
		// 		$barhandle.css({"left":rangeX+"px"});
		// 		if(_level == level) return;//减少后面的调用
		// 		clearInterval(that.o.numDance[0].v);//清空第1个跑数值跳动
		// 		clearInterval(that.o.numDance[1].v);//清空第2个跑数值跳动
		// 		level = _level;
		// 		$("#barlevel").html(level);
		// 		that.setFigure("no",level);
		// 	}

		// 	$thumb.on("touchstart", function(e){
		// 		e.preventDefault();
		// 	});
		// 	$thumb.on("touchmove", function(e){
		// 		e.preventDefault();
  //   			touchMoveX = e.originalEvent.changedTouches[0].pageX-barhandleM;
		// 		distanceX = touchMoveX - barO_l;
		// 		if(distanceX < 0){
		// 			slide(0);
		// 		}else if(distanceX > barW_max){
		// 			slide(barW_max);
		// 		}else{
		// 			slide(distanceX);
		// 		}
		// 	});
		// },
		setNumbersroll: function(){//数值跳动(生命值、攻击力/法强)
			var that = this,
				$win = $(window),
				scrollTopH,//滑动条的实时高度
				startTopH = $("#figure_lt").offset().top - that.o.herodHeight,//数字距顶部的距离-英雄名字距顶部的距离 = 每次滚动到数字距离屏幕跟英雄在第一次屏幕高度一样的距离处
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
						}else{
							for(var j=0; j<that.o.numDance.length; j++){
								if(element == that.o.numDance[j].k){
									clearInterval(that.o.numDance[j].v);//清空数值跳动
									break;
								}
							}
						}
					};
				that.o.numDance.push({k:element,v:setInterval(beat, millisec)});//拖动滑动条的时候以及跑完的时候需要立马清空
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
				$hero_video = $("#video"),
				v_width = $hero_video.width(),
				v_height = parseInt(v_width/320*189),
				video,
				player;		
                
				var	videoid = $hero_video.attr("data-id");
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
					player.write("video");//elementId
						
		},		
		setFigure: function(isstart,level){//设置英雄等级数值数据
			var type = this.o.type,
				piece = this.o.piece,
				html_figure_lt = '',
				html_figure_other = '',
				html_figure_lb = '',
				level = level === 1 ? 0 : level-1;			
						
			if($.isEmptyObject(piece)) return;

			html_figure_lt = '<div class="num num_green" data-num="'+piece.figure.shengming[0]+'"></div>';
			html_figure_lt += '<div class="k">生命值</div>';

			html_figure_lb = '<div class="num num_red" data-num="'+piece.figure.gongji[0]+'"></div>';
			html_figure_lb += '<div class="k">攻击力</div>';

			html_figure_other +='<dl>'+
									'<dt>法术强度</dt><dd>'+piece.figure.fashu[0]+'</dd>'+
								'</dl>'+	 
								'<dl>'+
									'<dt>物理防御</dt><dd>'+(piece.figure.wufang[0]+level*piece.figure.wufang[1])+'(+'+piece.figure.wufang[1]+'%)</dd>'+
								'</dl>'+
								'<dl>'+
									'<dt>法术防御</dt><dd>'+(piece.figure.mokang[0]+level*piece.figure.mokang[1])+'(+'+piece.figure.mokang[1]+'%)</dd>'+
								'</dl>'+								
								'<dl>'+
									'<dt>移速</dt><dd>'+piece.figure.yidong[0]+'</dd>'+
								'</dl>';			
			// if(isstart === 1){//第一次的时候需要从0开始数值跳动
			// 	html_figure_lt = '<div class="num num_green" data-num="'+piece.figure.shengming[0]+'"></div>';
			// }else{
			// 	// html_figure_lt = '<div class="num num_green">'+(piece.figure.shengming[0]+level*piece.figure.shengming[1])+'</div>';
			// }
			// html_figure_lt += '<div class="k">生命值</div>';
			
			
			// if(type == 0 || type == 2){
			// 	if(isstart === 1){//第一次的时候需要从0开始数值跳动
			// 		html_figure_lb = '<div class="num num_red" data-num="'+piece.figure.gongji[0]+'"></div>';
			// 	}else{
			// 		html_figure_lb = '<div class="num num_red">'+(piece.figure.gongji[0]+level*piece.figure.gongji[1])+'</div>';
			// 	}
			// 	html_figure_lb += '<div class="k">攻击力</div>';
			// 	html_figure_other = '<dl>'+
			// 							'<dt>法术强度</dt><dd>'+piece.figure.fashu[0]+'</dd>'+
			// 						'</dl>';
			// }else{
			// 	if(isstart === 1){//第一次的时候需要从0开始数值跳动
			// 		html_figure_lb = '<div class="num num_red" data-num="'+piece.figure.fashu[0]+'"></div>';
			// 	}else{
			// 		html_figure_lb = '<div class="num num_red">'+(piece.figure.fashu[0]+level*piece.figure.fashu[1])+'</div>';
			// 	}
			// 	// html_figure_lb += '<div class="k">法术强度</div>'+piece.figure.fashu[0]+'</div>';
			// 	html_figure_other = '<dl>'+
			// 							'<dt>攻击力</dt><dd>'+piece.figure.gongji[0]+'</dd>'+
			// 						'</dl>';
			// }
			// html_figure_other += '<dl>'+
			// 						'<dt>物理防御</dt><dd>'+(piece.figure.wufang[0]+level*piece.figure.wufang[1])+'(+'+piece.figure.wufang[1]+'%)</dd>'+
			// 					'</dl>'+
			// 					'<dl>'+
			// 						'<dt>法术防御</dt><dd>'+(piece.figure.mokang[0]+level*piece.figure.mokang[1])+'(+'+piece.figure.mokang[1]+'%)</dd>'+
			// 					'</dl>'+								
			// 					'<dl>'+
			// 						'<dt>移速</dt><dd>'+piece.figure.yidong[0]+'</dd>'+
			// 					'</dl>';
									
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
		printHerodetail: function(id){//打印英雄详情
			var type = this.o.type,
				piece,
				html_herod_head_tit ='',
				html_herod_head_label = '',
				html_equipchoice = '',
				html_equipchoice_head = '',
				html_equipchoice_content = '',
				html_addskill = '',
				html_skills_head = '',
				html_skills_content = '',
				html_access='',
				html_jinbi = '',
				html_dianjuan = '',
				html_j_d_all='';
			
			for(var i=0; i<this.data[type].data.length; i++){
				if(this.data[type].data[i].id == id){
					piece = this.data[type].data[i];	
					this.o.piece = piece;							
					break;
				}
			}

			if(piece === undefined) return;			
			
			$("#herod_bg").attr("src",this.o.url+"dbpic/d_"+id+".jpg");//大背景图片
			
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
				
				var choice_equip='';
				html_equipchoice_head += '<li><img src="'+this.o.url+'equip/'+piece.equip[i]+'.png"></li>';					
				function equiplabel(){
							var _html = '';
							for(var i=0; i<choice_equip.label.length; i++){
								_html += '<span>'+choice_equip.label[i]+'</span>';
							}							
							return _html;
						}			
				for(var j=0; j<this.data_equip.length; j++){						
						
						for(var n=0;n<this.data_equip[j].data.length;n++){

							if(piece.equip[i] == this.data_equip[j].data[n].id){
								choice_equip = this.data_equip[j].data[n];								
								html_equipchoice_content += '<div class="item"><div>'+
									'<span class="polygon"><i></i>'+
									'</span>'+
					                '<span class="equip_name media_fs_14">'+choice_equip.name+
					                '</span>'+
					                '<label class="price ">售价: '+choice_equip.price+
					                '</label>'+
					                '</div>'+
					                '<div class="ml_16 label">'+
					               		equiplabel()+
					                '</div>'+
					                '<div class="ml_16 media_fs_14">'+
					                	choice_equip.prop+
					                '</div></div>';
						}
					}
				}  
				
				
			}		
			
			$("#equipchoice").html(html_equipchoice_head);//装备选择
			$("#equipchoice_content").html(html_equipchoice_content);//装备选择		
			
			// for(var i=0; i<piece.equip.length; i++){
			// 	html_equipchoice += '<li><img src="'+this.o.url+'equip/'+piece.equip[i]+'.png"></li>';
			// }
			// $("#equipchoice").html(html_equipchoice);//装备选择
			
			for(var i=0; i<piece.addskill.length; i++){
				html_addskill += '<li><img src="'+this.o.url+'skill/'+id+'_'+piece.addskill[i]+'.png"></li>';
			}
			$("#addskill").html(html_addskill);//加点路线
			
			$("#graphical").children("li").each(function(index){//英雄数据
				$(this).find(".star").addClass("star"+piece.graphical[index]);
			});
			
			this.setFigure(1,1);//第一次设置英雄等级数值数据
			
			for(var i=0; i<piece.sname.length; i++){//英雄技能
				html_skills_head += '<li>'+
										'<div><img src="'+this.o.url+'skill/'+id+'_'+(i+1)+'.png"></div>'+
									'</li>';
				
				html_skills_content += '<div class="item">'+
											'<div class="key">'+
												'<div class="name">'+piece.sname[i]+'</div>'+
												'<p>'+piece.sdesc[i]+'</p>'+
											'</div>'+
											'<div class="desc">'+
												piece.sintro[i]+
											'</div>';

				// if(i != piece.sname.length-1){//视频只有前3个
				// 	html_skills_content += '<div class="video" id="videocon'+i+'" data-id="'+piece.svideo[i]+'"></div>';
				// }

				html_skills_content += '</div>';
			}
			$("#skills_head").html(html_skills_head);
			$("#skills_content").html(html_skills_content);
			
			$("#suipian").html(piece.suipian);//获得途径			
			for(var i=0; i<piece.getsuipian.length; i++){
				html_access += '<div class="d_label"><label>'+piece.getsuipian[i]+'</label></div>';
			}
		
			if(piece.suipian>0){
				html_jinbi +='<div class="item">'+
				'<div>'+
				'<em>所需金币</em>'+
				'<i class="icon_suipian"></i>x<code id="suipian">'+piece.suipian+'</code>'+
				'</div>'+
				'</div>'; 
			}
			if(piece.zuanshi>0){
				html_dianjuan +='<div class="item">'+
				'<div>'+
				'<em>所需点卷</em>'+
				'<i class="icon_zuanshi"></i>x<code id="suipian">'+piece.zuanshi+'</code>'+
				'</div>'+
				'</div>'; 
			}
			html_j_d_all = '<div class="content">'+html_jinbi+html_dianjuan+'</div>';
			$("#access").html('<h2 class="herod_h2">获得途径</h2>'+html_access+html_j_d_all);

			$("#hero_video").html('<h2 class="herod_h2">英雄解说教学</h2><div class="video" id="video" data-id="'+piece.svideo+'"></div>')					
			
			$("#story").html(piece.story);//英雄故事
			
		},
		htmlHerodetail: function(){//英雄详情
			var that = this,
				id = Number(this.getsession("wbgl-wangzherongyao-hero-id")),
				isequip2hero = 0;
			
			if(that.getsession("wbgl-wangzherongyao-equip2hero") == "y"){//如果是从装备跳转过来的，则没有hero-type
				for(var i=0; i<that.data.length; i++){
					if(isequip2hero == 0){//找到了就别循环了
						for(var j=0; j<that.data[i].data.length; j++){
							if(that.data[i].data[j].id == id){
								that.o.type = i;
								isequip2hero = 1;
								break;
							}
						}
					}
				}
			}else{
				that.o.type = Number(that.getsession("wbgl-wangzherongyao-hero-type"));
			}
			that.printHerodetail(id);			
			that.setVideo();//英雄技能视频
			
			$("#question").click(function(){
				$("#tips").toggleClass("hide");
			});
			$("#skills_head").on("click", "li",function(){
				var _index = $(this).parents().children().index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				$("#skills_content").children().siblings().removeClass("on").eq(_index).addClass("on");
				
			}).children("li").eq(0).trigger("click");

			//装备选择点击
			$("#equipchoice_head").on("click", "li",function(){
				var self = this,
					$self = $(self),
					$equipchoice_head_children = $self.parents().children(),
					_index = $equipchoice_head_children.index(self);
				
				if($self.hasClass("on")){
					$equipchoice_head_children.eq(_index).removeClass("on");
					$("#equipchoice_content").children().eq(_index).removeClass("on");
				}else{
					$equipchoice_head_children.eq(_index).addClass("on").siblings().removeClass("on");
					$("#equipchoice_content").children().eq(_index).addClass("on").siblings().removeClass("on");
				}	
			});
			
			
			that.setNumbersroll();//数值跳动
			that.setHerodtop();//设置顶部图片高度
			// that.setSlidebar();//滑动条
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
					html_content_temp += '<li data-id="'+piece.id+'" data-type="'+i+'"><img src="'+this.o.url+'dbpic/'+piece.id+'.png" alt="'+piece.title+'"><p>'+piece.title+'</p></li>';
					
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
				tindex = Number(that.getsession("wbgl-wangzherongyao-hero-tindex"));
			
			that.printIndex();
			
			$herolist_head.on("click", ".item", function(){
				tindex = $herolist_head.children().index(this);
				that.setsession("wbgl-wangzherongyao-hero-tindex",tindex);
				$herolist_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$herolist_content.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(tindex).trigger("click");
			
			$herolist_content.on("click", "li", function(){
				var _id = Number($(this).attr("data-id")),
					_herotype = Number($(this).attr("data-type"));
				
				that.setsession("wbgl-wangzherongyao-hero-id",_id);
				that.setsession("wbgl-wangzherongyao-hero-type",_herotype);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-wangzherongyao-hero-detail.html';
				}else{
					location.href = 'data-wangzherongyao-hero-detail.html';
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

			function unios(){				
				$("#herod_bg").addClass("mt_44");
			}
			
			switch(i){
				case "index":
					if(this.o.platform == "web"){
						unios();
						removehide();
						this.setsession("wbgl-wangzherongyao-equip2hero","n");//重置 从装备跳转过来
					}else if(this.o.platform == "android"){
						unios();
						removehide();
						this.setsession("wbgl-wangzherongyao-equip2hero","n");//重置 从装备跳转过来
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}else if(this.o.platform == "ios"){
						this.setsession("wbgl-wangzherongyao-equip2hero","n");//重置 从装备跳转过来
						$("#herolist").addClass("mt_0");
					}
				break;
				case "herodetail":
					if(this.o.platform == "web"){
						unios();
						removehide();
						if(this.getsession("wbgl-wangzherongyao-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href","data-wangzherongyao-equip-detail.html");
						}
					}else if(this.o.platform == "android"){
						unios();
						removehide();
						if(this.getsession("wbgl-wangzherongyao-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href",'../'+this.o.plugin_equip+'/data-wangzherongyao-equip-detail.html');
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
	
	window.WzryHero = WzryHero;
})(window);


/*
第1数组 战士
第2数组 法师
第3数组 肉盾
第4数组 辅助


[{"tid":1,"tname":"战士","data":[{"id":1,"title":"精灵女神",name:"狄安娜","pos":"近战 肉盾 攻击型","label":["治疗","辅助","AOE2"],"pie":[3,9,2,5],"aword":"具备高伤害的远程战士，攻击范围远且上手难度低","groom":"让他的普通攻击获得了吸血效果的加成，配合技能撕裂的被动，让他在打野的时候可以做到几乎无损耗!迅速的清野效果加上技能扑击的范围性眩晕。","equip":[1,2,3,4,5,6],"addskill":[1,2,3,4,1,2,3,4,1,2],"graphical":[1,2,3,10],"figure":{"shengming":[645,2],"gongji":[64,4],"fashu":[5,6],"hujia":[7,8],"fakang":[9,10],"shenghui":[11,12]},"sname":["虚拟一击1","虚拟一击2","虚拟一击3","虚拟一击4"],"sdesc":["每当...","每当...","每当...","每当..."],"sintro":["技能描述朵朵","技能描述朵朵","技能描述朵朵","技能描述朵朵"],"svideo":[],"suipian":18,"zuanshi":-1,"getsuipian":["挑战模式3","闯关模式"],"story":"故事..."}]}];
*/
