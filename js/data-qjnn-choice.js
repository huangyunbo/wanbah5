(function(window){
	var Qjnn = function(option){
		if(arguments[0] === undefined) return false;
		data_all = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.dataclothes = data_all.data_clothes;
		this.dataclothes_back = $.extend(true,[],data_all.data_clothes);//是二维数组，需要深度拷贝
		this.dataarena = data_all.data_arena;
		this.datate = data_all.data_te;
		this.datagates = data_all.data_gates;
		this.o = {
					platform:"web",//针对平台
					plugin:"plugin_952",//服装搭配器的板块ID
					clothestype:{id:1,oldid:1,parentid:0,haskid:0,state:0},//id:是选中哪一个,oldid:记录上次点击的id(没有子集的),parentid:父级id是谁,haskid:是否有子集,state:0默认 1已选 2搜索
					worktype:0,//要处理的类别 0:衣柜 1:竞技场 2:联盟委托 3:关卡 4:基本属性 5:特殊属性 6:保存套装
					way:0,//选择的4条路 0:衣柜 1:竞技场 2:联盟委托 3:关卡
					isway:[false,false],//竞技场 联盟委托 关卡,第一层默认false,false 确认后true,false 第二层打开true,true
					wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}],//五属性
					te:[],//特殊属性
					zhuti:"",
					beam:0
					//choiceclothes:{"data":[{"id":1,"name":"自己的套装","dress":[]}]}//已选的衣服
				 };

		this.init();
	};
	
	Qjnn.prototype = {
		printClothes2: function(){//打印衣服组
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
					case 6:
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
					case 7:
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
					case 8:
					case 9:
					case 10:
					case 11:
					case 12:
					case 13:
					case 14:
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
					case 15:
						for(k in _dataclothes.wu){//妆容
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
		so: function(){//搜索处理
			var keyword = arguments[0],
			_dataclothes = $.extend(true,[],this.dataclothes_back),
			_dataArr,
			_data,
			j;
			
			keyword = $.trim(keyword);
			if(keyword.length == 0) return;
			
			this.o.clothestype.state = 2;
			for(var i=0; i<_dataclothes.length; i++){
				_dataArr = [];
				_data = _dataclothes[i].data;
				for(j=0; j<_data.length; j++){
					if(_data[j].name.indexOf(keyword) != -1){
						_dataArr.push(_data[j]);
					}
				}
				_dataclothes[i].data = _dataArr;
			}
			this.dataclothes = _dataclothes;
			this.calcClothestype();
			this.calcWardrobe();
		},
		setBeam: function(){//设置中间的横梁 0:基本属性 特殊属性 1:爱斯基摩旅行 2:搜索
			var _beam = arguments[0];
			if(_beam == 0){
				this.printNature();
			}else if(_beam == 1){
				$("#beam_title").html(this.o.zhuti);
			}
			
			$("#beam").children().eq(_beam).removeClass("hide").siblings().addClass("hide");
		},
		printNature: function(){//基本属性和特殊属性的弹窗
			var html_dialog_4 = '',//基本属性
			html_dialog_5 = '',//特殊属性
			_datate = this.datate;
			
			for(var i=0; i<this.o.wu.length; i++){//打印基本属性的弹窗内容
				html_dialog_4 += '<div class="item">';
				if(this.o.wu[i].k == "jianyue" || this.o.wu[i].k == "keai" || this.o.wu[i].k == "huopo" || this.o.wu[i].k == "qingchun" || this.o.wu[i].k == "qingliang"){//确保这5个上面
					html_dialog_4 += '<a class="on" data-label="'+this.o.wu[i].k+'">'+this.switchlael(this.o.wu[i].k)+'</a>'+
							'<a data-label="'+this.opposite(this.o.wu[i].k)+'">'+this.switchlael(this.opposite(this.o.wu[i].k))+'</a>';
				}else{
					html_dialog_4 += '<a data-label="'+this.opposite(this.o.wu[i].k)+'">'+this.switchlael(this.opposite(this.o.wu[i].k))+'</a>'+
							'<a class="on" data-label="'+this.o.wu[i].k+'">'+this.switchlael(this.o.wu[i].k)+'</a>';
				}
				html_dialog_4 += '</div>';
			}

			for(var i=0; i<_datate.length; i++){//打印特殊属性的弹窗内容
				if(this.datate[i].id == this.o.te[0] || this.datate[i].id == this.o.te[1]){
					html_dialog_5 += '<div class="item on" data-id="'+_datate[i].id+'"><span>'+_datate[i].k+'</span></div>';
				}else{
					html_dialog_5 += '<div class="item" data-id="'+_datate[i].id+'"><span>'+_datate[i].k+'</span></div>';
				}
			}
			
			$("#dialog_4").html(html_dialog_4);
			$("#dialog_5").html(html_dialog_5);
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
		work: function(){//弹窗完后处理
			switch(this.o.worktype){
				case 0://处理衣柜
					if(this.o.clothestype.state == 2){//如果是搜索状态就重新获取原数据
						this.dataclothes = $.extend(true,[],this.dataclothes_back);
						this.o.clothestype.state = 0;
						this.calcClothestype();
					}
					
					this.o.wu = [{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}];
					this.o.te = [];
					this.o.way = 0;
					this.setWay();
					this.setBeam(0);
					this.calcWardrobe();
					easyDialog.close();
					break;
				case 1://处理竞技场
					if(this.o.clothestype.state == 2){
						this.dataclothes = $.extend(true,[],this.dataclothes_back);
						this.o.clothestype.state = 0;
						this.calcClothestype();
					}
					
					this.o.isway[0] = false;
					this.o.isway[1] = false;
					var _id = Number($("#dialog_1").attr("data-id"));
					for(var i=0; i<this.dataarena.length; i++){
						if(this.dataarena[i].id == _id){
							this.o.wu = this.dataarena[i].wu;
							this.o.te = this.dataarena[i].te;
							this.o.zhuti = this.dataarena[i].name;
						}
					}
					this.o.way = 1;
					this.setWay();
					this.setBeam(1);
					this.calcWardrobe();
					easyDialog.close();
					break;
				case 2://处理联盟委托
					if(this.o.clothestype.state == 2){
						this.dataclothes = $.extend(true,[],this.dataclothes_back);
						this.o.clothestype.state = 0;
						this.calcClothestype();
					}
					
					this.o.isway[0] = false;
					this.o.isway[1] = false;
					var _id = Number($("#dialog_2").attr("data-id"));
					for(var i=0; i<this.dataarena.length; i++){
						if(this.dataarena[i].id == _id){
							this.o.wu = this.dataarena[i].wu;
							this.o.te = this.dataarena[i].te;
							this.o.zhuti = this.dataarena[i].name;
						}
					}
					this.o.way = 2;
					this.setWay();
					this.setBeam(1);
					this.calcWardrobe();
					easyDialog.close();
					break;
				case 3://处理关卡
					if(this.o.clothestype.state == 2){
						this.dataclothes = $.extend(true,[],this.dataclothes_back);
						this.calcClothestype();
						this.o.clothestype.state = 0;
					}
					
					this.o.isway[0] = false;
					this.o.isway[1] = false;
					var _index = Number($("#dialog_3").attr("data-index"));
					var _id = Number($("#dialog_3_box").attr("data-id"));
					for(var i=0; i<this.datagates[_index].data.length; i++){
						if(this.datagates[_index].data[i].id == _id){
							this.o.wu = this.datagates[_index].data[i].wu;
							this.o.te = this.datagates[_index].data[i].te;
							this.o.zhuti = this.datagates[_index].data[i].name;
						}
					}
					this.o.way = 3;
					this.setWay();
					this.setBeam(1);
					this.calcWardrobe();
					easyDialog.close();
					break;
				case 4://基本属性
					var wuArr = [];
					$("#dialog_4 .item").each(function(){
						wuArr.push({k:$(this).children(".on").attr("data-label"),r:1});
                    });
					this.o.wu = wuArr;
					this.calcWardrobe();
					easyDialog.close();
					break;
				case 5://特殊属性
					this.calcWardrobe();
					easyDialog.close();
					break;
				case 6://保存套装
					easyDialog.close();
					console.log("保存套装");
					break;
			}
		},
		setWay: function(){//0:衣柜 1:竞技场 2:联盟委托 3:关卡 选中样式
			$("#way").children().eq(this.o.way).addClass("on").siblings().removeClass("on");
		},
		sureWay: function(){//0:衣柜 1:竞技场 2:联盟委托 3:关卡 摁下确定键调用的函数
			var that = this;
			function autoselected(){
				switch(that.o.worktype){
					case 1:
						if(!$("#dialog_1").children().hasClass("on")){
							$("#dialog_1").children().eq(0).trigger("click");
						}
						break;
					case 2:
						if(!$("#dialog_2").children().hasClass("on")){
							$("#dialog_2").children().eq(0).trigger("click");
						}
						break;
					case 3:
						if(!$("#dialog_3_box").find(".item").hasClass("on")){
							$("#dialog_3_box").find(".item").eq(0).trigger("click");
						}
						break;
				}
			}					
			if(that.o.worktype == 0){//0:衣柜
				that.work();
			}else{// 1:竞技场 2:联盟委托 3:关卡
				if(!that.o.isway[0] && !that.o.isway[1]){//[false,false]
					that.o.isway[0] = true;
					autoselected();
					that.way();
				}else if(that.o.isway[0] && that.o.isway[1]){//[true,true]
					that.work();
				}
			}
		},
		way: function(){//0:衣柜 1:竞技场 2:联盟委托 3:关卡 处理这4种弹窗
			if(this.o.worktype == 0){//选择衣柜
				this.openDialog(0);
			}else{//1:竞技场 2:联盟委托 3:关卡
				if(!this.o.isway[0] && !this.o.isway[1]){//[false,false]
					this.openDialog(this.o.worktype);
				}else if(this.o.isway[0] && !this.o.isway[1]){//[true,false]
					easyDialog.close();
					this.openDialog(0);
					this.o.isway[1] = true;
				}else if(this.o.isway[0] && this.o.isway[1]){//[true,true]
					this.o.isway[0] = false;
					this.o.isway[1] = false;
					this.openDialog(this.o.worktype);
				}
			}
		},
		openDialog: function(){//弹窗 0:清空 1:竞技场 2:联盟委托 3:关卡 4:基本属性 5:特殊属性 6:保存套装
			$("#dialog .content").children().siblings().addClass("hide").eq(arguments[0]).removeClass("hide");
			easyDialog.open({
				container: "dialog",
				fixed : false
			});			
		},
		events: function(){
			var that = this;
			
			//旋转屏幕重新设置
			$(window).resize(function(e){
                that.pageReset();
            });
		},
		htmlClothes: function(){//衣服页
			var that = this;
			
			//选择四大路打开
			$("#way .item").click(function(){
				var _index = $("#way .item").index($(this));
				that.o.worktype = _index;
				that.way();
			});
			//基本属性弹窗
			$("#btn_jibenshuxing").click(function(){
				that.o.worktype = 4;
				that.openDialog(4);
			});
			//特殊属性弹窗
			$("#btn_teshushuxing").click(function(){
				that.o.worktype = 5;
				that.openDialog(5);
			});
			//关闭所有弹窗
			$("#btn_cancel").click(function(){
				easyDialog.close();
			});
			//确定弹窗
			$("#btn_sure").click(function(){
				if(that.o.worktype == 0 || that.o.worktype == 1 || that.o.worktype == 2 || that.o.worktype == 3){//是这4种状态，考虑确定键询问是否清空
					that.sureWay();
				}else{
					that.work();
				}
			});
			//返回衣服类别
			$("#clothestype_back").click(function(){
				$("#container").removeClass("clothestype_two");
				that.o.clothestype.haskid = 0;
				that.o.clothestype.parentid = 0;
				that.printClothestype();
			});
			//竞技场点选
			$("#dialog_1").on("click",".item",function(){
				$("#dialog_1").attr("data-id",$(this).attr("data-id"));
				$(this).addClass("on").siblings().removeClass("on");
			});
			//联盟委托点选
			$("#dialog_2").on("click",".item",function(){
				$("#dialog_2").attr("data-id",$(this).attr("data-id"));
				$(this).addClass("on").siblings().removeClass("on");
			});
			//关卡点选
			$("#dialog_3").on("click",".item",function(){
				var _index = Number($(this).attr("data-index"));
				$("#dialog_3").attr("data-index",_index);
				$(this).addClass("on").siblings().removeClass("on");
				$("#dialog_3_box").children().eq(_index).removeClass("hide").siblings().addClass("hide");
			});
			//关卡点选
			$("#dialog_3_box").on("click",".item",function(){
				$("#dialog_3_box").attr("data-id",$(this).attr("data-id"));
				$("#dialog_3_box").find(".item.on").removeClass("on");
				$(this).addClass("on");
			});
			//基本属性点选
			$("#dialog_4").on("click","a",function(){
				$(this).addClass("on").siblings().removeClass("on");
			});
			//特殊属性点选
			$("#dialog_5").on("click",".item",function(){
				var _te = that.o.te,
				_id = Number($(this).attr("data-id"));
				
				if(_te.length == 0){//0个特殊属性
					_te.push(_id);
					$(this).addClass("on");
				}else if(_te.length == 1){//1个特殊属性
					if(_te[0] == _id){
						_te.splice(0,1);
						$(this).removeClass("on");
					}else{
						_te.push(_id);
						$(this).addClass("on");
					}
				}else if(_te.length == 2){//2个特殊属性
					if(_te[0] == _id){
						_te.splice(0,1);
						$(this).removeClass("on");
					}else if(_te[1] == _id){
						_te.splice(1,1);
						$(this).removeClass("on");
					}else{
						$("#dialog_5").children().each(function(index, element) {
							if(Number($(element).attr("data-id")) == _te[1]){
								$(element).removeClass("on");
							}
                        });
						_te.splice(1,1,_id);
						$(this).addClass("on");
					}
				}
			});
			//放大镜
			$("#beam .zoom").click(function(){
				that.setBeam(2);
			});
			//确认搜索
			$("#btn_so_sure").click(function(){
				that.so($("#so_text").val());
			});
			//取消搜索
			$("#btn_so_cancel").click(function(){
				if(that.o.way == 0){
					that.setBeam(0);
				}else{
					that.setBeam(1);
				}
			});
			
			this.setBeam(0);
			this.calcClothestype();
			
			//选中衣服类别
			$("#clothestype").on("click",".item",function(){
				that.o.clothestype.id = Number($(this).attr("data-id"));
				that.o.clothestype.parentid = Number($(this).attr("data-parentid"));
				$(this).addClass("on").siblings().removeClass("on");
				
				if(Number($(this).attr("data-haskid")) > 0){
					that.o.clothestype.haskid = 1;
					that.o.clothestype.parentid = that.o.clothestype.id;//有子集的把自己的id赋给parentid
					$("#clothestype").parent().scrollTop(0);
					that.printClothestype();
				}else{
					that.o.clothestype.oldid = that.o.clothestype.id;//记住单一级的衣服类别选中状态
					that.calcWardrobe();
				}
			}).children().eq(0).trigger("click");
			
			this.printWay();
		},
		printWay: function(){//打印竞技场 联盟委托 关卡
			var html_dialog_1 = '',//竞技场
			html_dialog_2 = '',//联盟委托
			html_dialog_3 = '',//关卡
			html_dialog_3_box = '',//关卡
			_dataarena = this.dataarena,
			_datagates = this.datagates;
			
			for(var i=0; i<_dataarena.length; i++){
				if(_dataarena[i].type == 2){
					html_dialog_1 += '<div class="item" data-id="'+_dataarena[i].id+'"><span>'+_dataarena[i].name+'</span></div>';
				}else if(_dataarena[i].type == 3){
					html_dialog_2 += '<div class="item" data-id="'+_dataarena[i].id+'"><span>'+_dataarena[i].name+'</span></div>';
				}
			}
			for(var i=0; i<_datagates.length; i++){
				if(i == 0){
					html_dialog_3 += '<div class="item on" data-index="'+i+'">'+_datagates[i].gname+'</div>';
					html_dialog_3_box += '<div class="box">';
				}else{
					html_dialog_3 += '<div class="item" data-index="'+i+'">'+_datagates[i].gname+'</div>';
					html_dialog_3_box += '<div class="box hide">';
				}
				for(var j=0; j<_datagates[i].data.length; j++){
					html_dialog_3_box += '<div class="item" data-id="'+_datagates[i].data[j].id+'"><div>'+_datagates[i].data[j].name+'</div></div>';
				}
				html_dialog_3_box += '</div>';
			}
			
			$("#dialog_1").html(html_dialog_1);
			$("#dialog_2").html(html_dialog_2);
			$("#dialog_3").html(html_dialog_3);
			$("#dialog_3_box").html(html_dialog_3_box);
		},
		calcWardrobe:function(){//计算衣服
			var that = this,
			_dataclothes,
			len = 0,//当前类别衣服一共多少
			htmllen,//冒泡排序需要用来控制减的长度
			m,
			tempExchangVal,
			_te = that.o.te,
			telen = _te.length;
			
			function calcScore(){
				var clothes_wu = arguments[0].wu,
				clothes_index = arguments[1],//当前类别下所有衣服的数组下标
				k,
				l,
				radix,
				total = 0;
				
				for(k in clothes_wu){
					radix = clothes_wu[k];
					for(l=0; l<that.o.wu.length; l++){
						if(k == that.o.wu[l].k){
							total += radix*that.o.wu[l].r;
						}
					}
				}
				_dataclothes[clothes_index].total = Math.round(total);
			}
			
			for(var i=0; i<that.dataclothes.length; i++){//计算衣服分数，乘以基数
				if(that.dataclothes[i].id == that.o.clothestype.id){
					_dataclothes = that.dataclothes[i].data;
					len = _dataclothes.length;
					htmllen = len;
					for(var j=0; j<len; j++){
						calcScore(_dataclothes[j],j);
					}
					break;
				}
			}
			
			while(htmllen>0){//冒泡排序，最大的放前面
				for(m=len-1; m>len-htmllen; m--){
					if(_dataclothes[m].total > _dataclothes[m-1].total){
						tempExchangVal = _dataclothes[m];
						_dataclothes[m] = _dataclothes[m-1];
						_dataclothes[m-1] = tempExchangVal;
					}
				}
				htmllen--;
			}
			
			if(telen != 0){
				var teArr2 = [],
				teArr1 = [],
				teArr0 = [],
				_item,
				item_te,
				item_telen = 0;

				for(var i=0; i<len; i++){//把排完分数后的，再拆成有2个特殊属性/有1个特殊属性/没有特殊属性的三组数组最后再组合出来
					_item = _dataclothes[i];
					item_te = _item.te;
					item_telen = item_te.length;
					
					if(telen == 2){
						if($.inArray(_te[0],item_te) != -1 && $.inArray(_te[1],item_te) != -1){
							teArr2.push(_item);
						}else if($.inArray(_te[0],item_te) != -1 || $.inArray(_te[1],item_te) != -1){
							teArr1.push(_item);
						}else{
							teArr0.push(_item);
						}
					}else if(telen == 1){
						if($.inArray(_te[0],item_te) != -1){
							teArr1.push(_item);
						}else{
							teArr0.push(_item);
						}
					}else{
						teArr0.push(_item);
					}
				}
				
				for(var i=0; i<that.dataclothes.length; i++){
					if(that.dataclothes[i].id == that.o.clothestype.id){
						that.dataclothes[i].data = teArr2.concat(teArr1,teArr0);//3个特殊属性数组合并回写数据
						break;
					}
				}
			}
			that.printWardrobe();
		},
		printWardrobe: function(){//打印衣服
			var that = this,
			html = '',
			_dataclothes;
			
			/*var temp = '';
			for(var i=0; i<that.o.wu.length; i++){
				temp += that.o.wu[i].k+' '+that.o.wu[i].r+',';
			}
			console.log("五属性:"+temp+"特殊属性:"+that.o.te);*/
			
			
			function printTe(){//打印0-2个特殊
				var _te = arguments[0],
				telen = _te.length,
				tevalue = [];
				
				for(var i=0; i<that.datate.length; i++){
					if(that.datate[i].id == _te[0]){
						tevalue[0] = that.datate[i].k;
					}
					if(that.datate[i].id == _te[1]){
						tevalue[1] = that.datate[i].k;
					}
				}
				if(telen == 2){
					return '<span>'+tevalue[0]+'</span>&nbsp;<span>'+tevalue[1]+'</span>';
				}else if(telen == 1){
					return '<span>'+tevalue[0]+'</span>';
				}else{
					return '&nbsp;';
				}
			}

			for(var i=0; i<that.dataclothes.length; i++){//先找到大类衣服
				if(that.o.clothestype.id == that.dataclothes[i].id){
					_dataclothes = that.dataclothes[i].data;
				}
			}

			for(var i=0; i<_dataclothes.length; i++){//再从大类衣服里找具体衣服
				html += '<div class="item" data-id="'+_dataclothes[i].id+'">';
				
				if(i == 0){
					html += '<div class="head head_first">'+
								'<i class="icon_gun"></i>'+
								'<i class="icon_ring"></i>'+
								'<i class="icon_ring_1"></i>'+
								'<i class="icon_ring_2"></i>'+
								'<i class="icon_handle"></i>'+
							'</div>';
				}else{
					html += '<div class="head">'+
								'<i class="icon_line"></i>'+
							'</div>';
				}		
				html +='<div class="clothes">'+
							'<i class="icon_top"></i>'+
							'<div class="add">'+
								'<i class="icon_x"></i>'+
								'<i class="icon_y"></i>'+
							'</div>'+
							'<div class="box">'+
								'<div class="t1">'+_dataclothes[i].name+'</div>'+
								'<div class="t2">'+
									'<div class="td">'+
										printTe(_dataclothes[i].te)+
									'</div>'+
									'<div class="td">'+
										'<span>估算分:</span>'+
										'<span class="score">'+_dataclothes[i].total+'</span>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
			}
			
			$("#wardrobe").parent().scrollTop(0);
			$("#wardrobe").html(html);
		},
		printClothestype: function(){//打印衣服类别
			var html = '',
			that = this,
			_dataclothes = that.dataclothes,
			len = _dataclothes.length,
			i = 0;
			
			if(that.o.clothestype.haskid > 0){//有子级菜单的
				$("#container").addClass("clothestype_two");
			}

			for(; i<len; i++){
				if(that.o.clothestype.parentid == _dataclothes[i].parentid){
					if(that.o.clothestype.oldid == _dataclothes[i].id){//记住单一级的衣服类别选中状态
						if(that.o.clothestype.state == 2){
							html += '<div class="item on" data-id="'+_dataclothes[i].id+'" data-parentid="'+_dataclothes[i].parentid+'" data-haskid="'+_dataclothes[i].haskid+'"><span>'+_dataclothes[i].data.length+'</span><div>'+_dataclothes[i].tname+'</div></div>';
						}else{
							html += '<div class="item on" data-id="'+_dataclothes[i].id+'" data-parentid="'+_dataclothes[i].parentid+'" data-haskid="'+_dataclothes[i].haskid+'"><div>'+_dataclothes[i].tname+'</div></div>';
						}
					}else{
						if(that.o.clothestype.state == 2){
							html += '<div class="item" data-id="'+_dataclothes[i].id+'" data-parentid="'+_dataclothes[i].parentid+'" data-haskid="'+_dataclothes[i].haskid+'"><span>'+_dataclothes[i].data.length+'</span><div>'+_dataclothes[i].tname+'</div></div>';
						}else{
							html += '<div class="item" data-id="'+_dataclothes[i].id+'" data-parentid="'+_dataclothes[i].parentid+'" data-haskid="'+_dataclothes[i].haskid+'"><div>'+_dataclothes[i].tname+'</div></div>';
						}
					}
				}
			}
			$("#clothestype").html(html);
		},
		calcClothestype: function(){//计算衣服类别，增加一个haskid 0代表没有子菜单 1代表有子菜单
			var _dataclothes = this.dataclothes,
			len = _dataclothes.length;
			for(var i=0; i<len; i++){
				for(var j=0; j<len; j++){
					if(_dataclothes[i].id == _dataclothes[j].parentid){
						_dataclothes[i].haskid = 1;
						break;
					}
				}
			}
			for(var i=0; i<len; i++){
				_dataclothes[i].haskid = _dataclothes[i].haskid == 1 ? 1 : 0;
			}
			this.printClothestype();
		},
		pageReset: function(){//重置页面
			this.setfontSize();
			this.setHight();
		},
		setHight: function(){
			var _h = $(window).height() - $("#way_wrap").outerHeight(true) - $("#beam").outerHeight(true);
			_h = _h >= 220 ? _h : 220;//最小220
			$("#container").height(_h);
		},
		setfontSize: function(){//根据宽度算整体字体大小
			var doc = document,
			docEle = doc.documentElement,
			docEleW = docEle.clientWidth,
			fs = docEleW/320*100;
			docEle.style.fontSize = fs+"px";
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					if(this.o.platform == "ios"){
						localStorage.setItem("wbgl-qjnn-choice-urlform", "index.html");//记录来自于data-qjnn-choice-index.html
					}else{
						sessionStorage.setItem("wbgl-qjnn-choice-urlform", "index.html");//记录来自于data-qjnn-choice-index.html
					}
					break;
				case (href == "clothes"):
					this.isplatform("clothes");
					this.htmlClothes();
					break;
				case (href == "my"):
					this.isplatform("my");
					//this.printdetail();
					break;
				case (href == "mydetail"):
					this.isplatform("mydetail");
					if(this.o.platform == "ios"){
						localStorage.setItem("wbgl-qjnn-choice-urlform", "mydetail.html");//记录来自于data-qjnn-choice-mydetail.html
					}else{
						sessionStorage.setItem("wbgl-qjnn-choice-urlform", "mydetail.html");//记录来自于data-qjnn-choice-mydetail.html
					}
					break;
			}
		},
		isplatform: function(page){//针对打包平台控制路由
			var that = this;
			
			function unios(){
				if(arguments[0] !== undefined){
					$(arguments[0]).addClass("mt_45");
				}
				$("#header").removeClass("hide");
			}
			
			switch(page){
				case "index":
					if(this.o.platform == "web"){
						unios("#index");
					}else if(this.o.platform == "android"){
						unios("#index");
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}else if(this.o.platform == "ios"){
						var index_item = $("#index").children(".item");
						index_item.each(function(index){
							$(this).attr("href",that.o.plugin+"/"+$(this).attr("href"));
						});
					}
				break;
				case "clothes":
					if(this.o.platform == "web"){
						unios("#way_wrap");
					}else if(this.o.platform == "android"){
						unios("#way_wrap");
						$("#header").children(".back").attr("href","index.html");
					}
				break;
				case "my":
					if(this.o.platform == "web"){
						unios("#my");
					}else if(this.o.platform == "android"){
						unios("#my");
						$("#header").children(".back").attr("href","index.html");
					}
				break;
				case "mydetail":
					if(this.o.platform != "ios"){
						unios("#mydetail");
					}
				break;
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
			this.events();
			this.ispage();
			this.pageReset();
			
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

data_arena type 2:竞技场 3:联盟委托
	
var data_clothes = [{id:1,tname:"头发",parentid:0,data:[{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:999999,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8145,name:"头发2",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,qingliang:5}},{id:8145,name:"头发3",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:2,tname:"连衣裙",parentid:0,data:[{id:8145,name:"连衣裙1",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8146,name:"不羁",te:[],g:"",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8434,name:"白翩语",te:[],g:"暂无",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:3,tname:"外套",parentid:0,data:[]},{id:4,tname:"上衣",parentid:0,data:[]},{id:5,tname:"下装",parentid:0,data:[]},{id:6,tname:"袜子",parentid:0,data:[]}];

var data_arena = [{id:10130,name:"金色音乐厅",te:[1,2],type:2,wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]},{id:10131,name:"秋日物语",type:2,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}]},{id:10132,name:"海边派对的搭配",type:3,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"qingliang",r:1}],te:[]},{id:10133,name:"冬天里的一把火",type:3,wu:[{k:"huali",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}],te:["特殊属性1","特殊属性2"]}];
var data_gates = [{"gname":"第一章","data":[{"id":1,"name":"1-1",te:[1,2],wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]},{"id":1,"name":"1-1",te:[1,2],wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]}]}];
var data_te = [{"id":1,"k":"特殊属性1"},{"id":2,"k":"特殊属性2"}];
*/
























