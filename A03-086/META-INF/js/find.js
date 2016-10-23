function MIFindResult() {
	this.startContainer = null;
	this.endContainer = null;
	this.startOffset = -1;
	this.endOffset = -1;
	this.contextText = null;
	this.text = null;
	this.pageTop = -1;
	this.range = null;
	this.windowScrollY = -1;
}

// MIFinder.find("散文");

// DEPRICATED 已废弃
MIFindResult.prototype.calculateContextText = function() {
	if (this.startContainer == null || this.endContainer == null || this.startOffset === -1 || this.endOffset === -1) return false;
	/*
	log("startContainer");
	log(this.startContainer);
	log("endContainer");
	log(this.endContainer);
	log("start offset = " + this.startOffset);
	log("end offset = " + this.endOffset);
	log("start nodeValue = " + this.startContainer.nodeValue);
	log("end nodeValue = " + this.endContainer.nodeValue);
	*/
	return "DUMMY";
	var parts = [];
	var r = null;
	var pos = null;
	var charToExpand = 20;
	pos = this.startOffset > charToExpand ? this.startOffset - charToExpand : 0;
	r = document.createRange();
	r.setStart(this.startContainer, pos);
	r.setEnd(this.startContainer, this.startOffset);
	parts.push(r.toString().replace(/\s/g, ""));


	parts.push(this.text);
	
	pos = this.endOffset > this.endContainer.nodeValue.length - charToExpand ? this.endContainer.nodeValue.length : this.endOffset + charToExpand;
	r = document.createRange();
	r.setStart(this.endContainer, this.endOffset);
	r.setEnd(this.endContainer, pos);
	parts.push(r.toString().replace(/\s/g, ""));
	
	this.contextText = parts.join("");
	return true;
};

MIFindResult.prototype.toString = function() {
	return MIGlobals.format("startOffset = %s, endOffset = %s, pageTop = %s, contextText = %s", 
		this.startOffset, 
		this.endOffset, 
		this.pageTop, 
		this.contextText);
}

MIFindResult.prototype.getRange = function() {
	log(MIGlobals.format("this.windowScrollY = %s, window.scrollY = %s", this.windowScrollY, window.scrollY));
	if (this.windowScrollY != window.scrollY) {
		this.range = this.createRange();
	}
	if (!this.range) {
		this.range = this.createRange();
	}
	return this.range;
};

MIFindResult.prototype.getStartElement = function() {
	var startElementSelectable = true;
	if (this.startContainer.nodeType === 3) {
		startElement = this.startContainer.parentElement;
	} else {
		startElement = this.startContainer;
	}
	return startElement;
};

/**
 * 根据container和offset属性创建Range对象
 * @return range object
 */
MIFindResult.prototype.createRange = function() {
	log("Range is recreated");
	this.windowScrollY = window.scrollY;
	var startElement = null;
	var endElement = null;
	var startElementSelectable = true;
	var endElementSelectable = true;
	if (this.startContainer.nodeType === 3) {
		startElement = this.startContainer.parentElement;
	} else {
		startElement = this.startContainer;
	}

	if (this.endContainer.nodeType === 3) {
		endElement = this.endContainer.parentElement;
	} else {
		endElement = this.endContainer;
	}

	if (window.getComputedStyle(startElement).weikitUserSelect == "none") {
		startElementSelectable  = false;
		startElement.style.webkitUserSelect = "auto";
	}

	if (window.getComputedStyle(endElement).webkitUserSelect == "none") {
		endElementSelectable = false;
		endElement.style.webkitUserSelect = "auto";
	}

	var r = document.createRange();
	r.setStart(this.startContainer, this.startOffset);
	r.setEnd(this.endContainer, this.endOffset);

	if (!startElementSelectable) {
		startElement.style.webkitUserSelect = "none";
	}

	if (!endElementSelectable) {
		endElement.style.webkitUserSelect = "none";
	}

	return r;
}

