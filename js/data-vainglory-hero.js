(function(window){
	var Vainglory = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {
			plugin:"plugin_1080",
			platform:"web",
			url:"images/vainglory/",
			type:0,//英雄类别数组下标
			piece:{},//英雄单个详情object
			herodHeight:300//默认距顶部高度
		};	

		if(this.o.platform == "android"){
			this.o.url="../images/vainglory/";
		}
		this.init();
	};
	
	
	Vainglory.prototype = {

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

		htmlIndex: function(){
			var that = this,
				tlocation = 0,
				tduty = 0,
				tprice = 0;
			this.printIndex(tlocation,tduty,tprice);			

			$("#herolist_nav_top").children().click(function(){
				var self = $(this),
				_index = $("#herolist_nav_top").children().index(self);
				self.toggleClass("on").siblings().removeClass("on");
				$("#herolist_nav_select").children().eq(_index).toggleClass("on").siblings().removeClass("on");
			});

			$("#hero_location").children().click(function(){
				var self = this;				
				$("#hero_location").removeClass("on");	
				$("#herolist_nav_top").children().removeClass("on");
				tlocation = $("#hero_location").children().index(self);						
				that.printIndex(tlocation,tduty,tprice);
				$("#herolist_nav_top").children().eq(0).children("span").html($(self).text());

			});
			$("#hero_duty").children().click(function(){
				var self = this;				
				$("#hero_duty").removeClass("on");	
				$("#herolist_nav_top").children().removeClass("on");
				tduty = $("#hero_duty").children().index(self);				
				that.printIndex(tlocation,tduty,tprice);	
				$("#herolist_nav_top").children().eq(1).children("span").html($(self).text());			
			});
			$("#hero_price").children().click(function(){
				var self = this;				
				$("#hero_price").removeClass("on");	
				$("#herolist_nav_top").children().removeClass("on");	
				tprice = $("#hero_price").children().index(self);			
				that.printIndex(tlocation,tduty,tprice);	
				$("#herolist_nav_top").children().eq(2).children("span").html($(self).text());		
			});

			$("#heroitem").on("click", "li", function(){
				var _id = Number($(this).attr("data-id")),
					_herotype = Number($(this).attr("data-type"));
				
				that.setsession("wbgl-vainglory-hero-id",_id);
				that.setsession("wbgl-vainglory-hero-type",_herotype);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-vainglory-hero-detail.html';
				}else{
					location.href = 'data-vainglory-hero-detail.html';
				}
			});
		},



		getLocation: function(location){
				switch(location){
					case 1:
					return "zhanshi";
					case 2:
					return "huweizhe";
					case 3:
					return "cike";
					case 4:
					return "gongjian";
					case 5:
					return "fashi";
				}
			},
		

		printIndex: function(mloction,mduty,mprice){//打印英雄列表
			var hero_data,				
				html_content_temp='';
			var that = this;

			

			// var a = [{k:'c3',v:3},{k:'c1',v:1},{k:'c5',v:5},{k:'c9',v:9},{k:'c7',v:7},{k:'c11',v:11},{k:'c1',v:1},{k:'c20',v:20},{k:'c2',v:2}];			
			function sortNumber(a,b)
			{				
				if(mprice == 1){
					return b.honor - a.honor;
				}
				return b.id - a.id;
			}			
			this.data.sort(sortNumber);			
			for(var i=0; i<this.data.length; i++){
				hero_data = this.data[i];
				if((mloction == 0 || mloction == hero_data.location) && (mduty == 0 || mduty == hero_data.duty)){									
					html_content_temp += '<li data-id="'+hero_data.id+'">'+
								        '<div class="img">'+
								          '<img src="'+this.o.url+'dbpic/image_'+hero_data.id+'.jpg">'+
								        '</div>'+	
								        '<div class="name">'+
								          '<i class="icon_heroitem icon_jobs icon_jobs_'+that.getLocation(hero_data.location)+'"></i>'+hero_data.name+
								        '</div>'+
								        '<div class="gold">'+
								          '<span>'+
								            '<i class="icon_heroitem icon_honor"></i>'+hero_data.honor+   
								          '</span>'+
								          '<span>'+
								            '<i class="icon_heroitem icon_ice"></i>'+hero_data.ice+
								          '</span>'+
								        '</div>'+
								      '</li>';
				}								     
			}
			$("#heroitem").children().html(html_content_temp);			
		},


		htmlHeroDetail: function(){
			var that = this,
				isnetwork = 1;

			that.o.type = Number(that.getsession("wbgl-vainglory-hero-type"));			
			that.printHeroDetail();
			if(window.navigator.onLine){
				isnetwork = 1;//有网
				that.setVideoWH();
			}else{
				isnetwork = 0;//无网
			}
			$("#skills_head").on("click", "li",function(){
				var self = this,
					$self = $(self),
					$skills_head_children = $self.parents().children(),
					_index = $skills_head_children.index(self),
					oldindex = 0;
				
				$skills_head_children.each(function(index, element) {
                    if($(element).hasClass("on")){
						oldindex = index;
					}
                });
				$skills_head_children.eq(oldindex).removeClass("on");
				$self.addClass("on");
				
				$("#skills_content").children().eq(_index).addClass("on").siblings().removeClass("on");
				if(isnetwork == 1){
					$("#skills_content").find(".youku").eq(oldindex).html("");
					that.setVideo(that.o.piece.skill_video[_index],_index);//英雄技能视频
				}
			}).find("li").eq(0).trigger("click");

			$("#skin").on("click", "li", function(){
				var self = $(this),
					head = self.parents(),
					_index = head.children().index(this);

				self.addClass("on").siblings().removeClass("on");
				head.next(".box").children().eq(_index).addClass("on").siblings().removeClass("on");
			}).find("li").eq(0).trigger("click");

			that.setHerodtop();			
			that.setBlur();//模糊
			that.setSlidebar();//滑动条		
		},

		printHeroDetail: function(){
			var that = this;
			function getHardLevel(level){
			switch(level){
				case 1:
				return "初级";
				case 2:
				return "中级";
				case 3:
				return "高级"; 
				}			
			}
			function getDuty(duty){
				switch(duty){
					case 1:
					return "对线";
					case 2:
					return "打野";
					case 3:
					return "游走"; 
				}			
			}
			var id = Number(this.getsession("wbgl-vainglory-hero-id")),
				type = this.o.type,
				piece;		
			
			for(var i=0; i<this.data.length; i++){
				if(this.data[i].id == id){
					piece = this.data[i];
					this.o.piece = piece;
					break;
				}
			}

			if(piece == undefined) return;		
			$("#herod_bg").attr("src",that.o.url+"dbpic/image_"+id+".jpg");//大背景图片	

           
            var intro_top ='<div class="intro_top">'+
					    	'<div class="top_l">'+
					        	'<span class="name">'+piece.name+'</span>'+
					            '<i class="icon_jobs icon_jobs_'+this.getLocation(piece.location)+'"></i>'+
					        '</div>'+            
					        '<div class="top_r">'+
					            '<div class="item">'+
					                '<i class="icon_honor"></i>'+piece.honor+
					            '</div>'+                           
					            '<div class="item">'+
					                '<i class="icon_ice"></i>'+piece.ice+
					            '</div>'+
					        '</div>'+
					    '</div><!--/intr-top-->'+
					    '<div class="clear"></div>'+        
					    '<div class="intro_middle">'+
					    	''+"难度:"+getHardLevel(piece.diff)+' | '+"位置:"+getDuty(piece.duty)+
					    '</div>'+      
					    '<div class="intro_bottom media_fs_14">'+
					    	''+piece.desc+''+
					    '</div>';

			$("#herod_head").html(intro_top);
			var summary = '<p class="media_fs_14">'+piece.summary+'</p>';
			$("#summary").html(summary);
			var html_equipchoice='';
			for(var i=0; i<piece.item.length; i++){
				html_equipchoice += '<li><img src="'+this.o.url+'equip/'+'item'+piece.item[i]+'.png"></li>';
			}
			$("#equipchoice").html(html_equipchoice);//装备选择
			var html_addskill='';
			for(var i=0; i<piece.build.length; i++){
				html_addskill += '<li><img src="'+this.o.url+'dbpic/skill'+piece.id+'_'+piece.build[i]+'.jpg"></li>';
			}
			$("#addskill").html(html_addskill);//加点路线			
			$("#graphical").children("li").each(function(index){//英雄数据				
				$(this).find(".star").addClass("star"+piece.ability[index]);
			}); 

			 

	        var hero_qipo = '<li><div class="l"><img src="'+this.o.url+'dbpic/spec'+piece.id+'.jpg"></div>'+
                '<div class="r media_fs_14">'+
                '<div>'+piece.spec_name+
                '</div><p>'+piece.spec_des+'</p>'+
                '</div><div class="r media_fs_14"><div class="qp_skill">气魄技巧</div><p>'+piece.spec_tips+'</p></div>'+
                '</li>';
            $("#hero_qipo").html(hero_qipo);

            var html_skills_head='',
            	html_skills_content='';
            for(var i=0; i<piece.skill_name.length; i++){//英雄技能
				html_skills_head += '<li>'+
										'<img src="'+this.o.url+'dbpic/skill'+piece.id+'_'+(i+1)+'.jpg">'+
									'</li>';				
				html_skills_content += '<div class="item">'+
											'<div class="desc"><div>'+
							            		'<span>'+piece.skill_name[i]+'</span>'+piece.skill_desc[i]+'</div>'+'<div>'+piece.skill_data[i]+'</div>'+
							                '</div><div class="youku" id="youkuplayer'+i+'"></div></div>';
						
			}
			$("#skills_head").children().html(html_skills_head);
			$("#skills_content").html(html_skills_content);

			var html_skin_head = '',
				html_skin_box = '',
				isskin = 0,
				html_skin = '<h2 class="herod_h2 plr_7">英雄皮肤</h2>'+
						        '<ul class="head">';

			for(var i=0; i<piece.skin.length; i++){
				if($.trim(piece.skin[i]).length == 0) continue;
				isskin = 1;
				html_skin_head += '<li>'+
					            	'<img src="'+this.o.url+'dbpic/skinicon'+piece.id+'_'+(i+1)+'.jpg">'+
					            '</li>';

				html_skin_box += '<div class="item">'+
									'<div class="mb_10 center"><img src="'+this.o.url+'dbpic/skinpic'+piece.id+'_'+(i+1)+'.jpg"></div>';
					            			          
				if($.trim(piece.skin_ice[i]).length != 0){
					html_skin_box += '<div><span>售价</span><i class="icon_ice"></i><h4>'+piece.skin_ice[i]+'</h4></div>';
				}
				if($.trim(piece.skin_composes[i]).length != 0){
					html_skin_box += '<div><span>合成</span>'+piece.skin_composes[i]+'</div>';
				}
				html_skin_box += '</div>';

			}
			html_skin_box = '<div class=box>'+html_skin_box+'</div>';
			html_skin += html_skin_head + '</ul>' + html_skin_box;

			if(isskin != 0){
				$("#skin").html(html_skin);
			}	
			
			that.setFigure(1);
		},

		setFigure: function(level){			
			var piece = this.o.piece,
			level = level === 1 ? 0 : level-1;
			var basic_data = '<ul class="info mb_10 media_fs_14" id="hero_basic_data"><li>'+
				'<span>生命:</span>'+(parseInt(piece.figure.hp[0]+level*piece.figure.hp[1]))+'(+'+piece.figure.hp[1]+'每级)'+
				'</li>'+
	            '<li><span>护甲:</span>'+(parseInt(piece.figure.armor[0]+level*piece.figure.armor[1]))+'(+'+piece.figure.armor[1]+'每级)'+
	            '</li>'+
	            '<li><span>'+piece.figure.mpname+':'+'</span>'+(parseInt(piece.figure.mp[0]+level*piece.figure.mp[1]))+'(+'+piece.figure.mp[1]+'每级)'+
	            '</li>'+
	            '<li><span>魔抗:</span>'+(parseInt(piece.figure.res[0]+level*piece.figure.res[1]))+'(+'+piece.figure.res[1]+'每级)'+
	            '</li>'+
	            '<li><span>攻击:</span>'+(parseInt(piece.figure.atk[0]+level*piece.figure.atk[1]))+'(+'+piece.figure.atk[1]+'每级)'+
	            '</li>'+
	            '<li><span>攻击范围:</span>'+parseInt(piece.figure.atkrange[0])+
	            '</li>'+
	            '<li><span>攻击速度:</span>'+(parseInt(piece.figure.aspd[0]+level*piece.figure.aspd[1]))+'(+'+piece.figure.aspd[1]+'每级)'+
	            '</li>'+
	            '<li><span>移动速度:</span>'+parseInt(piece.figure.mspd[0])+
	            '</li></ul>';	             
	        $("#hero_basic_data").html(basic_data);//英雄数据

		},
		setVideo: function(videoId,index){
	  		var player = new YKU.Player('youkuplayer'+index,{
	                                    styleid: '0',
	                                    client_id: '759811013057796d',
	                                    vid: videoId,
	                                    show_related: false
	                                });
		},
		setVideoWH: function(){
			var $skills_content = $("#skills_content"),
				v_width = $skills_content.width(),
				v_height = parseInt(v_width/306*190);

			$skills_content.find(".youku").each(function(){
				$(this).height(v_height);
			});
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
				paragraph = barW_max/12,
				level = 1;//初始化

			function slide(rangeX){
				var _level = Math.ceil(rangeX/paragraph);
				
				_level = _level == 0 ? 1 : _level;
				$barhandle.css({"left":rangeX+"px"});
				if(_level == level) return;//减少后面的调用				
				level = _level;
				$("#barlevel").html(level);
				that.setFigure(level);
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
					this.setsession("wbgl-vainglory-equip2hero","n");
					// if(this.o.platform == "web"){
					// 	removehide();
					// }else if(this.o.platform == "android"){
					// 	removehide();
					// 	$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					// }else if(this.o.platform == "ios"){
					// 	$("#herolist").addClass("mt_0");
					// }

					if(this.o.platform == "web"){
						removehide();
						this.setsession("wbgl-vainglory-equip2hero","n");//重置 从装备跳转过来
					}else if(this.o.platform == "android"){
						removehide();
						this.setsession("wbgl-vainglory-equip2hero","n");//重置 从装备跳转过来
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}else if(this.o.platform == "ios"){
						this.setsession("wbgl-vainglory-equip2hero","n");//重置 从装备跳转过来
						$("#herolist").addClass("mt_0");
					}	


				break;
				case "herodetail":
					if(this.o.platform == "web"){
						removehide();
						if(this.getsession("wbgl-vainglory-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href","data-vainglory-equip-detail.html");
						}
					}else if(this.o.platform == "android"){
						removehide();
						if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href",'../'+this.o.plugin_equip+'/data-vainglory-equip-detail.html');
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
					this.htmlHeroDetail();
					break;		
			}
		},
		init: function(){			
			this.ispage();
		}
	}
	
	window.Vainglory = Vainglory;
})(window);

