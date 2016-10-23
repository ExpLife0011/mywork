// v2.1.0
// 配置信息。主要是配置要加载的JavaScript模块。统一放置到头部，以便于后续修改mosoink.js的时候能够快速调整，以适应各个书籍
var MIConfig = {
	// 相关的JS模块。页面加载完毕之后，会按照这个数组配置的顺序来加载后续的JS模块。
	jsModules: [
	    /** 属性说明：
	      * selectorOrFunc 这个是决定要不要加载此模块的判断条件。如果此属性的值为字符串，则按照selector来处理。
	      *                如果selector返回的结果集不为空，则加载对应模块，否则不予加载。
	      *                如果是函数，则此函数要返回true的时候才会加载对应的模块，否则不予加载。
	      * moduleName     位于META-INF/js下的js文件名称，无需写.js后缀名
	      * onload         模块加载成功后的回调函数。如果selectorOrFunc的值为selector，那么此onload的第1个参数为selector的结果
          */
		//{selectorOrFunc: "", moduleName: "", onload: function(data) {}},
		{
			moduleName: "selection",
			selectorOrFunc: function(){
				return MIGlobals.runningPlatform == MIPlatform.Android  && navigator.userAgent.indexOf("/mibook_selection") != -1;
			},
			onload: function(eles) {
				MISelection.init();
			}
		},
		{
			moduleName: "uuid",
			selectorOrFunc: function(){return true;},
			onload: function(eles) {
				return true;
			}
		},
		{
			moduleName: "section-tree",
			selectorOrFunc: ".section-summary-tree",
			onload: function(eles) {
				MISectionTree.init();
			}
		},
		{
			moduleName: "gallery-d1", 
			selectorOrFunc: ".gallery-d1", 
			onload: function(eles) {
				MIGalleryD1.init(eles);
			}
		},
		
		{
			moduleName: "one-to-many", 
			selectorOrFunc: ".one-to-many", 
			onload: function(eles) {
				MIOneToMany.init(eles);
			}
		},
		{
			moduleName: "multi-pic", 
			selectorOrFunc: ".multi-pic", 
			onload: function(eles) {
				MIMultiPic.init(eles);
			}
		},
		{
			moduleName: "audio", 
			selectorOrFunc: ".audio", 
			onload: function(eles) {
				MIAudio.makeAudios(eles);
			}
		},
		// {
		// 	moduleName: "phoneimg", 
		// 	selectorOrFunc: "img", 
		// 	onload: function(eles) {
		// 		PhoneImg.init(eles);
		// 	}
		// },
		{
			moduleName: "video", 
			selectorOrFunc: ".video-button", 
			onload: function(eles) {
				MIVideo.makeVideos(eles);
			}
		},
		{
			moduleName: "video-jump", 
			selectorOrFunc: ".video-jump", 
			onload: function(eles) {
				MIVideoJump.makeVideoJumps(eles);
			}
		},
		{
			moduleName: "map", 
			selectorOrFunc: ".map", 
			onload: function(eles) {
				MIMap.makeMaps(eles);
			}
		},
		{
			moduleName: "jump", 
			selectorOrFunc: ".jump-button", 
			onload: function(eles) {
				MIJump.makeJumps(eles);
			}
		},
		{
			moduleName: "large-img", 
			selectorOrFunc: ".has-large-image", 
			onload: function(eles) {
				MILargeImage.makeLargeImages(eles);
			}
		},
		{
			moduleName: "threed", 
			selectorOrFunc: ".threed-button", 
			onload: function(eles) {
				MI3D.make3Ds(eles);
			}
		},
		{
			moduleName: "img-test", 
			selectorOrFunc: "#mir-test-img", 
			onload: function(eles) {
				MIImageTest.init();
			}
		},
		{
			moduleName: "popup", 
			// 所有情况下都加载popup模块，因为原生应用会调用MIPopup.hide方法
			selectorOrFunc: function() {return true},
			onload: function(eles) {
				MIPopup.init();
				MIPopup.makePopups();
			}
		},
		{
			moduleName: "popup-read", 
			// 所有情况下都加载popup模块，因为原生应用会调用MIPopup.hide方法
			selectorOrFunc: function() {return true},
			onload: function(eles) {
				MIPopRead.init();
				MIPopRead.makePopups();
			}
		},

		{
			moduleName: "mark-v2", 
			selectorOrFunc: function() {
				if(!MIGlobals.isRunningPhone){
						return true
					}
			}, 
			onload: function(eles) {
				// MIMarkManager.init();
				return true;
			}
		},
		{
			moduleName: "mark-phone", 
			selectorOrFunc: function() {
				if(MIGlobals.isRunningPhone){
					return true;
				}
			}, 
			onload: function(eles) {
				// MIMarkManager.init();
				return true;
			}
		},
		{
			moduleName: "find", 
			selectorOrFunc: function() {return true}, 
			onload: function(eles) {
				MIFinder.init();
			}
		},
		{
			moduleName: "res-gallery",
			selectorOrFunc: ".res-gallery", 
			onload: function(eles) {
				MIResGallery.init(eles);
			}
		},
	]
};

/** 运行平台常量
 */
var MIPlatform = {
	Android: "Android",
	iPad: "iPad",
	PC: "PC",
	MacOSX: "Mac OS X",
	Other: "other"
};

