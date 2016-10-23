var MIListItem = {
	makeItems: function (listItems) {
		var items = listItems || document.querySelectorAll("div.item-box");
		for (var i = items.length; i--;) {
			var item = items[i];
			this.makeItem(item);
		}
	},

	makeItem: function (ele) {
		ele.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "item-down");
			MIGlobals.addClass(this.querySelector("div.text-desc"), "text-desc-down");
			MIGlobals.addClass(this.querySelector("div.item-title"), "item-title-down");
			var arrow = this.querySelector("img.right-arrow");
			if (!arrow) {
				arrow = this.querySelector("img.test-right-arrow");
			}
			arrow.src = MIGlobals.contextRoot + "/META-INF/images/right-arrow-down.png";
		});
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(this, "item-down");
			MIGlobals.removeClass(this.querySelector("div.text-desc"), "text-desc-down");
			MIGlobals.removeClass(this.querySelector("div.item-title"), "item-title-down");

			var arrow = this.querySelector("img.right-arrow");
			if (!arrow) {
				arrow = this.querySelector("img.test-right-arrow");
			}
			arrow.src = MIGlobals.contextRoot + "/META-INF/images/right-arrow.png";
			
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}

			var href = this.getAttribute("data-href");
			if (MIGlobals.isRunningInMosoBooks) {
				var url = MIGlobals.format("/jump?href=%s&target=_blank&scrollEnabled=YES", encodeURIComponent(href));
				window.location.href=url;
			} else {
				window.open(href);
			}
		});
		if (MIGlobals.isTouchSupported) {
			ele.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			});
			ele.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this,"item-down");
				this.setAttribute("data-moved", "n");
			});
		}
	}

};
