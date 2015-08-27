(function(window){
	var Qjnn = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.dataclothes = option.data_clothes;
		this.dataarena = option.data_arena;
		this.o = {platform:"web",plugin:"plugin_952",type:1,clothestype:0,zhutiid:0,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}],te:[],oldwu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}]};

		this.init();
	};
	
	Qjnn.prototype = {
		calcClothes:function(){//计算衣服组
			var that = this,
			_dataclothes = that.dataclothes[that.o.clothestype].data,
			len = _dataclothes.length,
			htmllen = len,
			j,
			tempExchangVal,
			telen = that.o.te.length;
			
			function calcScore(){
				var dress_wu = arguments[0].wu,
				clothes_index = arguments[1],//当前类别下所有衣服的数组下标
				k,
				radix,
				total = 0;
				
				for(k in dress_wu){
					radix = dress_wu[k];
					for(var i=0; i<that.o.wu.length; i++){
						if(k == that.o.wu[i].k){
							total += radix*that.o.wu[i].r;
						}
					}
				}
				_dataclothes[clothes_index].total = total;
			}
			
			for(var i=0; i<len; i++){//计算衣服分数，乘以基数
				calcScore(_dataclothes[i],i);
			}
			
			while(htmllen>0){//冒泡排序，最大的放前面
				for(j=len-1; j>len-htmllen; j--){
					if(_dataclothes[j].total > _dataclothes[j-1].total){
						tempExchangVal = _dataclothes[j];
						_dataclothes[j] = _dataclothes[j-1];
						_dataclothes[j-1] = tempExchangVal;
					}
				}
				htmllen--;
			}

			if(telen != 0){
				var te2Arr = [],
				te1Arr = [],
				te0Arr = [],
				te = that.o.te,
				telen = te.length;
				
				for(var i=0; i<_dataclothes.length; i++){//把排完分数后的，再拆成有2个特殊属性/有1个特殊属性/没有特殊属性的三组数组最后再组合出来
					if(telen == 2 && (_dataclothes[i].te[0] == te[0] || _dataclothes[i].te[0] == te[1]) && (_dataclothes[i].te[1] == te[0] || _dataclothes[i].te[1] == te[1])){
						te2Arr.push(_dataclothes[i]);
					}else if(telen == 1 && (_dataclothes[i].te[0] == te[0] || _dataclothes[i].te[1] == te[0])){
						te1Arr.push(_dataclothes[i]);
					}else{
						te0Arr.push(_dataclothes[i]);
					}
				}
				that.dataclothes[that.o.clothestype].data = te2Arr.concat(te1Arr,te0Arr);
			}
			that.printClothes();
		},
		printClothes: function(){//打印衣服组
			var i = 0,
			_dataclothes = this.dataclothes[this.o.clothestype].data,
			len = _dataclothes.length,
			html = '';
			
			function printTeshu(){
				var _te = arguments[0];
				
				if(_te.length == 2){
					return '<div><span>'+_dataclothes[i].te[0]+'</span></div><div><span>'+_dataclothes[i].te[1]+'</span></div>';
				}else if(_te.length == 1){
					return '<div><span>'+_dataclothes[i].te[0]+'</span></div><div></div>';
				}else{
					return '<div><label>无特殊</label></div><div></div>';
				}
			}

			for(; i<len; i++){
				html += '<div class="item" data-id="'+_dataclothes[i].id+'">'+
							'<div class="item_inner">'+
								'<div class="t">'+
									'<div>'+_dataclothes[i].name+'</div>'+
									'<i class="t_l"></i>'+
									'<i class="t_m"></i>'+
									'<i class="t_r"></i>'+
								'</div>'+
								'<div class="m">'+
									printTeshu(_dataclothes[i].te)+
								'</div>'+
								'<div class="b">估算分:<span>'+_dataclothes[i].total+'</span></div>'+
							'</div>'+
						'</div>';
			}
			$("#clothes").scrollTop(0);
			$("#clothes").html(html);
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
				if(_dataclothes.te.length == 2){
					_html = '<div class="spe">'+
								'<div>'+_dataclothes.te[0]+'</div>'+
								'<div>'+_dataclothes.te[1]+'</div>'+
							'</div>';
				}else if(_dataclothes.te.length == 1){
					_html = '<div class="spe">'+
								'<div>'+_dataclothes.te[0]+'</div>'+
								'<div></div>'+
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
			
			var html = '<div class="btn_det_close" id="btn_det_close"></div>'+
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
						
			$("#dialog_det").html(html);
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
		opposite: function(){//取反义
			switch(arguments[0]){
				case "jianyue":return "huali";
				case "huali":return "jianyue";
				case "keai":return "chengshu";
				case "chengshu":return "keai";
				case "huopo":return "youya";
				case "youya":return "huopo";
				case "qingchun":return "xinggan";
				case "xinggan":return "qingchun";
				case "qingliang":return "baonuan";
				case "baonuan":return "qingliang";
			}
		},
		printDialogattr: function(){//打印搭配竞技场
			var html = '',
			that = this,
			_dataarena = that.dataarena,
			_type = that.o.type,			
			$dialog_content = $("#dialog_attr").children(".dialog_content");
				
			$dialog_content.removeClass("dialog_attr_content dialog_arena_content");
			if(_type == 1){//如果是五属性模拟器
				$dialog_content.addClass("dialog_attr_content");
				for(var i=0; i<that.o.oldwu.length; i++){
					html += '<div class="item">';
					if(that.o.oldwu[i].k == "jianyue" || that.o.oldwu[i].k == "keai" || that.o.oldwu[i].k == "huopo" || that.o.oldwu[i].k == "qingchun" || that.o.oldwu[i].k == "qingliang"){//确保这5个上面
						html += '<a class="btn_radio on" data-label="'+that.o.oldwu[i].k+'">'+that.switchlael(that.o.oldwu[i].k)+'</a>'+
								'<a class="btn_radio" data-label="'+that.opposite(that.o.oldwu[i].k)+'">'+that.switchlael(that.opposite(that.o.oldwu[i].k))+'</a>';
					}else{
						html += '<a class="btn_radio" data-label="'+that.opposite(that.o.oldwu[i].k)+'">'+that.switchlael(that.opposite(that.o.oldwu[i].k))+'</a>'+
								'<a class="btn_radio on" data-label="'+that.o.oldwu[i].k+'">'+that.switchlael(that.o.oldwu[i].k)+'</a>';
					}
					html += '</div>';
				}
			}else{
				$dialog_content.addClass("dialog_arena_content");
				function printDataarenahtml(i){
					if(that.o.zhutiid == _dataarena[i].id){
						return '<div class="item"><a class="btn_radio on" data-id="'+_dataarena[i].id+'">'+_dataarena[i].name+'</a></div>';
					}else{
						return '<div class="item"><a class="btn_radio" data-id="'+_dataarena[i].id+'">'+_dataarena[i].name+'</a></div>';
					}
				}
				for(var i=0; i<_dataarena.length; i++){
					if(_type == 2 && _dataarena[i].type == 2){//如果是搭配竞技场
						html += printDataarenahtml(i);
					}else if(_type == 3 && _dataarena[i].type == 3){//如果是联盟委托
						html += printDataarenahtml(i);
					}
				}
			}
			$dialog_content.html(html);
			easyDialog.open({
				container: "dialog_attr",
				fixed : false
			});
		},
		selectedbute: function(){//选择哪些属性
			var html = '';
			if(this.o.type == 1){
				$("#selectedbute").removeClass("content_zhuti");
				for(var i=0; i<this.o.wu.length; i++){
					html += '<div class="item"><span>'+this.switchlael(this.o.wu[i].k)+'</span></div>';
				}
			}else{
				$("#selectedbute").addClass("content_zhuti");
				for(var i=0; i<this.dataarena.length; i++){
					if(this.dataarena[i].id == this.o.zhutiid){
						html = '<div class="item"><span>'+this.dataarena[i].name+'</span></div>';
					}
				}
			}
			$("#selectedbute").html(html);
			
			this.calcClothes();
		},
		events: function(){
			var that = this;
			//选中横向滑动衣服类别
			$("#filter .item").click(function(){
				that.o.clothestype = Number($(this).attr("data-clothestype"));
				$(this).addClass("on").siblings().removeClass("on");
				that.selectedbute();
			});
			//竞技场、联盟委托、五属性打开
			$("#switchboard").children().click(function(){
				var _type = Number($(this).attr("data-type"));
				that.o.type = _type,
				that.printDialogattr();
			});
			//点击已选属性/主题 打开弹窗
			$("#selectedbute").click(function(){
				that.printDialogattr();
			});
			//关闭竞技场or五属性弹窗
			$(".btn_cancel").click(function(){
				easyDialog.close();
			});
			//在竞技场、联盟委托、五属性里面选择
			$("#dialog_attr").on("click", ".btn_radio", function(){
				if(that.o.type == 1){
					$(this).addClass("on").siblings().removeClass("on");
				}else{
					$(this).addClass("on").parent().siblings().children().removeClass("on");
				}
			});
			//点竞技场、联盟委托、五属性的确定
			$(".btn_sure").click(function(){
				if(that.o.type == 1){//五属性
					var wuArr = [];
					$("#dialog_attr .item").each(function(){
						var label = $(this).children(".on").attr("data-label");
						wuArr.push({k:label,r:1});
                    });
					that.o.oldwu = wuArr;
					that.o.wu = wuArr;
				}else{
					var _id = $("#dialog_attr .on").attr("data-id"),
					_item;

					if(_id === undefined){//一个都没选的时候,默认选中第一个
						_id = $("#dialog_attr .btn_radio").eq(0).attr("data-id");
					}
					for(var i=0; i<that.dataarena.length; i++){
						_item = that.dataarena[i];
						if(_id == _item.id){
							that.o.zhutiid = _item.id;
							that.o.wu = _item.wu;
							that.o.te = _item.te;
						}
					}
				}
				$("#switchboard").children().each(function(){
					var self = $(this);
                    if(Number(self.attr("data-type")) == that.o.type){
						self.addClass("on").siblings().removeClass("on");
					}
                });
				that.selectedbute();
				easyDialog.close();
			});
			
			//衣服打开弹窗
			$(".clothes").on("click", ".item", function(){
				that.showclothes($(this).attr("data-id"));
				easyDialog.open({
				  container: "dialog_det",
				  fixed : false
				});
			});
			//关闭详情弹窗
			$("#dialog_det").on("click", "#btn_det_close", function(){
				easyDialog.close();
			});
			
			//旋转屏幕重新设置高度
			$(window).resize(function(e) {
                that.setHight();
            });
		},
		printfilter: function(){//打印横向滑动选择 头发/连衣裙/外套
			var html = '',
			_dataclothes = this.dataclothes,
			len = _dataclothes.length,
			i = 0;
			for(; i<len; i++){
				html += '<li class="item" data-clothestype="'+i+'">'+_dataclothes[i].tname+'</li>';
			}
			$("#filter").html(html);
			this.setfilter();
		},
		setfilter: function(){//设置横向滑动条
			var $filter = $("#filter"),
			$item = $filter.children(".item"),
			item_w = 0;
			$item.each(function(){
				item_w += $(this).innerWidth();
			});
			$filter.width(item_w+1);
		},
		mergeData: function(){//合并数据
			var _dataclothes = this.dataclothes,
			newArr = [];
			for(var i=0; i<_dataclothes.length; i++){
				if(i>=9){
					for(var j=0; j<_dataclothes[i].data.length; j++){
						newArr.push(_dataclothes[i].data[j]);
					}
				}
			}
			this.dataclothes[9] = {tname:"饰品",id:10,data:newArr};
			this.dataclothes = this.dataclothes.slice(0,10);
		},
		setHight: function(){
			var headerH = 45;
			if(this.o.platform == "ios"){
				headerH = 0;
			}
			var _h = $(window).height() - 204 - headerH;//40+86+44+17+17=204
			_h = _h >= 220 ? _h : 220;//去掉头的iphone4 480
			$("#clothes").height(_h);
		},
		isplatform: function(){//判断打包平台显示相应内容
			this.checkversion();
			function removehide(){
				$("#header").removeClass("hide");
			}
			if(this.o.platform == "web"){
				removehide();
			}else if(this.o.platform == "android"){
				removehide();
				$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
			}
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
		init: function(){
			this.isplatform();
			this.setHight();
			this.mergeData();
			this.printfilter();			
			this.events();
			$("#filter .item").eq(0).trigger("click");
		}
	};
	
	window.Qjnn = Qjnn;
})(window);
/*
简约,华丽,可爱,成熟,活泼,优雅,清纯,性感,清凉,保暖
jianyue,huali,keai,chengshu,huopo,youya,qingchun,xinggan,qingliang,baonuan
头发,连衣裙,外套,上衣,下装,袜子,鞋,头饰,耳饰,颈饰...

2 C
3 B
4 A
5 S
6 SS

	
var data_clothes = [{id:1,tname:"头发",data:[{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:999999,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:["特殊属性1","特殊属性2"],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8145,name:"头发2",te:["特殊属性1","特殊属性2"],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,qingliang:5}},{id:8145,name:"头发3",te:["特殊属性1","特殊属性2"],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:2,tname:"连衣裙",data:[{id:8145,name:"连衣裙1",te:["特殊属性1","特殊属性2"],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8146,name:"不羁",te:[],g:"",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8434,name:"白翩语",te:[],g:"暂无",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:3,tname:"外套",data:[]},{id:4,tname:"上衣",data:[]},{id:5,tname:"下装",data:[]},{id:6,tname:"袜子",data:[]}];

var data_arena = [{id:10130,name:"金色音乐厅",type:2,wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]},{id:10131,name:"秋日物语",type:2,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}]},{id:10132,name:"海边派对的搭配",type:3,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"qingliang",r:1}],te:[]},{id:10133,name:"冬天里的一把火",type:3,wu:[{k:"huali",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}],te:["特殊属性1","特殊属性2"]}];

*/
