var MIGlobals = {
	isRunningPhone :false,
	isRunningInMosoBooks : false, // Is the page is running in moso books client application
	isTouchSupported: false,
	eventTouchStart : "mousedown",
	eventTouchMove : "mousemove",
	eventTouchEnd   : "click",
	eventTouchCancel : "click", 
	isScrolling : false,
	runningPlatform : "other",
	logEnabled : true,
	logDivID : "log-div-9527-31415926",
	logInfos : [],
	contextRoot: null, // 当前页面的上下文根
	fileUrl: null, // 当前加载的页面文件以BookId为基准的文件路径，例如 /c01/c01s01.html

	loadedJSModules: [], // 已经加载的JS模块，避免重复加载

	jsModuleOnLoadingCount: 0,

	userId: null,
	bookId: null,

	init: function(callbackFunc,fontSize) {
		log("userAgent = " + navigator.userAgent);
		this.miInit(callbackFunc);
		this.htmlFontSize(fontSize);
	},
	// font 
	htmlFontSize:function(fontSize){
					document.querySelector('html').style.fontSize = fontSize + 'px';
					
					
	},

	/** 全局初始化函数
	 * @param callbackFunc 在初始化完成之后需要回调的函数
	 */
	miInit: function (callbackFunc) {
		if ("createTouch" in document) {
			this.isTouchSupported = true;
			this.eventTouchStart = "touchstart";
			this.eventTouchMove = "touchmove";
			this.eventTouchEnd = "touchend";
			this.eventTouchCancel = "touchcancel";
		}

		var url = window.location.href;
		if (url.startsWith("mibook://") || navigator.userAgent.indexOf("MosoBooks/") >= 0) {
			this.isRunningInMosoBooks = true;
		} else {
			this.isRunningInMosoBooks = false;
		}
		if (navigator.userAgent.indexOf("MosoBooks/") >= 0 && navigator.userAgent.indexOf("Phone") >= 0) {
			this.isRunningPhone = true;
		} else {
			this.isRunningPhone = false;
		}

		var p = navigator.platform;
		if (p.startsWith("Linux")) {
			this.runningPlatform = MIPlatform.Android;
		} else if (p == "iPad" || p == "iOS") {
			this.runningPlatform = MIPlatform.iPad;
		} else if (p == "Win32" || p == "Win64") {
			this.runningPlatform = MIPlatform.PC;
		} else if (p == "MacIntel") {
			this.runningPlatform = MIPlatform.MacOSX;
		} else {
			this.runningPlatform = MIPlatform.Other;
		}

		// 获取应用传入的URL中的参数
		var uparser = new URLParser(url).parse();
		this.userId = uparser.getParameter("userId");
		this.bookId = uparser.getParameter("bookId");
		log(MIGlobals.format("userId = %s, bookId = %s", this.userId, this.bookId));


		// Load needed js files
		var ojses = document.querySelectorAll("head>script");
		var jsUriPrefix = null;
		for (var i = 0; i < ojses.length; i++) {
			var ojs = ojses[i];
			if (ojs.src && ojs.src.endsWith("/mosoink.js")) {
				jsUriPrefix = ojs.src.substr(0, ojs.src.length - 11);
				this.contextRoot = ojs.src.substr(0, ojs.src.length - 23);
				break;
			}
		}

		var tmpString = url;
		var queryStringPos = tmpString.indexOf("?");

		if (queryStringPos > -1) {
			tmpString = tmpString.substring(0, queryStringPos);
		}
		
		this.fileUrl = tmpString.substring(this.contextRoot.length);
		log("fileUrl = " + this.fileUrl);

		var currentIndex = -1;
		for (var i = 0; i < MIConfig.jsModules.length; i++) {
			var jsModule = MIConfig.jsModules[i];
			jsModule.fullUrl = jsUriPrefix + "/" + jsModule.moduleName + ".js";
			jsModule.selectedElements = [];
			jsModule.loadNeeded = false;
			jsModule.loaded = false;
			if (typeof jsModule.selectorOrFunc == "string") {
				var eles = document.querySelectorAll(jsModule.selectorOrFunc);
				if (eles && eles.length > 0) {
					jsModule.loadNeeded = true;
					jsModule.selectedElements = eles;
					if (currentIndex == -1) currentIndex = i;
				}
			} else if (typeof jsModule.selectorOrFunc == "function") {
				if (jsModule.selectorOrFunc.apply(jsModule)) {
					jsModule.loadNeeded = true;
					if (currentIndex == -1) currentIndex = i;
				}
			}
		}

		// 为了保证JS之间的依赖关系以及业务逻辑的正确处理，采取串行动态加载JS的方案。虽然牺牲一点儿性能，但是可控性增加
		if (currentIndex > -1) {
			MIGlobals.loadJSModule(MIConfig.jsModules[currentIndex].fullUrl, true, MIGlobals.jsModuleOnLoad);
		}
		
		
		
		if (callbackFunc) {
			callbackFunc.apply(null);
		}


		// 注册document的touchend，并且capture为true, 用来处理气泡显示的时候，如果点击屏幕上的其他位置，就隐藏气泡

		document.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			if (typeof MIPopup != "undefined" && MIPopup.currentPopupSpanId) {
				if (MIGlobals.isDescendantOf(e.target, function(pEle) {
					if (pEle.id && pEle.id == "popup-window-box") {
						return true;
					} else {
						var sClass = pEle.getAttribute("class");
						if (sClass && sClass.match(/\bpopup-text\b/)) return true;
					}
					return false;
				})) {
					// 点击了当前显示的气泡、其他的气泡、以及气泡弹出窗口上的元素，不做任何处理
				} else {
					// 点击了文档上其他的元素或者其他的交互位置，隐藏当前显示的气泡
					MIPopup.hide();
				}
			}
		}, true);
			document.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			if (typeof MIPopRead != "undefined" && MIPopRead.currentPopupSpanId) {
				if (MIGlobals.isDescendantOf(e.target, function(pEle) {
					if (pEle.id && pEle.id == "popup-read-box") {
						return true;
					} else {
						var sClass = pEle.getAttribute("class");
						if (sClass && sClass.match(/\bpopup-read-text\b/)) return true;
					}
					return false;
				})) {
					// 点击了当前显示的气泡、其他的气泡、以及气泡弹出窗口上的元素，不做任何处理
				} else {
					// 点击了文档上其他的元素或者其他的交互位置，隐藏当前显示的气泡
					MIPopRead.hide();
				}
			}
		}, true);

		// 在PC机器上模拟上下翻页、切换1x和2x图片的辅助功能
		if (!MIGlobals.isRunningInMosoBooks) {
			// content review toolbar

			// 1x 2x image switch side bar

			var div1x = document.createElement("div");
			div1x.id = "debug-div1x";
			div1x.style.position = "fixed";
			div1x.style.top = "50px";
			div1x.style.left = "0px";
			div1x.style.width = "40px";
			div1x.style.height = "40px";
			div1x.style.lineHeight = "40px";
			div1x.style.verticalAlign = "middle";
			div1x.style.textAlign = "center";
			div1x.style.backgroundColor = "black";
			div1x.style.color = "#fff";
			div1x.style.cursor = "pointer";
			div1x.textContent = "1x";
			div1x.addEventListener("click", function(e) {switchImage(1);});
			document.body.appendChild(div1x);

			var div2x = document.createElement("div");
			div2x.id = "debug-div2x";
			div2x.style.position = "fixed";
			div2x.style.top = "90px";
			div2x.style.left = "0px";
			div2x.style.width = "40px";
			div2x.style.height = "40px";
			div2x.style.lineHeight = "40px";
			div2x.style.verticalAlign = "middle";
			div2x.style.textAlign = "center";
			div2x.style.backgroundColor = "#fff";
			div2x.style.color = "#000";
			div2x.style.cursor = "pointer";
			div2x.textContent = "2x";
			div2x.addEventListener("click", function(e) {switchImage(2);});

			document.body.appendChild(div2x);
			


			var prevUrl = document.body.getAttribute("data-pre-file");
			var nextUrl = document.body.getAttribute("data-next-file");
			var s, divPrev, divNext, textNode;

			if (!MIGlobals.isEmpty(prevUrl) && prevUrl.trim().length > 0) {
				divPrev = document.createElement("div");
				divPrev.style.position = "fixed";
				divPrev.style.top = "0px";
				divPrev.style.width = "100%";
				divPrev.style.backgroundColor = "#000";
				divPrev.style.opacity = "0.7";
				divPrev.style.padding = "10px 0px 10px 0px";
				divPrev.style.zIndex = "9999";
				divPrev.style.cursor = "pointer";
				divPrev.style.font = "18px";
				divPrev.style.textAlign = "center";
				divPrev.style.color = "#FFF";
				divPrev.addEventListener("click", function(e){
					window.location.href = prevUrl;
				});
				s = document.body.getAttribute("data-pre-title");
				textNode = document.createTextNode(s);
				divPrev.appendChild(textNode);
				document.body.appendChild(divPrev);
			}

			if (!MIGlobals.isEmpty(nextUrl) && nextUrl.trim().length > 0) {
				divNext = document.createElement("div");
				divNext.style.position = "fixed";
				divNext.style.bottom = "0px";
				divNext.style.width = "100%";
				divNext.style.backgroundColor = "#000";
				divNext.style.opacity = "0.7";
				divNext.style.padding = "10px 0px 10px 0px";
				divNext.style.zIndex = "9999";
				divNext.style.cursor = "pointer";
				divNext.style.font = "18px";
				divNext.style.color = "#FFF";
				divNext.style.textAlign = "center";
				divNext.addEventListener("click", function(e){
					window.location.href = nextUrl;
				});
				s = document.body.getAttribute("data-next-title");
				textNode = document.createTextNode(s);
				divNext.appendChild(textNode);
				document.body.appendChild(divNext);
			}
		}
	},

	jsModuleOnLoad: function(jsUrl) {
		for (var i = 0; i < MIConfig.jsModules.length; i++) {
			var jsModule = MIConfig.jsModules[i];
			if (jsModule.fullUrl == jsUrl) {
				jsModule.loaded = true;
				if (typeof jsModule.onload == "function") {
					jsModule.onload.apply(window, [jsModule.selectedElements]);
				}
				var j = 0; 
				for (j = i + 1; j < MIConfig.jsModules.length; j++) {
					var nextJsModule = MIConfig.jsModules[j];
					if (nextJsModule.loadNeeded && !nextJsModule.loaded) {
						MIGlobals.loadJSModule(nextJsModule.fullUrl, true, MIGlobals.jsModuleOnLoad);
						break;
					}	
				}
				// 所有的JSModule都加载完毕了
				if (j == MIConfig.jsModules.length) {
					var dummyImg = new Image();
					dummyImg.src = "/" + MIGlobals.bookId + "/pageDidPrepared/dummy.png";
				}
				break;
			}
		}
	},

	/** 加载JS模块
	 * @param jsUrl JS文件的URL全路径
	 * @param async HTML5中新增加的关于script标签的属性，
	 * 如果为true则表示在加载完毕JS之后马上执行，
	 * 如果为false，则表示先加载，然后按照script元素出现的顺序执行
	 * @param callback 在JS文件加载完毕之后要回调的函数
	 */
	loadJSModule: function (jsUrl, async, callback) {
		if (this.loadedJSModules[jsUrl] && this.loadedJSModules[jsUrl] == 1) {
			log(jsUrl + " has been loaded, duplicated load request is ignored");
			if (callback) {
				callback.apply(window, [jsUrl]);
			}
			return false;
		} else {
			this.loadedJSModules[jsUrl] = 0;
		}


		var oh = document.querySelector("head");
		var ojs = document.createElement("script");
		ojs.type = "text/javascript";
		ojs.src = jsUrl;
		ojs.async = async;
		ojs.charset = 'utf-8';
		ojs.addEventListener("load", function(e) {
			MIGlobals.loadedJSModules[jsUrl] = 1;
			log("Load OK: " + jsUrl);
			if (callback) {
				callback.apply(window, [jsUrl]);
			}
		});
		oh.appendChild(ojs);
		log("Load   : " + jsUrl);
	},

	/** 检测所点击元素的Top和Bottom。适用场景：需要知道所点击元素的Top和Bottom时，避免在半个字的位置出现菜单、弹框等
	 * @param ele 被点击的元数
	 * @param clientX 点击位置横坐标，相对于窗口视口
	 * @param clientY 点击位置纵坐标，相对于窗口视口
	 * @return 返回JS对象，包含两个属性： top, bottom
	 */
	detectClickRectTopAndBottom: function (ele, clientX, clientY) {
		// var r = document.createRange();
		// r.selectNode(ele);

		var rects = ele.getClientRects();
		var ret = null;
		if (rects != null) {
			ret = {top: Number.MIN_VALUE, bottom: Number.MAX_VALUE};
			for (var i = 0; i < rects.length; i++) {
				var rect = rects[i];
				var offsetY = 0;
				// iOS 7 上存在一个Bug，就是getClientRects返回的ClientRectList对象中，top、bottom都是基于Page的，不是基于View的
				if (navigator.userAgent.indexOf("OS 7") >= 0) {
					offsetY = window.scrollY;
				}
				if (rect.left <= clientX && clientX <= rect.right
					&& (rect.top - offsetY) <= clientY && clientY <= (rect.bottom - offsetY)) {
					if (ret.top < (rect.top - offsetY)) ret.top = rect.top - offsetY;
					if (ret.bottom > (rect.bottom - offsetY)) ret.bottom = (rect.bottom - offsetY);
				}
			} 
		}
		return ret;
	},

	/*
	 * Test is an object is undefined or null or empty string
	 * @param obj The obj 
	 * @return If the obj is undefined or null or an empty string, return true, else return false.
	 */
	isEmpty: function (obj) {
		if (typeof obj == "undefined" || obj == null) return true;
		if (typeof obj == "string" && obj.length == 0) return true;
		return false;
	},

	/** function like String.format in JDK 1.5
	 * For example: format("a %s c %s e", "b", "d") returns a string "a b c d e"
	 * Only accepts %s as the format
	 *@param sformat
	 *@return 
	 */
	format: function (sformat){
		if (typeof sformat == "undefined" || sformat == null) return "";
		var s = "PREFIX ".concat(sformat); // Add prefix string to handle sformat starts with "%s"
		var parts = s.split("%s");
		var rets  = s;
		if (parts != null && parts.length > 1) {
			rets = parts[0];
			for (var i = 1; i < parts.length; i++) {
				if (i < arguments.length) {
					rets = rets.concat(arguments[i]);
				} else {
					rets = rets.concat("%s");
				}
				rets = rets.concat(parts[i]);
			}
		}
		return rets.substring(7);
	},

	

	getLogInfos: function () {
		return JSON.stringify(MIGlobals.logInfos);
	},

	/** Add class to an element. If the className has included in the element, nothing happend
	 * @param ele - the element
	 * @param className - the class to add.
	 * @return true or false. 
	 */
	addClass: function (ele, className) {
		if (MIGlobals.isEmpty(ele) || MIGlobals.isEmpty(className)) return false;
		var cn = ele.getAttribute("class");
		if (MIGlobals.isEmpty(cn)) {
			ele.setAttribute("class", className);
		} else {
			// var classes = cn.split(" ");
			// var hasClass = false;
			// for (var i = classes.length - 1; i >= 0; i--) {
			// 	if (classes[i].length == 0) {
			// 		classes.splice(i, 1);
			// 	}
			// 	if (classes[i].toLowerCase() == className.toLowerCase()) {
			// 		hasClass = true;
			// 	}
			// }
			// if (!hasClass) {
			// 	classes[classes.length] = className;
			// 	cn = classes.join(" ");
			// 	ele.setAttribute("class", cn);
			// }
			var reg = new RegExp("\\b" + className + "\\b");
			if (reg.test(ele.className)) {
			}else{
				ele.className += " " + className;
			}
		}
		return true;
	},

	/** 判断元素是否有某样式
	 * @param ele
	 * @param className
	 * @return true or false
	*/
	hasClass: function (ele, className) {
		if (MIGlobals.isEmpty(ele) || MIGlobals.isEmpty(className)) return false;
		var cn = ele.getAttribute("class");
		if (MIGlobals.isEmpty(cn)) return false;
		// var classes = cn.split(" ");
		// var ret = false;
		// for (var i = classes.length - 1; i >= 0; i--) {
		// 	if (classes[i].toLowerCase() == className.toLowerCase()) {
		// 		ret = true;
		// 		break;
		// 	}
		// }
		// return ret;
		var reg = new RegExp("\\b" + className + "\\b");
		if (reg.test(ele.className)) {
			return true;
		} else {
			return false;
		}
	},

	removeClass: function (ele, className) {
		if (MIGlobals.isEmpty(ele) || MIGlobals.isEmpty(className)) return false;
		var cn = ele.getAttribute("class");
		if (MIGlobals.isEmpty(cn)) return false;

		// var classes = cn.split(" ");
		// var hasClass = false;
		// for (var i = classes.length - 1; i >= 0; i--) {
		// 	if (classes[i].toLowerCase() == className.toLowerCase()) {
		// 		classes.splice(i, 1);
		// 		hasClass = true;
		// 		break;
		// 	}
		// }

		// if (hasClass) {
		// 	cn = classes.join(" ");
		// 	ele.setAttribute("class", cn);
		// }

		// return true;
		var reg = new RegExp("\\b" + className + "\\b",'g');
		ele.className = ele.className.replace(reg,'');
	},

	/** 计算两个点之间的距离
	 * @param x0, y0, x1, y1 : 两个点的横纵坐标
	 * @return 两点之间的距离
	 */
	distance: function (x0, y0, x1, y1) {
		return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
	},

	/** Put a img element in the center of horizon and vertical
	 * @param imageObject - the Image object
	 * @param imgElementId - the img element id in the document
	 * @param containerWidth - the width of the display area
	 * @param containerHeight - the height of the display area
	 */
	centerImage: function (imageObject, imgElementId, containerWidth, containerHeight, paddingX, paddingY) {
		var ratio = 1;
		if (!MIGlobals.isEmpty(navigator.userAgent) && navigator.userAgent.indexOf("OS 6") != -1) {
			ratio = parseInt(window.devicePixelRatio, 10);
			if(!ratio) {
				ratio = 1;
			}
		}
		
		var h = imageObject.height / ratio;
		var w = imageObject.width / ratio;
		var eleImg = typeof imgElementId == "string" ? $(imgElementId) : imgElementId;
		var newH = 0;
		var newW = 0;
		log(MIGlobals.format("containerWidth = %s, containerHeight = %s, imageWidth = %s, imageHeight = %s", containerWidth, containerHeight, w, h));
		
		var px = parseInt(paddingX);
		if (isNaN(px) || px < 0) px = 0;
		var py = parseInt(paddingY);
		if (isNaN(py) || py < 0) py = 0;
		var clientWidth = containerWidth - px * 2;
		var clientHeight = containerHeight - py * 2;

		if (w < clientWidth && h < clientHeight) {
			eleImg.style.left = (clientWidth - w) / 2 + px + "px";
			eleImg.style.top = (clientHeight - h) / 2 + py + "px";
			eleImg.style.width = w + "px";
		} else {
			if (w / clientWidth > h / clientHeight) {
				newW = clientWidth;
				newH = h * (clientWidth / w);
				if (newH > clientHeight) {
					newH = clientHeight;
				}
				eleImg.style.left = px + "px";
				log((clientHeight - newH) / 2 + py + "px");
				eleImg.style.top = (clientHeight - newH) / 2 + py + "px";
				eleImg.style.width = newW + "px";
			} else {
				newH = clientHeight;
				newW = w * (clientHeight / h);
				if (newW > clientWidth) {
					newW = clientWidth;
				}
				eleImg.style.left = (clientWidth - newW) / 2 + px + "px";
				eleImg.style.top = py + "px";
				eleImg.style.height = newH + "px";
			}
		}
	},

	/** 获取上一页，如果没有则返回空字符串,如果存在则返回上一页的字符串;
	 * 为了能够让客户端准确识别需要加载的页面属于哪个章，需要把返回的file属性以书籍的展开目录为根的完整路径。
	 * 例如： /c01/abcd.html
	 */
	getPreFile: function(){
		var preFile = document.body.getAttribute("data-pre-file");
		var preTitle = document.body.getAttribute("data-pre-title");
		
		if (MIGlobals.isEmpty(preFile)){
			return JSON.stringify({file: "", title : ""});
		} else {
			if (!preFile.startsWith("/")) {
				preFile = MIPathUtil.resolve(window.location.href, preFile);
				if (!MIGlobals.isEmpty(preFile)) {
					preFile = preFile.substring(MIGlobals.contextRoot.length);
				}
			}
			
			var ret = {file: preFile, title: preTitle};
			return JSON.stringify(ret);
		}
	},

	/** 获取下一页，如果没有则返回空字符串,如果存在则返回下一页的字符串;
	 * 为了能够让客户端准确识别需要加载的页面属于哪个章，需要把返回的file属性以书籍的展开目录为根的完整路径。
	 * 例如： /c01/abcd.html
	 */
	getNextFile: function(){
		var nextFile = document.body.getAttribute("data-next-file");
		var nextTitle = document.body.getAttribute("data-next-title");
		
		if (MIGlobals.isEmpty(nextFile)){
			return JSON.stringify({file: "", title: ""});
		} else {
			if (!nextFile.startsWith("/")) {
				nextFile = MIPathUtil.resolve(window.location.href, nextFile);
				if (!MIGlobals.isEmpty(nextFile)) {
					nextFile = nextFile.substring(MIGlobals.contextRoot.length);
				}
			}
			
			var ret = {file: nextFile, title: nextTitle};
			return JSON.stringify(ret);
		}
	},

	getFileUuid: function (){
		var fileUuid = document.body.getAttribute("data-uuid");
		if(!fileUuid) fileUuid = "";
		return fileUuid;
	},

	getSectionUuid: function  (){
		var sectionUuid = document.body.getAttribute("data-section-uuid");
		if(!sectionUuid) sectionUuid = "";
		return sectionUuid;
	},

	getChapterUuid : function(){
		var chapterUuid = document.body.getAttribute("data-chapter-uuid");
		if(!chapterUuid) chapterUuid = "";
		return chapterUuid;
	},

	/** 在有大图的图片（has-large-image）或者气泡中，对于描述文字，可以用标签的属性指定描述文字
	 * 也可以指向另外的元素，该元素的内容为要显示的文本。
	 * 本函数通过判断文本的第一个字符是不是#来确定要提取属性内容还是指向的元素内容
	 * @param ele DOM 元素
	 * @attrName 属性名称
	 * @return 返回属性值或者属性指向的元素内容。如果未找到属性或者指向的元素，会返回空串
	 */
	attrOrElementContent: function(ele, attrName) {
		if (!ele || !attrName) {
			log("attrOrElementContent: input arguments is empty !!!!");
			return "";
		}
		var s = ele.getAttribute(attrName);
		if (!s) {
			log(this.format("attrOrElementContent: DOM element has no attribute named %s", attrName));
			return "";
		}

		if (s.charAt(0) === "#") {
			var e = $(s);
			if (!e) {
				log(this.format("attrOrElementContent: Can not find element with id %s", s));
				return "";
			}
			return e.innerHTML;
		} else {
			return s;
		}
	},


	/**
	 * DEPRECATED
	 * @param xpos
	 * @param ypos
	 * @param durationInMs
	 * @return {Boolean}
	 */
	scrollWindowTo: function(xpos, ypos, durationInMs){
		var ix = parseInt(xpos, 10);
		var iy = parseInt(ypos, 10);
		if (isNaN(ix) || isNaN(iy)) return false;

		if (ix < 0) ix = 0;
		if (iy < 0) iy = 0;

		var maxScrollY = document.height - window.innerHeight;

		if (maxScrollY <= 0) return false;

		if (iy > maxScrollY) {
			log(MIGlobals.format("Target scroll y %s is greatter than max scroll y %s, adjust ypos to max scroll y", iy, maxScrollY));
			iy = maxScrollY;
		}

		var duration = parseInt(durationInMs, 10);
		if (isNaN(duration)) duration = 300;

		var interval = 30;
		var fromYPos = window.scrollY;
		var step = (iy - fromYPos) / (duration/interval);
		if (step === 0) return false;

		var timerId = window.setInterval(function(){
			var newVal = window.scrollY + step;
			if (Math.abs(newVal - iy) <= Math.abs(step)) {
				newVal = iy;
			}
			window.scrollTo(ix, newVal);
			if (newVal === iy) {
				window.clearInterval(timerId);
			}
		}, interval);

		return true;
	},

	makeReturn: function(retValue) {
		if (MIGlobals.isRunningInMosoBooks) {
			if (typeof retValue === "string") {
				return retValue;
			} else if (typeof retValue === "object") {
				return JSON.stringify(retValue);
			}
		} else {
			return retValue;
		}
	},
    
    secondsToString: function(val) {
        if (val == null || val == "0") return "0:00";
        var valMinute = 0, valSecond = 0;
        valMinute = parseInt(Math.round(val) / 60);
        valSecond = Math.round(val) % 60;
        return valMinute + ":" + ("00" + valSecond).slice(-2);
    },

    stringToSeconds:function(val) {
        if (val == null) return 0;
        var ss = val.split(":");
        return new Number(ss[0]) * 60 + new Number(ss[1]);
    },

    /** 判断一个元素是否是另外一个元素的后代，或者通过自定义的函数来判断
     *@param childEle 要检测的元素
	 *@param parentEleOrFunc 要检测的父元素。或者自定义一个函数，该函数接收一个参数：父元素。该函数返回true/false
	 *@return true or false. 传入的参数必须不为空，如果任何一个为空，则直接返回false。如果传入的两个元素直接句柄等，则返回true
	 */
	isDescendantOf: function(childEle, parentEleOrFunc) {
		if (!childEle || !parentEleOrFunc) return false;
		if (typeof parentEleOrFunc == "function") {
			var pEle = childEle;
			while(pEle) {
				if (parentEleOrFunc.call(window, pEle)) return true;
				pEle = pEle.parentElement;
			}
			return false;
		} else {
			if (childEle === parentEleOrFunc) return true;
			var pEle = childEle.parentElement;
			while (pEle) {
				if (pEle === parentEleOrFunc) return true;
				pEle = pEle.parentElement;
			}
			return false;
		}

	},

	/** Ajax request
	 *@parameter option Object like jquery ajax options object.
	 * {url: "someurl", method: "get|post", data: {data_to_send}, dataType: "json", success: successCallbackFunction}
	 */
	ajax: function(option) {
		if (!option || !option.url) {
			alert("Invalid input arguments!");
			return false;
		}

		var opt = {method: "get", dataType: "json"};
		opt.url = option.url;

		if (option.data) {opt.data = option.data;}
		if (option.success) {opt.success = option.success;}
		if (option.method) {opt.method = option.method.toLowerCase();}
		if (option.dataType) {opt.dataType = option.dataType.toLowerCase();}

		var request = new XMLHttpRequest();
		var fullUrl = opt.url;

		// request.responseType = opt.dataType;
		

		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) {
				if (request.status == 200) {
					console.log(request.response);
					if (opt.success && typeof opt.success == "function") {
						var params = [];
						if (opt.dataType == "json") {
							params.push(JSON.parse(request.responseText));
						} else {
							params.push(request.responseText);
						}
						opt.success.apply(window, params);
					}	
				} else {
					console.log("Bad response code [" + request.status + "] while request url " + fullUrl );
				}
			} 
		};

		var queryStringParts = [];
		for (var pname in opt.data) {
			var s = pname + "=";
			if (typeof opt.data[pname] != "undefined" && opt.data[pname] != null) {
				s += encodeURIComponent(opt.data[pname]);
			}
			queryStringParts.push(s);
		}
		// !!!!CAUTION!!!! 未考虑URL中包含#的场景，目前的功能中不会出现向一个包含#的URL中提交数据
		var queryString = null;

		if (queryStringParts.length > 0) {
			queryString = queryStringParts.join("&");
		}

		try {
			if (opt.method == "post") {
				request.open(opt.method, opt.url, true);
				request.timeout = 10000; 
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				if (queryString) {
					contentLength = queryString.length;
				}
				request.send(queryString);
			} else {
				if (queryString) {
					var conchar = "?";
					if (fullUrl.indexOf("?") >= 0) {
						conchat = "&";
					}
					fullUrl = fullUrl + conchar + queryString;
				}
				log("Ajax url : " + fullUrl);
				request.open(opt.method, fullUrl, true);
				request.timeout = 10000; 
				request.send(null);
			}
		} catch (e) {
			console.log("Error occured while request url: " + fullUrl);
			console.log(e);
		}
		return true;
	},

	/** 由于从v2.1.0开始，Moso Books 应用开始支持页内原生的HTML音频和视频，
	 * 但是当窗体在向右滑动出现目录的时候，页面中可能存在正在播放的音频或者视频，
	 * 此时，Moso Books 本地代码需要调用JavaScript函数来暂停这些音频和视频的播放。
	 * 如果页面中除了音频视频之外，还有其他的需要在窗体隐藏状态下停止的内容，
	 * 请在页面设置MIGlobals.onBrowserPause 和 MIGlobals.onBrowserResume 属性指向一个自定义的函数。
	 */
	pauseAll: function() {
		var videos = document.querySelectorAll("video");
		if (videos) {
			for (var i = 0; i < videos.length; i++) {
				videos[i].pause();
			}
		}

		var audios = document.querySelectorAll("audio");
		if (audios) {
			for (var i = 0; i < audios.length; i++) {
				audios[i].pause();
			}
		}
		if (typeof MIGlobals.onBrowserPause == "function") {
			MIGlobals.onBrowserPause.apply(window);
		}
	},

	/** 当用户将窗口从半显示状态拖动回完全显示状态的时候，如果页面要进行一些特殊处理，
	 * 请设置MIGlobals.onBorowserShow属性指向一个函数，在resumeAll中会调用此函数。
	 * resumeAll 仅为本地代码调用而设置。
	 */
	resumeAll: function() {
		if (typeof MIGlobals.onBrowserResume == "function") {
			MIGlobals.onBrowserResume.apply(window);
		}
	},

	/** 将按钮设置为快速响应触屏事件的。如果是PC设备，则不做处理。
	 *  仅适用于内容中点击元素。对于拖动等元素，需要自行在页面处理。
	 *  主要是绑定touchstart和touchmove事件，并判断用户按下之后手指移动了多少像素。
	 *  如果手指移动距离小于10像素，则还是认为用户在做点击操作。如果移动距离超过了10像素，则取消后续事件监听函数的执行。
	 *  如果需要产生按下效果的，需要设定css样式。xxx:active, xxx.down。其中xxx设置为你需要的选择器。
	 *  :active伪类是为iOS平台和PC平台的WebKit内核准备的，.down是为Android平台准备的。
	 *  因为Android当前放出的版本中原生的浏览器组件对:active的响应有些迟钝。
	 *@param ele 需要设置为快速响应触屏事件的按钮。
	 */
	makeTouchableButton: function(ele) {
		if (!ele) {
			console.error("MIGlobals.makeTouchableButton 无效的元素！");
			return false;
		}
		// ele.style.webkitUserSelect = "none"; // 禁止用户长按选择
		// 如果不是触屏设备，则不做处理。
		if (!MIGlobals.isTouchSupported) {
			return false;
		}

		ele.addEventListener("touchstart", function(evt){
			this.setAttribute("data-moved", "n");
			var p = evt.touches[0];
			this.setAttribute("data-touch-start-clientx", p.clientX);
			this.setAttribute("data-touch-start-clienty", p.clientY);
			/*
			if (MIGlobals.runningPlatform == MIPlatform.Android) {
				MIGlobals.addClass(this, "down");
			}
			*/
		});

		ele.addEventListener("touchmove", function(evt){
			if (this.getAttribute("data-moved") == "y") return false;

			var p = evt.touches[0];
			var startClientX = parseInt(this.getAttribute("data-touch-start-clientx"), 10);
			var startClientY = parseInt(this.getAttribute("data-touch-start-clienty"), 10);
			var deltax = p.clientX - startClientX;
            var deltay = p.clientY - startClientY;
            if (Math.abs(deltax) > 10 || Math.abs(deltay) > 10) {
            	this.setAttribute("data-moved", "y");
            }
		});

		ele.addEventListener("touchend", function(evt) {
			/*
			if (MIGlobals.runningPlatform == MIPlatform.Android) {
				MIGlobals.removeClass(this, "down");
			}
			*/
			if (this.getAttribute("data-moved") == "y") {
				evt.stopImmediatePropagation();
				return false;
			}
		});

	}
};





