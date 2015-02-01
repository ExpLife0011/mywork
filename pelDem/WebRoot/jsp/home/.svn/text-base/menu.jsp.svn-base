<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>


<script type="text/javascript">
$(function(){	
	//导航切换
	$(".menuson .header").click(function(){
		var $parent = $(this).parent();
		$(".menuson>li.active").not($parent).removeClass("active open").find('.sub-menus').hide();
		
		$parent.addClass("active");
		if(!!$(this).next('.sub-menus').size()){
			if($parent.hasClass("open")){
				$parent.removeClass("open").find('.sub-menus').hide();
			}else{
				$parent.addClass("open").find('.sub-menus').show();	
			}
			
			
		}
	});
	
	// 三级菜单点击
	$('.sub-menus li').click(function(e) {
        $(".sub-menus li.active").removeClass("active")
		$(this).addClass("active");
    });
	
	$('.title').click(function(){
		var $ul = $(this).next('ul');
		$('dd').find('.menuson').slideUp();
		if($ul.is(':visible')){
			$(this).next('.menuson').slideUp();
		}else{
			$(this).next('.menuson').slideDown();
		}
	});
})	
</script>


</head>

<body style="background:#f0f9fd;">
	<div class="lefttop"><span></span></div>
    
    <dl class="leftmenu">
    
    
    	    <c:forEach items="${menuList}" var="menu">
    			<dd>
				<c:if test="${menu.hasMenu}">
    			<div class="title">
    			<span><img src="${ctx }/images/leftico02.png" /></span>${menu.menuName }
				</div>
					<ul class="menuson">
					<c:forEach items="${menu.subMenu}" var="sub">
						<c:if test="${sub.hasMenu}">
						<c:choose>
							<c:when test="${not empty sub.menuUrl}">
							<li><cite></cite><a href="${ctx }/${sub.menuUrl }" target="rightFrame">${sub.menuName }</a><i></i></li>
							</c:when>
							<c:otherwise>
							<li><cite></cite><a href="javascript:void(0);" target="rightFrame">${sub.menuName }</a><i></i></li>
							</c:otherwise>
						</c:choose>
						</c:if>
					</c:forEach>
					</ul>
				</c:if>
				</dd> 
			</c:forEach>
    </dl>
    
</body>
</html>
