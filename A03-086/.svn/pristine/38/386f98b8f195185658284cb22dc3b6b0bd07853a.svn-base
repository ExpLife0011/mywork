// 页面内容部显示一张图片，但是点击之后是一个画廊
var MIOneToMany = {
	init: function(one2manyPics) {
		var pics = one2manyPics;
		if (!pics) pics = document.querySelectorAll(".one-to-many");
		for (var i = 0; i < pics.length; i++) {
			var pic = pics[i];
			if (!pic.id) pic.id = "RT-" + uuid.v4();
			if (MIGlobals.isTouchSupported) {
			MIGlobals.makeTouchableButton(pic);
		}
			pic.addEventListener(MIGlobals.eventTouchEnd, function(e) {
				var galleryTitle = this.getAttribute("data-title");
				if (!galleryTitle) {
					var fcaption = document.querySelector("#" + this.id + " > figcaption");
					if (!fcaption) {
						galleryTitle = fcaption.textContent;
					} else {
						galleryTitle = "Untitled";
					}
				}

				var images = this.querySelectorAll("#" + this.id + " > div > img");
				var imgCount = images.length;
				var params = {
					'title': galleryTitle,
					'imgCount' : imgCount
				};
				var imgSrc = null;
				for (var i = 0; i < imgCount; i++) {
					var image = images[i];
					params["title" + i]  = image.getAttribute("data-title");
					imgSrc = image.getAttribute("src");
					imgSrc = imgSrc.replace("-s.jpg", ".jpg");
					params["imgSrc" + i] = MIPathUtil.resolve(document.location.href, imgSrc).substring(MIGlobals.contextRoot.length);
					params["desc" + i]   = image.getAttribute("data-full-description");
				}
				var galleryURL = URLBuilder.buildURLString("/gallery", params);
				if (MIGlobals.isRunningInMosoBooks) {
					document.location.href = galleryURL;
				} else {
					log(galleryURL);
				}
			});
		}
	}
};