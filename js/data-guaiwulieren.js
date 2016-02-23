(function(window){
	var Guaiwulieren = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};	
		//武器数据	
		this.data_weapon = this.data.data_weapon;
		//图表数据
		this.data_layout = this.data.data_layout;		
		this.o={
			platform:"web",
			url:"images/guaiwulieren/",
			plugin:"plugin_1101"
		};
		if(this.o.platform == "android"){
			this.o.url="../images/guaiwulieren/";
		}
		this.init();
		// console.log(this.data[8].result[0].data[1]);
		// console.log(this.data_layout.length);
		// for(var i=0;i<this.data_layout.length;i++){
		// 	console.log(this.data_layout[i].tname);
		// }
	};
	
	Guaiwulieren.prototype = {


		getWeaponData:function(weapon_id){
			var that = this,
			weapon_data='';
			for(var i=0;i<that.data_weapon.length;i++){
				var temp = that.data_weapon[i].result;
				for(var j=0;j<temp.length;j++)
				if(weapon_id == temp[j].iID){					
					return temp[j].data;
				}				
			}				
		},

		printDetail:function(){//打印详情页	
			var that = this;
			var index = this.getsession("wbgl-guaiwulieren-weapon-type");
			var html_title = '',
				html_content = '',
				html_small_icon = '',//是否可合成小图标
				weapon_icon='',//武器icon
				weapon_title_data = '',
				weapom_content_data = '',
				single_weapon_data= '',
				tindex='',
				tmep_c1='',
				$weapon_head = $("#weapon_head"),
				$weapon_content = $("#weapon_content");				
			for(var i=0;i<this.data_layout[index].data.length;i++){				
				weapon_title_data = this.data_layout[index].data[i];
				html_title +='<div class="item">'+weapon_title_data.gname+'</div>';	
				// if(i==3){//移动の城寨
					for(var j=0;j<weapon_title_data.gdate.length;j++){				
							weapom_content_data = weapon_title_data.gdate[j];	
							single_weapon_data = that.getWeaponData(weapom_content_data.id);							
							if(single_weapon_data[90] != ''){
								html_small_icon = '<i class="icon_chuizi"></i>';
							}	
							if(single_weapon_data[4] != ''){
								weapon_icon = '<img class="weapon_icon" src="images/guaiwulieren/icon/'+single_weapon_data[4]+'.png">';
							}
							html_content += '<div data_id="'+weapom_content_data.id+'" class="oldiv left'+weapom_content_data.line+' top'+weapom_content_data.row+'">'+html_small_icon+weapon_icon+'</div>';					
							html_small_icon = '';
						}
						tmep_c1 += '<div class="content_item">'+html_content+'</div>';
						html_content='';
				// }
			}
			$weapon_head.html(html_title);
			$weapon_content.html(tmep_c1);		
			$weapon_head.on("click", ".item", function(){				
				tindex = $weapon_head.children().index(this);				
				that.setsession("wbgl-guaiwulieren-weapon-title-tindex",tindex);
				$weapon_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$weapon_content.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(tindex).trigger("click");

			$weapon_content.on("click", ".oldiv", function(){
				var _id = Number($(this).attr("data_id"));
				that.setsession("wbgl-guaiwulieren-weapon-id",_id);
				console.log(_id);
				// if(that.o.platform == "ios"){
				// 	location.href = that.o.plugin+'/data-quanminchaoshen-hero-detail.html';
				// }else{
				// 	location.href = 'data-quanminchaoshen-hero-detail.html';
				// }
			});
		},

		printindex:function(){//打印Index,武器类型
			var that = this;
			var weaponName = ["铳枪","片手剑","大剑","太刀","大锤","双刀","弩炮","弓","狩猎笛"];
			var weaponIcon = ["weapons_chq.png","weapons_psj.png","weapons_dj.png","weapons_td.png","weapons_dc.png","weapons_sd.png","weapons_np.png","weapons_g.png","weapons_sld.png"];
			var type_html='',weaponType='';
			for(var i=0;i<weaponName.length;i++){				
				type_html += '<li weaponType="'+i+'"><img src="'+that.o.url+'weapontype/'+weaponIcon[i]+'"><p>'+weaponName[i]+'</p></li>';
			}			
			$("#content").html('<ul>'+type_html+'</ul>');

			$("#content").on("click", "li", function(){				
				weaponType = Number($(this).attr("weaponType"));
				that.setsession("wbgl-guaiwulieren-weapon-type",weaponType);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-guaiwulieren-weapon-detail.html';
				}else{
					location.href = 'data-guaiwulieren-weapon-detail.html';
				}
			});


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
				case "index":
					if(this.o.platform == "web"){
						removehide();
					}else if(this.o.platform == "android"){
						removehide();
						$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					}else if(this.o.platform == "ios"){
						$("#container").addClass("mt_0");
					}
				break;
				case "index-detail":
					if(this.o.platform == "web"){
							removehide();
							$("#header").children(".back").attr("href","data-guaiwulieren-weapon.html");
						}else if(this.o.platform == "android"){							
							$("#header").children(".back").attr("href","data-guaiwulieren-weapon.html");							
						}					
				break;
			}
		},

		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");			
			switch(true){
				case (href == "index.html"):
					this.isplatform("index");
					this.printindex();
					break;
				case (href == "index-detail.html"):
					this.isplatform("index-detail");
					this.printDetail();
					break;
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

		events: function(){
			var that = this;
			//旋转屏幕重新设置
			$(window).resize(function(e){
                that.pageReset();
            });
		},
		pageReset: function(){//重置页面
			this.setfontSize();			
		},

		setfontSize: function(){//根据宽度算整体字体大小
			var doc = document,
			docEle = doc.documentElement,
			docEleW = docEle.clientWidth,
			fs = docEleW/320*100;
			docEle.style.fontSize = fs+"px";
		},

		init: function(){
			this.ispage();
			this.events();
			this.pageReset();
		}
	}	
	window.Guaiwulieren = Guaiwulieren;
})(window);

