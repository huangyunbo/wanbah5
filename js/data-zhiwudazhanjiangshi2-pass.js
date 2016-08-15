//2016-08-15 guawazi

(function(window){
	var Zhiwudazhanjiangshi2_pass = function(){
		var lang = typeof(arguments[0]) == 'string' ? arguments[0] : 'cn';
		var data_cn = typeof(arguments[1]) == 'object' ? arguments[1] : {};//中文版
		var data_en = typeof(arguments[2]) == 'object' ? arguments[2] : {};//英文版
		this.data_pass = data_cn;
		
		this.o = {platform:"web",plugin:"plugin_1386",url:"images/zhiwudazhanjiangshi2/",lang:lang};//platform:打包平台,plugin:插件板块名,url:前缀路径
		if(this.o.lang == "en"){
			this.data_pass = data_en;
			this.o.plugin = "plugin_1387";
		}
		if(this.o.platform == "android"){
			this.o.url="../images/zhiwudazhanjiangshi2/";
		}
		this.init();
	};
	
	Zhiwudazhanjiangshi2_pass.prototype = {
		gopage: function(){
			var arg = arguments[0];
			
			if(this.o.platform == "android"){
				try{
					window.jstojava.gotoWanbaPage(arg);
				}catch(e){
					alert("error");
				}
			}else if(this.o.platform == "ios"){
				window.location.href = 'ios://gotoWanbaPage?param='+arg;
			}
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
		printList: function(){//打印关卡选择模式类型
			var that = this,
				data = that.data_pass,
				piece = 0;
			
			var _id = Number(that.getsession("wbgl-zhiwudazhanjiangshi2-pass-id"));

			for(var i=0; i<data.length; i++){
				if(i == _id){
					piece = data[i];
					break;
				}
			}
			$("#mode_1").click(function(){
				that.gopage('{"pageid":2,"param1":'+piece[0]+',"title":"'+(that.o.lang == 'cn' ? '简单' : '1-15关')+'","gameid":2,"flag":0}');
			});
			$("#mode_2").click(function(){
				that.gopage('{"pageid":2,"param1":'+piece[1]+',"title":"'+(that.o.lang == 'cn' ? '困难' : '16-20关')+'","gameid":2,"flag":0}');
			});
			$("#mode_3").click(function(){
				that.gopage('{"pageid":2,"param1":'+piece[2]+',"title":"'+(that.o.lang == 'cn' ? '终极挑战' : '无尽关卡')+'","gameid":2,"flag":0}');
			});
		},
		printIndex: function(){//打印关卡首页
			var html = '',
				data = this.data_pass;
			
			for(var i=0; i<data.length; i++){
				html += '<a href="javascript:;" class="wbclick" data-id="'+i+'"><img src="'+this.o.url+'pass_'+this.o.lang+'/'+(i+1)+'.png" /></a>';
			}
			$("#pass_classify").html(html);
		},		
		events: function(){
			var that = this;
			//旋转屏幕重新设置
			$(window).resize(function(e){
                that.setFontSize();
            });
			
			//列表
			$("#pass_classify").on("click", "a", function(){
				var _id = Number($(this).attr("data-id"));
				that.setsession("wbgl-zhiwudazhanjiangshi2-pass-id", _id);
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-zhiwudazhanjiangshi2-pass-'+that.o.lang+'-list.html';
				}else{
					location.href = 'data-zhiwudazhanjiangshi2-pass-'+that.o.lang+'-list.html';
				}
			});			
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
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					this.printIndex();
					break;
				case (href == "list"):
					this.isplatform("list");
					this.printList();
					break;
			}
		},
		setFontSize: function(){//根据宽度算整体字体大小
			var doc = document,
				docEle = doc.documentElement,
				docEleW = docEle.clientWidth,
				fs = docEleW/320*100;
				
			docEle.style.fontSize = fs+"px";
		},
		init: function(){
			this.setFontSize();
			this.ispage();
			this.events();
		}
	};
	
	window.Zhiwudazhanjiangshi2_pass = Zhiwudazhanjiangshi2_pass;
})(window);
