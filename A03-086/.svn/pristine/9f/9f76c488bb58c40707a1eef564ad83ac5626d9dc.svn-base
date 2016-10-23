var MI3D = {
	make3Ds: function (ts) {
		var threeDs = ts || document.querySelectorAll(".threed-button");
		for (var i = threeDs.length; i--;) {
			var threed = threeDs[i];
			this.make3D(threed);
		}
	},

	make3D: function (ele) {
		ele.addEventListener(MIGlobals.eventTouchStart, function(e){
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "threed-button-down");
		});
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e){
			MIGlobals.removeClass(this, "threed-button-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}
			var file = this.getAttribute("data-model-file");
			var scale = this.getAttribute("data-initial-scale");
			var title = this.getAttribute("data-title");
			var backgroundColor = this.getAttribute("data-background-color");
			if (MIGlobals.isEmpty(backgroundColor)) {
				backgroundColor = "#3f3f3f";
			}
			
			var url = null;
			url = MIGlobals.format("/threed?modelFile=%s&initialScale=%s&title=%s&backgroundColor=%s", 
					encodeURIComponent(file),
					scale,
					encodeURIComponent(title),
					encodeURIComponent(backgroundColor));
			if (MIGlobals.isRunningInMosoBooks) {
				window.location.href = url;
			} else {
				log(url);
			}
		});
		if (MIGlobals.isTouchSupported) {
			ele.addEventListener(MIGlobals.eventTouchMove, function(e){
				this.setAttribute("data-moved", "y");
			});
			ele.addEventListener(MIGlobals.eventTouchCancel, function(e){
				MIGlobals.removeClass(this, "threed-button-down");
			});
		}
	}
};

