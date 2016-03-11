(function(window){
	var Huangshizhanzheng = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {
					platform:"web",
					url:"images/huangshizhanzheng/",
					plugin:""
				 };
		if(this.o.platform == "android"){
			this.o.url="../images/huangshizhanzheng/";
		}
		this.init();
	};
	
	Huangshizhanzheng.prototype = {
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

		printIndex:function(){

			var piece,
				html_head = '',
				html_content = '',
				html_content_temp = '',
				html_content_all = '';
			for(var i=0; i<this.data.length; i++){
				html_head += '<div class="item">'+this.data[i].typ+'</div>';
				html_content += '<ul>';
				html_content_temp='';
				for(var j=0; j<this.data[i].data.length; j++){
					piece = this.data[i].data[j];
					html_content_temp += '<li data-type="'+(i+1)+'"+data-id="'+piece.id+'"><img src="'+this.o.url+'dbpic/'+piece.id+'.png"><p>'+piece.name+'</p></li>';
				}
				html_content += html_content_temp;
				html_content_all += html_content_temp;
				html_content += '</ul>';
			}
			$("#weapon_head").html(html_head);
			$("#weapon_content").html(html_content);
		},

		printDetail:function(){

		},

		printCompare:function(){

		},

		events:function(){
			var that = this,
			tindex = 0;
			$weapon_head = $("#weapon_head"),
			$weapon_content = $("#weapon_content"),

			/*兵种列表点击事件*/
			$weapon_head.on("click", ".item", function(){
				tindex = $weapon_head.children().index(this);
				that.setsession("wbgl-huangshizhanzhanzheng-weapon-tindex",tindex);
				$weapon_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$weapon_content.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(tindex).trigger("click");


			$weapon_content.on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));
					// _weapontype = Number($(this).attr("data-type"));
				
				that.setsession("wbgl-huangshizhanzheng-weapon-id",_id);
				// that.setsession("wbgl-huangshizhanzheng-weapon-type",_weapontype);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-huangshizhanzheng-weapon-detail.html';
				}else{
					location.href = 'data-huangshizhanzheng-weapon-detail.html';
				}
			});
			/*兵种详情点击事件*/
			/*卡牌对比点击事件*/
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
				case "detail":
				break;
				case "compare":
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					this.printIndex();
					break;
				case (href == "detail"):
					break; 
				case (heef == "compare"):
					break;
			}
		},
		init: function(){
			this.ispage();
			this.events();
		}
	}
	
	window.Huangshizhanzheng = Huangshizhanzheng;
})(window);

