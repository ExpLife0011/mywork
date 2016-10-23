var MILargeImage = {
	scale: 1,
	newScale: 1,
	scaleString: "scale(1.0)",
	translateString: "translate(0px, 0px)",
	startX: 0,
	startY: 0,
	startDistance: 1,
	lastX: 0,
	lastY: 0,
	stopX: 0,
	stopY: 0,

	/** 为页面中有大图的图片注册事件
	 */
	makeLargeImages: function (hasLargeImages) {
		var imgs = hasLargeImages || document.getElementsByClassName("has-large-image");
		for (var i = imgs.length; i--;) {
			var img = imgs[i];
			this.makeLargeImage(img);
		}
	},

	makeLargeImage: function (eleDiv) {
		eleDiv.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(eleDiv, "has-large-image-down");
		}, false);

		if (MIGlobals.isTouchSupported) {
			eleDiv.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			}, false);

			eleDiv.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(eleDiv, "has-large-image-down");
			}, false);
		}
		
		eleDiv.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(eleDiv, "has-large-image-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}
			var imgSrc = eleDiv.getAttribute("data-img-src");
			var title = eleDiv.getAttribute("data-title");
			var desc = MIGlobals.attrOrElementContent(eleDiv, "data-desc");
			var imgChapterId = this.getAttribute("data-chapter-uuid");
			var imgSectionId = this.getAttribute("data-section-uuid");
			var imgFileId = this.getAttribute("data-uuid");
			var url = null;
			if (MIGlobals.isRunningInMosoBooks) {
				var params = [];
				params["title"] = title;
				params["imgCount"] = 1;
				params["imgSrc0"] = imgSrc;
				params["desc0"] = desc;
				
			if (imgChapterId) {

				params["chapter_id"]= imgChapterId;
				params["section_id"]= imgSectionId;
				params["file_id"]= imgFileId;

				};
				var url = URLBuilder.buildURLString("/gallery", params);
				 window.location.href = url;
				log(url)
			} else {
				url = MIGlobals.format("%s/META-INF/large-img.html?imgSrc=%s&title=%s&description=%s",
																				MIGlobals.contextRoot,
																				encodeURIComponent(MIGlobals.contextRoot + imgSrc),
																				encodeURIComponent(title),
																				encodeURIComponent(desc));
				window.open(url);
			}
		}, false );
	},

	addGestureOnImage: function(imgElement) {
		if (!MIGlobals.isTouchSupported) {
			log("Your device does not support touch!");
			return false;
		}
		if (!imgElement) {
			log("Empty imgElement to add gesture");
			return false;
		}

		imgElement.addEventListener("touchstart", function(e) {
			if (e.touches.length != 2) return false;
			e.preventDefault();
			MILargeImage.lastX = e.touches[0].pageX;
			MILargeImage.lastY = e.touches[0].pageY;
			MILargeImage.startX = MILargeImage.lastX;
			MILargeImage.startY = MILargeImage.lastY;
			if (e.touches.length == 2) {
				MILargeImage.startDistance = MIGlobals.distance(e.touches[0].pageX, e.touches[0].pageY,
										e.touches[1].pageX, e.touches[1].pageY);
			}
		});

		imgElement.addEventListener("touchmove", function(e) {
			if (e.touches.length != 2) return false;

				e.preventDefault();
				var x = e.touches[0].pageX;
				var y = e.touches[0].pageY;
				// At the first version of double fingers scaling 
				// We can make the image persistent on scale other than 1, so we need save the scale when the scaling begins
				// At this version, when the gesture ends, the image will restore to it's oringinal state
				MILargeImage.stopX += (x - MILargeImage.lastX) / MILargeImage.scale;
				MILargeImage.stopY += (y - MILargeImage.lastY) / MILargeImage.scale;
				MILargeImage.lastX = x;
				MILargeImage.lastY = y;
				MILargeImage.translateString = MIGlobals.format("translate(%spx, %spx)", (MILargeImage.stopX), (MILargeImage.stopY));

				if (e.touches.length == 2 && MILargeImage.startDistance != -1) {
					var newDistance = MIGlobals.distance(e.touches[0].pageX, e.touches[0].pageY,
											e.touches[1].pageX, e.touches[1].pageY);
					MILargeImage.newScale = MILargeImage.scale * (newDistance / MILargeImage.startDistance);
					MILargeImage.scaleString = "scale(" + MILargeImage.newScale + ")";
				}

				var transformString = MILargeImage.scaleString + " " + MILargeImage.translateString;
				e.target.style.webkitTransform = transformString;
		});

		imgElement.addEventListener("touchend", function(e) {
			MILargeImage.restoreLargeImageState(imgElement);
		});
		imgElement.addEventListener("touchcancel", function(e) {
			MILargeImage.restoreLargeImageState(imgElement);
		});
	},

	restoreLargeImageState: function(imgElement) {
		MILargeImage.startDistance = -1;
		//scale = newScale;
		MILargeImage.scale = 1.0;
		MILargeImage.stopX = 0;
		MILargeImage.stopY = 0;
		imgElement.style.webkitTransitionDuration = "0.3s";
		imgElement.style.webkitAnimationTimingFunction = "ease-out";
		imgElement.style.webkitTransform = "scale(1) translate(0px, 0px)";
		setTimeout(function() {
			imgElement.style.webkitTransitionDuration = 0;
		}, 300);
	}
};



