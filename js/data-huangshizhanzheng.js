(function(window){
	var Huangshizhanzheng = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {
					platform:"web",
					url:"images/huangshizhanzheng/",
					plugin:""
				 };
		if(this.o.platform == "android"){
			this.o.url="../images/huangshizhanzheng/";
		}
		this.init();
	};
	
	Huangshizhanzheng.prototype = {
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

		printIndex:function(){

			var piece,
				html_head = '',
				html_content = '',
				html_content_temp = '',
				html_content_all = '';
			for(var i=0; i<this.data.length; i++){
				html_head += '<div class="item">'+this.data[i].typ+'</div>';
				html_content += '<ul>';
				html_content_temp='';
				for(var j=0; j<this.data[i].data.length; j++){
					piece = this.data[i].data[j];
					html_content_temp += '<li data-type="'+(i+1)+'"data-id="'+piece.id+'"><img src="'+this.o.url+'dbpic/'+piece.id+'.png"><p>'+piece.name+'</p></li>';
				}
				html_content += html_content_temp;
				html_content_all += html_content_temp;
				html_content += '</ul>';
			}
			$("#weapon_head").html(html_head);
			$("#weapon_content").html(html_content);
		},

		printDetail:function(){
			var that = this,
				piece = '',
				html_head_pic = '',
				html_head_des = '',
				html_head_level = '',
				html_table1 = '',
				html_table2 = '',
				html_table= '',
				table1_1 = '',
				table1_2 = '',
				html_table3 = '',
				table3_title = '',
				table3_content = '';
			piece = that.getWeaponData();
			html_head_pic = '<img class="headpic" src="'+that.o.url+'dbpic/'+piece.id+'.png">'; 
			html_head_des = '<div class="dec_dd"><span>'+piece.deion[0]+'</span> </div>';
			html_head_level = '<div class="label" id="label">'+
								'<span class="'+that.getSpan1Color(piece.deion[1])+'">'+piece.deion[1]+'</span>'+
								'<span class="'+that.getSpan2Color(piece.deion[2])+'">'+piece.deion[2]+'</span>'+
								'<span class="'+that.getSpan3Color(piece.deion[3])+'">'+piece.deion[3]+'</span>'+
								'<img class="cup" src="images/huangshizhanzheng/dbpic/25.jpg">'+
								'<div class="line"></div>'+
								'</div>';
			for(var i=0; i<piece.list1.length; i++){				
				table1_1 += '<td><div><span class="g_1">'+that.getTableValue(piece.list1[i][0])+'</span><img src="images/huangshizhanzheng/dbpic/25.jpg"></div></td>';
				table1_2 += '<td><span class="g_2">'+piece.list1[i][1]+'</span></td>';
			}

			var level = '<td><span class="g_1">等级</span></td>';
			var level_value = '';
			var level_len = piece.list2[0].length;//等级长度 
			for(var j=0; j<piece.list2.length; j++){				
					table3_title += '<td><div><span class="g_1">'+piece.list2[j][0]+'<span></div></td>';					
			}
			
			for(var k=0; k<level_len-1; k++){					
					for(var m=0; m<piece.list2.length; m++){
						level_value = '<td><span class="g_2">'+(k+1)+'</span></td>';
						if(m<piece.list2.length){
							table3_content += '<td><span class="g_2">'+piece.list2[m][k+1]+'</span></td>';
						}
					}
					html_table3 += '<tr>'+level_value+table3_content+'</tr>';
					table3_content = '';
			}		
			html_table1 += '<tr>'+table1_1+'</tr>';
			html_table2 += '<tr>'+table1_2+'</tr>';
			html_table = '<tbody>'+html_table1+html_table2+'</tbody>';
			$("#describle").html(html_head_pic+html_head_des+html_head_level);
			$("#table1").html(html_table);
			$("#table2").html('<tbody>'+'<tr>'+level+table3_title+'</tr>'+html_table3+'</tbody>');
		},

		getSpan1Color:function(value){//普通 稀有 史诗颜色css
			var text='';			
			if(value == '普通'){
				text = 'putong';
			}else if(value == '稀有'){
				text = 'xiyou'
			}else if(value == '史诗'){
				text = 'shishi';
			}
			return text;
		},
		getSpan2Color:function(value){//部队 建筑 法系颜色css
			var text ='';
			if(value == '部队'){
				text = 'budui';
			}else if(value == '建筑'){
				text = 'jianzhu';
			}else if(value ==  '法术'){
				text = 'fashu';
			}
			return text;
			
		},
		getSpan3Color:function(value){//数值css
			var text = '';
			if(value == '0+'){
				text = 'z_plus';
			}else if(value == '400+'){
				text = 'fh_plus';
			}else if(value == '800+'){
				text = 'eh_plus';
			}else if(value == '1100+'){
				text = 'evh_plus';
			}else if(value == '1400+'){
				text = 'fth_plus';
			}else if(value == '1700+'){
				text = 'sth_plus';
			}else if(value == '2000+'){
				text = 'tth_plus';
			}
			return text;
		},
		getTableValue:function(value){
			text = '';
			switch(value){
				case 1:
				text = '效果范围';
				break;
				case 2:
				text = '攻击速度';
				break;
				case 3:
				text = '移动速度';
				break;
				case 4:
				text = '攻击距离';
				break;
				case 5:
				text = '攻击目标';
				break;
				case 6:
				text = '部署时间';
				break;
				case 7:
				text = '单位数量';
				break;
				case 31:
				text = '慢';
				break;
				case 32:
				text = '中等';
				break;
				case 33:
				text = '快';
				break;
				case 34:
				text = '极快';
				break;
				case 51:
				text = '地面';
				break;
				case 52:
				text = '空中';
				break;
				case 53:
				text = '陆空兼顾';
				break;
				case 53:
				text = '建筑';
				break;
			}
			return text;
		},

		getWeaponData:function(){
			var that = this,
				piece='',
				weaponid = that.getsession("wbgl-huangshizhanzheng-weapon-id"),
				weapontype = that.getsession("wbgl-huangshizhanzheng-weapon-type");				
				for(var i=0; i<that.data.length; i++){					
					if(that.data[i].tid == weapontype){//找到类型
						for(var j=0; j<that.data[i].data.length; j++){
							if(weaponid = that.data[i].data[j].id){
								piece = that.data[i].data[j];								
								return piece;
							}
						}
					}
				}
		},

		printCompare:function(){

		},

		events:function(){
			var that = this,
			tindex = 0;
			$weapon_head = $("#weapon_head"),
			$weapon_content = $("#weapon_content"),

			/*兵种列表点击事件*/
			$weapon_head.on("click", ".item", function(){
				tindex = $weapon_head.children().index(this);
				that.setsession("wbgl-huangshizhanzhanzheng-weapon-tindex",tindex);
				$weapon_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$weapon_content.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(tindex).trigger("click");


			$weapon_content.on("click", "li", function(){
				var _id = Number($(this).attr("data-id"));
					_weapontype = Number($(this).attr("data-type"));
				that.setsession("wbgl-huangshizhanzheng-weapon-id",_id);
				that.setsession("wbgl-huangshizhanzheng-weapon-type",_weapontype);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-huangshizhanzheng-weapon-detail.html';
				}else{
					location.href = 'data-huangshizhanzheng-weapon-detail.html';
				}
			});
			/*兵种详情点击事件*/
			/*卡牌对比点击事件*/
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
				case "detail":
				break;
				case "compare":
				break;
			}
		},
		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");
			switch(true){
				case (href == "index"):
					this.isplatform("index");
					this.printIndex();
					break;
				case (href == "detail"):
					this.printDetail();
					break; 
				case (heef == "compare"):
					break;
			}
		},
		init: function(){
			this.ispage();
			this.events();
		}
	}
	
	window.Huangshizhanzheng = Huangshizhanzheng;
})(window);

