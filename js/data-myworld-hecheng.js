(function(window){
	var Myworld = function(option){
		//if(arguments[0] === undefined) return false;		
		// this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};		
		this.o = {
			  platform:"web",
			  url:"images/myworld/hecheng/",
			  plugin_hecheng:"plugin_1252"
		};
		if(this.o.platform == "android"){
			this.o.url="../images/myworld/hecheng/";
		}		
		this.init();
	};
	
	Myworld.prototype = {
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
			function unIos(){
				$("#header").removeClass("hide");
				$("#header").next().addClass("mt_45");
			}			
			switch(i){
				case "index":				
					if(this.o.platform == "web"){
						unIos();
					}else if(unIos.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}
					break;
				case "detail":
					if(this.o.platform == "web"){
						unIos();						
					}else if(this.o.platform == "android"){
						unIos();							
						$("#header").children(".back").attr("href","index.html");	
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
					this.printBiaoList();
					this.events();
					break;
				case (href == "detail.html"):			
					this.isplatform("detail");
					this.getHechengbiaoDetailData();
					break;				
			}
		},
		init: function(){
			this.ispage();
		},

		events:function(){
			var that = this;				
			$("#hecheng").on("click", "li", function(){				
				var _id = Number($(this).attr("data-id"));
						
				that.setsession("wbgl-myworld-hecheng-id", _id);
						
				if(that.o.platform == "ios"){
					location.href = that.o.plugin_hecheng+'/data-myworld-hecheng-detail.html';
				}else{
					location.href = 'data-myworld-hecheng-detail.html';					
				}	
			});
		},
		printBiaoList:function(){
			var Biaolist = ["basic","block","tools","weapon","armor","transport_tool","mechanism","food","various","dyestuff","wool","wards_brew"],
				Biaoid = ["23241","23242","23243","23244","23245","23246","23268","23269","23270","23288","23289","23292"],
				html_content = "";
				
			for(var i=0;i<Biaolist.length;i++){
				html_content +='<li class="wbclick" data-id="'+Biaoid[i]+'"><img src="'+this.o.url+''+Biaolist[i]+'.png"></li>';
			}
			html_content ='<ul>'+html_content+'</ul>';
			$("#hecheng").html(html_content);
		},

		getHechengbiaoDetailData:function(){
			var that = this,
				id = that.getsession("wbgl-myworld-hecheng-id");
				
			$.getJSON('http://m.wanba123.cn/h5data/detail?jsoncallback=?', {
				tid: id
			}).done(function(data){		
				that.printBiaoDetail(data.code, data);										
			}).fail(function(){					
				$("#container").addClass("no_net").html("网络错误");
			});
		},

		printBiaoDetail:function(err, detail_data){			
			var	html_content='',
				html_footer='',
				temp_data='';
						
			if(err === 0){
				$("#container").addClass("no_net").html("网络错误");
				return;
			}
			temp_data = detail_data.data;
			if(!(temp_data instanceof Array)){
				$("#container").addClass("no_net").html("数据错误");
				return;
			}
			if(temp_data.length == 0){
				$("#container").addClass("no_net").html("没有数据");
				return;
			}  
			temp_data = temp_data[0];		

			html_content = '<div class="article">'+
								'<div class="top">'+
									'<h1>'+temp_data.Title+'</h1>'+
								'<div class="info">'+
									'<span>'+temp_data.ReleaseTime+'</span>'+							
									'<span>'+'来源:'+temp_data.Source+'</span>'+
								'</div>'+
							'</div>'+
							'<div class="pagebody">'+temp_data.Content+'</div></div>';
							
			html_footer = '<div class="footer">'+
								'Copyright &copy; 2013 - 2016 wanba123.cn'+
							'</div>';
			$("#container").html(html_content + html_footer);
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
	}	
	
	window.Myworld = Myworld;
})(window);

