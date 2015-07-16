//2015-07-16
(function(window){
	var LscsKa = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {job:"zhongli",url:"images/lushichuanshuo/",cards:[]};

		this.init();
	}
	
	LscsKa.prototype = {
		switchjob:function(){
			switch(arguments[0]){
				case "zhongli":return 0;
				case "deluyi":return 1;
				case "lieren":return 2;
				case "fashi":return 3;
				case "shengqishi":return 4;
				case "mushi":return 5;
				case "qianxingzhe":return 6;
				case "saman":return 7;
				case "mushi":return 8;
				case "zhanshi":return 9;
			}
		},
		printdetail: function(){//打印卡牌
			var cardshtml = '',
			_datacards = this.datacards[this.switchjob(this.o.job)].b;
			for(var i=0; i<_datacards.length; i++){
				cardshtml += '<div class="item" data-id="'+_datacards[i].c+'">'+
								'<div class="pic"><div style="background-image:url('+this.o.url+'DBPic/79_'+_datacards[i].c+'_thumb.png)"></div><img src="'+this.o.url+'ka-defaultpic.png"></div>'+
								'<div class="zoom"></div>'+
								'<p>'+_datacards[i].d+'</p>'+
							'</div>';
			}
			$("#maincard").html(cardshtml);
		},
		setkaaddboxbg:function(){//设置添加卡牌右侧顶部职业旗帜
			$("#ka_add_box").removeClass().addClass("box "+this.o.job);
		},
		addcardlist: function(){//增加卡牌进列表
			var _html = '',
			cardid = Number(arguments[0]),
			_datacards = this.datacards[this.switchjob(this.o.job)].b;
			
			for(var i=0; i<_datacards.length; i++){//追加进数组
				if(_datacards[i].c == cardid){
					this.o.cards.push(_datacards[i]);
				}
			}
			this.o.cards.sort(function(a,b){
				return a.e - b.e;
			});
			for(var i=0; i<this.o.cards.length; i++){
				_html += '<div class="item" data-id="'+this.o.cards[i].c+'">'+
							'<i class="hero" style="background-image:url('+this.o.url+'DBPic/79_'+this.o.cards[i].c+'_thumb.png);"></i>'+
							'<i class="mask"></i>'+
							'<i class="num num_'+this.o.cards[i].e+'"><span></span></i>'+
							'<p>'+this.o.cards[i].d+'</p>'+
						'</div>';
			}
			
			$("#ka_add_content").html(_html);
			this.Numcardlist();
		},
		Numcardlist: function(){//显示卡牌数量0/30
			$("#ka_add_num").html(this.o.cards.length+"/30");
		},
		removecardlist: function(){//移除卡牌列表
			var cardid = Number(arguments[0]);
			for(var i=0; i<this.o.cards.length; i++){
				if(this.o.cards[i].c == cardid){
					this.o.cards.splice(i,1);
					$("#ka_add_content").children().eq(i).remove();
					this.Numcardlist();
					break;
				}
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			var _href = location.href;
			switch(true){
				case _href.indexOf("index") != -1:
					
					break;
				case _href.indexOf("job") != -1:
					
					break;
				case _href.indexOf("detail") != -1:
					this.o.job = sessionStorage.getItem("job");
					this.setkaaddboxbg();
					this.printdetail();
					
					break;
				case _href.indexOf("mycardlist") != -1:
					
					break;
				case _href.indexOf("mycards") != -1:
					
					break;
			}
		},
		events: function(){
			var that = this;
			//选择职业
			$("#ka_switch .item").click(function(){
				sessionStorage.setItem("job",$(this).attr("data-job"));
				location.href = 'data-lushichuanshuo-ka-detail.html';
			});
			//添加卡牌
			$("#maincard").on("click", ".item", function(){
				that.addcardlist($(this).attr("data-id"));
			});
			//移除卡牌
			$("#ka_add_content").on("click", ".item", function(){
				that.removecardlist($(this).attr("data-id"));
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