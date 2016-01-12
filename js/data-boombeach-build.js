(function(window){
	var BoombeachBuild = function(){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		
		
		this.o = {
			platform:"web",			
			plugin_build:"plugin_715",
			url:"images/boombeach/",
			singleData:null,
			total_level:0
				
		};
		if(this.o.platform == "android"){
			this.o.url="../images/boombeach/";
		}
		this.init();
	};
	
	BoombeachBuild.prototype = {
		eventsDetails:function(){//详情页面所有事件监听		
			var that = this;			
			$("#pic_scroll_ul").on("click", "li",function(){
				var _index = $(this).parents().children().index($(this));							
				$("#pic_scroll").children().children("li").siblings().children().children("span").removeClass("on");
				$("#pic_scroll").children().children("li").eq(_index).children().children("span").addClass("on");
				that.setFigure(that.o.singleData,_index);
			}).children("li").eq(0).trigger("click");		
		},
		setFigure: function(mData,level){//数据详情	
			var that = this, 
			id='',
			id1='',
			html_data='',
			html_data1='',
			html_data2='';
			if(mData.showdataid.length == 1){ //左边只显示一个数据(现在的json不会有这种情况)
				id = mData.showdataid[0];				
				for(var i=0;i<mData.data.length;i++){
					if(id != mData.data[i].id){	
							var s_pic1='';
							if(mData.data[j].img.trim().length > 0){
								s_pic1 = '<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img+'.png'+'">';
							}
		    				html_data += '<dl>'+
		    				'<dt>'+mData.data[i].k+'</dt>'+
		    				s_pic1+
		    				'<dd>'+mData.data[i].v[level]+'</dd>'+
		    				'</dl>';
					}else{						
						var part0 = '';
						html_data1 +='<div class="k">'+mData.data[i].k+'</div>';
						for(var k=0;k<mData.data[i].img.length;k++){
							part0 += '<div class="k">'+
								'<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[i].img[k]+'.png'+'">'+
								mData.data[i].v[level][k]+'</div>';
							}
						html_data1 += part0;						
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
							if(mData.data[j].img instanceof Array && mData.data[j].img.length>1){

								var part3='', 
								html_data_pic ='<div class="k">'+mData.data[j].k+'</div>';
									for(var k=0;k<mData.data[j].img.length;k++){
										part3 += '<div class="k">'+
										'<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img[k]+'.png'+'">'+
										mData.data[j].v[level][k]+'</div>';
									}
								html_data += html_data_pic+part3;
							}
							else{
								if(mData.data[j].img.trim().length == 1){
									s_pic = '<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img+'.png'+'">';
								}
								html_data += '<dl>'+
			    				'<dt>'+mData.data[j].k+'</dt>'+
			    				s_pic+
			    				'<dd>'+mData.data[j].v[level]+'</dd>'+
			    				'</dl>';
							}      
					}else{
							if(id == mData.data[j].id){
								//不止一张图片								
								if(mData.data[j].img instanceof Array && mData.data[j].img.length>1){								
									var part1 = '';
									html_data1 +='<div class="k">'+mData.data[j].k+'</div>';
									for(var k=0;k<mData.data[j].img.length;k++){
										part1 += '<div class="k">'+
										'<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img[k]+'.png'+'">'+
										mData.data[j].v[level][k]+'</div>';
									}
									html_data1 += part1;

								}else{
									html_data1 +='<div class="num num_blue">'+mData.data[j].v[level]+'</div>'+
									'<div class="k">'+mData.data[j].k+'</div>';
								}
							}
							if(id1 == mData.data[j].id){
								if(mData.data[j].img instanceof Array && mData.data[j].img.length>1){									
									var part2 = '';
									html_data2 +='<div class="k">'+mData.data[j].k+'</div>';
									for(var k=0;k<mData.data[j].img.length;k++){
										part2 += '<div class="k">'+
										'<img class="small_icon" src="'+that.o.url+'icon/'+mData.data[j].img[k]+'.png'+'">'+
										mData.data[j].v[level][k]+'</div>';
									}
									html_data2 += part2;

								}else{
									html_data2 +='<div class="num num_blue">'+mData.data[j].v[level]+'</div>'+
									'<div class="k">'+mData.data[j].k+'</div>';
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

		printDetail:function(){//打印详情页
			var mData,
			species = this.data,
			that = this,
			td_one_key='',
			td_one_value='',
			td_two_key=''
			html_td_two_key='',
			td_two_value=''
			html_td_two_value='',
			html_td_two_value1='';

			for(var i=0;i<species.length;i++){
				
				for(var j=0;j<species[i].cdata.length;j++){
					data = species[i].cdata[j];					
					if(that.getsession("wbgl-boombeach-build-id") == data.id){						
						mData = data;
						that.o.singleData = mData;
						break;
					}						
				}
			}				
			$("#header").children("h1").html(mData.name);
			//顶部图片		
			$("#armsd_bg_d").html('<img class="armsd_bg" src="'+that.o.url+'building/'+mData.img+'">');
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
						
		},
	
		htmlDetail:function(){//详情页

			this.printDetail();
			if(this.o.singleData === null){
				return;
			}
			this.total_level = this.o.singleData.data[0].v.length; 
			this.setFigure(this.o.singleData,0);//数据详情			
			this.printPicScroll();//图片滚动栏		

			this.eventsDetails();//详情页事件

		},
		events:function(){//列表所有事件监听		
			var that = this,
			$species_nav=$("#datalist_nav"),			
			t_index = Number(that.getsession("wbgl-boombeach-build-tindex"));
			
			$species_nav.on("click","li", function(){				
				t_index = Number($(this).attr("data-index"));				
				$species_nav.children().children().eq(t_index).addClass("on").siblings().removeClass("on");
				$("#datalist").children().eq(t_index).addClass("on").siblings().removeClass("on");
				that.setsession("wbgl-boombeach-build-tindex", t_index);
			}).children().children().eq(t_index).trigger("click");	


			$("#datalist").on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));				
				that.setsession("wbgl-boombeach-build-id", _id);				
				if(that.o.platform == "ios"){
					location.href = that.o.plugin_build+'/data-boombeach-building-details.html';
				}else{
					location.href = 'data-boombeach-building-details.html';
				}
			});			
		},

		printBuildSpecies: function(){//打印建筑
			var species = this.data,
			that = this;
			html_species='',
			html_detail_content='';								
			for(var i=0;i<species.length;i++){
				html_species += '<li id="build_species_item" data-index="'+i+'">'+species[i].cname+'</li>';
				html_detail_content += '<ul>';	
				for(var j=0;j<species[i].cdata.length;j++){					
					html_detail_content += '<li data-id="'+species[i].cdata[j].id+'"><a><div class="img"><img src="'+
					that.o.url+'building/'+
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

		
		printPicScroll:function(){//打印滑动图片
			var that = this,					
			html_data='',
			pic_scroll_width=0,//图片滚动栏宽度	
			$pic_ul = $("#pic_scroll_ul");	
			for(var i=0; i<that.o.singleData.dataimg.length; i++){	
				var level = i+1;			
				html_data += '<li>'+
						'<div>'+
						'<img src="'+that.o.url+'building/'+that.o.singleData.dataimg[i]+'">'+
						'<div class="line"></div>'+
						'<span>'+"等级"+level+'</span>'+
						'</div>'+
	                	'</li>';
			}			
			$pic_ul.html(html_data);
			pic_scroll_width = $pic_ul.children("li").outerWidth(true) * that.o.singleData.dataimg.length;			
			$pic_ul.width(pic_scroll_width);		

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
				case "build":
					if(this.o.platform == "web"){
						removehide();
						
					}else if(this.o.platform == "android"){
						removehide();						
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}
				break;
				case "building-details":
					if(this.o.platform == "web"){
						removehide();						
					}else if(this.o.platform == "android"){
						removehide();						
						$("#header").children(".back").attr("href","index.html");						
					}
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;
			var href = $("body").attr("data-url");		
			switch(true){
				case (href == "build.html"):
					this.isplatform("build");					
					this.printBuildSpecies();
					this.events();					
					break;
				case (href == "building-details.html"):
					this.isplatform("building-details");
					this.htmlDetail();
					break;
			}
		},
		init: function(){
			this.ispage();
		}
	}
	
	window.BoombeachBuild = BoombeachBuild;
})(window);