// -----------------------------------
// Definition of enumeration and constants
// -----------------------------------
var SELECTION_RESULT = {
	INVALID_SELECTION : 0,
	NO_HIGHLIGHT_OR_NOTE_INCLUDE : 1,
	ONE_HIGHLIGHT_INCLUDE : 2,
	MORE_THAN_ONE_HIGHLIGHT_INCLUDE : 3,
	ONE_NOTE_INCLUDE : 4,
	MORE_THAN_ONE_NOTE_INCLUDE : 5,
	BOTH_HIGHLIGHT_OR_NOTE_INCLUDE : 6,
	TOO_MANY_SELECTED: 7,
	INSIDE_HIGHLIGHT_OR_NOTE: 8 // 选中区域为已有的高亮或者笔记之间的一部分，此时客户端无需弹出和高亮、笔记相关的菜单
};

// -----------------------------------
// Definition of Object MISelectionTestResult
// -----------------------------------
function MISelectionTestResult() {
	this.startOffset = -1;
	this.endOffset = -1;
	this.result = SELECTION_RESULT.INVALID_SELECTION;
	this.markIdsInclude = [];
}

// -----------------------------------
// Definition of MIMark
// -----------------------------------
function MIMark() {
	this.startOffset = -1;
	this.endOffset = -1;
	this.uuid = null;
	this.top = -1;			// 相对于视口的Top
	this.bottom = -1;		// 相对于视口的Bottom
	this.pageTop = -1;		// 相对于整个文档的Top，包括高亮、笔记、书签
	this.pageBottom = -1;	// 相对于整个文档的Bottom

	this.type = MIMark.TYPE_HIGHLIGHT;
	this.text = "";
	this.userId = null; // The owner of the mark

}

MIMark.TYPE_HIGHLIGHT = "H";	// Highlight
MIMark.TYPE_NOTE = "N";			// Note
MIMark.TYPE_BOOKMARK = "B";		// Bookmark
MIMark.noteImgCenterX = 30;
MIMark.noteImgTopOffset = 3;
MIMark.lastSpan = null;	//记录高亮转笔记之后的最后一个span

MIMark.prototype.intersect = function(anotherMark) {

	if (typeof anotherMark == "undefined" || anotherMark == null) return false;
	if (anotherMark.endOffset <= this.startOffset
		|| anotherMark.startOffset >= this.endOffset) return false;

	if (this.startOffset === anotherMark.endOffset 
		|| this.endOffset === anotherMark.startOffset) return false;
	

	if (this.startOffset === anotherMark.startOffset || this.endOffset === anotherMark.endOffset) return true;
	if (anotherMark.startOffset < this.startOffset && this.startOffset < anotherMark.endOffset) return true;
	if (this.startOffset < anotherMark.startOffset && anotherMark.startOffset < this.endOffset) return true;
	if (anotherMark.startOffset < this.endOffset && this.endOffset < anotherMark.endOffset) return true;
	if (this.startOffset < anotherMark.endOffset && anotherMark.endOffset < this.endOffset) return true;

	return false;
};

MIMark.prototype.initWithPosition = function(startOffset, endOffset) {
	this.startOffset = startOffset;
	this.endOffset = endOffset;
	return this;
};

MIMark.prototype.initWithSelection = function(selection) {
	if (isEmptySelection(selection)) {
		log("Empty selection");
		return false;
	}
	var range = selection.getRangeAt(0);
	var s = range.toString();
	s = s.replace(/\s/g, "");
	s = s.replace(/\n/g, "");
	if (s.length === 0) {
		return false;
	}
	var ret = this.initWithRange(range.startContainer,
						range.startOffset,
						range.endContainer,
						range.endOffset);

	return ret;
};


/** 根据selection中的range对象初始化MIMark对象
 * 如果选区内包含了不可选内容，比如 页内画廊，则返回false
 * 如果是有效的选择区域，则返回true，并且初始化MIMark的startOffset和endOffset属性
 * 判断是否有效选区有2个条件：
 * 1. 选区内包含了内容可以变化的元素，比如页内画廊翻转不同图片时画廊右侧的文字发生变化。视为无效选区。
 * 2. 选区是从子元素到达父元素的选择。比如一个表格的最末一行选择，此时的endContainer会变成body元素，目前暂时不处理这种情况。视为无效选区
 */
