(function(window){
	var QmcsEquip = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {platform:"web",plugin:"plugin_1103",plugin_hero:"plugin_1101",url:"images/quanminchaoshen/"};
		if(this.o.platform == "android"){
			this.o.url="../images/quanminchaoshen/";
		}
		this.init();
	};
	
	QmcsEquip.prototype = {
		htmlDetail: function(){//详情页
			var that = this,
				t_index = Number(that.getsession("wbgl-quanminchaoshen-equip-tindex")),//类别数组下标
				id = Number(that.getsession("wbgl-quanminchaoshen-equip-id")),//装备id
				piece,
				html_equipd_head = '',
				html_equipd_property = '',
				html_equipd_need_ul = '',
				html_equipd_group_ul = '',
				html_equipd_fithero = '';
			
			for(var i=0; i<that.data[t_index].data.length; i++){
				if(that.data[t_index].data[i].id == id){
					piece = that.data[t_index].data[i];
					break;
				}
			}
			if(piece === undefined){
				return;
			}
			
			function equiplabel(){
				var _html = '';
				for(var i=0; i<piece.label.length; i++){
					_html += '<span>'+piece.label[i]+'</span>';
				}
				return _html;
			}

			html_equipd_head = '<div class="l"><img src="'+that.o.url + 'equip/' + id +'.png"></div>'+
								'<div class="r">'+
									'<span class="tit">'+piece.name+'</span>'+
									'<label class="price">售价'+piece.price+'</label>'+
									'<div class="label">'+
										equiplabel()
									'</div>'+
								'</div>';
			
			html_equipd_property = piece.prop;
			
			for(var i=0; i<piece.need.length; i++){
				html_equipd_need_ul += '<li data-id="'+piece.need[i]+'"><img src="'+that.o.url + 'equip/' + piece.need[i] +'.png"></li>';
			}
			
			for(var i=0; i<piece.group.length; i++){
				html_equipd_group_ul += '<li data-id="'+piece.group[i]+'"><img src="'+that.o.url + 'equip/' + piece.group[i] +'.png"></li>';
			}
			
			for(var i=0; i<piece.hero.length; i++){
				html_equipd_fithero += '<li data-id="'+piece.hero[i]+'"><img src="'+that.o.url + 'DBPic/' + piece.hero[i] +'.jpg"></li>';
			}
			
			$("#equipd_head").html(html_equipd_head);
			$("#equipd_property").html(html_equipd_property);
			$("#equipd_need_ul").html(html_equipd_need_ul);
			$("#equipd_group_ul").html(html_equipd_group_ul);
			$("#equipd_fithero").html(html_equipd_fithero);
			
			if(piece.need.length > 0){
				$("#equipd_need").removeClass("hide");
			}
			if(piece.group.length > 0){
				$("#equipd_group").removeClass("hide");
			}
			
			$("#equipd_need_ul").on("click", "li", function(){//点击合成所需跳转
				var _id = Number($(this).attr("data-id"));
				
				that.setsession("wbgl-quanminchaoshen-equip-id", _id);
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-quanminchaoshen-equip-detail.html';
				}else{
					location.href = 'data-quanminchaoshen-equip-detail.html';
				}
			});
			
			$("#equipd_group_ul").on("click", "li", function(){//点击可合成装备跳转
				var _id = Number($(this).attr("data-id"));
				
				that.setsession("wbgl-quanminchaoshen-equip-id", _id);
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-quanminchaoshen-equip-detail.html';
				}else{
					location.href = 'data-quanminchaoshen-equip-detail.html';
				}
			});
			
			$("#equipd_fithero").on("click", "li", function(){//适合英雄跳转
				var _id = Number($(this).attr("data-id"));
				
				that.setsession("wbgl-quanminchaoshen-hero-id", _id);
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin_hero+'/data-quanminchaoshen-hero-detail.html';
				}else if(that.o.platform == "android"){
					that.setsession("wbgl-quanminchaoshen-equip2hero", "y");//保证跳转到英雄详情页，然后再跳回来
					location.href = '../'+that.o.plugin_hero+'/data-quanminchaoshen-hero-detail.html';
				}else{
					that.setsession("wbgl-quanminchaoshen-equip2hero", "y");//保证跳转到英雄详情页，然后再跳回来
					location.href = 'data-quanminchaoshen-hero-detail.html';
				}
			});
		},
		htmlIndex: function(){//列表页
			var html_equip_head = '',
				html_equip_content = '',
				that = this,
				categorylen = that.data.length,
				piece,
				t_index = Number(that.getsession("wbgl-quanminchaoshen-equip-tindex"));

			if(t_index > categorylen){
				t_index = 0;
			}
			
			for(var i=0; i<categorylen; i++){
				html_equip_head += '<div class="item" data-index="'+i+'">'+that.data[i].tname+'</div>';
				html_equip_content += '<ul>';
				
				for(var j=0; j<that.data[i].data.length; j++){
					piece = that.data[i].data[j];
					html_equip_content += '<li data-id="'+piece.id+'">'+
											'<img src="'+that.o.url+'equip/'+piece.id+'.png"><p>'+piece.name+'</p>'+
										'</li>';
				}
				html_equip_content += '</ul>';
			}
			
			$("#equip_head").html(html_equip_head);
			$("#equip_content").html(html_equip_content);
			
			$("#equip_head").on("click", ".item", function(){
				t_index = Number($(this).attr("data-index"));
				$("#equip_head").children().eq(t_index).addClass("on").siblings().removeClass("on");
				$("#equip_content").children().eq(t_index).addClass("on").siblings().removeClass("on");
			}).children().eq(t_index).trigger("click");
			
			$("#equip_content").on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));
				
				that.setsession("wbgl-quanminchaoshen-equip-tindex", t_index);
				that.setsession("wbgl-quanminchaoshen-equip-id", _id);
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-quanminchaoshen-equip-detail.html';
				}else{
					location.href = 'data-quanminchaoshen-equip-detail.html';
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
						$("#equip").addClass("mt_0");
					}
					break;
				case "detail":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","index.html");
					}else if(this.o.platform == "ios"){
						$("#equipd").addClass("mt_0");
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
				case (href == "detail.html"):
					this.isplatform("detail");
					this.htmlDetail();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.QmcsEquip = QmcsEquip;
})(window);

