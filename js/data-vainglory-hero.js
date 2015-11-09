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
			that.setHerodtop();
			that.setBlur();//模糊
		},

		printHeroDetail: function(){
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