// MIFinder.find("散文");

var MIFinder = {
	results: [],
	simpleResults: [],
	unselectableElements: [],
	fullTextes: [],
	textToFind : null,
	eleResultBoxes: [], // 标注搜索结果的DIV元素。为了提高性能，所有的搜索结果使用同一套DIV元素，在同一时刻，最多显示一个搜索结果的标注。所以将此元素放置在MIFinder对象中而没有放到MIFindResult对象中

	init: function() {
		MINotificationCenter.addListener(MINotificationCenter.NOTIFICATION_DOM_TREE_CHANGED, this.onNotificationMessage);
	},

	onNotificationMessage: function(msg, data) {
		if (!msg) return false;
		if (msg === MINotificationCenter.NOTIFICATION_DOM_TREE_CHANGED) {
			log("DOM Tree changed, reset MIFinder cache needed");
			MIFinder.reset();
		}
		return true;
	},

	reset: function() {
		if (MIFinder.results.length === 0 && MIFinder.simpleResults.length === 0 && this.textToFind === null) return false;
		MIFinder.results = [];
		MIFinder.simpleResults = [];
		MIFinder.fullTextes = [];
		MIFinder.textToFind = null;
		return true;
	},

	find: function(textToFind) {
		if (!textToFind || this.textToFind === textToFind) {
			this.hide();
			return MIGlobals.makeReturn(this.simpleResults);
		}
		window.scrollTo(0, 1);

		var CONTEXT_TEXT_LENGTH = (30 - textToFind.length) / 2;

		var startTime = new Date();

		this.hide();
		this.results = [];
		this.simpleResults = [];
		this.fullTextes = [];
		var guarder = 0;
		this.textToFind = textToFind;
		this.makeElementsSelectable(); // 对于不可选的节点，暂时设置其为可选状态，以便于find之后可以通过window.getSelection().getRangeAt(0)得到选区信息
		while (window.find(textToFind, false, false, true, true, false, false) && guarder++ < 1000) {
			var r = window.getSelection().getRangeAt(0);

			if (r.startContainer === r.endContainer && r.startOffset === r.endOffset) continue;
			if (this.results.length > 0) {
				var first = this.results[0];
				if (first.startContainer === r.startContainer && first.endContainer === r.endContainer
					&& first.startOffset === r.startOffset && first.endOffset === r.endOffset) {
					break;
				}
			}
			var findResult = new MIFindResult();
			findResult.text = textToFind;
			findResult.startContainer = r.startContainer;
			findResult.startOffset = r.startOffset;
			findResult.endContainer = r.endContainer;
			findResult.endOffset = r.endOffset;

			var parentText = r.commonAncestorContainer.textContent.replace(/\s/g, "");
			
			if (!this.fullTextes[parentText]) {
				this.fullTextes[parentText] = 0;
			} 

			var lastPos = parentText.indexOf(this.textToFind, this.fullTextes[parentText]);
			var startPos = lastPos - CONTEXT_TEXT_LENGTH < 0 ? 0 : lastPos - CONTEXT_TEXT_LENGTH;
			var endPos = lastPos + this.textToFind.length + CONTEXT_TEXT_LENGTH > parentText.length ? parentText.length : lastPos + this.textToFind.length + CONTEXT_TEXT_LENGTH;
			findResult.contextText = parentText.substring(startPos, endPos);

			var thisPos = parentText.indexOf(this.textToFind, lastPos) + this.textToFind.length;
			this.fullTextes[parentText] = thisPos;
			// log("full Parent Text = " + parentText);
			// log("contextText = " + findResult.contextText);
			this.results.push(findResult);

			var simpleResult = {
				contextText: findResult.contextText
			};
			this.simpleResults.push(simpleResult);
		}
		this.makeElementsUnselectable(); // 对于临时设置为可选的不可选元素，恢复其为不可选状态
		var endTime = new Date();
		log(MIGlobals.format("Find %s takes %s ms with %s results", textToFind, endTime - startTime, this.results.length));
		window.getSelection().removeAllRanges();
		return MIGlobals.makeReturn(this.simpleResults);
	},


	// For Debugging
	dumpResults: function() {
		for (var i = 0, n = this.results.length; i < n; i++) {
			log(this.results[i].toString());
		}
	},

	makeElementsSelectable: function(){
		this.unselectableElements = [];
		var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, function(node) {
			if (node.nodeType === 1 
				&& window.getComputedStyle(node).webkitUserSelect == "none"
				&& node.nodeName != "IMG") {
				return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.SKIP;
		}, true);

		var node = null;
		while(node = walker.nextNode()) {
			node.style.webkitUserSelect = "auto";
			this.unselectableElements.push(node);
		}
	},

	makeElementsUnselectable: function() {
		for (var i = this.unselectableElements.length; i--;) {
			this.unselectableElements[i].style.webkitUserSelect  = "none";
		}
		this.unselectableElements = [];
	},

	/**
	 * Show the search result specified by index
	 * @param index
	 * @return If the index is out of bound of the searchResults array, do nothing. else show the search result mark.
	 */
	show: function(index) {
		var iIndex = parseInt(index, 10);
		if (isNaN(iIndex || iIndex < 0 || iIndex >= this.results.length)) {
			log(String.format("Input parameter %s is not correct ", index));
			return "";
		}

		var fr = this.results[iIndex];
		var rng = fr.getRange();
		var rects = rng.getClientRects();
		var rect, box;
		this.expandBoxes(rects.length);

		this.hide();

		var offsetX = window.scrollX;
		var offsetY = window.scrollY;
		if (navigator.userAgent.indexOf("OS 7") >= 0) {
			offsetX = 0;
			offsetY = 0;
		}

		for (i = 0, n = rects.length; i < n; i++) {
			rect = rects[i];
			box = this.eleResultBoxes[i];
			box.style.left = (rect.left + offsetX) + "px";
			box.style.top = (rect.bottom  + offsetY) + "px";
			box.style.height = "1px";
			box.style.width = rect.width + "px";
			box.style.display = "block";
		}

	},

	hide: function() {
		var i, n;
		for (i = 0, n = this.eleResultBoxes.length; i < n; i++) {
			this.eleResultBoxes[i].style.display = "none";
		}
	},

	/**
	 * Get the position (top value) of the search result
	 * The client will scroll the window to the y-position of the search result
	 * @param index
	 * @return if the index is out of bounds of the searchResult array return empty string ""
	 * else, return the y (pageTop) value of the searchResult specified by index in string format (for client) or number (for js)
	 */
	getPosition: function(index) {
		var iIndex = parseInt(index, 10);
		if (isNaN(iIndex || iIndex < 0 || iIndex >= this.results.length)) {
			log(String.format("Input parameter %s is not correct ", index));
			return "";
		}

		var fr = this.results[iIndex];
		var ele = fr.getStartElement();
		var rect = ele.getBoundingClientRect();
		var ret = rect.top + window.scrollY;
		if (MIGlobals.isRunningInMosoBooks) {
			return JSON.stringify(ret);
		} else {
			return ret;
		}
	},

	expandBoxes : function(newSize) {
		if (newSize <= this.eleResultBoxes.length) return false;
		var count = newSize - this.eleResultBoxes.length;
		for (var i = 0; i < count; i++) {
			var eleDiv = document.createElement("DIV");
			eleDiv.style.position = "absolute";
			eleDiv.style.borderBottom = "2px solid #f00";
			eleDiv.style.backgroundColor = "tranparent";
			eleDiv.style.display = "none";
			document.body.appendChild(eleDiv);
			this.eleResultBoxes.push(eleDiv);
		}

		return true;
	}
};



