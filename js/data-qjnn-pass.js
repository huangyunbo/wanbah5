(function(window){
	var QjnnPass = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datapass = option;
		this.o = {platform:"web",plugin:"plugin_911",url:"images/qjnn/"};
		if(this.o.platform == "android"){
			this.o.url="../images/qjnn/";
		}
		this.init();
	};
	
	QjnnPass.prototype = {
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
		printlist: function(){//打印列表
			var list = [],
				html = '',
				chapter = 0;
			
			//特意兼容低版本android写的
			if(this.o.platform == "android"){
				var longHref = location.href.split("?"),
					query = longHref[1];
				
				if(query !== undefined){
					var pairs = query.split("&");
					
					for(var i=0; i<pairs.length; i++){
						var pos = pairs[i].indexOf('='); //查找name=value
						if(pos == -1) continue; //如果没有找到就跳过
						var argname = pairs[i].substring(0, pos); //提取name
						var value = pairs[i].substring(pos + 1); //提取value
						if(argname == "wbgl-qjnn-pass-chapter"){
							list = this.datapass[value];
							break;
						}
					}
				}else{
					list = this.datapass[0];
				}
			}else{
				list = this.datapass[Number(this.getsession("wbgl-qjnn-pass-chapter"))];
			}
			
			for(var i=0; i<list.length; i++){
				html += '<div class="item" data-id="'+list[i].id+'"><div><span>'+list[i].name+'</span></div></div>';
			}
			$("#passlist").html(html);
		},
		numtochinese: function(){//数字转换为汉字(只考虑0-99)
			var num = Number(arguments[0]),
			chinese = ["零","一","二","三","四","五","六","七","八","九","十"];
			
			if(num <= 10){
				return chinese[num];
			}else if(num>10 && num<=99){
				if(num%10 == 0){
					return chinese[Number(num.toString().slice(0,1))] + chinese[10];
				}else{
					return chinese[Number(num.toString().slice(0,1))] + chinese[10] + chinese[Number(num.toString().slice(1,2))];
				}
			}else{
				return num;
			}
		},
		printindex: function(){//打印首页
			var html = '';
			
			for(var i=0; i<this.datapass.length; i++){
				html += '<div class="item" data-chapter="'+i+'">'+
							'<div class="pic">'+
								'<img src="'+this.o.url+'pass-default.png">'+
								'<div class="img" style="background-image:url('+this.o.url+'guanka/guanka'+Number(i+1)+'.jpg)"></div>'+
								'<div class="text">第'+this.numtochinese(Number(i+1))+'章</div>'+
							'</div>'+
						'</div>';
			}
			$("#pass").html(html);
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
		events: function(){
			var that = this;
			//点击章节
			$("#pass").on("click", ".item", function(){
				var chapter = Number($(this).attr("data-chapter"));
				
				
				if(that.o.platform == "web"){
					that.setsession("wbgl-qjnn-pass-chapter", chapter);
					location.href = 'data-qjnn-pass-list.html';
				}else if(that.o.platform == "ios"){
					that.setsession("wbgl-qjnn-pass-chapter", chapter);
					location.href = that.o.plugin+'/data-qjnn-pass-list.html';
				}else{
					location.href = 'data-qjnn-pass-list.html?wbgl-qjnn-pass-chapter='+chapter;
				}
			});
			//点击具体某篇文章
			$("#passlist").on("click", ".item", function(){
				that.gopage('{"pageid":1,"param1":'+$(this).attr("data-id")+'}');
			});
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
						$("#pass").addClass("mt_0");
					}
				break;
				case "list":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","index.html");
					}else if(this.o.platform == "ios"){
						$("#header").children(".back").attr("href","index.html");
						$("#passlist").addClass("mt_0");
					}
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					this.printindex();
					break;
				case (href == "list"):
					this.isplatform("list");
					this.printlist();
					break;
			}
		},
		init: function(){
			this.ispage();
			this.events();
		}
	}
	
	window.QjnnPass = QjnnPass;
})(window);

//var data = [[{id:78,name:"1-1公主级",p:""},{id:78,name:"1-1公主级",p:""}],[{id:78,name:"1-1公主级",p:""},{id:78,name:"1-1公主级",p:""}]];