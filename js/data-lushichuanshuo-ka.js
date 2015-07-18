//2015-07-16
(function(window){
	var LscsKa = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {job:"zhongli",url:"images/lushichuanshuo/",cards:[],cardnum:0,rarity:0,fei:0};//job:职业 url:前缀路径 cards:选中的卡牌 rarity:稀有度0所有 fei:费法力-1所有

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
									'<div class="zoom"><i></i></div>'+
									'<p>'+datacards[i].d+'</p>'+
								'</div>';
				}
			}
			$("#ka_add_maincard").html(cardshtml);
		},
		setkaaddboxbg: function(){//设置添加卡牌右侧顶部职业旗帜
			$("#ka_add_box").removeClass().addClass("box "+this.o.job);
		},
		showdialogtip: function(){//弹窗
			var i = Number(arguments[0]),
			html_1 = '相同卡牌不能超过2张',
			html_2 = '只能添加30张卡牌';
			html_3 = '请添加30张卡牌';
			html_4 = '给你的卡组命个名吧';
			
			switch(i){
				case 1:$("#ka_add_dialogtip").html(html_1);break;
				case 2:$("#ka_add_dialogtip").html(html_2);break;
				case 3:$("#ka_add_dialogtip").html(html_3);break;
				case 4:$("#ka_add_dialogtip").html(html_4);break;
			}
			
			easyDialog.open({
				container: "ka_add_dialogtip",
				fixed: false,
				overlay: false,
				autoClose: 1000
			});
		},
		addcardlist: function(){//增加卡牌进列表
			var cardid = Number(arguments[0]),
			datacards = this.datacards[this.switchjob(this.o.job)].b,
			cards = this.o.cards,
			cardtmp;
			
			if(this.o.cardnum == 4){
				this.showdialogtip(2);
				return;
			}
			
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
							this.showdialogtip(1);
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
			
			this.o.cardnum = num;
			$("#ka_add_content").html(html);
			$("#ka_add_num").html(num+"/30");
		},
		printdialogcard: function(){//打印单张卡片弹窗
			var id = Number(arguments[0]),
			datacards = this.datacards[this.switchjob(this.o.job)].b,
			html = '';

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
			
			for(var i=0; i<datacards.length; i++){
				if(datacards[i].c == id){
					html = '<div class="pic"><img src="'+this.o.url+'DBPic/79_'+id+'_thumb.png"></div>'+
						'<div class="zy '+this.o.job+'"></div>'+
						'<div class="line1">'+
							'<div class="name">'+datacards[i].d+'</div>'+
							lev(datacards[i].f)+
						'</div>'+
						'<div class="line2">'+
							'<div class="l"><span class="k">构筑评分</span>'+datacards[i].g+'</div>'+
							'<div class="r"><span class="k">竞技场评分</span>'+datacards[i].h+'</div>'+
						'</div>'+
						'<div class="line3">'+
							'<div><span class="k">画师语录</span></div>'+
							'<p>'+datacards[i].i+'</p>'+
						'</div>';
				}
			}
			
			$("#ka_add_dialogcard").html(html).removeClass("hide");
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
					$("#ka_add_group").children().eq(0).attr("data-job",this.o.job);
					this.setkaaddboxbg();
					this.printdetail();
					
					
					break;
				case href.indexOf("mycardlist") != -1:
					
					break;
				case href.indexOf("mycards") != -1:
					
					break;
			}
		},
		setmemorycard: function(){//存储卡组
			if($.trim($("#ka_add_input").val()) == ""){
				this.showdialogtip(4);
				return;
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
			$("#ka_add_maincard").on("click", ".item", function(){
				that.addcardlist($(this).attr("data-id"));
			});
			//添加卡牌-移除卡牌
			$("#ka_add_content").on("click", ".item", function(){
				that.removecardlist($(this).attr("data-id"));
			});
			
			var $ka_add_rarity = $("#ka_add_rarity"),
			$ka_add_rarity_ul = $("#ka_add_rarity_ul"),
			$ka_add_fei = $("#ka_add_fei"),
			$ka_add_fei_ul = $("#ka_add_fei_ul");
			//添加卡牌-职业/中立切换
			$("#ka_add_group .item").click(function(){
				var job = $(this).attr("data-job");
				that.o.job = job;
				$(this).addClass("on").siblings().removeClass("on");
				$ka_add_rarity_ul.hide();
				$ka_add_fei_ul.hide();
				that.printdetail();
			});
			//添加卡牌-稀有度切换
			$ka_add_rarity.click(function(){
				$ka_add_fei_ul.hide();
				$ka_add_rarity_ul.toggle();
			});
			$ka_add_rarity_ul.children().click(function(){
				var self = $(this);
				that.o.rarity = Number(self.attr("data-type"));
				self.addClass("on").siblings().removeClass("on");
				$ka_add_rarity.children().eq(0).html(self.children().html());
				$ka_add_rarity_ul.hide();
				that.printdetail();
			});
			//添加卡牌-费用切换
			$ka_add_fei.click(function(){
				$ka_add_rarity_ul.hide();
				$ka_add_fei_ul.toggle();
			});
			$ka_add_fei_ul.children().click(function(){
				var self = $(this);
				that.o.fei = Number(self.attr("data-type"));
				self.addClass("on").siblings().removeClass("on");
				$ka_add_fei.children().eq(0).html(self.children().html());
				$ka_add_fei_ul.hide();
				that.printdetail();
			});
			//添加卡牌-点击卡牌放大镜
			$("#ka_add_maincard").on("click", ".zoom", function(e){
				e.stopPropagation();
				that.printdialogcard($(this).parent().attr("data-id"));
			});
			//添加卡牌-点击卡牌放大镜关闭弹窗
			$("#ka_add_dialogcard").click(function(){
				$(this).addClass("hide");
			});
			//添加卡牌-点击完成
			$("#ka_add_ok").click(function(){
				if(that.o.cardnum != 4){
					that.showdialogtip(3);
				}else{
					that.setmemorycard();
				}
			});
		},
		init: function(){
			var win_h = $(window).height(),
			body_h = $("body").height();
			
			if(win_h > body_h){
				$(".ka_body").height(win_h);
			}
			$("#ka_add_maincard").height(win_h-86);//data-lushichuanshuo-ka-detail.html
			
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