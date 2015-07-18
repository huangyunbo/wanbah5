//2015-07-16
(function(window){
	var LscsKa = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {job:"zhongli",url:"images/lushichuanshuo/",cards:[],rarity:0,fei:0};//job:职业 url:前缀路径 cards:选中的卡牌 rarity:稀有度0所有 fei:费法力-1所有

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
			datacards = this.datacards[this.switchjob(this.o.job)].b,
			rarity = this.o.rarity,
			fei = this.o.fei;
			
			function leak(){
				var _rarity = arguments[0],
				_fei = arguments[1];
				
				switch(true){
					case (rarity==0 && fei==0):return true;
					case (rarity==0 && (fei==1 && (_fei==0 || _fei==1 || _fei==2))):return true;
					case (rarity==0 && (fei==2 && (_fei==3 || _fei==4))):return true;
					case (rarity==0 && (fei==3 && (_fei==5 || _fei==6))):return true;
					case (rarity==0 && (fei==4 && _fei>=7)):return true;
					
					case ((rarity==1 && _rarity==1) && fei==0):return true;
					case ((rarity==1 && _rarity==1) && (fei==1 && (_fei==0 || _fei==1 || _fei==2))):return true;
					case ((rarity==1 && _rarity==1) && (fei==2 && (_fei==3 || _fei==4))):return true;
					case ((rarity==1 && _rarity==1) && (fei==3 && (_fei==5 || _fei==6))):return true;
					case ((rarity==1 && _rarity==1) && (fei==4 && _fei>=7)):return true;
					
					case ((rarity==2 && _rarity==2) && fei==0):return true;
					case ((rarity==2 && _rarity==2) && (fei==1 && (_fei==0 || _fei==1 || _fei==2))):return true;
					case ((rarity==2 && _rarity==2) && (fei==2 && (_fei==3 || _fei==4))):return true;
					case ((rarity==2 && _rarity==2) && (fei==3 && (_fei==5 || _fei==6))):return true;
					case ((rarity==2 && _rarity==2) && (fei==4 && _fei>=7)):return true;
					
					case ((rarity==3 && _rarity==3) && fei==0):return true;
					case ((rarity==3 && _rarity==3) && (fei==1 && (_fei==0 || _fei==1 || _fei==2))):return true;
					case ((rarity==3 && _rarity==3) && (fei==2 && (_fei==3 || _fei==4))):return true;
					case ((rarity==3 && _rarity==3) && (fei==3 && (_fei==5 || _fei==6))):return true;
					case ((rarity==3 && _rarity==3) && (fei==4 && _fei>=7)):return true;
					
					case ((rarity==4 && _rarity==4) && fei==0):return true;
					case ((rarity==4 && _rarity==4) && (fei==1 && (_fei==0 || _fei==1 || _fei==2))):return true;
					case ((rarity==4 && _rarity==4) && (fei==2 && (_fei==3 || _fei==4))):return true;
					case ((rarity==4 && _rarity==4) && (fei==3 && (_fei==5 || _fei==6))):return true;
					case ((rarity==4 && _rarity==4) && (fei==4 && _fei>=7)):return true;
					
					case ((rarity==5 && _rarity==5) && fei==0):return true;
					case ((rarity==5 && _rarity==5) && (fei==1 && (_fei==0 || _fei==1 || _fei==2))):return true;
					case ((rarity==5 && _rarity==5) && (fei==2 && (_fei==3 || _fei==4))):return true;
					case ((rarity==5 && _rarity==5) && (fei==3 && (_fei==5 || _fei==6))):return true;
					case ((rarity==5 && _rarity==5) && (fei==4 && _fei>=7)):return true;
					default:return false;
				}
			}
			
			
			for(var i=0; i<datacards.length; i++){
				if(leak(datacards[i].f, datacards[i].e)){
					cardshtml += '<div class="item" data-id="'+datacards[i].c+'">'+
									'<div class="pic"><div style="background-image:url('+this.o.url+'DBPic/79_'+datacards[i].c+'_thumb.png)"></div><img src="'+this.o.url+'ka-defaultpic.png"></div>'+
									'<div class="zoom"></div>'+
									'<p>'+datacards[i].d+'</p>'+
								'</div>';
				}
			}
			$("#maincard").html(cardshtml);
		},
		setkaaddboxbg:function(){//设置添加卡牌右侧顶部职业旗帜
			$("#ka_add_box").removeClass().addClass("box "+this.o.job);
		},
		addcardlist: function(){//增加卡牌进列表
			var cardid = Number(arguments[0]),
			datacards = this.datacards[this.switchjob(this.o.job)].b,
			cards = this.o.cards,
			cardtmp;
			
			for(var i=0; i<datacards.length; i++){//追加进数组
				if(datacards[i].c == cardid){
					cardtmp = datacards[i];
					
					var k = 0,
					istwo = false;
					
					if(cards.length == 0){//第一次的时候
						cardtmp.z = 1;
						cards.push(cardtmp);
					}else{
						for(var j=0; j<cards.length; j++){
							if(cards[j].c == cardid){
								k = j;
								istwo = true;
							}
						}
						if(!istwo){
							cardtmp.z = 1;
							cards.push(cardtmp);
						}
						if(istwo && cards[k].z == 1){
							istwo = false;
							cards[k].z = 2;
						}
						if(istwo && cards[k].z == 2){
							istwo = false;
							easyDialog.open({
								container: "dialogTip",
								fixed: false,
								overlay: false,
								autoClose: 1000
							});
						}
					}
					
				}
			}			
			
			function bubbleSort(arr){//冒泡排序,从小到大
				var i = arr.length,
				j,
				tempExchangVal;
				while(i>0){
					for(j=0; j<i-1; j++){
						if(arr[j].e > arr[j+1].e){
							tempExchangVal = arr[j];
							arr[j] = arr[j+1];
							arr[j+1] = tempExchangVal;
						}
					}
					i--;
				}
				return arr;
			}
			
			this.o.cards = bubbleSort(cards);
			this.printcardlist();
		},
		removecardlist: function(){//移除卡牌列表
			var cardid = Number(arguments[0]),
			cards = this.o.cards;
			
			for(var i=0; i<cards.length; i++){
				if(cards[i].c == cardid){
					if(cards[i].z == 1){
						cards.splice(i,1);
					}else{
						cards[i].z = 1;
					}
					this.printcardlist();
				}
			}
		},
		printcardlist: function(){//打印卡牌列表
			var html = '',
			cards = this.o.cards,
			card,
			num = 0;
			
			for(var i=0; i<cards.length; i++){
				card = cards[i];
				if(card.z == 1){
					html += '<div class="item" data-id="'+card.c+'">'+
								'<i class="hero" style="background-image:url('+this.o.url+'DBPic/79_'+card.c+'_thumb.png);"></i>'+
								'<i class="mask"></i>'+
								'<i class="num num_'+card.e+'"><span></span></i>'+
								'<p>'+card.d+'</p>'+
							'</div>';
					num++;
				}else{
					html += '<div class="item" data-id="'+card.c+'">'+
								'<i class="hero" style="background-image:url('+this.o.url+'DBPic/79_'+card.c+'_thumb.png);"></i>'+
								'<i class="mask"></i>'+
								'<i class="num num_'+card.e+'"><span></span></i>'+
								'<p>'+card.d+'</p>'+
								'<i class="double"></i>'+
							'</div>';
					num += 2;
				}
			}

			$("#ka_add_content").html(html);
			$("#ka_add_num").html(num+"/30");
		},
		ispage: function(){//判断当前打开的是哪一个页面
			var href = location.href;
			switch(true){
				case href.indexOf("index") != -1:
					
					break;
				case href.indexOf("job") != -1:
					
					break;
				case href.indexOf("detail") != -1:
					this.o.job = sessionStorage.getItem("job");
					$("#group_change_btn").children().eq(0).attr("data-job",this.o.job);
					this.setkaaddboxbg();
					this.printdetail();
					
					
					break;
				case href.indexOf("mycardlist") != -1:
					
					break;
				case href.indexOf("mycards") != -1:
					
					break;
			}
		},
		events: function(){
			var that = this;
			//选择职业
			$("#ka_switch .item").click(function(){
				sessionStorage.setItem("job",$(this).attr("data-job"));
				window.location.href = 'data-lushichuanshuo-ka-detail.html';
			});
			//添加卡牌-添加卡牌
			$("#maincard").on("click", ".item", function(){
				that.addcardlist($(this).attr("data-id"));
			});
			//添加卡牌-移除卡牌
			$("#ka_add_content").on("click", ".item", function(){
				that.removecardlist($(this).attr("data-id"));
			});
			//添加卡牌-职业/中立切换
			$("#group_change_btn .item").click(function(){
				var job = $(this).attr("data-job");
				that.o.job = job;
				$(this).addClass("on").siblings().removeClass("on");
				$rarity_select_ul.hide();
				$fei_select_ul.hide();
				that.printdetail();
			});
			//添加卡牌-稀有度切换
			var $rarity_select = $("#rarity_select"),
			$rarity_select_ul = $("#rarity_select_ul"),
			$fei_select = $("#fei_select"),
			$fei_select_ul = $("#fei_select_ul");
			
			$rarity_select.click(function(){
				$fei_select_ul.hide();
				$rarity_select_ul.toggle();
			});
			$rarity_select_ul.children().click(function(){
				var self = $(this);
				that.o.rarity = Number(self.attr("data-type"));
				self.addClass("on").siblings().removeClass("on");
				$rarity_select.children().eq(0).html(self.children().html());
				$rarity_select_ul.hide();
				that.printdetail();
			});
			//添加卡牌-费用切换
			$fei_select.click(function(){
				$rarity_select_ul.hide();
				$("#fei_select_ul").toggle();
			});
			$fei_select_ul.children().click(function(){
				var self = $(this);
				that.o.fei = Number(self.attr("data-type"));
				self.addClass("on").siblings().removeClass("on");
				$fei_select.children().eq(0).html(self.children().html());
				$fei_select_ul.hide();
				that.printdetail();
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
f:稀有度 //0.所有 1:免费 2:普通 3.稀有 4.史诗 5.传说
g:构筑评分
h:竞技场评分
i:画师语录

z:卡牌是否乘以2

var data_cards = [{a:"zhongli",b:[{c:123,d:"恐怖的奴隶主",e:1,f:1,g:9,h:6,i:"有些德鲁伊做梦的时候都会被陌生人的“给我个激活！”的喊叫声惊醒"},{}]}];

*/