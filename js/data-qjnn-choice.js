(function(window){
	var Qjnn = function(option){
		if(arguments[0] === undefined) return false;
		data_all = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.dataclothes = data_all.data_clothes;
		this.dataarena = data_all.data_arena;
		this.datate = data_all.data_te;
		this.o = {
					platform:"web",//针对平台
					plugin:"plugin_952",//服装搭配器的板块ID
					clothestype:1,//衣服的类别 1头发 2连衣裙...
					worktype:0,//要处理的类别 0:衣柜 1:竞技场 2:联盟委托 3:关卡 4:基本属性 5:特殊属性 6:保存套装
					dialogtype:0,//选择了哪个弹窗 0:清空 1:竞技场 2:联盟委托 3:关卡 4:基本属性 5:特殊属性 6:保存套装
					isway:[false,[false,false],[false,false],[false,false]],//衣柜 竞技场 联盟委托 关卡,第一层开关是否确认，第二层开关是否确认
					chudo:0//哪个中堂 0:基本属性 特殊属性 1:爱斯基摩旅行 2:搜索
				 };

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
		work: function(){//弹窗完后处理
			switch(this.o.worktype){
				case 0://处理衣柜
					this.o.isway[0] = false;
					console.log("处理0");
					easyDialog.close();
					break;
				case 1://处理竞技场
					this.o.isway[1][0] = false;
					this.o.isway[1][1] = false;
					console.log("处理1");
					easyDialog.close();
					break;
				case 2://处理联盟委托
					this.o.isway[2][0] = false;
					this.o.isway[2][1] = false;
					console.log("处理2");
					easyDialog.close();
					break;
				case 3://处理关卡
					this.o.isway[3][0] = false;
					this.o.isway[3][1] = false;
					console.log("处理3");
					easyDialog.close();
					break;
			}
		},
		sureWay: function(){
			switch(this.o.worktype){
				case 0://处理衣柜
					this.work();
					break;
				case 1://处理竞技场
					if(this.o.isway[1][0] == false && this.o.isway[1][1] == false){
						this.o.isway[1][0] = true;
						this.way();
					}else if(this.o.isway[1][0] == true && this.o.isway[1][1] == true){
						this.work();
					}
					break;
				case 2://处理联盟委托
					if(this.o.isway[2][0] == false && this.o.isway[2][1] == false){
						this.o.isway[2][0] = true;
						this.way();
					}else if(this.o.isway[2][0] == true && this.o.isway[2][1] == true){
						this.work();
					}
					break;
				case 3://处理关卡
					if(this.o.isway[3][0] == false && this.o.isway[3][1] == false){
						this.o.isway[3][0] = true;
						this.way();
					}else if(this.o.isway[3][0] == true && this.o.isway[3][1] == true){
						this.work();
					}
					break;
			}
		},
		way: function(){
			switch(this.o.worktype){
				case 0://处理衣柜
					this.o.dialogtype = 0;
					this.openDialog();
					break;
				case 1://处理竞技场
					if(this.o.isway[1][0] == false && this.o.isway[1][1] == false){
						this.o.dialogtype = 1;
						this.openDialog();
					}else if(this.o.isway[1][0] == true && this.o.isway[1][1] == false){
						easyDialog.close();
						this.o.dialogtype = 0;
						this.openDialog();
						this.o.isway[1][1] = true;
					}else if(this.o.isway[1][0] == true && this.o.isway[1][1] == true){
						this.o.isway[1][0] = false;
						this.o.isway[1][1] = false;
						this.o.dialogtype = 1;
						this.openDialog();
					}
					break;
				case 2://处理联盟委托
					if(this.o.isway[2][0] == false && this.o.isway[2][1] == false){
						this.o.dialogtype = 2;
						this.openDialog();
					}else if(this.o.isway[2][0] == true && this.o.isway[2][1] == false){
						easyDialog.close();
						this.o.dialogtype = 0;
						this.openDialog();
						this.o.isway[2][1] = true;
					}else if(this.o.isway[2][0] == true && this.o.isway[2][1] == true){
						this.o.isway[2][0] = false;
						this.o.isway[2][1] = false;
						this.o.dialogtype = 2;
						this.openDialog();
					}
					break;
				case 3://处理关卡
					if(this.o.isway[3][0] == false && this.o.isway[3][1] == false){
						this.o.dialogtype = 3;
						this.openDialog();
					}else if(this.o.isway[3][0] == true && this.o.isway[3][1] == false){
						easyDialog.close();
						this.o.dialogtype = 0;
						this.openDialog();
						this.o.isway[3][1] = true;
					}else if(this.o.isway[3][0] == true && this.o.isway[3][1] == true){
						this.o.isway[3][0] = false;
						this.o.isway[3][1] = false;
						this.o.dialogtype = 3;
						this.openDialog();
					}
					break;
			}
		},
		openDialog: function(){//弹窗
			$("#dialog .content").children().siblings().addClass("hide").eq(this.o.dialogtype).removeClass("hide");
			easyDialog.open({
				container: "dialog",
				fixed : false
			});			
		},
		events: function(){
			var that = this;

			//点竞技场、联盟委托、五属性的确定
			/*$(".btn_sure").click(function(){
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
				that.selectedbute();
				easyDialog.close();
			});*/
			
			
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
				$("#way .item").eq(_index).addClass("on").siblings().removeClass("on");
				that.way();
			});
			//基本属性弹窗
			$("#btn_jibenshuxing").click(function(){
				that.o.worktype = 4;
				that.o.dialogtype = 4;
				that.openDialog();
			});
			//特殊属性弹窗
			$("#btn_teshushuxing").click(function(){
				that.o.worktype = 5;
				that.o.dialogtype = 5;
				that.openDialog();
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
			//选中衣服类别
			$("#clothestype").on("click",".item",function(){
				that.o.clothestype = Number($(this).attr("data-clothestype"));
				$(this).addClass("on").siblings().removeClass("on");
				//that.selectedbute();
			});
			
			this.printClothestype();

			$("#clothestype .item").eq(0).trigger("click");
		},
		printClothestype: function(){//打印衣服类别
			var html = '',
			_dataclothes = this.dataclothes,
			len = _dataclothes.length,
			i = 0;
			for(; i<len; i++){
				if(_dataclothes[i].parentid <= 0){
					html += '<div class="item" data-clothestype="'+_dataclothes[i].id+'"><div>'+_dataclothes[i].tname+'</div></div>';
				}
			}
			$("#clothestype").html(html);
		},
		pageReset: function(){//重置页面
			this.setfontSize();
			this.setHight();
		},
		setHight: function(){
			var _h = $(window).height() - $("#way_wrap").outerHeight(true) - $("#chudo").outerHeight(true);
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

	
var data_clothes = [{id:1,tname:"头发",parentid:0,data:[{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:999999,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8144,name:"头发1",te:[1,2],g:"店/迷/6-7少",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8145,name:"头发2",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,qingliang:5}},{id:8145,name:"头发3",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:2,tname:"连衣裙",parentid:0,data:[{id:8145,name:"连衣裙1",te:[1,2],g:"签到",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8146,name:"不羁",te:[],g:"",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}},{id:8434,name:"白翩语",te:[],g:"暂无",wu:{jianyue:1,keai:2,huopo:3,qingchun:4,baonuan:5}}]},{id:3,tname:"外套",parentid:0,data:[]},{id:4,tname:"上衣",parentid:0,data:[]},{id:5,tname:"下装",parentid:0,data:[]},{id:6,tname:"袜子",parentid:0,data:[]}];

var data_arena = [{id:10130,name:"金色音乐厅",te:[1,2],type:2,wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]},{id:10131,name:"秋日物语",type:2,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"qingchun",r:1},{k:"baonuan",r:1}]},{id:10132,name:"海边派对的搭配",type:3,wu:[{k:"jianyue",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"qingliang",r:1}],te:[]},{id:10133,name:"冬天里的一把火",type:3,wu:[{k:"huali",r:1},{k:"keai",r:1},{k:"huopo",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}],te:["特殊属性1","特殊属性2"]}];
var data_gates = [{"gname":"第一章","data":[{"id":1,"name":"1-1",te:[1,2],wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]},{"id":1,"name":"1-1",te:[1,2],wu:[{k:"huali",r:1},{k:"chengshu",r:1},{k:"youya",r:1},{k:"xinggan",r:1},{k:"baonuan",r:1}]}]}];
var data_te = [{"id":1,"k":"特殊属性1"},{"id":2,"k":"特殊属性2"}];
*/
























