(function(window){
	var BoombeachStatue = function(){		
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		
		
		this.o = {
			platform:"web",			
			plugin_statue:"plugin_717",
			url:"images/boombeach/",
			total_level:0
				
		};
		if(this.o.platform == "android"){
			this.o.url="../images/boombeach/";
		}
		this.init();
	};
	
	BoombeachStatue.prototype = {


		htmlStatue: function(){//神像详情
			var that = this;
			that.printStatueSpecies();	
			that.events();		
		},

		
		printStatueSpecies: function(){//神像列表
			var species = this.data,
			that = this;
			html_species='',
			html_detail_content='';								
			for(var i=0;i<species.length;i++){
				html_species += '<li id="statue_species_item" data-index="'+i+'">'+species[i].cname+'</li>';
				html_detail_content += '<ul>';	
				for(var j=0;j<species[i].cdata.length;j++){					
					html_detail_content += '<li data-id="'+species[i].cdata[j].id+'"><a><div class="img"><img src="'+
					that.o.url+'statue/'+
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

		events:function(){//神像列表页面事件监听
			var $species_nav=$("#datalist_nav"),
			that = this,
			t_index = Number(that.getsession("wbgl-boombeach-statue-tindex"));
			
			$species_nav.on("click","li", function(){				
				t_index = Number($(this).attr("data-index"));				
				$species_nav.children().children().eq(t_index).addClass("on").siblings().removeClass("on");
				$("#datalist").children().eq(t_index).addClass("on").siblings().removeClass("on");
				that.setsession("wbgl-boombeach-statue-tindex", t_index);
			}).children().children().eq(t_index).trigger("click");	


			$("#datalist").on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));
				that.setsession("wbgl-boombeach-statue-tindex", t_index);
				that.setsession("wbgl-boombeach-statue-id", _id);				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin_statue+'/data-boombeach-statue-details.html';
				}else{
					location.href = 'data-boombeach-statue-details.html';
				}
			});
			
		},		
		
		printStatueSpecies: function(){//打印神像列表页面
			var species = this.data,
			that = this;
			html_species='',
			html_detail_content='';								
			for(var i=0;i<species.length;i++){
				html_species += '<li id="arm_species_item" data-index="'+i+'">'+species[i].cname+'</li>';
				html_detail_content += '<ul>';	
				for(var j=0;j<species[i].cdata.length;j++){					
					html_detail_content += '<li data-id="'+species[i].cdata[j].id+'"><a>'+
					'<div class="img"><img src="'+
					that.o.url+'statue/'+
					species[i].cdata[j].img+
					'"></div>'+
					'<div class="note"><h2>'+
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
		
		htmlStatueDetails: function(){//神像详情页面
			var species = this.data,
			data,			
			that = this;
			for(var i=0;i<species.length;i++){//找到对应的数据
				
				for(var j=0;j<species[i].cdata.length;j++){
					data = species[i].cdata[j];							
					if(that.getsession("wbgl-boombeach-statue-id") == data.id){					
						that.printDetail(data);
						that.o.total_level = data.data[0].v.length; 
						that.setFigure(data,0);
						that.setSlidebar(data,that.o.total_level);//滑动条
					}						
				}
			}
		},	

		printDetail:function(data){//打印神像详情页面
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
			$("#armsd_bg_d").html('<img class="armsd_bg" src="'+that.o.url+'statue/'+mData.img+'">');
			$("#label_d").children("span").html(mData.name);
			for(var i=0;i<mData.label.length;i++){			
				//Label	
				$("#armsd").children("label").html('<span>'+mData.label[i]+'</span>');
			}			
			//描述
			$("#arm_des").html(mData.ldesc);
			//专家点评
			$("#arm_comm").html(mData.comment);
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
			if(mData.showdataid.length == 1){ //现在的json数据不存在这种情况 
				id = mData.showdataid[0];				
				for(var i=0;i<mData.data.length;i++){
					if(id != mData.data[i].id){		
							var icon_img='';
							if(mData.data[i].img.length>0){
								icon_img = '<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[i].img+'.png'+'">';
							}				
		    				html_data += '<dl>'+
		    				'<dt>'+mData.data[i].k+'</dt>'+
		    				icon_img+
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
				//左边有两项数据
				id = mData.showdataid[0];//上边数据
				id1= mData.showdataid[1];//下边数据				
				for(var j=0;j<mData.data.length;j++){
					if(id != mData.data[j].id && id1 != mData.data[j].id){
							var s_pic = '';		
							//有多张图片					
							if(mData.data[j].img instanceof Array && mData.data[j].img.length>1){

								var part3='',
									part4='';
								html_data_pic ='<div class="d_l"><span>'+mData.data[j].k+'</span></div>';
									for(var k=0;k<mData.data[j].img.length;k++){
										part3 += '<div><img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img[k]+'.png'+'">'+
										'<span>'+mData.data[j].v[level][k]+'</span></div>';
									}
									part4 += '<div class="d_r_f_l">'+part3+'</div><div class="clear"></div>';
								html_data += '<div>'+html_data_pic+part4+'</div>';
							}
							else{//只有一张图片
								var part3='',
									part4='';
								html_data_pic ='<div class="d_l"><span>'+mData.data[j].k+'</span></div>';
								if(mData.data[j].img.trim().length > 0){
									part3 += '<div><img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img+'.png'+'">'+
										'<span>'+mData.data[j].v[level]+'</span></div>';									
								}else{//没有图片
									if(mData.data[j].v instanceof Array && mData.data[j].v.length>1){//描述是数组										
										part3 += '<div><span>'+mData.data[j].v[level]+'</span></div>'	
									}else{//描述是值
										part3 += '<div><span>'+mData.data[j].v+'</span></div>';		
									}
									
								}
								part4 += '<div class="d_r">'+part3+'</div>'+'<div class="clear"></div>';
								html_data += '<div>'+html_data_pic+part4+'</div>';
							}      
					}else{
							if(id == mData.data[j].id){
								//不止一张图片								
								if(mData.data[j].img instanceof Array && mData.data[j].img.length>1){								
									var part1 ='';
									html_data1 +='<div class="k">'+mData.data[j].k+'</div>';
									for(var k=0;k<mData.data[j].img.length;k++){
										part1 += '<div><img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img[k]+'.png'+'">'+
										'<span>'+mData.data[j].v[level][k]+'</span></div>';
									}
									html_data1 += '<div class="d_r_f_center">'+part1+'</div>';

								}else{
									var part1 = '';
									html_data1 +='<div class="k">'+mData.data[j].k+'</div>';

									if(mData.data[j].img.trim().length > 0){
										part1 += '<div><img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img+'.png'+'">'+
											'<span>'+mData.data[j].v[level]+'</span></div>';									
									}else{
										if(mData.data[j].v instanceof Array && mData.data[j].v.length>1){										
											part1 += '<div><span>'+mData.data[j].v[level]+'</span></div>'	
										}else{
											part1 += '<div><span>'+mData.data[j].v+'</span></div>';		
										}
									}					
									html_data1 += '<div class="d_r_f_center">'+part1+'</div>';									
								}
							}
							if(id1 == mData.data[j].id){
								console.log(id1);
								console.log(mData.data[j].img.length);
								if(mData.data[j].img instanceof Array && mData.data[j].img.length>1){									
									var part3 = '';
									html_data2 +='<div class="k">'+mData.data[j].k+'</div>';
									for(var k=0;k<mData.data[j].img.length;k++){
										part3 += '<div><img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img[k]+'.png'+'">'+
										'<span>'+mData.data[j].v[level][k]+'</span></div>';
									}
									html_data2 += '<div class="d_r_f_center">'+part3+'</div>';

								}else{
									var part2 = '';
									html_data2 +='<div class="k">'+mData.data[j].k+'</div>';	
									if(mData.data[j].img.trim().length > 0){
										part2 += '<div><img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img+'.png'+'">'+
											'<span>'+mData.data[j].v[level]+'</span></div>';									
									}else{
										if(mData.data[j].v instanceof Array && mData.data[j].v.length>1){										
											part2 += '<div><span>'+mData.data[j].v[level]+'</span></div>'	
										}else{
											part2 += '<div><span>'+mData.data[j].v+'</span></div>';		
										}
									}																
									html_data2 += '<div class="d_r_f_center">'+part2+'</div>';	
								}								
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
			switch(i){
				case "statue":	
					if(this.o.platform == "web"){
							removehide();						
						}else if(this.o.platform == "android"){
							removehide();						
							$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
						}else if(this.o.platform == "ios"){
							$("#datalist_nav").addClass("mt_0");
						}
				break;					
				case "statue-details":
					if(this.o.platform == "web"){
							removehide();						
						}else if(this.o.platform == "android"){
							removehide();						
							$("#header").children(".back").attr("href","index.html");	
						}else if(this.o.platform == "ios"){
							$("#armsd_bg_d").addClass("mt_0");
						}				
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;
			var href = $("body").attr("data-url");
			switch(true){
				case (href == "statue.html"):
					this.isplatform("statue");
					this.htmlStatue();
					break;
				case (href == "statue-details.html"):
					this.isplatform("statue-details");
					this.htmlStatueDetails();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.BoombeachStatue = BoombeachStatue;
})(window);