window.onload=function(){
	var music=document.getElementById('music');
    var audio=document.getElementsByTagName("audio")[0];
    var page1=document.getElementById('page1');
    var page2=document.getElementById('page2');
    var page3=document.getElementById('page3');
    
    //当音乐播放完停止时，自动停止光盘旋转效果
    audio.addEventListener("ended",function(){
    	music.setAttribute('class','');
    	//music.style.animationPlayState=="paused";
    },false);

//点击音乐图标，控制播放效果
/*music.onclick=function(){
	if (audio.paused) {/*如果是暂停，就播放
		audio.play();
		this.setAttribute('class','play');
	}
	else{
		audio.pause()
		this.setAttribute('class','')
	}
  }*/
 
 //手机端
 music.addEventListener("touchstart",function(event){
 	if (audio.paused) {/*如果是暂停，就播放*/
		audio.play();
		this.setAttribute('class','play');
	}
	else{
		audio.pause()
		this.setAttribute('class','')
	}
 },false)
 
 page1.addEventListener("touchstart",function(event){
 	 page1.style.display="none";
 	 page2.style.display="block";
 	 page3.style.display="block";
 	 page3.style.top="100%";
 },false)
 
 page2.addEventListener("touchstart",function(event){
 	 page1.style.display="none";
 	 page2.style.display="block";
 	 page3.style.display="block";
 	 page3.style.top="100%";
 	 setTimeout(function(){
 	 	page2.setAttribute("class","page fadeout")
 	 	page3.setAttribute("class","page fadein")
 	 },5500)
 },false)
 
}

