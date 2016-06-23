(function(window){
	var Huangshizhanzheng = function(option){
		if(arguments[0] === undefined) return false;
		this.data = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.o = {
					platform:"web",
					url:"images/huangshizhanzheng/",
					plugin:"plugin_1194"
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
				html_head_pic = '',//pic
				html_head_des = '',//描述
				html_head_level = '',//等级
				html_table1 = '',
				html_table2 = '',
				html_table= '',
				table1_1 = '',
				table1_2 = '',
				html_table3 = '',
				table3_title = '',
				table3_content = '',
				html_card_exp = '',//卡牌经验
				html_card_zuhe = '',//卡片组合
				html_card_kezhi = '',//卡片克制
				html_card_recomm = '';//推荐卡组	
			piece = that.getWeaponData();
			html_head_pic = '<img class="headpic" src="'+that.o.url+'dbpic/'+piece.id+'.png">'; 
			html_head_des = '<div class="dec_dd"><span>'+piece.deion[0]+'</span> </div>';
			html_head_level = '<div class="label" id="label">'+
								'<span class="'+that.getSpan1Color(piece.deion[1])+'">'+piece.deion[1]+'</span>'+
								'<span class="'+that.getSpan2Color(piece.deion[2])+'">'+piece.deion[2]+'</span>'+
								'<span class="'+that.getSpan3Color(piece.deion[3])+'">'+piece.deion[3]+'</span>'+
								'<img class="cup" src="'+that.o.url+'gold_cup.png">'+
								'<div class="line"></div>'+
								'</div>';
			for(var i=0; i<piece.list1.length; i++){				
				var k_name=that.getTableValue(piece.list1[i][0]),
					v_name=that.getTable2Value(piece.list1[i][1]);
				if(k_name == '攻击距离'){
					if(v_name == 0){
						v_name = '近战';
					}
				}	
				if(k_name =='部署时间' || k_name =='出兵速度' || k_name =='持续时间' || k_name =='生产速度'){
					v_name = v_name+'s';
				}
				if(k_name == '攻击速度'){
					v_name = v_name+'s/次';
				}
				if(k_name == '单位数量'){
					v_name = 'x'+v_name;
				}				
				table1_1 += '<td class="name"><div><span class="g_1">'+k_name+'</span><img src="'+that.o.url+'icon/'+piece.list1[i][0]+'.png"></div></td>';
				table1_2 += '<td><span class="g_2">'+v_name+'</span></td>';				
			}
			var level = '<td class="name"><span class="g_1">等级</span></td>';
			var level_value = '';
			var level_len = piece.list2[0].length;//等级长度 
			for(var j=0; j<piece.list2.length; j++){		
					if(piece.list2[j][0] == '生效时间'){
						piece.list2[j][0] = piece.list2[j][0]+'(s)';
					}		
					table3_title += '<td><div><span class="g_1">'+piece.list2[j][0]+'<span></div></td>';					
			}			
			for(var k=0; k<level_len-1; k++){//表格					
					for(var m=0; m<piece.list2.length; m++){
						level_value = '<td><span class="g_2">'+(k+1)+'</span></td>';
						if(m<piece.list2.length){
							table3_content += '<td><span class="g_2">'+piece.list2[m][k+1]+'</span></td>';
						}
					}
					html_table3 += '<tr class="name">'+level_value+table3_content+'</tr>';
					table3_content = '';
			}
			for(var e_i=0; e_i<piece.deion[4].length;e_i++){//卡牌经验				
				html_card_exp += '<div class="exprience"><div class="lingxing"></div><span>'+piece.deion[4][e_i]+'</span></div>';
			}				
			if(piece.group[0] != undefined && piece.group[0].length > 0){
				var zuhe_pic = '';
				for(var z_i=0; z_i<piece.group[0].length; z_i++){//卡牌组合
					zuhe_pic += '<li><img src="'+that.o.url+'dbpic/'+piece.group[0][z_i]+'.png"></li>'; 
				}
				html_card_zuhe = '<span>卡牌组合</span><ul>'+zuhe_pic+'</ul><div class="zuhe"><span>'+piece.deion[5]+'</span></div><div class="line"></div>';
				$("#card_zuhe").html(html_card_zuhe);
			}			
			if(piece.group[1] != undefined && piece.group[1].length >0 ){
				var kezhi_pic = '';
				for(var k_i=0; k_i<piece.group[1].length; k_i++){//卡牌克制
					kezhi_pic += '<li><img src="'+that.o.url+'dbpic/'+piece.group[1][k_i]+'.png"></li>'; 
				}
				html_card_kezhi = '<span>卡牌克制</span><ul>'+kezhi_pic+'</ul><div class="kezhi"><span>'+piece.deion[6]+'</span></div><div class="line"></div>';
				$("#card_kezhi").html(html_card_kezhi);
			}			
			if(piece.group[2] != undefined && piece.group[2].length > 0){
				var recomm_pic = '';
				for(var r_i=0; r_i<piece.group[2].length; r_i++){//推荐卡组
					recomm_pic += '<li><img src="'+that.o.url+'dbpic/'+piece.group[2][r_i]+'.png"></li>'; 
				}
				html_card_recomm = '<span>推荐卡组</span><ul>'+recomm_pic+'</ul><div class="recom"><span>'+piece.deion[7]+'</span></div><div class="line"></div>';
				$("#card_recomm").html(html_card_recomm);
			}			

			html_table1 += '<tr>'+table1_1+'</tr>';
			html_table2 += '<tr>'+table1_2+'</tr>';
			html_table = '<tbody>'+html_table1+html_table2+'</tbody>';

			$("#header").children("h1").text(piece.name);
			$("#describle").html(html_head_pic+html_head_des+html_head_level);
			$("#table1").html(html_table);
			$("#table2").html('<tbody>'+'<tr class="name">'+level+table3_title+'</tr>'+html_table3+'</tbody>');			
			$("#card_exp").html('<span>卡牌经验</span>'+html_card_exp);			
		},

		getSpan1Color:function(value){//普通 稀有 史诗颜色css
			var text='';			
			if(value == '普通'){
				text = 'putong';
			}else if(value == '稀有'){
				text = 'xiyou'
			}else if(value == '史诗'){
				text = 'shishi';
			}else if(value == '传说'){
				text = 'chuanshuo';
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
			text = value;
			switch(Number(value)){
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
				case 8:
				text = '出兵速度';
				break;
				case 9:
				text = '持续时间';
				break;
				case 10:
				text = '生效时间';
				break;
				case 11:
				text = '生产速度';
				break;
				case 13:
				text = '提速';
				break;
						
			}
			return text;
		},

		getTable2Value:function(value){
			text = '';
			switch(Number(value)){
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
				case 54:
				text = '建筑';
				break;	
				default:				
				return value;
				
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
							if(weaponid == that.data[i].data[j].id){
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
			tindex = Number(that.getsession("wbgl-huangshizhanzhanzheng-weapon-tindex"));
			$weapon_head = $("#weapon_head"),
			$weapon_content = $("#weapon_content"),

			/*兵种列表点击事件*/
			$weapon_head.on("click", ".item", function(){
				tindex = $weapon_head.children().index(this);
				that.setsession("wbgl-huangshizhanzhanzheng-weapon-tindex",tindex);
				$weapon_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$weapon_content.children().eq(tindex).addClass("on").siblings().removeClass("on");
			}).children().eq(tindex).trigger("click");

			/*单个兵种点击事件*/
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
			var that = this;
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
						$("#weaponlist").addClass("mt_0");
					}
				break;
				case "detail":					
					if(this.o.platform == "web"){
							removehide();						
							$("#header").children(".back").attr("href","data-haungshizhanzheng-weapon.html");					
						}else if(this.o.platform == "android"){
							removehide();					
							$("#header").children(".back").attr("href","index.html");						
						}
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
					this.isplatform("detail");
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

/*
	deion[0] 描述
	deion[4] 卡牌经验描述
	deion[5] 卡牌组合描述 【图片】 group[0]
	deion[6] 卡牌克制描述 【图片】 group[1]
	deion[7] 推荐卡组描述 【图片】 group[2]
*/
