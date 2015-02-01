<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<script type="text/javascript">
$(function(){	
	//顶部导航切换
	$(".nav li a").click(function(){
		$(".nav li a.selected").removeClass("selected");
		$(this).addClass("selected");
	})	
})	
</script>
</head>

<body style="background:url(${ctx }/images/topbg.gif) repeat-x;">
    <div class="topleft">
    <a href="main.html" target="_parent"></a>
    </div>
        
    <ul class="nav">
    <li><a href="${ctx }/home/left.html?topParentId=a" target="leftFrame" class="selected"><img src="${ctx }/images/icon01.png" title="系统管理" /><h2>系统管理</h2></a></li>
    <li><a href="${ctx }/home/left.html?topParentId=b" target="leftFrame"><img src="${ctx }/images/icon02.png" title="项目管理" /><h2>项目管理</h2></a></li>
    <li><a href="${ctx }/home/left.html?topParentId=c"  target="leftFrame"><img src="${ctx }/images/icon03.png" title="实验中心" /><h2>实验中心</h2></a></li>
    <li><a href="${ctx }/home/left.html?topParentId=d"  target="leftFrame"><img src="${ctx }/images/icon04.png" title="信息分析中心" /><h2>信息分析中心</h2></a></li>
    <li><a href="${ctx }/home/left.html?topParentId=e" target="leftFrame"><img src="${ctx }/images/icon05.png" title="系统组" /><h2>系统组</h2></a></li>
    <li><a href="${ctx }/home/left.html?topParentId=f"  target="leftFrame"><img src="${ctx }/images/icon06.png" title="项目汇总" /><h2>项目汇总</h2></a></li>
    </ul>
            
    <div class="topright">    
    <ul>
    <li><span><img src="${ctx }/images/help.png" title="帮助"  class="helpimg"/></span><a href="#">帮助</a></li>
    <li><a href="#">关于</a></li>
    <li><a href="${ctx }/logout.html" target="_parent">退出</a></li>
    </ul>
     
    <div class="user">
    <span>
    	<c:choose>
    		<c:when test="${not empty sessionScope.sessionUser }">
    			${sessionScope.sessionUser.username }
    		</c:when>
    		<c:otherwise>
    			异常用户
    		</c:otherwise>
    	</c:choose>
    </span>
    
    <i onclick="parent.showMessage()" style="cursor: hand;">消息</i>
    <b onclick="parent.showMessage()" style="cursor: hand;">5</b>    
    </div>    
    
    </div>

</body>
</html>

