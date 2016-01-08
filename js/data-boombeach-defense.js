(function(window){
	var BoombeachDefense = function(){
		
		this.data = [{"k":"三本推荐阵型","gid":1171,"img":"31_1.png"},{"k":"四本推荐阵型","gid":1172,"img":"31_1.png"},{"k":"五本推荐阵型","gid":1173,"img":"31_1.png"},{"k":"六本推荐阵型","gid":1174,"img":"31_1.png"},{"k":"七本推荐阵型","gid":1175,"img":"31_2.png"},{"k":"八本推荐阵型","gid":1176,"img":"31_2.png"},{"k":"九本推荐阵型","gid":1177,"img":"31_2.png"},{"k":"十本推荐阵型","gid":1178,"img":"31_2.png"},{"k":"十一本推荐阵型","gid":1179,"img":"31_3.png"},{"k":"十二本推荐阵型","gid":1180,"img":"31_3.png"},{"k":"十三本推荐阵型","gid":1181,"img":"31_3.png"},{"k":"十四本推荐阵型","gid":1182,"img":"31_4.png"},{"k":"十五本推荐阵型","gid":1183,"img":"31_4.png"},{"k":"十六本推荐阵型","gid":1184,"img":"31_4.png"},{"k":"十七本推荐阵型","gid":1185,"img":"31_4.png"},{"k":"十八本推荐阵型","gid":1186,"img":"31_5.png"},{"k":"十九本推荐阵型","gid":1187,"img":"31_5.png"},{"k":"二十本推荐阵型","gid":1188,"img":"31_6.png"},{"k":"二十一本推荐阵型","gid":1189,"img":"31_7.png"}] 

		this.o = {
			platform:"web",
			// plugin:"plugin_1101",//plugin_1101
			// plugin_equip:"plugin_1103",
			url:"images/boombeach/"			
				
		};
		if(this.o.platform == "android"){
			this.o.url="../images/boombeach/";
		}
		this.init();
	};
	
	BoombeachDefense.prototype = {

		printDefenseBen:function(){			
			var html_ben = '';
			for(var i=0;i<this.data.length;i++){
				html_ben += '<li>'+
				'<a href="javascript:;" class="a" data-id="'+this.data[i].gid+'">'+
				'<div class="img"><img src="'+this.o.url+'building/'+this.data[i].img+'"></div>'+
				'<div class="note">'+
				'<h2>'+this.data[i].k+'</h2>'+
				'</div><div class="look"><i class="icon"></i></div></a></li>'
			}
			$("#ul_ben").html(html_ben);
			this.eventsBen();
		},

		printDefenseList:function(list_data){		
			var html_ben_list = '';
			for(var i=0;i<list_data.data.length;i++){
				html_ben_list += '<li>'+
				'<a href="javascript:;" class="a" list-data-id="'+list_data.data[i].Id+'">'+
				'<div><img class="d_img" src="'+'http://res.wanba123.cn/pic/'+list_data.data[i].thumbPicName+'"></div>'+
				'<div class="d_note">'+
				'<h2>'+list_data.data[i].Title+'</h2>'+
				'</div></a></li>'
			}
			console.log("html_ben_list = "+html_ben_list);
			$("#defense_datalist").html(html_ben_list);			
			this.eventsList();
		},

		printDefenseDetail:function(){

		},

		eventsBen:function(){	
			var that = this;
			
			$(".a").click(function(){
				var id = Number($(this).attr("data-id"));				
				that.setsession("wbgl-boombeach-ben-id", id);				
				location.href = 'data-boombeach-defense-list.html';				
			});				
		},

		eventsList:function(){
			var that = this;
			$("a").click(function(){
				var list_id = Number($(this).attr("list-data-id"));
				console.log(list_id);
				that.setsession("wbgl-boombeach-ben-list-id", list_id);
				$.getJSON('http://m.wanba123.cn/h5data/article?jsoncallback=?', {
					artid: list_id
				}).done(function(data){
					console.log(data);
					if(data.code === 1){
						that.printDefenseDetail(data);
					}					
				}).fail(function(){
					console.log('失败');
				});
			});
		},

		getDefenseListData:function(){
			
			var that = this;
			var id = that.getsession("wbgl-boombeach-ben-id");
			console.log("id = "+id);
			$.getJSON('http://m.wanba123.cn/h5data/articlelist?jsoncallback=?', {
					groupid: id,
					startpage: 0
				}).done(function(data){					
					if(data.code === 1){
						that.printDefenseList(data);	
					}				
				}).fail(function(){
					console.log('失败');
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
			removehide();
			
			switch(i){
				case "defense-ben":	
				// if(this.o.platform == "web"){
				// 		removehide();						
				// 	}else if(this.o.platform == "android"){
				// 		removehide();						
				// 		$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
				// 	}else if(this.o.platform == "ios"){						
				// 		$("#herolist").addClass("mt_0");
				// 	}
				// 	$("#header").children(".back").attr("href","javascript:window.jstojava.close();");				
				case "defense-list":
				// if(this.o.platform == "web"){
				// 		removehide();						
				// 	}else if(this.o.platform == "android"){
				// 		removehide();						
				// 		$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
				// 	}else if(this.o.platform == "ios"){						
				// 		$("#herolist").addClass("mt_0");
				// 	}
				// 	$("#header").children(".back").attr("href","javascript:window.jstojava.close();");					
				break;
				case "defense-details":
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			var that = this;
			if(!this.checkversion()) return;
			var href = $("body").attr("data-url");
			console.log(href);
			switch(true){
				case (href == "defense-ben.html"):
					this.printDefenseBen();
					break;
				case (href == "defense-list.html"):
					this.getDefenseListData();					
					break;
				case (href == "defense-details.html"):
					this.printDefenseDetail();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.BoombeachDefense = BoombeachDefense;
})(window);