/** Definition of point
 * @param clientX
 * @param clientY
 * @param pageX
 * @param pageY
 */
function MIPoint(clientX, clientY, pageX, pageY) {
	this.clientX = (parseInt(clientX) == NaN ? 0 : clientX);
	this.clientY = (parseInt(clientY) == NaN ? 0 : clientY);
	this.pageX = (parseInt(pageX) == NaN ? 0 : pageX);
	this.pageY = (parseInt(pageY) == NaN ? 0 : pageY);
}

MIPoint.pointFromEvent = function(evt) {
	if (MIGlobals.isEmpty(evt)) return null;
	// If use jQuery to bind the touch-related events, 
	// the jQuery framework will wrap the event object passed to the event handler function
	// So, get the originalEvent from the jQuery wrapped event object to get touches properties
	var originalEvent = (typeof evt.originalEvent == "undefined" ? evt : evt.originalEvent);
	var p = new MIPoint();
	if (MIGlobals.isEmpty(originalEvent.touches)) {
		p.clientX = originalEvent.clientX;
		p.clientY = originalEvent.clientY;
		p.pageX = originalEvent.pageX;
		p.pageY = originalEvent.pageY;
	} else {
		p.clientX = originalEvent.touches[0].clientX;
		p.clientY = originalEvent.touches[0].clientY;
		p.pageX = originalEvent.touches[0].pageX;
		p.pageY = originalEvent.touches[0].pageY;
	}
	return p;
};


