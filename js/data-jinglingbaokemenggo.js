(function(window){
	var Jinglingbaokemenggo = function(){
		//if(arguments[0] === undefined) return false;
		//this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {platform:"web",plugin:"plugin_1382",url:"images/jinglingbaokemenggo/"};
		if(this.o.platform == "android"){
			this.o.url="../images/jinglingbaokemenggo/";
		}
		this.init();
	};
	
	Jinglingbaokemenggo.prototype = {
		htmlIndex: function(){
			var that = this;
			
			$("#menu_item_1").click(function(){
				that.gopage('{"pageid":10,"param1":"http://www.iyingdi.com/pokedex/index.html"}');
			});
			$("#menu_item_2").click(function(){
				that.gopage('{"pageid":10,"param1":"http://www.iyingdi.com/pmgocp/index.html"}');
			});
			$("#menu_item_3").click(function(){
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-jinglingbaokemenggo-manual.html';
				}else{
					location.href = 'data-jinglingbaokemenggo-manual.html';
				}
			});
		},
		gopage: function(){
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
				$("#header").next().addClass("mt_45");
			}
			
			switch(i){
				case "index":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}
					break;
				case "manual":
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
				case (href == "index"):
					this.isplatform("index");
					this.htmlIndex();
					break;
				case (href == "manual"):
					this.isplatform("manual");
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.Jinglingbaokemenggo = Jinglingbaokemenggo;
})(window);

