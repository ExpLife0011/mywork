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
	TOO_MANY_SELECTED: 7
};



// -----------------------------------
// Definition of Object MISelectionTestResult
// -----------------------------------
function MISelectionTestResult() {
	this.startOffset = 0;
	this.endOffset = 0;
	this.result = SELECTION_RESULT.INVALID_SELECTION;
	this.markIdsInclude = [];
}

// -----------------------------------
// Definition of MIMark
// -----------------------------------
function MIMark() {
	this.startOffset = 0;
	this.endOffset = 0;
	this.uuid = null;
	this.top = 0;			// 相对于视口的Top
	this.bottom = 0;		// 相对于视口的Bottom
	this.pageTop = 0;		// 相对于整个文档的Top
	this.pageBottom = 0;	// 相对于整个文档的Bottom

	this.type = MIMark.TYPE_HIGHLIGHT;
	this.noteBoxId = null;
	this.text = "";
	this.userId = null; // The owner of the mark
	this.nickName = null; // The owner's nick name
}

MIMark.TYPE_HIGHLIGHT = "H";
MIMark.TYPE_NOTE = "N";

MIMark.prototype.intersect = function(anotherMark) {
	if (typeof anotherMark == "undefined" || anotherMark == null) return false;
	if (anotherMark.endOffset <= this.startOffset
		|| anotherMark.startOffset >= this.endOffset) return false;

	if (this.startOffset <= anotherMark.startOffset && anotherMark.startOffset <= this.endOffset) return true;
	if (this.startOffset <= anotherMark.endOffset && anotherMark.endOffset <= this.endOffset) return true;

	/*
	if ((anotherMark.startOffset <= this.startOffset && this.startOffset <= anotherMark.endOffset)
		|| (anotherMark.startOffset <= this.endOffset && this.endOffset <= anotherMark.endOffset)
		|| (this.startOffset <= anotherMark.startOffset && this.endOffset >= anotherMark.endOffset)) {
		return true;
	} 
	*/
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

	this.initWithRange(range.startContainer,
						range.startOffset,
						range.endContainer,
						range.endOffset);

	return true;
};

MIMark.prototype.initWithRange = function(startContainer, startOffset, endContainer, endOffset) {
	//log("startContainer = " + startContainer + ", endContainer = " + endContainer);
	var startContainerIndexPathString = calculateIndexPath(startContainer);
	var endContainerIndexPathString = calculateIndexPath(endContainer);
	log("startContainerIndexPathString = " + startContainerIndexPathString + ", endContainerIndexPathString = " + endContainerIndexPathString);
	var allIndexPathes = getAllIndexPathes();

	var startContainerIndex = -1;
	var endContainerIndex = -1;

	for (var i = 0; i < allIndexPathes.length; i++) {
		var ip = allIndexPathes[i];
		if (ip.indexPathString == startContainerIndexPathString) {
			startContainerIndex = i;
		}
		if (ip.indexPathString == endContainerIndexPathString) {
			endContainerIndex = i;
		}
		if (startContainerIndex > -1 && endContainerIndex > -1) {
			break;
		}
	}

	var adjustedStartOffset = startOffset;
	var adjustedEndOffset = endOffset;

	// If the endContainer appears before the startContainer
	// Means the selection starts at the child node and end at the parent node
	// For example, you have a table in a div. when you select the last row of the table
	// The end container of the selection will be the outer div
	// 
	if (endContainerIndex < startContainerIndex) {
		log("endContainerIndex " + endContainerIndex + " is before the startContainerIndex " + startContainerIndex);
		for (var i = startContainerIndex; i < allIndexPathes.length; i++) {
			var ip = allIndexPathes[i];
			log(i + ".indexPathString=" + ip.indexPathString);
			if (!ip.indexPathString.startsWith(endContainerIndexPathString)) {
				endContainerIndex = (i - 1);
				//log("endContainerIndex = " + endContainerIndex);
				break;
			}
		}
	}



	log("startContainerIndex = " + startContainerIndex + ", endContainerIndex = " + adjustedEndOffset);

	var totalStartOffset = allIndexPathes[startContainerIndex].textOffset + startOffset;
	var totalEndOffset = allIndexPathes[endContainerIndex].textOffset + endOffset;

	log(MIGlobals.format("startOffset = %s, endOffset = %s", totalStartOffset, totalEndOffset));
	if (totalEndOffset <= totalStartOffset) return false;

	return this.initWithPosition(totalStartOffset, totalEndOffset);
};


