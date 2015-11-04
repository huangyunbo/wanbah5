
var tvp=window.tvp||{};var TenVideoPlayer=window.tvp;tvp.lastModify="2014-01-24 13:44:57";tvp.ver="$V1.0Build1025$";tvp.path={base:"http://qzs.qq.com/tencentvideo_v1/js/tvp/",hls_video_cgi:"http://vv.video.qq.com/gethls?otype=json&format=2",html5_video_cgi:"http://vv.video.qq.com/geturl?otype=json"}
tvp.log=function(msg){if(window.console){window.console.log("["+(tvp.log.debugid++)+"] "+msg);}}
tvp.debug=function(msg){if(tvp.log.isDebug===-1){tvp.log.isDebug=tvp.$.getUrlParam("debug")=="true"?1:0;}
if(!!tvp.log.isDebug){tvp.log(msg);}}
tvp.log.isDebug=-1;tvp.log.debugid=1;tvp.$=function(selector){return new tvp.$.fn.init(selector);};tvp.$.fn=tvp.$.prototype={elements:[],init:function(selector){if(!selector){return this;}
if(selector.nodeType){this.elements[0]=selector;return this;}
if(tvp.$.isString(selector)&&selector.length>0){if(tvp.$.isFunction(document.querySelectorAll)){this.elements=document.querySelectorAll(selector);return this;}
if(selector.charAt(0)=='#'){this.elements[0]=document.getElementById(selector.replace("#",""));return this;}
if(/[a-z]+/ig.test(selector)){this.elements=document.getElementsByTagName(selector);return this;}
tvp.$.error("暂不支持复杂查询");}
this.element=null;return this;},selector:null,_tvp$:true,ver:"1.0"}
tvp.$.fn.init.prototype=tvp.$.fn;tvp.$.extend=tvp.$.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!=="object"&&!tvp.$.isFunction(target)){target={};}
if(length===i){target=this;--i;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue;}
if(deep&&copy&&(tvp.$.isPlainObject(copy)||(copyIsArray=tvp.$.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&tvp.$.isArray(src)?src:[];}
else{clone=src&&tvp.$.isPlainObject(src)?src:{};}
target[name]=tvp.$.extend(deep,clone,copy);}
else if(copy!==undefined){target[name]=copy;}}}}
return target;};tvp.$.extend({get:function(id){return document.getElementById(id);},error:function(msg){throw new Error(msg);},getType:function(obj){return obj===null?'null':(obj===undefined?'undefined':Object.prototype.toString.call(obj).slice(8,-1).toLowerCase());},isString:function(o){return tvp.$.getType(o)=="string";},isArray:function(o){return tvp.$.getType(o)=="array";},isFunction:function(o){return tvp.$.getType(o)=="function";},isUndefined:function(o){return tvp.$.getType(o)=="undefined";},isNull:function(o){return tvp.$.getType(o)=="null";},isWindow:function(obj){return obj&&typeof obj==="object"&&"setInterval"in obj;},isEmptyObject:function(obj){for(var name in obj){return false;}
return true;},isPlainObject:function(obj){if(!obj||tvp.$.getType(obj)!=="object"||obj.nodeType||tvp.$.isWindow(obj)){return false;}
try{if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;}}
catch(e){return false;}
var key;for(key in obj){}
return key===undefined||hasOwn.call(obj,key);},inArray:function(elem,array,i){var len;if(array){if(array.indexOf){return Array.prototype.indexOf.call(array,elem,i);}
len=array.length;i=i?i<0?Math.max(0,len+i):i:0;for(;i<len;i++){if(i in array&&array[i]===elem){return i;}}}
return-1;},bind:function(obj,fn){var args=Array.prototype.slice.call(arguments,2);return function(){var _obj=obj||this,_args=args.concat(Array.prototype.slice.call(arguments,0));if(typeof(fn)=="string"){if(_obj[fn]){return _obj[fn].apply(_obj,_args);}}
else{return fn.apply(_obj,_args);}}},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||tvp.$.isFunction(object);if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break;}}}
else{for(;i<length;){if(callback.apply(object[i++],args)===false){break;}}}}
else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break;}}}
else{for(;i<length;){if(callback.call(object[i],i,object[i++])===false){break;}}}}
return object;},noop:function(){},now:function(){return new Date().getTime();},getISOTimeFormat:function(){var date=new Date();var y=date.getFullYear(),m=date.getMonth()+1,d=date.getDate(),h=date.getHours(),M=date.getMinutes(),s=date.getSeconds();return[[y,m<10?"0"+m:m,d<10?"0"+d:d].join("-"),[h<10?"0"+h:h,M<10?"0"+M:M,s<10?"0"+s:s].join(":")].join(" ");},getHost:function(){var _host=window.location.hostname||window.location.host;var _sarray=location.host.split(".");if(_sarray.length>1){_host=_sarray.slice(_sarray.length-2).join(".");}
return _host;},getUrlParam:function(p,u){u=u||document.location.toString();var reg=new RegExp("(^|&|\\\\?)"+p+"=([^&]*)(&|$|#)");var r;if(r=u.match(reg))
return r[2];return"";},filterXSS:function(str){if(!tvp.$.isString(str))
return str;return str.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;");},escString:function(str){var t={bsls:/\\/g,nl:/\n/g,rt:/\r/g,tab:/\t/g},h={re_amp:/&/g,re_lt:/</g,re_gt:/>/g,re_apos:/\x27/g,re_quot:/\x22/g};var obj={'\\\\':t.bsls,'\\n':t.nl,'':t.rt,'\\t':t.tab,'\\\'':h.re_apos,'\\"':h.re_quot};tvp.$.each(obj,function(k,v){str=str.replace(k,v);});return str;},createGUID:function(len){len=len||32;var guid="";for(var i=1;i<=len;i++){var n=Math.floor(Math.random()*16.0).toString(16);guid+=n;}
return guid;}});tvp.$.fn.extend({each:function(callback,args){return tvp.$.each(this.elements,callback,args);},isEmpty:function(){return this.size()==0;},bind:function(evtType,fn){if(!tvp.$.isFunction(fn)){return false;}
this.each(function(){tvp.$.event.add(this,evtType,fn);});return this;},unbind:function(evtType,fn){this.each(function(){tvp.$.event[fn?'removeEvent':'purgeEvent'](this,evtType,fn);});return this;},size:function(){return this.elements.length;},html:function(str){if(!tvp.$.isUndefined(str)){this.attr("innerHTML",str);return this;}
else{return this.attr("innerHTML");}},attr:function(k,v){if(!tvp.$.isUndefined(v)){this.each(function(){this[k]=v;});return this;}
var el=this.elements[0];return!!el?(el[k]||el.getAttribute(k)):null;},removeAttr:function(k){this.each(function(){this.setAttribute(k,"");if(this.nodeType==1){this.removeAttribute(k);}});return this;}});tvp.$.dom={removeElement:function(el){if(typeof(el)=="string"){el=tvp.$.get(el);}
if(!el){return;}
if(el.removeNode){el.removeNode(true);}
else{if(el.parentNode){el.parentNode.removeChild(el);}}
el=null;return null;}}
tvp.$.browser=tvp.$.userAgent=(function(){var t,vie,vff,vopera,vsf,vawk,vair,vchrome,winver,wintype,mactype,isBeta,isIPad,isIPhone,vAndroid,discerned,is64,_ua=navigator.userAgent,_nv=navigator.appVersion,vffRE=/(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i,vwebkitRE=/AppleWebKit.(\d+\.\d+)/i,vchromeRE=/Chrome.(\d+\.\d+)/i,vsafariRE=/Version.(\d+\.\d+)/i,vwinRE=/Windows.+?(\d+\.\d+)/,vie=vff=vopera=vsf=vawk=vair=vchrome=winver=vAndroid=NaN;wintype=mactype=isBeta=isIPad=discerned=is64=false;if(window.ActiveXObject){vie=6;(window.XMLHttpRequest||(_ua.indexOf('MSIE 7.0')>-1))&&(vie=7);(window.XDomainRequest||(_ua.indexOf('Trident/4.0')>-1))&&(vie=8);(_ua.indexOf('Trident/5.0')>-1)&&(vie=9);(_ua.indexOf('Trident/6.0')>-1)&&(vie=10);}else if(_ua.indexOf('Trident/7.0')>-1){vie=11;}
else if(t=_ua.match(vffRE)){vff=parseFloat((t&&t[1])||"3.3",10);}
else if(!navigator.taintEnabled){t=_ua.match(vwebkitRE);vawk=(t&&t.length>1)?parseFloat(t[1],10):(!!document.evaluate?(!!document.querySelector?525:420):419);if((t=_nv.match(vchromeRE))||window.chrome){if(!t){t=_ua.match(vchromeRE);}
vchrome=parseFloat((t&&t[1])||"2.0",10);}
if((t=_nv.match(vsafariRE))&&!window.chrome){if(!t){t=_ua.match(vsafariRE);}
vsf=parseFloat((t&&t[1])||"3.3",10);}}
else if(window.opera){vopera=parseFloat(_nv,10);}
if(_ua.indexOf("AdobeAIR")>-1){vair=1;}
if(_ua.indexOf("iPad")>-1){isIPad=true;}
if(_ua.indexOf("iPhone")>-1){isIPhone=true;}
if(t=_ua.match(/Android( ((\d\.\d)(\.\d)?))?/i)){vAndroid=parseFloat((t&&t[2])||"2.1",10);}
if(_ua.indexOf("Windows")>-1){wintype=true;t=_ua.match(vwinRE);winver=parseFloat((t&&t[1])||"5.1",10);}
else if(_ua.indexOf("Mac OS X")>-1){mactype=true;}
if(typeof navigator.platform!="undefined"&&navigator.platform.toLowerCase()=="win64"){is64=true;}
return{beta:isBeta,firefox:vff,ie:vie,msie:vie,opera:vopera,air:vair,safari:vsf,safariV:vsf,webkit:vawk,chrome:vchrome,windows:winver||wintype,isiPad:isIPad,isiPhone:isIPhone,macs:mactype,android:vAndroid,is64:is64,isFFCanOcx:function(){if(!!vff&&vff>=3.0){return true;}
return false;},isCanOcx:function(){return(tvp.$.userAgent.windows&&(!!vie||(!!vff&&vff>=3.0)||!!vawk));},isNotIESupport:function(){return(tvp.$.userAgent.windows&&(vawk||tvp.$.userAgent.isFFCanOcx()));}}})();tvp.$.event={KEYS:{BACKSPACE:8,TAB:9,RETURN:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46},extendType:/(click|mousedown|mouseover|mouseout|mouseup|mousemove|scroll|contextmenu|resize)/i,_eventListDictionary:{},_fnSeqUID:0,_objSeqUID:0,add:function(obj,eventType,fn,argArray){var cfn=fn,res=false,l;if(!obj){return res;}
if(!obj.eventsListUID){obj.eventsListUID="e"+(++tvp.$.event._objSeqUID);}
if(!(l=tvp.$.event._eventListDictionary[obj.eventsListUID])){l=tvp.$.event._eventListDictionary[obj.eventsListUID]={};}
if(!fn.__elUID){fn.__elUID="e"+(++tvp.$.event._fnSeqUID)+obj.eventsListUID;}
if(!l[eventType]){l[eventType]={};}
if(typeof(l[eventType][fn.__elUID])=='function'){return false;}
if(tvp.$.event.extendType.test(eventType)){argArray=argArray||[];}
cfn=function(e){return fn.apply(obj,([tvp.$.event.getEvent(e)]).concat(argArray));};if(obj.addEventListener){obj.addEventListener(eventType,cfn,false);res=true;}
else if(obj.attachEvent){res=obj.attachEvent("on"+eventType,cfn);}
else{res=false;}
if(res){l[eventType][fn.__elUID]=cfn;}
return res;},remove:function(obj,eventType,fn){var cfn=fn,res=false,l;if(!obj){return res;}
if(!cfn){return tvp.$.event.purgeEvent(obj,eventType);}
if(!obj.eventsListUID){obj.eventsListUID="e"+(++tvp.$.event._objSeqUID);}
if(!(l=tvp.$.event._eventListDictionary[obj.eventsListUID])){l=tvp.$.event._eventListDictionary[obj.eventsListUID]={};}
if(!fn.__elUID){fn.__elUID="e"+(++tvp.$.event._fnSeqUID)+obj.eventsListUID;}
if(!l[eventType]){l[eventType]={};}
if(tvp.$.event.extendType.test(eventType)&&l[eventType]&&l[eventType][fn.__elUID]){cfn=l[eventType][fn.__elUID];}
if(obj.removeEventListener){obj.removeEventListener(eventType,cfn,false);res=true;}
else if(obj.detachEvent){obj.detachEvent("on"+eventType,cfn);res=true;}
else{return false;}
if(res&&l[eventType]){delete l[eventType][fn.__elUID];}
return res;},purgeEvent:function(obj,type){var l;if(obj.eventsListUID&&(l=tvp.$.event._eventListDictionary[obj.eventsListUID])&&l[type]){for(var k in l[type]){if(obj.removeEventListener){obj.removeEventListener(type,l[type][k],false);}
else if(obj.detachEvent){obj.detachEvent('on'+type,l[type][k]);}}}
if(obj['on'+type]){obj['on'+type]=null;}
if(l){l[type]=null;delete l[type];}
return true;},getEvent:function(evt){var evt=evt||window.event,c,cnt;if(!evt&&!tvp.$.userAgent.ie){c=tvp.$.event.getEvent.caller,cnt=1;while(c){evt=c.arguments[0];if(evt&&Event==evt.constructor){break;}
else if(cnt>32){break;}
c=c.caller;cnt++;}}
return evt;},getButton:function(evt){var e=tvp.$.event.getEvent(evt);if(!e){return-1}
if(tvp.$.userAgent.ie){return e.button-Math.ceil(e.button/2);}
else{return e.button;}},getTarget:function(evt){var e=tvp.$.event.getEvent(evt);if(e){return e.srcElement||e.target;}
else{return null;}},getCurrentTarget:function(evt){var e=tvp.$.event.getEvent(evt);if(e){return e.currentTarget||document.activeElement;}
else{return null;}},cancelBubble:function(evt){evt=tvp.$.event.getEvent(evt);if(!evt){return false}
if(evt.stopPropagation){evt.stopPropagation();}
else{if(!evt.cancelBubble){evt.cancelBubble=true;}}},preventDefault:function(evt){evt=tvp.$.event.getEvent(evt);if(!evt){return false}
if(evt.preventDefault){evt.preventDefault();}
else{evt.returnValue=false;}},mouseX:function(evt){evt=tvp.$.event.getEvent(evt);return evt.pageX||(evt.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));},mouseY:function(evt){evt=tvp.$.event.getEvent(evt);return evt.pageY||(evt.clientY+(document.documentElement.scrollTop||document.body.scrollTop));},getRelatedTarget:function(ev){ev=tvp.$.event.getEvent(ev);var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}
else if(ev.type=="mouseover"){t=ev.fromElement;}
else{}}
return t;}};tvp.$.cookie={set:function(name,value,domain,path,hour){if(hour){var today=new Date();var expire=new Date();expire.setTime(today.getTime()+3600000*hour);}
document.cookie=name+"="+value+"; "+(hour?("expires="+expire.toGMTString()+"; "):"")+(path?("path="+path+"; "):"path=/; ")+(domain?("domain="+domain+";"):("domain="+window.location.host+";"));return true;},get:function(name){var r=new RegExp("(?:^|;+|\\s+)"+name+"=([^;]*)");var m=document.cookie.match(r);return(!m?"":m[1]);},del:function(name,domain,path){var exp=new Date();exp.setTime(exp.getTime()-1);document.cookie=name+"=; expires="+exp.toGMTString()+";"+(path?("path="+path+"; "):"path=/; ")+(domain?("domain="+domain+";"):("domain="+window.location.host+";"));}};tvp.report=(function(){var isFree=true;var reportObj=null;var urlList=[];function errorHandle(){if(urlList.length==0){isFree=true;reportObj=null;return;}
this.src=urlList.splice(0,1);isFree=false;}
function reportUrl(url){if(!url||!/^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i.test(url)){return;}
if(reportObj==null){reportObj=document.createElement("img");reportObj.src=url;reportObj.onerror=errorHandle;isFree=false;return;}
if(isFree){reportObj.src=url;isFree=false;return;}
else{urlList.push(url);}}
return function(param){if(tvp.$.isString(param)){reportUrl(param);return;}
if(tvp.$.getType(param)=="object"){var r=[];for(var i in param){r.push(i+"="+encodeURIComponent(""+param[i]));}
var url="http://rcgi.video.qq.com/web_report?";reportUrl(url+r.join("&"));}}})()
tvp.$.ajax=(function(){var jsonpObj,gcGet,paramToStr,createFunName,callError,callSuccess,callComplete;gcGet=function(callbackName,script){script.parentNode.removeChild(script);window[callbackName]=undefined;try{delete window[callbackName];}
catch(e){}};paramToStr=function(parameters,encodeURI){var str="",key,parameter;for(key in parameters){if(parameters.hasOwnProperty(key)){key=encodeURI?encodeURIComponent(key):key;parameter=encodeURI?encodeURIComponent(parameters[key]):parameters[key];str+=key+"="+parameter+"&";}}
return str.replace(/&$/,"");};createFunName=function(){return"cb_"+tvp.$.createGUID(16);};callError=function(callback,errorMsg){if(typeof(callback)!=='undefined'){callback(errorMsg);}};callSuccess=function(callback,data){if(typeof(callback)!=='undefined'){callback(data);}};callComplete=function(callback){if(typeof(callback)!=='undefined'){callback();}};jsonpObj={};jsonpObj.init=function(options){var key;for(key in options){if(options.hasOwnProperty(key)){jsonpObj.options[key]=options[key];}}
return true;};jsonpObj.get=function(options){options=options||{};var url=options.url,callbackParameter=options.callbackParameter||'callback',parameters=options.data||{},script=document.createElement('script'),callbackName=createFunName(),prefix="?";if(!url){return;}
parameters[callbackParameter]=callbackName;if(url.indexOf("?")>=0){prefix="&";}
url+=prefix+paramToStr(parameters,true);window[callbackName]=function(data){if(typeof(data)==='undefined'){callError(options.error,'Invalid JSON data returned');}
else{callSuccess(options.success,data);}
gcGet(callbackName,script);callComplete(options.complete);};script.setAttribute('src',url);document.getElementsByTagName('head')[0].appendChild(script);tvp.$.event.add(script,'error',function(){gcGet(callbackName,script);callComplete(options.complete);callError(options.error,'Error while trying to access the URL');});};return jsonpObj.get})();tvp=tvp||{};tvp.common={isUseHtml5:function(){var ua=navigator.userAgent,av=tvp.$.userAgent.android,m=null
if(/ipad|ipod|iphone|lepad_hls|IEMobile/ig.test(ua)){return true;}
if(m=ua.match(/MQQBrowser\/(\d+\.\d+)/i)){if(parseFloat(m&&m[1]?m[1]:"3.0",10)>=4.2){return true;}}
if(av>=4){if(ua.indexOf("MI-ONE")!=-1){return true;}
if(m=ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)){if(m[1]>=4.2){return true;}}
return tvp.common.isSupportMP4();}
return false;},isLiveUseHTML5:function(){if(/ipad|ipod|iphone/ig.test(navigator.userAgent)){return true;}
var ua=navigator.userAgent,m=null;if(m=ua.match(/MQQBrowser\/(\d+\.\d+)/i)){if(parseFloat(m&&m[1]?m[1]:"3.0",10)>=4.3){return true;}}
return false;},isSupportMP4:function(){var video=document.createElement("video");if(typeof video.canPlayType=="function"&&video.canPlayType('video/mp4; codecs="avc1.42E01E"')=="probably"){return true;}
return false;},isEnforceMP4:function(){var av=tvp.$.userAgent.android,ua=navigator.userAgent,m=null;if(!!av){if(tvp.$.userAgent.firefox){return true;}
if(av>=4.0&&(m=ua.match(/MQQBrowser\/(\d+\.\d+)/i))){if(parseFloat(m&&m[1]?m[1]:"3.0",10)<4.0){return true;}}}
return false;},getUin:function(isLeak){var skey=tvp.$.cookie.get("skey"),lskey=tvp.$.cookie.get("lskey"),suin="",uin=0,useLeak=false;isLeak=typeof(isLeak)=="undefined"?false:true;useLeak=!!isLeak&&lskey!="";if(!useLeak&&skey==""){return 0;}
suin=tvp.$.cookie.get("uin");if(suin==""){if(!!useLeak){suin=tvp.$.cookie.get("luin");}}
uin=parseInt(suin.replace(/^o0*/g,""),10);if(isNaN(uin)||uin<=10000){return 0;}
return uin;},getSKey:function(isLeak){var skey=tvp.$.cookie.get("skey"),lskey=tvp.$.cookie.get("lskey"),key="";if(!!isLeak){if(skey!=""&&lskey!=""){key=[skey,lskey].join(";");}else{key=skey||lskey;}}else{key=skey;}
return key;},openLogin:function(){},getVideoSnap:function(lpszVID,idx){var szPic;var uin;var hash_bucket=10000*10000;var object=lpszVID;if(lpszVID.indexOf("_")>0){var arr=lpszVID.split("_");lpszVID=arr[0];idx=parseInt(arr[1]);}
var uint_max=0x00ffffffff+1;var hash_bucket=10000*10000;var tot=0;for(var inx=0;inx<lpszVID.length;inx++){var nchar=lpszVID.charCodeAt(inx);tot=(tot*32)+tot+nchar;if(tot>=uint_max)
tot=tot%uint_max;}
uin=tot%hash_bucket;if(idx==undefined)
idx=0;if(idx==0){szPic=["http://vpic.video.qq.com/",uin,"/",lpszVID,"_160_90_3.jpg"].join("");}else{szPic=["http://vpic.video.qq.com/",uin,"/",lpszVID,"_","160_90_",idx,"_1.jpg"].join("");}
return szPic;}};tvp.version=(function(){var vOcx="0.0.0.0",vflash="0.0.0",actObj;function changeVerToString(nVer){if(checkVerFormatValid(nVer)){return nVer;}
if(/\d+/i.test(nVer)){var nMain=parseInt(nVer/10000/100,10);var nSub=parseInt(nVer/10000,10)-nMain*100;var nReleaseNO=parseInt(nVer,10)-(nMain*100*10000+nSub*10000);strVer=nMain+"."+nSub+"."+nReleaseNO;return strVer;}
return nVer;}
function checkVerFormatValid(version){return(/^(\d+\.){2}\d+(\.\d+)?$/.test(version));};return{getOcx:function(enableCache){if(tvp.$.isUndefined(enableCache)){enableCache=true;}
if(!!enableCache&&vOcx!="0.0.0.0"){return vOcx;}
if(!!tvp.$.userAgent.ie){try{actObj=new ActiveXObject(QQLive.config.PROGID_QQLIVE_INSTALLER);if(typeof actObj.getVersion!="undefined"){vOcx=actObj.GetVersionByClsid(QQLiveSetup.config.OCX_CLSID);}}catch(err){}}else if(tvp.$.userAgent.isNotIESupport()){var plugs=navigator.plugins,plug;if(!tvp.$.isUndefined(plugs.namedItem)){plug=plugs.namedItem("腾讯视频");}
if(!plug){for(var i=0,len=plugs.length;i<len;i++){if(plugs[i]&&plugs[i].name=="腾讯视频"||plugs[i].filename=="npQQLive.dll"){plug=plugs[i];break;}}}
if(!!plug){if(!tvp.$.isUndefined(plug.version)){vOcx=plug.version;}else{var r;var desc=plug.description;if(r=desc.match(/version:((\d+\.){3}(\d+)?)/)){vOcx=r[1];}}}}
vOcx=changeVerToString(vOcx);return vOcx;},getFlash:function(){if(vflash!="0.0.0"){return vflash;}
var swf=null,ab=null,ag=[],S="Shockwave Flash",t=navigator,q="application/x-shockwave-flash",R="SWFObjectExprInst"
if(!!tvp.$.userAgent.ie){try{swf=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');if(swf){ab=swf.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(exp){}}else if(!tvp.$.isUndefined(t.plugins)&&tvp.$.getType(t.plugins[S])=="plugin"){ab=t.plugins[S].description;if(ab&&!(!tvp.$.isUndefined(t.mimeTypes)&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0;}}
vflash=ag.join(".");return vflash;},getFlashMain:function(){return parseInt(tvp.version.getFlash().split(".")[0],10);}}})();tvp.emptyFn=function(){};tvp.VideoInfo=function(){var _vid="",_vidlist="",_vidCnt=0,_idx=0,_origvid="",_channelId="",$me=this;var data={prefix:0,tail:0,tagStart:0,tagEnd:0,duration:"",historyStart:0,pay:0,coverId:"",title:"",isLookBack:0,tstart:0,CDNType:0,vFormat:"",LiveReTime:""}
function getFirstVid(vid){if(vid.indexOf("|")<0)
return vid;return vid.substring(0,vid.indexOf("|"));};function getRealVid(vid){if(vid.indexOf("_")<0)
return vid;return vid.split("_")[0];};function getIdx(vid){if(vid.indexOf("_")<0)
return 0;return parseInt(vid.split("_")[1]);};function getRealVidList(vidlist){var arr=[];var origarr=vidlist.split("|");for(var i=0;i<origarr.length;i++){arr.push(getRealVid(origarr[i]));}
return arr.join("|");};for(var k in data){new function(){var p=k.charAt(0).toUpperCase()+k.substr(1),_k=k;$me["set"+p]=function(v){$me.setDataVal(_k,v);}}}
for(var p in data){new function(){var k=p;$me["get"+k.charAt(0).toUpperCase()+k.substr(1)]=function(){return $me.getDataVal(k);}}}
this.getData=function(){return data;}
this.getDataVal=function(v){return data[v];}
this.setDataVal=function(k,v){data[k]=v;}
this.setVid=function(vid){if(!tvp.$.isString(vid)){return;}
_origvid=vid;if(vid.indexOf("|")<0){var id=getRealVid(vid)
_vid=id;_idx=getIdx(vid);_vidlist=id;}
else{var arr=vid.split("|");_vid=getRealVid(arr[0]);_idx=getIdx(arr[0]);_vidlist=getRealVidList(vid);}
_vid=tvp.$.filterXSS(_vid);_vidlist=tvp.$.filterXSS(_vidlist);};this.getVid=function(){return _vid;};this.getVidList=function(){return _vidlist;}
this.getIdx=function(){return _idx;}
this.getTimelong=function(){if(!data.duration){return 0;}
var arrDur=data.duration.split("|");var sec=0;for(var i=0,len=arrDur.length;i<len;i++){sec+=parseInt(arrDur[i]);}
return sec;}
this.getEndOffset=function(){return this.getTimelong()-this.getTail();}
this.setChannelId=function(cnlid){if(!tvp.$.isString(cnlid)){return;}
_channelId=cnlid;}
this.getChannelId=function(cnlid){return _channelId;}
this.getFullVid=function(){if(this.getIdx()==0){return getRealVid(this.getVid());}
return(getRealVid(this.getVid())+"_"+this.getIdx());}
this.clear=function(){_vid="";_vidlist="";_vidCnt=0;_idx=0;_channelId="";for(var k in data){if(typeof data[k]=="string"){data[k]="";}
else{data[k]=0;}}};this.clone=function(obj){obj.setVid(_origvid);obj.setChannelId(_channelId);for(var k in data){var n=k.charAt(0).toUpperCase()+k.substr(1);obj["set"+n](this["get"+n]());}}
this.getVideoSnap=function(){var img=[];img[0]=tvp.common.getVideoSnap(_vid,_idx);img[1]=img[0].replace("_160_90_3","_1");img[2]=img[1].replace("_1.jpg",".png");return img;}
this.getMP4Url=function(onSuccess,onError){function error(errcode){if(tvp.$.isFunction(onError)){onError(errcode);}}
tvp.$.ajax({"url":tvp.path.html5_video_cgi,"data":{"vid":_vid,"charge":data.pay>0?1:0},"dataType":"jsonp","success":function(json){var url="";if(!json||!json.s){error(50);return;}
else if(json.s!="o"){error(json.em||50);return;}
else if(!json.vd||!json.vd.vi||!tvp.$.isArray(json.vd.vi)){error(68);return;}
else if(json.vd.vi.length>0){for(var i=0;i<json.vd.vi.length;i++){if(json.vd.vi[i].st!=2)
continue;url=json.vd.vi[i].url;if(url.indexOf(".mp4")<0)
continue;if(!!url&&url.length>0)
break;}}
if(tvp.$.isFunction(onSuccess)){onSuccess(url);}},"error":function(){error(50)}});}};tvp.PLAYTYPE={LIVE:"1",VOD:"2"}
tvp.BasePlayer=function(){this.eventList=["inited","playing","ended","allended","pause","timeupdate","getnext","error","stop","fullscreen","change","write","flashpopup","getnextenable","msg","liveerror"];this.mapToShellFun=["log"];this.params={};this.hijackFun=["getPlayer","getCurVideo","showPlayer","hidePlayer","pause","getPlaytime","getPlayerType"];(function(me){var arr=["init","setCurVideo","addParam","write","getPreVid","callback","setPlayerReady"];arr=arr.concat(me.hijackFun);for(var i=0,len=arr.length;i<len;i++){me[arr[i]]=tvp.emptyFn;}
for(var i=0,len=me.eventList.length;i<len;i++){me["on"+me.eventList[i]]=tvp.emptyFn;}
for(var i=0,len=me.mapToShellFun.length;i<len;i++){me[me.mapToShellFun[i]]=tvp.emptyFn;}})(this);this.write=function(id){tvp.$("#"+id).html("");}
this.log=function(msg){if(window.console){window.console.log(msg);}}
this.addParam=function(k,v){this.params[k]=v;}}
tvp.BaseFlash=function(){var $me=this;this.swfPathRoot="http://imgcache.qq.com/tencentvideo_v1/player/";this.playerid="";this.getFlashVar=function(){return"";}
this.getFlashHTML=function(){var flashvar=this.getFlashVar();var swfurl="";if(tvp.$.isString(this.params.swfurl)&&this.params.swfurl.length>0){swfurl=this.params.swfurl;}else{swfurl=this.swfPathRoot+this.params.swftype.replace(/[^\w+]/ig,"")+".swf";swfurl+="?max_age=86400&v=20130507"
var ua=navigator.userAgent;if(ua.indexOf("Maxthon")>0||ua.indexOf("TencentTraveler")>0){swfurl+="&_="+tvp.$.now();}}
swfurl=tvp.$.filterXSS(swfurl);this.playerid=tvp.$.filterXSS(this.params.playerid);if(!this.playerid){this.playerid="tenvideo_flash_player_"+new Date().getTime();}
var propStr="";propStr+='    <param name="allowScriptAccess" value="always" />\n';propStr+='    <param name="movie" value="'+swfurl+'" />\n';propStr+='    <param name="quality" value="high" />\n';propStr+='    <param name="allowFullScreen" value="true"/>\n';propStr+='    <param name="play" value="true" />\n';propStr+='    <param name="wmode" value="'+tvp.$.filterXSS(this.params.wmode)+'" />\n';propStr+='    <param name="flashvars" value="'+flashvar+'"/>\n';propStr+='    <param name="type" value="application/x-shockwave-flash" />\n';propStr+='    <param name="pluginspage" value="http://get.adobe.com/cn/flashplayer/" />\n';var str="";if(!!tvp.$.browser.msie||!!tvp.$.userAgent.android){if(!!tvp.$.browser.msie&&tvp.$.browser.msie<=10){str+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+this.width+'" height="'+this.height+'" id="'+this.playerid+'" align="middle">\n';}else{str+='<object type="application/x-shockwave-flash" data="'+swfurl+'" width="'+this.width+'" height="'+this.height+'" id="'+this.playerid+'" align="middle">\n';}
str+=propStr;str+=' <div class="tvp_player_noswf">未检测到flash插件或者您的设备暂时不支持flash播放</div>';str+='</object>'}else{str+='<embed wmode="'+tvp.$.filterXSS(this.params.wmode)+'" flashvars="'+flashvar+'" src="'+swfurl+'" quality="high" name="'+this.playerid+'" id="'+this.playerid+'" bgcolor="#000000" width="'+this.width+'" height="'+this.height+'" align="middle" allowScriptAccess="always" allowFullScreen="true"  type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/" />';}
return str;}}
if(typeof tvp.BaseFlash.maxId!="number"){tvp.BaseFlash.maxId=0;}
tvp.BaseFlash.prototype=new tvp.BasePlayer();var preplay=tvp.emptyFn,nextplay=tvp.emptyFn,attrationstop=tvp.emptyFn,thisplay=tvp.emptyFn,playerInit=tvp.emptyFn;tvp.FlashPlayer=function(vWidth,vHeight){var $me=this,curVideo=new tvp.VideoInfo(),flashobj=null,playerid,pauseTime=-1;tvp.BaseFlash.maxId++;var pauseCheckTimer=null;var flashvarskey={"adplay":1,"oid":"","cid":"","showcfg":1,"showend":"","tpid":0,"searchbar":"","loadingswf":"","pic":"","share":"1"}
var replaceFlashKey={"flashskin":"","flashshownext":""}
this.params={"swfurl":"","swftype":"TPout","wmode":"window","listtype":2,"autoplay":1,"playerid":"","extvars":{},"ispay":0,"starttips":0};this.params=tvp.$.extend(this.params,flashvarskey);this.params=tvp.$.extend(this.params,replaceFlashKey);this.hijackFun=this.hijackFun.concat(["getFlashVar"]);this.getPlayerType=function(){return"flash";}
this.getFlashVar=function(){var flashvar='';flashvar+='vid='+curVideo.getVidList();flashvar+='&autoplay='+tvp.$.filterXSS($me.params["autoplay"]);flashvar+=$me.params.listtype!=0?('&list='+$me.params.listtype):'';if(curVideo.getIdx()>0&&curVideo.getTagEnd()-curVideo.getTagStart()>0){flashvar+="&attstart="+tvp.$.filterXSS(curVideo.getTagStart());flashvar+="&attend="+tvp.$.filterXSS(curVideo.getTagEnd());}
if(curVideo.getTimelong()>0){flashvar+='&duration='+(curVideo.getTimelong()||"");}
if(curVideo.getHistoryStart()>0){flashvar+="&history="+tvp.$.filterXSS(curVideo.getHistoryStart());}
if(curVideo.getTstart()>0){flashvar+="&t="+tvp.$.filterXSS(curVideo.getTstart());}
if(curVideo.getIdx()==0&&(curVideo.getPrefix()>0||curVideo.getTail()>0)){var _piantou=curVideo.getPrefix(),_endoffset=curVideo.getEndOffset();if(_piantou>0||_endoffset){flashvar+="&vstart="+tvp.$.filterXSS(_piantou);flashvar+="&vend="+tvp.$.filterXSS(_endoffset);}}
tvp.$.each(flashvarskey,function(el){if(!tvp.$.isUndefined($me.params[el])&&((tvp.$.isString($me.params[el])&&$me.params[el].length>0)||typeof $me.params[el]=="number")){flashvar+="&"+el+"="+tvp.$.filterXSS($me.params[el]);}});tvp.$.each(replaceFlashKey,function(el){if(!tvp.$.isUndefined($me.params[el])&&((tvp.$.isString($me.params[el])&&$me.params[el].length>0)||typeof $me.params[el]=="number")){flashvar+="&"+el.replace("flash","")+"="+tvp.$.filterXSS($me.params[el]);}});if(curVideo.getPay()>0){flashvar+="&pay="+tvp.$.filterXSS(curVideo.getPay());}
if(curVideo.getTitle().length>0){flashvar+="&title="+encodeURIComponent(curVideo.getTitle());}
if(!!curVideo.getIdx()){flashvar+="&exid=k"+tvp.$.filterXSS(curVideo.getIdx());}
if(curVideo.getCDNType()>0){flashvar+="&cdntype="+curVideo.getCDNType();}
for(var p in this.params.extvars){flashvar+=["&",tvp.$.filterXSS(p),"=",encodeURIComponent(this.params.extvars[p])].join("");}
return flashvar;};this.width=tvp.$.filterXSS(vWidth);this.height=tvp.$.filterXSS(vHeight);this.setCurVideo=function(videoinfo){if(videoinfo instanceof tvp.VideoInfo){videoinfo.clone(curVideo);}};this.getCurVideo=function(){return curVideo;}
this.getCurVid=function(){return(curVideo instanceof tvp.VideoInfo)?curVideo.getVid():"";}
this.getCurVidList=function(){return(curVideo instanceof tvp.VideoInfo)?curVideo.getVidList():"";}
this.write=function(id){var el=tvp.$.get(id);if(!el)
return;var str=this.getFlashHTML();el.innerHTML=str;flashobj=tvp.$.browser.ie?document.getElementById(this.playerid):document.embeds[this.playerid];$me.onwrite(curVideo.getVid());if(document.domain==""&&document.location.href.substr(0,5)=="file:"&&!!window.console&&(typeof window.console.warn=="function")){window.console.warn("本页面包含腾讯视频统一播放器，如果您希望调用统一播放器API接口，请使用http形式打开，本地双击html文件可能会导致API失效");}};this.getPlayer=function(){return flashobj;}
this.play=function(video){if(!flashobj){throw new Error("未找到视频播放器对象，请确认flash播放器是否存在");}
if(tvp.$.isUndefined(video)){if(tvp.$.isFunction(flashobj.setPlaytime)){flashobj.setPlaytime(pauseTime);pauseTime=-1;}
return;}
if(!(video instanceof tvp.VideoInfo)){return;}
var vstart=0,vend=0,tagstart=0,tagend=0;if(video.getIdx()==0){vstart=video.getPrefix()||0;vend=video.getEndOffset()||0;}else{tagstart=video.getTagStart();tagend=video.getTagEnd();}
var extid=video.getIdx()==0?0:("k"+video.getIdx());if(curVideo.getVidList()!=video.getVidList()||video.getIdx()==0){var videoInfo={vid:video.getVidList()||video.getIdx(),duration:video.getTimelong()||"",start:tagstart,end:tagend,history:video.getHistoryStart()||0,vstart:vstart,vend:vend,title:video.getTitle()||"",exid:extid,pay:video.getPay(),cdntype:curVideo.getCDNType()};if($me.params["starttips"]==0){videoInfo["t"]=video.getHistoryStart()||0;}
if(typeof flashobj.loadAndPlayVideoV2=='function'){flashobj.loadAndPlayVideoV2(videoInfo);}}else if(video.getTagEnd()-video.getTagStart()>0){flashobj.attractionUpdate(video.getTagStart(),video.getTagEnd(),extid);}
$me.setCurVideo(video);$me.onchange(video.getFullVid());if(typeof flashobj.setNextEnable=="function"){flashobj.setNextEnable($me.ongetnextenable(curVideo.getFullVid())?1:0);}};this.showPlayer=function(){if(!flashobj)
return;var width=""+$me.width,height=""+$me.height;if(width.indexOf("px")<0){width=parseInt(width)+"px";}
if(height.indexOf("px")<0){height=parseInt(height)+"px";}
flashobj.style.width=width;flashobj.style.height=height;}
this.hidePlayer=function(){if(!flashobj)
return;flashobj.style.width="1px";flashobj.style.height="1px";}
this.pause=function(){if(!!flashobj&&!tvp.$.isUndefined(flashobj.getPlaytime)&&!tvp.$.isUndefined(flashobj.pauseVideo)){pauseTime=flashobj.getPlaytime();flashobj.pauseVideo();pauseCheckTimer=setInterval(function(){try{if(!flashobj||tvp.$.isUndefined(flashobj.getPlaytime)){clearInterval(pauseCheckTimer);pauseCheckTimer=null;}else if(flashobj.getPlaytime()!=pauseTime){clearInterval(pauseCheckTimer);pauseCheckTimer=null;}}catch(err){if(!!pauseCheckTimer){clearInterval(pauseCheckTimer);pauseCheckTimer=null;}}},50);}}
this.getPlaytime=function(){if(!!flashobj&&tvp.$.isFunction(flashobj.getPlaytime)){return flashobj.getPlaytime();}
return-1;}
window.thisplay=function(){$me.onplaying($me.getCurVid());}
window.playerInit=function(){if(typeof flashobj.setNextEnable=="function"){flashobj.setNextEnable($me.ongetnextenable(curVideo.getFullVid())?1:0);}
$me.oninited();}
window.attrationstop=window.nextplay=function(vid){$me.onended(vid);var video=$me.ongetnext(vid);if(!video){$me.onallended();return;}
$me.play(video);}
window.__flashplayer_ismax=function(ismax){$me.onfullscreen(ismax);};window.__tenplay_popwin=function(){if(tvp.$.isFunction($me.onflashpopup)){$me.onflashpopup();}}
window._showPlayer=function(){$me.showPlayer();}
window._hidePlayer=function(){$me.hidePlayer();}}
tvp.FlashPlayer.prototype=new tvp.BaseFlash();tvp.Html5Player=function(vWidth,vHeight){var $me=this,curVideo=new tvp.VideoInfo(),videoObj=null,$videoTag,useHLS=false,curVid,isPlayerHiding=false,videodata={"vurl":"","vt":0,"format":2,"duration":0,"bt":0,"platform":getPlatform()},reportRid="",reportPid="",lastReportPlayEndVid="",playerid="",historyTimer=null,reportHistoryTimer=1e4;var __testCnt=1;var __testNumLimit=5;function TimerObject(){this.start=tvp.$.now();this.end=0;};TimerObject.prototype={getTimelong:function(){this.end=tvp.$.now();if(this.end<=0||this.start<=0)
return 0;var a=this.end-this.start;return(a<=0?0:a);},getSeconds:function(){return parseInt(this.getTimelong()/1000,10);}};var reportTimer={};function initReportParam(){reportTimer["step_5"]=null;reportTimer["step_5"]=new TimerObject();reportTimer["step_31_cnt"]=0;}
this.width=tvp.$.filterXSS(vWidth);this.height=tvp.$.filterXSS(vHeight);this.params={"autobuffer":"","controls":"","preload":"metadata","autoplay":"","x-webkit-airplay":"","playerid":"","pic":"disabled"};this.mapToShellFun=["log","isUseHLS"];this.eventList=this.eventList.concat(["notpay","notlogin"]);this.getPlayerType=function(){return"html5";}
function getMp4Key(){if(tvp.$.userAgent.isiPhone||/ipod/.test(navigator.userAgent))
return"v3010";if(tvp.$.userAgent.isiPad)
return"v4010";if(!!tvp.$.userAgent.android){if(/Tablet/.test(navigator.userAgent)||screen.width>=600){return"v6010";}
return"v5010"}
if(/IEMobile/.test(navigator.userAgent)){return"v7010";}
return"v1010";}
function getBusinessId(){if(/MicroMessenger/i.test(navigator.userAgent)){return 6;}
var host="";if(document.location.href.indexOf("http://v.qq.com/iframe/")>=0&&window!=top){var l=document.referrer;if(l!=""){var link=document.createElement("a");link.href=l;host=link.hostname;link=null;delete link;}}
if(host==""){host=document.location.hostname||document.location.host;}
keys=[{r:/(\w+\.)?weixin\.qq\.com$/i,v:6},{r:/^(v|film)\.qq\.com$/i,v:1},{r:/^news\.qq\.com$/i,v:2},{r:/(\w+\.)?qzone\.qq\.com$/i,v:3},{r:/(\w+\.)?t\.qq\.com$/i,v:5},{r:/^3g\.v\.qq\.com$/i,v:8},{r:/^m\.v\.qq\.com$/i,v:10}];host=host.toLowerCase();for(var i=0,len=keys.length;i<len;i++){var key=keys[i];if(key.r.test(host)){return key.v;}}
return 7;}
function getDeviceId(){var u=tvp.$.userAgent,ua=navigator.userAgent;if(!!u.isiPad)return 1;if(!!u.windows){if(/Touch/i.test(ua))return 8;if(/Phone/i.test(ua))return 7;return 2;}
if(!!u.android){if(/Tablet/.test(ua))return 5;return 3;}
if(!!u.isiPhone)return 4;if(!!u.macs)return 9;return 10;}
function getPlatform(){var bussId=getBusinessId(),deviceId=getDeviceId();return bussId*10000+deviceId*100+1;}
function report(step,val,extData){if(isNaN(val)||val<=0||val>9000000){return;}
var url="http://rcgi.video.qq.com/report/play?";var r=[],pa={"step":step,"val":val,"ptag":tvp.$.cookie.get("ptag"),"version":"TenPlayerHTML5V1.1","ctime":tvp.$.getISOTimeFormat(),"vid":curVid,"rid":reportRid,"pid":reportPid};if(typeof extData=="object"){tvp.$.extend(pa,extData);}
tvp.$.extend(pa,videodata);for(var p in pa){var v=pa[p];if(isNaN(v)){v=encodeURIComponent(""+v);}
r.push(p+"="+v);}
url+=r.join("&");tvp.report(url);}
function getKeyFormat(cfg,fi){for(var i=0,len=fi.length;i<len;i++){if(fi[i].sl==1){return fi[i].id;}}
return-1;}
function getVideoUrlByVid(vid,hls,callbacks){var globalCfg={isPay:curVideo.getPay()>0?1:0,vid:"",fmt:"auto"};var reportData={val1:0,val2:0},ajaxTimelong=0,requirePlatForm=11001;reportRid=tvp.$.createGUID(48);reportPid=tvp.$.createGUID(48);function error(errCode){if(hls){getVideoUrlByVid(vid,false,callbacks);}else if(tvp.$.getType(callbacks)=="object"&&tvp.$.isFunction(callbacks.onError)){callbacks.onError(errCode);}
videodata.duration=0;videodata.vt=0;videodata.vurl="";videodata.bt=0;reportData["val1"]=errCode==500?2:(errCode==50?4:3);reportData["val2"]=errCode==50?601:errCode;}
function loadVideoURLFromGetURL(cfg){var s={};tvp.$.extend(tvp.$.extend(s,globalCfg),cfg);tvp.$.ajax({"url":(hls&&!s.isPay)?tvp.path.hls_video_cgi:tvp.path.html5_video_cgi,"data":{"vid":s.vid,"charge":s.isPay},"dataType":"jsonp","success":function(json){ajaxTimelong=reportTimer["step_1011"].getTimelong();if(!json||!json.s){error(50);return;}else if(json.s!="o"){error(json.em||50);return;}else if(!json.vd||!json.vd.vi||!tvp.$.isArray(json.vd.vi)){error(68);return;}
var videourl=[],charge=-2;for(var i=0;i<json.vd.vi.length;i++){charge=json.vd.vi[i].ch;if(json.vd.vi[i].st!=2)
continue;var url=json.vd.vi[i].url.toLowerCase();if(url.indexOf(".mp4")<0&&url.indexOf(".m3u8")<0)
continue;if(!!json.vd.vi[i].url){var d=json.vd.vi[i];videourl.push(d.url);try{videodata.duration=parseInt(d.dur);videodata.vt=d.vt;videodata.vurl=d.url;videodata.bt=curVideo.getTimelong()||videodata.duration;}catch(e){}
break;}}
if(videourl.length==0){$me.onerror(charge);return;}
curVid=vid;reportData["val1"]=1;report(1010,ajaxTimelong,reportData);if(tvp.$.getType(callbacks)=="object"&&tvp.$.isFunction(callbacks.onSuccess)){callbacks.onSuccess(json,videourl);}},"error":function(){ajaxTimelong=reportTimer["step_1011"].getTimelong();error(500);}});};function loadVideoURLFromGetInfo(cfg){var s={},infoData={};tvp.$.extend(tvp.$.extend(s,globalCfg),cfg);tvp.$.ajax({url:"http://vv.video.qq.com/getinfo",data:{"vids":s.vid,"platform":requirePlatForm,"charge":s.isPay?1:0,"otype":"json"},dataType:"jsonp",success:function(infojson){if(!infojson||!infojson.s){error(50);return;}
if(infojson.s!="o"){error(infojson.em||50);return;}
if(!infojson.vl||!infojson.vl.vi||!tvp.$.isArray(infojson.vl.vi)||infojson.vl.cnt==0){error(68)
return;}
var vi=infojson.vl.vi[0];if(vi.fst!=5||!vi.ul||!tvp.$.isArray(vi.ul.ui)||vi.ul.ui.length==0){error(62);return;}
if(vi.st!=2){if(vi.st!=8){error(62);return;}
error(83,vi.ch);}
var ui=vi.ul.ui[0];infoData["br"]=vi.br;infoData["path"]=ui.url;infoData["fn"]=vi.fn;infoData["td"]=vi.td;infoData["fiid"]=getKeyFormat(s,infojson.fl.fi);infoData["vt"]=ui.vt;tvp.$.ajax({url:"http://vv.video.qq.com/getkey",data:{"otype":"json","vid":s.vid,"format":infoData.fiid,"filename":infoData.fn,"platform":requirePlatForm,"vt":infoData.vt,"charge":s.isPay?1:0},dataType:"jsonp",success:function(keyjson){ajaxTimelong=reportTimer["step_1011"].getTimelong();if(!keyjson||!keyjson.s){error(50);return;}
if(keyjson.s!="o"){error(keyjson.em||50);return;}
var videourl=[],charge=-2;videourl=infoData["path"]+infoData["fn"]+"?vkey="+keyjson.key+"&br="+infoData["br"]+"&platform=2&fmt="+s.fmt+"&level="+keyjson.level+"&sdtfrom="+getMp4Key();if(tvp.$.isString(keyjson.sha)&&keyjson.sha.length>0){videourl+="&sha="+keyjson.sha;}
videodata.duration=parseInt(infoData.td);videodata.vt=infoData.vt;videodata.vurl=videourl;videodata.bt=curVideo.getTimelong()||videodata.duration;curVid=vid;reportData["val1"]=1;report(1011,ajaxTimelong,reportData);if(tvp.$.getType(callbacks)=="object"&&tvp.$.isFunction(callbacks.onSuccess)){callbacks.onSuccess(infojson,videourl);}},error:function(){ajaxTimelong=reportTimer["step_1011"].getTimelong();error(500);}});},error:function(){ajaxTimelong=reportTimer["step_1011"].getTimelong();error(500);}});};if(!tvp.$.isString(vid))
return;reportTimer["step_1011"]=new TimerObject();if(hls){loadVideoURLFromGetURL({vid:vid});}else{loadVideoURLFromGetInfo({vid:vid});}};function getVideoTagHtml(){playerid=$me.params.playerid;if(!playerid){playerid="tenvideo_video_player_"+(tvp.$("video").size());}
var str=['<video id="',playerid,'" width="','1px','" height="','1px','"'].join("");for(var p in $me.params){if(p!="playerid"&&$me.params[p]!="disabled"&&$me.params[p]!="0"){str+=" "+(p=="pic"?"poster":p);if($me.params[p]!=""){str+='="'+$me.params[p]+'"';}}}
str+="></video>";return str;}
function getNextVid(){var vidArr=curVideo.getVidList().split("|");var vidIndexOf=tvp.$.inArray(curVid,vidArr);if(vidIndexOf<vidArr.length-1){return vidArr[vidIndexOf+1];}
return"";};function setCurrentTime(v){if(isNaN(v))
return;try{if(!!videoObj){videoObj.currentTime=v;}}catch(e){setTimeout(function(){setCurrentTime(v)},50);}}
function reportPlayEnd(val1){var val=0;if(!!reportTimer&&!!reportTimer["step_5"]){val=reportTimer["step_5"].getSeconds();}
report(5,val,{"val1":val1});}
this.getPlayer=function(){return videoObj;}
this.isUseHLS=function(){return false;}
this.setCurVideo=function(videoinfo){if(videoinfo instanceof tvp.VideoInfo){videoinfo.clone(curVideo);}};this.getCurVideo=function(){return curVideo;};this.playVideoByVid=function(vid){getVideoUrlByVid(vid,useHLS,{"onSuccess":function(json,videourl){$me.playVideoUrl(videourl);report(4,1);},"onError":function(errCode){$me.onerror(errCode);}})}
this.playVideoUrl=function(videoUrl){if(!videoObj)
return;if($videoTag.size()==0)
return;var str="",hls=false;if(tvp.$.isArray(videoUrl)){tvp.$.each(videoUrl,function(i,el){if(i==0&&el.indexOf(".m3u8")>0){hls=true;}
el+=(el.indexOf("?")>0?"&":"?")+"sdtfrom="+getMp4Key();str+=['<source src="',el,'"></source>'].join("");});}else if(tvp.$.isString(videoUrl)){if(videoUrl.indexOf(".m3u8")>0){hls=true;}
videoUrl+=(videoUrl.indexOf("?")>0?"&":"?")+"sdtfrom="+getMp4Key();str+=['<source src="',videoUrl,'"></source>'].join("");}
$videoTag.bind("canplaythrough",function(e){var offset=curVideo.getTagStart()||curVideo.getHistoryStart()||0;if(offset>0){if(hls){setTimeout(function(){setCurrentTime(offset);},500);}else{setCurrentTime(offset);}}
$videoTag.unbind("canplaythrough");});try{videoObj.pause();}catch(e){};videoObj.innerHTML=str;tvp.$("#"+playerid+" > source").unbind("error");tvp.$("#"+playerid+" > source").bind("error",function(){if(!reportTimer["step_6"])
return;var tl=reportTimer["step_6"].getTimelong();report(30,tl,{"val1":0,"val2":useHLS?3:2});reportPlayEnd(3);});if(!isPlayerHiding){this.showPlayer();}
try{videoObj.load()
if($me.params.autoplay!="disabled"&&$me.params.autoplay!="0"){videoObj.play();}}catch(e){}
initReportParam();};this.write=function(id){var el=tvp.$.get(id);if(!el)
return;useHLS=this.isUseHLS();el.innerHTML=getVideoTagHtml();videoObj=tvp.$.get(playerid);$videoTag=tvp.$(videoObj);reportTimer["step_31_cnt"]=0;$videoTag.bind("ended",function(){lastReportPlayEndVid=curVid;reportPlayEnd(1);var nextvid=getNextVid();if(tvp.$.isString(nextvid)&&nextvid.length>0){setCurrentTime(0);$me.playVideoByVid(nextvid);}else{$me.onended(curVid);var nextVideo=$me.ongetnext(curVid);if(!!nextVideo&&nextVideo instanceof tvp.VideoInfo){$me.play(nextVideo);}}
if(typeof _flash_view_history=="function"){clearInterval(historyTimer);if(!!curVideo.getFullVid()||curVideo.getIdx()==0){_flash_view_history(-2,curVideo.getTimelong(),curVideo.getTimelong());}}}).bind("play",function(){reportTimer["step_6"]=new TimerObject();}).bind("canplay",function(){if(!reportTimer["step_6"])
return;var tl=reportTimer["step_6"].getTimelong();report(6,tl,{"val1":1});report(30,tl,{"val1":0,"val2":useHLS?3:2});}).bind("pause",function(){$me.onpause();reportTimer["step_31_cnt"]=0;}).bind("stalled",function(){if(!!reportTimer["step_31"]){reportTimer["step_31"]=null;delete reportTimer["step_31"];}
reportTimer["step_31"]=new TimerObject();}).bind("playing",function(){$me.onplaying(curVid);if(!!reportTimer["step_31"]){var tl=reportTimer["step_31"].getTimelong();report(31,Math.min(10000,tl),{"val1":tl>10000?1:0,"val2":useHLS?3:2,"ptime ":videoObj.currentTime});reportTimer["step_31"]=null;delete reportTimer["step_31"];}});$me.play(curVideo,false);$me.onwrite(curVideo.getFullVid());$me.oninited();};this.play=function(video,isOnChange){if(tvp.$.isUndefined(isOnChange)){isOnChange=true;}
if(!videoObj){throw new Error("未找到视频播放器对象，请确认<video>标签是否存在");}
if(tvp.$.isUndefined(video)){videoObj.play();return;}
if(!video instanceof tvp.VideoInfo){throw new Error("传入的对象不是tvp.VideoInfo的实例");}
if(lastReportPlayEndVid!=curVid&&video.getFullVid()!=curVideo.getFullVid()){reportPlayEnd(2)
lastReportPlayEndVid="";}
video=video||curVideo;if(!!curVid&&curVid==video.getVid()&&video.getIdx()>0&&video.getTagStart()>0){setCurrentTime(video.getTagStart());}else{$me.playVideoByVid(video.getVid());}
if(typeof _flash_view_history=="function"){if(curVideo.getIdx()>0){_flash_view_history(0,0,curVideo.getTimelong());}else{_flash_view_history(-1,0,curVideo.getTimelong());}
clearInterval(historyTimer);historyTimer=setInterval(function(){try{if(!curVideo.getFullVid()||curVideo.getIdx()>0){return;}
var index=tvp.$.inArray(curVid,curVideo.getVidList().split("|"));var arrDur=curVideo.getDuration().split("|");var sec=0;for(var i=0;i<index;i++){sec+=parseInt(arrDur[i]);}
_flash_view_history(-3,parseInt(videoObj.currentTime)+sec,curVideo.getTimelong());}catch(e){}},reportHistoryTimer);};initReportParam();$me.setCurVideo(video);if(!!isOnChange){$me.onchange(video.getFullVid());}};this.showPlayer=function(){if(!videoObj)
return;var widStr=$me.width+"";if(widStr.indexOf("%")>-1||widStr.indexOf("px")>-1){videoObj.style.width=$me.width;}else{videoObj.style.width=$me.width+"px";}
var hiStr=$me.height+"";if(hiStr.indexOf("%")>-1||hiStr.indexOf("px")>-1){videoObj.style.height=$me.height;}else{videoObj.style.height=$me.height+"px";}
isPlayerHiding=!!0;}
this.hidePlayer=function(){if(!videoObj)
return;videoObj.style.width="1px";videoObj.style.height="1px";isPlayerHiding=!!1;}
this.pause=function(){if(!!videoObj){videoObj.pause();}};this.getPlaytime=function(){if(!videoObj)
return-1;return videoObj.currentTime;}}
tvp.Html5Player.maxId=0;tvp.Html5Player.prototype=new tvp.BasePlayer();tvp=tvp||{};tvp.livehub={g_isFiveCity:false,g_lookback:false,g_flashp2p:false,iretcode:0,g_curCnlInfo:{},checkUserArea:function(){return false},FlashChecker:function(){var $me=this;this.cnlId="";this.extParam={};this.onError=tvp.$.noop;this.onCanFlash=tvp.$.noop;this.onCanHTML5=tvp.$.noop;this.onCanOCX=tvp.$.noop;this.onComplete=tvp.$.noop;this.onGetCnlId=tvp.$.noop;this.onSuccess=function(json){if(tvp.$.getType(json)=="object"&&!tvp.$.isUndefined(json.ret)&&json.ret==0){if(tvp.$.isUndefined(json.isfivecity)){tvp.livehub.g_isFiveCity=json.isfivecity;}
tvp.livehub.iretcode=json.iretcode;tvp.livehub.g_flashp2p=+json.flashp2p||0;tvp.debug("get channel info:cnlid="+json.progid+",lookback="+json.lookback+",isflash="+json.flash+",flashp2p="+json.flashp2p);$me.cnlId=(""+json.progid)||"";$me.onGetCnlId(""+$me.cnlId,!!json.lookback);tvp.livehub.getCurChannelInfo($me.cnlId,$me.extParam);if(json.flash==1){tvp.livehub.g_lookback=!!json.lookback;$me.onCanFlash($me.cnlId);}else if(tvp.common.isUseHtml5()){$me.onCanHTML5($me.cnlId);}else if(!!$.os.windows){$me.onCanOCX($me.cnlId);}else{$me.onError(json.iretcode);}}else{$me.onError(500);}}
this.send=function(){var sendData={cnlid:$me.cnlId||"",area:tvp.livehub.checkUserArea()?1:0,qq:tvp.common.getUin(),ios:tvp.common.isUseHtml5()?1:0};var extData={debug:"",key:"",ip:""}
tvp.$.each(extData,function(el){extData[el]=tvp.$.getUrlParam(el);})
tvp.$.extend(sendData,extData);tvp.$.extend(sendData,this.extParam);tvp.$.ajax({type:"GET",url:"http://zb.s.qq.com/getproginfo.fcgi",data:sendData,dataType:"jsonp",error:function(){$me.onError();$me.onComplete();},success:function(json){$me.onSuccess(json);$me.onComplete();}});}},getCurChannelInfo:function(cnlId,extParam){var curInfo=tvp.livehub.g_curCnlInfo;if(extParam&&typeof extParam=='object'){curInfo.cnlId=extParam.cnlId;extParam.channelname&&(curInfo.cnlName=extParam.channelname);extParam.currentname&&extParam.currenttime&&(curInfo.prmInfo=extParam.currenttime+"|"+extParam.currentname);}else{curInfo={};}}}
tvp.FlashLivePlayer=function(vWidth,vHeight){var $me=this,curVideo=new tvp.VideoInfo(),flashobj=null,playerid;tvp.BaseFlash.maxId++;var flashvarskey={"adplay":1,"autoplay":1,"oid":"","loadingswf":"","pic":"","apptype":"live","share":0,"showcfg":0}
var needToMapParam={"flashskin":{"k":"skin","v":""},"liveconfigbtn":{"k":"config","v":1},"flashfull":{"k":"full","v":1}}
this.params={"swfurl":"","swftype":"TencentPlayerLive","wmode":"Opaque"};this.hijackFun=["getPlayer","getCurVideo","stop","loginResponse"];(function(){var d={};tvp.$.each(needToMapParam,function(el,val){d[el]=val.v;});$me.params=tvp.$.extend($me.params,flashvarskey);$me.params=tvp.$.extend($me.params,d);})();this.swfPathRoot="http://imgcache.qq.com/minivideo_v1/vd/res/";function getChannelURl(cnlid){return"http://zb.v.qq.com:1863/?progid="+cnlid;}
this.getFlashVar=function(){var flashvar='',funPrefix="TenVideo_FlashLive_";var linkChar="";if(this.params["autoplay"]==0){flashvar+="vid="+curVideo.getChannelId();flashvar+="&vurl="+getChannelURl(curVideo.getChannelId());flashvar+="&sktype="+(!!curVideo.getIsLookBack()?"vod":"live");linkChar="&";}
flashvar+=linkChar;flashvar+="funCnlInfo="+funPrefix+"GetChannelInfo"
flashvar+="&funTopUrl="+funPrefix+"GetTopUrl";flashvar+="&funLogin="+funPrefix+"IsLogin";flashvar+="&funOpenLogin="+funPrefix+"OpenLogin";flashvar+="&funSwitchPlayer="+funPrefix+"SwitchPlayer";tvp.$.each(flashvarskey,function(el){if(!tvp.$.isUndefined($me.params[el])&&((tvp.$.isString($me.params[el])&&$me.params[el].length>0)||typeof $me.params[el]=="number"))
flashvar+="&"+el+"="+tvp.$.filterXSS($me.params[el]);});tvp.$.each(needToMapParam,function(el,v){if(!tvp.$.isUndefined($me.params[el])&&((tvp.$.isString($me.params[el])&&$me.params[el].length>0)||typeof $me.params[el]=="number"))
flashvar+="&"+v.k+"="+tvp.$.filterXSS($me.params[el]);});return flashvar;};this.width=vWidth;this.height=vHeight;this.setCurVideo=function(videoinfo){if(videoinfo instanceof tvp.VideoInfo){videoinfo.clone(curVideo);}};this.getCurVideo=function(){return curVideo;}
this.getCurVid=function(){return(curVideo instanceof tvp.VideoInfo)?curVideo.getVid():"";}
this.getCurVidList=function(){return(curVideo instanceof tvp.VideoInfo)?curVideo.getVidList():"";}
this.write=function(id){var el=tvp.$.get(id);if(!el)
return;var str=this.getFlashHTML();el.innerHTML=str;flashobj=document.getElementById(this.playerid);$me.onwrite(curVideo.getChannelId());}
this.getPlayer=function(){return flashobj;}
this.play=function(video){if(!flashobj){return;}
video=video||curVideo;if(!video instanceof tvp.VideoInfo){throw new Error("传入的对象不是tvp.VideoInfo的实例");}
var islookback=!!video.getIsLookBack();var cnild=video.getChannelId();var rurl=getChannelURl(cnild);var flashp2p=tvp.livehub.g_flashp2p||0;tvp.debug("islookback="+islookback);tvp.debug("cnlid="+cnild);tvp.debug("rurl="+rurl);if(cnild==""){return;}
if(typeof flashobj.setSkinType!="undefined"){flashobj.setSkinType(islookback?"vod":"live");}
if(typeof flashobj.loadAndPlayVideoFromVID!="undefined"){flashobj.loadAndPlayVideoFromVID(rurl,cnild,video.getLiveReTime()||"","",flashp2p);}
$me.setCurVideo(video);$me.onchange(video.getChannelId());}
this.stop=function(){if(!flashobj){return;}
if(typeof flashobj.stopVideo!="undefined"){flashobj.stopVideo();}}
this.loginResponse=function(){if(!flashobj||typeof flashobj.loginCallback=="function"){flashobj.loginCallback(tvp.FlashLivePlayer.flashloginParam);tvp.FlashLivePlayer.flashloginParam={};}}
window.playerInit=function(){$me.oninited();if($me.params["autoplay"]==1){$me.play(curVideo);}}}
tvp.FlashLivePlayer.prototype=new tvp.BaseFlash();tvp.FlashLivePlayer.ADTYPE={"WEI_DIAN_TAI":"weidiantai","WEI_DIAN_SHI":"weidianshi","LIVE":"live","IN_LIVE":"inlive"}
window.TenVideo_FlashLive_GetChannelInfo=function(){return tvp.livehub.g_curCnlInfo;}
window.TenVideo_FlashLive_GetTopUrl=function(){var href="";try{href=top.location.href;}
catch(err){href=document.location.href;}
return href;}
window.TenVideo_FlashLive_IsLogin=function(){return tvp.common.getUin()>10000;}
window.TenVideo_FlashLive_OpenLogin=function(params){tvp.FlashLivePlayer.flashloginParam=params||{};tvp.common.openLogin();}
window.TenVideo_FlashLive_SwitchPlayer=tvp.$.noop;tvp.Html5Live=function(vWidth,vHeight){var $me=this,curVideo=new tvp.VideoInfo(),videoObj=null,$videoTag,playerid="";this.width=vWidth;this.height=vHeight;this.params={"autobuffer":"","controls":"controls","preload":"true","autoplay":"autoplay","x-webkit-airplay":"","playerid":"","pic":""};this.mapToShellFun=["log","isUseHLS"];function getVideoTagHtml(){playerid=$me.params.playerid;if(!playerid){playerid="tenvideo_video_player_"+(tvp.Html5Live.maxId++);}
var str=['<video id="',playerid,'" width="',$me.width,'" height="',$me.height,'"'].join("");for(var p in $me.params){if(p!="playerid"&&$me.params[p]!="disabled"&&$me.params[p]!="0"){str+=" "+(p=="pic"?"poster":p);if($me.params[p]!=""){str+='="'+$me.params[p]+'"';}}}
str+="></video>";return str;}
this.getPlayer=function(){return videoObj;}
this.setCurVideo=function(videoinfo){if(videoinfo instanceof tvp.VideoInfo){videoinfo.clone(curVideo);}};this.getCurVideo=function(){return curVideo;};this.write=function(id){var el=tvp.$.get(id);if(!el)
return;el.innerHTML=getVideoTagHtml();videoObj=tvp.$.get(playerid);$videoTag=tvp.$(videoObj);$me.onwrite(curVideo.getChannelId());$me.oninited();this.play(curVideo,false);};this.play=function(video,hookOnChage){if(!videoObj){throw new Error("未找到视频播放器对象，请确认<video>标签是否存在");}
if(!video instanceof tvp.VideoInfo){throw new Error("传入的对象不是tvp.VideoInfo的实例");}
if(tvp.$.isUndefined(hookOnChage)){hookOnChage=true;}
video=video||curVideo;var cnlId=video.getChannelId();var guid=tvp.$.createGUID();var new_url="http://zb.v.qq.com:1863/?progid="+cnlId+"&ostype=ios"+"&rid="+encodeURIComponent(guid);var html="<source src = "+new_url+" />";videoObj.innerHTML=html;videoObj.pause();videoObj.load();videoObj.play();$me.setCurVideo(video);if(hookOnChage){$me.onchange(video.getChannelId());}};}
tvp.Html5Live.maxId=0;tvp.Html5Live.prototype=new tvp.BasePlayer();tvp.MP4Link=function(vWidth,vHeight){var $me=this,curVideo=new tvp.VideoInfo();this.width=tvp.$.filterXSS(vWidth);this.height=tvp.$.filterXSS(vHeight);this.setCurVideo=function(videoinfo){if(videoinfo instanceof tvp.VideoInfo){videoinfo.clone(curVideo);}};this.write=function(id){var el=tvp.$.get(id);if(!el){return;}
curVideo.getMP4Url(function(url){var imgsrc="http://i.gtimg.cn/qqlive/images/20121119/i1353305744_1.jpg";var str='<div style="width:'+$me.width+"px"+';height:'+$me.height+'px; background:#000000 url(';str+=imgsrc;str+=') center center no-repeat;">'
str+='<a href="'+url+'" style="width:100%;height:100%;display:block"></a>';str+='</div>';el.innerHTML=str;$me.onwrite(curVideo.getFullVid());$me.oninited();},function(errCode){$me.onerror(errCode);$me.onwrite(curVideo.getFullVid());$me.oninited();});}}
tvp.MP4Link.prototype=new tvp.BasePlayer();tvp=tvp||{};var QQLive=QQLive||{ver:"$Rev: 41363 $",curSSO:"",lastmodify:"$Date: 2014-01-24 14:40:13 +0800 (五, 2014-01-24) $"};var QQLiveSetup=QQLive;QQLive.log=tvp.log;QQLive.debug=function(msg){var funName="";if(msg.indexOf("[")<0&&!!arguments&&!!arguments.callee&&!!arguments.callee.caller){var caller=arguments.callee.caller;funName=QQLive.debug.getFunName(caller)}
msg=funName?("["+funName+"]:"+msg):msg;if(tvp.log.isDebug===-1){tvp.log.isDebug=tvp.$.getUrlParam("debug")=="true"?1:0;}
if(!!tvp.log.isDebug){if(typeof __TenVideo_OCX_CTRL_PAGE__!="undefined"){QQLive.driverPage.sendMsg(QQLive.DEFINE.MSG.DRVPG_EVT_DEBUGLOG,encodeURIComponent(msg));}
else{tvp.log(msg);}}}
QQLive.debug.getFunName=function(func){if(typeof func=='function'||typeof func=='object'){var name=(''+func).match(/function\s*([\w\$]*)\s*\(/);}
return name&&name[1];}
QQLive.config={OLD_MIN_VER:"8.22.5275.0",IE_MIN_VER:"8.45.6526.0",FF_MIN_VER:"8.45.6526.0",CHROME_MIN_VER:"8.45.6526.0",STARTUP_MIN_VER:"8.14.4895.0",IE_FLASH_MIN_VER:"9.0.124.0",FF_FLASH_MIN_VER:"10.0",FLASH_CAB:"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0",MEDIAPLAYER_DOWNLOAD_URL:"http://dl_dir.qq.com/qqtv/QQLive8.46.6680.0.exe",PROGID_QQLIVE_INSTALLER:"QQLiveInstaller.InstallHelper.1",PROGID_QQLIVE_LIVEAPI:"QQLive.Application",MMINSTALL_CLSID:"1DABF8D5-8430-4985-9B7F-A30E53D709B3",MMINSTALL_VER:"8,14,4895,0",OLD_IE_CLSID:"11F2A418-94B2-4E16-9B0C-B00C0435F903",OLD_FF_CLSID:"D9EBCF5D-3F8F-4B6A-89BA-70577BE73C62",SEHLL_CLSID:"f7e55bdf-9528-46ba-b550-777859627591",OCX_CLSID:"5EF7B131-C278-4034-BC88-2CE28B128681",LIVEAPI_CLSID:"4A8FD414-1EBF-4EBD-A158-0D09B005A17F",OCX_URL:"http://imgcache.qq.com/tencentvideo_v1/js/tvp/ocx_ctrl_page.html?max_age=60&v=20130826",CTRLSWF_URL:"http://imgcache.qq.com/liveportal_v1/swf/player/vodCtrl.swf",CTRLSWF_VOD_URL:"http://imgcache.qq.com/liveportal_v1/swf/player/vodCtrl_drm.swf",CTRLSWF_W_URL:"http://imgcache.qq.com/liveportal_v1/swf/player/vodCtrl_w.swf",PREVIEW_URL:"http://imgcache.qq.com/liveportal_v1/swf/player/qqlive_logo.swf",LOADING_URL:"http://imgcache.qq.com/liveportal_v1/swf/player/loadstart.swf",AD_SWF_URL:"http://imgcache.qq.com/liveportal_v1/swf/player/moneyplayer.swf",OCX_DISABLED_MANUAL:"http://v.qq.com/help/film_1.html#15"};QQLive.param={oldParam:{url:"URL",autoplay:"AutoPlay",type:"Type",mediafun:"MediaFun",webskin:"WebSkin"},playpage:{mousewheel:"mousewheel",oldmode:"OldMode"},shell:{ocxurl:"OcxUrl",hidescripterr:"HideScriptErr"},ocx:{mute:"Mute",volume:"Volume",fullscreen:"FullScreen",appendpausebtn:"AppendPauseBtn",programpageurl:"ProgramPageUrl"},driver:{autoplay:"autoPlay",iscontinued:"isContinued",url:"url",type:"type",adv:"adv",oid:"oid"},driverurl:{ctrlbar:"ctrlbar",ctrlheight:"ctrlh",previewurl:"previewUrl",loadingurl:"loadingUrl",previewpic:"previewPic",hidectrl:"hideCtrl",debug:"debug"},getParamBool:function(v){if(v===undefined){return false;}
if(typeof v=="string"){v=v.toLowerCase();return(v=="true"||v=="1");}
return!!v;},getElementObjectById:function(id){return!!window.ActiveXObject?document.getElementById(id):document.embeds[id];}};QQLive.version=(function(){var _isHasQQLivePlayer=-1,_ishasOldVersion=-1,_ishasOcx=-1;_version={};function changeVerToString(nVer){if(QQLive.version.checkVerFormatValid(nVer)){return nVer;}
if(/\d+/i.test(nVer)){var nMain=parseInt(nVer/10000/100,10);var nSub=parseInt(nVer/10000,10)-nMain*100;var nReleaseNO=parseInt(nVer,10)-(nMain*100*10000+nSub*10000);strVer=nMain+"."+nSub+"."+nReleaseNO;return strVer;}
return nVer;}
return{compare:function(strVer1,strVer2){strVer1=changeVerToString(strVer1);strVer2=changeVerToString(strVer2);strVer1=strVer1.replace(/,/g,'.');strVer2=strVer2.replace(/,/g,'.');var vArray1=strVer1.split('.');var vArray2=strVer2.split('.');for(var i=0;i<4;i++){var nVer1=Number(vArray1[i]);var nVer2=Number(vArray2[i]);if(nVer1>nVer2){return 1;}
else if(nVer1<nVer2){return-1;}}
return 0;},get:function(){return tvp.version.getOcx();},check:function(minVer){minVer=minVer||QQLive.version.getSupportMinVersion();if(!QQLive.version.checkVerFormatValid(minVer)){return false;}
var strVer;var nVer=QQLive.version.get();if(/^\d+$/.test(nVer)){strVer=changeVerToString(nVer);}
else{strVer=nVer+"";}
if(QQLive.version.compare(strVer,minVer)<0){return false;}
else{return true;}},isZero:function(ver){ver=ver||QQLive.version.get();if(/^\d+$/.test(ver)){if(ver==0)
return true;}
return QQLive.version.compare(ver,"0.0.0.0")==0;},checkVerFormatValid:function(version){return(/^(\d+\.){2}\d+(\.\d+)?$/.test(version));},hasQQLiveOcx:function(){if(_ishasOcx!=-1)
return _ishasOcx==1;var v=QQLive.version.check();_ishasOcx=!!v?1:0;return _ishasOcx;},hasOldVersion:function(){if(_ishasOldVersion!=-1)
return _ishasOldVersion==1;var v=QQLive.version.get(QQLive.config.OLD_IE_CLSID,true);if(!v)
return false;_ishasOldVersion=QQLive.version.compare(v,QQLive.config.OLD_MIN_VER)>0?1:0;return!!_ishasOldVersion;},hasQQLivePlayer:function(){if(_isHasQQLivePlayer!=-1)
return _isHasQQLivePlayer==1;var v=QQLive.version.get(QQLive.config.LIVEAPI_CLSID);if(!v)
return false;_isHasQQLivePlayer=QQLive.version.compare(v,"0.0.0.0")>0?1:0;return!!_isHasQQLivePlayer;},getSupportMinVersion:function(){if(!!tvp.$.userAgent.ie){return QQLive.config.IE_MIN_VER;}
if(!!tvp.$.userAgent.firefox){return QQLive.config.FF_MIN_VER;}
if(!!tvp.$.userAgent.webkit){return QQLive.config.CHROME_MIN_VER;}
return"0.0.0.0";}}})();QQLive.userAgent=QQLive.browser;QQLive.installer={timer:null,installerObj:null,getInstallerHtml:function(){var str="";str+="<div id=\"qqlive_mminstaller_div\"><OBJECT classid=\"clsid:"+QQLive.config.MMINSTALL_CLSID+"\" codebase=\"http:\/\/dl_dir.qq.com\/qqtv\/MMInstaller.cab#version="+QQLive.config.MMINSTALL_VER+"\" ID=\"QQLiveInstaller\" width=\"0px\" height=\"0px\">";str+=" <embed name=\"FF_MM_Install\" id=\"FF_MM_Install\" type=\"application\/tecent-qqlive-plugin\" width=\"0px\" height=\"0px\"><\/embed>";str+="<\/OBJECT></div>";return str;},showInstallerObject:function(containerId){tvp.$.get(containerId).innerHTML=QQLive.installer.getInstallerHtml();},isMMInstalled:function(){if(!!tvp.$.userAgent.ie){try{var oDlder=new ActiveXObject(QQLive.config.PROGID_QQLIVE_INSTALLER);if(typeof oDlder.GetVersionByClsid!="undefined"){return true;}
try{oDlder.Destroy();oDlder=null;delete oDlder;}
catch(e){}
return false;}
catch(e){return false;}}
else if(tvp.$.userAgent.isNotIESupport()){var installobj=document.embeds["FF_MM_Install"];try{installobj.CreateAX("MMInstall.dll");if(typeof installobj.GetVersionByClsid!="undefined"){return true;}
try{installobj.Destroy();installobj=null;delete installobj;}
catch(e){}
return true;}
catch(e){return false;}}
return false;},checkFFHasMMEmbed:function(){return!!tvp.$.get("FF_MM_Install");},getActiveXObj:function(IEObjName,FFObjName){var obj=null;if(!!FFObjName&&(tvp.$.userAgent.isNotIESupport())){obj=document.embeds["FF_MM_Install"];if(!obj){var _d=document.createElement("div");_d.innerHTML=QQLive.installer.getInstallerHtml();document.getElementsByTagName("body")[0].appendChild(_d);obj=document.embeds["FF_MM_Install"];}
try{obj.CreateAX(FFObjName);}
catch(e){}}
else if(!!IEObjName&&!!tvp.$.userAgent.ie){try{obj=new ActiveXObject(IEObjName);}
catch(e){}}
return obj;},hide:function(){var inst=tvp.$.get("QQLiveInstaller");if(!!inst)
inst.style.display="none";}};QQLive.flash=QQLive.flash||{};tvp.$.extend(QQLive.flash,{getFullVersion:function(){return tvp.version.getFlash();},getMainVer:function(){return tvp.version.getFlashMain();},isFlashVerVaild:function(){var isFlashValid=false;if(!!tvp.$.userAgent.ie){isFlashValid=QQLive.version.compare(QQLive.flash.getFullVersion(),QQLive.config.IE_FLASH_MIN_VER)==-1?false:true;}
else{isFlashValid=QQLive.version.compare(QQLive.flash.getFullVersion(),QQLive.config.FF_FLASH_MIN_VER)==-1?false:true;}
return isFlashValid;}});QQLive.player=QQLive.player||{};tvp.$.extend(QQLive.player,{startup:function(){if(tvp.$.userAgent.isCanOcx()==false)
return;if(QQLive.flash.isFlashVerVaild()==false)
return;if(QQLive.version.check(QQLive.config.STARTUP_MIN_VER)==false)
return;window.location.href="qqlive://system_startup/";},openClient:function(p1,p2){if(!p1)
return;if(!QQLive.version.hasQQLivePlayer())
return;var sso="qqlive://sso/";if(!p2){var val=p1;if(/^\d+$/i.test(val)){sso+="projectid="+val;}
else{if(val.toLowerCase().indexOf("qqlive://sso/")>=0){sso=val;}
else if(/^[a-z0-9]{15}$/i.test(val)){sso+="vbarid="+val;}
else{return;}}}
if(!!p1&&!!p2){sso+="vbarid="+p1+"&videoid="+p2;}
var obj=QQLive.installer.getActiveXObj(QQLive.config.PROGID_QQLIVE_LIVEAPI,"");if(!!obj){try{obj.OpenQQLive(sso);return;}
catch(e){}}
window.location.href=sso;}});QQLive.driverPage={sendMsg:function(id,v){v=v||"";window.navigate("app:OnMsg&nID="+id+"&vContent="+v);},ready:function(){window.navigate("app:PageLoaded");}};QQLive.event={rptImg:null,bind:function(obj,fn){var args=Array.prototype.slice.call(arguments,2);return function(){var _obj=obj||this,_args=args.concat(Array.prototype.slice.call(arguments,0));if(typeof(fn)=="string"){if(_obj[fn]){return _obj[fn].apply(_obj,_args);}}
else{return fn.apply(_obj,_args);}}},closeMousewheel:function(){document.onmousewheel=function(e){e=e||event;if(e.ctrlKey)
return false;}},reportTCSSHot:function(hottag,cookieFlag){var isRpt=false;if(typeof cookieFlag=="undefined"){isRpt=true;}
else{var c=tvp.$.cookie.get("lv_ocx_rpt");if(!!c){c=parseInt(c);}
else{c=0;}
isRpt=!(c&cookieFlag);}
if(isRpt){if(typeof pgvSendClick=="function"){pgvSendClick({hottag:"OCX.SETUP."+hottag,virtualURL:"/virtual/ocx.html",virtualDomain:"v.qq.com"});}
else{QQLive.event.rptImg=new Image();QQLive.event.rptImg.src="http://pinghot.qq.com/pingd?dm=v.qq.com.hot&url=/virtual/ocx.html&tt="+escape(document.title)+"&hottag=OCX.SETUP."+hottag+"&hotx=9999&hoty=9999&rand="+Math.round(Math.random()*100000);}
tvp.$.cookie.set("lv_ocx_rpt",(c|cookieFlag),document.location.hostname||document.location.hostname);}}}
var QQLive=QQLive||{};QQLive.DEFINE={STATUS:{NOT_INITED:-1,INIT:0,READY:4,PLAYING:7,STOP:1,LOADING:2,PAUSE:6,Buffering:8,Paused_Buffering:9,END:91},EVENT:{LOADSTART:"loadstart",LOADING:"loading",PLAY:"playing",STOP:"stop",PAUSE:"pause",PLAYNEXT:"playnext",PLAYPREV:"playprev",MUTE:"mute",FULLSCREEN:"fullscreen",VIDEOREADY:"videoready",PROGESS:"progress",END:"ended",GET_VIDEO_FORMAT_CNT:"getVideoFormatCnt",GET_VIDEO_CUR_FORAMT:"getVideoCurFormat",VIDEO_FORMAT_SWITCHED:"videoFormatSwitched",VIDEOCHANGE:"videochange",VOLUMECHANGE:"volumechange",MOUSEMOVE:"mousemove",DBCLICK:"dbclick",TYPECHANGE:"typechange",GET_DRM_PREVDURATION:"getDrmDuration",GET_DRM_PREV_REASON:"getDrmPrevReason",CHECK_MMINSTALLER:"CheckMMInstall",CHECK_FLASH:"CheckFlash",CHECK_VERSION:"CheckVersion",SHOW_PLAYER:"ShowPlayer",DIRVER_PAGE_INITED:"DirverPageInited",OCX_READY:"inited",GUIDE_FLASH_INITED:"GuideFlashInited",UPDATE_SSO:"UpdateSSO",PAUSE_BTN_CLICK:"PauseBtnClick",FULLSCREEN_BTN_CLICK:"FullScreenBtnClick",CAN_PREV:"CanPrev",CAN_NEXT:"CanNext",OCX_INIT_FAILED:"OcxInitFailed",SCRIPT_ERROR:"ScriptError",OTHER_MSG:"msg",OCX_DISABLED:"ocxdisabeld",DRM_ERROR:"drmerror"},MSG:{OCX_EVT_ONMSG_PLAYING:1,OCX_EVT_ONMSG_PAUSED:2,OCX_EVT_ONMSG_STOPED:3,OCX_EVT_PREPLAY_LOADING:4,OCX_EVT_ONMSG_LOADSTART:7,OCX_EVT_ONMSG_MOUSEMOVE:9,OCX_EVT_ONMSG_LBUTTONDOWN:12,OCX_EVT_ONMSG_LBUTTONDBLCLK:14,OCX_EVT_ONMSG_START:15,OCX_EVT_ONMSG_VOLUME_UP:23,OCX_EVT_ONMSG_VOLUME_DOWN:24,OCX_EVT_ONMSG_MUTE:25,OCX_EVT_ONMSG_CANPRE:26,OCX_EVT_ONMSG_CANNEXT:27,OCX_EVT_ONMSG_BUF_RESUME_PLAY:30,OCX_EVT_ONMSG_PAUSE_RESUME_PLAY:31,OCX_EVT_ONMSG_PLAY_PAUSE_CLICK:32,OCX_EVT_ONMSG_VIDEO_FORMAT_COUNT:49,OCX_EVT_ONMSG_CUR_VIDEO_FORMAT_IDX:50,OCX_EVT_ONMSG_VIDEO_FORMAT_SWITCHED:51,OCX_EVT_ONMSG_COMMAND:100,DRVPG_EVT_FLASH_INITED:501,DRVPG_EVT_ALL_INITED:502,LIVE_PAGE_EVENT_GUIDEFLSAH_INITED:503,DRVPG_EVT_UPDATESSO:504,CTRLBAR_EVT_PAUSECLICK:505,CTRLBAR_EVT_FULLSCREENCLICK:506,OCX_EVT_FULLSCREEN_SWITCH:507,DRVPG_EVT_OCX_INIT_FAILED:508,DRVPG_EVT_JS_ERROR:509,DRVPG_EVT_DEBUGLOG:510,CTRLBAR_EVT_STOPCLICK:511,OCX_DISABLED:512,OCX_DRM_PREV_END:513,OCX_DRM_GET_TIMEOUT:515,NEW_OCX:516,USE_OCX:517,SHOW_INSTALLER_TIPS:518,GET_VIDEO_CUR_TIME:519,OCX_EVT_ERROR:1002,OCX_EVT_ONMSG_FLV_PROGRAM_END:1003,OCX_EVT_ONMSG_FLV_TOTAL_TIME:1005,OCX_EVT_GET_QQ:1104,OCX_EVT_PREVIEW_REASON:1102,OCX_EVT_PREVIEW_DURATION:1103,OCX_EVT_DRM_AUTHORIZE_RESULT:1106,OCX_EVT_DRM_BEGIN:1107},COMMANDID:{IDM_RBUTTON_PLAY_PAUSE:11251,IDM_RBUTTON_PRE:11253,IDM_RBUTTON_NEXT:11254,HOT_KEY_FULLSCREEN:11302},PROGRESS_EVENT:{FLV_LOADING:2,FLV_HEAD_TOTAL_TIME:3},KEYCODE:{HOTKEYF_SHIFT:0x01,HOTKEYF_CONTROL:0x02,HOTKEYF_ALT:0x04,HOTKEYF_EXT:0x08,VK_RETURN:0x0D,VK_ESCAPE:0x1B,VK_SPACE:0x20,VK_LEFT:0x25,VK_UP:0x26,VK_RIGHT:0x27,VK_DOWN:0x28},VIDEOTYPE:{UNKNOWN:0,LIVE:1,VOD:8},AD_EVENT:{ERROR:"Error",DATALOADED:"DataLoaded",DOWNLOADED:"Downloaded",PLAYEND:"PlayEnd"}}
tvp.OcxPlayer=function(vWidth,vHeight){var shellParam={},ocxParam={},ocxurlParam={},oldParam={},timer=[],playpageParam={mousewheel:0,OldMode:0},config={shellId:["QQLiveOcxShell",++tvp.OcxPlayer.maxId].join("_")},$me=this,qqliveocxshell=null,curSSO,curVideo=new tvp.VideoInfo(),modId="",INIT_FAIL_TYPE={OCX_KERNEL_DISABLE:1,IE_SHELL_DISABLE:2,CREATEAX_FAIL:3,NOIE_SETPARAM_FAIL:4};var dataset={curTime:0,totTime:0};var needToMapParam={"mute":0,"volume":50,"adplay":"adv","loadingswf":"loadingurl","pic":"previewpic","ocxctrlbar":"ctrlbar","ocxctrlheight":"ctrlh","ocxskin":"webskin","ocxpausebtn":"appendpausebtn","ocxhidectrl":"hidectrl"}
this.params={"url":"","autoplay":"1","type":tvp.PLAYTYPE.VOD}
var extEventList=["ocxerror","ocxok"];tvp.$.extend(this.params,needToMapParam);this.eventList=this.eventList.concat(extEventList);this.hijackFun=this.hijackFun.concat(["unInit","getTotaltime"]);this.width=tvp.$.filterXSS(vWidth);this.height=tvp.$.filterXSS(vHeight);this.inited=false;QQLiveObject.instance[QQLiveObject.instance.length+1]=this;this.getPlayerType=function(){return"ocx";}
function buildOcxUrlParam(){var arr=[];for(var p in ocxurlParam){if(p==QQLive.param.driverurl.previewpic&&QQLive.param.getParamBool(ocxParam[QQLive.param.driver.autoplay]))
continue;arr.push(p+"="+encodeURIComponent(tvp.$.filterXSS(ocxurlParam[p])));}
arr.push("h="+$me.height);arr.push("w="+$me.width);arr.push("ocxver="+encodeURIComponent(tvp.version.getOcx()));if(tvp.log.isDebug){arr.push(QQLive.param.driverurl.debug+"=true");}
return arr.join("&");};function getSSOByVideo(video){video=video||curVideo;var sso="";if($me.params.type==tvp.PLAYTYPE.LIVE){sso="qqlive://sso/projectid="+video.getChannelId();}
else{sso="qqlive://sso/vbarid="+video.getCoverId()+"&videoid="+video.getVid();if(typeof video.getVFormat=="function"&&!!video.getVFormat()){sso+="&vformat="+video.getVFormat();}
if(video.getHistoryStart()>0){sso+="&start="+video.getHistoryStart();}}
tvp.debug("[getSSOByVideo]sso = "+sso);return sso;}
function showInitOcxFail(container,errcode){var msg="";if(!tvp.$.isUndefined(errcode)){msg="<br/>错误码:OCX_"+QQLive.DEFINE.MSG.OCX_DISABLED+"_"+errcode;}
tvp.OcxPlayer.showInitOcxFail(container,msg,$me.width,$me.height);}
function funCallBack(funName){var args=Array.prototype.slice.call(arguments,1);var strFn="on"+funName;if(typeof $me[strFn]=="function"){$me[strFn].apply($me,args);}};this.onMsgCall=function(id,content){try{with(QQLive.DEFINE){switch(id){case MSG.OCX_EVT_ONMSG_LOADSTART:{if($me.params.type==tvp.PLAYTYPE.LIVE){curVideo.setChannelId(content);}
else{curVideo.setVid(content);}
funCallBack("change",content);break;}
case MSG.DRVPG_EVT_ALL_INITED:{funCallBack(EVENT.OCX_READY);break;}
case MSG.OCX_EVT_ONMSG_PLAYING:{funCallBack(EVENT.PLAY,content);break;}
case MSG.CTRLBAR_EVT_PAUSECLICK:case MSG.OCX_EVT_ONMSG_PAUSED:{funCallBack(EVENT.PAUSE);break;}
case MSG.CTRLBAR_EVT_FULLSCREENCLICK:{funCallBack(EVENT.FULLSCREEN_BTN_CLICK,content);break;}
case MSG.OCX_EVT_FULLSCREEN_SWITCH:{funCallBack(EVENT.FULLSCREEN,content);break;}
case MSG.OCX_EVT_ONMSG_STOPED:{funCallBack(EVENT.STOP);break;}
case MSG.OCX_EVT_ONMSG_FLV_PROGRAM_END:{funCallBack(EVENT.END);var nextVideo=$me.ongetnext(curVideo.getVid());if(!!nextVideo&&nextVideo instanceof tvp.VideoInfo){$me.play(nextVideo);}
break;}
case MSG.OCX_EVT_GET_QQ:{var uin=tvp.common.getUin(true),skey=tvp.common.getSKey(true);if(!!tvp.$.userAgent.ie){qqliveocxshell.setParam("uin",uin);qqliveocxshell.setParam("skey",skey);}
else{qqliveocxshell.SetParam("uin",""+uin);qqliveocxshell.SetParam("skey",""+skey);}
break;}
case MSG.OCX_EVT_ERROR:{funCallBack(extEventList[0],content);break;}
case MSG.DRVPG_EVT_DEBUGLOG:{QQLive.log(decodeURIComponent(content));break;}
case MSG.OCX_DISABLED:{showInitOcxFail(modId,INIT_FAIL_TYPE.OCX_KERNEL_DISABLE);break;}
case MSG.GET_VIDEO_CUR_TIME:{var s=content.split("|");dataset.curTime=s[0];dataset.totTime=s[1];break;}
default:funCallBack("msg",id,content);break;}}}
catch(e){};};var _ctrl={Play:function(url){if(!qqliveocxshell)
return;qqliveocxshell.Play(url);},Stop:function(){if(!qqliveocxshell)
return;qqliveocxshell.Stop();},Pause:function(){if(!qqliveocxshell)
return;qqliveocxshell.Pause();}};function saveCurVideo(videoinfo){if(videoinfo instanceof tvp.VideoInfo){videoinfo.clone(curVideo);}}
this.setClientLink=function(strValue){curSSO=strValue;};this.showPlayer=function(){if(!qqliveocxshell)
return;var width=""+$me.width,height=""+$me.height;if(width.indexOf("px")<0){width=parseInt(width)+"px";}
if(height.indexOf("px")<0){height=parseInt(height)+"px";}
qqliveocxshell.style.width=width;qqliveocxshell.style.height=height;}
this.hidePlayer=function(){if(!qqliveocxshell)
return;qqliveocxshell.style.width="1px";qqliveocxshell.style.height="1px";}
this.setCurVideo=function(videoinfo){saveCurVideo(videoinfo);this.addParam("url",getSSOByVideo());}
this.unInit=function(){if(!!tvp.$.userAgent.ie){qqliveocxshell.setParam("uninit","");}
else{qqliveocxshell.SetParam("uninit","");}}
this.getSSO=function(){return curSSO;};this.getCurVideo=function(){return curVideo;}
this.openClient=function(){QQLive.player.openClient($me.getSSO());}
this.addParam=function(k,v){k=k.toLowerCase();if(k in needToMapParam){k=needToMapParam[k];}
this.params[k]=v;if(k in QQLive.param.oldParam){oldParam[QQLive.param.oldParam[k]]=v;}
if(k=="webskin"){if(v.toLowerCase()=="local://webskin/bbweb.xml"){ocxurlParam[QQLive.param.driverurl.ctrlbar]=QQLive.config.CTRLSWF_W_URL;ocxurlParam[QQLive.param.driverurl.ctrlheight]="32";}}
else if(k in QQLive.param.playpage){playpageParam[QQLive.param.playpage[k]]=v;}
else if(k in QQLive.param.shell){shellParam[QQLive.param.shell[k]]=v;}
else if(k in QQLive.param.ocx){ocxParam[QQLive.param.ocx[k]]=v;}
else if(k in QQLive.param.driver){if(k=="type"){v=v!="1"?QQLive.DEFINE.VIDEOTYPE.VOD:QQLive.DEFINE.VIDEOTYPE.LIVE;}
ocxParam[QQLive.param.driver[k]]=v;}
else if(k in QQLive.param.driverurl){ocxurlParam[QQLive.param.driverurl[k]]=v;}
if($me.inited){qqliveocxshell.setParam(k,v);}};this.destory=function(){if(typeof this.beforeDestory=="function"&&this.beforeDestory()==false){return;}
QQLive.debug("ready to destory...");if((!!tvp.$.userAgent.ie)&&!!QQLive.installer.installerObj){try{QQLive.installer.installerObj.Destroy();QQLive.installer.installerObj=null;delete QQLive.installer.installerObj;QQLive.debug("destory successful");}
catch(e){QQLive.debug("destory failed");}}};this.getCtrl=function(){return _ctrl;};this.showIEPlayer=function(vElementId){var strHtml="";strHtml="<object id='"+config.shellId+"' width="+this.width;strHtml+=" height="+this.height;strHtml+=" classid=CLSID:";strHtml+=QQLive.config.SEHLL_CLSID;strHtml+=" standby=\"Loading Tencent QQ视频 componets...\">";for(var p in shellParam){if(shellParam[p]!=null){if(p==QQLive.param.shell.ocxurl){var _p=buildOcxUrlParam();if(_p.length>0){shellParam[p]+=(shellParam[p].indexOf("?")>0?"&":"?")+_p;}}
strHtml+=" <param name=\""+p+"\" value=\""+shellParam[p]+"\">";}}
strHtml+=" </object>";var container=tvp.$.get(vElementId);container.innerHTML=strHtml;qqliveocxshell=tvp.$.get(config.shellId);if(typeof qqliveocxshell.setParam=="undefined"){showInitOcxFail(container,INIT_FAIL_TYPE.IE_SHELL_DISABLE);return;}
for(var p in ocxParam){qqliveocxshell.setParam(p,ocxParam[p]);}
qqliveocxshell.setParam("width",this.width);qqliveocxshell.setParam("height",this.height);var _oid=tvp.$.getUrlParam("oid");if(!!_oid){qqliveocxshell.setParam("oid",""+_oid);}
qqliveocxshell.Init();qqliveocxshell.attachEvent("OnMsg",$me.onMsgCall);};this.showFFPlayer=function(vElementId){if(!tvp.$.userAgent.isNotIESupport()){return;}
var strHtml="";strHtml="<embed id=\""+config.shellId+"\" name=\""+config.shellId+"\" width="+this.width+" height="+this.height;strHtml+=" type=\"application/tecent-qqlive-plugin\">";var container=tvp.$.get(vElementId)
container.innerHTML=strHtml;qqliveocxshell=document.embeds[config.shellId];for(var p in shellParam){if(p==QQLive.param.shell.ocxurl){var _p=buildOcxUrlParam();if(_p.length>0)
shellParam[p]+="?"+_p;}
qqliveocxshell[p]=shellParam[p];}
try{qqliveocxshell.CreateAX("LiveOcxShell");}
catch(err){showInitOcxFail(container,INIT_FAIL_TYPE.CREATEAX_FAIL);return;}
if(typeof qqliveocxshell.SetParam!="function"){showInitOcxFail(container,INIT_FAIL_TYPE.NOIE_SETPARAM_FAIL);return;}
for(var p in ocxParam){var v=ocxParam[p]+"";qqliveocxshell.SetParam(p,v);}
var uin=tvp.common.getUin(true),skey=tvp.common.getSKey(true);qqliveocxshell.SetParam("uin",""+uin);qqliveocxshell.SetParam("skey",""+skey);qqliveocxshell.SetParam("width",$me.width+"");qqliveocxshell.SetParam("height",$me.height+"");var _oid=tvp.$.getUrlParam("oid");if(!!_oid){qqliveocxshell.SetParam("oid",""+_oid);}
try{qqliveocxshell.AddEventListener("OnMsg",$me.onMsgCall,false);}
catch(er){};qqliveocxshell.Init();};this.write=function(containerId){var container=tvp.$.get(containerId);if(!container)
return;if(!QQLive.param.getParamBool(shellParam.mousewheel)){QQLive.event.closeMousewheel();}
tvp.$.get(containerId).style.backgroundColor="#000000";if(!tvp.$.userAgent.windows){tvp.OcxPlayer.showNoticeTips(container,{title:"您的操作系统暂不支持腾讯视频播放器",width:this.width,height:this.height});return;}
if(!tvp.$.userAgent.isCanOcx()){tvp.OcxPlayer.showNoticeTips(container,{title:"您的浏览器暂不支持腾讯视频播放器",width:this.width,height:this.height});return;}
var bVerUsable=QQLive.version.check();if(!bVerUsable){tvp.OcxPlayer.showInstallerTips(container,this.width,this.height);return;}
if(!shellParam[QQLive.param.shell.ocxurl]){shellParam[QQLive.param.shell.ocxurl]=QQLive.config.OCX_URL;}
if(typeof shellParam[QQLive.param.shell.hidescripterr]=="undefined"){shellParam[QQLive.param.shell.hidescripterr]=false;}
funCallBack(extEventList[1],QQLive.DEFINE.MSG.NEW_OCX);if(!!tvp.$.userAgent.ie){$me.showIEPlayer(containerId);}
else if(tvp.$.userAgent.isNotIESupport()){$me.showFFPlayer(containerId);}
$me.onwrite(curVideo.getVid());this.inited=true;};this.play=function(video){if(tvp.$.isString(video)){this.write(video);return;}
if(video instanceof tvp.VideoInfo){var sso=getSSOByVideo(video);$me.getCtrl().Play(sso);saveCurVideo(video);$me.onchange(video.getFullVid());}};this.getPlaytime=function(){return dataset.curTime;};this.getTotaltime=function(){return dataset.totTime;}
this.callback=function(){};this.pause=function(){_ctrl.Pause();}};tvp.OcxPlayer.maxId=0;tvp.OcxPlayer.prototype=new tvp.BasePlayer();tvp.$.extend(tvp.OcxPlayer,{showNoticeTips:function(eleId,data){var ele=tvp.$.isString(eleId)?tvp.$.get(eleId):eleId;if(!ele){return;}
var info={width:"100%",height:"100%",title:"",msg:"",html:""};tvp.$.extend(info,tvp.OcxPlayer.NOTICE_INFO);tvp.$.extend(info,data);if(!isNaN(info.width)){info.width+="px";}
if(!isNaN(info.height)){info.height+="px";}
var str="";str+="<div style=\"width:"+info.width+";height:"+info.height+";text-align:center\">";str+=" <div style=\"margin:0px;padding:0px;display:table;overflow:hidden;margin:0 auto;height:"+info.height+";*position:relative;width:420px;text-align:left;\">";str+="  <div style=\"display:table-cell;vertical-align: middle;*position:absolute;top:50%;\">";str+="   <div style=\"margin:0px;*position:relative;*top:-50%;font-family:tahoma,arial,\/\/5b8b\/\/4f53;\">";if(info.html==""){str+="    <p style=\"height:26px;line-height:26px;color:#CD8902;text-align:center;font-size:16px;\">"+info.title+"</p>";str+="    <p style=\"text-align:center;font-size:12px;color:#cccccc;margin-top:16px;\">"+info.msg+"</p>";}
else{str+=info.html;}
str+="   </div>";str+="  </div>";str+=" </div>";str+="</div>";ele.innerHTML=str;},showInstallerTips:function(container,width,height){var $self=this;var link=QQLive.config.MEDIAPLAYER_DOWNLOAD_URL;tvp.OcxPlayer.getExeFileUrl({"onSuccess":function(json){if(!!json&&!!json.url){link=json.url;}},"onComplete":function(){var str="";str+="<p style=\"height:26px;line-height:26px;font:16px/1.5 tahoma,arial,\/\/5b8b\/\/4f53;color:#CD8902;padding-left:124px;background:url(http://i.gtimg.cn/qqlive/images/20121203/i1354506473_1.jpg) no-repeat 0 50%\">您尚未安装腾讯视频播放器或版本过低</p>";str+="<div style=\"text-align:center;font-size:12px;color:#cccccc;margin-top:16px;\">";str+=" <p>请安装腾讯视频播放器后观看</p>";str+=" <p style=\"margin-top:8px;\"><a target=\"_blank\" href=\""+link+"\" style=\"text-decoration:none;display:inline-block;_display:block;width:165px;height:40px;position:relative;text-indent:-9999px;background:url(http://imgcache.qq.com/mediastyle/tenvideo/css/img/pop_drm_btn.png?max_age=19830211&d=20130108171115);text-align:center;\">立即下载</a><div style='clear:both;float:left:height:0px;'></div></p>";str+="<p style=\"color:#ff9805;margin-top:20px;\">";if(tvp.$.userAgent.is64&&!!tvp.$.userAgent.ie){str+=" 您当前使用的是64位浏览器，请安装完成后切换到32位浏览器上观看";}
else{str+="安装完成后"+(tvp.$.userAgent.ie?"请刷新页面或按F5":"请重新启动浏览器");}
str+="<\/p>";str+="</div>";tvp.OcxPlayer.showNoticeTips(container,{html:str,width:width,height:height});}});},getExeFileUrl:function(callbacks){tvp.$.ajax({url:"http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=544&otype=json",dataType:"jsonp",success:function(json){if(typeof callbacks=="object"&&typeof callbacks.onSuccess=="function"){callbacks.onSuccess(json);}},error:function(){if(typeof callbacks=="object"&&typeof callbacks.onError=="function"){callbacks.onError();}},complete:function(){if(typeof callbacks=="object"&&typeof callbacks.onComplete=="function"){callbacks.onComplete();}}})},showInitOcxFail:function(container,extMsg,width,height){var _title="初始化播放器失败",_msg="播放器可能被当前浏览器禁用了，点击 <a href=\""+QQLive.config.OCX_DISABLED_MANUAL+"\" target=\"_blank\" style=\"text-decoration:underline;color:#ffffff\">此处</a> 查看启用方法";if(!tvp.$.userAgent.ie){_msg="播放器组件可能已损坏，请重新安装腾讯视频播放器"}
if(!!extMsg){_msg+=extMsg;}
tvp.OcxPlayer.showNoticeTips(container,{title:_title,msg:_msg,width:width,height:height});},NOTICE_INFO:{width:"100%",height:"100%",title:"",msg:"",html:""}});var QQLiveObject=tvp.OcxPlayer;QQLiveObject.instance=[];tvp.Player=function(vWidth,vHeight){var $me=this,shellParam={"player":"auto"},commonParam={"type":tvp.PLAYTYPE.VOD},playerParam={};var player=null,width=vWidth,height=vHeight,containerId="",curVideo=null,playerClass=null;this.addParam=function(k,v){if(k=="vid"&&tvp.$.isString(v)){curVideo=new tvp.VideoInfo();curVideo.setVid(v);}else if(k in shellParam){shellParam[k]=v;}else if(k in commonParam){shellParam[k]=v;playerParam[k]=v;}else{playerParam[k]=v;}}
this.setCurVideo=function(video){if(video instanceof tvp.VideoInfo)curVideo=video;}
function showPlayer(playerClass,autoplay){player=null;player=new playerClass(width,height);for(var p in playerParam){if(p in player.params){player.addParam(p,playerParam[p]);}}
if(!tvp.$.isUndefined(autoplay)){player.addParam("autoplay",autoplay);}
tvp.$.each(player.eventList,function(i,n){player["on"+n]=$me["on"+n]||tvp.emptyFn;});tvp.$.each(player.mapToShellFun,function(i,n){if(tvp.$.isFunction($me[n])){player[n]=$me[n];}});tvp.$.each(player.hijackFun,function(i,n){$me[n]=player[n];});player.setCurVideo(curVideo);player.write(containerId);}
function checkUseWhatLivePlayer(video,callback){video=video||curVideo;useDefaultLivePlayer();var isUseJsDefinePlayer=(playerClass==tvp.Html5Live),isError=false;if(!!video.getChannelId()){var checker=new tvp.livehub.FlashChecker();checker.cnlId=video.getChannelId();checker.onGetCnlId=function(cnlid,isLookBack){video.setChannelId(cnlid);video.setIsLookBack(!!isLookBack);}
checker.onCanFlash=function(cnlid){if(!isUseJsDefinePlayer)playerClass=tvp.FlashLivePlayer;}
checker.onCanHTML5=function(){if(!isUseJsDefinePlayer)playerClass=tvp.Html5Live;}
checker.onCanOCX=function(){if(!isUseJsDefinePlayer)playerClass=tvp.OcxPlayer;}
checker.onError=function(errcode){if(tvp.$.isFunction($me.onliveerror)&&!($me.onliveerror===tvp.emptyFn)){$me.onliveerror(errcode);isError=true;return;}else{useDefaultLivePlayer();}}
checker.onComplete=function(){if(isError)return;useParamLivePlayer();if(tvp.$.isFunction(callback)){callback.call($me);}}
checker.send();}else{useParamLivePlayer();if(tvp.$.isFunction(callback)){callback.call($me);}}}
function useParamLivePlayer(){switch(shellParam["player"]){case"flash":{playerClass=tvp.FlashLivePlayer;break;}
case"html5":{playerClass=tvp.Html5Live;break;}
case"ocx":{playerClass=tvp.OcxPlayer;break;}
case"mp4":{playerClass=tvp.MP4Link;}}}
function useDefaultLivePlayer(){if(tvp.common.isLiveUseHTML5()){playerClass=tvp.Html5Live;}else if(!!tvp.$.userAgent.android){playerClass=tvp.FlashLivePlayer;}else{playerClass=tvp.FlashLivePlayer;}}
function useDefaultVodPlayer(){if(tvp.common.isEnforceMP4()){playerClass=tvp.MP4Link;return;}
if(tvp.common.isUseHtml5()){playerClass=tvp.Html5Player;}else if(tvp.$.userAgent.android>=4){playerClass=tvp.MP4Link;}else{playerClass=tvp.FlashPlayer;}}
function reportTJ(){var h=document.location.host,playername="flash",supportMP4=tvp.common.isSupportMP4();if(playerClass===tvp.Html5Player){playername="html5player";}else if(playerClass===tvp.FlashPlayer){playername="flashplayer";}else if(playerClass===tvp.OcxPlayer){playername="ocx";}else if(playerClass===tvp.Html5Live){playername="html5live";}else if(playerClass===tvp.FlashLivePlayer){playername="flashlive";}
tvp.report({"cmd":"2551","type":1,"host":h,"url":document.location.href,"ua":navigator.userAgent,"ver":"$Rev: 41363 $","str1":playername,"int1":supportMP4?1:0});}
function render(id){if(shellParam.type==tvp.PLAYTYPE.LIVE){checkUseWhatLivePlayer(curVideo,function(){showPlayer(playerClass)});}else{switch(shellParam["player"]){case"flash":{playerClass=tvp.FlashPlayer;break;}
case"html5":{playerClass=tvp.Html5Player;break;}
case"ocx":{playerClass=tvp.OcxPlayer;break;}
case"mp4":{playerClass=tvp.MP4Link;break;}
default:{useDefaultVodPlayer();break;}}
showPlayer(playerClass);}}
this.write=function(id){if(!id)return;containerId=id;render(id);try{reportTJ();}catch(err){}}
this.switchPlayer=function(playerType){if(playerType=="ocx"){if(player instanceof tvp.OcxPlayer)return;showPlayer(tvp.OcxPlayer,true);}else if(playerType=="flash"){if(player instanceof tvp.FlashLivePlayer)return;showPlayer(tvp.FlashLivePlayer,true);}};this.switchToOcx=function(){this.switchPlayer("ocx");}
this.switchToFlash=function(){this.switchPlayer("flash");}
this.play=function(video){if(shellParam.type==tvp.PLAYTYPE.LIVE){checkUseWhatLivePlayer(video,function(){if(player instanceof playerClass){player.play(video);}else{showPlayer(playerClass,true);}});}else{player.play(video);}}
window.TenVideo_FlashLive_SwitchPlayer=function(){$me.switchToOcx();}}
tvp.Player.prototype=new tvp.BasePlayer();tvp.Player.instance=[];/*  |xGv00|b4b0472a21da4dbc97e4013218068da6 */