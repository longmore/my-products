$(document).ready(function(){

	var form = document.getElementById('registerForm');
	var tcd = document.getElementById('tcId');
	console.log(form);
	console.log(tcd);
	var username = document.getElementById('username');
	var password = document.getElementById('password');
	var password2 = document.getElementById('password2');
	var email = document.getElementById('email');
	var tel = document.getElementById('tel');
	var inputArr = form.getElementsByTagName('input');
	var submit = document.getElementById('submitBtn');
	for (var i = 0; i < inputArr.length; i++) {
		inputArr[i].flag = false;
	};
	username.onblur = function(){//用户名验证
		var reg = /[a-zA-Z0-9\u4e00-\u9fa5]{6,16}/;
		chechReg(this, reg);
	}
	password.onblur = function(){
		var reg = /(?!^\d+$)(?!^a-zA-Z+$).{6,16}/;
		password.temp = this.value;
		chechReg(this, reg);
	}
	password2.onblur = function(){
		var value = password.temp;
		var reg = new RegExp('^' + value + '$');
		chechReg(this, reg, value);
	}
	email.onblur = function(){
		var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		chechReg(this, reg);
	}
	tel.onblur = function(){
		var reg = /^1\d{10}$/;
		chechReg(this, reg);
	}
	function chechReg(obj, reg, value){
		var value = value || obj.value;
		console.log(value.length);
		if(!reg.test(value) || !value){
			$(obj).parent().next().addClass('error');
			obj.flag = false;
		}else{
			$(obj).parent().next().removeClass('error');
			obj.flag = true;
		}
	}
	/*
	 submit.onclick = function(){

	 for (var i = 0; i < inputArr.length; i++) {
	 //inputArr[i].flag = true;
	 if(inputArr[i].flag){
	 alert('成功')
	 }else{
	 alert('不成功')
	 return;
	 }
	 };
	 }*/
});
