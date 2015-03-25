/*
 * Date:2015/03/25
 * Name:DisoSi
 */

(function($){
	var posterPicMobile = function(option){
		if(typeof(arguments[0]) == 'undefined'){ return false; }
		var option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.domid = option.id;
		this.dom = document.getElementById(this.domid);
		this.delay = option.delay;
		this.data = option.data;
		if(this.data.length == 0){ return; }
		
		this.pic = {width: 414, height: 207}//预设图片高度，动态获取会因图片加载延迟造成获取不到
		this.limit = 9;//最大限制9张
		this.total = this.data.length > this.limit ? this.limit : this.data.length;
		this.current = -1;
		this.items = [];//所有图片组
		this.thumbs = [];//所有点点组
		this.timer = null;
		this.locked = false;
		this.imgplace = '../images/bx_loader.gif';
		this.pos_start = 0;
		
		this.init();
	}
	
	posterPicMobile.prototype = {
		readdata: function(){//打印数据上去
			this.dompic = document.createElement('div');
			this.dompic.className = 'pic';
			this.dompicul = document.createElement('ul');
			this.dompager = document.createElement('div');
			this.dompager.className = 'pager';
			this.dompagerul = document.createElement('ul');
						
			for(var i=0; i<this.total; i++){//遍历全部图片
				var _data = this.data[i];
				var _li = document.createElement('li');
				_li.setAttribute('index', i);
				_li.innerHTML = '<a href=' + _data.url + ' target="_blank" title="' + _data.title + '"><img src="'+ this.imgplace +'" _src="'+ _data.img +'" /></a>';
				this.items.push(_li);
				
				var _thumb = document.createElement('li');
				_thumb.setAttribute('index', i);
				this.thumbs.push(_thumb);
				this.dompagerul.appendChild(_thumb);
			}
			
			this.dom.appendChild(this.dompic);
			this.dompic.appendChild(this.dompicul);
			this.dom.appendChild(this.dompager);
			this.dompager.appendChild(this.dompagerul);
			
		},
		inititem: function(index){
			return this.dompicul.appendChild(this.items[index]);
		},
		loadimage: function(index){
			var _img = this.items[index].getElementsByTagName('IMG')[0];
			if(_img.getAttribute('_src')){
				_img.setAttribute('src', _img.getAttribute('_src'));
				_img.removeAttribute('_src');	
			}
		},
		setPicSize: function(){//设置图片大小，第一次和调整屏幕的时候都要调用
			var pic = this.dompic;
			var w = this.dom.offsetWidth;
			var imgWidth = this.pic.width;
			var imgHeight = this.pic.height;
			pic.style.width = w + "px";
			pic.style.height = w / imgWidth * imgHeight + "px";
		},
		stop: function(){
			clearInterval(this.timer);
			this.timer = null;
		},
		show: function(index, type){
			if(this.locked){ return; }
			if(index == this.current){ return; }
			this.locked = true;
			
			var direction = '';
			var _rect = document.getElementById(this.domid).offsetWidth;
			if(type == 'keep-right'){
				direction = 'right';
			}else if(type == 'keep-left'){
				direction = 'left';
			}
			this.thumbs[index].className = 'current';	
			this.thumbs[this.current].className = '';
			
			var next = this.inititem(index);
			if(direction == 'left'){
				next.style.left = _rect + 'px';
			}else{
				next.style.left = - _rect + 'px';
			}
			
			var _this = this;
			var _pos = parseInt(this.dompicul.style.left ? this.dompicul.style.left : 0, 10);
			$(this.dompicul).animate({left: ((direction == 'left') ? _pos - _rect : _pos + _rect) + 'px'}, 500, function(){
				_this.loadimage(index);
				_this.items[index].style.left = '0px';
				_this.dompicul.style.left = '0px';
				_this.dompicul.removeChild(_this.items[_this.current]);
				_this.current = index;
				_this.locked = false;
			});
		},
		prev: function(type){
			var index = this.current == 0 ? this.total - 1 : this.current - 1; 
			this.show(index, type);	
		},
		next: function(type){
			var index = this.current + 1 == this.total ? 0 : this.current + 1; 
			this.show(index, type);
		},
		bind: function(){//绑定事件
			var _this = this;
			window.onresize = function(){ _this.setPicSize(); }
			this.dompic.ontouchstart = function(e){
				_this.stop();//先暂停，滑动完后再开始计时
				_this.pos_start = e.targetTouches[0].pageX;
			};
			this.dompic.ontouchmove = function(e){
				var e = e.targetTouches[0];
				var end = e.pageX;
				var offset = end - _this.pos_start;
				if(offset >= 10){
					_this.prev('keep-right');
					return false;
				}else if(offset <= -10){ 
					_this.next('keep-left');
					return false;
				}	
			}
			this.dompic.ontouchend = function(){
				_this.start();
			};
		},
		start: function(){
			var _this = this;
			if(this.timer){ return; }
			this.timer = setInterval(function(){
				_this.next('keep-left');
			}, this.delay);
			this.setPicSize();
		},
		init: function(){//初始化
			this.readdata();
			this.inititem(0);
			this.loadimage(0);
			this.current = 0;
			this.thumbs[0].className = 'current';
			
			this.bind();
			
			if(this.total > 1){
				this.start(); 
			}
		}
	}
	
	
	window.posterPicMobile = posterPicMobile;
})(Zepto)