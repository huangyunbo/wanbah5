//2015-07-02
(function(window){
	var Lscs = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {type:0,manacost:0,url:"images/lushichuanshuo/",isSlidingHide:true,ratio:320};//type:9职业+中立 0-9,manacost:费法力 0-8,url:为android/ios准备,isSlidingHide:打开弹窗不需要开启隐藏上下

		this.init();
	}
	
	Lscs.prototype = {
		mana: function(){//费法力
			var _card = arguments[0];
			if(this.o.manacost == 0 || _card.e == this.o.manacost - 1){
				return true;
			}else if(this.o.manacost == 8 && _card.e > 7){
				return true;
			}
			return false;
		},
		printdatacard: function(){//打印卡牌
			var _html = '';
			_datacards = this.datacards[this.o.type].b,
			_url = this.o.url;

			for(var i=0; i<_datacards.length; i++){
				if(this.mana(_datacards[i])){
					_html += '<li data-id="'+_datacards[i].c+'"><div class="pic"><div style="background-image:url('+_url+'DBPic/79_'+_datacards[i].c+'_thumb.png)"></div><img src="'+_url+'ka-defaultpic.png"></div><p>'+_datacards[i].d+'</p></li>';
				}
			}
			
			$("#data_card").html(_html);
			$(".data_body").scrollTop(0);
			this.slidingHide();
		},
		printdialogcard: function(){//打印单张卡片弹窗
			var _id = Number(arguments[0]),
			_type = this.o.type,
			_datacards = this.datacards[_type].b,
			_html = '';
			
			function zy(){//判断职业 德鲁伊
				switch(_type){
					case 0:return "zhongli";
					case 1:return "deluyi";
					case 2:return "lieren";
					case 3:return "fashi";
					case 4:return "shengqishi";
					case 5:return "mushi";
					case 6:return "qianxingzhe";
					case 7:return "saman";
					case 8:return "shushi";
					case 9:return "zhanshi";
				}
			}
			
			function lev(){//判断级别 免费级
				var i = Number(arguments[0]);
				switch(i){
					case 1:return '<div class="lev lev_free"><i></i>免费级</div>';
					case 2:return '<div class="lev lev_white"><i></i>普通级</div>';
					case 3:return '<div class="lev lev_blue"><i></i>稀有级</div>';
					case 4:return '<div class="lev lev_purple"><i></i>史诗级</div>';
					case 5:return '<div class="lev lev_orange"><i></i>传说级</div>';
				}
			}
			
			for(var i=0; i<_datacards.length; i++){
				if(_datacards[i].c == _id){
					_html = '<div class="pic"><img src="'+this.o.url+'DBPic/79_'+_id+'_thumb.png"></div>'+
						'<div class="zy '+zy()+'"></div>'+
						'<div class="line1">'+
							'<div class="name">'+_datacards[i].d+'</div>'+
							lev(_datacards[i].f)+
						'</div>'+
						'<div class="line2">'+
							'<div class="l"><span class="k">构筑评分</span>'+_datacards[i].g+'</div>'+
							'<div class="r"><span class="k">竞技场评分</span>'+_datacards[i].h+'</div>'+
						'</div>'+
						'<div class="line3">'+
							'<div><span class="k">画师语录</span></div>'+
							'<p>'+_datacards[i].i+'</p>'+
						'</div>';
				}
			}
			
			$("#dialogcard").html(_html).removeClass("hide");
		},
		slidingHide: function(){//滑动隐藏上下
			
			if(document.documentElement.clientHeight < document.body.clientHeight - 138){
				var that = this,
					touchStarY,
					touchMoveY,
					distanceY,
					$data_type = $("#data_type"),
					$data_fei = $("#data_fei");
					
				document.addEventListener("touchstart",function(e){
					touchStarY = e.targetTouches[0].pageY;
				},false);
				
				document.addEventListener("touchmove",function(e){
					touchMoveY = e.targetTouches[0].pageY;
					distanceY = touchStarY - touchMoveY;
					
					if(distanceY > 10 && document.documentElement.scrollTop + document.body.scrollTop >= 88 && that.o.isSlidingHide){//下滑隐藏，顶部预留88px不隐藏，且兼容ie和ff
						if(that.o.ratio == 320){
							$data_type.stop(true,true).animate({
								top: -38
							});
							$data_fei.stop(true,true).animate({
								bottom: -35
							});
						}else{
							$data_type.stop(true,true).animate({
								top: -108
							});
							$data_fei.stop(true,true).animate({
								bottom: -70
							});
						}
						
					}
					if(distanceY < -10 && that.o.isSlidingHide){//上划展示
						$data_type.stop(true,true).animate({
							top: 50
						});
						$data_fei.stop(true,true).animate({
							bottom: 0
						});
					}
				},false);
			}
		},
		calcw: function(){
			var window_w = $(window).width();
			if(window_w < 768){
				this.o.ratio = 320;
			}else{
				this.o.ratio = 768;
			}
		},
		events: function(){
			var that = this;
			
			$(window).resize(function(){
                that.calcw();
            });
			//点击中立+9职业
			$("#data_type li").click(function(){
				var _index = $("#data_type li").index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				that.o.type = _index;
				
				that.printdatacard();
			});
			//点击费
			$("#data_fei").children().click(function(){
				var _index = $("#data_fei").children().index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				that.o.manacost = _index;
				that.printdatacard();
			});
			//单张卡片弹窗
			$("#data_card").on("click", "li", function(){
				$("body").css("overflow-y","hidden");
				that.o.isSlidingHide = false;
				that.printdialogcard($(this).attr("data-id"));
				
			});
			//关闭单张卡片弹窗
			$("#dialogcard").click(function(){
				$("body").css("overflow-y","auto");
				that.o.isSlidingHide = true;
				$(this).addClass("hide");
			});
		},
		init: function(){
			this.calcw();
			this.events();
			$("#data_type li").eq(0).trigger("click");
		}
	}
	
	window.Lscs = Lscs;
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