/** toString function for easy read object's properties
 */
MIPoint.prototype.toString = function() {
	return format("clientX = %s, clientY = %s, pageX = %s, pageY = %s", this.clientX, this.clientY, this.pageX, this.pageY);
}


// Extension for string objects.
/** Test if a string starts with prefix
 * @param prefix 
 * @return true or false
 */
String.prototype.startsWith = function(prefix) {
	if (MIGlobals.isEmpty(prefix)) {
		return false;
	}

	if (this.length < prefix.length) {
		return false;
	}

	if (this.substr(0, prefix.length) == prefix) {
		return true;
	}

	return false;
};

/** Test if a string ends width posix
*@param posix
*@return false or true

*/
String.prototype.endsWith = function(posix) {
	if (MIGlobals.isEmpty(posix)) {
		return false;
	}

	if (this.length < posix.length) {
		return false;
	}

	if (this.substr(this.length - posix.length) == posix) {
		return true;
	}

	return false;
};

/** 获取字符串的长度
*/

String.prototype.characterLength = function() {
	var len = this.length;
	var i = 0;
	var c;
	while ( i < len) {
		c = this.charCodeAt(i);
		if (0xD800 <= c && c <= 0xDC00) {
			i += 2;
			len -= 1;
		} else {
			i += 1;
		}
	}
	return len;
}


