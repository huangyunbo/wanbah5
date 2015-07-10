(function(window){
	var QjnnTmp = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.dataclothes = option.data_clothes;
		this.dataarena = option.data_arena;
		this.o = {type:1,clothestype:0,zhuti:"",label:["jianyue","huopo","keai","qingchun","baonuan"]};

		this.init();
	}
	
	QjnnTmp.prototype = {
		printFilterclothes: function(){//打印横向滑动选择 头发/连衣裙/外套
			var _html = '',
			_dataclothes = this.dataclothes,
			len = _dataclothes.length,
			i;
			for(i=0; i<len; i++){
				_html += '<a class="item" data-type="'+i+'">'+_dataclothes[i].tname+'</a>';
			}
			$("#filter .filter_inner").html(_html);
		},
		filterclothesScroll: function(){//设置横向滑动条
			var $filter = $("#filter"),
			$item = $filter.find("a.item"),
			_w = 0;

			$item.each(function(){
				_w += $(this).innerWidth();
			});
			
			$filter.children().width(_w);//先设置宽度
			
			var myscroll = new IScroll("#filter", {//再设置滑动
				scrollX: true,
				scrollY: false,
				bounce: false,
				click: true
			});
		},
		printArena: function(){//打印搭配竞技场
			var _html = '',
			_dataarena = this.dataarena,
			i;
			for(i=0; i<_dataarena.length; i++){
				_html += '<div class="item"><a class="btn_arena" data-id="'+_dataarena[i].id+'">'+_dataarena[i].name+'</a></div>';
			}
			$("#dialog_arena .dialog_content").html(_html);
		},
		calcClothes:function(index){//计算衣服组
			var that = this,
			_dataclothes = that.dataclothes[that.o.clothestype].data,
			htmllen = len = _dataclothes.length,
			j,
			tempExchangVal;
			
			function calcScore(){//计算衣服的数值和最高的2个标签
				var _wu = arguments[0].wu,
				clothes_index = arguments[1],
				k,
				score,
				total = 0
				labelnum = 0,
				temp1 = {},
				temp2 = {},
				temp3 = {};
				
				for(k in _wu){
					score = _wu[k];
					for(var i=0; i<that.o.label.length; i++){
						if(k == that.o.label[i]){
							total += _wu[k];
						}
					}
					if(labelnum == 0){
						temp1 = {k:k,v:score};//赋值第1个
					}else if(labelnum == 1){
						temp2 = {k:k,v:score};//赋值第2个
						if(temp1.v > temp2.v){//先默认排成第2个比第1个大
							temp3 = temp2;
							temp2 = temp1;
							temp1 = temp3;
						}
					}else if(labelnum > 1){//从第3个开始对比
						if(score > temp1.v && score <= temp2.v){//如果第n个数比第1个大且小于等于第2个，则把第n个数赋值给第1个
							temp1 = {k:k,v:score};
						}else if(score > temp2.v){//如果第n个数比第2个大，则把第2个数赋值给第1个，第n个赋值给第2个
							temp1 = temp2;
							temp2 = {k:k,v:score};
						}
					}
					labelnum++;
				}
				_dataclothes[clothes_index].total = total;
				_dataclothes[clothes_index].high1 = that.switchlael(temp1.k);
				_dataclothes[clothes_index].high2 = that.switchlael(temp2.k);
			}
			
			for(var i=0; i<htmllen; i++){//优先计算衣服的数值和最高的2个标签
				calcScore(_dataclothes[i],i);
			}
			
			while(len>0){//冒泡排序，最大的放前面
				for(j=htmllen-1; j>htmllen-len; j--){
					if(_dataclothes[j].total > _dataclothes[j-1].total){
						tempExchangVal = _dataclothes[j];
						_dataclothes[j] = _dataclothes[j-1];
						_dataclothes[j-1] = tempExchangVal;
					}
				}
				len--;
			}
			that.printClothes();
		},
		caidan: function(){//彩蛋
			var _html = '',
			caidan_id = arguments[0],
			day_id = [[8161,8651,8843,8982,9229],[8402,9371,9504,10310,10298],[9860,10300,9809,9844,8269],[8251,8472,10242,8992,9241]],
			myDate = new Date(),
			myDate = myDate.valueOf(),
			
			day0 = new Date(Date.UTC(2015,6,11,12,0,0)),
			day0 = day0.valueOf();
			
			day1 = new Date(Date.UTC(2015,6,12,12,0,0)),
			day1 = day1.valueOf(),
			
			day2 = new Date(Date.UTC(2015,6,13,12,0,0)),
			day2 = day2.valueOf(),
			
			day3 = new Date(Date.UTC(2015,6,14,12,0,0)),
			day3 = day3.valueOf(),
			
			day4 = new Date(Date.UTC(2015,6,15,12,0,0)),
			day4 = day4.valueOf();
			
			function isDay(){
				var _day = arguments[0],
				_id = arguments[1];
				for(var i=0; i<day_id[_day].length; i++){
					if(day_id[_day][i] == _id){
						return true;
					}
				}
				return false;
			}

			switch(true){
				case (myDate >= day0 && myDate < day1):
					return _html = isDay(0,caidan_id) == true ? '<i class="caidan"></i>' : '';
				case (myDate >= day1 && myDate < day2):
					return _html = isDay(1,caidan_id) == true ? '<i class="caidan"></i>' : '';
				case (myDate >= day2 && myDate < day3):
					return _html = isDay(2,caidan_id) == true ? '<i class="caidan"></i>' : '';
				case (myDate >= day3 && myDate < day4):
					return _html = isDay(3,caidan_id) == true ? '<i class="caidan"></i>' : '';
			}
			
			return _html;
		},
		printClothes: function(){//打印衣服组
			var pagesize = 30,
			pagecurrent = i = arguments[0] != undefined ? arguments[0] : 0,
			_dataclothes = this.dataclothes[this.o.clothestype].data,
			len = _dataclothes.length,
			totalpage = Math.floor(len / pagesize),
			_html = '';
			
			if(Math.floor(i / pagesize) == totalpage){
				for(; i<len; i++){
					_html += '<div class="item" data-id="'+_dataclothes[i].id+'">'+
								'<div class="t">'+
									'<div>'+_dataclothes[i].name+'</div>'+
									'<i class="t_l"></i>'+
									'<i class="t_m"></i>'+
									'<i class="t_r"></i>'+
								'</div>'+
								'<div class="m">'+
									'<div><span>'+_dataclothes[i].high1+'</span></div>'+
									'<div><span>'+_dataclothes[i].high2+'</span></div>'+
								'</div>'+
								'<div class="b">估算分:<span>'+_dataclothes[i].total+'</span></div>'+
								this.caidan(_dataclothes[i].id)+
							'</div>';
				}
			}else{
				for(; i<pagecurrent+pagesize; i++){
					_html += '<div class="item" data-id="'+_dataclothes[i].id+'">'+
								'<div class="t">'+
									'<div>'+_dataclothes[i].name+'</div>'+
									'<i class="t_l"></i>'+
									'<i class="t_m"></i>'+
									'<i class="t_r"></i>'+
								'</div>'+
								'<div class="m">'+
									'<div><span>'+_dataclothes[i].high1+'</span></div>'+
									'<div><span>'+_dataclothes[i].high2+'</span></div>'+
								'</div>'+
								'<div class="b">估算分:<span>'+_dataclothes[i].total+'</span></div>'+
								this.caidan(_dataclothes[i].id)+
							'</div>';
				}
				_html += '<div class="clear"></div><div id="loadmore" data-pagecurrent="'+i+'">加载更多</div>';
			}
			
			if(arguments[0] != undefined){
				$("#clothes").append(_html);
			}else{
				$("#clothes").scrollTop(0);
				$("#clothes").html(_html);
			}
			
		},
		switchlael: function(){
			switch(arguments[0]){
				case "jianyue":return "简约";
				case "huali":return "华丽";
				case "keai":return "可爱";
				case "chengshu":return "成熟";
				case "huopo":return "活泼";
				case "youya":return "优雅";
				case "qingchun":return "清纯";
				case "xinggan":return "性感";
				case "qingliang":return "清凉";
				case "baonuan":return "保暖";
			}
		},
		selectedbute: function(){//选择哪些属性
			var _html = '';
			if(this.o.type == 1){
				for(var i=0; i<this.o.label.length; i++){
					_html += '<div class="item">'+this.switchlael(this.o.label[i])+'</div>';
				}
			}else{
				_html = '<div class="item">'+this.o.zhuti+'</div>';
			}
			$("#selectedbute").html(_html);
			
			this.calcClothes();
		},
		showclothes: function(clothes_id){//打开单个衣服展示详情
			var that = this,
			_clothestype = that.o.clothestype,
			_dataclothes = that.dataclothes[_clothestype].data;
			for(var i=0; i<_dataclothes.length; i++){
				if(_dataclothes[i].id == clothes_id){
					_dataclothes = _dataclothes[i];
				}
			}
			function rate(){//评级s
				var k,
				r = "",
				_html = "";
				
				switch(_clothestype){
					case 0:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 650:r="B";break;
								case 825:r="A";break;
								case 1050:r="S";break;
								case 1250:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 1:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 2750:r="B";break;
								case 3400:r="A";break;
								case 4000:r="S";break;
								case 5100:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 2:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 255:r="B";break;
								case 330:r="A";break;
								case 410:r="S";break;
								case 505:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 3:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 1325:r="B";break;
								case 1550:r="A";break;
								case 1925:r="S";break;
								case 2725:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 4:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 1325:r="B";break;
								case 1550:r="A";break;
								case 1925:r="S";break;
								case 2725:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 5:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 420:r="B";break;
								case 495:r="A";break;
								case 610:r="S";break;
								case 860:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 6:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 555:r="B";break;
								case 600:r="A";break;
								case 860:r="S";break;
								case 1000:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 7:
					case 8:
					case 9:
					case 10:
					case 11:
					case 12:
					case 13:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 250:r="B";break;
								case 310:r="A";break;
								case 410:r="S";break;
								case 485:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
					case 14:
						for(k in _dataclothes.wu){
							switch(_dataclothes.wu[k]){
								case 120:r="B";break;
								case 130:r="A";break;
								case 190:r="S";break;
								case 265:r="SS";break;
								default:r="C";
							}
							_html += '<div class="item">'+that.switchlael(k)+'&middot;'+r+'</div>';
						}
						break;
				}
				return _html;
			}
			function spec(){//特殊属性
				var _html = "";
				if(_dataclothes.t1 || _dataclothes.t1){
					_html = '<div class="spe">'+
								'<div>'+_dataclothes.t1+'</div>'+
								'<div>'+_dataclothes.t2+'</div>'+
							'</div>';
				}
				return _html;
			}
			function gain(){//获取途径
				var _html = "",
				_arr;
				if(_dataclothes.g){
					_arr = _dataclothes.g.split("/");
					for(var i=0; i<_arr.length; i++){
						_html += '<div>'+_arr[i]+'</div>';
					}
				}
				return _html;
			}
			
			var _html = '<div class="btn_det_close" id="btn_det_close"></div>'+
						'<div class="title">'+
							'<div class="l"><i></i></div>'+
							'<div class="m">'+_dataclothes.name+'</div>'+
							'<div class="r"><i></i></div>'+
						'</div>'+
						'<div class="content">'+rate()+'</div>'+
						spec()+
						'<div class="title">'+
							'<div class="l"><i></i></div>'+
							'<div class="m m2">获取途径</div>'+
							'<div class="r"><i></i></div>'+
						'</div>'+
						'<div class="content2">'+
							gain()+
						'</div>';
						
			$("#dialog_det").html(_html);
		},
		setHight: function(){
			var headerH = $("#header").outerHeight();
			headerH = headerH === null ? 0 : headerH;
			var _h = $(window).height() - 251 - headerH;//48+125+44+17+17
			_h = _h >= 229 ? _h : 229;
			$("#clothes").height(_h);
		},
		events: function(){
			var that = this;
			//选中横向滑动衣服类别
			$("#filter .item").click(function(){
				that.o.clothestype = Number($(this).attr("data-type"));
				$(this).addClass("on").siblings().removeClass("on");
				that.selectedbute();
			});
			
			//竞技场打开弹窗
			$("#btn_dialog_arena").click(function(){
				easyDialog.open({
				  container: "dialog_arena",
				  fixed : false
				});
			});
			//五属性打开弹窗
			$("#btn_dialog_wu").click(function(){
				easyDialog.open({
				  container: "dialog_wu",
				  fixed : false
				});
			});
			//点击已选属性/主题 打开弹窗
			$("#selectedbute").on("click", ".item", function(){
				if(that.o.type == 1){
					easyDialog.open({
					  container: "dialog_wu",
					  fixed : false
					});
				}else if(that.o.type == 2){
					easyDialog.open({
					  container: "dialog_arena",
					  fixed : false
					});
				}
			});
			//衣服打开弹窗
			$(".clothes").on("click", ".item", function(){
				that.showclothes($(this).attr("data-id"));
				easyDialog.open({
				  container: "dialog_det",
				  fixed : false
				});
			});
			//关闭竞技场or五属性弹窗
			$(".btn_cancel").click(function(){
				easyDialog.close();
			});
			//关闭详情弹窗
			$("#dialog_det").on("click", "#btn_det_close", function(){
				easyDialog.close();
			});
			//在五属性里面选择
			$("#dialog_wu .btn_radio").click(function(){
				$(this).addClass("on").siblings().removeClass("on");
			});
			//在竞技场里面选择
			$("#dialog_arena").on("click", ".btn_arena", function(){
				$(this).addClass("on").parent().siblings().children().removeClass("on");
			});
			//点五属性或则竞技场的确定
			$(".btn_sure").click(function(){
				if($(this).attr("data-type") == 1){//五属性
					var labelArr = [];
					that.o.type = 1;
					$("#dialog_wu .item").each(function(){
						labelArr.push($(this).children(".on").attr("data-label"));
                    });
					that.o.label = labelArr;
				}else{
					that.o.type = 2;//竞技场
					var dataarena_id = $("#dialog_arena .on").attr("data-id"),
					dataarena_item;
					for(var i=0; i<that.dataarena.length; i++){
						dataarena_item = that.dataarena[i];
						if(dataarena_id == dataarena_item.id){
							that.o.zhuti = dataarena_item.name;
							that.o.label = dataarena_item.wu;
						}
					}
				}
				that.selectedbute();
				easyDialog.close();
			});
			//旋转屏幕重新设置高度
			$(window).resize(function(e) {
                that.setHight();
            });
			//加载更多
			$("#clothes").on("click", "#loadmore", function(){
				var _this = $(this);
				_num  = Number(_this.attr("data-pagecurrent"));
				_this.prev().remove();
				_this.remove();
				that.printClothes(_num);
			});
		},
		init: function(){
			this.printFilterclothes();
			this.events();
			this.setHight();
			$("#filter .item").eq(0).trigger("click");
			this.filterclothesScroll();
			this.printArena();
			
			
		}
	}
	
	window.QjnnTmp = QjnnTmp;
})(window);
/*
1:简约,2:华丽,3:可爱,4:成熟,5:活泼,6:优雅,7:清纯,8:性感,9:清凉,10:保暖
jianyue:0,huali:0,keai:0,chengshu:0,huopo:0,youya:0,qingchun:0,xinggan:0,qingliang:0,baonuan:0
1:头发,2:连衣裙,3:外套,4:上衣,5:下装,6:袜子,7:鞋,8:头饰,9:耳饰,10:颈饰...

2 C
3 B
4 A
5 S
6 SS
*/
	
	//var data_clothes = [{tname:"头发",data:[{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:999999,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",t1:"特殊属性1",t2:"特殊属性2",g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8145,name:"头发2",t1:"特殊属性1",t2:"特殊属性2",g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,qingliang:5}},{id:8145,name:"头发3",t1:"特殊属性1",t2:"特殊属性2",g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{tname:"连衣裙",data:[{id:8145,name:"连衣裙1",t1:"特殊属性1",t2:"特殊属性2",g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8146,name:"不羁",t1:"",t2:"",g:"",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8434,name:"白翩语",t1:"",t2:"",g:"暂无",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{tname:"外套",data:[]},{tname:"上衣",data:[]},{tname:"下装",data:[]},{tname:"袜子",data:[]}];
	//var data_arena = [{id:10130,name:"金色音乐厅",wu:["huali","chengshu","youya","xinggan","baonuan"]},{id:10131,name:"秋日物语",wu:["jianyue","keai","huopo","qingchun","baonuan"]},{id:10132,name:"海边派对的搭配",wu:["jianyue","keai","huopo","xinggan","qingliang"]},{id:10133,name:"冬天里的一把火",wu:["huali","keai","huopo","xinggan","baonuan"]}];



