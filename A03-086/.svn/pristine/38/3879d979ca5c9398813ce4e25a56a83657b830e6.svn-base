/* Another format of Gallery */

var MIMultiPic = {
	init: function(mpics) {
		var pics = mpics;
		if (!mpics) pics = document.querySelectorAll(".multi-pic");
		for (var i = 0; i < pics.length; i++) {
			this.makeMultiPic(pics[i]);
		}
	},

	makeMultiPic : function (pic) {
		if (!pic.id) pic.id = "RT-" + uuid.v4();
		pic.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "multi-pic-down");
		});

		pic.addEventListener(MIGlobals.eventTouchMove, function(e) {
			this.setAttribute("data-moved", "y");
		});

		pic.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(this, "multi-pic-down");
			if (this.getAttribute("data-moved") == "y") return false;
			
			var galleryTitle = this.getAttribute("data-title");
			if (!galleryTitle) {
				var fcaption = document.querySelector("#" + this.id + " > figcaption");
				if (fcaption) {
					galleryTitle = fcaption.textContent;
				}
			}
			if (!galleryTitle) galleryTitle = "Untitled";
			var images = document.querySelectorAll("#" + this.id + " > div.multi-img > img");
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
			log(galleryURL);
			if (MIGlobals.isRunningInMosoBooks) {
				document.location.href = galleryURL;
			} 
		});

		
	}
};