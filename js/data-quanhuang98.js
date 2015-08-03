//2015-07-30
(function(window){
	var Quanhuang98 = function(){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {platform:"web",plugin:"plugin_992",url:"images/quanhuang98/"};//platform:打包平台,plugin:插件板块名,url:前缀路径
		if(this.o.platform == "android"){
			this.o.url="../images/quanhuang98/";
		}
		this.init();
	};
	
	Quanhuang98.prototype = {
		printdetail: function(){//打印详情页
			var that = this,
			len = that.datacards.length,
			card,
			id = Number(that.getsession("wbgl-quanhuang98-card")),
			summary_html = '',
			xiaobian_html = '',
			suipian_html = '',
			jineng_html = '',
			suiming_html = '',
			chujishuxing = '';
			
			for(var i=0; i<len; i++){
				card = that.datacards[i];
				if(card.a == id){
					break;
				}
			}
			
			function star(){
				var _html = '';
				for(var i=0; i<arguments[0]; i++){
					_html += '<i></i>';
				}
				return _html;
			}
			function zhiye(){
				switch(arguments[0]){
					case 1:return "攻";
					case 2:return "防";
					case 3:return "技";
				}
			}
			function suipianlist(){
				var _arr = arguments[0],
				_html = '';
				for(var i=0; i<_arr.length; i++){
					_html += '<p>'+_arr[i]+'</p>';

				}
				return _html.replace(/【精英】/g,'<span style="color:#dd423e">【精英】</span>');//【精英】变成红色的
			}
			function jinengllist(){
				var _arr = arguments[0],
				_html = '';
				for(var i=0; i<_arr.length; i++){
					_html += '<div class="item">'+
								'<div class="img"><img src="'+that.o.url+'DBOther/'+_arr[i].img+'"></div>'+
								'<div class="note"><h3>'+_arr[i].name+'</h3><p>'+_arr[i].des+'</p></div>'+
								'<div class="label"><span>'+ _arr[i].label.slice(0,2) + '<br>' + _arr[i].label.slice(2,4) +'</span></div>'+
							'</div>';
				}
				return _html;
			}
			function suminglist(){
				var _arr = arguments[0],
				_html = '';
				for(var i=0; i<_arr.length; i++){
						_html += '<li>'+
									'<div class="n">'+_arr[i].name+'</div>'+
									'<p>'+_arr[i].des+'</p>'+
								'</li>';
				}
				return _html;
			}
			
			summary_html = '<div class="l">'+
								'<div class="img" style="background-image:url('+that.o.url+'DBPic/'+card.e+')"></div>'+
								'<div class="name"><div>'+card.b+'</div></div>'+
							'</div>'+
							'<div class="r">'+
								'<div class="star">'+
									star(card.i)+
								'</div>'+
								'<ul>'+
									'<li>'+
										'<div class="k">资质<span>'+card.h+'</span></div>'+
									'</li>'+
									'<li>'+
										'<div class="k">职业<span>'+zhiye(card.c)+'</span></div>'+
									'</li>'+
									'<li>'+
										'<div class="k">定位</div>'+
										'<div class="v">'+card.f+'</div>'+
									'</li>'+
									'<li>'+
										'<div class="k">怒气特性</div>'+
										'<div class="v">'+card.g+'</div>'+
									'</li>'+
								'</ul>'+
							'</div>';
			xiaobian_html = card.j;
			suipian_html = '<div class="l">'+
								'<img src="'+that.o.url+'DBPic/'+card.d+'">'+
							'</div>'+
							'<div class="r">'+
								suipianlist(card.k)+
							'</div>';
			jineng_html = jinengllist(card.l);
			suming_html = suminglist(card.m);
			chujishuxing_html = '<i class="hr_top"></i>'+
								'<i class="hr_bottom"></i>'+
								'<table>'+
									'<tr>'+
										'<td><span class="red">攻击</span><span class="white">'+card.n[0]+'</span></td>'+
										'<td><span class="red">攻击成长</span><span class="white">'+card.n[3]+'</span></td>'+
									'</tr>'+
									'<tr>'+
										'<td><span class="red">防御</span><span class="white">'+card.n[1]+'</span></td>'+
										'<td><span class="red">防御成长</span><span class="white">'+card.n[4]+'</span></td>'+
									'</tr>'+
									'<tr>'+
										'<td><span class="red">生命</span><span class="white">'+card.n[2]+'</span></td>'+
										'<td><span class="red">生命成长</span><span class="white">'+card.n[5]+'</span></td>'+
									'</tr>'+
								'</table>';
			$("#h1").html(card.b)
			$("#summary").html(summary_html);
			$("#xiaobian").html(xiaobian_html);
			$("#suipian").html(suipian_html);
			$("#jineng").html(jineng_html);
			$("#suming").html(suming_html);
			$("#chujishuxing").html(chujishuxing_html);
		},
		printindex: function(){//打印列表首页
			var datacards = this.datacards,
			len = datacards.length,
			card,
			navindex = 0,
			html = '';
			
			navindex = Number(this.getsession("wbgl-quanhuang98-navindex"));
			$("#nav li").eq(navindex).addClass("on").siblings().removeClass("on");
			
			for(var i=0; i<len; i++){
				card = datacards[i];
				if(navindex == 0 || navindex == card.c){
					html += '<li data-id="'+card.a+'">'+
								'<div class="pic">'+
									'<img src="'+this.o.url+'quanhuang98-indexlist-bg.png">'+
									'<div class="img" style="background-image:url('+this.o.url+'DBPic/'+card.e+')"></div>'+
									'<div class="mask"></div>'+
								'</div>'+
								'<div class="name">'+card.b+'</div>'+
							'</li>';
				}
			}
			
			$("#indexlist").html(html);
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
						$("#nav").parent().addClass("nav_ios");
					}
				break;
				case "detail":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","index.html");
					}else if(this.o.platform == "ios"){
						$("#summary").addClass("summary_ios");
					}
				break;
			}
		},
		events: function(){
			var that = this;
			
			$("#nav li").click(function(){
				var navindex = Number($(this).attr("data-navindex"));
				
				that.setsession("wbgl-quanhuang98-navindex", navindex);
				that.printindex();
			});
			$("#indexlist").on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));
				
				that.setsession("wbgl-quanhuang98-card", _id);
				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-quanhuang98-detail.html';
				}else{
					location.href = 'data-quanhuang98-detail.html';
				}
			});
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					this.printindex();
					break;
				case (href == "detail"):
					this.isplatform("detail");
					this.printdetail();
					break;
			}
		},
		init: function(){
			this.ispage();
			this.events();
		}
	};
	
	window.Quanhuang98 = Quanhuang98;
})(window);

/*
a:id
b:名字
c:类别 1攻 2防 3技
d:碎片名称1_1.png
e:大图片名称1.png
f:定位
g:怒气特性
h:资质
i:星星
j:小编点评
k:碎片出处["精英描述1","精英描述2","精英描述3"]
l:技能[{"img":"1_1.png","name":"","des":"","label":""}]
m:宿命[{"name":"","des":""}]
n:初级属性[攻击,攻击成长,防御,防御成长,生命,生命成长]


[[{"a":123,"b":"曹子敬","c":1,"d":"xx.jpg","e":"xx.png","f":"定位描述","g":"怒气特性描述","h":"资质描述","i":3,"j":"小编点评描述","k":["精英描述1","精英描述2","精英描述3"],"l":[{"img":"../","name":"寒冰箭","des":"对单体...","label":"主动释放"},{"img":"../","name":"寒冰箭","des":"对单体...","label":"主动释放"}],"m":[{"name":"拳皇五小强","des":"对单体.."},{"name":"拳皇五小强","des":"对单体.."}],"n":[180,1.25,150,1.12,1000,1.41]}],[],[]]
*/