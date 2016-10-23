// 手机上的图片换成高清图。
var PhoneImg = {
	init: function(phoneimg) {
		if (MIGlobals.isRunningPhone) {

		// if(MIGlobals.isRunningPhone){
			setTimeout(function(){
		var hdImg = document.querySelectorAll("img");
		for (var i = 0; i < hdImg.length; i++) {
			
			var img = hdImg[i];
			log(hdImg.length)
			var src = img.getAttribute("src");
			log(src)
			if (src) {
				var newSrc;
				if (src.indexOf("@2x")>=0) {
					continue;
				};
				if (src.indexOf(".jpg") >= 0) {
					newSrc = src.replace(/.jpg/g, "@2x.jpg");
				} else if (src.indexOf(".png") >= 0) {
					newSrc = src.replace(/.png/g, "@2x.png");
				}
				img.setAttribute("src", newSrc);
			}

		};
			},10);
	
		// }
	}
	}
};