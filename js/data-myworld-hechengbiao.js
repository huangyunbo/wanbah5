(function(window){
	var Myworld = function(option){
		if(arguments[0] === undefined) return false;		
		// this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};		
		this.o = {
			  platform:"web",
			  url:"images/myworld/hechengbiao/",
			  plugin_hechengbiao:"plugin_1252"
		};
		if(this.o.platform == "android"){
			this.o.url="../images/myworld/hechengbiao/";
		}		
		this.init();
	};
	
	Myworld.prototype = {

		setZhiboHeight: function(){//设置直播高度
			var winH = $(window).height();								
				$ifrme_id0 = $("#iframe_douyu"),
				$ifrme_id1 = $("#iframe_huya"),
				$ifrme_id2 = $("#iframe_longzhu");
			if(this.o.platform == "ios"){
				$ifrme_id0.height(winH);
				$ifrme_id1.height(winH);
				$ifrme_id2.height(winH);
			}else{
				$ifrme_id0.height(winH-45);
				$ifrme_id1.height(winH-45);
				$ifrme_id2.height(winH-45);
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
				}
				break;
				case "biao-detail":
				if(this.o.platform == "web"){
						removehide();						
				}else if(this.o.platform == "android"){
						removehide();							
						$("#header").children(".back").attr("href","index.html");	
				}else if(this.o.platform == "ios"){	
						$("#container").addClass("mt_0");					
					}
				break;
				case "zhibo":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}else if(this.o.platform == "ios"){						
						$("#zhibo").removeClass("mt_45");
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
				case (href == "biao-details.html"):					
					this.isplatform("biao-detail");	
					this.getHechengbiaoDetailData();
					break;
				case (href == "zhibo.html"):	
					this.isplatform("zhibo");					
					this.zhiboEvents();
					break;				
			}
		},
		init: function(){
			this.ispage();
			this.setZhiboHeight();
		},

		events:function(){
			var that = this;				
			$("#content").on("click", "li", function(){				
				var _id = Number($(this).attr("data-id"));				
				that.setsession("wbgl-myworld-biao-id", _id);				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin_hechengbiao+'/data-myworld-biao-details.html';
				}else{
					location.href = 'data-myworld-biao-details.html';					
				}	
			});
		},

		zhiboEvents:function(){			
			var that = this,
				$tab = $("#tab"),
				$tabcontent = $("#iframe_container");				
			$tab.on("click", ".tabitem", function(){								
				var tindex = $tab.children().index(this);
				if($tabcontent.children().eq(tindex).attr("src").length == 0){
					$tabcontent.children().eq(tindex).attr("src", $tabcontent.children().eq(tindex).attr("data-src"));
				}
				// that.setsession("wbgl-myworld-zhibo-tindex",tindex);				
				$tab.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$tabcontent.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(0).trigger("click");
		},


		printBiaoList:function(){
			var Biaolist = ["basic","block","tools","weapon","armor","transport_tool","mechanism","food","various","dyestuff","wool","wards_brew"],
				Biaoid = ["23241","23242","23243","23244","23245","23246","23268","23269","23270","23288","23289","23292"],
				html_content = "";
				for(var i=0;i<Biaolist.length;i++){
					html_content +='<li class="wbclick" data-id="'+Biaoid[i]+'"><img src="'+this.o.url+''+Biaolist[i]+'.png"></li>';
				}
				html_content ='<ul>'+html_content+'</ul>';
				$("#content").html(html_content);
		},

		getHechengbiaoDetailData:function(){
			var that = this,
			id = that.getsession("wbgl-myworld-biao-id");
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
			$("#title").html(temp_data.Name);			

			html_content = '<div class="article">'+
							'<div class="top">'+
								'<h1>'+temp_data.Title+'</h1>'+
							'<div class="info">'+
							'<span>'+temp_data.ReleaseTime+'</span>'+							
							'<span>'+'来源:'+temp_data.Source+'</span>'+
							'</div></div>'+
							'<div class="pagebody">'+temp_data.Content+'</div></div><!--/pagebody-->';
			html_footer = '<div class="footer">'+
			'<p>Copyright © 2013 - 2016 wanba123.cn</p>'+
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