MIMark.prototype.initWithRange = function(startContainer, startOffset, endContainer, endOffset) {


	var allNodes = MINode.getAllNodes(false);
	var startIndex = -1;
	var endIndex = -1;

	for (var i = 0, n = allNodes.length; i < n; i++) {
		var minode = allNodes[i];
		if (startContainer === minode.domNode) {
			startIndex = i;
		}
		if (endContainer === minode.domNode) {
			endIndex = i;
		}

		if (startIndex !== -1 && !minode.selectableNode) {
			log("Invalid selection because unselectable node is included");
			return false;
		}
		if (startIndex !== -1 && endIndex !== -1) break;
	}

	if (endIndex < startIndex) {
		log("Invalide selection because endIndex is before of startIndex");
		return false;
	}
	
	allNodes = MINode.getAllNodes(true);
	startIndex = -1;
	endIndex = -1 ;
	for (i = 0, n = allNodes.length; i < n; i++) {
		minode = allNodes[i];
		if (startContainer === minode.domNode) {
			startIndex = i;
			this.startOffset = minode.textOffset + startOffset;
		}
		if (endContainer === minode.domNode) {
			endIndex = i;
			this.endOffset = minode.textOffset + endOffset;
		}
		if (startIndex !== -1 && endIndex !== -1) break;
	}

	if (endIndex < startIndex) {
		log("Invalude selection because endIndex is before of startIndex");
		return false;
	}

	log(MIGlobals.format("Selection index start from %s to %s", startIndex, endIndex));
	log(MIGlobals.format("Selection text position start from %s to %s", this.startOffset, this.endOffset));
	return true; 

};


