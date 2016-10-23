var MIAudio = {
	makeAudios: function (audios) {
		var as = audios || document.querySelectorAll(".audio");
		for (var i = as.length; i--;) {
			var audio = as[i];
			this.makeAudio(audio);
		}
	},

	makeAudio: function (ele) {
		ele.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "audio-down");
		});
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(this, "audio-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}
			var audioFile = this.getAttribute("data-audio-file");
			var audioTitle = this.getAttribute("data-audio-title");
			var chapter_id = this.getAttribute("data-chapter-uuid");
			var section_id = this.getAttribute("data-section-uuid");
			var file_id = this.getAttribute("data-uuid");
			var url = null;
			if (MIGlobals.isRunningInMosoBooks) {
				if (chapter_id) {
					url = MIGlobals.format("/audio?audioFile=%s&title=%s&chapter_id=%s&section_id=%s&file_id=%s", encodeURIComponent(audioFile), 
					encodeURIComponent(audioTitle),encodeURIComponent(chapter_id),encodeURIComponent(section_id),encodeURIComponent(file_id));

				} else {
					url = MIGlobals.format("/audio?audioFile=%s&title=%s", encodeURIComponent(audioFile), 
					encodeURIComponent(audioTitle));

				}
				
				window.location.href = url;
			} else {
				var base = new URLParser(window.location.href).getBase();
				url = MIGlobals.format("../META-INF/audio-player.html?audioFile=%s&title=%s", 
					encodeURIComponent(base + audioFile), encodeURIComponent(audioTitle));
				window.open(url);
			}
		});
		
		if (MIGlobals.isTouchSupported) {
			ele.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			});
			ele.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this, "audio-down");
			});
		}
	}
};