MIMark.prototype.createDOMElements = function() {
	var allIndexPathes = getAllIndexPathes();
	var startFrom = -1;
	var endTo = -1;

	if (!this.uuid) {
		this.uuid = "M-" + uuid.v4().toUpperCase();
	}

	log("MIMark's UUID = " + this.uuid);

	for (var i = 0; i < allIndexPathes.length; i++) {
		var ip = allIndexPathes[i];
		if ((ip.textOffset + ip.textLength) > this.startOffset && ip.nodeType == 3 && startFrom == -1) {
			startFrom = i;
		}
		if ((ip.textOffset + ip.textLength) >= this.endOffset && ip.nodeType == 3 && endTo == -1) {
			endTo = i;
			break;
		}
	}


	var topMostSpan = null;
	var bottomMostSpan = null;

	var markSpan = null;
	var spans = [];
	var textParts = [];
	var rect;
	var top, bottom;

	if (startFrom == endTo) {
		var r = document.createRange();
		var ip = allIndexPathes[startFrom];
		var node = ip.getNode();
		
		r.setStart(node, this.startOffset - ip.textOffset);
		r.setEnd(node, this.endOffset - ip.textOffset);
		markSpan = this.createMarkSpan();
		topMostSpan = markSpan;
		spans.push(markSpan);
		r.surroundContents(markSpan);
		r.selectNode(markSpan);
		rect = r.getBoundingClientRect();
		
		textParts.push(r.toString());

		top = rect.top;
		bottom = rect.bottom;

	} else {
		var r, ip, node;
		top = Number.MAX_VALUE;
		bottom = 0;
		
		ip = allIndexPathes[endTo];
		node = ip.getNode();

		if (isMarkableString(node.nodeValue)) {
			r = document.createRange();
			r.setStart(node, 0);
			r.setEnd(node, this.endOffset - ip.textOffset);
			textParts.push(r.toString());
			if (isMarkableNode(node)) {
				markSpan = this.createMarkSpan();
				spans.push(markSpan);
				r.surroundContents(markSpan);
				rect = r.getBoundingClientRect();
				if (rect.top < top) {
					top = rect.top;
					topMostSpan = markSpan;
				}
				if (rect.bottom > bottom) bottom = rect.bottom;
			}
		}

		for (var i = endTo - 1; i >= startFrom + 1; i--) {
			if (i > allIndexPathes.length - 1 || i <= 1) break;
			ip = allIndexPathes[i];
			if (ip.nodeType == 3) {
				node = ip.getNode();
				if (isMarkableString(node.nodeValue)) {
					r = document.createRange();
					r.selectNode(node);
					textParts.push(r.toString());
					if (isMarkableNode(node)) {
						markSpan = this.createMarkSpan();
						spans.push(markSpan);
						r.surroundContents(markSpan);
						rect = r.getBoundingClientRect();
						if (rect.top < top) {
							top = rect.top;
							topMostSpan = markSpan;
						}
						if (rect.bottom > bottom) bottom = rect.bottom;
					}
				}
			}
		}

		ip = allIndexPathes[startFrom];
		node = ip.getNode();
		if (isMarkableString(node.nodeValue)) {
			r = document.createRange();
			r.setStart(node, this.startOffset - ip.textOffset);
			r.setEnd(node, ip.textLength);
			textParts.push(r.toString());
			if (isMarkableNode(node)) {
				markSpan = this.createMarkSpan();
				spans.push(markSpan);
				r.surroundContents(markSpan);
				rect = r.getBoundingClientRect();
				if (rect.top < top) {
					top = rect.top;
					topMostSpan = markSpan;
				}
				if (rect.bottom > bottom) bottom = rect.bottom;
				
			}
		}
	}

	topMostSpan.id = this.uuid;
	this.top = top;
	this.bottom = bottom;
	this.pageTop = top + window.scrollY;
	this.pageBottom = bottom + window.scrollY;

	textParts.reverse();
	this.text = textParts.join("");


	for (var i = spans.length; i--;) {
		var span = spans[i];
		span.addEventListener(MIGlobals.eventTouchStart, markSpanOnTouchStart, false);
		span.addEventListener(MIGlobals.eventTouchEnd, markSpanOnTouchEnd, false);
		if (MIGlobals.isTouchSupported) {
			span.addEventListener(MIGlobals.eventTouchMove, markSpanOnTouchMove, false);
			span.addEventListener(MIGlobals.eventTouchCancel, markSpanOnTouchCancel, false);
		}
	}
	
};