MIMark.prototype.createDOMElements = function() {
	var spans = [];
	var textparts = [];
	var topMostSpan;
	var lastSpan; // 标记的高亮中最后一个块
	var allNdoes = null;
	var i, n; // loop indicator
	var s;
	var r; // range object
	var domSpan; // temp span object
	var startMINode = null;
	var endMINode = null;
	var startMINodeIndex = -1;
	var endMINodeIndex = -1;
	var minode;
	var rect;
	var top = Number.MAX_VALUE, bottom = Number.MIN_VALUE;


	// Bookmark. Create bookmark element and return
	if (this.type == MIMark.TYPE_BOOKMARK) {

		var eleBookmark = document.createElement('div');
		eleBookmark.className = 'bookmark';
		eleBookmark.style.top = this.pageTop + 'px';
		eleBookmark.id = this.uuid;
		
		eleBookmark.setAttribute("data-mark-id", this.uuid);
		document.body.appendChild(eleBookmark);
		eleBookmark.addEventListener(MIGlobals.eventTouchStart, markSpanOnTouchStart, false);
		eleBookmark.addEventListener(MIGlobals.eventTouchEnd, markSpanOnTouchEnd, false);
		if (MIGlobals.isTouchSupported) {
			eleBookmark.addEventListener(MIGlobals.eventTouchMove, markSpanOnTouchMove, false);
			eleBookmark.addEventListener(MIGlobals.eventTouchCancel, markSpanOnTouchCancel, false);
		}
		return true;
	}

	if (!this.uuid) this.uuid = "M-" + uuid.v4().toUpperCase();

	if (this.startOffset === -1 && this.endOffset === -1) {
		log("Invalid selection of startOffset and endOffset both -1");
		return false;
	}

	allNodes = MINode.getAllNodes(true);
	for (i = 0, n = allNodes.length; i < n; i++) {
		minode = allNodes[i];
		if (minode.domNode.nodeType === 1) continue;
		if (minode.textOffset <= this.startOffset && this.startOffset <= minode.textOffset + minode.textLength) {
			startMINodeIndex = i;
		}
		if (minode.textOffset <= this.endOffset && this.endOffset <= minode.textOffset + minode.textLength) {
			endMINodeIndex = i;
		}
		if (startMINodeIndex !== -1 && endMINodeIndex !== -1) break;
	}

	if (endMINodeIndex < startMINodeIndex) {
		log(MIGlobals.format("Invalid selection of test offset from %s to %s", startMINodeIndex, endMINodeIndex));
	}


	for (i = endMINodeIndex; i >= startMINodeIndex; i--) {
		minode = allNodes[i];
		if (minode.domNode.nodeType === 1) continue;
		if (minode.domNode.nodeType === 3) {
			s = minode.domNode.nodeValue;
			s = s.replace(/\s/g, "");
			s = s.replace(/\n/g, "");
			if (s.length === 0) {
				log("Empty node");
				continue;
			}
		}

		domSpan = this.createMarkSpan();
		topMostSpan = domSpan;
		
		if ( ! lastSpan) {

			lastSpan = domSpan;
		}

		spans.push(domSpan);
		r = document.createRange();

		
		if (i !== startMINodeIndex && i !== endMINodeIndex) {
			r.selectNode(minode.domNode);
		} else {
			if (i === startMINodeIndex) {
				r.setStart(minode.domNode, this.startOffset - minode.textOffset);
			} else {
				r.setStart(minode.domNode, 0);
			}
			if (i === endMINodeIndex) {
				r.setEnd(minode.domNode, this.endOffset - minode.textOffset);
			} else {
				r.setEnd(minode.domNode, minode.textLength);
			}
		}
		r.surroundContents(domSpan);
		s = r.toString();
		textparts.push(s.replace(/\s/g, " "));
		rect = domSpan.getBoundingClientRect();
		log("rect.top = " + rect.top + ", window.scrollY = " + window.scrollY);
		if (rect.top < top) top = rect.top;
		if (rect.bottom > bottom) bottom = rect.bottom;
	}

	// Mark data can not match the content, ignore it.
	if (typeof topMostSpan == "undefined" || topMostSpan == null) {
		return false;
	}



	topMostSpan.setAttribute("id", this.uuid);
	if (lastSpan) {
		// add
		MIMark.lastSpan = lastSpan;
		spans = document.querySelectorAll("span.mark[data-mark-id='" + this.uuid + "']");
		if (this.type == MIMark.TYPE_NOTE) {
			if(!MIGlobals.hasClass(lastSpan, 'mark-others') && !MIGlobals.hasClass(lastSpan, 'others-note') && !MIGlobals.hasClass(lastSpan, 'others-note-line')){
				
				for (var i = 0; i < spans.length; i++) {
					spans[i].setAttribute("class","mark noteicon");
				}
				lastSpan.setAttribute("class","mark note-icon");
				
			} else{
				for (var i = 0; i < spans.length; i++) {
					spans[i].setAttribute("class","mark othersnote");
				}
				lastSpan.setAttribute("class","mark others-note");
			}
		}
	}
	this.top = top;
	this.bottom = bottom;
	this.pageTop = top + window.scrollY;
	this.pageBottom = bottom + window.scrollY;

	textparts.reverse();
	this.text = textparts.join("");

	for (i = spans.length; i--;) {
		domSpan = spans[i];
		domSpan.addEventListener(MIGlobals.eventTouchStart, markSpanOnTouchStart, false);
		domSpan.addEventListener(MIGlobals.eventTouchEnd, markSpanOnTouchEnd, false);
		if (MIGlobals.isTouchSupported) {
			domSpan.addEventListener(MIGlobals.eventTouchMove, markSpanOnTouchMove, false);
			domSpan.addEventListener(MIGlobals.eventTouchCancel, markSpanOnTouchCancel, false);
		}
	}

	// Post message to notification center
	MINotificationCenter.postMessage(MINotificationCenter.NOTIFICATION_DOM_TREE_CHANGED, null);

};

MIMark.prototype.deleteDOMElements = function() {
	var spans = null;
	
	if (this.type == MIMark.TYPE_BOOKMARK) {
		document.body.removeChild(document.getElementById(this.uuid));
	} else {
		spans = document.querySelectorAll("span.mark[data-mark-id='" + this.uuid + "']");
		
		// spans = document.querySelectorAll("span.mark[data-mark-id='" + this.uuid + "']");
		//log(ids[i] + " span count: " + spans.length);
		for (var j = spans.length - 1; j >= 0; j--) {
			var s = spans[j];
			s.removeEventListener(MIGlobals.eventTouchStart, markSpanOnTouchStart, false);
			s.removeEventListener(MIGlobals.eventTouchEnd, markSpanOnTouchEnd, false);
			if (MIGlobals.isTouchSupported) {
				s.removeEventListener(MIGlobals.eventTouchMove, markSpanOnTouchMove, false);
				s.removeEventListener(MIGlobals.eventTouchCancel, markSpanOnTouchCancel, false);
			}
			s.removeAttribute("id");
			s.removeAttribute("data-mark-id");
			s.setAttribute("class", "mark-delete");
			s.removeAttribute("style");
		}
		MINotificationCenter.postMessage(MINotificationCenter.NOTIFICATION_DOM_TREE_CHANGED, null);
	}
};

