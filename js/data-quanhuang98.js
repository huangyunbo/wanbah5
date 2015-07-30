//2015-07-30
(function(window){
	var Quanhuang = function(){
		
		//if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {platform:"web",plugname:"plugin_963",url:"images/lushichuanshuo/"};//platform:打包平台,platename:插件板块名,url:前缀路径
		if(this.o.platform == "android"){
			this.o.url="../images/lushichuanshuo/";
		}
		this.init();
	};
	
	Quanhuang.prototype = {


		checkversion: function(){//检查版本
			/*if(!window.localStorage){
				alert("错误，你的版本过低，请升级你的设备");
				return false;
			}*/
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
					}
				break;
				case "detail":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","index.html");
					}else if(this.o.platform == "ios"){
						removehide();
						$("#header").children(".back").attr("href",this.o.platename+"/index.html");
					}
				break;
			}
		},
		events: function(){
			var that = this;
			
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					break;
				case (href == "detail"):
					this.isplatform("detail");
					break;
			}
		},
		init: function(){
			this.ispage();
			this.events();
		}
	};
	
	window.Quanhuang = Quanhuang;
})(window);

/*


*/