/************* DEFINITION OF URLBuilder *******************/
function Path(pathString) {
	if (!pathString) {
		log("ERROR!! Empty path string parameter");
		return false;
	}
	this.dirs = [];
	this.currentDir = 0;
	var tmpDirs = pathString.split("/");
	if (tmpDirs) {
		for (var i = 0; i < tmpDirs.length; i++) {
			if (tmpDirs[i].length > 0) {
				this.dirs.push(tmpDirs[i]);
			}
		}
		this.currentDir = this.dirs.length - 1;
	}
	return true;
}

Path.prototype.cd = function(dirToChange) {
	if (!dirToChange) return this;
	var tmpDirs = dirToChange.split("/");
	if (tmpDirs) {
		for (var i = 0; i < tmpDirs.length; i++) {
			if (tmpDirs[i].length === 0) continue;
			if (tmpDirs[i] === "..") {
				if (this.currentDir === 0) {
					log("Can not go to the parent directory!");
					return this;
				}
				this.currentDir -= 1;
			} else if (tmpDirs[i] === ".") {

			} else {
				this.currentDir += 1;
				this.dirs[this.currentDir] = tmpDirs[i];
			}
		}
	}
	return this;
};

Path.prototype.currentPathString = function() {
	var tmpDirs = this.dirs.slice(0, this.currentDir + 1);
	return tmpDirs.join("/");
};

