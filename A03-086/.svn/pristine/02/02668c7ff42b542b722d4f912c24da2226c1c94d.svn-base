var MIJump = {
	base: "http://10.0.1.77:8080/mosores/pub/resource!previewOnMobileDevice.action?resourceObject.id=",
	makeJumps: function (jumps) {
		var js = jumps || document.getElementsByClassName("jump-button");
		for (var i = js.length; i--;) {
			var jump = js[i];
			this.makeJump(jump);
		}
	},

	makeJump: function (ele) {
		var base = this.base;
		ele.addEventListener(MIGlobals.eventTouchStart, function(e){
			this.setAttribute("moved", "n");
			MIGlobals.addClass(this,"jump-button-down");
		});
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e){
			MIGlobals.removeClass(this,"jump-button-down");
			if (this.getAttribute("moved") == "y") {
				this.setAttribute("moved", "n");
				return false;
			}
			var jumpHref = this.getAttribute("data-href");
			var resJump = this.getAttribute("data-res-id");
			var target = this.getAttribute("data-target");
			var back = this.getAttribute("data-back");
			var isActivity = this.getAttribute("data-isactivity");
			if (MIGlobals.isRunningPhone) {
				if (this.getAttribute("data-phscroll-enable")=="NO" || this.getAttribute("data-phscroll-enable")=="no") {
					this.setAttribute("data-scroll-enable","NO");
				}else{
					this.setAttribute("data-scroll-enable","YES");
				}
				
				
			}
			var scrollEnabled = this.getAttribute("data-scroll-enable");

			var mediaPlaybackRequiresUserAction = this.getAttribute("data-media-playback-requires-user-action");
			var fullScreen = this.getAttribute("data-full-screen");
			var url = null;
			if (MIGlobals.isEmpty(jumpHref) && MIGlobals.isEmpty(resJump)) {
				return false;
			}
			if (MIGlobals.isEmpty(jumpHref) && (!MIGlobals.isEmpty(resJump))) {
				if (MIGlobals.isRunningInMosoBooks) {
					url = MIGlobals.format("/jump?href=%s",encodeURIComponent(base + resJump));
					window.location.href = url;
				}else {
					url = base + resJump;
					window.open(url);
				}
			}
			if ((!MIGlobals.isEmpty(jumpHref)) && MIGlobals.isEmpty(resJump)) {
				if(jumpHref.startsWith("#")){
					var value = jumpHref.substr(1);
					var t = document.getElementById(value);
					if(MIGlobals.isEmpty(t)){
						log(format("DOM element id %s is not found", value));
					}else{
						t.scrollIntoView();
					}
				} else {
					if (MIGlobals.isRunningInMosoBooks) {
						if (jumpHref.startsWith("file://")) {
							jumpHref = jumpHref.replace("${contextRoot}", MIGlobals.contextRoot.replace("mibook://", ""));
						}
						var params = {
							"href":jumpHref,
							"target":MIGlobals.isEmpty(target) ? "_self" : target,
							"scrollEnabled" : MIGlobals.isEmpty(scrollEnabled) ? "YES" : scrollEnabled,
							"fullScreen" : MIGlobals.isEmpty(fullScreen) ? "NO" : fullScreen,
							"back" : MIGlobals.isEmpty(back) ? "NO" : back,
							"isActivity": MIGlobals.isEmpty(isActivity) ? "NO" : isActivity,
							"mediaPlaybackRequiresUserAction" : MIGlobals.isEmpty(mediaPlaybackRequiresUserAction) ? "YES" : mediaPlaybackRequiresUserAction
						};

						url = URLBuilder.buildURLString("/jump",params);
						log(url);
						window.location.href = url;
					} else {
						url = this.getAttribute("data-href");
						window.open(url);

					};
				};
			}

			
		});
		if (MIGlobals.isTouchSupported) {
			ele.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("moved", "y");
			});
			ele.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this,"jump-button-down");
				this.setAttribute("moved", "n");
			});
		}
	}
};


