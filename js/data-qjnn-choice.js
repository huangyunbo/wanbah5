(function(window){
	var Qjnn = function(option){
		if(arguments[0] === undefined) return false;
		data_all = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datadress = data_all.data_dress;
		this.datadress_te = [];
		this.dataarena = data_all.data_arena;
		this.datate = data_all.data_te;
		this.datagates = data_all.data_gates;
		this.o = {
					platform:"web",//针对平台
					plugin:"plugin_952",//服装搭配器的板块ID
					dresstype:{id:1,oldid:1,parentid:0,haskid:0,state:0},//id:是选中哪一个,oldid:记录上次点击的id(没有子集的),parentid:父级id是谁,haskid:是否有子集,state:0默认 1已选 2搜索
					way:0,//选择的4条路 0:衣柜 1:竞技场 2:联盟委托 3:关卡
					wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}],//五属性
					te:[],//特殊属性
					te_selected:[],//特殊属性 选中的
					zhuti:"",//竞技场 联盟委托 关卡 选中的主题
					keyword:""//关键词
					
					//choicedress:{"data":[{"id":1,"name":"自己的套装","dress":[]}]}//已选的衣服
				 };

		this.init();
	};
	
	Qjnn.prototype = {
		so: function(){//搜索处理
			var _keyword = arguments[0],
			_datadress = this.datadress,
			_baidu,
			_data,
			j;
			
			_keyword = $.trim(_keyword);
			if(_keyword.length == 0) return;
			
			this.o.dresstype.state = 2;
			this.o.keyword = _keyword;
			
			for(var i=0; i<_datadress.length; i++){
				_baidu = 0;
				_data = _datadress[i].data;
				for(j=0; j<_data.length; j++){
					if(_data[j].name.indexOf(_keyword) != -1){
						_baidu++;
					}
				}
				_datadress[i].baidu = _baidu;
			}
			this.printDresstype();
			this.printDress();
		},
		waywork: function(){//4:基本属性 5:特殊属性 6:保存套装 处理这3种弹窗
			var wayworktype = arguments[0];
			
			if(wayworktype === undefined) return;
			switch(wayworktype){
				case 4://基本属性
					var wuArr = [];
					$("#dialog_4 .dialog_4").children(".item").each(function(){
						wuArr.push({k:$(this).children(".on").attr("data-label"),r:1});
                    });
					this.o.wu = wuArr;
					this.calcDress();
					easyDialog.close();
					break;
				case 5://特殊属性
					this.calcDress();
					easyDialog.close();
					break;
				case 6://保存套装
					easyDialog.close();
					console.log("保存套装");
					break;
			}
		},
		autoselected: function(){//1:竞技场 2:联盟委托 3:关卡 确定弹窗的时候自动选择第一个
			switch(this.o.way){
				case 1:
					if(!$("#dialog_1 .dialog_1").children().hasClass("on")){
						$("#dialog_1 .dialog_1").children().eq(0).trigger("click");
					}
					break;
				case 2:
					if(!$("#dialog_2 .dialog_2").children().hasClass("on")){
						$("#dialog_2 .dialog_2").children().eq(0).trigger("click");
					}
					break;
				case 3:
					if(!$("#dialog_3_section").find(".item").hasClass("on")){
						$("#dialog_3_section").find(".item").eq(0).trigger("click");
					}
					break;
			}
		},
		way: function(){//0:衣柜 1:竞技场 2:联盟委托 3:关卡 处理这4种弹窗
			switch(this.o.way){
				case 0://处理衣柜
					if(this.o.dresstype.state == 2){
						this.o.dresstype.state = 0;
						this.calcDresstype();
					}
					this.o.wu = [{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}];
					this.o.te = [];
					this.o.te_selected = [];
					this.setBeam();
					break;
				case 1://处理竞技场
					if(this.o.dresstype.state == 2){
						this.o.dresstype.state = 0;
						this.calcDresstype();
					}
					var _id = Number($("#dialog_1").attr("data-id"));
					for(var i=0; i<this.dataarena.length; i++){
						if(this.dataarena[i].id == _id){
							this.o.wu = this.dataarena[i].wu;
							this.o.te = this.dataarena[i].te.slice(0);
							this.o.te_selected = [];
							this.o.zhuti = this.dataarena[i].name;
							break;
						}
					}
					this.setBeam(1);
					break;
				case 2://处理联盟委托
					if(this.o.dresstype.state == 2){
						this.o.dresstype.state = 0;
						this.calcDresstype();
					}
					var _id = Number($("#dialog_2").attr("data-id"));
					for(var i=0; i<this.dataarena.length; i++){
						if(this.dataarena[i].id == _id){
							this.o.wu = this.dataarena[i].wu;
							this.o.te = this.dataarena[i].te.slice(0);
							this.o.te_selected = [];
							this.o.zhuti = this.dataarena[i].name;
							break;
						}
					}
					this.setBeam(1);
					break;
				case 3://处理关卡
					if(this.o.dresstype.state == 2){
						this.o.dresstype.state = 0;
						this.calcDresstype();
					}
					var _index = Number($("#dialog_3_chapter").attr("data-index"));
					var _id = Number($("#dialog_3_section").attr("data-id"));
					for(var i=0; i<this.datagates[_index].data.length; i++){
						if(this.datagates[_index].data[i].id == _id){
							this.o.wu = this.datagates[_index].data[i].wu;
							this.o.te = this.datagates[_index].data[i].te.slice(0);
							this.o.te_selected = [];
							this.o.zhuti = this.datagates[_index].data[i].name;
						}
					}
					this.setBeam(1);
					break;
			}
			this.o.keyword = "";
			$("#so_text").val("");
			this.setTe();
			this.calcDress();
			$("#way").children().eq(this.o.way).addClass("on").siblings().removeClass("on");
		},
		setTe: function(){//设置特殊属性标签
			var html = '',
			_te = this.o.te,
			telen = _te.length,
			_datate = this.datate,
			$dress_filter = $("#dress_filter");
			
			function findTe(){
				for(var i=0; i<_datate.length; i++){
					if(_datate[i].id == arguments[0]){
						return _datate[i].k;
					}
				}
			}
			
			if(telen == 2){
				html = '<div class="item" data-index="0" data-id="0"><div>全部</div></div>'+
						'<div class="item" data-index="1" data-id="'+_te[0]+'"><div>'+findTe(_te[0])+'</div></div>'+
						'<div class="item" data-index="2" data-id="'+_te[1]+'"><div>'+findTe(_te[1])+'</div></div>';
				$dress_filter.html(html);
				$dress_filter.closest(".dress_wrap").addClass("dress_filter");
			}else if(telen == 1){
				html = '<div class="item" data-index="0" data-id="0"><div>全部</div></div>'+
						'<div class="item" data-index="1" data-id="'+_te[0]+'"><div>'+findTe(_te[0])+'</div></div>';
				$dress_filter.html(html);
				$dress_filter.closest(".dress_wrap").addClass("dress_filter");
			}else{
				$dress_filter.closest(".dress_wrap").removeClass("dress_filter");
			}
		},
		calcDress:function(){//计算衣服
			var _datadress = this.datadress,
			datadress_len = _datadress.length,
			_te_selected = this.o.te_selected,
			te_selectedlen = _te_selected.length;
				
			for(var i=0; i<datadress_len; i++){//衣服大类
				var _datadress_class = _datadress[i].data,
				len = _datadress_class.length,//当前类别衣服一共多少
				htmllen = len,//冒泡排序需要用来控制减的长度
				tempExchangVal,
				m;
				
				for(var j=0; j<len; j++){//具体衣服
					var dress_wu = _datadress_class[j].wu,
					k,
					l,
					radix,
					total = 0;
					
					for(k in dress_wu){//遍历单件衣服的五属性
						radix = dress_wu[k];
						for(l=0; l<this.o.wu.length; l++){//遍历你选择了的五属性
							if(k == this.o.wu[l].k){//如果找到对应的五属性
								total += radix*this.o.wu[l].r;//计算衣服分数，乘以基数
							}
						}
					}
					_datadress_class[j].total = Math.round(total);
				}
				
				while(htmllen>0){//冒泡排序，最大的放前面
					for(m=len-1; m>len-htmllen; m--){
						if(_datadress_class[m].total > _datadress_class[m-1].total){
							tempExchangVal = _datadress_class[m];
							_datadress_class[m] = _datadress_class[m-1];
							_datadress_class[m-1] = tempExchangVal;
						}
					}
					htmllen--;
				}
			}
			
			
			if(te_selectedlen > 0){
				this.datadress_te = $.extend(true,[],this.datadress);//取得新的数据源
				for(var i=0; i<datadress_len; i++){//大类
					var _datadress_class = _datadress[i].data,
					len = _datadress_class.length,//当前类别衣服一共多少
					teArr2 = [],
					teArr1 = [];
					
					for(var j=0; j<len; j++){//把排完分数后的，再拆成有2个特殊属性/有1个特殊属性/没有特殊属性的三组数组最后再组合出来
						var _item = _datadress_class[j],
						item_te = _item.te;
						
						if(te_selectedlen == 2){
							if($.inArray(_te_selected[0],item_te) != -1 && $.inArray(_te_selected[1],item_te) != -1){
								teArr2.push(_item);
							}else if($.inArray(_te_selected[0],item_te) != -1 || $.inArray(_te_selected[1],item_te) != -1){
								teArr1.push(_item);
							}
						}else if(te_selectedlen == 1){
							if($.inArray(_te_selected[0],item_te) != -1){
								teArr1.push(_item);
							}
						}
					}
					this.datadress_te[i].data = teArr2.concat(teArr1);//2个特殊属性数组合并回写数据
				}
			}
			this.printDress();
		},
		printDress: function(){//打印服装
			var that = this,
			html = '',
			_dresstype = that.o.dresstype.oldid,
			_datadress,
			keywordlen = that.o.keyword.length,
			head_first = 0;
			
			/*var temp = '';
			for(var i=0; i<that.o.wu.length; i++){
				temp += that.o.wu[i].k+' '+that.o.wu[i].r+',';
			}
			console.log("五属性:"+temp+"特殊属性:"+that.o.te_selected);*/
			
			for(var i=0; i<that.datadress.length; i++){//先找到大类衣服
				if(_dresstype == that.datadress[i].id){//找到无子集的选中的id
					if(that.o.te_selected == 0){//判断数据源该用哪一个
						_datadress = that.datadress[i].data;
					}else{
						_datadress = that.datadress_te[i].data;
					}
				}
			}
			
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
			
			function rate(){//评级s
				var _wu = arguments[0],
				k,
				r = "",
				_html = "";

				switch(_dresstype){
					case 1:
						for(k in _wu){
							switch(_wu[k]){
								case 650:r="B";break;
								case 825:r="A";break;
								case 1050:r="S";break;
								case 1250:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 2:
						for(k in _wu){
							switch(_wu[k]){
								case 2750:r="B";break;
								case 3400:r="A";break;
								case 4000:r="S";break;
								case 5100:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 3:
						for(k in _wu){
							switch(_wu[k]){
								case 255:r="B";break;
								case 330:r="A";break;
								case 410:r="S";break;
								case 505:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 4:
						for(k in _wu){
							switch(_wu[k]){
								case 1325:r="B";break;
								case 1550:r="A";break;
								case 1925:r="S";break;
								case 2725:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 5:
						for(k in _wu){
							switch(_wu[k]){
								case 1325:r="B";break;
								case 1550:r="A";break;
								case 1925:r="S";break;
								case 2725:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 6:
					case 7:
						for(k in _wu){
							switch(_wu[k]){
								case 420:r="B";break;
								case 495:r="A";break;
								case 610:r="S";break;
								case 860:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 8:
						for(k in _wu){
							switch(_wu[k]){
								case 555:r="B";break;
								case 600:r="A";break;
								case 860:r="S";break;
								case 1000:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 9://妆容
						for(k in _wu){
							switch(_wu[k]){
								case 120:r="B";break;
								case 130:r="A";break;
								case 190:r="S";break;
								case 265:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k)+''+r+'</span>';
						}
						break;
					case 10:
					case 11:
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
					case 18:
					case 19:
					case 20:
					case 21:
					case 22:
					case 23:
					case 24:
					case 25:
					case 26:
					case 27:
						for(k in _wu){
							switch(_wu[k]){
								case 250:r="B";break;
								case 310:r="A";break;
								case 410:r="S";break;
								case 485:r="SS";break;
								default:r="C";
							}
							_html += '<span>'+that.switchlael(k) + r+'</span>';
						}
						break;
					
				}
				return _html;
			}

			

			for(var i=0; i<_datadress.length; i++){//再从大类衣服里找具体衣服
				if(keywordlen == 0 || _datadress[i].name.indexOf(that.o.keyword) != -1){
					html += '<div class="item" data-id="'+_datadress[i].id+'">';

					if(head_first == 0){	
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
					
					head_first = 1;
					
					html += '<div class="piece">'+
								'<i class="icon_top"></i>'+
								'<div class="add">'+
									'<i class="icon_x"></i>'+
									'<i class="icon_y"></i>'+
								'</div>'+
								'<div class="box box_front">'+
									'<div class="face_front">'+
										'<div class="t1">'+_datadress[i].name+'</div>'+
										'<div class="t2">'+
											'<div class="td">'+
												printTe(_datadress[i].te)+
											'</div>'+
											'<div class="td">'+
												'<span>估算分:</span>'+
												'<span class="score">'+_datadress[i].total+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="face_back">'+
										'<div class="t1">'+_datadress[i].name+'</div>'+
										'<div class="t2">'+
											rate(_datadress[i].wu)+
										'</div>'+
										'<div class="t3">'+_datadress[i].g+'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
				}
			}
			
			$("#dress").parent().scrollTop(0);
			$("#dress").html(html);
		},
		calcDresstype: function(){//计算衣服类别，增加一个haskid 0代表没有子菜单 1代表有子菜单
			var _datadress = this.datadress,
			len = _datadress.length;
			for(var i=0; i<len; i++){
				for(var j=0; j<len; j++){
					if(_datadress[i].id == _datadress[j].parentid){
						_datadress[i].haskid = 1;
						break;
					}
				}
			}
			for(var i=0; i<len; i++){
				_datadress[i].haskid = _datadress[i].haskid == 1 ? 1 : 0;
			}
			this.printDresstype();
		},
		printDresstype: function(){//打印衣服类别
			var html = '',
			_datadress = this.datadress,
			len = _datadress.length;
						
			if(this.o.dresstype.haskid > 0){//有子级菜单的
				$("#container").addClass("dresstype_two");
			}

			for(var i=0; i<len; i++){
				if(this.o.dresstype.parentid == _datadress[i].parentid){
					if(this.o.dresstype.oldid == _datadress[i].id){//有子集菜单的不需要记录有on
						if(this.o.dresstype.state == 2){
							html += '<div class="item on" data-id="'+_datadress[i].id+'" data-parentid="'+_datadress[i].parentid+'" data-haskid="'+_datadress[i].haskid+'"><span>'+_datadress[i].baidu+'</span><div>'+_datadress[i].tname+'</div></div>';
						}else{
							html += '<div class="item on" data-id="'+_datadress[i].id+'" data-parentid="'+_datadress[i].parentid+'" data-haskid="'+_datadress[i].haskid+'"><div>'+_datadress[i].tname+'</div></div>';
						}
					}else{
						if(this.o.dresstype.state == 2 && _datadress[i].haskid == 0){
							html += '<div class="item" data-id="'+_datadress[i].id+'" data-parentid="'+_datadress[i].parentid+'" data-haskid="'+_datadress[i].haskid+'"><span>'+_datadress[i].baidu+'</span><div>'+_datadress[i].tname+'</div></div>';
						}else{
							html += '<div class="item" data-id="'+_datadress[i].id+'" data-parentid="'+_datadress[i].parentid+'" data-haskid="'+_datadress[i].haskid+'"><div>'+_datadress[i].tname+'</div></div>';
						}
					}
				}
			}
			$("#dresstype").html(html);
		},
		openDialog: function(){//弹窗 0:清空 1:竞技场 2:联盟委托 3:关卡 4:基本属性 5:特殊属性 6:保存套装
			var n = arguments[0] === undefined ? 0 : arguments[0],
			dom = "dialog_" + n;
			
			easyDialog.open({
				container: dom,
				fixed : false
			});			
		},
		htmlDress: function(){//衣服页
			var that = this;
			
			this.printWay();//打印竞技场 联盟委托 关卡
			this.setBeam();//设置横梁
			this.calcDresstype();//计算衣服类别
			
			//关闭所有弹窗
			$(".btn_cancel").click(function(){
				easyDialog.close();
			});
			//选择四大路打开
			$("#way .item").click(function(){
				var _index = $("#way .item").index($(this));
				that.o.way = _index;
				that.openDialog(_index);
			});
			//基本属性弹窗
			$("#btn_jibenshuxing").click(function(){
				that.openDialog(4);
			});
			//特殊属性弹窗
			$("#btn_teshushuxing").click(function(){
				that.openDialog(5);
			});
			//竞技场  联盟委托 关卡 确定弹窗
			$("#dialog_1_sure,#dialog_2_sure,#dialog_3_sure").click(function(){
				that.autoselected();
				easyDialog.close();
				that.openDialog(0);
			});
			//四大路最终确认
			$("#dialog_0_sure").click(function(){
				that.way();
				easyDialog.close();
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
			//关卡大章点选
			$("#dialog_3_chapter").on("click",".item",function(){
				var _index = Number($(this).attr("data-index"));
				$("#dialog_3_chapter").attr("data-index",_index);
				$(this).addClass("on").siblings().removeClass("on");
				$("#dialog_3_section").children().eq(_index).removeClass("hide").siblings().addClass("hide");
			});
			//关卡小节点选
			$("#dialog_3_section").on("click",".item",function(){
				$("#dialog_3_section").attr("data-id",$(this).attr("data-id"));
				$("#dialog_3_section").find(".item.on").removeClass("on");
				$(this).addClass("on");
			});
			//基本属性点选
			$("#dialog_4").on("click","a",function(){
				$(this).addClass("on").siblings().removeClass("on");
			});
			//基本属性确认
			$("#dialog_4_sure").click(function(){
				that.waywork(4);
			});
			//特殊属性点选
			$("#dialog_5_box").on("click",".item",function(){
				var _te = that.o.te_selected,
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
						$("#dialog_5_box").children().each(function(index, element) {
							if(Number($(element).attr("data-id")) == _te[1]){
								$(element).removeClass("on");
							}
                        });
						_te.splice(1,1,_id);
						$(this).addClass("on");
					}
				}
			});
			//特殊属性确认
			$("#dialog_5_sure").click(function(){
				that.waywork(5);
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
				that.o.keyword = "";
				$("#so_text").val("");
				if(that.o.way == 0){
					that.o.dresstype.state = 0;
					that.setBeam();
				}else{
					that.o.dresstype.state = 1;
					that.setBeam(1);
				}
				that.printDresstype();
				that.printDress();
			});
			//特殊属性 全部 特殊1 特殊2
			$("#dress_filter").on("click", ".item", function(){
				var self = $(this),
				_index = Number(self.attr("data-index")),
				_id = Number(self.attr("data-id")),
				inarr;
				
				if(_index == 0){//全部
					that.o.te_selected.splice(0,2);
					self.siblings().removeClass("on");
				}else{
					if(self.hasClass("on")){
						inarr = $.inArray(_id,that.o.te_selected);
						that.o.te_selected.splice(inarr,1);
						self.removeClass("on");
					}else{
						that.o.te_selected.push(_id);
						self.addClass("on");
					}
				}
				that.calcDress();
			});
			//返回衣服类别
			$("#dresstype_back").click(function(){
				$("#container").removeClass("dresstype_two");
				that.o.dresstype.haskid = 0;
				that.o.dresstype.parentid = 0;
				that.printDresstype();
			});
			//拉开已选门把手
			$("#door").click(function(){
				var self = $(this);
				if(self.hasClass("door_open")){//关闭
					$("#bag_inner").stop(true,true).animate({
						"margin-left": "1.01rem"
					},300,function(){
						$("#bag").removeClass("bag_open");
					});
					$("#door").stop(true,true).animate({
						"right": "0.03rem"
					},300,function(){
						self.removeClass("door_open");
					});
				}else{//打开
					self.addClass("door_open");
					$("#bag").addClass("bag_open");
					$("#bag_inner").stop(true,true).animate({
						"margin-left": 0
					},300);
					$("#door").stop(true,true).animate({
						"right": "1rem"
					},300);
				}
			});
			
			//选中衣服类别
			$("#dresstype").on("click",".item",function(){
				that.o.dresstype.id = Number($(this).attr("data-id"));
				that.o.dresstype.parentid = Number($(this).attr("data-parentid"));
				$(this).addClass("on").siblings().removeClass("on");
				
				if(Number($(this).attr("data-haskid")) > 0){
					that.o.dresstype.haskid = 1;
					that.o.dresstype.parentid = that.o.dresstype.id;//有子集的把自己的id赋给parentid
					$("#dresstype").parent().scrollTop(0);
					that.printDresstype();
				}else{
					that.o.dresstype.oldid = that.o.dresstype.id;//记住单一级的衣服类别选中状态
					that.calcDress();
				}
			}).children().eq(0).trigger("click");
			
			//点选衣服翻牌的时候
			$("#dress").on("click", ".item", function(){
				console.log(1);
			});
		},
		setBeam: function(){//设置中间的横梁 0:基本属性 特殊属性 1:爱斯基摩旅行 2:搜索
			var _beam = arguments[0] === undefined ? 0 : arguments[0];
			if(_beam == 0){
				this.printNature();
			}else if(_beam == 1){
				$("#beam_title").html(this.o.zhuti);
			}
			$("#beam").children().eq(_beam).removeClass("hide").siblings().addClass("hide");
		},
		printNature: function(){//基本属性和特殊属性的弹窗
			var html_dialog_4 = '',//基本属性
			html_dialog_5_box = '',//特殊属性
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
				html_dialog_5_box += '<div class="item" data-id="'+_datate[i].id+'"><span>'+_datate[i].k+'</span></div>';
			}
			
			$("#dialog_4").children(".dialog_4").html(html_dialog_4);
			$("#dialog_5_box").html(html_dialog_5_box);
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
		printWay: function(){//打印竞技场 联盟委托 关卡
			var html_dialog_1 = '',//竞技场
			html_dialog_2 = '',//联盟委托
			html_dialog_3_chapter = '',//关卡大章
			html_dialog_3_section = '',//关卡小节
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
					html_dialog_3_chapter += '<div class="item on" data-index="'+i+'">'+_datagates[i].gname+'</div>';
					html_dialog_3_section += '<div class="box">';
				}else{
					html_dialog_3_chapter += '<div class="item" data-index="'+i+'">'+_datagates[i].gname+'</div>';
					html_dialog_3_section += '<div class="box hide">';
				}
				for(var j=0; j<_datagates[i].data.length; j++){
					html_dialog_3_section += '<div class="item" data-id="'+_datagates[i].data[j].id+'"><div>'+_datagates[i].data[j].name+'</div></div>';
				}
				html_dialog_3_section += '</div>';
			}
			
			$("#dialog_1").children(".dialog_1").html(html_dialog_1);
			$("#dialog_2").children(".dialog_2").html(html_dialog_2);
			$("#dialog_3_chapter").html(html_dialog_3_chapter);
			$("#dialog_3_section").html(html_dialog_3_section);
		},
		events: function(){
			var that = this;
			//旋转屏幕重新设置
			$(window).resize(function(e){
                that.pageReset();
            });
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
				case (href == "dress"):
					this.isplatform("dress");
					this.htmlDress();
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
				case "dress":
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
			this.ispage();
			this.events();
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
	
var data_dress = [{id:1,tname:"头发",parentid:0,data:[{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:999999,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8145,name:"头发2",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,qingliang:5}},{id:8145,name:"头发3",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:2,tname:"连衣裙",parentid:0,data:[{id:8145,name:"连衣裙1",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8146,name:"不羁",te:[],g:"",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8434,name:"白翩语",te:[],g:"暂无",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:3,tname:"外套",parentid:0,data:[]},{id:4,tname:"上衣",parentid:0,data:[]},{id:5,tname:"下装",parentid:0,data:[]},{id:6,tname:"袜子",parentid:0,data:[]}];

var data_arena = [{id:10130,name:"金色音乐厅",te:[1,2],type:2,wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]},{id:10131,name:"秋日物语",type:2,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}]},{id:10132,name:"海边派对的搭配",type:3,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"qingliang",r:1}],te:[]},{id:10133,name:"冬天里的一把火",type:3,wu:[{k:"huali",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}],te:["特殊属性1","特殊属性2"]}];
var data_gates = [{"gname":"第一章","data":[{"id":1,"name":"1-1",te:[1,2],wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]},{"id":1,"name":"1-1",te:[1,2],wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]}]}];
var data_te = [{"id":1,"k":"特殊属性1"},{"id":2,"k":"特殊属性2"}];
*/
