function URLBuilder() {}
/**Build full URL in UTF-8 encoding
 *@param url - the main url
 *@param parameters - key-value object for parameters append to the main url
 *@param anchor - anchor point
 *@return URL string
 */
URLBuilder.buildURLString = function(url, parameters, anchor){
	if (!url) return "";
	var retString = url;

	if (parameters) {
		var paramPart = [];
		for (var k in parameters) {
			var v = parameters[k];
			if (!v) v = "";
			paramPart.push(k + "=" + encodeURIComponent(v));
		}
		if (paramPart.length > 0) {
			retString += ("?" + paramPart.join("&"));
		}
	}

	if (anchor) {
		retString += ("#" + anchor);
	}
	return retString;
};

/** calculate the full url 
 *@param baseUrl - the base url, maybe a page or a folder
 *@param relativeUrl - the relative URL
 *@return URL string
 */
URLBuilder.buildFullURL = function(baseUrl, relativeUrl){
	if (!baseUrl || !relativeUrl) return "";
	var newBase = baseUrl;
	var schema = "";
	var pos = newBase.indexOf("://");
	if (pos != -1) {
		schema = newBase.substring(0, pos + 3).toLowerCase();
		newBase = newBase.substring(pos + 3);
	}
	if (!newBase.endsWith("/")) {
		pos = newBase.lastIndexOf("/");
		if (pos != -1) {
			newBase = newBase.substring(0, pos);
		}
	}

	var p = new Path(newBase);
	p.cd(relativeUrl);
	var retValue = "";
	if (schema == "file://") {
		retValue = schema + "/" + p.currentPathString();
	} else {
		retValue = schema + p.currentPathString();
	}
	return retValue;
};

