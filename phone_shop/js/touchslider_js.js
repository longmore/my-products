//轮播图 开始
$(document).ready(function(){
	
	 var div = document.getElementById("main_visual");
	 var main_visual_width = div.style.width || div.clientWidth || div.offsetWidth || div.scrollWidth;
	 var main_visual_height = document.getElementById("main_visual").style.height;
	 document.getElementById("main_visual").style.height = parseInt(main_visual_width*333/1024)+"px";
	 document.getElementById("main_image").style.height = parseInt(main_visual_width*333/1024)+"px";
	fn();//原点居中
	$(".main_visual").hover(function(){
		$("#btn_prev,#btn_next").fadeIn()
	},function(){
		$("#btn_prev,#btn_next").fadeOut()
	});
	
	
	$dragBln = false;
	
	$(".main_image").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev"),
		btn_next : $("#btn_next"),
		paging : $(".flicking_con a"),
		counter : function (e){
			$(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	$(".main_image").bind("mousedown", function() {
		$dragBln = false;
	});
	
	$(".main_image").bind("dragstart", function() {
		$dragBln = true;
	});
	
	$(".main_image a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$("#btn_next").click();
	}, 3000);
	
	$(".main_visual").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		},3000);
	});
	
	$(".main_image").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		}, 3000);
	});
	
});

//设置div的高度
window.onresize=function(){
 var div = document.getElementById("main_visual");
 var main_visual_width = div.style.width || div.clientWidth || div.offsetWidth || div.scrollWidth;
 var main_visual_height = document.getElementById("main_visual").style.height;
 document.getElementById("main_visual").style.height = parseInt(main_visual_width*333/1024)+"px";
 document.getElementById("main_image").style.height = parseInt(main_visual_width*333/1024)+"px";
 fn();
}
function fn()
{
  var flickingDiv=document.getElementById("flicking_con");
  var cw=document.documentElement.clientWidth || document.body.clientWidth;//获取当前屏幕的宽度   
  var m=flickingDiv.offsetWidth;
  var n=(cw-m)/2;
  flickingDiv.style.left=n+"px";
}
//轮播图 结束
