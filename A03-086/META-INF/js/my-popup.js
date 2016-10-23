var MyP = {
	currentPopupId: null,
	myPopupBox : null,
	initialized: false,

	init : function() {
		var box = document.querySelector(".box");
		this.myPopupBox = document.createElement("div");
		this.myPopupBox.className = "text";
		box.appendChild(this.myPopupBox);
		this.initialized = true;
	},

	makeMyPopups : function() {
		var myPopups = document.querySelectorAll(".m");
		console.log(myPopups.length);
		for ( var i = myPopups.length; i--;) {
			var p = myPopups[i];
			this.makeMyPopup(p);
		}
	},

	makeMyPopup : function(ele) {
		if (!ele.id) {
			ele.id = "P-" + uuid.v4().toUpperCase();
		};
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			var p = this;
			popupId = p.id;
			if (MyP.currentPopupId == null) {
				MyP.show(p);
				console.log("show");
			} else if (MyP.currentPopupId == popupId) {
				MyP.hide();
				console.log("hide");
			} else {
				var popupBox = MyP.myPopupBox;
				popupBox.style.opacity = "0";
				popupBox.style.display = "none";
				MyP.currentPopupId = null;
				setTimeout(function() {
					MyP.show(p);
				}, 10)
				console.log("else");
			}
		})
	},

	show : function (eleP) {
		var popupBox = this.myPopupBox;
		var popupElement = eleP;
		var popupId = popupElement.id;
		MyP.currentPopupId = popupId;
		var s = popupElement.getAttribute("data-text");
		popupBox.innerHTML = s;
		popupBox.style.display = "block";
		var myPopupBoxH = popupBox.offsetHeight;
		popupBox.style.marginTop = -myPopupBoxH/2 + "px";
		popupBox.style.opacity = "0.9";
	},

	hide : function () {
		if (this.currentPopupId == null) return false;
		var myPopupBox = this.myPopupBox;
		myPopupBox.style.opacity = "0";
		MyP.currentPopupId = null;
		setTimeout(function() {
			myPopupBox.style.display = "none";
		}, 10)
	},

}
