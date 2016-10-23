var MIMap = {
	/** Make all maps button
	 */
	makeMaps: function (ms) {
		var maps = ms || document.querySelectorAll(".map");
		for (var i = maps.length; i--;) {
			var map = maps[i];
			this.makeMap(map);
		}
	},

	/** make map
	 * @param ele the map element, inlcuding the text and the image button
	 */
	makeMap: function (ele) {
		ele.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "map-down");
		});
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(this, "map-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}
			var lat = this.getAttribute("data-lat");
			var lng = this.getAttribute("data-lng");
			var title = this.getAttribute("data-title");
			var iosZoomLevel = this.getAttribute("data-ios-zoomlevel");
			if (MIGlobals.isEmpty(iosZoomLevel)) iosZoomLevel = "";
			var androidZoomLevel = this.getAttribute("data-android-zoomlevel");
			if (MIGlobals.isEmpty(androidZoomLevel)) androidZoomLevel = "";
			var url = null;
			if (MIGlobals.isRunningInMosoBooks) {
				url = MIGlobals.format("/location?lat=%s&lng=%s&title=%s&iosZoomLevel=%s&androidZoomLevel=%s", lat, lng, encodeURIComponent(title),iosZoomLevel,androidZoomLevel);
				window.location.href = url;
			} else {
				url = MIGlobals.format("/location?lat=%s&lng=%s&title=%s&iosZoomLevel=%s&androidZoomLevel=%s", lat, lng, encodeURIComponent(title),iosZoomLevel,androidZoomLevel);
				log(url);
			}
		});
		if (MIGlobals.isTouchSupported) {
			ele.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			});
			ele.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this, "map-down");
			});
		}
	}
};