/************* DEFINITION OF URLParser *******************/
/** Construct a URLParser object with urlString
 */
function URLParser(urlString) {
	this.urlString = urlString;
	this.parameters = [];
	this.base = null;
	return this;
}

/** parse the url
 * @return this - a URLParser object
 */
URLParser.prototype.parse = function() {
	if (MIGlobals.isEmpty(this.urlString)) return this;
	var questionMarkPos = this.urlString.indexOf("?");
	if (questionMarkPos == -1 || questionMarkPos == this.urlString.length - 1) return this;
	var paramString = this.urlString.substr(questionMarkPos + 1);
	var nameValuePairs = paramString.split("&");
	for (var i = 0; i < nameValuePairs.length; i++) {
		var nameValuePair = nameValuePairs[i].split("=");
		if (nameValuePair.length == 1) {
			this.parameters[nameValuePair[0]] = null;
		} else {
			this.parameters[nameValuePair[0]] = decodeURIComponent(nameValuePair[1]);
		}
	}
	return this;
};

URLParser.prototype.getParameter = function(name) {
	return this.parameters[name];
};

URLParser.prototype.getBase = function() {
	if (this.base != null) return this.base;
	if (this.urlString.endsWith("/")) {
		this.base = this.urlString;
	}

	var pos = this.urlString.lastIndexOf("/");
	this.base = this.urlString.substr(0, pos + 1);
	return this.base;
};


/** return element with the given id
 * @param eleId if the id starts with #, the # will be removed
 * @return document.getElementById(eleId)
 */
function $(eleId) {
	if (MIGlobals.isEmpty(eleId)) return null;
	var plainId = eleId;
	if (eleId.charAt(0) == "#") {
		plainId = eleId.substr(1);
	}
	return document.getElementById(plainId);
}


/** The watch to test js execute time
 */
function MIWatch() {
	this.checkpoints = [{msg: "start point", t: new Date()}];
}

/** Make a checkpoint. 
 * @param msg - the message of the time info. can be ignored
 * @return no business related return value
 */
MIWatch.prototype.check = function(msg) {
	var s = MIGlobals.isEmpty(msg) ? "" : msg;
	this.checkpoints[this.checkpoints.length] = {msg: s, t: new Date()};
}

/** Dump the time information to log
 *
 */
MIWatch.prototype.dumpInfo = function() {
	for (var i = 1, n = this.checkpoints.length; i < n; i++) {
		var c0 = this.checkpoints[i - 1];
		var c1 = this.checkpoints[i];
		//log(c1);
		log(MIGlobals.format("time : %s ms for %s", (c1.t - c0.t), c1.msg));
	}
}



/**
 * log a msg to console
 * @param msg the message you want to output to console. You can pass multi arguments to this function
 * for example: log('a', 'b', 'c')
 */
function log(msg) {
	var parts = [];
	for (var i = 0; i < arguments.length; i++) {
		var v = arguments[i];
		if (typeof v == 'string' || typeof v == 'number' || typeof v == 'boolean') {
			parts.push(v);
		} else if (typeof v == 'undefined') {
			parts.push('undefined');
		} else if (typeof v == 'object') {
			if (v == null) {
				parts.push('null');
			} else {
				console.log(parts.join(''));
				parts = [];
				console.log(v);
			} 
		}
	}
	if (parts.length > 0) {
		console.log(parts.join(''));
	}
}


/**
 * 在查找结果被缓存之后，如果用户进行了标注的添加或者删除动作，会导致在MIFinder缓存的结果中无法创建Range
 * 因为DOM树发生了变化。所以在DOM树发生变化时，需要发送一个通知给监听者，以便于监听者能够进行响应的处理。
 * DOMNodeInserted、DOMNodeRemoved事件已经被HTML5取消了
 * 而且HTML5中提供的MutationObserver貌似不能监听所有层级的元素变动，只能监听指定target上的子元素变化
 * 所以先自行实现一个消息中心。
 * 本对象除了用来通知DOM Tree变化，也可以用来进行其他的通知
 * @type {Object}
 */
