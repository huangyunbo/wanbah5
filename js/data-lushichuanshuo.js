//2015-07-02
(function(window){
	var Lscs = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {platform:"web",plugin_ka:"plugin_963",type:0,manacost:0,url:"images/lushichuanshuo/",isData_type:true,keyword:""};//platform:打包平台,plugin_ka:跳转卡组模拟器的文件包名,type:9职业+中立 0-9,manacost:费法力 0-8,url:图片路径,isData_type:打开弹窗不需要开启隐藏上下
		if(this.o.platform == "android"){
			this.o.url="../images/lushichuanshuo/";
		}
		this.init();
	}
	
	Lscs.prototype = {
		printdatacard: function(){//打印卡牌
			var that = this,
				html = '',
				_datacards = this.datacards[this.o.type].b,
				url = this.o.url,
				card = "",
				keyword = this.o.keyword;
			
			//费法力
			function mana(){
				if(that.o.manacost == 0 || card.e == that.o.manacost - 1){
					return true;
				}else if(that.o.manacost == 8 && card.e > 7){
					return true;
				}
				return false;
			}

			for(var i=0; i<_datacards.length; i++){
				card = _datacards[i];
				if(mana() && (keyword.length == 0 || card.d.indexOf(keyword) != -1)){
					html += '<li data-id="'+_datacards[i].c+'"><div class="pic"><div style="background-image:url('+url+'DBPic/79_'+_datacards[i].c+'_thumb.png)"></div><img src="'+url+'ka-defaultpic.png"></div><p>'+_datacards[i].d+'</p></li>';
				}
			}
			if(html.length == 0){
				html += '<span class="nodata">暂无数据，换个关键词试试</span>';
			}
			
			$("#data_card").html(html);
			$(".data_body").scrollTop(0);
			this.slidingHide();
		},
		printdialogcard: function(){//打印单张卡片弹窗
			var _id = Number(arguments[0]),
				_type = this.o.type,
				_datacards = this.datacards[_type].b,
				_html = '';
			//判断职业 德鲁伊
			function zy(){
				switch(_type){
					case 1:return "deluyi";
					case 2:return "lieren";
					case 3:return "fashi";
					case 4:return "shengqishi";
					case 5:return "mushi";
					case 6:return "qianxingzhe";
					case 7:return "saman";
					case 8:return "shushi";
					case 9:return "zhanshi";
					default:return "zhongli";
				}
			}
			//判断级别 免费级
			function lev(){
				var i = Number(arguments[0]);
				switch(i){
					case 2:return '<div class="lev lev_white"><i></i>普通级</div>';
					case 3:return '<div class="lev lev_blue"><i></i>稀有级</div>';
					case 4:return '<div class="lev lev_purple"><i></i>史诗级</div>';
					case 5:return '<div class="lev lev_orange"><i></i>传说级</div>';
					default:return '<div class="lev lev_free"><i></i>免费级</div>';
				}
			}
			//出处
			function source(){
				var i = Number(arguments[0]);
				switch(i){
					case 2:return '经典';
					case 3:return '冠军的试炼';
					case 4:return '探险者协会';
					case 5:return '黑石山的火焰';
					case 6:return '地精大战侏儒';
					case 7:return '纳克萨玛斯';
					default:return '基本';
				}
			}
			
			for(var i=0; i<_datacards.length; i++){
				if(_datacards[i].c == _id){
					_html = '<div class="pic"><img src="'+this.o.url+'DBPic/79_'+_id+'_thumb.png"></div>'+
						'<div class="zy '+zy()+'"></div>'+
						'<div class="line1">'+
							'<div class="name">'+_datacards[i].d+'</div>'+
							lev(_datacards[i].f)+
							'<div class="source">'+source(_datacards[i].j)+'</div>'+
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
				
				function isshowfun(e){
					distanceY = touchStarY - touchMoveY;
					if(distanceY > 10 && document.documentElement.scrollTop + document.body.scrollTop >= 88 && that.o.isData_type){//下滑隐藏
						$data_type.addClass("data_type_animate");
					}
					if(distanceY < -10 && that.o.isData_type){//上划展示
						$data_type.removeClass("data_type_animate");
					}
				}
			
				document.addEventListener("touchstart",function(e){
					touchStarY = e.targetTouches[0].pageY;
				},false);
				
				document.addEventListener("touchmove",function(e){
					touchMoveY = e.targetTouches[0].pageY;
				},false);
				
				document.addEventListener("touchend",function(e){
					isshowfun(e);
				},false);
				
				document.addEventListener("touchcancel",function(e){//修复android4.0touchend的bug
					isshowfun(e);
				},false);
			}
		},
		events: function(){
			var that = this;
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
				$("#data_type").removeClass("data_type_animate");
				that.o.manacost = _index;
				that.printdatacard();
			});
			//单张卡片弹窗
			$("#data_card").on("click", "li", function(){
				$("body").css("overflow-y","hidden");
				that.o.isData_type = false;
				that.printdialogcard($(this).attr("data-id"));
				
			});
			//关闭单张卡片弹窗
			$("#dialogcard").click(function(){
				$("body").css("overflow-y","auto");
				that.o.isData_type = true;
				$(this).addClass("hide");
			});
			//搜索关键词
			var $so_btn = $("#so_btn"),
				$so_text = $("#so_text"),
				$so_cancel = $("#so_cancel");
			$so_btn.click(function(){
				var keyword = $.trim($so_text.val());
				that.o.keyword = keyword;
				that.printdatacard();
			});
			$so_text.keyup(function(){
				var keyword = $.trim(this.value);
				
				if(keyword.length > 0){
					$so_cancel.removeClass("hide");
				}else{
					$so_cancel.addClass("hide");
					that.o.keyword = "";
					that.printdatacard();
				}
			});
			$so_cancel.click(function(){
				that.o.keyword = "";
				$so_text.val("");
				$so_cancel.addClass("hide");
				that.printdatacard();
			});
			//解决ios下软键盘弹出问题
			if(that.o.platform == "ios"){
				$so_text.focus(function(){
					$("#data_fei").fadeTo(10,0);
				});
				$so_text.blur(function(){
					$("#data_fei").delay(500).fadeTo(10,1);
				});
			}
		},
		isplatform: function(){//判断打包平台显示相应内容
			if(this.o.platform == "android"){
				$("#header").removeClass("hide");
				$("#header").children(".more").attr("href","../"+this.o.plugin_ka+"/index.html");
			}else if(this.o.platform == "ios"){
				$("#data_type").addClass("data_type_ios");
				$("#data_card").parent().addClass("data_card_ios");
			}else if(this.o.platform == "web"){
				$("#header").removeClass("hide");
			}
		},
		init: function(){
			this.isplatform();
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
f:稀有度 //0.所有 1:免费 2:普通 3.稀有 4.史诗 5.传说
g:构筑评分
h:竞技场评分
i:画师语录

var data_cards = [{a:"zhongli",b:[{c:123,d:"恐怖的奴隶主",e:1,f:1,g:9,h:6,i:"有些德鲁伊做梦的时候都会被陌生人的“给我个激活！”的喊叫声惊醒"},{}]}];

*/