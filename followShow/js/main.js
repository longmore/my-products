var hover_dir = {
	wrapper: $(".major-list")[0],
	box: $(".major-item"),
	target: $(".back-face"),
	bindEvent: function(){
		var that = hover_dir;
		var mouse_pos, x, y, stop_bubble;
		for(var i = 0; i < that.box.length; i++){
			(function(n){
				$.addEvent(that.box[n], "mouseover", function(event){
					event = $.getEvent(event);
					var relatedT = $.getRelatedTarget(event);
					console.log(relatedT);
					if(!$.contains(that.box[n], relatedT)){
						var child = that.box[n].childNodes[0];
						$.stopPropagation(event);
						$.removeClass(that.target[n], "to-left") ||
						$.removeClass(that.target[n], "to-right") ||
						$.removeClass(that.target[n], "to-top") ||
						$.removeClass(that.target[n], "to-bottom");
						x = event.pageX;
						y = event.pageY;
						mouse_pos = {"x": x, "y": y};
						var dir = $.get_dir(that.box[n], mouse_pos);
						switch(dir){
							case "left":
								$.addClass(that.target[n], "from-left");
								break;
							case "right":
								$.addClass(that.target[n], "from-right");
								break;
							case "top":
								$.addClass(that.target[n], "from-top");
								break;
							case "bottom":
								$.addClass(that.target[n], "from-bottom");
								break;
							default: break;
						}
					}
				});
				$.addEvent(that.box[n], "mouseout", function(event){
					event = $.getEvent(event);
					var relatedT = $.getRelatedTarget(event);
					if(!$.contains(that.box[n], relatedT)){
						$.removeClass(that.target[n], "from-left") ||
						$.removeClass(that.target[n], "from-right") ||
						$.removeClass(that.target[n], "from-top") ||
						$.removeClass(that.target[n], "from-bottom");
						x = event.pageX;
						y = event.pageY;
						mouse_pos = {"x": x, "y": y};
						var dir = $.get_dir(that.box[n], mouse_pos);
						switch(dir){
							case "left": 
								$.addClass(that.target[n], "to-left");
								break;
							case "right": 
								$.addClass(that.target[n], "to-right");
								break;
							case "top": 
								$.addClass(that.target[n], "to-top");
								break;
							case "bottom":
								$.addClass(that.target[n], "to-bottom");
								break;
							default: break;
						}
					}	
				});
			})(i);
		}},
	init: function(){
		hover_dir.bindEvent();
	}
};
hover_dir.init();

