MISelection = {
	draggerWidth: 26,
	draggerHeight: 44,
	startContainer: null,
	startOffset: 0,
	endContainer: null,
	endOffset: 0,

	startDragger: null,
	endDragger: null,

	startRange: null, 
	endRange: null,

	guarderId: "MISELECTION-THE-GUARDER", 

	initialized: false, 

	startLeft: 0,
	startTop : 0,
	endBottom: 0,
	endRight : 0,

	status: 0,

	init: function() {
		if (this.initialized) return false;

		this.startDragger = document.getElementById("draggerStart");
		if (!this.startDragger) {
			var i = document.createElement("div");
			i.id = "draggerStart";
			document.body.appendChild(i);
			this.startDragger = document.getElementById("draggerStart");
		}
		this.endDragger = document.getElementById("draggerEnd");
		if (!this.endDragger) {
			var i = document.createElement("div");
			i.id = "draggerEnd";
			document.body.appendChild(i);
			this.endDragger = document.getElementById("draggerEnd");
		}

		// Create guarder element to prevent selecting to the end of the document.
		var g = document.createElement("div");
		g.id = this.guarderId;
		g.style.color = "transparent";
		g.style.height="1px";
		g.style.overflow="hidden";
		g.appendChild(document.createTextNode("Hello Guarder"));
		document.body.appendChild(g);

		// Register event handlers

		document.addEventListener(MIGlobals.eventTouchEnd, function(e){
			if (MIGlobals.runningPlatform != MIPlatform.Android) return false;
			if (MISelection.status === 1 && e.target.id !== "draggerStart" && e.target.id !== "draggerEnd") {
				MISelection.endSelecting();
			}
		}, true);

		this.startDragger.addEventListener(MIGlobals.eventTouchStart, function(e) {
			MISelection.beforeSelectionChange();
		});

		this.startDragger.addEventListener(MIGlobals.eventTouchMove, function(e) {
			e.preventDefault();
			if (!MIGlobals.isTouchSupported) {
				return false;
			}
			var p = MIPoint.pointFromEvent(e);
			var r = document.caretRangeFromPoint(p.clientX + MISelection.draggerWidth / 2, p.clientY + MISelection.draggerHeight / 2);

			if (r && r.compareBoundaryPoints(Range.END_TO_START, MISelection.endRange) <= 0) {
				MISelection.startContainer = r.startContainer;
				MISelection.startOffset = r.startOffset;
				MISelection.startRange = r;
				MISelection.makeSelection();
			}
		});

		this.startDragger.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MISelection.afterSelectionChange();
		});

		this.startDragger.addEventListener(MIGlobals.eventTouchCancel, function(e) {
			MISelection.endSelecting();
		});
		//============= endDragger events handler ================
		this.endDragger.addEventListener(MIGlobals.eventTouchStart, function(e) {
			MISelection.beforeSelectionChange();
		});

		this.endDragger.addEventListener(MIGlobals.eventTouchMove, function(e) {
			e.preventDefault();
			if (!MIGlobals.isTouchSupported) {
				return false;
			}
			var p = MIPoint.pointFromEvent(e);
			var r = document.caretRangeFromPoint(p.clientX - MISelection.draggerWidth / 2, p.clientY - MISelection.draggerHeight / 2);
			if (!r) return false;
			var c = r.endContainer;
			if (c.nodeType === 3) {
				c = c.parentElement;
			} else if (c.nodeType === 1) {

			} else {
				return false;
			}

			if (c.nodeName === "BODY" || c.id === MISelection.guarderId) {
				return false;
			}

			if (r.compareBoundaryPoints(Range.START_TO_END, MISelection.startRange) >= 0) {
				MISelection.endContainer = r.endContainer;
				MISelection.endOffset = r.endOffset;
				MISelection.endRange = r;
				MISelection.makeSelection();
			}
		});

		this.endDragger.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MISelection.afterSelectionChange();
		});
		this.endDragger.addEventListener(MIGlobals.eventTouchCancel, function(e){
			MISelection.endSelecting();
		});

		this.initialized = true;
	},

	makeSelection: function() {
		if (!this.startContainer || !this.endContainer) return false;
		var range = document.createRange();
		range.setStart(this.startContainer, this.startOffset);
		range.setEnd(this.endContainer, this.endOffset);
		if (range.collapsed) {
			log("I was expanded!")
			range.expand("word");
			this.endContainer = range.endContainer;
			this.endOffset = range.endOffset;
		}
		var rects = range.getClientRects();
		if (!rects || rects.length <= 0) {
			return false;
		}
		var topRect = rects[0];
		var bottomRect = rects[rects.length - 1];

		this.startDragger.style.top = (topRect.top + window.scrollY - this.draggerHeight) + "px";
		this.startDragger.style.left = (topRect.left + window.scrollX - this.draggerWidth) + "px";
		this.endDragger.style.top = (bottomRect.bottom + window.scrollY) + "px";
		this.endDragger.style.left = (bottomRect.right + window.scrollX) + "px";

		this.startTop = topRect.top;
		this.startLeft = topRect.left;
		this.endBottom = bottomRect.bottom;
		this.endRight = bottomRect.right;

		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
	},

	startSelecting: function(clientX, clientY) {
		log(MIGlobals.format("startSelecting: clientX = %s, clientY = %s", clientX, clientY));
		var range = document.caretRangeFromPoint(clientX, clientY);

		if (!range) return false;
		this.startDragger.style.display = "block";
		this.endDragger.style.display = "block";
		this.startContainer = range.startContainer;
		this.startOffset = range.startOffset;
		this.endContainer = range.endContainer;
		this.endOffset = range.endOffset;

		this.startRange = range;
		this.endRange = range;

		this.makeSelection();
		this.status = 1;
	},

	endSelecting: function() {
		this.status = 0;
		this.startDragger.style.display = "none";
		this.endDragger.style.display = "none";
		this.startRange = null;
		this.endRange = null;
		var selectedText = window.getSelection().toString();
		window.getSelection().removeAllRanges();
		return selectedText;
	},

	beforeSelectionChange: function() {
		if (MIGlobals.isRunningInMosoBooks) {
			var url = MIGlobals.format("/selection?event=beforeChange");
			window.location.href = url;
		}
	},

	afterSelectionChange: function() {
		if (MIGlobals.isRunningInMosoBooks) {
			var url = MIGlobals.format("/selection?event=afterChange&startTop=%s&startLeft=%s&endBottom=%s&endRight=%s",
				this.startTop, this.startLeft, this.endBottom, this.endRight);
			window.location.href = url;
		}
	},

};