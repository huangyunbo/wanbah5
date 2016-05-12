(function(window){
	var SwxfHero = function(){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {
			platform:"web",
			plugin:"plugin_1307",//plugin_1307			
			url:"images/shouwangxianfeng/",
			type:0,//英雄类别数组下标
			piece:{}//英雄单个详情object
		};
		if(this.o.platform == "android"){
			this.o.url="../images/shouwangxianfeng/";
		}
		this.init();
	};
	
	SwxfHero.prototype = {	

		findType:function(id){//全局查找英雄类型
			var that = this,
			mData = that.data,
			mPiece='',
			mType = '';
			for(var i=0;i<mData.length;i++){
				for(var j=0;j<mData[i].data.length;j++){					
					if(id == mData[i].data[j].id){
						mPiece = mData[i].data[j];	
						mType = mData[i].loca;										
						break;
					}
				}
			}
			return mType;
		},

		findHero:function(id){//全局查找英雄
			var that = this,
			mData = that.data,
			mPiece = '';
			for(var i=0;i<mData.length;i++){
				for(var j=0;j<mData[i].data.length;j++){					
					if(id == mData[i].data[j].id){
						mPiece = mData[i].data[j];						
						break;
					}
				}
			}
			return mPiece;
		},

		printHerodetail: function(id){//打印英雄详情
			var that = this,
				type = this.o.type,
				html_top_right = '',
				html_skills_head = '',
				html_skills_content = '',
				html_exp = '',
				piece;

				piece = that.findHero(id);
				this.o.piece = piece;

				if(piece === undefined) return;				
				$("#nickname").html(piece.title);
				$("#location").html("定位："+piece.loca);
				$("#name").html("名字："+piece.name);
				$("#age").html("年龄："+piece.age);
				$("#profession").html("职业："+piece.job);
				$("#actionbase").html("行动基地："+piece.base);
				$("#subjection").html("隶属："+piece.sub);

				html_top_right = '<div class="d_word">'+piece.lines+'</div>'+
								  '<div class="pic"><img src="'+this.o.url+'detail/'+piece.id+'.jpg"></div>'+
								  '<div>'+
									  '<div class="property">'+
										  '<span class="describle">生命值：</span>'+
										  '<span class="value">'+piece.life+'</span>'+
									  '</div>'+
									  '<div class="property">'+
										  '<span class="describle">护甲值：</span>'+
										  '<span class="value">'+piece.armor+'</span>'+
									  '</div>'+
								  '<div>';
				$("#right").html(html_top_right);	

				for(var i=0; i<piece.skilln.length; i++){//英雄技能
					html_skills_head += '<li>'+
											'<div><img src="'+this.o.url+'skill/'+id+'_'+(i+1)+'.png" class="icon_bg"></div>'+
										'</li>';					
					html_skills_content += '<div class="item">'+
												'<div class="skillname">'+piece.skilln[i]+'</div>'+
												'<img class="video" id="video" src="'+this.o.url+'video/'+id+'_'+(i+1)+'.jpg">'+
												'<div class="skilldes">'+piece.skilld[i]+
											'</div>';
					html_skills_content += '</div>';
				}

				for(var i=0;i<piece.exp.length;i++){
					html_exp += '<div class="d_exp"><div class="dot"></div><span class="des_exp">'+piece.exp[i]+'</span></div>';
				}
				
				$("#exp").html(html_exp);
				$("#skills_head").html(html_skills_head);
				$("#skills_content").html(html_skills_content);



				$("#story_cont").html(piece.story);                


		},
		htmlHerodetail: function(){//英雄详情			
			var that = this,
				id = Number(this.getsession("wbgl-shouwangxianfeng-hero-id"));				
			that.printHerodetail(id);

			$("#skills_head").on("click", "li",function(){
				var _index = $(this).parents().children().index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				$("#skills_content").children().siblings().removeClass("on").eq(_index).addClass("on");
				
			}).children("li").eq(0).trigger("click");
			//攻略跳转
			$("#gonglue").on("click",function(){
				console.log(that.o.piece.groupid);
				that.gopage('{"pageid":2,"param1":'+that.o.piece.groupid+',"title":'+that.o.piece.title+',"gameid":111,"flag":0}');
			});
		},
		gopage: function(){//跳转app攻略
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
		printIndex: function(){//打印英雄列表
			var piece,
				html_head = '',
				html_content = '',
				html_content_temp = '',
				html_content_all = '';
			
			for(var i=0; i<this.data.length; i++){
				if(i == 0){
					html_head += '<div class="item">全部</div>';
				}
				html_head += '<div class="item">'+this.data[i].typ+'</div>';
				html_content += '<ul>';
				html_content_temp = '';
				for(var j=0; j<this.data[i].data.length; j++){
					piece = this.data[i].data[j];
					html_content_temp += '<li data-id="'+piece.id+'" data-type="'+i+'"><img src="'+this.o.url+'dbpic/'+piece.id+'.jpg"></li>';
					
				}
				html_content += html_content_temp;
				html_content_all += html_content_temp;
				html_content += '</ul>';
			}
			
			html_content_all = '<ul>' + html_content_all + '</ul>' + html_content;
			
			$("#herolist_head").html(html_head);
			$("#herolist_content").html(html_content_all);

		},
		htmlIndex: function(){//英雄列表
			var that = this,
				$herolist_head = $("#herolist_head"),
				$herolist_content = $("#herolist_content"),
				tindex = Number(that.getsession("wbgl-shouwangxianfeng-hero-tindex"));
			
			that.printIndex();
			
			$herolist_head.on("click", ".item", function(){
				tindex = $herolist_head.children().index(this);
				that.setsession("wbgl-shouwangxianfeng-hero-tindex",tindex);
				$herolist_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$herolist_content.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(tindex).trigger("click");
			
			$herolist_content.on("click", "li", function(){
				var _id = Number($(this).attr("data-id")),
					_herotype = Number($(this).attr("data-type"));
				
				that.setsession("wbgl-shouwangxianfeng-hero-id",_id);
				that.setsession("wbgl-shouwangxianfeng-hero-type",_herotype);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-shouwangxianfeng-hero-detail.html';
				}else{
					location.href = 'data-shouwangxianfeng-hero-detail.html';
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
					if(this.o.platform == "web"){
						removehide();						
					}else if(this.o.platform == "android"){
						removehide();						
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
					this.htmlIndex();
					break;
				case (href == "herodetail.html"):
					this.isplatform("herodetail");
					this.htmlHerodetail();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.SwxfHero = SwxfHero;
})(window);


/*
第1数组 战士
第2数组 法师
第3数组 肉盾
第4数组 辅助


[{"tid":1,"tname":"战士","data":[{"id":1,"title":"精灵女神",name:"狄安娜","pos":"近战 肉盾 攻击型","label":["治疗","辅助","AOE2"],"pie":[3,9,2,5],"aword":"具备高伤害的远程战士，攻击范围远且上手难度低","groom":"让他的普通攻击获得了吸血效果的加成，配合技能撕裂的被动，让他在打野的时候可以做到几乎无损耗!迅速的清野效果加上技能扑击的范围性眩晕。","equip":[1,2,3,4,5,6],"addskill":[1,2,3,4,1,2,3,4,1,2],"graphical":[1,2,3,10],"figure":{"shengming":[645,2],"gongji":[64,4],"fashu":[5,6],"hujia":[7,8],"fakang":[9,10],"shenghui":[11,12]},"sname":["虚拟一击1","虚拟一击2","虚拟一击3","虚拟一击4"],"sdesc":["每当...","每当...","每当...","每当..."],"sintro":["技能描述朵朵","技能描述朵朵","技能描述朵朵","技能描述朵朵"],"svideo":[],"suipian":18,"zuanshi":-1,"getsuipian":["挑战模式3","闯关模式"],"story":"故事..."}]}];
*/
