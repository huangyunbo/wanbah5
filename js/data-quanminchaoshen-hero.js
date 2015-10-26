(function(window){
	var QmcsHero = function(){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {platform:"web",plugin:"plugin_1101",plugin_equip:"plugin_1103",url:"images/quanminchaoshen/"};
		if(this.o.platform == "android"){
			this.o.url="../images/quanminchaoshen/";
		}
		this.init();
	};
	
	QmcsHero.prototype = {
		htmlherodetail: function(){
			var that = this,
			html_header = '',
			html_skill = '',
			html_bginfo = '',
			id = Number(this.getsession("wbgl-quanminchaoshen-hero-id")),
			_item;
			
			function jobimg(){
				switch(arguments[0]){
					case 1:
						return '<img src="'+that.o.url+'zhanshi_bg.jpg">';
					case 2:
						return '<img src="'+that.o.url+'roudun_bg.jpg">';
					case 3:
						return '<img src="'+that.o.url+'fashi_bg.jpg">';
					case 4:
						return '<img src="'+that.o.url+'fuzhu_bg.jpg">';
				}
			}
			
			function job(){
				switch(arguments[0]){
					case 1:
						return '战士';
					case 2:
						return '肉盾';
					case 3:
						return '法师';
					case 4:
						return '辅助';
				}
			}
			
			for(var i=0; i<this.data.length; i++){
				_item = this.data[i];
				if(id == _item.id){
					var item_skill = _item.skill;
					html_header = '<div class="tit">'+_item.name+'-'+_item.prename+'<div>职业：<em>'+job(_item.job)+'</em></div></div><img src="'+this.o.url+'DBPic/d_'+_item.id+'.jpg">';
					
					for(var j=0; j<item_skill.sname.length; j++){
						html_skill += '<li>'+
										'<div class="l"><img src="'+this.o.url+'skillPic/skill'+_item.id+'_'+item_skill.simg[j]+'"></div>'+
										'<div class="r">'+
											'<p class="tit">'+item_skill.sname[j]+'</p>'+
											'<p class="desc">'+item_skill.desc[j]+'</p>'+
										'</div>'+
									'</li>';
					}
					
					html_bginfo = '<div class="txt">'+
										'<p class="smy">'+_item.professional+'</p>'+
										'<p class="word">'+_item.ana+'</p>'+
										'<p class="po">&mdash;'+_item.prename+'</p>'+
									'</div>'+
									jobimg(_item.job);
				}
			}
			
			
			$("#herodetail_head").html(html_header);
			$("#herodetail_skills ul").html(html_skill);
			$("#herodetail_bginfo").html(html_bginfo);
		},
		printIndex: function(){
			var html = '';
			
			for(var i=0; i<this.data.length; i++){
				html += '<li class="wbclick" data-id="'+this.data[i].id+'"><img src="'+this.o.url+'DBPic/'+this.data[i].id+'.jpg" alt="'+this.data[i].name+'"><p>'+this.data[i].name+'</p></li>';
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
						this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
					}else if(this.o.platform == "android"){
						removehide();
						this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}else if(this.o.platform == "ios"){
						$("#herolist").addClass("mt_0");
					}
				break;
				case "herodetail":
					if(this.o.platform == "web"){
						removehide();
						if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href","data-quanminchaoshen-equip-detail.html");
						}
					}else if(this.o.platform == "android"){
						removehide();
						if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href",'../'+this.o.plugin_equip+'/data-quanminchaoshen-equip-detail.html');
						}else{
							$("#header").children(".back").attr("href","index.html");
						}
					}if(this.o.platform == "ios"){
						$("#herodetail").addClass("mt_0");
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


/*
job
1 战士
2 肉盾
3 法师
4 辅助
*/
