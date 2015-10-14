(function(window){
	var QmcsHero = function(){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {platform:"web",plugin:"plugin_1101",url:"images/chanminchaoshen/"};
		if(this.o.platform == "android"){
			this.o.url="../images/chanminchaoshen/";
		}
		this.init();
	};
	
	QmcsHero.prototype = {
		htmlherodetail: function(){
			
		},
		printIndex: function(){
			var html = '';
			
			for(var i=0; i<this.data.length; i++){
				html += '<li class="wbclick" data-id="'+this.data[i].id+'"><img src="images/quanminchaoshen/DBPic/'+this.data[i].id+'.jpg" alt="'+this.data[i].name+'"><p>'+this.data[i].name+'</p></li>';
			}
			
			$("#herolist ul").html(html);
		},
		htmlIndex: function(){
			var that = this;
			
			that.printIndex();
			
			$("#herolist").on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));
				
				that.setsession("wbgl-quanminchaoshen-hero-id",_id);
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
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}else if(this.o.platform == "ios"){
						$("#herolist").addClass("mt_0");
					}
				break;
				case "herodetail":
					if(this.o.platform == "ios"){
						$("#herolist").addClass("mt_0");
					}else{
						removehide();
					}
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			var href = $("body").attr("data-url");
			
			switch(true){
				case (href == "index.html"):
					this.isplatform("index");
					this.htmlIndex();
					break;
				case (href == "herodetail.html"):
					this.isplatform("herodetail");
					this.htmlherodetail();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.QmcsHero = QmcsHero;
})(window);

