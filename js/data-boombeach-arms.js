(function(window){
	var BoombeachArms = function(){		
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		
		
		this.o = {
			platform:"web",
			// plugin:"plugin_1101",//plugin_1101
			// plugin_equip:"plugin_1103",
			url:"images/boombeach/",
			total_level:0
				
		};
		if(this.o.platform == "android"){
			this.o.url="../images/boombeach/";
		}
		this.init();
	};
	
	BoombeachArms.prototype = {

		events:function(){//兵种页面事件监听
			var that = this,
			$species_nav = $("#datalist_nav"),			
			t_index = Number(that.getsession("wbgl-boombeach-arms-tindex"));			
			$species_nav.on("click","li", function(){				
				t_index = Number($(this).attr("data-index"));				
				$species_nav.children().children().eq(t_index).addClass("on").siblings().removeClass("on");
				$("#datalist").children().eq(t_index).addClass("on").siblings().removeClass("on");
				that.setsession("wbgl-boombeach-arms-tindex", t_index);
			}).children().children().eq(t_index).trigger("click");


			$("#datalist").on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));				
				that.setsession("wbgl-boombeach-arms-id", _id);				
				// if(that.o.platform == "ios"){
				// 	location.href = that.o.plugin+'/data-vainglory-equip-detail.html';
				// }else{
					location.href = 'data-boombeach-arms-details.html';
				// }
			});
		},

		htmlArms: function(){//兵种页面		
			var that = this;
			that.printArmsSpecies();
			that.events();				
		},
		
		printArmsSpecies: function(){//打印兵种页面
			var species = this.data,
			that = this;
			html_species='',
			html_detail_content='';								
			for(var i=0;i<species.length;i++){
				html_species += '<li id="arm_species_item" data-index="'+i+'">'+species[i].cname+'</li>';
				html_detail_content += '<ul>';	
				for(var j=0;j<species[i].cdata.length;j++){					
					html_detail_content += '<li data-id="'+species[i].cdata[j].id+'"><a><div class="img"><img src="'+
					that.o.url+'arms/'+
					species[i].cdata[j].img+
					'"></div><div class="note"><h2>'+
					species[i].cdata[j].name+
					'</h2><p>'+
					species[i].cdata[j].sdesc+
					'</p></div><div class="look"><i class="icon"></i></div></a></li>';					
				}	
				html_detail_content += '</ul>';	

			}
			$("#datalist_nav").html('<ul>'+html_species+'</ul>');			
			$("#datalist").html(html_detail_content);	
		},
		
		htmlArmsDetails: function(){//兵种详情页面
			var species = this.data,
			data,			
			that = this;
			for(var i=0;i<species.length;i++){//找到对应的数据
				
				for(var j=0;j<species[i].cdata.length;j++){
					data = species[i].cdata[j];					
					if(that.getsession("wbgl-boombeach-arms-id") == data.id){					
						that.printDetail(data);
						that.o.total_level = data.data[0].v.length; 
						that.setFigure(data,0);
						that.setSlidebar(data,that.o.total_level);//滑动条
					}						
				}	
					

			}
		},	

		printDetail:function(data){//打印兵种详情页面
			var mData = data,
			that = this,
			td_one_key='',
			td_one_value='',
			td_two_key=''
			html_td_two_key='',
			td_two_value=''
			html_td_two_value='',
			html_td_two_value1='';
				
			$("#header").children("h1").html(mData.name);
			//顶部图片		
			$("#armsd_bg_d").html('<img class="armsd_bg" src="'+that.o.url+'arms/'+mData.img+'">');
			$("#label_d").children("span").html(mData.name);
			for(var i=0;i<mData.label.length;i++){			
				//Label	
				$("#armsd").children("label").html('<span>'+mData.label[i]+'</span>');
			}			
			//描述
			$("#arm_des").html(mData.ldesc);
			//专家点评
			$("#arm_comm").html(mData.comment);
			//打印表格
			for(var i=0;i<mData.table.length;i++){
				
				if(mData.table[i].type == 1){
					//1.兵种数据表格	
					for(var j=0;j<mData.table[i].tbody.length;j++){						
						td_one_key += '<td class="on">'+mData.table[i].tbody[j].k+'</td>';
						td_one_value += '<td><span>'+mData.table[i].tbody[j].v+'</span></td>';
					}
					$("#levelt").html('<tbody><tr>'+td_one_key+'</td></tr><tr>'+td_one_value+'</tr></tbody>');			
				}else{					
					for(var j=0;j<mData.table[i].tbody.length;j++){						
						td_two_key += '<div class="l">'+mData.table[i].tbody[j].k+'</div>';				
						//判断是否是数组数据
						if(mData.table[i].tbody[j].v instanceof Array){
							for(var k=0;k<mData.table[i].tbody[j].v.length;k++){
								td_two_value += '<td>'+mData.table[i].tbody[j].v[k]+'</td>';							
							}						
						}else{
							td_two_value += '<td>'+mData.table[i].tbody[j].v+'</td>';
						}
						html_td_two_value += '<tr>'+ td_two_value +'</tr>';
						td_two_value = '';					
					}					
					html_td_two_key +='<div class="dt">'+td_two_key+'</div>';					
					html_td_two_value1 += '<div class="dd"><table><tbody>'+html_td_two_value+'</tbody></table></div>';														
					$("#leveltt").html(html_td_two_key+html_td_two_value1);					
				}
			}

			//攻击距离图片,id小于9并且id不为6的时候才显示
			if(mData.id<9 && mData.id != 6){
				$("#act_dis").html('<div class="data_tit">'+
					'<div class="small_square"></div>'+
					'<span>攻击距离</span>'+
					'</div>'+
					'<div>'+
					'<img src="'+that.o.url+'ack_distance/'+mData.id+'.png'+'">'+
					'</div>');		
			}			
				
		},	

		
		setSlidebar: function(mData,level){//设置属性值滑动栏
			var that = this,
				$barlevel = $("#barlevel"),
				$bar = $("#bar"),
				$barhandle = $("#barhandle"),
				$thumb = $barhandle.children(),
				barW = $bar.width(),
				barhandleW = $barhandle.width(),
				barhandleM = barhandleW/2,
				barW_max = barW-barhandleW,
				touchMoveX,
				barO_l = $bar.offset().left,
				distanceX,
				paragraph = barW_max/level,
				level = 1;//初始化

			function slide(rangeX){//计算滑动
				var _level = Math.ceil(rangeX/paragraph);
				
				_level = _level == 0 ? 1 : _level;
				$barhandle.css({"left":rangeX+"px"});
				if(_level == level) return;//减少后面的调用				
				level = _level;
				$("#barlevel").html(level);				
				that.setFigure(mData,level-1);
			}

			$thumb.on("touchstart", function(e){
				e.preventDefault();
			});
			$thumb.on("touchmove", function(e){
				e.preventDefault();				
    			touchMoveX = e.originalEvent.changedTouches[0].pageX - barhandleM;//修正移动的时候，从中间的时候开始算    			
				distanceX = touchMoveX - barO_l;
				if(distanceX < 0){
					slide(0);
				}else if(distanceX > barW_max){
					slide(barW_max);
				}else{
					slide(distanceX);
				}
			});
		},

		
		setFigure: function(mData,level){//数据详情		
			var that = this, 
			id='',
			id1='',
			html_data='',
			html_data1='',
			html_data2='';												
			if(mData.showdataid.length == 1){ 
				id = mData.showdataid[0];				
				for(var i=0;i<mData.data.length;i++){
					if(id != mData.data[i].id){						
		    				html_data += '<dl>'+
		    				'<dt>'+mData.data[i].k+'</dt>'+
		    				'<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[i].img+'.png'+'">'+
		    				'<dd>'+mData.data[i].v[level]+'</dd>'+
		    				'</dl>';				           
					}else{
						html_data1 +='<div class="num num_blue" data-num="532">'+mData.data[i].v[level]+'</div>'+
						'<div class="k">'+mData.data[i].k+'</div>';
					}
				}

				$("#f_tr").html('<td class="f_td" id="figure_lt">'+html_data1+'</td>'+
					'<td class="f_td" rowspan="2" id="figure_lt1">'+
					'<div class="figure_other" id="figure_other">'+html_data+'</div>'+
					'</td>');

			}else{
				id = mData.showdataid[0];
				id1= mData.showdataid[1];				
				for(var j=0;j<mData.data.length;j++){
					if(id != mData.data[j].id && id1 != mData.data[j].id){
						
		    				html_data += '<dl>'+
		    				'<dt>'+mData.data[j].k+'</dt>'+
		    				'<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img+'.png'+'">'+
		    				'<dd>'+mData.data[j].v[level]+'</dd>'+
		    				'</dl>';
				           
					}else{
							if(id == mData.data[j].id){
								html_data1 +='<div class="num num_blue">'+mData.data[j].v[level]+'</div>'+
								'<div class="k">'+mData.data[j].k+'</div>';
							}
							if(id1 == mData.data[j].id){
								html_data2 +='<div class="num num_blue">'+mData.data[j].v[level]+'</div>'+
								'<div class="k">'+mData.data[j].k+'</div>';								
							}
					}					
				}				
				
				$("#t_body").html('<tr class="f_tr" id="f_tr"><td class="f_td" id="figure_lt">'+html_data1+'</td>'+
						'<td class="f_td" rowspan="2" id="figure_lt1">'+
						'<div class="figure_other" id="figure_other">'+html_data+'</div>'+
						'</td></tr>'+
	                	'<tr id="f_tr_2"><td class="f_td" id="figure_lb">'+html_data2+
	                	'</td></tr>');
			}			
		},

		getsession: function(){
			var sessionname = arguments[0];
			if(this.o.platform == "ios"){
				return this.cookie(sessionname);
			}else{
				return sessionStorage.getItem(sessionname);
			}
		},
		setsession: function(){
			var sessionname = arguments[0],
			sessionvalue = arguments[1];
			if(this.o.platform == "ios"){
				this.cookie(sessionname,sessionvalue);
			}else{
				sessionStorage.setItem(sessionname, sessionvalue);
			}
		},
		cookie: function(name, value, options){
			if(typeof value != 'undefined'){// name and value given, set cookie
				options = options || {};
				if(value === null){
					value = '';
					options.expires = -1;
				}
				var expires = '';
				if(options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if(typeof options.expires == 'number') {
						date = new Date();
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					}else{
						date = options.expires;
					}
					expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
				}
				// CAUTION: Needed to parenthesize options.path and options.domain
				// in the following expressions, otherwise they evaluate to undefined
				// in the packed version for some reason...
				var path = options.path ? '; path=' + (options.path) : '';
				var domain = options.domain ? '; domain=' + (options.domain) : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
			}else{ // only name given, get cookie
				var cookieValue = null;
				if(document.cookie && document.cookie != ''){
					var cookies = document.cookie.split(';');
					for(var i = 0; i < cookies.length; i++){
						var cookie = jQuery.trim(cookies[i]);
						// Does this cookie string begin with the name we want?
						if(cookie.substring(0, name.length + 1) == (name + '=')){
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
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
		isplatform: function(i){//判断打包平台显示相应内容
			function removehide(){
				$("#header").removeClass("hide");
			}
			removehide();
			
			switch(i){
				case "arms":	
				// if(this.o.platform == "web"){
				// 		removehide();						
				// 	}else if(this.o.platform == "android"){
				// 		removehide();						
				// 		$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
				// 	}else if(this.o.platform == "ios"){						
				// 		$("#herolist").addClass("mt_0");
				// 	}
				// 	$("#header").children(".back").attr("href","javascript:window.jstojava.close();");				
				case "arms-details":
				// if(this.o.platform == "web"){
				// 		removehide();						
				// 	}else if(this.o.platform == "android"){
				// 		removehide();						
				// 		$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
				// 	}else if(this.o.platform == "ios"){						
				// 		$("#herolist").addClass("mt_0");
				// 	}
				// 	$("#header").children(".back").attr("href","javascript:window.jstojava.close();");					
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;
			var href = $("body").attr("data-url");		
			switch(true){
				case (href == "arms.html"):
					this.isplatform("arms");
					this.htmlArms();
					break;
				case (href == "arms-details.html"):
					this.isplatform("arms-details");
					this.htmlArmsDetails();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.BoombeachArms = BoombeachArms;
})(window);