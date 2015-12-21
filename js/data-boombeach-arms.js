(function(window){
	var BoombeachArms = function(){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		console.log("this.data[0].cname = "+this.data[0].cname);
		
		this.o = {
			platform:"web",
			// plugin:"plugin_1101",//plugin_1101
			// plugin_equip:"plugin_1103",
			url:"images/boombeach/",
				
		};
		if(this.o.platform == "android"){
			this.o.url="../images/boombeach/";
		}
		this.init();
	};
	
	BoombeachArms.prototype = {

		htmlArms: function(){
			var that = this,
			$datalist_nav = &("#datalist_nav"),
			$data_content_item = &("#data_item");
		},

		htmlArmsDetails: function(){

		},

		printHeader: function(){

		}

		printArms: function(){

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
			
			// switch(i){
			// 	case "arms":
			// 		if(this.o.platform == "web"){
			// 			removehide();
			// 			this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
			// 		}else if(this.o.platform == "android"){
			// 			removehide();
			// 			this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
			// 			$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
			// 		}else if(this.o.platform == "ios"){
			// 			this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
			// 			$("#herolist").addClass("mt_0");
			// 		}
			// 	break;
			// 	case "arms-details":
			// 		if(this.o.platform == "web"){
			// 			removehide();
			// 			if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
			// 				$("#header").children(".back").attr("href","data-quanminchaoshen-equip-detail.html");
			// 			}
			// 		}else if(this.o.platform == "android"){
			// 			removehide();
			// 			if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
			// 				$("#header").children(".back").attr("href",'../'+this.o.plugin_equip+'/data-quanminchaoshen-equip-detail.html');
			// 			}else{
			// 				$("#header").children(".back").attr("href","index.html");
			// 			}
			// 		}
			// 	break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;
			var href = $("body").attr("data-url");
			switch(true){
				case (href == "arms.html"):
					this.isplatform("arms");
					this.htmlArms();
					break;
				case (href == "arms-details.html"):
					this.isplatform("arms-details");
					this.htmlArmsDetails();
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
第1数组 战士
第2数组 法师
第3数组 肉盾
第4数组 辅助


[{"tid":1,"tname":"战士","data":[{"id":1,"title":"精灵女神",name:"狄安娜","pos":"近战 肉盾 攻击型","label":["治疗","辅助","AOE2"],"pie":[3,9,2,5],"aword":"具备高伤害的远程战士，攻击范围远且上手难度低","groom":"让他的普通攻击获得了吸血效果的加成，配合技能撕裂的被动，让他在打野的时候可以做到几乎无损耗!迅速的清野效果加上技能扑击的范围性眩晕。","equip":[1,2,3,4,5,6],"addskill":[1,2,3,4,1,2,3,4,1,2],"graphical":[1,2,3,10],"figure":{"shengming":[645,2],"gongji":[64,4],"fashu":[5,6],"hujia":[7,8],"fakang":[9,10],"shenghui":[11,12]},"sname":["虚拟一击1","虚拟一击2","虚拟一击3","虚拟一击4"],"sdesc":["每当...","每当...","每当...","每当..."],"sintro":["技能描述朵朵","技能描述朵朵","技能描述朵朵","技能描述朵朵"],"svideo":[],"suipian":18,"zuanshi":-1,"getsuipian":["挑战模式3","闯关模式"],"story":"故事..."}]}];
*/
