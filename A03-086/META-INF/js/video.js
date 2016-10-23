var MIVideo = {
	makeVideos : function (vs) {
		var videos = vs || document.querySelectorAll(".video-button");
		for (var i = videos.length; i--;) {
			var video = videos[i];
			this.makeVideo(video);
		}
	},

	makeVideo : function (ele) {
		ele.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "video-button-down");
		});
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(this, "video-button-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}
			var videoFile = this.getAttribute("data-video-file");
			var videoTitle = this.getAttribute("data-video-title");
			var url = null;
			if (MIGlobals.isRunningInMosoBooks) {
				url = MIGlobals.format("/video?videoFile=%s&title=%s", encodeURIComponent(videoFile), 
				encodeURIComponent(videoTitle));
				window.location.href = url;
			} else {
				var base = new URLParser(window.location.href).getBase();
				url = MIGlobals.format("../META-INF/video-player.html?videoFile=%s&title=%s", 
					encodeURIComponent(base + videoFile), encodeURIComponent(videoTitle));
				window.open(url);
			}
		});
		if (MIGlobals.isTouchSupported) {
			ele.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");

			});
			ele.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this, "video-button-down");

			});
		}
	}
};
