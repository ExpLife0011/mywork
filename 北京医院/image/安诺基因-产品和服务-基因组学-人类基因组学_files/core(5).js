(function(b){var a=[{key:"t",value:function(){var f="";try{f=b.title}catch(a){}return f.substring(0,100)}},{key:"k",value:function(){var a="";try{if(b.getElementsByTagName("meta"))for(var c in b.getElementsByTagName("meta")){var d=b.getElementsByTagName("meta")[c];b.getElementsByTagName("meta").hasOwnProperty(c)&&d.getAttribute("name")&&"keywords"==d.getAttribute("name").toLowerCase()&&(a=d.getAttribute("content"))}}catch(e){}return a.substring(0,100)}}],c="http://w.c-cnzz.com/core.php?",e=b.createElement("script");
for(i in a)a.hasOwnProperty(i)&&(c+=a[i].key+"="+encodeURIComponent(a[i].value())+"&");e.src=c+"cid=30003628&_="+ +new Date;b.body.appendChild(e)})(document);