MIMark.prototype.deleteDOMElements = function() {
	var spans = null;
	spans = document.querySelectorAll("span.mark[data-mark-id='" + this.uuid + "']");
	//log(ids[i] + " span count: " + spans.length);
	for (var j = spans.length - 1; j >= 0; j--) {
		var s = spans[j];
		s.removeEventListener(MIGlobals.eventTouchStart, markSpanOnTouchStart, false);
		s.removeEventListener(MIGlobals.eventTouchEnd, markSpanOnTouchEnd, false);
		if (MIGlobals.isTouchSupported) {
			s.removeEventListener(MIGlobals.eventTouchMove, markSpanOnTouchMove, false);
			s.removeEventListener(MIGlobals.eventTouchCancel, markSpanOnTouchCancel, false);
		}

		s.setAttribute("class", "");
		s.removeAttribute("data-mark-id");
		/*
		var pEle = s.parentElement;
		var tNode = document.createTextNode(s.innerText);
		pEle.replaceChild(tNode, s);
		*/
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
	//objSpan.setAttribute("data-note-href",this.noteId);
	//log(this.noteId);
	if (this.userId == MIMarkManager.currentUserId) {
		objSpan.setAttribute("class", "mark");
	} else {
		objSpan.setAttribute("class", "mark mark-others");
	}
	
	var uuid = this.uuid;
	objSpan.addEventListener("touchend", function(e) {
		window.location.href = "/mark?markId=" + uuid;
	});
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
			if (anotherMark.startOffset < this.startOffset) this.startOffset = anotherMark.startOffset;
			if (anotherMark.endOffset > this.endOffset) this.endOffset = anotherMark.endOffset;
		}
	}
	//log("Highlight count: " + highlightCount );
	if (noteCount == 0 && highlightCount == 0) {
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

// ----------------------------------------------------
// Definition of class IndexPath
// ----------------------------------------------------

function IndexPath() {
	this.indexPathString = "";
	this.textOffset = 0;
	this.textLength = 0;
	this.nodeType = -1;
	this.nodeName = "";
}


IndexPath.prototype.toString = function() {
	return new String("000000" + this.textOffset).slice(-6) + "," + this.textLength + " : " + this.nodeName + " : " + this.indexPathString;
};

IndexPath.prototype.getNode = function() {
	if (this.indexPathString == null 
		|| this.indexPathString == "") return null;
	if (this.indexPathString == "/") return docuemnt.body;
	
	var indexes = this.indexPathString.split("/");

	if (indexes.length < 2) {
		log("Can not parse " + this.indexPathString);
		return null;
	}

	var node = document.body;
	for (var i = 1; i < indexes.length; i++) {
		node = node.childNodes[indexes[i]];
	}
	return node;
};


//-----------------------------------------
// Definition of functions
//-----------------------------------------
function getAllIndexPathes() {
	var indexPathes = [];
	var stack = [];
	var textOffset = 0;
	var guarder = 0;
	var vLen = 0;

	if (!document.body.getAttribute("data-index-path")) {
		document.body.setAttribute("data-index-path", "/");
	}

	stack.push(document.body);
	while (stack.length > 0) {
		var currentNode = stack.pop();
		if (currentNode.nodeType == 3) {
			// Get the textNode's level index
			var levelIndex = 0;
			var tempNode = currentNode.previousSibling;
			while (tempNode != null) {
				tempNode = tempNode.previousSibling;
				levelIndex ++;
			}
			var pIndexPathString = currentNode.parentNode.getAttribute("data-index-path");
			if (pIndexPathString == "/") pIndexPathString = "";
			var ip = new IndexPath();
			ip.indexPathString = pIndexPathString + "/" + levelIndex;
			ip.textOffset = textOffset;

			//ip.textLength = currentNode.length;
			//vLen = visibleCharLength(currentNode.nodeValue);
			vLen = currentNode.length;
			ip.textLength = vLen
			ip.nodeType = 3;
			ip.nodeName = currentNode.nodeName;
			indexPathes.push(ip);
			// Increase the text offset
			//textOffset += currentNode.length;
			textOffset += vLen;
		} else if (currentNode.nodeType == 1) {
			// Add currentNode's indexPath to the array
			var ip = new IndexPath();
			ip.indexPathString = currentNode.getAttribute("data-index-path");
			ip.textOffset = textOffset;
			ip.textLength = 0;
			ip.nodeType = 1;
			ip.nodeName = currentNode.nodeName;
			indexPathes.push(ip);
			// Push the sub nodes into the stack by order desc
			var pIndexPathString = currentNode.getAttribute("data-index-path");
			if (pIndexPathString == "/") pIndexPathString = "";

			for (var i = currentNode.childNodes.length - 1; i >= 0; i--) {
				var subNode = currentNode.childNodes[i];
				if (subNode.nodeType == 1) {
					subNode.setAttribute("data-index-path", pIndexPathString + "/" + i);
				}
				stack.push(subNode);
			}
		}
	}
	return indexPathes;
}

function visibleCharLength(s) {
	if (MIGlobals.isEmpty(s)) return 0;
	var i, n;
	n = 0;
	for (i = s.length; i--;) {
		if (s.charCodeAt(i) >= 33) {
			n += 1;
		}
	}
	return n;
}

/** Calculate a node's indexPath
 *
 */
function calculateIndexPath(node) {
	if (node == null) return null;
	if (node.nodeName == "BODY") return "/";
	var indexes = [];
	
	var vNode = node;
	while (vNode != null) {
		if (vNode.nodeName == "BODY") break;
		var levelIndex = 0;
		var hNode = vNode.previousSibling;
		while (hNode != null) {
			hNode = hNode.previousSibling;
			levelIndex ++;
		}
		indexes.push(levelIndex);
		vNode = vNode.parentNode;
	}

	var indexPath = "";
	for (var i = indexes.length - 1; i >= 0; i--) {
		indexPath += "/" + indexes[i];
	}
	return indexPath;
}

// Check if a string is visible
function isMarkableString(s) {
	if (MIGlobals.isEmpty(s)) return false;
	for (var i = 0; i < s.length; i++) {
		if (s.charCodeAt(i) >= 33) {
			return true;
		}
	}
	return false;
}

function isMarkableNode(node) {
	if (typeof node == "undefined" || node == null) return false;
	var tag = "";
	if (node.nodeType == 3) {
		var pElement = node.parentElement;
		if (pElement == null) return false;
		if (window.getComputedStyle(pElement).webkitUserSelect == "none") {
			return false;
		}
		tag = pElement.nodeName;
	} else if (node.nodeType == 1) {
		if (window.getComputedStyle(node).webkitUserSelect == "none") {
			return false;
		}
		tag = node.nodeName;
	} else {
		return false;
	}

	if (tag == "SPAN"
		|| tag == "DIV"
		|| tag == "TD"
		|| tag == "ARTICLE"
		|| tag == "ASIDE"
		|| tag == "FIGCAPTION") {
		return true;
	}
	return false;
}

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


//---- FUNCTIONS DEFINITION FOR CALLING FROM MOSO BOOKS CLIENT




function clearSelection() {
	window.getSelection().removeAllRanges();
}


function MINoteBox() {
	this.markIds = [];
	this.marksCount = 0;
	this.top = 0;			// 相对于视口的Top
	this.bottom = 0;		// 相对于视口的Bottom
	this.pageTop = 0;		// 相对于整个页面的Top
	this.pageBottom = 0;	// 相对于整个页面的Bottom
	this.uuid = "NB-" + uuid.v4().toUpperCase();
	this.domElementId = this.uuid;
	this.myMarkCount = 0;    // 我自己的标注数量
	this.otherUserMarkCount = 0; // 其他人的标注数量
}

MINoteBox.prototype.createNoteBoxElement = function() {
	var o = document.createElement("img");
	o.id = this.domElementId;
	o.src = MIGlobals.contextRoot + "/META-INF/images/note.png";
	o.className = "note-box";
	o.style.top = (this.pageTop + 1) + "px";


	o.addEventListener(MIGlobals.eventTouchStart, noteBoxOnTouchStart, false);
	o.addEventListener(MIGlobals.eventTouchEnd, noteBoxOnTouchEnd, false);
	if (MIGlobals.isTouchSupported) {
		o.addEventListener(MIGlobals.eventTouchMove, noteBoxOnTouchMove, false);
		o.addEventListener(MIGlobals.eventTouchCancel, noteBoxOnTouchCancel, false);
	}

	document.body.appendChild(o);
};

MINoteBox.prototype.deleteNoteBoxElement = function() {
	var o = $(this.domElementId);
	o.removeEventListener(MIGlobals.eventTouchStart, noteBoxOnTouchStart, false);
	o.removeEventListener(MIGlobals.eventTouchEnd, noteBoxOnTouchEnd, false);
	if (MIGlobals.isTouchSupported) {
		o.removeEventListener(MIGlobals.eventTouchMove, noteBoxOnTouchMove, false);
		o.removeEventListener(MIGlobals.eventTouchCancel, noteBoxOnTouchCancel, false);
	}
	document.body.removeChild(o);
};

MINoteBox.prototype.addMark = function(markId) {
	if (this.markIds[markId]) return false;
	if (this.marksCount == 0) {
		this.createNoteBoxElement();
	} 
	this.markIds[markId] = 1;
	this.marksCount += 1;
	var mark = MIMarkManager.findMarkById(markId);
	if (mark.userId == MIMarkManager.currentUserId) {
		this.myMarkCount += 1;
	} else {
		this.otherUserMarkCount += 1;
	}
	log(MIGlobals.format("myMarkCount = %s, otherUserMarkCount = %s", this.myMarkCount, this.otherUserMarkCount));


	var domEle = $(this.domElementId);
	var ids = [];
	for (var k in this.markIds) {
		ids.push(k);
	}
	domEle.setAttribute("data-mark-ids", ids.join(","));
	this.resetImage();
};

MINoteBox.prototype.removeMark = function(markId) {

	if (!this.markIds[markId]) return false;

	var mark = MIMarkManager.findMarkById(markId);

	if (mark.userId == MIMarkManager.currentUserId) {
		this.myMarkCount -= 1;
	} else {
		this.otherUserMarkCount -= 1;
	}
	
	log(MIGlobals.format("myMarkCount = %s, otherUserMarkCount = %s", this.myMarkCount, this.otherUserMarkCount));

	delete this.markIds[markId];
	this.marksCount -= 1;

	var domEle = $(this.domElementId);
	if (this.marksCount == 0) {
		this.deleteNoteBoxElement();
		return;
	} else {
		var ids = [];
		for (var k in this.markIds) {
			ids.push(k);
		}
		domEle.setAttribute("data-mark-ids", ids.join(","));
	}
	this.resetImage();
};

MINoteBox.prototype.resetImage = function() {
	var eleImg = document.getElementById(this.domElementId);

	if (this.myMarkCount == 0) {
		if (this.otherUserMarkCount == 1) {
			eleImg.setAttribute("src", MIGlobals.contextRoot + "/META-INF/images/note_blue.png");
		} else if (this.otherUserMarkCount > 1) {
			eleImg.setAttribute("src", MIGlobals.contextRoot + "/META-INF/images/notes_blue.png");
		}
	} else if (this.myMarkCount == 1) {
		if (this.otherUserMarkCount == 0) {
			eleImg.setAttribute("src", MIGlobals.contextRoot + "/META-INF/images/note.png");
		} else {
			eleImg.setAttribute("src", MIGlobals.contextRoot + "/META-INF/images/notes_yellowblue.png");
		}
	} else {
		if (this.otherUserMarkCount > 0) {
			eleImg.setAttribute("src", MIGlobals.contextRoot + "/META-INF/images/notes_yellowblue.png");
		} else {
			eleImg.setAttribute("src", MIGlobals.contextRoot + "/META-INF/images/notes.png");
		}
	}


}

// Definition of class NoteBox
var MIMarkManager = {
	marks: [],     // key-value, key is the uuid of mark, value is the mark object itself
	noteBoxes: [], // key-value, key is the uuid of notebox, value is the notebox object itself
	currentUserId: null, // The current user id

	setCurrentUserId: function(userId) {
		MIMarkManager.currentUserId = userId;
	},

	/**
	 * @param markId - 
	 * @param markTop pageTop of the mark
	 */
	addNoteBoxForMark: function(markId, markTop) {
		var box = null;
		var tmpBox = null;
		for (var k in this.noteBoxes) {
			tmpBox = this.noteBoxes[k];
			if (Math.abs(tmpBox.pageTop - markTop) < 18) {
				box = tmpBox;
				break;
			}
		}
		if (box == null) {
			box = new MINoteBox();
			box.pageTop = markTop;
			box.pageBottom = box.pageTop + 18;
			box.top = box.pageTop - window.scrollY;
			box.bottom = box.pageBottom - window.scrollY;
			this.noteBoxes[box.uuid] = box;
		}
		box.addMark(markId);
		return box.uuid;
	},
	removeNoteBoxForMark: function(noteBoxId, markId) {
		var box = this.noteBoxes[noteBoxId];
		if (!box) return;
		box.removeMark(markId);
		if (box.marksCount == 0) {
			delete this.noteBoxes[noteBoxId];
		}
	},

	findNoteBoxById: function(noteBoxId) {
		return this.noteBoxes[noteBoxId];
	},

	findNoteBoxByMarkId: function(markId) {
		var mark = this.marks[markId];
		if (mark) {
			return this.noteBoxes[mark.noteBoxId];
		}
	},

	findMarkById : function(markId) {
		return this.marks[markId];
	},

	/** Mark the current selection as highlight mark
	 * @return the MIMark uuid or "-1" for invalid selection
	 */
	createMark: function(startOffset, endOffset, type, userId) {
		return this.loadMark(null, startOffset, endOffset, type, userId);
	},

	/** 创建标记。包括从已经存储的数据中恢复标记以及直接创建新的标记
	 * @param markId 如果是从已经存储的数据中恢复标记的， 这里指明标记的UUID；如果是新创建标记的，此参数为null即可
	 * @param startOffset 开始位置
	 * @param endOffset 结束位置
	 * @param type 标记类型，'H' - 高亮，'N' - 笔记
	 * @return 返回值，JavaScript对象或者JSON字符串表达的JavaScript对象，格式如下：
	 * {markId: "the uuid of the mark", top: topValue, bottom: bottomValue, noteIconCenterX: noteIconCenterXInPixel, text: "the selected text"}
	 * 这里的top和bottom值都是指到浏览器窗口左上角的位置，不包含纵向上已经滚动的位置
	 * 
	 */
	loadMark: function(markId, startOffset, endOffset, type, userId) {
		log(MIGlobals.format("Create mark: id=%s, startOffset=%s, endOffset=%s, type=%s", markId, startOffset, endOffset, type));
		var id;
		if (markId && MIMarkManager.marks[markId]) {
			id = markId;
		} else {
			var mark = new MIMark();
			var creatorUserId = userId ? userId : MIMarkManager.currentUserId;
			mark.userId = creatorUserId;
			mark.initWithPosition(startOffset, endOffset);
			mark.uuid = markId;
			mark.type = type || MIMark.TYPE_HIGHLIGHT;
			mark.createDOMElements();
			this.marks[mark.uuid] = mark;
			id = mark.uuid;
			if (mark.type == MIMark.TYPE_NOTE) {
				this.markAsNote(mark.uuid);
			}
		}
		


		var o = MIMarkManager.getMarkInformation(id); // MIMarkManager.getMarkInformation has escape js object or js object in JSON string format

		return o;
	},

	/** 删除一个标记。如果该标记是笔记类型的，则连带笔记的图标一并删除；
	 * 如果当前位置还有其他的笔记，则笔记图标保留，并视情况而定是否要修改笔记图标图片。
	 * @param markId 要删除的标记ID
	 */
	deleteMark: function(markId) {
		var mark = this.marks[markId];
		if (mark) {
			if (mark.type == MIMark.TYPE_NOTE) {
				this.removeNoteBoxForMark(mark.noteBoxId, mark.uuid);
			}
			mark.deleteDOMElements();
			delete this.marks[markId];
		}
	},

	/** 删除多个标注
	 * @param markIds, 字符串数组，多个标注ID
	 */
	deleteMarks: function(markIds) {
		for (var i = markIds.length; i--;) {
			this.deleteMark(markIds[i]);
		}
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
			var mark = new MIMark();
			mark.initWithSelection(window.getSelection());
			ret = mark.selectionTest(this.marks);
		}
		w.check("preCheck OK");
		w.dumpInfo();
		if (MIGlobals.isRunningInMosoBooks) {
			return JSON.stringify(ret);
		} else {
			return ret;
		}
	},

	/**将标注转换为笔记类型。标注ID不会发生变化，只是将其类型设置为笔记，并为其显示左侧笔记图标
	 * @param markId 要转换的标注ID
	 */
	markAsNote: function(markId) {
		var m = this.marks[markId];
		var ret = "";

		if (m) {
			var noteBoxId = MIMarkManager.addNoteBoxForMark(m.uuid, m.pageTop);
			m.noteBoxId = noteBoxId;
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
			MIMarkManager.removeNoteBoxForMark(m.noteBoxId, m.uuid);
			m.noteBoxId = null;
			m.type = MIMark.TYPE_HIGHLIGHT;
			ret = MIMarkManager.getMarkInformation(markId);
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
				var noteBox = MIMarkManager.findNoteBoxByMarkId(markId);
				if (noteBox) {
					var markIds = [];
					for (var k in noteBox.markIds) {
						markIds.push(k);
					}
					
					// 如果是笔记，则返回在同一位置的笔记图标所对应的所有笔记ID，并且告诉客户端当前笔记图标的基于视口的位置和基于页面的位置
					ret = {
						"markId" : markId,
						type: "N",
						top: noteBox.pageTop - window.scrollY,
						bottom: noteBox.pageBottom - window.scrollY,
						pageTop: noteBox.pageTop,
						pageBottom: noteBox.pageBottom,
						idsInclude: markIds,
						noteIconCenterX: 44,
						text: mark.text
					};
				} else {
					log("Can not find note box with mark id " + markId);
				}
			}
		}
		if (MIGlobals.isRunningInMosoBooks) {
			return JSON.stringify(ret);
		} else {
			return ret;
		}
		
	}
};


