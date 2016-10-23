// 旅游景观美学画廊板式1
var MIGalleryD1 = {
	init: function(galleries) {
		var gs = galleries;
		if (!gs) gs = document.querySelectorAll(".gallery-d1");
		for (var i = 0; i < gs.length; i++) {
			var g = gs[i];
			if (!g.id) g.id = "RT-" + uuid.v4();
			g.addEventListener(MIGlobals.eventTouchStart, function(e) {
				this.setAttribute("data-moved", "n");
				var p = MIPoint.pointFromEvent(e);
				var touchedEle = document.elementFromPoint(p.clientX, p.clientY);
				if (touchedEle) {
					if (MIGlobals.hasClass(touchedEle, "gallery-d1-img")) {
						MIGlobals.addClass(touchedEle, "dow");
					} else if (MIGlobals.hasClass(touchedEle, "gallery-d1-button")) {
						MIGlobals.addClass(touchedEle, "dow");
					} else if (MIGlobals.hasClass(touchedEle.parentElement, "gallery-d1-button")) {
						MIGlobals.addClass(touchedEle.parentElement, "dow");
					}else if (MIGlobals.hasClass(touchedEle.parentElement, "gallery-to")) {
						MIGlobals.addClass(touchedEle.parentElement, "dow");
					}
				}
			});
			if (MIGlobals.isTouchSupported) {
			g.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			});
		}
			g.addEventListener(MIGlobals.eventTouchEnd, function(e) {
				var touchedEle = document.querySelector("#" + this.id).querySelector("img.dow");
				var touchedImgSrc = null;
				if (touchedEle) {
					touchedImgSrc = touchedEle.getAttribute("src");
					MIGlobals.removeClass(touchedEle, "dow");
				}

				touchedEle = document.querySelector("#" + this.id + " > div.gallery-d1-button.dow");
				if(touchedEle) {
					MIGlobals.removeClass(touchedEle, "dow");
				}

				if (this.getAttribute("data-moved") == "y") return false;
				
				var images = document.querySelector("#" + this.id).querySelectorAll(".gallery-d1-img");
				var galleryTitleEle = document.querySelector("#" + this.id + " > div.gallery-d1-button");
				var galleryTitleDle = document.querySelector("#" + this.id);
				var galleryTitle = "Untitled Gallery";
					
				if (galleryTitleEle) {
					galleryTitle = galleryTitleEle.textContent;
				}else{
					galleryTitle = galleryTitleDle.getAttribute("data-title");
				}

				var imgCount = images.length;

				var params = {
					'title': galleryTitle.trim(),
					'imgCount' : imgCount,
					'index' : 0
				};
				for (var i = 0; i < images.length; i++) {
					var image = images[i];
					params["title" + i]  = image.getAttribute("data-title");
					imgSrc = image.getAttribute("src");
					if (imgSrc == touchedImgSrc) params['index'] = i;
					if(imgSrc.indexOf("-s.png")>-1){
						imgSrc = imgSrc.replace("-s.png", ".png");
					}else{
						imgSrc = imgSrc.replace("-s.jpg", ".jpg");
					}
					params["imgSrc" + i] = MIPathUtil.resolve(document.location.href, imgSrc).substring(MIGlobals.contextRoot.length);
					params["desc" + i]   = image.getAttribute("data-desc");
				}
				var galleryURL = URLBuilder.buildURLString("/gallery", params);
				log(galleryURL);
				// log(galleryTitle)
				if (MIGlobals.isRunningInMosoBooks) {
					document.location.href = galleryURL;
				} 

			});
		}
	}
};