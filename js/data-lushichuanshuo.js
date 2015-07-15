(function(window){
	var Lscs = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {type:0,manacost:0,url:"images/lushichuanshuo/"};

		this.init();
	}
	
	Lscs.prototype = {
		mana: function(){//费法力
			var _card = arguments[0];
			if(this.o.manacost == 0 || _card.d == this.o.manacost - 1){
				return true;
			}else if(this.o.manacost == 8 && _card.d > 7){
				return true;
			}
			return false;
		},
		printdatacard: function(){//打印卡牌
			var _html = '';
			_datacards = this.datacards[this.o.type].data,
			_url = this.o.url;

			for(var i=0; i<_datacards.length; i++){
				if(this.mana(_datacards[i])){
					_html += '<li data-id="'+_datacards[i].b+'"><div class="pic"><div style="background-image:url('+_url+'DBPic/79_'+_datacards[i].b+'_thumb.png)"></div><img src="'+_url+'ka-defaultpic.png"></div><p>'+_datacards[i].c+'</p></li>';
				}
			}
			
			$("#data_card").html(_html);
		},
		printcard: function(){//打印单张卡片弹窗
			var _id = Number(arguments[0]),
			_type = this.o.type,
			_datacards = this.datacards[_type].data,
			_html = '';
			
			function zy(){
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
			
			for(var i=0; i<_datacards.length; i++){
				if(_datacards[i].b == _id){
					_html = '<div class="pic"><img src="'+this.o.url+'DBPic/79_'+_id+'_thumb.png"></div>'+
						'<div class="zy '+zy()+'"></div>'+
						'<div class="line1">'+
							'<div class="name">'+_datacards[i].c+'</div>'+
							'<div class="lev lev_orange"><i></i>免费级</div>'+
						'</div>'+
						'<div class="line2">'+
							'<div class="l"><span class="k">构筑评分</span>'+_datacards[i].f+'</div>'+
							'<div class="r"><span class="k">竞技场评分</span>'+_datacards[i].g+'</div>'+
						'</div>'+
						'<div class="line3">'+
							'<div><span class="k">画师语录</span></div>'+
							'<p>'+_datacards[i].h+'</p>'+
						'</div>';
				}
			}
			
			$("#dialogCard").html(_html);
		},
		events: function(){
			var that = this;
			//点击中立+9职业
			$("#data_type").children().click(function(){
				var _index = $("#data_type").children().index($(this));
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
				that.printcard($(this).attr("data-id"));
				$("#dialogCard").removeClass("hide");
			});
			//关闭单张卡片弹窗
			$("#dialogCard").click(function(){
				$(this).addClass("hide");
			});
		},
		init: function(){
			this.events();
			$("#data_type").children().eq(0).trigger("click");
		}
	}
	
	window.Lscs = Lscs;
})(window);

/*
a:卡牌组类别
b:卡牌id
c:卡牌名称
d:费法力
e:稀有度
f:构筑评分
g:竞技场评分
h:画师语录

var data_cards = [{a:"中立",data:[{b:123,c:"恐怖的奴隶主",d:1,e:1,f:9,g:6,h:"有些德鲁伊做梦的时候都会被陌生人的“给我个激活！”的喊叫声惊醒"},{}]}];

*/