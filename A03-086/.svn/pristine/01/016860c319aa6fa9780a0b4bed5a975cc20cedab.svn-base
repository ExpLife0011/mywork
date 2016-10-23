// In page gallery

// Globals variants for gallery
var MIGallery = {
	lastX : 0,
	lastY : 0,
	startX : 0,
	startY : 0,
	moveDirection : null,
	action : null,  // Moving or scaling the image

	// global vars for scaling
	scaleString: "scale(1.0)",
	translateString: "translate(0px, 0px)",
	startDistance: 1.0,
	currentIndex: 0,          // 当前显示图片的下标
	currentImgElement: null,  // 单页大图画廊，当前显示的图片元素
	implMethod: "native",     // 画廊的实现方式，native为本地代码实现，web为Web页面实现

	/** 初始化页内画廊的按钮事件
	 */
	makeInpageGalleries: function (inpageGalleries) {
		var gs = inpageGalleries || document.querySelectorAll("div.inpage-gallery");
		if (gs) {
			for (var i = gs.length; i--;) {
				var g = gs[i];
				this.makeInpageGallery(g.id);
			}
		}
	},

	/**
	 * {imageAreaId: 'a', buttonId: 'buttonId'}
	 *
	 */
	makeInpageGallery: function  (galleryId, options) {
		var galleryArea = $(galleryId);
		var scrollBox = galleryArea.querySelector("div.inpage-gallery-scroll-box");
		var scrollcontainer = scrollBox.querySelector("div.inpage-gallery-scroll-container");
		var descriptionEle = galleryArea.querySelector("div.inpage-gallery-text-box > div.inpage-gallery-description");
		var btnHref = galleryArea.querySelector("div.inpage-gallery-text-box > div.inpage-gallery-href");
		var btnPre = scrollBox.querySelector("img.inpage-gallery-button-prev");
		var btnNext = scrollBox.querySelector("img.inpage-gallery-button-next");
		btnPre.style.display = "none";
		btnNext.style.display = "block";
		var imges = scrollcontainer.querySelectorAll("div > img");
		var imageCount = imges.length; //parseInt(galleryArea.getAttribute("data-image-count"), 10);
		var w = scrollBox.clientWidth;
		var h = scrollBox.clientHeight;

		var currentIndex = 0;
		// gallery button

		btnHref.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "gallery-button-down");
		},false);

		btnHref.addEventListener(MIGlobals.eventTouchEnd, function(e){
			MIGlobals.removeClass(this,"gallery-button-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}
			var galleryHref = this.getAttribute("data-href");
			var target = this.getAttribute("data-target");
			var scrollEnabled = this.getAttribute("data-scroll-enable");
			var url = null;
			if (MIGlobals.isRunningInMosoBooks) {
				if (MIGallery.implMethod === "native") {
					log("Preparing for native gallery implementation");
					var request = new XMLHttpRequest();
					var galleryPageURL = URLBuilder.buildFullURL(document.URL, galleryHref);
					request.open("GET", galleryPageURL);

					request.onreadystatechange = function() {
						log("request.readyState = " + request.readyState);
						if (request.readyState === 4) {
							var elt = document.createElement("div");
							var frag = document.createDocumentFragment();

							elt.innerHTML = request.responseText;
							frag.appendChild(elt);
							var images = frag.querySelectorAll("div.gallery-image-box > img");
							var desces = frag.querySelectorAll("div#desc-box > span");
							var params = [];
							params["title"] = frag.querySelector("#gallery-title").textContent;
							params["imgCount"] = images.length;
							// alert(MIGlobals.contextRoot);
							for (var i = 0; i < images.length; i++) {
								params["title" + i] = images[i].getAttribute("alt");
								params["imgSrc" + i] = URLBuilder.buildFullURL(galleryPageURL, images[i].getAttribute("data-src")).substring(MIGlobals.contextRoot.length);
								params["desc" + i] = desces[i].textContent;
							}

							var galleryURL = URLBuilder.buildURLString("/gallery", params);
							log(galleryURL);
							window.location.href = galleryURL;
						}
					};

					request.send(null);
				} else {
					url = MIGlobals.format("/jump?href=%s&target=_blank&scrollEnabled=NO", encodeURIComponent(galleryHref));
					window.location.href = url;
				}
				
			} else {
				url = this.getAttribute("data-href");
				window.open(url);
			}
		},false);

		if (MIGlobals.isTouchSupported) {
			btnHref.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			}, false);

			btnHref.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this,"gallery-button-down");
			}, false);
		}


		btnPre.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.style.opacity = "1.0";
		},false);
		btnPre.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			this.style.opacity = "0.7";
			currentIndex -= 1;
			scrollcontainer.style.left = -(currentIndex * w) + "px";
			if (currentIndex < imageCount - 1) {
				btnNext.style.display = "block";
			}
			if (currentIndex == 0) {
				this.style.display = "none";
			}
			var imageElement = scrollcontainer.querySelector(MIGlobals.format("div.inpage-gallery-img:nth-child(%s) > img", currentIndex + 1)); //$(galleryId +"-img-" + currentIndex);
			var description = imageElement.getAttribute("data-description");
			descriptionEle.innerHTML = description;
		},false);

		btnNext.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.style.opacity = 1.0;
		},false);
		btnNext.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			this.style.opacity = 0.7;
			currentIndex += 1;
			scrollcontainer.style.left = -(currentIndex * w) + "px";
			if (currentIndex > 0) {
				btnPre.style.display = "block";
			}
			if (currentIndex == imageCount - 1) {
				this.style.display = "none";
			}
			var imageElement = scrollcontainer.querySelector(MIGlobals.format("div.inpage-gallery-img:nth-child(%s) > img", currentIndex + 1));
			var description = imageElement.getAttribute("data-description");
			descriptionEle.innerHTML = description;
		}, false);
	},

	/** 初始化单页画廊
	 */
	makeGallery: function() {
		var imageArea = $("gallery-image-area");
		imageArea.setAttribute("data-current-index", 0);
		var imges = imageArea.querySelectorAll("div#gallery-image-scroll-box > div.gallery-image-box > img");
		var imageCount = imges.length;
		imageArea.setAttribute("data-image-count", imageCount);
		log("total image count: " + imageCount);

		for (var i = imges.length; i--;) {
			imges[i].setAttribute("data-img-index", i);
		}

		var containerWidth = imageArea.clientWidth;
		var containerHeight = imageArea.clientHeight;
		log("preload large image 0");
		this.loadAndPreloadLargeImages(0);

		var thumbnailBoxes = document.querySelectorAll("div#gallery-thumbnail-scroll-box > div");
		for (var i = thumbnailBoxes.length; i--;) {
			var thumbnailBox = thumbnailBoxes[i];
			thumbnailBox.setAttribute("data-index", i);
			thumbnailBox.addEventListener(MIGlobals.eventTouchStart, function(e) {
				this.setAttribute("data-moved", "n");
			});
			
			thumbnailBox.addEventListener(MIGlobals.eventTouchEnd, function(e){
				if (this.getAttribute("data-moved") == "y") {
					return false;
				}
				var sid = this.getAttribute("data-index");
				var index = parseInt(sid, 10);
				MIGallery.showImage(index);
			});

			if (MIGlobals.isTouchSupported) {
				thumbnailBox.addEventListener(MIGlobals.eventTouchMove, function(e) {
					this.setAttribute("data-moved", "y");
				});
				thumbnailBox.addEventListener(MIGlobals.eventTouchCancel, function(e){
					// this.setAttribute("data-moved", "n");
				}); 
			}
		}
		
		var scrollBox = $("gallery-image-scroll-box");
		if (MIGlobals.isTouchSupported) {
			scrollBox.addEventListener(MIGlobals.eventTouchStart, MIGallery.imageScrollBoxOnTouchStart, false);
			scrollBox.addEventListener(MIGlobals.eventTouchEnd,  MIGallery.imageScrollBoxOnTouchEnd, false);
			scrollBox.addEventListener(MIGlobals.eventTouchMove,  MIGallery.imageScrollBoxOnTouchMove, false);
			scrollBox.addEventListener(MIGlobals.eventTouchCancel,  MIGallery.imageScrollBoxOnTouchCancel, false);
		}
	},

	loadLargeImage: function (imgElement) {
		if (imgElement.getAttribute("data-loaded") && imgElement.getAttribute("data-loaded") == "y") {
			return false;
		}

		var objImg = new Image();
		objImg.setAttribute("data-img-index", imgElement.getAttribute("data-img-index"));
		objImg.addEventListener("load", function(e) {
				var imageArea = $("gallery-image-area");
				var containerWidth = imageArea.clientWidth;
				var containerHeight = imageArea.clientHeight;
				// var loadingBox = $("gallery-loading");
				var imgIndex = parseInt(this.getAttribute("data-img-index"), 10);
				var s = MIGlobals.format("div#gallery-image-scroll-box > div:nth-child(%s) > img", imgIndex + 1);
				// log(s);
				var imgElement = document.querySelector(s);
				imgElement.src = this.src;
				MIGlobals.centerImage(this, imgElement, containerWidth, containerHeight, 10);
				imgElement.style.visibility = "visible";
				imgElement.setAttribute("data-loaded", "y");
			}, false);

		if (imgElement.getAttribute("data-src")) {
			objImg.src = imgElement.getAttribute("data-src");
		} else {
			objImg.src = imgElement.src;
		}
	},

	loadAndPreloadLargeImages: function (index) {
		if (index < 0) return false;

		var objImg = new Image();
		var eleImages = document.querySelectorAll("div#gallery-image-scroll-box > div > img");
		if (index >= eleImages.length) return false;

		var eleImg = eleImages[index];
		if (!eleImg.getAttribute("data-loaded")) {
			this.loadLargeImage(eleImages[index]);
		} 
		
		setTimeout(function(e) {
			if (index > 0) {
				var prevImg = eleImages[index - 1];
				if (!prevImg.getAttribute("data-loaded")) {
					MIGallery.loadLargeImage(prevImg);
				} 
			}

			if (index < eleImages.length - 1) {
				var nextImg = eleImages[index + 1];
				if (!nextImg.getAttribute("data-loaded")) {
					MIGallery.loadLargeImage(nextImg);
				} 
			}
		}, 5);
	},

	showImage: function (index) {

		var iw = 676;
		var scrollBox = $("gallery-image-scroll-box");

		MIGlobals.addClass(scrollBox, "gallery-image-scroll-box-move");
		var imageArea = $("gallery-image-area");
		var currentIndex = parseInt(imageArea.getAttribute("data-current-index"), 10);

		var ii = parseInt(index, 10);
		if (isNaN(ii)) {
			ii = 0;
		}
		
		MIGallery.loadAndPreloadLargeImages(ii);

		if (currentIndex != ii) {
			document.querySelector(MIGlobals.format("#gallery-thumbnail-scroll-box > div:nth-child(%s) > img", currentIndex + 1)).style.opacity = "0.4";
			document.querySelector(MIGlobals.format("#gallery-thumbnail-scroll-box > div:nth-child(%s) > img", ii + 1)).style.opacity = "1.0";
			imageArea.setAttribute("data-current-index", ii);
		}

		scrollBox.style.left = -(ii * iw) + "px";
		$("gallery-image-description").innerHTML = document.querySelector(MIGlobals.format("div#desc-box > span:nth-child(%s)", ii + 1)).innerHTML;

		var currentThumbnail = document.querySelector(MIGlobals.format("#gallery-thumbnail-scroll-box > div:nth-child(%s) > img", ii + 1));
		currentThumbnail.scrollIntoViewIfNeeded();
		setTimeout(function(){
			MIGlobals.removeClass($("gallery-image-scroll-box"), "gallery-image-scroll-box-move");
		}, 300);
	},

	showPrevImage: function () {
		var imageArea = $("gallery-image-area");
		var currentIndex = parseInt(imageArea.getAttribute("data-current-index"), 10);
		if (currentIndex == 0) {
			MIGallery.showImage(0);
		} else {
			MIGallery.showImage(currentIndex - 1);
		}
	},

	showNextImage: function () {
		var imageArea = $("gallery-image-area");
		var currentIndex = parseInt(imageArea.getAttribute("data-current-index"), 10);
		var imageCount = parseInt(imageArea.getAttribute("data-image-count"), 10);
		if (currentIndex == imageCount - 1) {
			MIGallery.showImage(imageCount - 1);
		} else {
			MIGallery.showImage(currentIndex + 1);
		}
	},

	imageScrollBoxOnTouchStart: function (e) {
		if (e.touches.length > 2) return false;
		

		var p = MIPoint.pointFromEvent(e);
		MIGallery.lastX = p.pageX;
		MIGallery.lastY = p.pageY;
		MIGallery.startX = p.pageX;
		MIGallery.startY = p.pageY;

		if (e.touches.length == 1) {
			MIGallery.action = "move";
		} else if (e.touches.length == 2) {
			MIGallery.action = "scale";
			MIGallery.startDistance = MIGlobals.distance(e.touches[0].pageX, e.touches[0].pageY,
									e.touches[1].pageX, e.touches[1].pageY);
			var imageArea = $("gallery-image-area");
			var currentIndex = parseInt(imageArea.getAttribute("data-current-index"), 10);
			MIGallery.currentImgElement = document.querySelector(MIGlobals.format("div#gallery-image-scroll-box > div:nth-child(%s) > img", currentIndex + 1));
		}

		log("action in touchStart " + MIGallery.action);
		e.preventDefault();
	},

	imageScrollBoxOnTouchMove: function (e) {
		if (e.touches.length > 2) {
			MIGallery.resetGalleryState();
			return false;
		};

		e.preventDefault();
		var p = MIPoint.pointFromEvent(e);

		if (MIGallery.action == "move") {
			var x = p.pageX;
			var deltaX = x - MIGallery.lastX;
			var distanceX = x - MIGallery.startX;
			// log(distanceX); 
			var left = this.offsetLeft;
			var newLeft = left + deltaX;
			MIGallery.lastX = x;
			this.style.left = newLeft + "px";
			if (distanceX < -100) {
				MIGallery.moveDirection = "L";
			} else if (distanceX > 100) {
				MIGallery.moveDirection = "R";
			} else {
				MIGallery.moveDirection = "NO-MOVE";
			}
		} else if (MIGallery.action == "scale") {
			if (e.touches.length != 2) {
				MIGallery.resetGalleryState();
				return false;
			}
			var x = p.pageX;
			var y = p.pageY;
			var scaledDeltaX = x - MIGallery.startX;
			var scaledDeltaY = y - MIGallery.startY;
			MIGallery.lastX = x;
			MIGallery.lastY = y;
			var newDistance = MIGlobals.distance(e.touches[0].pageX, e.touches[0].pageY,
									e.touches[1].pageX, e.touches[1].pageY);
			var newScale = newDistance / MIGallery.startDistance;
			MIGallery.translateString = MIGlobals.format("translate(%spx, %spx)", (scaledDeltaX), (scaledDeltaY));
			MIGallery.scaleString = "scale(" + newScale + ")";
			var transformString = MIGallery.scaleString + " " + MIGallery.translateString;

			MIGallery.currentImgElement.style.webkitTransform = transformString;
		}
	},

	imageScrollBoxOnTouchEnd: function (e) {
		MIGallery.resetGalleryState();
	},

	imageScrollBoxOnTouchCancel: function(e) {
		MIGallery.action = null;
		MIGallery.moveDirection = null;
		MIGallery.resetGalleryState();
	},


	resetGalleryState: function () {
		if (MIGallery.action == "move") {
			if (MIGallery.moveDirection == "L") {
				MIGallery.showNextImage();
			} else  if (MIGallery.moveDirection == "R") {
				MIGallery.showPrevImage();
			} else {
				var imageArea = $("gallery-image-area");
				var currentIndex = parseInt(imageArea.getAttribute("data-current-index"), 10);
				MIGallery.showImage(currentIndex);
			}
		} else if (MIGallery.action == "scale") {
			var imageArea = $("gallery-image-area");
			var currentIndex = parseInt(imageArea.getAttribute("data-current-index"), 10);
			var imgEle = MIGallery.currentImgElement;
			imgEle.style.webkitTransitionDuration = "0.3s";
			imgEle.style.webkitAnimationTimingFunction = "ease-out";
			imgEle.style.webkitTransform = "translateZ(0) scale(1) translate(0px, 0px)";
			setTimeout(function() {
				imgEle.style.webkitTransitionDuration = 0;
			}, 300);
		}
		MIGallery.moveDirection = null;
		MIGallery.startX = 0;
		MIGallery.startY = 0;
		MIGallery.lastX = 0;
		MIGallery.lastY = 0;
		MIGallery.startDistance = 0;
		MIGallery.action = null;
		MIGallery.currentImgElement = null;
	}
};








