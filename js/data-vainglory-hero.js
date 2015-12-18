(function(window){
	var Vainglory = function(option){
		if(arguments[0] === undefined) return false;
		data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.data_hero = data.data_hero;		
		this.data_equip = data.data_equip;
		this.o = {
			plugin:"plugin_1080",
			platform:"web",
			url:"images/vainglory/",
			type:0,//英雄类别数组下标
			piece:{}//英雄单个详情object
		};
		if(this.o.platform == "android"){
			this.o.url="../images/vainglory/";
		}
		this.init();
	};
	
	
	Vainglory.prototype = {
		setHerodtop: function(){//初始设置英雄详情的高度
			var win_h = $(window).height(),
				head_h = $("#herod_head").outerHeight(true),
				img = new Image(),
				img_h = 0,
				h = 0;
			
			img.onload = function(){
				img_h = $("#herod_bg").height();
				if(win_h - head_h > img_h) return;
				h = img_h + head_h - win_h;
				$("#herod").css("margin-top",-h);
				$("#herod_bg").prev().css("height",h);
			}
			img.src = $("#herod_bg").attr("src");		
		},
		htmlIndex: function(){
			var that = this,
				tlocation = 0,
				tduty = 0,
				tprice = 0;
			this.printIndex(tlocation,tduty,tprice);			

			$("#herolist_nav_top").children().click(function(){
				var self = $(this),
				_index = $("#herolist_nav_top").children().index(self);
				self.toggleClass("on").siblings().removeClass("on");
				$("#herolist_nav_select").children().eq(_index).toggleClass("on").siblings().removeClass("on");
			});

			$("#hero_location").children().click(function(){
				var self = this;				
				$("#hero_location").removeClass("on");	
				$("#herolist_nav_top").children().removeClass("on");
				tlocation = $("#hero_location").children().index(self);						
				that.printIndex(tlocation,tduty,tprice);
				$("#herolist_nav_top").children().eq(0).children("span").html($(self).text());

			});

			$("#hero_duty").children().click(function(){
				var self = this;				
				$("#hero_duty").removeClass("on");	
				$("#herolist_nav_top").children().removeClass("on");
				tduty = $("#hero_duty").children().index(self);				
				that.printIndex(tlocation,tduty,tprice);	
				$("#herolist_nav_top").children().eq(1).children("span").html($(self).text());			
			});

			$("#hero_price").children().click(function(){
				var self = this;				
				$("#hero_price").removeClass("on");	
				$("#herolist_nav_top").children().removeClass("on");	
				tprice = $("#hero_price").children().index(self);			
				that.printIndex(tlocation,tduty,tprice);	
				$("#herolist_nav_top").children().eq(2).children("span").html($(self).text());		
			});

			$("#heroitem").on("click", "li", function(){
				var _id = Number($(this).attr("data-id")),
					_herotype = Number($(this).attr("data-type"));
				
				that.setsession("wbgl-vainglory-hero-id",_id);
				that.setsession("wbgl-vainglory-hero-type",_herotype);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-vainglory-hero-detail.html';
				}else{
					location.href = 'data-vainglory-hero-detail.html';
				}
			});
		},



		getLocation: function(location){
				switch(location){
					case 1:
					return "zhanshi";
					case 2:
					return "huweizhe";
					case 3:
					return "cike";
					case 4:
					return "gongjian";
					case 5:
					return "fashi";
				}
			},
		

		printIndex: function(mloction,mduty,mprice){//打印英雄列表
			var hero_data,				
				html_content_temp='';
			var that = this;

			

			// var a = [{k:'c3',v:3},{k:'c1',v:1},{k:'c5',v:5},{k:'c9',v:9},{k:'c7',v:7},{k:'c11',v:11},{k:'c1',v:1},{k:'c20',v:20},{k:'c2',v:2}];			
			function sortNumber(a,b)
			{				
				if(mprice == 1){
					return b.honor - a.honor;
				}
				return b.id - a.id;
			}			
			this.data_hero.sort(sortNumber);			
			for(var i=0; i<this.data_hero.length; i++){
				hero_data = this.data_hero[i];
				if((mloction == 0 || mloction == hero_data.location) && (mduty == 0 || mduty == hero_data.duty)){									
					html_content_temp += '<li data-id="'+hero_data.id+'">'+
								        '<div class="img">'+
								          '<img src="'+this.o.url+'dbpic/image_'+hero_data.id+'.jpg">'+
								        '</div>'+	
								        '<div class="name">'+
								          '<i class="icon_heroitem icon_jobs icon_jobs_'+that.getLocation(hero_data.location)+'"></i>'+hero_data.name+
								        '</div>'+
								        '<div class="gold">'+
								          '<span>'+
								            '<i class="icon_heroitem icon_honor"></i>'+hero_data.honor+   
								          '</span>'+
								          '<span>'+
								            '<i class="icon_heroitem icon_ice"></i>'+hero_data.ice+
								          '</span>'+
								        '</div>'+
								      '</li>';
				}								     
			}
			$("#heroitem").children().html(html_content_temp);			
		},


		htmlHeroDetail: function(){
			var that = this,
				isnetwork = 1;

			that.o.type = Number(that.getsession("wbgl-vainglory-hero-type"));			
			that.printHeroDetail();		
			//英雄技能点击	
			$("#skills_head").on("click", "li",function(){
				var self = this,
					$self = $(self),
					$skills_head_children = $self.parents().children(),
					_index = $skills_head_children.index(self),
					oldindex = 0;
				
				$skills_head_children.each(function(index, element) {
                    if($(element).hasClass("on")){
						oldindex = index;
					}
                });
				$skills_head_children.eq(oldindex).removeClass("on");
				$self.addClass("on");
				
				$("#skills_content").children().eq(_index).addClass("on").siblings().removeClass("on");
				if(isnetwork == 1 && jQuery.trim(that.o.piece.skill_video[_index]).length>0){
					$("#skills_content").find(".youku").eq(oldindex).html("");
					that.setVideo(that.o.piece.skill_video[_index],_index);//英雄技能视频
				}
				if(window.navigator.onLine && jQuery.trim(that.o.piece.skill_video[_index]).length>0){
					isnetwork = 1;//有网
					that.setVideoWH();
				}else{
					isnetwork = 0;//无网
				}
			}).find("li").eq(0).trigger("click");

			//装备选择点击
			$("#equipchoice_head").on("click", "li",function(){
				var self = this,
					$self = $(self),
					$equipchoice_head_children = $self.parents().children(),
					_index = $equipchoice_head_children.index(self);
				
				if($self.hasClass("on")){
					$equipchoice_head_children.eq(_index).removeClass("on");
					$("#equipchoice_content").children().eq(_index).removeClass("on");
				}else{
					$equipchoice_head_children.eq(_index).addClass("on").siblings().removeClass("on");
					$("#equipchoice_content").children().eq(_index).addClass("on").siblings().removeClass("on");
				}	
			});

			//皮肤点击
			$("#skin").on("click", "li", function(){
				var self = $(this),
					head = self.parents(),
					_index = head.children().index(this);

				self.addClass("on").siblings().removeClass("on");
				head.next(".box").children().eq(_index).addClass("on").siblings().removeClass("on");
			}).find("li").eq(0).trigger("click");

			that.setHerodtop();
			that.setSlidebar();//滑动条		
		},

		
		printHeroDetail: function(){//打印英雄详情
			var that = this,
				id = 0,
				intro_top = '',
				summary = '',
				html_equipchoice_head = '',
				html_equipchoice_content = '',
				html_addskill = '',
				hero_qipo = '',
				html_skills_head = '',
				html_skills_content = '',
				html_skin_head = '',
				html_skin_box = '',
				isskin = 0,
				html_skin = '',
				type = this.o.type,
				piece;
			function getHardLevel(level){//难度等级
			switch(level){
				case 1:
				return "初级";
				case 2:
				return "中级";
				case 3:
				return "高级"; 
				}			
			}
			function getDuty(duty){//职责
				switch(duty){
					case 1:
					return "对线";
					case 2:
					return "打野";
					case 3:
					return "游走"; 
				}			
			}
			id = Number(this.getsession("wbgl-vainglory-hero-id"));			
			for(var i=0; i<this.data_hero.length; i++){
				if(this.data_hero[i].id == id){
					piece = this.data_hero[i];
					this.o.piece = piece;
					break;
				}
			}			
			if(piece === undefined) return;			
			$("#herod_bg").attr("src",that.o.url+"dbpic/image_"+id+".jpg");//大背景图片

            intro_top ='<div class="intro_top">'+
					    	'<div class="top_l">'+
					        	'<span class="name">'+piece.name+'</span>'+
					            '<i class="icon_jobs icon_jobs_'+this.getLocation(piece.location)+'"></i>'+
					        '</div>'+            
					        '<div class="top_r">'+
					            '<div class="item">'+
					                '<i class="icon_honor"></i>'+piece.honor+
					            '</div>'+                           
					            '<div class="item">'+
					                '<i class="icon_ice"></i>'+piece.ice+
					            '</div>'+
					        '</div>'+
					    '</div><!--/intr-top-->'+
					    '<div class="clear"></div>'+        
					    '<div class="intro_middle">'+
					    	''+"难度:"+getHardLevel(piece.diff)+' | '+"位置:"+getDuty(piece.duty)+
					    '</div>'+      
					    '<div class="intro_bottom media_fs_14">'+
					    	''+piece.desc+''+
					    '</div>';

			$("#herod_head").html(intro_top);
			summary = '<p class="media_fs_14">'+piece.summary+'</p>';
			$("#summary").html(summary);	

			
			for(var i=0; i<piece.item.length; i++){
				
				var choice_equip='';
				html_equipchoice_head += '<li><img src="'+this.o.url+'equip/'+'item'+piece.item[i]+'.png"></li>';					
				function equiplabel(){
							var _html = '';
							for(var i=0; i<choice_equip.label.length; i++){
								_html += '<span>'+choice_equip.label[i]+'</span>';
							}							
							return _html;
						}			
				for(var j=0; j<this.data_equip.length; j++){						
						
						for(var n=0;n<this.data_equip[j].data.length;n++){

							if(piece.item[i] == this.data_equip[j].data[n].id){
								choice_equip = this.data_equip[j].data[n];								
								html_equipchoice_content += '<div class="item"><div>'+
									'<span class="polygon"><i></i>'+
									'</span>'+
					                '<span class="equip_name media_fs_14">'+choice_equip.name+
					                '</span>'+
					                '<label class="price ">售价: '+choice_equip.price+
					                '</label>'+
					                '</div>'+
					                '<div class="ml_16 label">'+
					               		equiplabel()+
					                '</div>'+
					                '<div class="ml_16 media_fs_14">'+
					                	choice_equip.prop+
					                '</div></div>';
						}
					}
				}  
				
				
			}		
			
			$("#equipchoice").html(html_equipchoice_head);//装备选择
			$("#equipchoice_content").html(html_equipchoice_content);//装备选择		

			for(var i=0; i<piece.build.length; i++){
				html_addskill += '<li><img src="'+this.o.url+'dbpic/skill'+piece.id+'_'+piece.build[i]+'.jpg"></li>';
			}
			$("#addskill").html(html_addskill);//加点路线			
			$("#graphical").children("li").each(function(index){//英雄数据				
				$(this).find(".star").addClass("star"+piece.ability[index]);
			});			 

	        hero_qipo = '<li><div class="l"><img src="'+this.o.url+'dbpic/spec'+piece.id+'.jpg"></div>'+
                '<div class="r media_fs_14">'+
                '<div>'+piece.spec_name+
                '</div><p>'+piece.spec_des+'</p>'+
                '</div><div class="r media_fs_14"><div class="qp_skill">气魄技巧</div><p>'+piece.spec_tips+'</p></div>'+
                '</li>';
            $("#hero_qipo").html(hero_qipo);//英雄气魄
            
            for(var i=0; i<piece.skill_name.length; i++){//英雄技能
				html_skills_head += '<li>'+
										'<img src="'+this.o.url+'dbpic/skill'+piece.id+'_'+(i+1)+'.jpg">'+
									'</li>';				
				html_skills_content += '<div class="item">'+
											'<div class="desc"><div>'+
							            		'<span>'+piece.skill_name[i]+'</span>'+piece.skill_desc[i]+'</div>'+'<div>'+piece.skill_data[i]+'</div>'+
							            		'<div class="desc"><div>'+
							            		'<span>技能技巧 :</span>'+piece.skill_tips[i]+'</div>'+'</div>'+
							                '</div><div class="youku" id="youkuplayer'+i+'"></div></div>';
						
			}
			$("#skills_head").children().html(html_skills_head);//技能icon
			$("#skills_content").html(html_skills_content);//技能详情
			
			html_skin = '<h2 class="herod_h2 plr_7">英雄皮肤</h2>'+
						        '<ul class="head">';

			for(var i=0; i<piece.skin.length; i++){//英雄皮肤相关
				if($.trim(piece.skin[i]).length == 0) continue;
				isskin = 1;
				html_skin_head += '<li>'+
					            	'<img src="'+this.o.url+'dbpic/skinicon'+piece.id+'_'+(i+1)+'.jpg">'+
					              '</li>';
				html_skin_box +=  '<div class="item">'+
									'<div class="mb_10 center"><img src="'+this.o.url+'dbpic/skinpic'+piece.id+'_'+(i+1)+'.jpg">'+
								  '</div>';
					            			          
				if($.trim(piece.skin_ice[i]).length != 0){
					html_skin_box += '<div><span>售价</span><i class="icon_ice"></i><h4>'+piece.skin_ice[i]+'</h4></div>';
				}
				if($.trim(piece.skin_composes[i]).length != 0){
					html_skin_box += '<div><span>合成</span>'+piece.skin_composes[i]+'</div>';
				}
				html_skin_box += '</div>';

			}
			html_skin_box = '<div class=box>'+html_skin_box+'</div>';
			html_skin += html_skin_head + '</ul>' + html_skin_box;

			if(isskin != 0){
				$("#skin").html(html_skin);
			}			
			that.setFigure(1);
		},
		
		setFigure: function(level){	//设置英雄基本属性值		
			var piece = this.o.piece,
			level = level === 1 ? 0 : level-1;
			var basic_data = '<ul class="info mb_10 media_fs_14" id="hero_basic_data"><li>'+
				'<span>生命:</span>'+(parseInt(piece.figure.hp[0]+level*piece.figure.hp[1]))+'(+'+piece.figure.hp[1]+'每级)'+
				'</li>'+
	            '<li><span>护甲:</span>'+(parseInt(piece.figure.armor[0]+level*piece.figure.armor[1]))+'(+'+piece.figure.armor[1]+'每级)'+
	            '</li>'+
	            '<li><span>'+piece.figure.mpname+':'+'</span>'+(parseInt(piece.figure.mp[0]+level*piece.figure.mp[1]))+'(+'+piece.figure.mp[1]+'每级)'+
	            '</li>'+
	            '<li><span>魔抗:</span>'+(parseInt(piece.figure.res[0]+level*piece.figure.res[1]))+'(+'+piece.figure.res[1]+'每级)'+
	            '</li>'+
	            '<li><span>攻击:</span>'+(parseInt(piece.figure.atk[0]+level*piece.figure.atk[1]))+'(+'+piece.figure.atk[1]+'每级)'+
	            '</li>'+
	            '<li><span>攻击范围:</span>'+parseInt(piece.figure.atkrange[0])+
	            '</li>'+
	            '<li><span>攻击速度:</span>'+(parseInt(piece.figure.aspd[0]+level*piece.figure.aspd[1]))+'(+'+piece.figure.aspd[1]+'每级)'+
	            '</li>'+
	            '<li><span>移动速度:</span>'+parseInt(piece.figure.mspd[0])+
	            '</li></ul>';	             
	        $("#hero_basic_data").html(basic_data);//英雄数据

		},
		
		setVideo: function(videoId,index){//设置播放视频
	  		var player = new YKU.Player('youkuplayer'+index,{
	                                    styleid: '0',
	                                    client_id: '759811013057796d',
	                                    vid: videoId,
	                                    show_related: false
	                                });
		},
		
		setVideoWH: function(){//设置视频宽高
			var $skills_content = $("#skills_content"),
				v_width = $skills_content.width(),
				v_height = parseInt(v_width/306*190);

			$skills_content.find(".youku").each(function(){
				$(this).height(v_height);
			});
		},
		
		setSlidebar: function(){//设置属性值滑动栏
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
				paragraph = barW_max/12,
				level = 1;//初始化

			function slide(rangeX){//计算滑动
				var _level = Math.ceil(rangeX/paragraph);
				
				_level = _level == 0 ? 1 : _level;
				$barhandle.css({"left":rangeX+"px"});
				if(_level == level) return;//减少后面的调用				
				level = _level;
				$("#barlevel").html(level);
				that.setFigure(level);
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
				case "index":
					this.setsession("wbgl-vainglory-equip2hero","n");
					// if(this.o.platform == "web"){
					// 	removehide();
					// }else if(this.o.platform == "android"){
					// 	removehide();
					// 	$("#header").children(".back").attr("href","javascript:window.jstojava.close()");
					// }else if(this.o.platform == "ios"){
					// 	$("#herolist").addClass("mt_0");
					// }

					if(this.o.platform == "web"){
						removehide();
						this.setsession("wbgl-vainglory-equip2hero","n");//重置 从装备跳转过来
					}else if(this.o.platform == "android"){
						removehide();
						this.setsession("wbgl-vainglory-equip2hero","n");//重置 从装备跳转过来
						$("#header").children(".back").attr("href","javascript:window.jstojava.close();");
					}else if(this.o.platform == "ios"){
						this.setsession("wbgl-vainglory-equip2hero","n");//重置 从装备跳转过来
						$("#herolist").addClass("mt_0");
					}	


				break;
				case "herodetail":
					if(this.o.platform == "web"){
						removehide();
						if(this.getsession("wbgl-vainglory-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href","data-vainglory-equip-detail.html");
						}
					}else if(this.o.platform == "android"){
						removehide();
						if(this.getsession("wbgl-quanminchaoshen-equip2hero") == "y"){//如果是从装备跳转过来的
							$("#header").children(".back").attr("href",'../'+this.o.plugin_equip+'/data-vainglory-equip-detail.html');
						}else{
							$("#header").children(".back").attr("href","index.html");
						}
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
					this.htmlIndex();
					break;		
				case (href == "herodetail.html"):
					this.isplatform("herodetail");
					this.htmlHeroDetail();
					break;		
			}
		},
		init: function(){			
			this.ispage();
		}
	}
	
	window.Vainglory = Vainglory;
})(window);

