
$(document).ready(function(){
	//点击切换隐藏内容
	$('#list1 a').click(function(){$('#lists1').show();$('#lists2,#lists3,#lists4').hide();$('#list2 a,#list3 a,#list4 a').removeClass();$("#list1 a").addClass("current"); 
	});
	$('#list2 a').click(function(){$('#lists2').show();$('#lists1,#lists3,#lists4').hide();$('#list1 a,#list3 a,#list4 a').removeClass();$("#list2 a").addClass("current"); 
	});
	$('#list3 a').click(function(){$('#lists3').show();$('#lists2,#lists1,#lists4').hide();$('#list2 a,#list1 a,#list4 a').removeClass();$("#list3 a").addClass("current"); 
	});
	$('#list4 a').click(function(){$('#lists4').show();$('#lists2,#lists3,#lists1').hide();$('#list2 a,#list3 a,#list1 a').removeClass();$("#list4 a").addClass("current"); 
	});

	//分类
	$("#qq").mouseover(function(){$('#qqs').show();});
	$("#qqs").mouseover(function(){$('#qqs').show();});
	$("#qq").mouseout(function(){$('#qqs').hide();});
	$("#qqs").mouseout(function(){$('#qqs').hide();});
		
	$("#mess").mouseover(function(){$('#messs').show();});
	$("#messs").mouseover(function(){$('#messs').show();});
	$("#mess").mouseout(function(){$('#messs').hide();});
	$("#messs").mouseout(function(){$('#messs').hide();});

	$("#report").mouseover(function(){$('#reports').show();});
	$("#reports").mouseover(function(){$('#reports').show();});
	$("#report").mouseout(function(){$('#reports').hide();});
	$("#reports").mouseout(function(){$('#reports').hide();});


	$("#back-to-top").hide(); 
		$(function () { 
			$(window).scroll(function(){ 
				if ($(window).scrollTop()>100){ 
					$("#back-to-top").fadeIn(500); 
				} 
				else 
				{ 
					$("#back-to-top").fadeOut(500); 
				} 
			}); 
		$("#back-to-top").click(function(){ 
		$('body,html').animate({scrollTop:0},100); 
		return false; 
		}); 
	}); 

});

function copyToClipBoard(){ 
	var clipBoardContent=''; 
	clipBoardContent+=window.location; 
    try{
		if(window.clipboardData)
		{
			window.clipboardData.setData("Text",clipBoardContent);
		}
		else if (navigator.userAgent.indexOf("MSIE") == -1)
		{
		  alert("您的浏览器不支持此功能,您可以更换浏览器或手工复制");
		  return false;
		}
	}
	catch(e)
	{
	}
	alert("复制成功");
}
function Favorite() {
     alert("抱歉，您的浏览器不支持此功能！");
}


function addFavorite() {
    var url = window.location.href;
    var title = document.title;
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作，请使用Ctrl+D进行添加");
        }
    }
}