MIMark.prototype.createSpaceSpan = function(){

	var s = document.createElement("span");
	s.setAttribute("class", "mark-space");
	var t = document.createTextNode(" ");
	s.appendChild(t);
	return s;
};

MIMark.prototype.createMarkSpan = function () {
	var objSpan = document.createElement("SPAN");
	objSpan.setAttribute("data-mark-id", this.uuid);
	// objSpan.setAttribute("data-zero-width-char", ""); // for css .mark:after attr expression
	
	if (this.userId === MIMarkManager.currentUserId) {
		objSpan.setAttribute("class", "mark hightlight");
		
	} else {
		
		if(this.type == MIMark.TYPE_HIGHLIGHT){
			objSpan.setAttribute("class", "mark mark-others");
		} else{
			objSpan.setAttribute("class", "mark others-note-line");
			
		}
		
		
	}
	
	var uuid = this.uuid;

	return objSpan;
};

/** Check if this mark is overlapping or intersect with others
 * CAUTION: Before you call this method, you must ensure the MIMark
 * object (this) has been init with position or calculated it's position.
 * That means this.startOffset and this.endOffset have been set right values.
 * @ param allMarks the collection of marks in the whole page
 * @ return MISelectionTestResult object instance 
 */
MIMark.prototype.selectionTest = function(allMarks) {


	var noteCount = 0;
	var highlightCount = 0;
	var index = 0;
	var ret = new MISelectionTestResult();
	var inside = false;

	if (this.endOffset - this.startOffset > 500) {
		ret.result = SELECTION_RESULT.TOO_MANY_SELECTED;
		return ret;
	}

	for (var k in allMarks) {
		var anotherMark = allMarks[k];
		if (anotherMark.userId != MIMarkManager.currentUserId) continue;
		if (this.intersect(anotherMark)) {
			if (anotherMark.type == MIMark.TYPE_HIGHLIGHT) {
				highlightCount += 1;
				ret.markIdsInclude[index++] = anotherMark.uuid;
			} else if (anotherMark.type == MIMark.TYPE_NOTE) {
				noteCount += 1;
				ret.markIdsInclude[index++] = anotherMark;
			}

			if (anotherMark.startOffset <= this.startOffset && this.endOffset <= anotherMark.endOffset) {
				inside = true;
			} 

			if (anotherMark.startOffset < this.startOffset) this.startOffset = anotherMark.startOffset;
			if (anotherMark.endOffset > this.endOffset) this.endOffset = anotherMark.endOffset;
		}
	}
	log("Hightlight count = " + highlightCount + ", Note count = " + noteCount);
	if (inside) {
		ret.result = SELECTION_RESULT.INSIDE_HIGHLIGHT_OR_NOTE;
	} else if (noteCount == 0 && highlightCount == 0) {
		ret.result = SELECTION_RESULT.NO_HIGHLIGHT_OR_NOTE_INCLUDE;
	} else if (noteCount > 0 && highlightCount > 0) {
		ret.result = SELECTION_RESULT.BOTH_HIGHLIGHT_OR_NOTE_INCLUDE;
	} else {
		if (noteCount == 0) {
			if (highlightCount == 1) {
				ret.result = SELECTION_RESULT.ONE_HIGHLIGHT_INCLUDE;
			} else {
				ret.result = SELECTION_RESULT.MORE_THAN_ONE_HIGHLIGHT_INCLUDE;
			}
		} else if (highlightCount == 0) {
			if (noteCount == 1) {
				ret.result = SELECTION_RESULT.ONE_NOTE_INCLUDE;
			} else {
				ret.result = SELECTION_RESULT.MORE_THAN_ONE_NOTE_INCLUDE;
			}
		} 
	}
	// Set the most left position and the most right position
	ret.startOffset = this.startOffset;
	ret.endOffset = this.endOffset;
	return ret;
};


MIMark.prototype.toString = function() {
	return MIGlobals.format("uuid = %s, startOffset = %s, endOffset = %s, text = %s, pageTop = %s, pageBottom = %s",
		this.uuid,
		this.startOffset,
		this.endOffset,
		this.text,
		this.pageTop,
		this.pageBottom);
};

