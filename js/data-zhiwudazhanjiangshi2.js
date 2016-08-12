//2016-08-08 guawazi

(function(window){
	var Zhiwudazhanjiangshi2 = function(){
		var data_zhiwu = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		var data_jiangshi = typeof(arguments[1]) == 'object' ? arguments[1] : {};
		this.data_zhiwu = data_zhiwu;
		this.data_jiangshi = data_jiangshi;
		this.data_cards = [];
		
		this.o = {platform:"web",plugin:"plugin_992",url:"images/zhiwudazhanjiangshi2/",menu:"zhiwu"};//platform:打包平台,plugin:插件板块名,url:前缀路径
		if(this.o.platform.platform == "android"){
			this.o.url="../images/zhiwudazhanjiangshi2/";
		}
		this.init();
	};
	
	Zhiwudazhanjiangshi2.prototype = {
		isMenu: function(){
			var headerTit;
			if(this.getsession("wbgl-zhiwudazhanjiangshi2-menu") == 'zhiwu'){
				this.o.menu = 'zhiwu';
				this.data_cards = this.data_zhiwu;
				headerTit = "植物图鉴";
			}else{
				this.o.menu = 'jiangshi';
				this.data_cards = this.data_jiangshi;
				headerTit = "僵尸图鉴";
			}
			//顶部标题
			$("#header h2").html(headerTit);
		},
		printDetail:function(){
			this.isMenu();

			var cardid = Number(this.getsession("wbgl-zhiwudazhanjiangshi2-card")),
				data = {},
				isfind = false,
				html_mold = '',
				html_jineng = '',
				html_shuxing = '',
				contentArry='';

			for(var i=0; i<this.data_cards.length; i++){
				for(var j=0; j<this.data_cards[i].data.length; j++){
					if(this.data_cards[i].data[j].id == cardid){
						data = this.data_cards[i].data[j];
						isfind = true;
						break;
					}
				}
				if(isfind) break;
			}
			
			contentArry=data.content;

			//console.log(contentArry);
			if(contentArry === undefined){
				return;
			}

			html_mold = '<h3 class="tit">'+data.h1+'</h3>'+
						'<img src="'+this.o.url+this.o.menu+'/'+data.id+'.png" class="img" />';

			html_jineng='<div class="headerbg"></div>'+
			 			'<div class="describe">'+
				 			'<div class="label">'+contentArry[0].k+'</div>'+
				 			'<p class="text">'+contentArry[0].v+'</p>'+
				 		'</div>'+
			 			'<div class="footerbg"></div>';


			for(var x=1;x<contentArry.length;x++){
				html_shuxing+=
						 '<div class="describe">'+
				 			'<div class="label">'+contentArry[x].k+'</div>'+
				 			'<p class="text">'+contentArry[x].v+'</p>'+
				 			'<div class="split"></div>'+
				 		'</div>'
			} 			
			$("#d_mold").html(html_mold);
			$("#d_sum").html(data.sum);
			$("#content1").html(html_jineng);
			$("#content2").append(html_shuxing);

		},
		printGroup: function(pid){
			var data = this.data_cards,
				html = '';
				
			for(var i=0; i<data.length; i++){
				if(data[i].pid == pid){
					for(var j=0; j<data[i].data.length; j++){
						
						html += '<a class="item" href="javascript:;" data-id="'+data[i].data[j].id+'">'+
									'<div class="border_img"></div>'+
									'<img src="'+this.o.url+this.o.menu+'/'+data[i].data[j].id+'.png"  />'+
									'<div class="label"><span>'+data[i].data[j].h1+'</span></div>'+
								'</a>';
					}
					break;
				}
			}
			$("#group").html(html);
		},
		
		printList: function(){//打印列表
			var data,
				html_nav = '';

			this.isMenu();
			data = this.data_cards;			
			
			for(var i=0; i<data.length; i++){
				html_nav += '<li class="img" data-pid="'+data[i].pid+'"><img src="'+this.o.url+'category/'+data[i].pid+'.png" /></li>';
			}
			$("#nav").html(html_nav);
			this.setheight();
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
			function unios(){
				$("#header").removeClass("hide").next().addClass("mt_45");
			}
			
			switch(i){
				case "index":
					if(this.o.platform == "web"){
						unios();
					}else if(this.o.platform == "android"){
						unios();
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}
				break;
				case "list":
					if(this.o.platform == "web"){
						unios();
					}else if(this.o.platform == "android"){
						unios();
						$("#header").children(".back").attr("href","index.html");
					}
				break;
				case "detail":
					if(this.o.platform == "web"){
						unios();
					}else if(this.o.platform == "android"){
						unios();
					}
				break;
			}
		},
		
		events: function(){
			var that = this;
			//旋转屏幕重新设置
			$(window).resize(function(e){
                that.setFontSize();
            });
			
			//首页
			$("#classify_zhiwu").click(function(){
				that.setsession("wbgl-zhiwudazhanjiangshi2-menu", "zhiwu");
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-zhiwudazhanjiangshi2-list.html';
				}else{
					location.href = 'data-zhiwudazhanjiangshi2-list.html';
				}
			});
			$("#classify_jiangshi").click(function(){
				that.setsession("wbgl-zhiwudazhanjiangshi2-menu", "jiangshi");
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-zhiwudazhanjiangshi2-list.html';
				}else{
					location.href = 'data-zhiwudazhanjiangshi2-list.html';
				}
			});
			
			//列表
			$("#nav").on("click", ".img", function(){
				var $self = $(this);
				$self.addClass("on").siblings().removeClass("on");
				that.printGroup($self.attr("data-pid"));
			}).children(".img").eq(0).trigger("click");

			$("#group").on("click", ".item", function(){
				var _id = Number($(this).attr("data-id"));
				that.setsession("wbgl-zhiwudazhanjiangshi2-card", _id);
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-zhiwudazhanjiangshi2-detail.html';
				}else{
					location.href = 'data-zhiwudazhanjiangshi2-detail.html';
				}

			});
			
		},
		setFontSize: function(){//根据宽度算整体字体大小
			var doc = document,
				docEle = doc.documentElement,
				docEleW = docEle.clientWidth,
				fs = docEleW/320*100;
				
			docEle.style.fontSize = fs+"px";
		},
		ispage: function(){//判断当前打开的是哪一个页面

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					break;
				case (href == "list"):
					this.isplatform("list");
					this.printList();
					break;	
				case (href == "detail"):
					this.isplatform("detail");
					this.printDetail();
					break;
			}
		},
		setheight:function(){//获取滚动条高度
			var wwindowh=window.innerHeight,
			    sidetitH=$("#side .tit").height();
			$("#side .mask").height(wwindowh-70-sidetitH);
			$("#main .mask").height(wwindowh-70);
		},

		init: function(){
			this.setFontSize();
			this.ispage();
			this.events();
		}
	};
	
	window.Zhiwudazhanjiangshi2 = Zhiwudazhanjiangshi2;
})(window);
