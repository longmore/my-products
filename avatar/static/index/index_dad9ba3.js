define("avatar:static/index/index",function(n){expotrs=function(){function i(){return"admin"==a("input[name=inputName]").val()&&"123456"==a("input[name=inputPwd]").val()?!0:!1}function t(){o.animate({height:"0",top:"50%"},500).animate({width:"2px",left:"50%"},500).fadeOut(200,function(){l.fadeIn(200),l.animate({width:"100%",left:"0"},500),l.animate({height:"100%",top:"0"},500)})}var a=jQuery,e=(a(".login-layout").clone(),a(".main-box").clone(),n("avatar:widget/menu/menu"));e.init(),a(".j_login_in").click(function(){i()?(u.init(),a(".login-box").addClass("animated aSlideRightOut"),a(".welcome-box").css("display","block").addClass("animated aSlideTopIn").find(".welcome-name").html("Tom"),window.setTimeout(t,3500)):(a(".login-message-tip .error").show(),a(".login-box").addClass("animated shake"),setTimeout(function(){a(".login-box").removeClass("animated shake")},1200))});var o=a(".login-layout"),l=a(".main-box"),u={init:function(){this.config={menu:MENU,blocks:BLOCKS,userInfo:{name:"Tom",age:"16",sex:"boy",level:"SC-1A"}},this.login()},loadData:function(){},render:function(){},layout:function(){},bindEvent:function(){},login:function(){}}}()});