/** 找到当前视图中可以进行标签标记的元素。
 *@return 如果没有找到合适的元素，则返回null
 */
MIMark.prototype.findBookmarkableElement = function() {
	var guarder = 0;
	var xStep = 10;
	var yStep = 10;
	var x = 60;
	var y = 20;
	var ele = null;

	while (guarder++ < 500) {
		ele = document.elementFromPoint(x, y);
		if (ele != null && ele.textContent != null) {
			var s = ele.textContent.replace(/\s/g, ''); 
			if (s.length > 0) {
				return ele;
			}
		} else {
			x += 10;
			y += 10;
		}
	}
	return null;
};

/** Create or load a bookmark
 *@param markId If the mark is newly created, the markId is null, else, it's the real id
 *@param yPosition If the mark is newly created, the yPosition is -1. else it's the real position
 */
// ----------------------------------------------------
// Definition of class IndexPath
// ----------------------------------------------------

function MINode() {
	this.indexPathString = "";
	this.textOffset = 0;
	this.textLength = 0;
	this.nodeType = -1;
	this.nodeName = "";
	this.domNode = null;
	this.selectableNode = true;
}


MINode.prototype.toString = function() {
	if (this.domNode.nodeType == 3) {
		return MIGlobals.format("nodeValue : %s",this.domNode.nodeValue);
	} else if (this.domNode.nodeType == 1) {
		return MIGlobals.format("nodeId : %s, selectable: %s", this.domNode.getAttribute("id"), this.selectableNode);
	}
};

/** 使用treeWalker遍历所有的页面可见元素。
 * @param excludeUnselectableNode 是否将不可选的元素过滤掉。
 * 如果设置为false，则返回结果中仅包含可选元素；反之返回结果中会包含所有可见元素
 * 包含了不可选元素的结果主要是用来判断当前的选区是否跨越了不可选的元素
 * IMG元素不受此参数影响，IMG元素及其均不包含在返回结果中
 */
MINode.getAllNodes = function(excludeUnselectableNode) {
	var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, 
		function(node){
			if (node.nodeType == 1 && node.nodeName == "IMG") {
				return NodeFilter.FILTER_REJECT;
			}
			if (excludeUnselectableNode) {
				if (node.nodeType == 1 && window.getComputedStyle(node).webkitUserSelect == "none") {
					return NodeFilter.FILTER_REJECT;
				}
			}
			return NodeFilter.FILTER_ACCEPT;
		}, true);

	var retMINodes = [];
	var domNode = null;
	var totalTextLen = 0;

	while(domNode = walker.nextNode()) {
		var miNode = new MINode();
		miNode.domNode = domNode;
		// log(domNode);

		if (domNode.nodeType == 1) {
			miNode.textOffset = totalTextLen;
			miNode.textLength = 0;
		} else if (domNode.nodeType == 3) {
			var s = domNode.nodeValue;
			var len = s.length;
			miNode.textOffset = totalTextLen;
			miNode.textLength = len;
			totalTextLen += len;
		}

		if (!excludeUnselectableNode) {
			if (domNode.nodeType == 1) {
				if (window.getComputedStyle(domNode).webkitUserSelect == "none") {
					miNode.selectableNode = false;
				}
			} else if (domNode.nodeType == 3) {
				var pEle = domNode.parentElement;
				if (window.getComputedStyle(pEle).webkitUserSelect == "none") {
					miNode.selectableNode = false;
				}
			}
		}

		retMINodes.push(miNode);
	}

	return retMINodes;
};



/**
 * Test if the window.getSelection is empty or not.
 * @param sel Selection object
 * @return If there is something in the selection, return true; else return false;
 */
function isEmptySelection(sel) {
	if (typeof sel == "undefined" || sel == null || sel.toString().length == 0) return true;
	var r = sel.getRangeAt(0);
	if (typeof r == "undefined" || r == null) return true;
	return false;
}


