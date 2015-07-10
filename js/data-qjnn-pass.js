(function(window){
	var QjnnPass = function(option){
		if(typeof(arguments[0]) == 'undefined') return false;
		var option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.datapass = option;
		this.o = {crumbs:0,chapter:0};//crumbs翻页层级,chapter具体大章
		this.init();
	}
	QjnnPass.prototype = {
		showpass: function(){
			$("#passlist").addClass("hide");
			$("#pass").removeClass("hide");
			this.o.crumbs = 0;
		},
		showpasslist: function(){
			var _datapass = this.datapass[this.o.chapter];
			_html = '';
			
			$("#header").removeClass("hide");//ios专用
			$("#pass").addClass("hide");
			$("#passdetail").addClass("hide");
			$("#passlist").removeClass("hide");
			this.o.crumbs = 1;
			
			for(var i=0; i<_datapass.length; i++){
				_html += '<a href="javascript:;" class="item" data-id="'+_datapass[i].id+'"><div><span>'+_datapass[i].name+'</span></div></a>';
			}
			$("#passlist").html(_html);
		},
		showpassdetail: function(){
			var _id = arguments[0],
			_data = this.datapass[this.o.chapter],
			passdetail = $("#passdetail");
			
			$("#passlist").addClass("hide");
			passdetail.removeClass("hide");
			this.o.crumbs = 2;
			
			for(var i=0; i<_data.length; i++){
				if(_id == _data[i].id){
					passdetail.html('<div class="title">'+_data[i].name+'</div><div class="welcome">欢迎加入奇迹暖暖交流群:466280299</div><div class="content">'+_data[i].p+'</div>');
					break;
				}
			}
		},
		events: function(){
			var that = this;
			//点击章节
			$("#pass").children(".item").click(function(){
				var _chapter = Number($(this).attr("data-chapter"));
				
				that.o.chapter = _chapter;
				that.showpasslist();
			});
			//点击具体某篇文章
			$("#passlist").on("click", ".item", function(){
				var _id = Number($(this).attr("data-id"));
				that.showpassdetail(_id);
			});
			
			$("#header").on("click", ".wblogo_index", function(){
				if(that.o.crumbs == 0){
					//window.jstojava.close();//android顶部返回按钮
				}else if(that.o.crumbs == 1){
					$("#header").addClass("hide");//ios专用
					that.showpass();
				}else if(that.o.crumbs == 2){
					that.showpasslist();
				}
			});
		},
		init: function(){
			this.events();
		}
	}
	
	window.QjnnPass = QjnnPass;
})(window);

//var data = [[{id:78,name:"1-1公主级"},{id:78,name:"1-1公主级"}],[{id:78,name:"1-1公主级"},{id:78,name:"1-1公主级"}]];