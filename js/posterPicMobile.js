/*
 * Date:2015/03/25
 * Name:DisoSi
 */

(function($){
	var posterPicMobile = function(){
		if(arguments[0] === undefined) return false;
		this.option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		if(this.option.data.length == 0) return;
		
		this.o = {
			dom: document.getElementById(this.option.id),
			domw: 0,
			dompic: document.createElement('div'),
			dompicul: document.createElement('ul'),
			delay: this.option.delay,
			data: this.option.data,
			pic: {width: 414, height: 207},//预设图片高度，动态获取会因图片加载延迟造成获取不到
			limit: 9,//最大限制9张
			total: 0,
			current: 0,
			pics: [],//所有图片组
			thumbs: [],//所有点点组
			timer: null,
			locked: false
		};
		this.o.total = this.o.data.length > this.o.limit ? this.o.limit : this.o.data.length;
		
		this.init();
	}
	
	posterPicMobile.prototype = {
		posterShow: function(index, direction){
			if(this.o.locked) return;
			if(index == this.o.current) return;
			
			var that = this,
				rect = that.o.domw,
				next = that.initPic(index),
				dompiculLeft = parseInt(that.o.dompicul.style.left ? that.o.dompicul.style.left : 0, 10);
				
			that.o.locked = true;
			that.o.thumbs[index].className = 'current';	
			that.o.thumbs[that.o.current].className = '';
			
			if(direction == 'keep-left'){
				next.style.left = rect + 'px';
			}else{
				next.style.left = - rect + 'px';
			}
			
			$(this.o.dompicul).animate({left: ((direction == 'keep-left') ? dompiculLeft - rect : dompiculLeft + rect) + 'px'}, 500, function(){
				that.o.dompicul.removeChild(that.o.pics[that.o.current]);
				that.o.pics[index].style.left = '0px';
				that.o.dompicul.style.left = '0px';
				that.o.current = index;
				that.o.locked = false;
			});
		},
		posterPrev: function(){
			var index = this.o.current == 0 ? this.o.total - 1 : this.o.current - 1; 
			this.posterShow(index, 'keep-right');	
		},
		posterNext: function(){
			var index = this.o.current + 1 == this.o.total ? 0 : this.o.current + 1; 
			this.posterShow(index, 'keep-left');
		},
		setPicSize: function(){//设置图片大小，第一次和调整屏幕的时候都要调用
			if(this.o.total < 1) return;
			var w = this.o.dom.offsetWidth,
				imgWidth = this.o.pic.width,
				imgHeight = this.o.pic.height;
			
			this.o.domw = w;
			this.o.dom.style.height = w / imgWidth * imgHeight + "px";
			this.o.dompic.style.height = w / imgWidth * imgHeight + "px";
		},
		posterStop: function(){
			clearInterval(this.o.timer);
		},
		posterStart: function(){
			var that = this;
			
			that.o.timer = setInterval(function(){
				that.posterNext();
			}, that.o.delay);
		},
		events: function(){//绑定事件
			var that = this,
				touchStarX,
				touchMoveX,
				distanceX;
			
			window.onresize = function(){
				that.setPicSize();
			};
			
			that.o.dom.ontouchstart = function(e){
				that.posterStop();//先暂停，滑动完后再开始计时
				touchStarX = e.targetTouches[0].pageX;
			};
			that.o.dom.ontouchmove = function(e){
				touchMoveX = e.targetTouches[0].pageX;
				distanceX = touchMoveX - touchStarX;

				if(distanceX >= 20){
					that.posterPrev();
					return false;
				}else if(distanceX <= -20){ 
					that.posterNext();
					return false;
				}
			};
			that.o.dom.ontouchend = function(){
				that.posterStart();
			};
		},
		initPic: function(index){
			return this.o.dompicul.appendChild(this.o.pics[index]);
		},
		printHtml: function(){//打印数据上去
			var dompager = document.createElement('div'),
				dompagerul = document.createElement('ul'),
				piece,
				li,
				thumb;
			
			this.o.dompic.className = 'pic';
			dompager.className = 'pager';
			
			for(var i=0; i<this.o.total; i++){//遍历全部图片
				piece = this.o.data[i];
				li = document.createElement('li');
				li.setAttribute('data-index', i);
				li.innerHTML = '<a href="'+piece.url+'" target="_blank" title="'+piece.title+'"><img src="'+piece.img+'" /></a>';
				this.o.pics.push(li);
				
				thumb = document.createElement('li');
				thumb.setAttribute('data-index', i);
				if(i == 0){
					thumb.className = 'current';
				}
				this.o.thumbs.push(thumb);
				dompagerul.appendChild(thumb);
			}
			
			this.initPic(0);
			this.o.dompic.appendChild(this.o.dompicul);
			dompager.appendChild(dompagerul);;
			this.o.dom.appendChild(this.o.dompic);
			this.o.dom.appendChild(dompager);
		},
		init: function(){//初始化
			this.printHtml();
			this.events();
			this.setPicSize();
			
			if(this.o.total > 1){
				this.posterStart(); 
			}
		}
	}
	
	
	window.posterPicMobile = posterPicMobile;
})(jQuery)