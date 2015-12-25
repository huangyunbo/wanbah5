(function(window){
	var BoombeachArms = function(){		
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		
		
		this.o = {
			platform:"web",
			// plugin:"plugin_1101",//plugin_1101
			// plugin_equip:"plugin_1103",
			url:"images/boombeach/",
				
		};
		if(this.o.platform == "android"){
			this.o.url="../images/boombeach/";
		}
		this.init();
	};
	
	BoombeachArms.prototype = {

		htmlArms: function(){			
			var $species_nav=$("#datalist_nav"),
			that = this,
			t_index = Number(that.getsession("wbgl-boombeach-arms-tindex"));
			that.printArmsSpecies();
			$species_nav.on("click","li", function(){				
				t_index = Number($(this).attr("data-index"));				
				$species_nav.children().children().eq(t_index).addClass("on").siblings().removeClass("on");
				$("#datalist").children().eq(t_index).addClass("on").siblings().removeClass("on");
			}).children().children().eq(t_index).trigger("click");	


			$("#datalist").on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));
				that.setsession("wbgl-boombeach-arms-tindex", t_index);
				that.setsession("wbgl-boombeach-arms-id", _id);				
				// if(that.o.platform == "ios"){
				// 	location.href = that.o.plugin+'/data-vainglory-equip-detail.html';
				// }else{
					location.href = 'data-boombeach-arms-details.html';
				// }
			});
		},

		//打印兵种
		printArmsSpecies: function(){
			var species = this.data,
			that = this;
			html_species='',
			html_detail_content='';								
			for(var i=0;i<species.length;i++){
				html_species += '<li id="arm_species_item" data-index="'+i+'">'+species[i].cname+'</li>';
				html_detail_content += '<ul>';	
				for(var j=0;j<species[i].cdata.length;j++){					
					html_detail_content += '<li data-id="'+species[i].cdata[j].id+'"><a><div class="img"><img src="'+
					that.o.url+
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

		//打印兵种详情
		htmlArmsDetails: function(){
			var species = this.data,
			data,			
			that = this;
			for(var i=0;i<species.length;i++){
				
				for(var j=0;j<species[i].cdata.length;j++){
					data = species[i].cdata[j];					
					if(that.getsession("wbgl-boombeach-arms-id") == data.id){
						console.log(data);
						that.printDetail(data);
					}						
				}	
					

			}
		},	

		printDetail:function(data){
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
			$("#armsd_bg_d").html('<img class="armsd_bg" src="'+that.o.url+mData.img+'">');
			$("#label_d").children("span").html(mData.name);
			for(var i=0;i<mData.label.length;i++){			
				//Label	
				$("#armsd").children("label").html('<span>'+mData.label[i]+'</span>');
			}
			console.log(mData.ldesc);	
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
			
			// switch(i){
			// 	case "arms":
			// 		if(this.o.platform == "web"){
			// 			removehide();
			// 			this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
			// 		}else if(this.o.platform == "android"){
			// 			removehide();
			// 			this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
			// 			$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
			// 		}else if(this.o.platform == "ios"){
			// 			this.setsession("wbgl-quanminchaoshen-equip2hero","n");//重置 从装备跳转过来
			// 			$("#herolist").addClass("mt_0");
			// 		}
			// 	break;
			// 	case "arms-details":
			// 		if(this.o.platform == "web"){
			// 			removehide();
			// 			if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
			// 				$("#header").children(".back").attr("href","data-quanminchaoshen-equip-detail.html");
			// 			}
			// 		}else if(this.o.platform == "android"){
			// 			removehide();
			// 			if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
			// 				$("#header").children(".back").attr("href",'../'+this.o.plugin_equip+'/data-quanminchaoshen-equip-detail.html');
			// 			}else{
			// 				$("#header").children(".back").attr("href","index.html");
			// 			}
			// 		}
			// 	break;
			// }
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