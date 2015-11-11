(function(window){
	var Vainglory = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {
			platform:"web",
			url:"images/vainglory/",
			type:0,//英雄类别数组下标
			piece:{},//英雄单个详情object
			herodHeight:300,//默认距顶部高度
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
				tlocation = $("#hero_location").children().index(self);		
				that.printIndex(tlocation,tduty,tprice);
				$("#herolist_nav_top").children().eq(0).children("span").html($(self).text());

			});
			$("#hero_duty").children().click(function(){
				var self = this;				
				$("#hero_duty").removeClass("on");	
				tduty = $("#hero_duty").children().index(self);				
				that.printIndex(tlocation,tduty,tprice);	
				$("#herolist_nav_top").children().eq(1).children("span").html($(self).text());			
			});
			$("#hero_price").children().click(function(){
				var self = this;				
				$("#hero_price").removeClass("on");		
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


		

		printIndex: function(mloction,mduty,mprice){//打印英雄列表
			var hero_data,				
				html_content_temp='';

			function getLocation(i){
				switch(i){
					case 1:
					return "zhanshi";
					case 2:
					return "huweizhe";
					case 3:
					return "cike";
					case 4:
					return "sheshou";
					case 5:
					return "fashi";
				}
			}

			// var a = [{k:'c3',v:3},{k:'c1',v:1},{k:'c5',v:5},{k:'c9',v:9},{k:'c7',v:7},{k:'c11',v:11},{k:'c1',v:1},{k:'c20',v:20},{k:'c2',v:2}];			
			function sortNumber(a,b)
			{				
				return a.honor - b.honor;
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
								          '<i class="icon_heroitem icon_jobs icon_jobs_'+getLocation(hero_data.location)+'"></i>'+hero_data.name+
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
			var that = this;
			that.o.type = Number(that.getsession("wbgl-vainglory-hero-type"));			
			that.printHeroDetail();
			$("#skills_head").on("click", "li",function(){
				var _index = $(this).parents().children().index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				$("#skills_content").children().siblings().removeClass("on").eq(_index).addClass("on");
				
			}).find("li").eq(0).trigger("click");

			$("#skin").on("click", "div",function(){
				var _index = $(this).parents().children().index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				$("#skin_inf").children().siblings().removeClass("on").eq(_index).addClass("on");
				
			}).find("div").eq(0).trigger("click");			

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
			function getLocation(duty){
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
			console.log(id);
			$("#herod_bg").attr("src",this.o.url+"DBPic/image_"+id+".jpg");//大背景图片			

			

           
            var intro_top ='<div class="intro_top">'+
					    	'<div class="top_l">'+
					        	'<span class="name">'+piece.name+'</span>'+
					            '<i class="icon_jobs icon_jobs_gongjian"></i>'+ 
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
					    	''+"难度:"+getHardLevel(piece.diff)+' | '+"位置:"+getLocation(piece.duty)+
					    '</div>'+      
					    '<div class="intro_bottom fs_12">'+
					    	''+piece.desc+''+
					    '</div>';

			$("#herod_head").html(intro_top);
			var summary = '<p class="fs_12">'+piece.summary+'</p>';
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
                '<div class="r fs_12">'+
                '<div>'+piece.spec_name+
                '</div><p>'+piece.spec_tips+'</p>'+
                '</div><div class="r fs_12"><div class="qp_skill">气魄技巧</div><p>'+piece.spec_des+'</p></div>'+
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
							                '</div>'+
						                '</div>';	
				// html_skills_content += '<div class="video" id="videocon'+i+'" data-id="'+piece.svideo[i]+'"></div>';				
			}
			$("#skills_head").children().html(html_skills_head);
			$("#skills_content").html(html_skills_content);

			var html_skin_pic='',
				html_skin_content='';
			for(var i=0;i<piece.skin.length && piece.skin[i].trim().length>0;i++){				
				html_skin_pic +='<div class="item">'+
									'<img src="'+this.o.url+'dbpic/skinicon'+piece.id+'_'+(i+1)+'.jpg">'+
									'</div>';
				if(piece.skin_ice[i].trim().length == 0){
					piece.skin_ice[i] = 0;
				}
				html_skin_content +='<div class="item">'+
				'<div class="mb_10"><img src="'+this.o.url+'dbpic/skinpic'+piece.id+'_'+(i+1)+'.jpg"></div>'+
				'<div><span>售价</span><i class="icon_ice"></i><h4>'+piece.skin_ice[i]+'</h4></div>'+
				'<div><span>合成</span>'+piece.skin_composes+'</div>'+
				'</div>';				
			}
			$("#skin").html(html_skin_pic);
			$("#skin_inf").html(html_skin_content);
			that.setFigure(0);
		},

		setFigure: function(level){
			console.log(level);
			var piece = this.o.piece;
			var basic_data = '<li>'+
				'<span>生命:</span>'+(parseInt(piece.figure.hp[0]+level*piece.figure.hp[1]))+'(+'+piece.figure.hp[1]+'每级)'+
				'</li>'+
	            '<li><span>护甲:</span>'+(parseInt(piece.figure.armor[0]+level*piece.figure.armor[1]))+'(+'+piece.figure.armor[1]+'每级)'+
	            '</li>'+
	            '<li><span>'+piece.figure.mpname+'</span>'+(parseInt(piece.figure.mp[0]+level*piece.figure.mp[1]))+'(+'+piece.figure.mp[1]+'每级)'+
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
	            '</li>';	             
	        $("#hero_basic_data").html(basic_data);//英雄数据

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
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}else if(this.o.platform == "ios"){
						$("#container").addClass("mt_0");
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
			console.log(href);
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