// Definition of class NoteBox
var MIMarkManager = {
	marks: [],     // key-value, key is the uuid of mark, value is the mark object itself
	currentUserId: null, // The current user id


	setCurrentUserId: function(userId) {
		MIMarkManager.currentUserId = userId;
		return true;
	},

	/**
	 * @param markId - 
	 * @param markTop pageTop of the mark
	 */
	
	findMarkById : function(markId) {
		return this.marks[markId];
	},

	/** Mark the current selection as highlight mark
	 * @return the MIMark uuid or "-1" for invalid selection
	 */
	createMark: function(startOffset, endOffset, type, userId, color) {
		return this.loadMark(null, startOffset, endOffset, type, userId, color);
	},

	/** 创建标记。包括从已经存储的数据中恢复标记以及直接创建新的标记
	 * @param markId 如果是从已经存储的数据中恢复标记的， 这里指明标记的UUID；如果是新创建标记的，此参数为null即可
	 * @param startOffset 开始位置。仅针对高亮和笔记有效，如果是创建书签则传入-1，如果是加载书签，则传入书签的纵向坐标，即书签的Y_POSITION
	 * @param endOffset 结束位置。仅针对高亮和笔记有效，如果是创建或者加载书签，则传入-1
	 * @param type 标记类型，'H' - 高亮，'N' - 笔记, 'B' - 书签
	 * @return 返回值，JavaScript对象或者JSON字符串表达的JavaScript对象，格式如下：
	 * {markId: "the uuid of the mark", top: topValue, bottom: bottomValue, noteIconCenterX: noteIconCenterXInPixel, text: "the selected text"}
	 * 这里的top和bottom值都是指到浏览器窗口左上角的位置，不包含纵向上已经滚动的位置
	 * 如果返回的markId为字符串'-1'，表示创建失败。主要是出现在创建书签的时候，如果在同样的位置已经有了书签了，就不再进行创建。
	 * 对于客户端而言，如果是创建书签，并且返回了markId为'-1'，那么客户端可以忽略此返回值，不做任何处理。
	 */
	loadMark: function(markId, startOffset, endOffset, type, userId, color) {
		log(MIGlobals.format("Create mark: id=%s, startOffset=%s, endOffset=%s, type=%s", markId, startOffset, endOffset, type, color));
		var id;
		try {
			if (markId && MIMarkManager.marks[markId]) {
				id = markId;
			} else {
				var mark = new MIMark();
				var creatorUserId = userId ? userId : MIMarkManager.currentUserId;
				mark.userId = creatorUserId;
				mark.initWithPosition(startOffset, endOffset);
				mark.uuid = markId;
				log('uuid = ' +mark.uuid);
				log(mark.uuid);
				log( "userId" + userId)

				mark.type = type || MIMark.TYPE_HIGHLIGHT;
				mark.createDOMElements();
				this.marks[mark.uuid] = mark;
				id = mark.uuid;
				if (color != null) {
					this.changeMarkColor(mark.uuid,color);
				}
				
				if (mark.type == MIMark.TYPE_NOTE) {
					this.markAsNote(mark.uuid);
				}
			}
			
			if (id && id != "-1") {
				var o = MIMarkManager.getMarkInformation(id); // MIMarkManager.getMarkInformation has escape js object or js object in JSON string format
				return o;
			} else {
				return MIGlobals.makeReturn({markId : "-1"});
			}
		} catch (err) {
			log("JavaScript Error: " + err.toString());
			return MIGlobals.makeReturn({markId : "-1"});
		}
	},

	/** 删除一个标记。如果该标记是笔记类型的，则连带笔记的图标一并删除；
	 * 如果当前位置还有其他的笔记，则笔记图标保留，并视情况而定是否要修改笔记图标图片。
	 * @param markId 要删除的标记ID
	 */
	deleteMark: function(markId) {

		var mark = this.marks[markId];

		if (mark) {
			mark.deleteDOMElements();
			delete this.marks[markId];
		}
		return true;
	},

	/** 删除多个标注
	 * @param markIds, 字符串数组，多个标注ID
	 */
	deleteMarks: function(markIds) {

		for (var i = markIds.length; i--;) {
			this.deleteMark(markIds[i]);
		}
		return true;
	},
	/**
	 * Test the current selection is valid or not. or other marks are included in.
	 * @return String of MISelectionTestResult object in JSON format
	 */
	preCheck: function () {
		var w = new MIWatch();
		log("MIMarkManager.preCheck entered");
		var ret = new MISelectionTestResult();
		if (!isEmptySelection(window.getSelection())) {
			var s = window.getSelection().toString();
			s = s.replace(/\s/g, "");
			if (s.length > 0) {
				var mark = new MIMark();
				var initRet = mark.initWithSelection(window.getSelection());
				if (!initRet) {

				} else {
					ret = mark.selectionTest(this.marks);
				}
			}
		}
		w.check("preCheck OK");
		w.dumpInfo();
		if (MIGlobals.isRunningInMosoBooks) {
			return JSON.stringify(ret);
		} else {
			return ret;
		}
	},
/**设置笔记和高亮的颜色**/
	changeMarkColor:function(markId, color){
		log(this.marks[markId]);
		var c = this.marks[markId];
		if (c) {
			var colordome =document.querySelectorAll("span.mark[data-mark-id='" + markId + "']");
			for (var i = 0; i < colordome.length; i++) {
				colordome[i].style.backgroundColor= color;
			}
		}
	},
	/**将标注转换为笔记类型。标注ID不会发生变化，只是将其类型设置为笔记，并为其显示左侧笔记图标
	 * @param markId 要转换的标注ID
	 */
	markAsNote: function(markId) {
		var m = this.marks[markId];
		var ret = "";
	

		if (m) {
			
			if(m.type == 'H'){

				var spans = document.querySelectorAll("span[data-mark-id = '" + m.uuid + "']");

				var lastSpan = spans[spans.length - 1];
				if(!MIGlobals.hasClass(lastSpan, 'others-note-line') && !MIGlobals.hasClass(lastSpan, 'others-note')){
					for (var i = spans.length - 1; i >= 0; i--) {
						spans[i].setAttribute('class', 'mark noteicon')
					}
					lastSpan.setAttribute('class', 'mark note-icon');
				}
				
			}
			
			m.type = MIMark.TYPE_NOTE;
			
			ret = MIMarkManager.getMarkInformation(markId);
		} 

		return ret;

	},

	/** 将标注转换为高亮类型。标注ID不会发生变化，只是将其类型设置为高亮，并将其左侧对应的笔记图标去除
	 * @param markId 要转换的标注ID
	 */
	markAsHighlight: function(markId) {
		var m = this.marks[markId];
		var ret = "";
		if (m) {
			m.type = MIMark.TYPE_HIGHLIGHT;
			ret = MIMarkManager.getMarkInformation(markId);

			//在手机端时候，移除小图标
			var lastSpan = document.getElementById(m.uuid);
			var spans = document.querySelectorAll("span[data-mark-id = '" + m.uuid + "']");
			for (var i = spans.length - 1; i >= 0; i--) {
						
					MIGlobals.removeClass(spans[i], 'noteicon');
				}
			MIGlobals.removeClass(lastSpan, 'note-icon');
			
			
		}

		return ret;
	},

	/** 获取标注的详细信息。使用场景：客户端在左侧标注列表中点击某条标注时，
	 * 如果此标注是笔记，则需要在笔记对应的图标上显示弹窗，此时，客户端是需要知道此位置的笔记图标对应哪些笔记的ID
	 * @param markId 标注ID
	 * @return
	 */
	getMarkInformation: function(markId) {
		var ret = null;

		var mark = MIMarkManager.findMarkById(markId);
		if (mark) {
			if (mark.type == MIMark.TYPE_HIGHLIGHT) {
				// 如果是高亮，则返回ID和类型。其实客户端在标记列表中点击项的时候，是知道类型的
				// 所以，此段代码客户端应该不会调用到
				ret = {
					"markId" : markId,
					type: "H",
					top: mark.pageTop - window.scrollY,
					bottom: mark.pageBottom - window.scrollY,
					pageTop: mark.pageTop,
					pageBottom: mark.pageBottom,
					userId: mark.userId,
					text: mark.text
				};
			} else if (mark.type == MIMark.TYPE_NOTE) {
				// 如果是笔记，则返回在同一位置的笔记图标所对应的所有笔记ID，并且告诉客户端当前笔记图标的基于视口的位置和基于页面的位置
				ret = {
					"markId" : markId,
					type: "N",
					top: mark.pageTop - window.scrollY,
					bottom: mark.pageBottom - window.scrollY,
					pageTop: mark.pageTop,
					pageBottom: mark.pageBottom,
					idsInclude: mark.uuid,
					text: mark.text
				};
				
			} else if (mark.type == MIMark.TYPE_BOOKMARK) {
				ret = {
					"markId" : markId,
					type: "B",
					top: mark.pageTop - window.scrollY,
					pageTop: mark.pageTop,
					text: mark.text
				};
			}
		} else {
			// Something wrong, mostly the mark data can not match the content
			ret = {markId: "-1"};
		}
		if (MIGlobals.isRunningInMosoBooks) {
			return JSON.stringify(ret);
		} else {
			return ret;
		}
	},

	/**
	 * 删除当前页上其他人的高亮和笔记
	 */
	hideOthers: function() {
		var currentUserId = this.currentUserId;
		for (var id in this.marks) {
			var m = this.marks[id];
			if (m.type == MIMark.TYPE_BOOKMARK) continue;
			if (m.userId != currentUserId) {
				this.deleteMark(id);
			}
		}
		return true;
	}
};


