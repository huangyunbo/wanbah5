(function(window){
	var BoombeachDefense = function(){
		
		this.data = [{"k":"三本推荐阵型","gid":1171,"img":"31_1.png"},{"k":"四本推荐阵型","gid":1172,"img":"31_1.png"},{"k":"五本推荐阵型","gid":1173,"img":"31_1.png"},{"k":"六本推荐阵型","gid":1174,"img":"31_1.png"},{"k":"七本推荐阵型","gid":1175,"img":"31_2.png"},{"k":"八本推荐阵型","gid":1176,"img":"31_2.png"},{"k":"九本推荐阵型","gid":1177,"img":"31_2.png"},{"k":"十本推荐阵型","gid":1178,"img":"31_2.png"},{"k":"十一本推荐阵型","gid":1179,"img":"31_3.png"},{"k":"十二本推荐阵型","gid":1180,"img":"31_3.png"},{"k":"十三本推荐阵型","gid":1181,"img":"31_3.png"},{"k":"十四本推荐阵型","gid":1182,"img":"31_4.png"},{"k":"十五本推荐阵型","gid":1183,"img":"31_4.png"},{"k":"十六本推荐阵型","gid":1184,"img":"31_4.png"},{"k":"十七本推荐阵型","gid":1185,"img":"31_4.png"},{"k":"十八本推荐阵型","gid":1186,"img":"31_5.png"},{"k":"十九本推荐阵型","gid":1187,"img":"31_5.png"},{"k":"二十本推荐阵型","gid":1188,"img":"31_6.png"},{"k":"二十一本推荐阵型","gid":1189,"img":"31_7.png"}] 

		this.o = {
			platform:"web",			
			plugin_defense:"plugin_714",
			url:"images/boombeach/"			
				
		};
		if(this.o.platform == "android"){
			this.o.url="../images/boombeach/";
		}
		this.init();
	};
	
	BoombeachDefense.prototype = {

		printDefenseBen:function(){			
			var html_ben = '',
			r_data = this.data.reverse();

			for(var i=0;i<r_data.length;i++){
				html_ben += '<li>'+
				'<a href="javascript:;" class="a" data-title="'+r_data[i].k+'" data-id="'+r_data[i].gid+'">'+
				'<div class="img"><img src="'+this.o.url+'building/'+r_data[i].img+'"></div>'+
				'<div class="note">'+
				'<h2>'+r_data[i].k+'</h2>'+
				'</div><div class="look"><i class="icon"></i></div></a></li>'
			}
			$("#ul_ben").html(html_ben);
			this.eventsBen();
		},

		printDefenseList:function(err, list_data, totalCount){		
			var html_ben_list = ''
				title = '',
				that = this,
				h_pic='';				
			if(err === 0){
				$("#defense_datalist").addClass("no_net").html("网络错误");
				return;
			}			
			title = that.getsession("wbgl-boombeach-ben-title");
			if(list_data.data.length > 0){	
				for(var i=0;i<list_data.data.length;i++){
					if(list_data.data[i].thumbPicName.trim().length>0){
						h_pic='<div class="d_img"><img src="'+list_data.data[i].thumbPicName+'"></div>';
					}
					html_ben_list += '<li>'+
					'<a class="item" list-data-id="'+list_data.data[i].Id+'">'+
					h_pic+
					'<div class="note">'+
					'<h2>'+list_data.data[i].Title+'</h2>'+
					'</div></a></li>'					
				}
				//分页请求
				if(list_data.data.length > 10){
					$("#lookmore").attr("data-startpage", totalCount);
					html_ben_list += '<a href="javascript:;" class="lookmore" id="lookmore" data-startpage="'+totalCount+'">点击加载更多</a>';
				}
			}else{
				if(totalCount == 0){
					html_ben_list = "暂无数据";
					$("#defense_datalist").addClass("no_net");
				}else{
					$("#lookmore").html("没有更多了");
				}
			}			
			$("#defense_datalist").html(html_ben_list);		
			$("#list_title").html(title);	
			this.eventsList();
		},

		printDefenseDetail:function(err, detail_data){			
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

		eventsBen:function(){	
			var that = this;			
			$(".a").click(function(){
				var id = Number($(this).attr("data-id")),
				date_title = ($(this).attr("data-title"));	

				that.setsession("wbgl-boombeach-ben-id", id);
				that.setsession("wbgl-boombeach-ben-title", date_title);					
				if(that.o.platform == "ios"){
					location.href = that.o.plugin_defense+'/data-boombeach-defense-list.html';
				}else{
					location.href = 'data-boombeach-defense-list.html';
				}			
			});				
		},

		eventsList:function(){
			var that = this;
			$(".item").click(function(){
				var list_id = Number($(this).attr("list-data-id"));				
				that.setsession("wbgl-boombeach-ben-list-id", list_id);					
				if(that.o.platform == "ios"){
					location.href = that.o.plugin_defense+'/data-boombeach-defense-details.html';
				}else{
					location.href = 'data-boombeach-defense-details.html';
				}		
			});

			$("#lookmore").click(function(){
			    var $self = $(this),
			    	that = this,
			        totalCount = Number($self.attr("data-startpage"))+10;
			        that.getDefenseListData(totalCount);
			});
		},

		getDefenseDetailData:function(){
			var that = this,
			list_id = that.getsession("wbgl-boombeach-ben-list-id");			
			$.getJSON('http://m.wanba123.cn/h5data/detail?jsoncallback=?', {
					tid: list_id
				}).done(function(data){										
					that.printDefenseDetail(data.code, data);										
				}).fail(function(){					
					$("#container").addClass("no_net").html("网络错误");
				});
		},

		getDefenseListData:function(totalCount){
			
			var that = this;
			var id = that.getsession("wbgl-boombeach-ben-id");			
			$.getJSON('http://m.wanba123.cn/h5data/gonglue?jsoncallback=?', {
					groupid: id,
					startpage: totalCount
				}).done(function(data){						
					that.printDefenseList(data.code, data, totalCount);									
				}).fail(function(){					
					$("#defense_datalist").addClass("no_net").html("网络错误");
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
				case "defense-ben":	
					if(this.o.platform == "web"){
						removehide();						
					}else if(this.o.platform == "android"){
						removehide();						
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}if(this.o.platform == "ios"){
						$("#selection").addClass("mt_0");
					}		
				break;							
				case "defense-list":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","index.html");				
					}else if(this.o.platform == "ios"){						
						$("#datalist").addClass("mt_0");
					}											
				break;
				case "defense-details":
					if(this.o.platform == "web"){
						removehide();						
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","data-boombeach-defense-list.html");		
					}else if(this.o.platform == "ios"){	
						$("#container").addClass("mt_0");					
					}
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			var that = this;
			if(!this.checkversion()) return;
			var href = $("body").attr("data-url");			
			switch(true){
				case (href == "defense-ben.html"):
					this.isplatform("defense-ben");					
					this.printDefenseBen();
					break;
				case (href == "defense-list.html"):
					this.isplatform("defense-list");
					this.getDefenseListData(0);					
					break;
				case (href == "defense-details.html"):
					this.isplatform("defense-details");
					this.getDefenseDetailData();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.BoombeachDefense = BoombeachDefense;
})(window);