function markSpanOnTouchStart(e) {
	this.setAttribute("data-moved", "n");
	var p = MIPoint.pointFromEvent(e);
	var ret = MIGlobals.detectClickRectTopAndBottom(this, p.clientX, p.clientY);
	this.setAttribute("data-top", ret.top);
	this.setAttribute("data-bottom", ret.bottom);
}

function markSpanOnTouchMove(e) {
	this.setAttribute("data-moved", "y");
}

function markSpanOnTouchCancel(e) {
}

function markSpanOnTouchEnd(e) {
	if (this.getAttribute("data-moved") == "y") {
		return false;
	}

	var markId = this.getAttribute("data-mark-id");
	var mark = MIMarkManager.findMarkById(markId);
	if (mark) {
		var url;
		if (mark.type == MIMark.TYPE_HIGHLIGHT) {
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
			var noteBox = MIMarkManager.findNoteBoxByMarkId(markId);
			if (noteBox) {
				var markIds = [];
				for (var k in noteBox.markIds) {
					markIds.push(k);
				}
				// @param 其他参数同上
				// @param noteIconCenterX - 笔记图标在横向的中心点位置
				url = MIGlobals.format("/mark?type=NOTE&ids=%s&top=%s&bottom=%s&pageTop=%s&pageBottom=%s&noteIconCenterX=44", 
					encodeURIComponent(markIds.join(",")),
					noteBox.pageTop - window.scrollY,
					noteBox.pageBottom - window.scrollY,
					noteBox.pageTop,
					noteBox.pageBottom);
			} else {
				log("Can not find note box with mark id " + markId);
			}
		}

		e.stopPropagation(); // 放置同时显示自己和别人笔记时的嵌套触发事件，所以停止事件继续传播

		if (MIGlobals.isRunningInMosoBooks) {
			window.location.href = url;
		} else {
			log(url);
		}
	}
}


function noteBoxOnTouchStart(e) {
	MIGlobals.addClass(this, "note-box-down");
	this.setAttribute("data-moved", "n");
}

function noteBoxOnTouchMove(e) {
	this.setAttribute("data-moved", "y");
}

function noteBoxOnTouchCancel(e) {
	MIGlobals.removeClass(this, "note-box-down");
}

function noteBoxOnTouchEnd(e) {
	MIGlobals.removeClass(this, "note-box-down");

	if (this.getAttribute("data-moved") == "y") return false;

	var r = document.createRange();
	r.selectNode(this);
	var rect = r.getBoundingClientRect();

	var url = MIGlobals.format("/mark?type=NOTE&ids=%s&top=%s&bottom=%s&pageTop=%s&pageBottom=%s&noteIconCenterX=44", 
						encodeURIComponent(this.getAttribute("data-mark-ids")),
						rect.top, 
						rect.bottom,
						rect.top + window.scrollY,
						rect.bottom + window.scrollY);

	if (MIGlobals.isRunningInMosoBooks) {
		window.location.href = url;
	} else {
		log(url);
	}
}