var MINotificationCenter = {
	NOTIFICATION_DOM_TREE_CHANGED : "miDOMTreeChanged",
	listeners: [], // key = notificationName, value = [] of callback functions
	postMessage: function(notificationName, data) {
		var callbacks = this.listeners[notificationName];
		if (!callbacks) return false;
		for (var i = 0, n = callbacks.length; i < n; i++) {
			if (!callbacks[i] || typeof callbacks[i] != "function") continue;
			callbacks[i].call(this, notificationName, data);
		}
	},

	/**
	 * 添加一个监听者
	 * @param notificationName MINotificationCenter.NOTIFICATION_XXXX
	 * @param callback function pointer, with 2 parameters: msg and data
	 */
	addListener: function(notificationName, callback) {
		if (!notificationName || !callback || typeof callback != "function") {
			log("Empty noficationName or callback or callback is not function pointer");
			return false;
		}

		var callbacks = this.listeners[notificationName];
		if (!callbacks) {
			callbacks = [];
		}
		var found = false;
		for (var i = 0, n = callbacks.length; i < n; i++) {
			if (callbacks[i] === callback) {
				found = true;
				break;
			}
		}

		if (!found) {
			callbacks.push(callback);
		}

		this.listeners[notificationName] = callbacks;
	},

	/**
	 * 删除一个监听者
	 * @param notificationName
	 * @param callback
	 */
	removeListener: function(notificationName, callback) {
		if (!notificationName || !callback || typeof callback != "function") {
			log("Empty noficationName or callback or callback is not function pointer");
			return false;
		}

		var callbacks = this.listeners[notificationName];
		if (!callbacks) return;
		for (var i = callbacks.length; i--;) {
			if (callbacks[i] === callback) {
				callbacks.splice(i, 1);
			}
		}
	}
};


/** Switch iamge to 1x or 2x
 * @param factor: 1 or 2
 */
function switchImage(factor) {
	var div1x = document.getElementById("debug-div1x");
	var div2x = document.getElementById("debug-div2x");
	if (factor == 1) {
		div1x.style.backgroundColor = "#000";
		div1x.style.color = "#fff";
		div2x.style.backgroundColor = "#fff";
		div2x.style.color = "#000";

		var imges = document.querySelectorAll("img");
		for (var i = 0; i < imges.length; i++) {
			var img = imges[i];
			var src = img.getAttribute("src");
			if (src && src.indexOf("@2x") >= 0) {
				var newSrc = src.replace(/@2x/, "");
				img.setAttribute("src", newSrc);
			}
		}

		var blockes = document.querySelectorAll("div, span");
		for (var i = 0; i < blockes.length; i++) {
			var b = blockes[i];
			var src = window.getComputedStyle(b).backgroundImage;
			if (src && src != "none" && src.indexOf("@2x") >= 0) {
				var newSrc = src.replace(/@2x/, "");
				b.style.backgroundImage = newSrc;
			}
		}

	} else  if (factor == 2) {
		div2x.style.backgroundColor = "#000";
		div2x.style.color = "#fff";
		div1x.style.backgroundColor = "#fff";
		div1x.style.color = "#000";

		var imges = document.querySelectorAll("img");
		for (var i = 0; i < imges.length; i++) {
			var img = imges[i];
			var src = img.getAttribute("src");

			if (src) {
				var newSrc;
				if (src.indexOf(".jpg") >= 0) {
					newSrc = src.replace(/.jpg/g, "@2x.jpg");
				} else if (src.indexOf(".png") >= 0) {
					newSrc = src.replace(/.png/g, "@2x.png");
				}
				img.setAttribute("src", newSrc);
			}
		}

		var blockes = document.querySelectorAll("div, span");
		for (var i = 0; i < blockes.length; i++) {
			var b = blockes[i];
			var src = window.getComputedStyle(b).backgroundImage;
			if (src && src != "none" && src.substring(0, 7) != "-webkit") {
				var newSrc;
				if (src.indexOf(".jpg") >= 0) {
					newSrc = src.replace(/.jpg/g, "@2x.jpg");
				} else if (src.indexOf(".png") >= 0) {
					newSrc = src.replace(/.png/g, "@2x.png");
				}
				b.style.backgroundImage = newSrc;
			}
		}

	} else {
		alert("I don't know!");
		return false;
	}
}

//  处理路径的工具类
var MIPathUtil = {
	/**将pathTo相对于pathFrom计算出绝对路径
	 *@param pathFrom 相对于的路径
	 *@param pathTo 相对路径
	 @return 计算后的pathTo的绝对路径。例如：pathFrom = /tmp/folder/a/b.html  pathTo = ../a.html
	 *       计算后的结果是: /tmp/folder/a.html
	 *       由于本代码是运行在浏览器中的，所以无法识别给出的路径是文件路径还是文件夹路径。所以约定无论是pathFrom还是pathTO
	 *       如果是/结尾，则认为是文件夹，反之则认为是文件。
	 *       本方法中的路径分隔符只接受/，不接受windows平台的\。可以支持http://, file://, https:// 协议
	 */
	resolve: function(pathFrom, pathTo) {
		if (!pathFrom || !pathTo) {
			log("Empty pathFrom or pathTo to resolve");
			return null;
		}
		var schema = "";
		var s = pathFrom.toLowerCase();
		if (s.startsWith("mibook://")) {
			schema = "mibook://";
		} else if (s.startsWith("http://")) {
			schema = "http://";
		} else if (s.startsWith("https://")) {
			schema = "https://";
		} else if (s.startsWith("file:///")) {
			schema = "file:///";
		} else if (s.startsWith("/")) {
			schema = "/";
		}

		var purePath = pathFrom.substring(schema.length);
		if (!purePath.endsWith("/")) {
			purePath = purePath.substring(0, purePath.lastIndexOf("/"));
		} else {
			purePath = purePath.substring(0, purePath.length - 1);
		}
		var fromParts = purePath.split("/");

		var toParts = pathTo.split("/");

		var currentIndex = fromParts.length - 1;

		for (var i = 0; i < toParts.length; i++) {
			s = toParts[i];
			if (s == "..") {
				currentIndex -= 1;
			} else if (s == ".") {

			} else {
				fromParts[++currentIndex] = s;
			}
			if (currentIndex < 0) {
				log(MIGlobals.format("can not resole %s to %s ", pathTo, pathFrom));
				return null;
			}
		}
		return schema + fromParts.slice(0, currentIndex + 1).join("/");
	},

	/* 工具类测试代码
	 */
	test: function() {
		var sFrom = "http://localhost:8080/b/dev/c01/c01.html";
		var sTo = "../c02/c01.html";
		log(MIGlobals.format("%s + %s = %s", sFrom, sTo, this.resolve(sFrom, sTo)));
		sFrom =  "mibook://localhost.com/ACVDDD/BBGVFDE/001-00001/c01/a.html";
		sTo = "../../../b.html";
		log(MIGlobals.format("%s + %s = %s", sFrom, sTo, this.resolve(sFrom, sTo)));
		sFrom =  "mibook://localhost.com/ACVDDD/BBGVFDE/001-00001/c01/a.html";
		sTo = "b.html";
		log(MIGlobals.format("%s + %s = %s", sFrom, sTo, this.resolve(sFrom, sTo)));
		return true;
	}
};



