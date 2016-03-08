/*
	武器图标规则
	按照320px宽度计算，左右间距为40px，中间宽度240px，平分为13格
*/
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
			plugin:"plugin_1217",
			weaponName:["长枪","铳枪","片手剑","大剑","太刀","大锤","双刀","弩炮","弓","狩猎笛"],
			weaponNameEng:["changqiang","chongqiang","pianshoujian","dajian","taidao","dachui","shuangdao","nupao","gong","shouliedi"],
			weaponIcon:["weapons_changq.png","weapons_chq.png","weapons_chq.png","weapons_psj.png","weapons_dj.png","weapons_td.png","weapons_dc.png","weapons_sd.png","weapons_np.png","weapons_g.png","weapons_sld.png"]
		};		
		if(this.o.platform == "android"){
			this.o.url="../images/guaiwulieren/";
		}
		this.init();		
	};
	
	Guaiwulieren.prototype = {

		printdialogcard:function(id){//打印武器属性dialog
			var that = this,			
			data = '',			
			zhanwei = '',
			wushuxing = '',
			part1='',//名字,武器类型和角色等级
			part2='',//属性，斩味，攻击力,会心等级，['水属性攻击力','火属性攻击力','雷属性攻击力','龙属性攻击力','冰属性攻击力']，['毒状态附加','眠状态附加','麻状态附加']，状态速度,满槽弓瓶用量;
			part3='';//装填速度详情【弩炮】，满槽弓瓶用量详情【弓】，旋律效果【狩猎笛】
			$("#dialogcard").removeClass("hide");	
			data = that.getWeaponData(id);		
			part1 = '<h3>'+data[1]+'</h3>'+
					'<div class="table-div">'+                     
				        '<table class="ol-table">'+                            
				            '<tbody>'+
				                '<tr>'+                             
				                    '<td>武器类型：</td>'+
				                    '<td><em>'+data[2]+'</em></td>'+
				                '</tr>'+                           
				                '<tr>'+                                
				                    '<td>角色等级：</td>'+                              
				                    '<td><em>'+data[7]+'</em></td>'+                            
				                '</tr>'+                        
				            '</tbody>'+
				        '</table>'+                    
				    '</div>';			
			var width = [];			
			width[0] = data[17]*100/4000000;
			width[1] = (data[18]-data[17])*100/4000000;
			width[2] = (data[19]-data[18])*100/4000000;
			width[3] = (data[20]-data[19])*100/4000000;
			width[4] = (data[21]-data[20])*100/4000000;
			width[5] = (data[22]-data[21])*100/4000000;
			width[6] = 100-data[16]*100/4000000;

			//弩炮和弓没有斩味属性
			if(that.getsession("wbgl-guaiwulieren-weapon-type") != 7 && that.getsession("wbgl-guaiwulieren-weapon-type") != 8){
				zhanwei = '<tr class="blocktr">'+                                
				                    '<td><em>斩味：</em></td>'+                              
				                    '<td>'+
				                    	'<div class="basepro clearfix">'+
											'<span class="colorbar bar-1" style="width:'+width[0]+'%"></span>'+
											'<span class="colorbar bar-2" style="width:'+width[1]+'%"></span>'+
											'<span class="colorbar bar-3" style="width:'+width[2]+'%"></span>'+
											'<span class="colorbar bar-4" style="width:'+width[3]+'%"></span>'+
											'<span class="colorbar bar-5" style="width:'+width[4]+'%"></span>'+
											'<span class="colorbar bar-6" style="width:'+width[5]+'%"></span>'+
											'<span class="leavebar" style="width:'+width[6]+'%"></span>'+
										'</div>'+
				                    '</td>'+                            
				                '</tr>';
			}
			var wushuxinglist = ['水属性攻击力','火属性攻击力','雷属性攻击力','龙属性攻击力','冰属性攻击力'];
			for(var j = 8;j<13;j++)
			{
				if(parseInt(data[j])!=0)
				{
					wushuxing = '<tr>'+
									'<td><em>'+wushuxinglist[j-8]+'：</em></td>'+
									'<td><em>'+data[j]+'</em></td>'+
									'</tr>';
				}
			}

			if(parseInt(data[13])!=0)
			{
				wushuxing = wushuxing + '<tr>\
							<td><em><font color="#b722ff">毒状态附加：</font></em></td>\
							<td><em><font color="#b722ff">'+data[13]+'</font></em></td>\
							</tr>';
			}
			if(parseInt(data[14])!=0)
			{
				wushuxing = wushuxing + '<tr>\
							<td><em><font color="#179dce">眠状态附加：</font></em></td>\
							<td><em><font color="#179dce">'+data[14]+'</font></em></td>\
							</tr>';
			}
			if(parseInt(data[15])!=0)
			{
				wushuxing = wushuxing + '<tr>\
							<td><em><font color="#ffdc19">麻状态附加：</font></em></td>\
							<td><em><font color="#ffdc19">'+data[15]+'</font></em></td>\
							</tr>';
			}

			part2 = '<div class="table-div">'+                     
				        '<table class="ol-table">'+                            
				            '<tbody>'+
				                '<tr>'+                             
				                    '<td>属性</td>'+				                    
				                '</tr>'+zhanwei+       
				                '<tr>'+                                
				                    '<td><em>攻击力：</em></td>'+                              
				                    '<td><em>'+data[5]+'</em></td>'+                            
				                '</tr>'+ 
				                '<tr>'+                                
				                    '<td><em>会心等级：</em></td>'+                              
				                    '<td><em>'+data[6]+'</em></td>'+                            
				                '</tr>'+ wushuxing;                      
				            

			if(that.getsession("wbgl-guaiwulieren-weapon-type") == 7){
				part2 = part2 + '<tr>\
							<td><em>装填速度：</em></td>\
							<td><em>'+data[27]+'</em></td>\
						</tr>';
				part3 = '</div><div class="table-div more-table">\
							<table class="ol-table">\
								<tbody>\
								<tr>\
									<th width="25%">[基本弹药]</th>\
									<th align="center"  width="25%">[装填数]</th>\
									<th align="center"  width="25%">[后坐力]</th>\
									<th  width="25%"></th>\
								</tr>';
		
				for(var k = 0;k<40;k=k+4)
				{
					if(data[30+k]!=''&&data[32+k]=='')
					{
						part3 += '<tr><td><em>'+data[30+k]+'</em></td><td align="center"><em>'+data[31+k]+'</em></td><td align="center"><em>'+data[33+k]+'</em></td><td></td></tr>';
					}
				}
				var thstr = '';
				for(var k = 0;k<40;k=k+4)
				{
					if(data[32+k]!='')
					{
						if(data[32+k]=='蓄力')
						{
							if(thstr=='')
							{
								thstr = '<tr>\
									<td>[蓄能弹药]</td>\
									<td align="center">[装填数]</td>\
									<td align="center">[后坐力]</td>\
									<td></td>\
								</tr>';
							}
							thstr = thstr + '<tr><td><em>'+data[30+k]+'</em></td><td align="center"><em>'+data[31+k]+'</em></td><td align="center"><em>'+data[33+k]+'</em></td><td></td></tr>';
						}
						else{
							if(thstr=='')
							{
								thstr = '<tr>\
									<td>[速射弹药]</td>\
									<td align="center">[装填数]</td>\
									<td align="center">[后坐力]</td>\
									<td align="center">[连发数]</td>\
								</tr>';
							}
							thstr = thstr + '<tr><td><em>'+data[30+k]+'</em></td><td align="center"><em>'+data[31+k]+'</em></td><td align="center"><em>'+data[33+k]+'</em></td><td align="center"><em>'+parseInt(data[32+k].substr(2))+'</em></td></tr>';
						}
					}
				}
				if(thstr!='')
				{
					thstr = thstr + '</tbody></table>';
				}
				part3 = part3 + thstr+ '</tbody></table></div>';		

			}else if(that.getsession("wbgl-guaiwulieren-weapon-type") == 8){

				part2 = part2 + '<tr>\
						<td><em>满槽弓瓶用量：</em></td>\
						<td><em>'+data[74]+'</em></td>\
					</tr>';
				var name = ['','贯通lv1','贯通lv2','贯通lv3','贯通lv4','连射lv1','连射lv2','连射lv3','连射lv4','扩散lv1','扩散lv2','扩散lv3','扩散lv4'];
				part3 = part3 + '<div class="table-div more-table">\
							<table class="ol-table">\
								<tbody>\
								<!--tr>\
									<th>[蓄力等级]</th>\
									<th>[攻击类型]</th>\
									<th>[满槽次数]</th>\
								</tr>\
								<tr>\
									<td><em>Lv1</em></td>\
									<td><em>扩散Lv1</em></td>\
									<td><em>9</em></td>\
								</tr>\
								<tr>\
									<td><em>Lv2</em></td>\
									<td><em>扩散Lv2</em></td>\
									<td><em>9</em></td>\
								</tr>\
								<tr>\
									<td><em>Lv2</em></td>\
									<td><em>扩散Lv2</em></td>\
									<td><em>9</em></td>\
								</tr-->\
								<tr>\
									<th>[蓄力等级]</th>\
									<th>[攻击类型]</th>\
								</tr>\
								<tr>\
									<td><em>Lv1</em></td><td><em>'+name[data[70]]+'</em>\
									</td>\
								</tr>\
								<tr>\
									<td><em>Lv2</em></td><td><em>'+name[data[71]]+'</em>\
									</td>\
								</tr>\
								<tr>\
									<td><em>Lv3</em></td><td><em>'+name[data[72]]+'</em>\
									</td>\
								</tr>\
								<tr>\
									<td><em style="color:gray;">Lv4</em></td><td><em style="color:gray;">'+name[data[73]]+'</em>\
									</td>\
								</tr>\
								<tr>\
									<th>[瓶类型]</th>\
									<th>[装填数量]</th>\
								</tr>';
				
				for(var k = 0;k<10;k=k+2)
				{
					if(data[78+k]!='')
						part3 = part3 + '<tr><td><em>'+data[78+k]+'</em></td><td><em>'+data[79+k]+'</em></td></tr>';
					else
					{
						break;
					}
				}
				part3 = part3 + '<tr>\
									<th>[吊射等级]</th>\
									<th>[吊射类型]</th>\
								</tr>\
								<tr>\
									<td><em style="color:gray;">Lv1</em></td>\
									<td><em style="color:gray;">无</em></td>\
								</tr>\
								<tr>\
									<td><em style="color:gray;">Lv2</em></td>\
									<td><em style="color:gray;">无</em></td>\
								</tr>\
								<tr>\
									<td><em>Lv3</em></td>\
									<td><em>'+data[76]+'</em></td>\
								</tr>\
								<tr>\
									<td><em style="color:gray;">Lv4</em></td>\
									<td><em style="color:gray;">'+data[77]+'</em></td>\
								</tr>\
							</tbody></table>\
						</div>';

				} 
				if(that.getsession("wbgl-guaiwulieren-weapon-type") == 9)//狩猎笛
				{
					yinfu = {1:{"line1":"red","line2":"red","line3":"","line5":"自我强化"},101:{"line1":"green","line2":"green","line3":"","line5":"攻击力强化【小】"},102:{"line1":"green","line2":"green","line3":"","line5":"会心率up&体力回复【小】"},103:{"line1":"green","line2":"green","line3":"","line5":"攻击力强化【大】"},104:{"line1":"green","line2":"green","line3":"","line5":"防御力强化【小】"},105:{"line1":"green","line2":"green","line3":"","line5":"防御力强化【大】"},106:{"line1":"green","line2":"green","line3":"","line5":"属性攻击强化"},107:{"line1":"green","line2":"green","line3":"","line5":"状态异常攻击强化"},108:{"line1":"green","line2":"green","line3":"","line5":"冰属性、水属性防御强化【小】"},109:{"line1":"green","line2":"green","line3":"","line5":"冰属性、水属性防御强化【大】"},110:{"line1":"green","line2":"green","line3":"","line5":"火属性、雷属性防御强化【小】"},111:{"line1":"green","line2":"green","line3":"","line5":"火属性、雷属性防御强化【大】"},112:{"line1":"green","line2":"green","line3":"","line5":"龙属性防御强化【小】"},113:{"line1":"green","line2":"green","line3":"","line5":"龙属性防御强化【大】"},114:{"line1":"green","line2":"green","line3":"","line5":"全属性耐性强化"},115:{"line1":"green","line2":"green","line3":"","line5":"体力回复【小】"},116:{"line1":"green","line2":"green","line3":"","line5":"体力回复【大】"},117:{"line1":"green","line2":"green","line3":"","line5":"体力回复【中】&解毒"},118:{"line1":"green","line2":"green","line3":"","line5":"体力回复【中】&消臭"},119:{"line1":"green","line2":"green","line3":"","line5":"回复速度【小】"},120:{"line1":"green","line2":"green","line3":"","line5":"回复速度【大】"},121:{"line1":"green","line2":"green","line3":"","line5":"耐力减少无效【小】"},122:{"line1":"green","line2":"green","line3":"","line5":"耐力减少无效【大】"},123:{"line1":"green","line2":"green","line3":"","line5":"千里眼&寒气无效"},124:{"line1":"green","line2":"green","line3":"","line5":"千里眼&暑气无效"},125:{"line1":"green","line2":"green","line3":"","line5":"泥＆雪无效"},126:{"line1":"green","line2":"green","line3":"","line5":"耐震&麻痹无效"},127:{"line1":"green","line2":"green","line3":"","line5":"风压无效"},128:{"line1":"green","line2":"green","line3":"","line5":"风压完全无效"},129:{"line1":"green","line2":"green","line3":"","line5":"听觉保护【小】"},130:{"line1":"green","line2":"green","line3":"","line5":"听觉保护【大】"},131:{"line1":"green","line2":"green","line3":"","line5":"全状态异常无效"},201:{"line1":"blue","line2":"blue","line3":"","line5":"攻击力强化【小】"},202:{"line1":"blue","line2":"blue","line3":"","line5":"会心率up&体力回复【小】"},203:{"line1":"blue","line2":"blue","line3":"","line5":"攻击力强化【大】"},204:{"line1":"blue","line2":"blue","line3":"","line5":"防御力强化【小】"},205:{"line1":"blue","line2":"blue","line3":"","line5":"防御力强化【大】"},206:{"line1":"blue","line2":"blue","line3":"","line5":"属性攻击强化"},207:{"line1":"blue","line2":"blue","line3":"","line5":"状态异常攻击强化"},208:{"line1":"blue","line2":"blue","line3":"","line5":"冰属性、水属性防御强化【小】"},209:{"line1":"blue","line2":"blue","line3":"","line5":"冰属性、水属性防御强化【大】"},210:{"line1":"blue","line2":"blue","line3":"","line5":"火属性、雷属性防御强化【小】"},211:{"line1":"blue","line2":"blue","line3":"","line5":"火属性、雷属性防御强化【大】"},212:{"line1":"blue","line2":"blue","line3":"","line5":"龙属性防御强化【小】"},213:{"line1":"blue","line2":"blue","line3":"","line5":"龙属性防御强化【大】"},214:{"line1":"blue","line2":"blue","line3":"","line5":"全属性耐性强化"},215:{"line1":"blue","line2":"blue","line3":"","line5":"体力回复【小】"},216:{"line1":"blue","line2":"blue","line3":"","line5":"体力回复【大】"},217:{"line1":"blue","line2":"blue","line3":"","line5":"体力回复【中】&解毒"},218:{"line1":"blue","line2":"blue","line3":"","line5":"体力回复【中】&消臭"},219:{"line1":"blue","line2":"blue","line3":"","line5":"回复速度【小】"},220:{"line1":"blue","line2":"blue","line3":"","line5":"回复速度【大】"},221:{"line1":"blue","line2":"blue","line3":"","line5":"耐力减少无效【小】"},222:{"line1":"blue","line2":"blue","line3":"","line5":"耐力减少无效【大】"},223:{"line1":"blue","line2":"blue","line3":"","line5":"千里眼&寒气无效"},224:{"line1":"blue","line2":"blue","line3":"","line5":"千里眼&暑气无效"},225:{"line1":"blue","line2":"blue","line3":"","line5":"泥＆雪无效"},226:{"line1":"blue","line2":"blue","line3":"","line5":"耐震&麻痹无效"},227:{"line1":"blue","line2":"blue","line3":"","line5":"风压无效"},228:{"line1":"blue","line2":"blue","line3":"","line5":"风压完全无效"},229:{"line1":"blue","line2":"blue","line3":"","line5":"听觉保护【小】"},230:{"line1":"blue","line2":"blue","line3":"","line5":"听觉保护【大】"},231:{"line1":"blue","line2":"blue","line3":"","line5":"全状态异常无效"},301:{"line1":"red","line2":"green","line3":"red","line5":"攻击力强化【小】"},302:{"line1":"red","line2":"green","line3":"red","line5":"会心率up&体力回复【小】"},303:{"line1":"red","line2":"green","line3":"red","line5":"攻击力强化【大】"},304:{"line1":"red","line2":"green","line3":"red","line5":"防御力强化【小】"},305:{"line1":"red","line2":"green","line3":"red","line5":"防御力强化【大】"},306:{"line1":"red","line2":"green","line3":"red","line5":"属性攻击强化"},307:{"line1":"red","line2":"green","line3":"red","line5":"状态异常攻击强化"},308:{"line1":"red","line2":"green","line3":"red","line5":"冰属性、水属性防御强化【小】"},309:{"line1":"red","line2":"green","line3":"red","line5":"冰属性、水属性防御强化【大】"},310:{"line1":"red","line2":"green","line3":"red","line5":"火属性、雷属性防御强化【小】"},311:{"line1":"red","line2":"green","line3":"red","line5":"火属性、雷属性防御强化【大】"},312:{"line1":"red","line2":"green","line3":"red","line5":"龙属性防御强化【小】"},313:{"line1":"red","line2":"green","line3":"red","line5":"龙属性防御强化【大】"},314:{"line1":"red","line2":"green","line3":"red","line5":"全属性耐性强化"},315:{"line1":"red","line2":"green","line3":"red","line5":"体力回复【小】"},316:{"line1":"red","line2":"green","line3":"red","line5":"体力回复【大】"},317:{"line1":"red","line2":"green","line3":"red","line5":"体力回复【中】&解毒"},318:{"line1":"red","line2":"green","line3":"red","line5":"体力回复【中】&消臭"},319:{"line1":"red","line2":"green","line3":"red","line5":"回复速度【小】"},320:{"line1":"red","line2":"green","line3":"red","line5":"回复速度【大】"},321:{"line1":"red","line2":"green","line3":"red","line5":"耐力减少无效【小】"},322:{"line1":"red","line2":"green","line3":"red","line5":"耐力减少无效【大】"},323:{"line1":"red","line2":"green","line3":"red","line5":"千里眼&寒气无效"},324:{"line1":"red","line2":"green","line3":"red","line5":"千里眼&暑气无效"},325:{"line1":"red","line2":"green","line3":"red","line5":"泥＆雪无效"},326:{"line1":"red","line2":"green","line3":"red","line5":"耐震&麻痹无效"},327:{"line1":"red","line2":"green","line3":"red","line5":"风压无效"},328:{"line1":"red","line2":"green","line3":"red","line5":"风压完全无效"},329:{"line1":"red","line2":"green","line3":"red","line5":"听觉保护【小】"},330:{"line1":"red","line2":"green","line3":"red","line5":"听觉保护【大】"},331:{"line1":"red","line2":"green","line3":"red","line5":"全状态异常无效"},401:{"line1":"red","line2":"blue","line3":"red","line5":"攻击力强化【小】"},402:{"line1":"red","line2":"blue","line3":"red","line5":"会心率up&体力回复【小】"},403:{"line1":"red","line2":"blue","line3":"red","line5":"攻击力强化【大】"},404:{"line1":"red","line2":"blue","line3":"red","line5":"防御力强化【小】"},405:{"line1":"red","line2":"blue","line3":"red","line5":"防御力强化【大】"},406:{"line1":"red","line2":"blue","line3":"red","line5":"属性攻击强化"},407:{"line1":"red","line2":"blue","line3":"red","line5":"状态异常攻击强化"},408:{"line1":"red","line2":"blue","line3":"red","line5":"冰属性、水属性防御强化【小】"},409:{"line1":"red","line2":"blue","line3":"red","line5":"冰属性、水属性防御强化【大】"},410:{"line1":"red","line2":"blue","line3":"red","line5":"火属性、雷属性防御强化【小】"},411:{"line1":"red","line2":"blue","line3":"red","line5":"火属性、雷属性防御强化【大】"},412:{"line1":"red","line2":"blue","line3":"red","line5":"龙属性防御强化【小】"},413:{"line1":"red","line2":"blue","line3":"red","line5":"龙属性防御强化【大】"},414:{"line1":"red","line2":"blue","line3":"red","line5":"全属性耐性强化"},415:{"line1":"red","line2":"blue","line3":"red","line5":"体力回复【小】"},416:{"line1":"red","line2":"blue","line3":"red","line5":"体力回复【大】"},417:{"line1":"red","line2":"blue","line3":"red","line5":"体力回复【中】&解毒"},418:{"line1":"red","line2":"blue","line3":"red","line5":"体力回复【中】&消臭"},419:{"line1":"red","line2":"blue","line3":"red","line5":"回复速度【小】"},420:{"line1":"red","line2":"blue","line3":"red","line5":"回复速度【大】"},421:{"line1":"red","line2":"blue","line3":"red","line5":"耐力减少无效【小】"},422:{"line1":"red","line2":"blue","line3":"red","line5":"耐力减少无效【大】"},423:{"line1":"red","line2":"blue","line3":"red","line5":"千里眼&寒气无效"},424:{"line1":"red","line2":"blue","line3":"red","line5":"千里眼&暑气无效"},425:{"line1":"red","line2":"blue","line3":"red","line5":"泥＆雪无效"},426:{"line1":"red","line2":"blue","line3":"red","line5":"耐震&麻痹无效"},427:{"line1":"red","line2":"blue","line3":"red","line5":"风压无效"},428:{"line1":"red","line2":"blue","line3":"red","line5":"风压完全无效"},429:{"line1":"red","line2":"blue","line3":"red","line5":"听觉保护【小】"},430:{"line1":"red","line2":"blue","line3":"red","line5":"听觉保护【大】"},431:{"line1":"red","line2":"blue","line3":"red","line5":"全状态异常无效"},501:{"line1":"green","line2":"red","line3":"green","line5":"攻击力强化【小】"},502:{"line1":"green","line2":"red","line3":"green","line5":"会心率up&体力回复【小】"},503:{"line1":"green","line2":"red","line3":"green","line5":"攻击力强化【大】"},504:{"line1":"green","line2":"red","line3":"green","line5":"防御力强化【小】"},505:{"line1":"green","line2":"red","line3":"green","line5":"防御力强化【大】"},506:{"line1":"green","line2":"red","line3":"green","line5":"属性攻击强化"},507:{"line1":"green","line2":"red","line3":"green","line5":"状态异常攻击强化"},508:{"line1":"green","line2":"red","line3":"green","line5":"冰属性、水属性防御强化【小】"},509:{"line1":"green","line2":"red","line3":"green","line5":"冰属性、水属性防御强化【大】"},510:{"line1":"green","line2":"red","line3":"green","line5":"火属性、雷属性防御强化【小】"},511:{"line1":"green","line2":"red","line3":"green","line5":"火属性、雷属性防御强化【大】"},512:{"line1":"green","line2":"red","line3":"green","line5":"龙属性防御强化【小】"},513:{"line1":"green","line2":"red","line3":"green","line5":"龙属性防御强化【大】"},514:{"line1":"green","line2":"red","line3":"green","line5":"全属性耐性强化"},515:{"line1":"green","line2":"red","line3":"green","line5":"体力回复【小】"},516:{"line1":"green","line2":"red","line3":"green","line5":"体力回复【大】"},517:{"line1":"green","line2":"red","line3":"green","line5":"体力回复【中】&解毒"},518:{"line1":"green","line2":"red","line3":"green","line5":"体力回复【中】&消臭"},519:{"line1":"green","line2":"red","line3":"green","line5":"回复速度【小】"},520:{"line1":"green","line2":"red","line3":"green","line5":"回复速度【大】"},521:{"line1":"green","line2":"red","line3":"green","line5":"耐力减少无效【小】"},522:{"line1":"green","line2":"red","line3":"green","line5":"耐力减少无效【大】"},523:{"line1":"green","line2":"red","line3":"green","line5":"千里眼&寒气无效"},524:{"line1":"green","line2":"red","line3":"green","line5":"千里眼&暑气无效"},525:{"line1":"green","line2":"red","line3":"green","line5":"泥＆雪无效"},526:{"line1":"green","line2":"red","line3":"green","line5":"耐震&麻痹无效"},527:{"line1":"green","line2":"red","line3":"green","line5":"风压无效"},528:{"line1":"green","line2":"red","line3":"green","line5":"风压完全无效"},529:{"line1":"green","line2":"red","line3":"green","line5":"听觉保护【小】"},530:{"line1":"green","line2":"red","line3":"green","line5":"听觉保护【大】"},531:{"line1":"green","line2":"red","line3":"green","line5":"全状态异常无效"},601:{"line1":"blue","line2":"red","line3":"blue","line5":"攻击力强化【小】"},602:{"line1":"blue","line2":"red","line3":"blue","line5":"会心率up&体力回复【小】"},603:{"line1":"blue","line2":"red","line3":"blue","line5":"攻击力强化【大】"},604:{"line1":"blue","line2":"red","line3":"blue","line5":"防御力强化【小】"},605:{"line1":"blue","line2":"red","line3":"blue","line5":"防御力强化【大】"},606:{"line1":"blue","line2":"red","line3":"blue","line5":"属性攻击强化"},607:{"line1":"blue","line2":"red","line3":"blue","line5":"状态异常攻击强化"},608:{"line1":"blue","line2":"red","line3":"blue","line5":"冰属性、水属性防御强化【小】"},609:{"line1":"blue","line2":"red","line3":"blue","line5":"冰属性、水属性防御强化【大】"},610:{"line1":"blue","line2":"red","line3":"blue","line5":"火属性、雷属性防御强化【小】"},611:{"line1":"blue","line2":"red","line3":"blue","line5":"火属性、雷属性防御强化【大】"},612:{"line1":"blue","line2":"red","line3":"blue","line5":"龙属性防御强化【小】"},613:{"line1":"blue","line2":"red","line3":"blue","line5":"龙属性防御强化【大】"},614:{"line1":"blue","line2":"red","line3":"blue","line5":"全属性耐性强化"},615:{"line1":"blue","line2":"red","line3":"blue","line5":"体力回复【小】"},616:{"line1":"blue","line2":"red","line3":"blue","line5":"体力回复【大】"},617:{"line1":"blue","line2":"red","line3":"blue","line5":"体力回复【中】&解毒"},618:{"line1":"blue","line2":"red","line3":"blue","line5":"体力回复【中】&消臭"},619:{"line1":"blue","line2":"red","line3":"blue","line5":"回复速度【小】"},620:{"line1":"blue","line2":"red","line3":"blue","line5":"回复速度【大】"},621:{"line1":"blue","line2":"red","line3":"blue","line5":"耐力减少无效【小】"},622:{"line1":"blue","line2":"red","line3":"blue","line5":"耐力减少无效【大】"},623:{"line1":"blue","line2":"red","line3":"blue","line5":"千里眼&寒气无效"},624:{"line1":"blue","line2":"red","line3":"blue","line5":"千里眼&暑气无效"},625:{"line1":"blue","line2":"red","line3":"blue","line5":"泥＆雪无效"},626:{"line1":"blue","line2":"red","line3":"blue","line5":"耐震&麻痹无效"},627:{"line1":"blue","line2":"red","line3":"blue","line5":"风压无效"},628:{"line1":"blue","line2":"red","line3":"blue","line5":"风压完全无效"},629:{"line1":"blue","line2":"red","line3":"blue","line5":"听觉保护【小】"},630:{"line1":"blue","line2":"red","line3":"blue","line5":"听觉保护【大】"},631:{"line1":"blue","line2":"red","line3":"blue","line5":"全状态异常无效"},703:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"攻击力强化【大】"},706:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"属性攻击强化"},707:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"状态异常攻击强化"},714:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"全属性耐性强化"},716:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"体力回复【大】"},730:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"听觉保护【大】"},731:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"全状态异常无效"},741:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"高周波"},742:{"line1":"yellow","line2":"yellow","line3":"yellow","line5":"全旋律效果延长"},803:{"line1":"purple","line2":"purple","line3":"purple","line5":"攻击力强化【大】"},806:{"line1":"purple","line2":"purple","line3":"purple","line5":"属性攻击强化"},807:{"line1":"purple","line2":"purple","line3":"purple","line5":"状态异常攻击强化"},814:{"line1":"purple","line2":"purple","line3":"purple","line5":"全属性耐性强化"},816:{"line1":"purple","line2":"purple","line3":"purple","line5":"体力回复【大】"},830:{"line1":"purple","line2":"purple","line3":"purple","line5":"听觉保护【大】"},831:{"line1":"purple","line2":"purple","line3":"purple","line5":"全状态异常无效"},841:{"line1":"purple","line2":"purple","line3":"purple","line5":"硬直无效"},842:{"line1":"purple","line2":"purple","line3":"purple","line5":"全旋律效果延长"}};
				
					part3 = part3 + '<div class="table-div ol-music">\
													<table class="ol-table">\
														<p class="tit-p">旋律效果</p>';
					for(var k = 0 ;k<5;k++)
					{
						if(data[143+k]!='')
						{
							var obj = yinfu[data[143+k]];
							part3 = part3 + '<tr>\
											<td width="8%"><img src="images/guaiwulieren/icon/'+obj.line1+'.png"></td>\
											<td width="8%"><img src="images/guaiwulieren/icon/'+obj.line2+'.png"></td>\
											<td width="8%">'+(obj.line3!=""?('<img src="images/guaiwulieren/icon/'+obj.line3+'.png">'):"")+'</td>\
											<td width="76%">'+obj.line5+'</td>\
										</tr>';
						}
					}
					part3 = part3 + '</table></div>';
				}
				if(that.getsession("wbgl-guaiwulieren-weapon-type")==1)//铳枪炮击属性
				{
					var paojitype = ['通常型','通常型','放射型','扩散型'];
					part3 = part3 + '<div class="table-div"><table class="ol-table"><tbody><tr><td>炮击属性</td></tr><tr><td><em>炮击类型：</em></td><td><em>'+paojitype[data[137]]+'</em></td></tr><tr><td><em>炮击等级：</em></td><td><em>Lv'+data[138]+'</em></td></tr></tbody></table></div>';
				}


				if(data[90]!='')//锻造材料
				{
					$('#'+data[0]+'_w').prepend('<span class="date-icon"></span>');
					part3 = part3 + '<div class="table-div">\
								<table class="ol-table">\
									<tr>\
										<td>[锻造材料]</td>\
									</tr>';
					for(var j = 0;j<16;j=j+3)
					{
						if(data[94+j]!='')
						{
							part3 = part3 + '<tr>\
										<td><em>'+data[94+j]+'×'+data[95+j]+'<em></td>\
									</tr>';
						}
						else
						{
							break;
						}
					}
					part3 = part3 + '</table></div>';
				}
				if(data[113]!='')//派生材料
				{
					part3 = part3 + '<div class="table-div">\
								<table class="ol-table">\
									<tr>\
										<td>[派生材料]</td>\
									</tr>\
									<tr>';								
					for(var j = 0;j<16;j=j+3)
					{
						if(data[116+j]!='')
						{
							part3 = part3 + '<tr>\
										<td><em>'+data[117+j]+'×'+data[116+j]+'</em></td>\
									</tr>';
							k = 2;
						}
						else
						{
							break;
						}
					}
					part3 = part3 + '</table></div></div>';
				}

				part2 += '</tbody></table></div>';
	       		$("#hover").html(part1 + part2 + part3);
		},

		getWeaponData:function(weapon_id){//获取单个weapon数据
			var that = this,
			weapon_data='';			
			for(var i=0;i<that.data_weapon.length;i++){
				var temp = that.data_weapon[i].result;
				for(var j=0;j<temp.length;j++)
				if(weapon_id == temp[j].iID){										
					return temp[j].data;
				}			
			}	
			return '';				
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
				level='',		
				wangzhe_bg='',	
				other_bg='',
				$titlename = $("#titlename"),
				$weapon_head = $("#weapon_head"),
				$land = $("#land");				
			for(var i=0;i<this.data_layout[index].data.length;i++){				
				weapon_title_data = this.data_layout[index].data[i];				
				html_title +='<div class="item">'+weapon_title_data.gname+'</div>';	
				// if(i==3){//移动の城寨
					for(var j=0;j<weapon_title_data.gdate.length;j++){				
							weapom_content_data = weapon_title_data.gdate[j];								
							if(weapom_content_data != ''){
								single_weapon_data = that.getWeaponData(weapom_content_data.id);
								if(single_weapon_data[90] != ''){
									html_small_icon = '<i class="icon_chuizi"></i>';
								}	
								if(single_weapon_data[4] != ''){									
									weapon_icon = '<img class="weapon_icon" src="images/guaiwulieren/icon/'+single_weapon_data[4]+'.png">';
								}
							}							
							html_content +='<div data-id="'+weapom_content_data.id+'" class="oldiv '+that.getTypeNameEng()+' line-'+weapom_content_data.line+' top'+weapom_content_data.row+'">'+html_small_icon+weapon_icon+'</div>';
							html_small_icon = '';
						}
						other_bg = that.getTypeNameEng()+i;						
						if(weapon_title_data.gname == "王者"){
							wangzhe_bg = ' wangzhe ';
							other_bg='';
						}
						if(weapon_title_data.gname == "其他"){							
							other_bg='';//暂时先没有背景
							wangzhe_bg='';
						}
						
						tmep_c1 += '<div class="'+that.getTypeNameEng()+' '+wangzhe_bg+other_bg+' pole">'+html_content+'</div>';						
						html_content='';
				// }
			}					
			$titlename.html(that.getTypeName());
			$weapon_head.html(html_title);
			$land.html(tmep_c1);		
			
		},

		printindex:function(){//打印Index,武器类型
			var that = this;
			var type_html='',
				weaponType='';
			for(var i=0;i<that.o.weaponName.length;i++){				
				type_html += '<li weaponType="'+i+'"><img src="'+that.o.url+'weapontype/'+that.o.weaponIcon[i]+'"><p>'+that.o.weaponName[i]+'</p></li>';
			}			
			$("#weapon_content").html('<ul>'+type_html+'</ul>');
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
				case "find-data":
				case "find-dapeiqi":
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

		getTypeName:function(){
			var type = this.getsession("wbgl-guaiwulieren-weapon-type");	
					for(var i=0;i<this.o.weaponName.length;i++){
						if( i== type){
							return this.o.weaponName[i];							
						}
					}	
		},

		getTypeNameEng:function(){
			var type = this.getsession("wbgl-guaiwulieren-weapon-type");	
					for(var i=0;i<this.o.weaponName.length;i++){
						if( i== type){
							return this.o.weaponNameEng[i];							
						}
					}	
		},

		ispage: function(){//判断当前打开的是哪一个页面
			if(!this.checkversion()) return;

			var href = $("body").attr("data-url");			
			switch(true){
				case (href == "index.html"):
					this.setsession("wbgl-guaiwulieren-weapon-title-tindex",0);//重置已选中的titleIndex
					this.isplatform("index");
					this.printindex();
					break;
				case (href == "index-detail.html"):
					this.isplatform("index-detail");
					this.printDetail();
					break;
				case (href == "find-data.html"):
					this.isplatform("find-data");
					break;
				case (href =="find-dapeiqi.html"):
					this.isplatform("find-dapeiqi");
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

		events: function(){//点击事件
			var that = this,
			$weapon_head = $("#weapon_head"),
			$land = $("#land"),
			tindex=0;
			
			//旋转屏幕重新设置
			$(window).resize(function(e){
                that.pageReset();
            });

            $("#weapon_content").on("click", "li", function(){//第一个页面类型点击事件				
				weaponType = Number($(this).attr("weaponType"));
				that.setsession("wbgl-guaiwulieren-weapon-type",weaponType);
				if(that.o.platform == "ios"){
					location.href = that.o.plugin+'/data-guaiwulieren-weapon-detail.html';
				}else{
					location.href = 'data-guaiwulieren-weapon-detail.html';
				}
			});
            //选中索引
            tindex = that.getsession("wbgl-guaiwulieren-weapon-title-tindex");            
			$weapon_head.on("click", ".item", function(){//第二个页面头部列表点击事件				
				tindex = $weapon_head.children().index(this);
				that.setsession("wbgl-guaiwulieren-weapon-title-tindex",tindex);
				$weapon_head.children().eq(tindex).addClass("on").siblings().removeClass("on");
				$land.children().eq(tindex).addClass("on").siblings().removeClass("on");				
			}).children().eq(tindex).trigger("click");

			$land.on("click", ".oldiv", function(){//第二个页面内容点击事件
				var _id = Number($(this).attr("data-id"));
				that.setsession("wbgl-guaiwulieren-weapon-id",_id);				
				// if(that.o.platform == "ios"){
				// 	location.href = that.o.plugin+'/data-quanminchaoshen-hero-detail.html';
				// }else{
				// 	location.href = 'data-quanminchaoshen-hero-detail.html';
				// }
				// $("body").css("overflow-y","hidden");
				that.printdialogcard(_id);
			});

			//关闭单张卡片弹窗
			$("#dialogcard").click(function(){
				$("body").css("overflow-y","auto");
				that.o.isData_type = true;
				$(this).addClass("hide");
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

