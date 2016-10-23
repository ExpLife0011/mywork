var MIPopRead = {
	currentPopupSpanId: null,
	arrowHeight: 16,
	arrowWidth: 16,
	minLeft:130,
	maxRight: 708,
	popupWindowBorderRadius: 12,
	initialized: false,

	elePopupWindowBox: null,
	eleArrowDown : null,
	eleArrowUp: null,
	elePopupWindow: null,
	elePopupContent : null,
	elePopupWindowButtonBar : null,
	eleButtonBaidu: null,
	// eleButtonRw: null,
	eleButtonHudong: null,
	eleButtonWIKI: null,
	eleButtonCloud: null,
	

	
	init: function() {


		if (this.initialized) return false;
		if ($("#popup-read-box")) {
			log("!!!! Please delete the popup-window in page source !!!!");
			return false;
		}
		
		// Create DOM elements
		this.elePopupWindowBox = document.createElement("div");
		this.elePopupWindowBox.id = "popup-read-box";
		this.elePopupWindowBox.className = "popup-read-box";

		this.elePopupWindowBox.style.display = "none";
		this.eleArrowUp = document.createElement("img");
		this.eleArrowUp.id = "popup-window-arrow-up";
	
		this.eleArrowUp.src = MIGlobals.contextRoot + "/META-INF/images/pop-read-up@2x.png";
		
		this.elePopupWindowBox.appendChild(this.eleArrowUp);
		

		this.elePopupWindow = document.createElement("div");
		this.elePopupWindow.id = "popup-read";
		this.elePopupWindow.className = "clearfix";

		this.elePopupContent = document.createElement("div");
		this.elePopupContent.id = "popup-content";
		this.elePopupWindow.appendChild(this.elePopupContent);

		//this.elePopupWindowButtonBar = document.createElement("div");
		// this.elePopupWindowButtonBar.id = "popup-window-button-bar";

		// this.eleButtonBaidu = document.createElement("img");
		// this.eleButtonBaidu.id = "popup-button-baidu";
		// if(MIGlobals.isRunningPhone){
		// this.eleButtonBaidu.src = MIGlobals.contextRoot + "/META-INF/images/baidu@2x.png";
		// }else{
		// 	this.eleButtonBaidu.src = MIGlobals.contextRoot + "/META-INF/images/baidu.png";
		// }
		// this.eleButtonBaidu.className = "popup-read-button"
		// this.eleButtonBaidu.setAttribute("data-href", "");
		// this.eleButtonBaidu.setAttribute("data-target", "_blank");
		// this.eleButtonBaidu.addEventListener(MIGlobals.eventTouchStart, MIPopRead.wikiButtonOnTouchStart);
		// this.eleButtonBaidu.addEventListener(MIGlobals.eventTouchEnd, MIPopRead.wikiButtonOnTouchEnd);
		// if (MIGlobals.isTouchSupported) {
		// 	this.eleButtonBaidu.addEventListener(MIGlobals.eventTouchMove, MIPopRead.wikiButtonOnTouchMove);
		// 	this.eleButtonBaidu.addEventListener(MIGlobals.eventTouchCancel, MIPopRead.wikiButtonOnTouchCancel);
		// }
		// this.elePopupWindowButtonBar.appendChild(this.eleButtonBaidu);

		// this.eleButtonRw = document.createElement("img");
		// this.eleButtonRw.id = "popup-button-rw";
		// this.eleButtonRw.src = MIGlobals.contextRoot + "/META-INF/images/renwei.png";
		// this.eleButtonRw.className = "popup-window-button";
		// this.eleButtonRw.setAttribute("data-href", "");
		// this.eleButtonRw.setAttribute("data-target", "_blank");
		// this.eleButtonRw.addEventListener(MIGlobals.eventTouchStart, MIPopRead.wikiButtonOnTouchStart);
		// this.eleButtonRw.addEventListener(MIGlobals.eventTouchEnd, MIPopRead.wikiButtonOnTouchEnd);
		// if (MIGlobals.isTouchSupported) {
		// 	this.eleButtonRw.addEventListener(MIGlobals.eventTouchMove, MIPopRead.wikiButtonOnTouchMove);
		// 	this.eleButtonRw.addEventListener(MIGlobals.eventTouchCancel, MIPopRead.wikiButtonOnTouchCancel);
		// }
		// this.elePopupWindowButtonBar.appendChild(this.eleButtonRw);


		// this.eleButtonHudong = document.createElement("img");
		// this.eleButtonHudong.id = "popup-button-hudong";
		// if(MIGlobals.isRunningPhone){
		// this.eleButtonHudong.src = MIGlobals.contextRoot + "/META-INF/images/baidu@2x.png";	
		// }
		// else{
		// this.eleButtonHudong.src = MIGlobals.contextRoot + "/META-INF/images/baidu.png";	
		// }
		// this.eleButtonHudong.className = "popup-read-button";
		// this.eleButtonHudong.setAttribute("data-href", "");
		// this.eleButtonHudong.setAttribute("data-target", "_blank");
		// this.eleButtonHudong.addEventListener(MIGlobals.eventTouchStart, MIPopRead.wikiButtonOnTouchStart);
		// this.eleButtonHudong.addEventListener(MIGlobals.eventTouchEnd, MIPopRead.wikiButtonOnTouchEnd);
		// if (MIGlobals.isTouchSupported) {
		// 	this.eleButtonHudong.addEventListener(MIGlobals.eventTouchMove, MIPopRead.wikiButtonOnTouchMove);
		// 	this.eleButtonHudong.addEventListener(MIGlobals.eventTouchCancel, MIPopRead.wikiButtonOnTouchCancel);
		// }
		// this.elePopupWindowButtonBar.appendChild(this.eleButtonHudong);

		//this.eleButtonWIKI = document.createElement("img");
		//this.eleButtonWIKI.id = "popup-button-wiki";
		
		// if(MIGlobals.isRunningPhone){
		// 	this.eleButtonWIKI.src = MIGlobals.contextRoot + "/META-INF/images/baidu@2x.png";
		// }else{
		// 	this.eleButtonWIKI.src = MIGlobals.contextRoot + "/META-INF/images/baidu.png";
		// }
		
		// this.eleButtonWIKI.className = "popup-read-button";
		// this.eleButtonWIKI.setAttribute("data-href", "");
		// this.eleButtonWIKI.setAttribute("data-target", "_blank");
		// this.eleButtonWIKI.addEventListener(MIGlobals.eventTouchStart, MIPopRead.wikiButtonOnTouchStart);
		// this.eleButtonWIKI.addEventListener(MIGlobals.eventTouchEnd, MIPopRead.wikiButtonOnTouchEnd);
		// if (MIGlobals.isTouchSupported) {
		// 	this.eleButtonWIKI.addEventListener(MIGlobals.eventTouchMove, MIPopRead.wikiButtonOnTouchMove);
		// 	this.eleButtonWIKI.addEventListener(MIGlobals.eventTouchCancel, MIPopRead.wikiButtonOnTouchCancel);
		// }
		// this.elePopupWindowButtonBar.appendChild(this.eleButtonWIKI);
		/*
		this.eleButtonCloud = document.createElement("img");
		this.eleButtonCloud.id = "popup-button-cloud";
		this.eleButtonCloud.src = MIGlobals.contextRoot + "/META-INF/images/cloudicon.png";
		this.eleButtonCloud.className = "popup-window-button";
		this.eleButtonCloud.setAttribute("data-href", "");
		this.eleButtonCloud.setAttribute("data-target", "_blank");
		
		this.elePopupWindowButtonBar.appendChild(this.eleButtonCloud);
		*/
		
		//this.elePopupWindow.appendChild(this.elePopupWindowButtonBar);

		this.elePopupWindowBox.appendChild(this.elePopupWindow);

		this.eleArrowDown = document.createElement("img");
		this.eleArrowDown.id = "popup-window-arrow-down";
		
		this.eleArrowDown.src = MIGlobals.contextRoot + "/META-INF/images/pop-read-down@2x.png";
		
		
		this.elePopupWindowBox.appendChild(this.eleArrowDown);

		document.body.appendChild(this.elePopupWindowBox);
		this.initialized = true;
	},

	makePopups: function(popups) {
		var ps = popups || document.querySelectorAll("span.popup-read-text");
		for (var i = ps.length; i--;) {
			var p = ps[i];
			this.makePopup(p);
		}
	},

	makePopup: function (popupSpanElement) {
		// If no id specified, set a UUID to the span element
		if (!popupSpanElement.id) {
			popupSpanElement.id = "P-" + uuid.v4().toUpperCase();
		}
		popupSpanElement.addEventListener(MIGlobals.eventTouchStart, MIPopRead.popupSpanOnTouchStart);
		popupSpanElement.addEventListener(MIGlobals.eventTouchEnd, MIPopRead.popupSpanOnTouchEnd);
		if (MIGlobals.isTouchSupported) {
			popupSpanElement.addEventListener(MIGlobals.eventTouchMove, MIPopRead.popupSpanOnTouchMove);
			popupSpanElement.addEventListener(MIGlobals.eventTouchCancel, MIPopRead.popupSpanOnTouchCancel);
		}
	},

	wikiButtonOnTouchStart: function(e) {
		this.setAttribute("data-moved", "n");
	},
	wikiButtonOnTouchMove: function(e) {
		this.setAttribute("data-moved", "y");
	},
	wikiButtonOnTouchCancel: function(e) {

	},
	wikiButtonOnTouchEnd: function(e) {
		if (this.getAttribute("data-moved") == "y") {
			return false;
		}
		var url = null;
		if (MIGlobals.isRunningInMosoBooks) {
			url = MIGlobals.format("/jump?href=%s&target=%s&fullScreen=YES", encodeURIComponent(this.getAttribute("data-href")), "_blank");
			window.location.href = url;
		} else {
			url = this.getAttribute("data-href");
			window.open(url);
		}
	},

	popupSpanOnTouchMove: function (e) {
		this.setAttribute("moved", "y");
	},

	popupSpanOnTouchCancel: function (e) {
		MIGlobals.removeClass(popupSpan, "popup-read-down");
		this.setAttribute("moved", "n");
	},

	popupSpanOnTouchStart: function (e) {
		MIGlobals.addClass(this, "popup-read-down");
		this.setAttribute("moved", "n");

		var p = MIPoint.pointFromEvent(e);
		this.setAttribute("data-clientX", p.clientX);
		this.setAttribute("data-clientY", p.clientY);
		this.setAttribute("data-pageX", p.pageX);
		this.setAttribute("data-pageY", p.pageY);
	},

	popupSpanOnTouchEnd: function (e) {
		var popupSpan = this;
		MIGlobals.removeClass(popupSpan, "popup-read-down");
		if (this.getAttribute("moved") == "y") {
			this.setAttribute("moved", "n");
			return false;
		}
		var popupSpanId = popupSpan.id;
		var options = {clientX: popupSpan.getAttribute("data-clientX"),
						clientY: popupSpan.getAttribute("data-clientY"),
						pageX: popupSpan.getAttribute("data-pageX"),
						pageY: popupSpan.getAttribute("data-pageY")};
		if (MIPopRead.currentPopupSpanId == null) {
			MIPopRead.show(popupSpan, options);
		} else if (MIPopRead.currentPopupSpanId == popupSpanId) {
			MIPopRead.hide();
		} else {
			var popupWindowBox = MIPopRead.elePopupWindowBox;
			popupWindowBox.style.opacity = "0";
			popupWindowBox.style.display = "none";
			MIPopRead.currentPopupSpanId  = null;
			setTimeout(function(){
				MIPopRead.show(popupSpan, options);
			}, 10);
		}
	},

	show: function  (elePopupSpan, options) {

		var popupWindowBox = this.elePopupWindowBox;
		var popupSpan = elePopupSpan;
		var popupSpanId = elePopupSpan.id;
		this.currentPopupSpanId = popupSpanId;
		if (!MIGlobals.isRunningPhone) {
			popupWindowBox.style.width="420px";
		}else{
			popupWindowBox.style.width=window.innerWidth -30 +"px";
		}
		var clientX = parseInt(options.clientX , 10);
		var clientY = parseInt(options.clientY, 10);
		var pageX = parseInt(options.pageX, 10);
		var pageY = parseInt(options.pageY, 10);
		var s;
		var popupHtml = "";
		s = popupSpan.getAttribute("data-popup-window-id");
		if (!MIGlobals.isEmpty(s)) {
			popupHtml = $(s).innerHTML;
		} else {
			popupHtml = popupSpan.getAttribute("data-popup-text");
		}

		//this.eleButtonBaidu.style.display = "none";
		// this.eleButtonRw.style.display = "none";
		//this.eleButtonHudong.style.display = "none";
		//this.eleButtonWIKI.style.display = "none";
		// this.eleButtonCloud.style.display = "block";
//		this.eleButtonCloud.style.display = "none";
		this.eleArrowUp.style.display = "none";
		this.eleArrowDown.style.display = "none";

		// s = popupSpan.getAttribute("data-baidu-keyword");
		// if (!MIGlobals.isEmpty(s)) {
		// 	this.eleButtonBaidu.style.display = "block";
		// 	var baiduHref = MIGlobals.format("http://baike.baidu.com/search/word?word=%s&pic=1&sug=1&enc=utf8", encodeURIComponent(s));
		// 	this.eleButtonBaidu.setAttribute("data-href", baiduHref);
		// }

		// s = popupSpan.getAttribute("data-rw-keyword");
		// if (!MIGlobals.isEmpty(s)) {
		// 	this.eleButtonRw.style.display = "block";
		// 	var rWHref = MIGlobals.format("http://baike.baidu.com/search/word?word=%s&pic=1&sug=1&enc=utf8", encodeURIComponent(s));
		// 	this.eleButtonRw.setAttribute("data-href", baiduHref);
		// }
 
		var popupContent = this.elePopupContent;
		popupContent.innerHTML = popupHtml;

		popupWindowBox.style.display = "block";

		var popupH = popupWindowBox.offsetHeight;
		var popupW = popupWindowBox.offsetWidth;
		var arrowUp = this.eleArrowUp;
		var arrowDown = this.eleArrowDown;
		var totalHeight = popupH + this.arrowHeight;
		var arrow = null;

		var rect = MIGlobals.detectClickRectTopAndBottom(popupSpan, clientX, clientY);

		var deltaY;

		if (clientY < totalHeight) {
			arrow = arrowUp;
			deltaY = (rect.bottom - clientY);
			popupWindowBox.style.top = pageY + deltaY + "px";
		} else {
			arrow = arrowDown;
			deltaY = (clientY - rect.top);
			popupWindowBox.style.top = (pageY - deltaY - totalHeight) + "px";
		}
		
		var defaultWindowX = (pageX - popupW / 2);
		var defaultArrowX = ((popupW - MIPopRead.arrowWidth) / 2);
		var deltaX = 0;

		/*新增判断窗口宽度改变气泡弹出位置*/

		if(MIGlobals.isRunningPhone){
			MIPopRead.minLeft = 15;			
			MIPopRead.maxRight = window.innerWidth - MIPopRead.minLeft;			
		}
		//log(MIPopRead.minLeft)
		if (pageX >= (MIPopRead.minLeft + popupW / 2) && pageX <= (MIPopRead.maxRight - popupW / 2)) {
			
		} else if (pageX < (MIPopRead.minLeft + popupW / 2)) {
			deltaX = (MIPopRead.minLeft + popupW / 2) - pageX;
		} else if (pageX > (MIPopRead.maxRight - popupW / 2)) {
			deltaX = -(pageX - (MIPopRead.maxRight - popupW / 2));
		}

		popupWindowBox.style.left = defaultWindowX + deltaX + "px";
		if(MIGlobals.isRunningPhone){

		popupWindowBox.style.right = MIPopRead.minLeft + "px";
		popupWindowBox.style.left = MIPopRead.minLeft + "px";
		}
		
		
		
		var arrowX = (defaultArrowX - deltaX);
		// log("arrowX before = " + arrowX);
		if (arrowX < MIPopRead.popupWindowBorderRadius) {
			arrowX = MIPopRead.popupWindowBorderRadius;
		} else if (arrowX > (popupW - MIPopRead.popupWindowBorderRadius - MIPopRead.arrowWidth)) {
			arrowX = (popupW - MIPopRead.popupWindowBorderRadius - MIPopRead.arrowWidth);
			// log("arrowX = " + arrowX);
		}
		arrow.style.left = arrowX + "px";
		arrow.style.display = "block";

		setTimeout(function(){
			popupWindowBox.style.opacity = "1.0";
		}, 10);
	},

	hide: function () {
		if (this.currentPopupSpanId == null) return false;
		var popupWindowBox = this.elePopupWindowBox;
		popupWindowBox.style.opacity = "0";
		MIPopRead.currentPopupSpanId = null;
		setTimeout(function(){
			popupWindowBox.style.display = "none";
		}, 300);
	},

	check: function () {
		if (this.currentPopupSpanId == null){
			return false;
		}else {
			return true;
		}
	}
};

/** 给客户端调用的代码，检查是否当前偶遇显示的气泡窗口

function checkPopWindow () {
	return MIPopRead.check();
}
 */