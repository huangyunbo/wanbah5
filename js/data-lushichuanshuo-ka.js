//2015-07-16
(function(window){
	var LscsKa = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {job:"zhongli"};

		this.init();
	}
	
	LscsKa.prototype = {
		ispage: function(){
			var _href = location.href;
			console.log(_href.indexOf("ka-detail"));
			switch(true){
				case _href.indexOf("ka-detail"):
					console.log(1);
					sessionStorage.setItem("page","data-lushichuanshuo-ka.html");
					break;
			}
		},
		goPage: function(){
			switch(sessionStorage.getItem("page")){
				case "ka":
					break;
				case "job":
					break;
				case "detail":
					break;
				case "mycardlist":
					break;
				case "mycards":
					break;
			}
		},
		events: function(){
			var that = this;
			//data-lushichuanshuo-ka-job.html
			$("#ka_switch .item").click(function(){
				sessionStorage.setItem("job",$(this).attr("data-job"));
				location.href = 'data-lushichuanshuo-ka-detail.html';
			});
			//data-lushichuanshuo-ka-detail.html
			$("#header").click(function(){
				
				//location.href = 'data-lushichuanshuo-ka-detail.html';
			});
			//data-lushichuanshuo-ka-mycardlist.html
			$("#ka_my .ka_mycard").click(function(){
				
				//location.href = 'data-lushichuanshuo-ka-detail.html';
			});
			
		},
		init: function(){
			var win_h = $(window).height(),
			body_h = $("body").height();
			
			if(win_h > body_h){
				$(".ka_body").height(win_h);
			}
			$("#maincard").height(win_h-86);//data-lushichuanshuo-ka-detail.html
			
			this.ispage();
			this.events();
			
			
		}
	}
	
	window.LscsKa = LscsKa;
})(window);

/*
a:卡牌组类别名称
b:data
c:卡牌id
d:卡牌名称
e:费法力
f:稀有度 //1:免费 2:普通 3.稀有 4.史诗 5.传说
g:构筑评分
h:竞技场评分
i:画师语录

var data_cards = [{a:"zhongli",b:[{c:123,d:"恐怖的奴隶主",e:1,f:1,g:9,h:6,i:"有些德鲁伊做梦的时候都会被陌生人的“给我个激活！”的喊叫声惊醒"},{}]}];

*/