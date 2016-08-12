//2015-07-16
//2016-03-29 开启狂野模式 wuyunduoduopiao
(function(window){
	var LscsKa = function(){
		if(typeof(arguments[0]) == 'undefined') return false;
		var data_cards = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datacards = data_cards;
		this.o = {platform:"web",plugin:"plugin_963",job:"zhongli",url:"images/lushichuanshuo/",cards:[],cardnum:0,rarity:0,fei:-1,keyword:"",model:"wild"};//platform:打包平台,plugin:插件板块名925/926内侧 963/964正式,job:职业,url:前缀路径,cards:选中的卡牌,cardnum:当前一共选了多少张牌了,rarity:稀有度0所有,fei:费法力0所有,keyword:关键词搜索,model:狂野模式wild/标准模式standard
		if(this.o.platform == "android"){
			this.o.url="../images/lushichuanshuo/";
		}
		this.init();
	};
	
	LscsKa.prototype = {
		shareweixin: function(){//分享到微信
			var cardsid = arguments[0],//没值时设置icon；有值时直接分享
			sharejson = {"url":"http://www.wanba123.cn/","title":"玩吧专业版客户端","des":"专为手机游戏玩家而生！这里有最给力的原创游戏攻略、最及时的游戏资讯、各种奇葩玩法、最实用的游戏资料...","pic":"https://is2-ssl.mzstatic.com/image/thumb/Newsstand7/v4/70/35/87/70358797-1269-34a0-dd1f-3891c7d74038/Icon-76@2x.png.png/150x150bb-80.png","name":"","job":0,"cards":""};

			function setjob(){
				switch(arguments[0]){
					case "deluyi":return 3;
					case "lieren":return 7;
					case "fashi":return 9;
					case "shengqishi":return 8;
					case "mushi":return 2;
					case "qianxingzhe":return 6;
					case "saman":return 4;
					case "shushi":return 1;
					case "zhanshi":return 5;
				}
			}

			if(typeof(cardsid) === 'undefined'){
				try{
					if(this.o.platform == "android"){
						window.jstojava.setShareWxIcon(sharejson.pic);
					}else if(this.o.platform == "ios"){
						window.location.href = 'ios://setShareWxIcon?ico=' + encodeURIComponent(sharejson.pic);
					}
				}catch(err){
					alert(err);
				}
			}else{
				var wbgllscska = JSON.parse(localStorage.getItem("wbgl-lscs-ka")).data,
				arrtmp = [];
				
				cardsid = Number(cardsid);
				
				for(var i=0; i<wbgllscska.length; i++){
					if(cardsid == wbgllscska[i].id){
						sharejson.name = wbgllscska[i].name;
						sharejson.job = setjob(wbgllscska[i].job);
						
						for(var j=0; j<wbgllscska[i].cards.length; j++){
							if(wbgllscska[i].cards[j].z == 2){
								arrtmp.push(wbgllscska[i].cards[j].c);
								arrtmp.push(wbgllscska[i].cards[j].c);
							}else{
								arrtmp.push(wbgllscska[i].cards[j].c);
							}
						}
						sharejson.cards = arrtmp.join();
						break;
					}
				}

				sharejson.url = 'http://ella.wanba123.cn/lushichuanshuo/share.aspx?job='+sharejson.job+'&title='+encodeURIComponent(sharejson.name)+'&card='+sharejson.cards;
				sharejson.title = '炉石传说 '+sharejson.name+' 卡组已构建完成，谁来与我一战！';
				
				if(this.o.platform == "android"){
					window.jstojava.shareToWXCircleofFriends(sharejson.url, sharejson.title, sharejson.des);
				}else if(this.o.platform == "ios"){
					var codeUrl = 'url='+encodeURIComponent(sharejson.url)+'&title='+encodeURIComponent(sharejson.title)+'&description='+encodeURIComponent(sharejson.des);
					window.location.href = "ios://shareToWXCircleofFriends?" + codeUrl;
				}else if(this.o.platform == "web"){
					alert("暂不支持分享");
				}
			}
		},
		printmycards: function(){//打印我的某个卡组
			var wbgllscsmycards,
				newcards = [],
				newcardslen = 0,
				card,
				html_l = '',
				html_r = '',
				dic = [0,0,0,0,0,0,0,0],//0-7+的卡牌法力消耗值图表
				dust_ordinary = 0,//普通奥术之尘
				dust_gold = 0;//金奥术之尘
			
			if(this.o.platform == "ios"){
				wbgllscsmycards = JSON.parse(localStorage.getItem("wbgl-lscs-ka-mycards"));
				if(wbgllscsmycards === null) return;
				localStorage.setItem("wbgl-lscs-ka-job", wbgllscsmycards.job);
				localStorage.setItem("wbgl-lscs-ka-urlfrom", "mycards.html");//当准备去编辑详情页的时候，记录来自于data-lushichuanshuo-ka-mycards.html
			}else{
				wbgllscsmycards = JSON.parse(sessionStorage.getItem("wbgl-lscs-ka-mycards"));
				if(wbgllscsmycards === null) return;
				sessionStorage.setItem("wbgl-lscs-ka-job", wbgllscsmycards.job);
				sessionStorage.setItem("wbgl-lscs-ka-urlfrom", "mycards.html");//当准备去编辑详情页的时候，记录来自于data-lushichuanshuo-ka-mycards.html
			}
			
			$("#header h1").html(wbgllscsmycards.name);
			
			for(var i=0; i<wbgllscsmycards.cards.length; i++){//先把30张牌排出来
				card = wbgllscsmycards.cards[i];
				if(card.z == 2){//如果有两张相同的卡牌
					if(card.e >= 7){//费法力超过7(含)以上，就加入字典dic[7]里面
						dic[7] += 2;
					}else{
						dic[card.e] += 2;
					}
					newcards.push(card,card);
				}else{
					if(card.e >= 7){
						dic[7]++;
					}else{
						dic[card.e]++;
					}
					newcards.push(card);
				}
			}
			newcardslen = newcards.length;
			
			function isnumtwo(){//上两位数费的卡牌要换className
				var num = arguments[0];
				if(num >= 10){
					return '<div class="num num_two"><em>'+num+'</em></div>';
				}else{
					return '<div class="num"><em>'+num+'</em></div>';
				}
			}

			for(var i=0; i<newcardslen; i++){
				card = newcards[i];
				if(i < 15){
					html_l += '<div class="item">'+
								'<div class="inner">'+
									isnumtwo(card.e)+
									'<span>'+card.d+'</span>'+
									'<i></i>'+
									'<div class="pic" style="background-image:url('+this.o.url+'DBPic/'+card.c+'.png)"></div>'+
								'</div>'+
							'</div>';
				}else if(i < 30){
					html_r += '<div class="item">'+
								'<div class="inner">'+
									isnumtwo(card.e)+
									'<span>'+card.d+'</span>'+
									'<i></i>'+
									'<div class="pic" style="background-image:url('+this.o.url+'DBPic/'+card.c+'.png)"></div>'+
								'</div>'+
							'</div>';
				}
				console.log(card.f);
				//奥术之尘
				switch(card.f){
					case 2:
						dust_ordinary += 40;
						dust_gold += 400;
						break;
					case 3:
						dust_ordinary += 100;
						dust_gold += 800;
						break;
					case 4:
						dust_ordinary += 400;
						dust_gold += 1600;
						break;
					case 5:
						dust_ordinary += 1600;
						dust_gold += 3200;
						break;
				}
			}
		
			$("#ka_mycards_l").html(html_l);
			$("#ka_mycards_r").html(html_r);
			
			$("#dust_ordinary").html(dust_ordinary);
			$("#dust_gold").html(dust_gold);
			
			$("#ka_mycards_chart").children("li").each(function(index){
				var _h = dic[index] / newcardslen * 2 * 100;//翻倍效果更加明显
				if(_h > 100){
					_h = 100;
				}
				$(this).find("span").eq(0).html(dic[index]);
            	$(this).find("i").eq(0).css("height",_h+"%");
            });

			$("#shareweixin").attr("data-id",wbgllscsmycards.id);//赋值该卡组的id给分享
		},
		removewbgllscska: function(){//移除我的卡组里的某个卡组
			var id = Number(arguments[0]),
			wbgllscska = JSON.parse(localStorage.getItem("wbgl-lscs-ka"));
			
			$("#ka_mygroup").children().each(function(i){
				var _self = $(this);
            	if(id == Number(_self.attr("data-id"))){
					_self.remove();
					wbgllscska.data.splice(i,1);
					if(wbgllscska.data.length == 0){
						localStorage.removeItem("wbgl-lscs-ka");
						$("#ka_mygroup_edit").addClass("hide");
						return;
					}
					localStorage.setItem("wbgl-lscs-ka",JSON.stringify(wbgllscska));
					return;
				}
            });
		},
		printmygroup: function(){//打印我的卡牌组
			var wbgllscska = JSON.parse(localStorage.getItem("wbgl-lscs-ka")),
			group,
			html = '';
			
			if(wbgllscska === null) return;
			
			for(var i=0; i<wbgllscska.data.length; i++){
				if(i == 0){
					$("#ka_mygroup_edit").removeClass("hide");
				}
				group = wbgllscska.data[i];
				html += '<div class="item" data-id="'+group.id+'">'+
							'<div class="ka_flag">'+
								'<div class="box '+group.job+'">'+
									'<div class="a">'+
										'<i class="zhiye"></i>'+
										'<i class="mask"></i>'+
										'<i class="model'+( group.model === 'standard' ? ' model_standard' : '' )+'"></i>'+
										'<div class="text text_p">'+group.name+'</div>'+
									'</div>'+
									'<div class="share">分享</div>'+
								'</div>'+
							'</div>'+
						'</div>';
			}
			
			$("#ka_mygroup").html(html);
		},
		setmemorycard: function(){//存储卡组
			var $input = $("#ka_add_input"),
				cardname = $input.val(),
				wbgllscska,
				job = $("#ka_add_group").children().eq(0).attr("data-job"),
				ka;
			
			if($.trim(cardname).length == 0){
				$input.focus();
				this.showdialogtip(5);
				return;
			}
			
			if(sessionStorage.getItem("wbgl-lscs-ka-urlfrom") == "job.html" || localStorage.getItem("wbgl-lscs-ka-urlfrom") == "job.html"){//如果是job.html过来的就新建保存
				wbgllscska = {"data":[],"id":1};
				ka = {"id":1,"name":cardname,"job":job,"model":this.o.model,"cards":this.o.cards};
				
				if(localStorage.getItem("wbgl-lscs-ka") === null){//如果我的卡组为空时
					wbgllscska.data.push(ka);
				}else{//如果我的卡组不为空时，就追加
					wbgllscska = JSON.parse(localStorage.getItem("wbgl-lscs-ka"));
					ka.id = ++wbgllscska.id;
					wbgllscska.data.unshift(ka);
				}
				localStorage.setItem("wbgl-lscs-ka",JSON.stringify(wbgllscska));
			}else if(sessionStorage.getItem("wbgl-lscs-ka-urlfrom") == "mycards.html" || localStorage.getItem("wbgl-lscs-ka-urlfrom") == "mycards.html"){//如果是mycards.html过来的就在原来的里面编辑保存
				if(this.o.platform == "ios"){
					var id = JSON.parse(localStorage.getItem("wbgl-lscs-ka-mycards")).id;
				}else{
					var id = JSON.parse(sessionStorage.getItem("wbgl-lscs-ka-mycards")).id;
				}
				
				wbgllscska = JSON.parse(localStorage.getItem("wbgl-lscs-ka"));
				for(var i=0; i<wbgllscska.data.length; i++){
					if(wbgllscska.data[i].id == id){
						wbgllscska.data[i] = ka = {"id":id,"name":cardname,"job":job,"model":this.o.model,"cards":this.o.cards};
						localStorage.setItem("wbgl-lscs-ka", JSON.stringify(wbgllscska));
						break;
					}
				}
			}
			//ios跳转做特殊处理，跳转mycards.html，另外还要设置localStorage.setItem("wbgl-lscs-ka-mycards",card);
			if(this.o.platform == "ios"){
				localStorage.setItem("wbgl-lscs-ka-mycards", JSON.stringify(ka));
				location.href = this.o.plugin+'/data-lushichuanshuo-ka-mycards.html';
			}else if(this.o.platform == "android"){
				location.href = 'index.html';
			}else{
				location.href = 'data-lushichuanshuo-ka-index.html';
			}
		},
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
				case "shushi":return 8;
				case "zhanshi":return 9;
			}
		},
		showdialogtip: function(){//弹窗
			var i = Number(arguments[0]),
				html_1 = '相同卡牌不能超过2张',
				html_2 = '只能添加30张卡牌',
				html_3 = '请添加30张卡牌',
				html_4 = '相同传说级卡牌只能携带一张',
				html_5 = '给你的卡组命个名吧',
				html_6 = '数据异常';
			
			switch(i){
				case 1:$("#ka_add_dialogtip").html(html_1);break;
				case 2:$("#ka_add_dialogtip").html(html_2);break;
				case 3:$("#ka_add_dialogtip").html(html_3);break;
				case 4:$("#ka_add_dialogtip").html(html_4);break;
				case 5:$("#ka_add_dialogtip").html(html_5);break;
				case 6:$("#ka_add_dialogtip").html(html_6);break;
			}
			
			easyDialog.open({
				container: "ka_add_dialogtip",
				fixed: false,
				overlay: false,
				autoClose: 1000
			});
		},
		printdialogcard: function(){//打印单张卡片弹窗
			var id = Number(arguments[0]),
				datacards = this.datacards[this.switchjob(this.o.job)].b,
				html = '';
			
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
					case 8:return '上古之神的低语';
					case 9:return '卡拉赞之夜';
					default:return '基本';
				}
			}
			
			for(var i=0; i<datacards.length; i++){
				if(datacards[i].c == id){
					html = '<div class="pic"><img src="'+this.o.url+'DBPic/'+id+'.png"></div>'+
							'<div class="zy '+this.o.job+'"></div>'+
							'<div class="line1">'+
								'<div class="name">'+datacards[i].d+'</div>'+
								lev(datacards[i].f)+
							'</div>'+
							'<div class="line2"><span class="k">出处</span>'+source(datacards[i].j)+'</div>'+
							'<div class="line3">'+
								'<div class="l"><span class="k">构筑评分</span>'+datacards[i].g+'</div>'+
								'<div class="r"><span class="k">竞技场评分</span>'+datacards[i].h+'</div>'+
							'</div>'+
							'<div class="line4">'+
								'<div><span class="k">画师语录</span></div>'+
								'<p>'+datacards[i].i+'</p>'+
							'</div>';
				}
			}
			
			$("#ka_add_dialogcard").html(html).removeClass("hide");
		},
		printcardlist: function(){//打印卡牌列表
			var html = '',
			cards = this.o.cards,
			card,
			num = 0;
			
			function isLegend(f){//是否是传说级别
				if(f==5){
					return " item_glod";
				}
				return "";
			}
			
			for(var i=0; i<cards.length; i++){
				card = cards[i];
				html += '<div class="item'+isLegend(card.f)+'" data-id="'+card.c+'">'+
							'<i class="hero" style="background-image:url('+this.o.url+'DBPic/'+card.c+'.png);"></i>'+
							'<i class="mask"></i>'+
							'<i class="num num_'+card.e+'"><span></span></i>'+
							'<p>'+card.d+'</p>';
				
				if(card.z == 2){//如果只有单张卡牌的时候
					num += 2;
					html += '<i class="double"></i>';
				}else{
					num++;
				}
				
				html += '</div>';
			}
			
			this.o.cardnum = num;
			$("#ka_add_content").html(html);
			$("#ka_add_num").html(num+"/30");
		},
		removecardlist: function(){//移除卡牌列表
			var cardid = Number(arguments[0]),
				cards = this.o.cards,
				rarity = 0,
				isTwo = false;
			
			for(var i=0; i<cards.length; i++){
				if(cards[i].c == cardid){
					rarity = cards[i].f;
					if(cards[i].z == 1){
						cards.splice(i,1);
					}else{
						isTwo = true;
						cards[i].z = 1;
						
					}
					$("#ka_add_maincard").children().filter(function(){
						var self = $(this),
							_id = self.attr("data-id"),
							_datalock = Number(self.attr("data-lock"));
						if(_id == cardid){
							self.attr("data-lock", --_datalock);
							if(rarity == 5){
								self.children().children('.lock_one').remove();
							}else if(isTwo){
								self.children().children('.lock_two').remove();
							}
						}
					});
					break;
				}
			}
			this.printcardlist();
		},
		addcardlist: function(){//增加卡牌进列表
			var $element = $(arguments[0]),
				$wrap = $element.children(".w"),
				cardid = Number($element.attr("data-id")),
				cardlock = Number($element.attr("data-lock")),
				datacards = this.datacards[this.switchjob(this.o.job)].b.slice(0),
				cards = this.o.cards,
				cardtmp;
			
			if(this.o.cardnum == 30){
				this.showdialogtip(2);
				return;
			}
			
			for(var i=0; i<datacards.length; i++){
				if(datacards[i].c == cardid){
					cardtmp = datacards[i];

					switch(cardlock){
						//默认是0，允许两张，从0开始计数 0,1,2
						case 0:
							cardtmp.z = 1;
							cards.push(cardtmp);
							$element.attr("data-lock", ++cardlock);
							break;
						case 1:
							for(var j=0; j<cards.length; j++){
								if(cards[j].c == cardid){
									cards[j].z = 2;
									break;
								}
							}
							$element.attr("data-lock", ++cardlock);
							$wrap.append('<i class="lock_two"></i>');
							cardtmp
							break;
						case 2:
							this.showdialogtip(1);
							return;
						//相同传说级卡牌只能携带一张,从3开始计数 3,4
						case 3:
							cardtmp.z = 1;
							cards.push(cardtmp);
							$element.attr("data-lock", ++cardlock);
							$wrap.append('<i class="lock_one"></i>');
							break;
						case 4:
							this.showdialogtip(4);
							return;
						default:
							this.showdialogtip(6);
							return;
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
		printdetail: function(){//打印左侧卡牌
			var that = this,
				cardshtml = '',
				datacards = this.datacards[this.switchjob(this.o.job)].b,
				rarity = this.o.rarity,
				fei = this.o.fei,
				feimin = 0,
				feimax = 100,
				keyword = this.o.keyword,
				model = this.o.model,
				card,
				datalock = 0;

			(function feiFn(){
				switch(fei){
					case -1:
						feimin = 0;
						feimax = 100;
						break;
					case 7:
						feimin = 7;
						feimax = 100;
						break;
					default:
						feimax = feimin = fei;
				}
			})();
			//lock值 普通0,1,2 传说3,4
			function calcLock(_id, _rarity){
				var _card;
				for(var j=0; j<that.o.cards.length; j++){
					_card = that.o.cards[j];
					//找到对应id 说明有存
					if(_card.c == _id){
						//如果稀有度是5 传说
						if(_rarity == 5){
							return 4;
						}
						if(_card.z == 1){
							return 1;
						}else if(_card.z == 2){
							return 2;
						}
					}
				}
				//如果稀有度是5:传说
				if(_rarity == 5){
					return 3;
				}else{
					return 0;
				}
			}
			//根据计算出的lock值返回html
			function htmlLock(){
				if(datalock == 2){
					return '<i class="lock_two"></i>';
				}else if(datalock == 4){
					return '<i class="lock_one"></i>';
				}else{
					return '';
				}
			}

			for(var i=0; i<datacards.length; i++){
				card = datacards[i];

				if((model == 'wild' || card.j == 1 || card.j == 2 || card.j == 3 || card.j == 4 || card.j == 5 || card.j == 8 || card.j == 9) && (rarity == 0 || card.f == rarity) && (card.e >= feimin && card.e <= feimax) && (keyword.length == 0 || card.d.indexOf(keyword) != -1)){
					datalock = calcLock(card.c, card.f);
					cardshtml += '<div class="item" data-id="'+card.c+'" data-lock="'+datalock+'">'+
									'<div class="w">'+
										'<img src="'+this.o.url+'ka-defaultpic.png">'+
										'<div class="pic" style="background-image:url('+this.o.url+'DBPic/'+card.c+'.png)"></div>'+
										'<span class="zoom"><i></i></span>'+
										htmlLock()+
									'</div>'+
									'<p>'+card.d+'</p>'+
								'</div>';
				}
			}
			if(cardshtml.length == 0){
				cardshtml += '<span class="nodata" style="color:#fff">'+(model == 'standard' ? '现在是标准模式，' : '')+'暂无数据，换个关键词试试</span>';
			}
			$("#ka_add_maincard").html(cardshtml);
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
			}
			
			switch(i){
				case 1:
					if(this.o.platform == "android"){
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}else if(this.o.platform == "ios"){
						$("#header").addClass("header_ios");
					}
				break;
				case 2:
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","index.html");
					}
				break;
				case 3:
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
					}else if(this.o.platform == "ios"){
						$("#ka_add").children(".aside").addClass("aside_ios");
					}
				break;
				case 5:
					if(this.o.platform == "android"){
						$("#header").children(".back").attr("href","index.html");
					}else if(this.o.platform == "ios"){
						$("#header").addClass("header_ios");
					}
				break;
			}
		},
		events: function(){
			var that = this;
			//狂野模式 标准模式
			$("#ka_road div").click(function(){				
				if(that.o.platform == "ios"){
					localStorage.setItem("wbgl-lscs-ka-model", $(this).attr("data-model"));
					location.href = that.o.plugin+'/data-lushichuanshuo-ka-job.html';
				}else{
					sessionStorage.setItem("wbgl-lscs-ka-model", $(this).attr("data-model"));
					location.href = 'data-lushichuanshuo-ka-job.html';
				}
			});
			//选择职业
			$("#ka_switch .item").click(function(){				
				if(that.o.platform == "ios"){
					localStorage.setItem("wbgl-lscs-ka-job",$(this).attr("data-job"));
					location.href = that.o.plugin+'/data-lushichuanshuo-ka-detail.html';
				}else{
					sessionStorage.setItem("wbgl-lscs-ka-job",$(this).attr("data-job"));
					location.href = 'data-lushichuanshuo-ka-detail.html';
				}
			});
			//添加卡牌-添加卡牌
			$("#ka_add_maincard").on("click", ".item", function(){
				that.addcardlist(this);
			});
			//添加卡牌-移除卡牌
			$("#ka_add_content").on("click", ".item", function(){
				that.removecardlist($(this).attr("data-id"));
			});
			
			//搜索关键词
			var $so_btn = $("#so_btn"),
				$so_text = $("#so_text"),
				$so_cancel = $("#so_cancel");
			$so_btn.click(function(){
				var keyword = $.trim($so_text.val());
				that.o.keyword = keyword;
				that.printdetail();
			});
			$so_text.keyup(function(){
				var keyword = $.trim(this.value);
				
				if(keyword.length > 0){
					$so_cancel.removeClass("hide");
				}else{
					$so_cancel.addClass("hide");
					that.o.keyword = "";
					that.printdetail();
				}
			});
			$so_cancel.click(function(){
				that.o.keyword = "";
				$so_text.val("");
				$so_cancel.addClass("hide");
				that.printdetail();
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
				return false;
			});
			//添加卡牌-费用切换
			$ka_add_fei.click(function(){
				$ka_add_rarity_ul.hide();
				$ka_add_fei_ul.toggle();
			});
			$ka_add_fei_ul.children().click(function(){
				var self = $(this);
				that.o.fei = Number(self.attr("data-fei"));
				self.addClass("on").siblings().removeClass("on");
				$ka_add_fei.children().eq(0).html(self.children().html());
				$ka_add_fei_ul.hide();
				that.printdetail();
				return false;
			});
			//添加卡牌-点击卡牌放大镜
			$("#ka_add_maincard").on("click", ".zoom", function(e){
				e.stopPropagation();
				that.printdialogcard($(this).closest(".item").attr("data-id"));
			});
			//添加卡牌-点击卡牌放大镜关闭弹窗
			$("#ka_add_dialogcard").click(function(){
				$(this).addClass("hide");
			});
			//添加卡牌-点击完成
			$("#ka_add_ok").click(function(){
				that.setmemorycard();
			});
			//添加卡牌-点击顶部返回
			$("#ka_detail_back").click(function(e){
				if(JSON.parse(sessionStorage.getItem("wbgl-lscs-ka-urlfrom") == "mycards.html") || JSON.parse(localStorage.getItem("wbgl-lscs-ka-urlfrom") == "mycards.html")){//如果是从mycards.html过来的就回mycards.html
					e.preventDefault();
					location.href = 'data-lushichuanshuo-ka-mycards.html';
				}
				
			});
			//我的卡组-mygroup-点击哪条卡组
			$("#ka_mygroup").on("click", ".a", function(){
				var _id = Number($(this).closest(".item").attr("data-id")),
				_wbgllscska = JSON.parse(localStorage.getItem("wbgl-lscs-ka")),
				card;

				for(var i=0; i<_wbgllscska.data.length; i++){
					card = _wbgllscska.data[i];
					if(card.id == _id){
						card = JSON.stringify(card);
						if(that.o.platform == "ios"){
							localStorage.setItem("wbgl-lscs-ka-mycards",card);
							location.href = that.o.plugin+'/data-lushichuanshuo-ka-mycards.html';
						}else{
							sessionStorage.setItem("wbgl-lscs-ka-mycards",card);
							location.href = 'data-lushichuanshuo-ka-mycards.html';
						}
					}
				}
			});
			//我的卡组-mygroup-编辑
			$("#ka_mygroup_edit").click(function(){
				var isedit = Number($(this).attr("data-isedit"));
				if(isedit == 1){
					$(this).html("完成");
					$(this).attr("data-isedit","2");
					$("#ka_mygroup .share").each(function(){
						$(this).html("").removeClass().addClass("del");
					});
				}else{
					$(this).html("编辑");
					$(this).attr("data-isedit","1");
					$("#ka_mygroup .del").each(function(){
						$(this).html("分享").removeClass().addClass("share");
					});
				}
			});
			//我的卡组-mygroup-编辑-删除
			$("#ka_mygroup").on("click", ".del", function(){
				if(confirm("您确定要删除吗？")){
					var _id = $(this).closest(".item").attr("data-id");
					that.removewbgllscska(_id);
				}
			});
			//我的卡组-mygroup-编辑-分享
			$("#ka_mygroup").on("click", ".share", function(){
				var _id = $(this).closest(".item").attr("data-id");
				that.shareweixin(_id);
			});
			//我的卡组-mycards
			$("#ka_mycards_edit").click(function(){
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-lushichuanshuo-ka-detail.html';
				}else{
					location.href = 'data-lushichuanshuo-ka-detail.html';
				}
			});
			//我的卡组-mycards-分享
			$("#shareweixin").click(function(){
				var _id = $(this).attr("data-id");
				that.shareweixin(_id);
			});
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform(1);
					this.shareweixin();
					this.printmygroup();
					break;
				case (href == "job"):
					this.isplatform(2);
					if(this.o.platform == "ios"){//ios在插件里不识别sessionStorage
						localStorage.setItem("wbgl-lscs-ka-urlfrom", "job.html");//记录来自于data-lushichuanshuo-ka-job.html
					}else{
						sessionStorage.setItem("wbgl-lscs-ka-urlfrom", "job.html");//记录来自于data-lushichuanshuo-ka-job.html
					}
					break;
				case (href == "detail"):
					var win_h = $(window).height(),
						$ka_add_maincard = $("#ka_add_maincard"),
						head_h = $ka_add_maincard.prev(".head").innerHeight(),
						header_h = this.o.platform == "ios" ? 0 : 50;
					
					$ka_add_maincard.height(win_h-head_h-header_h);
					
					this.isplatform(3);
					
					if(this.o.platform == "ios"){
						this.o.job = localStorage.getItem("wbgl-lscs-ka-job");
						this.o.model = localStorage.getItem("wbgl-lscs-ka-model");
						if(localStorage.getItem("wbgl-lscs-ka-urlfrom") == "mycards.html" && localStorage.getItem("wbgl-lscs-ka-mycards") !== null){//如果是从data-lushichuanshuo-ka-mycards.html过来的就赋值
							var data = JSON.parse(localStorage.getItem("wbgl-lscs-ka-mycards"));
							//做兼容，没有模式的，默认为狂野模式
							this.o.model = data.model === undefined ? 'wild' : data.model;
							this.o.cards = data.cards;
							$("#ka_add_input").val(data.name);
							this.printcardlist();
						}
					}else{
						this.o.job = sessionStorage.getItem("wbgl-lscs-ka-job");
						this.o.model = sessionStorage.getItem("wbgl-lscs-ka-model");
						if(sessionStorage.getItem("wbgl-lscs-ka-urlfrom") == "mycards.html" && sessionStorage.getItem("wbgl-lscs-ka-mycards") !== null){//如果是从data-lushichuanshuo-ka-mycards.html过来的就赋值
							var data = JSON.parse(sessionStorage.getItem("wbgl-lscs-ka-mycards"));
							//做兼容，没有模式的，默认为狂野模式
							this.o.model = data.model === undefined ? 'wild' : data.model;
							this.o.cards = data.cards;
							$("#ka_add_input").val(data.name);
							this.printcardlist();
						}
					}
					//设置添加卡牌右侧顶部旗帜
					$("#ka_add_flag").removeClass().addClass("box "+this.o.job);
					
					//设置顶部旗帜上面的模式
					if(this.o.model == 'standard'){
						$("#ka_add_flag").children(".model").addClass("model_standard");
					}
					
					//设置职业与中立单选按钮
					$("#ka_add_group").children().eq(0).attr("data-job",this.o.job);					
					
					this.printdetail();
					break;
				case (href == "mycards"):
					this.isplatform(5);
					this.printmycards();
					break;
			}
		},
		init: function(){
			var win_h = $(window).height(),
			body_h = $("body").height();
			if(win_h > body_h){
				$(".ka_body").height(win_h);
			}

			this.ispage();
			this.events();
		}
	};
	
	window.LscsKa = LscsKa;
})(window);

/*
a:卡牌组类别名称
b:data
c:卡牌id
d:卡牌名称
e:费法力
f:稀有度 //0.所有 1.免费 2.普通 3.稀有 4.史诗 5.传说
g:构筑评分
h:竞技场评分
i:画师语录
j:出处 //1.基本 2.经典 3.冠军的试炼 4.探险者协会 5.黑石山的火焰 6.地精大战侏儒 7.纳克萨玛斯 8.上古之神的低语 9.卡拉赞之夜 标准模式=1 2 3 4 5 8 9 狂野模式=all

z:卡牌是否乘以2

var data_cards = [{a:"zhongli",b:[{c:123,d:"恐怖的奴隶主",e:1,f:1,g:9,h:6,i:"有些德鲁伊做梦的时候都会被陌生人的“给我个激活！”的喊叫声惊醒",j:1},{}]}];

*/