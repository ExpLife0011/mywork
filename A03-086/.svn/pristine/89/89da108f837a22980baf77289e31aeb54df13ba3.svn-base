var MIResGallery = {
	init: function(galleries) {
		var theGalleries = galleries ? galleries : document.querySelectorAll(".res-gallery");
		for (var i = 0; i < theGalleries.length; i++) {
			var gallery = theGalleries[i];

			MIGlobals.makeTouchableButton(gallery);
			gallery.addEventListener(MIGlobals.eventTouchEnd, function(evt) {
				var images = this.querySelectorAll("img");
				var params = {
					'title': this.getAttribute("data-title"),
					'imgCount' : images.length,
					'index' : 0
				};
				for (var j = 0; j < images.length; j++) {
					var image = images[j];
					params["title" + j]  = image.getAttribute("data-title");
					var imgSrc = image.getAttribute("src");
					if (imgSrc.endsWith(".png")) {
						imgSrc = imgSrc.replace("-s.png", ".png");
					} else {
						imgSrc = imgSrc.replace("-s.jpg", ".jpg");
					}
					params["imgSrc" + j] = MIPathUtil.resolve(document.location.href, imgSrc).substring(MIGlobals.contextRoot.length);
					params["desc" + j]   = image.getAttribute("data-desc"); 
				}
				var galleryURL = URLBuilder.buildURLString("/gallery", params);
				log('galleryURL = ' + galleryURL);
				if (MIGlobals.isRunningInMosoBooks) {
					document.location.href = galleryURL;
				} 
				//else {
				// 	log(galleryURL);
				// }
			});
		}
	}
};