function markSpanOnTouchStart(e) {
	

	this.setAttribute("data-moved", "n");
	if (MIGlobals.hasClass(this, "bookmark")) {
		var rect = this.getBoundingClientRect();
		this.setAttribute("data-top", rect.top);
	} else {
		var p = MIPoint.pointFromEvent(e);
		var ret = MIGlobals.detectClickRectTopAndBottom(this, p.clientX, p.clientY);
		this.setAttribute("data-top", ret.top);
		this.setAttribute("data-bottom", ret.bottom);
	}
	
}

function markSpanOnTouchMove(e) {
	this.setAttribute("data-moved", "y");
}

function markSpanOnTouchCancel(e) {
}

function markSpanOnTouchEnd(e) {
	if (this.getAttribute("data-moved") == "y") {
		log("Span is moved");
		return false;
	}
	
	log(this);
	if (typeof (window.getSelection()) != "undefined" 
		&& window.getSelection() != null
		&& window.getSelection().toString() != null
		&& window.getSelection().toString().replace(/\s/g, "").length > 0) {
		log("window.getSelection().rangeCount = " + window.getSelection().rangeCount);
		log("window.getSelection().toString() = " + window.getSelection().toString());
		log("User has selected something");
		return false;
	}
	
	var markId = this.getAttribute("data-mark-id");
	var mark = MIMarkManager.findMarkById(markId);
	log('');
	log(mark);
	if (!mark) {log("Can not find mark with id " + markId);}
	if (mark) {
		
		//add 传给后台的笔记的id和文本
		if (mark.type == MIMark.TYPE_HIGHLIGHT) {
			if (mark.userId != MIMarkManager.currentUserId) return false;
			// @param type - 标注类型，HIGHLIGHT - 高亮， NOTE - 笔记
			// @param ids - 本次点击所包含的标注ID，如果是多个ID，则用逗号（,）分隔。其中逗号已经被编码，需要解码后在拆分
			// @param top - 点击所对应标注的整行顶位置，相对于视口
			// @param bottom - 点击所对应的标注的整行底位置，相对于视口
			// @param markPageTop - 整个标注对应的顶, 相对于整个页面
			// @param markPageBottom - 整个标注对应的底, 相对于整个页面

			url = MIGlobals.format("/mark?type=HIGHLIGHT&ids=%s&top=%s&bottom=%s&markPageTop=%s&markPageBottom=%s&userId=%s", 
				markId, 
				this.getAttribute("data-top"),
				this.getAttribute("data-bottom"),
				mark.pageTop,
				mark.pageBottom,
				encodeURIComponent(mark.userId));
			
		} else if (mark.type == MIMark.TYPE_NOTE) {
				// 	// @param 其他参数同上
				// 	// @param noteIconCenterX - 笔记图标在横向的中心点位置

			var arr = [];
			arr['user_id'] = mark.userId;
			arr['text'] = mark.text;
				
			
			url = MIGlobals.format("/mark?user_id=%s&text=%s&type=NOTE&id=%s&top=%s&bottom=%s&pageTop=%s&pageBottom=%s", 
				arr.user_id,
				arr.text,
				encodeURIComponent(mark.uuid),
				// mark.pageTop - window.scrollY,
				// mark.pageBottom - window.scrollY,
				this.getAttribute("data-top"),
				this.getAttribute("data-bottom"),
				mark.pageTop,
				mark.pageBottom);
		}

		e.stopPropagation(); // 防止同时显示自己和别人笔记时的嵌套触发事件，所以停止事件继续传播。或者在本来就有点击操作的文字上加了标注之后的点击事件被出发多个

		if (MIGlobals.isRunningInMosoBooks) {
			window.location.href = url;
		} else {
			log(url);
		}
	}
}