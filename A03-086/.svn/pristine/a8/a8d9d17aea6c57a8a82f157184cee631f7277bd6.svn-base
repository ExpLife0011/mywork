var MIImageTest = {
	imgTop: 0,
	imgLeft: 0,
	imgWidth1: 0,
	imgHeight1: 0,
	scaleFactor: 1.0,
	defaultFontSize: 18,
	currentSelected: null,

	init: function() {

		var dw = $("#img-area").clientWidth;
		var dh = $("#img-area").clientHeight;
		var img = new Image();
		img.addEventListener("load", function(e) {
			var ratio = 1;
			// if (!MIGlobals.isEmpty(navigator.userAgent) && navigator.userAgent.indexOf("OS 6") != -1) {
				ratio = parseInt(window.devicePixelRatio, 10);
				if(!ratio) {
					ratio = 1;
				}
			// }

			MIImageTest.imgWidth1 = this.naturalWidth / ratio;
			MIImageTest.imgHeight1 = this.naturalHeight / ratio;
			
			MIImageTest.imgLeft = 0;
			MIImageTest.imgTop = 0;

			if (MIImageTest.imgWidth1 < dw) {
				MIImageTest.imgLeft = (dw - MIImageTest.imgWidth1) / 2;
			}

			if (MIImageTest.imgHeight1 < dh) {
				MIImageTest.imgTop = (dh - MIImageTest.imgHeight1) / 2;
			}
			var eleImg = $("#mir-test-img");
			eleImg.style.top = MIImageTest.imgTop + "px";
			eleImg.style.left = MIImageTest.imgLeft + "px";
			eleImg.style.width = MIImageTest.imgWidth1 + "px";

			$("mir-test-img").src = img.src;
			MIImageTest.createHotSpotElements();
		}, false);
		img.src= $("mir-test-img").getAttribute("data-src");
	},

	createHotSpotElements : function() {
		var c = $("#img-area");
		var i;
		for (i = 0 ; i < hotspots.length; i++) {
			var hs = hotspots[i];
			var eleDiv = document.createElement("div");
			eleDiv.style.top = (MIImageTest.imgTop - 2) + hs.top * MIImageTest.scaleFactor + "px";
			eleDiv.style.left = (MIImageTest.imgLeft -2) + hs.left * MIImageTest.scaleFactor + "px";
			eleDiv.style.width = hs.width * MIImageTest.scaleFactor + "px";
			eleDiv.style.height = hs.height * MIImageTest.scaleFactor + "px";
			eleDiv.style.lineHeight = hs.height + "px";
			eleDiv.className = "hotspot-box hotspot-box-normal hotspot-box-hide-answer";
			eleDiv.id = "HS" + i;
			eleDiv.innerHTML = "?";
			if (hs.height < 18) {
				eleDiv.style.fontSize = hs.height - 4 + "px";
				eleDiv.style.lineHeight = hs.height + "px";
			} 

			eleDiv.addEventListener(MIGlobals.eventTouchStart, MIImageTest.hotspotBoxOnTouchStart);
			eleDiv.addEventListener(MIGlobals.eventTouchMove, MIImageTest.hotspotBoxOnTouchMove);
			eleDiv.addEventListener(MIGlobals.eventTouchEnd, MIImageTest.hotspotBoxOnTouchEnd);
			eleDiv.addEventListener(MIGlobals.eventTouchCancel, MIImageTest.hotspotBoxOnTouchCancel);
			c.appendChild(eleDiv);
		}
	},

	hotspotBoxOnTouchStart: function(e) {
		if (MIImageTest.currentSelected == this.id) {
			return false;
		}
		this.setAttribute("data-moved", "n");
		MIGlobals.removeClass(this, "hotspot-box-normal");
		MIGlobals.addClass(this, "hotspot-box-down");
		e.preventDefault();
		return true;
	},

	hotspotBoxOnTouchEnd: function(e) {
		if (MIImageTest.currentSelected == this.id) {
			return false;
		}
		MIGlobals.removeClass(this, "hotspot-box-down");
		MIGlobals.addClass(this, "hotspot-box-normal");
		if (this.getAttribute("data-moved") == "y") {
			return false;
		}

		if (MIImageTest.currentSelected != null) {
			var lastBox = $("#" + MIImageTest.currentSelected);
			lastBox.innerHTML = "?";
			lastBox.style.backgroundColor = "#fff";
			MIGlobals.removeClass(lastBox, "hotspot-box-show-answer");
			MIGlobals.addClass(lastBox, "hotspot-box-hide-answer");
		}

		MIGlobals.removeClass(this, "hotspot-box-hide-answer");
		MIGlobals.addClass(this, "hotspot-box-show-answer");
		MIImageTest.currentSelected = this.id;

		setTimeout(function(e) {
			var box = $(MIImageTest.currentSelected);
			box.innerHTML = "";
			box.style.backgroundColor = "transparent";
		}, 300);
		
		return true;
	},

	hotspotBoxOnTouchMove: function(e) {
		if (MIImageTest.currentSelected == this.id) {
			return false;
		}
		this.setAttribute("data-moved", "y");
		e.preventDefault();
		return true;
	},

	hotspotBoxOnTouchCancel: function(e) {
		if (MIImageTest.currentSelected == this.id) {
			return false;
		}
		MIGlobals.removeClass(this, "hotspot-box-down");
		MIGlobals.addClass(this, "hotspot-box-normal");
		return true;
	}

};