(function(window){
	var Vainglory = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {platform:"web",url:"images/vainglory/"};
		if(this.o.platform == "android"){
			this.o.url="../images/vainglory/";
		}
		this.init();
	};
	
	Vainglory.prototype = {

		htmlIndex: function(){
			var that = this,
				tlocation = 0,
				tduty = 0,
				tprice = 0;
			this.printIndex(tlocation,tduty,tprice);			

			$("#herolist_nav_top").children().click(function(){
				var self = $(this),
				_index = $("#herolist_nav_top").children().index(self);
				self.toggleClass("on").siblings().removeClass("on");
				$("#herolist_nav_select").children().eq(_index).toggleClass("on").siblings().removeClass("on");



			});

			$("#hero_location").children().click(function(){
				var self = this;				
				$("#hero_location").removeClass("on");	
				tlocation = $("#hero_location").children().index(self);		
				that.printIndex(tlocation,tduty,tprice);
				$("#herolist_nav_top").children().eq(0).children("span").html($(self).text());

			});
			$("#hero_duty").children().click(function(){
				var self = this;				
				$("#hero_duty").removeClass("on");	
				tduty = $("#hero_duty").children().index(self);				
				that.printIndex(tlocation,tduty,tprice);	
				$("#herolist_nav_top").children().eq(1).children("span").html($(self).text());			
			});
			$("#hero_price").children().click(function(){
				var self = this;				
				$("#hero_price").removeClass("on");		
				tprice = $("#hero_price").children().index(self);			
				that.printIndex(tlocation,tduty,tprice);	
				$("#herolist_nav_top").children().eq(2).children("span").html($(self).text());		
			});
		},


		

		printIndex: function(mloction,mduty,mprice){//打印英雄列表
			var hero_data,				
				html_content_temp='';	




			function getLocation(i){
				switch(i){
					case 1:
					return "zhanshi";
					case 2:
					return "huweizhe";
					case 3:
					return "cike";
					case 4:
					return "sheshou";
					case 5:
					return "fashi";
				}
			}

			// var a = [{k:'c3',v:3},{k:'c1',v:1},{k:'c5',v:5},{k:'c9',v:9},{k:'c7',v:7},{k:'c11',v:11},{k:'c1',v:1},{k:'c20',v:20},{k:'c2',v:2}];			
			function sortNumber(a,b)
			{				
				return a.honor - b.honor;
			}			
			this.data.sort(sortNumber);			
			for(var i=0; i<this.data.length; i++){
				hero_data = this.data[i];
				if((mloction == 0 || mloction == hero_data.location) && (mduty == 0 || mduty == hero_data.duty)){		
					html_content_temp += '<li data-id="1">'+
								        '<div class="img">'+
								          '<img src="'+this.o.url+'dbpic/image_'+hero_data.id+'.jpg">'+
								        '</div>'+	
								        '<div class="name">'+
								          '<i class="icon_heroitem icon_jobs icon_jobs_'+getLocation(hero_data.location)+'"></i>'+hero_data.name+
								        '</div>'+
								        '<div class="gold">'+
								          '<span>'+
								            '<i class="icon_heroitem icon_honor"></i>'+hero_data.honor+   
								          '</span>'+
								          '<span>'+
								            '<i class="icon_heroitem icon_ice"></i>'+hero_data.ice+
								          '</span>'+
								        '</div>'+
								      '</li>';
				}								     
			}
			$("#heroitem").children().html(html_content_temp);			
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
						$("#container").addClass("mt_0");
					}
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					this.htmlIndex();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.Vainglory = Vainglory;
})(window);

