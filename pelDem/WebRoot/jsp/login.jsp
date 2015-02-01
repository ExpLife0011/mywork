<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>pmp</title>
<script type="text/javascript" src="js/jquery-1.5.1.min.js"></script>


<link rel="stylesheet" type="text/css" href="css/register.css"/>

</head>
<body>
<div class='signup_container'>

    <h1 class='signup_title'>用户登陆</h1>
    <img src='images/people.png' id='admin'/>
    <div id="signup_forms" class="signup_forms clearfix">
            <form class="signup_form_form" name="form" id="signup_form" method="post" action="login.html">
                    <div class="form_row first_row">
                        <label for="signup_email">请输入用户名</label><div class='tip ok'></div>
                        <input type="text" name="loginname" placeholder="请输入用户名" id="loginname" data-required="required">
                    </div>
                    <div class="form_row">
                        <label >请输入密码</label><div class='tip error'></div>
                        <input type="password" name="password" placeholder="请输入密码" id="password" >
                    </div>
           </form>
    </div>

    <div class="login-btn-set"><div class='rem'>记住我</div> <a href='javascript:check()' class='login-btn'></a></div>
    <p class='copyright'>版权所有 安诺优达</p>
</div>

</body>

<script type="text/javascript">

		$(function(){
			$('#loginname').focus();
		});

		document.onkeydown = function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode==13){ // Enter
				check();
			}
		}


		function check(){
			if($("#loginname").val()==""){
				//$("#nameerr").show();
				//$("#nameerr").html("用户名不得为空！");
				alert("用户名不得为空！");
				$("#loginname").focus();
				return false;
			}
			if($("#password").val()==""){
				//$("#pwderr").show();
				//$("#pwderr").html("密码不得为空！");
				alert("密码不得为空！");
				$("#password").focus();
				return false;
			}
			document.form.submit()
		}


</script>

</html>