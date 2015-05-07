//点击菜单按钮，二级菜单显示和隐藏
$(document).ready(function(){
var height=document.body.clientHeight;

$("#covers").css("height",height+"px");

	$("#menu_button").click(function(){
		$("#firstpane").slideDown(300);
		$(this).hide();
		$("#menu_button_up").show();
		$("#covers").show();
	});
	
	$("#menu_button_up").click(function(){
		//alert('sdf');
		$("#firstpane").slideUp(300);
		$(this).hide();
		$("#menu_button").show();
		$("#covers").hide();
	});

});
//三级菜单显示和隐藏
$(document).ready(function(){

	$("#firstpane .menu_body:eq(0)").hide();
	$("#firstpane h3.menu_head").click(function(){
		$(this).addClass("current").next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
		$(this).siblings().removeClass("current");
	});
	$("#covers").click(function(){
		$("#menu_button_up").trigger("click");
	});
	
});
