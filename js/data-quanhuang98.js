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
a:id
b:名字
c:头像名称
d:大图片名称
e:定位
f:怒气特性
g:资质
h:星星
i:小编点评
j:碎片出处["精英描述1","精英描述2","精英描述3"]
k:技能[{"img":"","name":"","des":"","label":""}]
l:宿命[{"name":"","des":""}]
m:初级属性[攻击,攻击成长,防御,防御成长,生命,生命成长]


[[{"a":123,"b":"曹子敬","c":"xx.jpg","d":"xx.png","e":"定位描述","f":"怒气特性描述","g":"资质描述","h":3,"i":"小编点评描述","j":["精英描述1","精英描述2","精英描述3"],"k":[{"img":"../","name":"寒冰箭","des":"对单体...","label":"主动释放"},{"img":"../","name":"寒冰箭","des":"对单体...","label":"主动释放"}],"l":[{"name":"拳皇五小强","des":"对单体.."},{"name":"拳皇五小强","des":"对单体.."}],"m":[180,1.25,150,1.12,1000,1.41]}],{},{}]
*/