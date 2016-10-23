// 节头的导航树
var MISectionTree = {
	init: function() {
		var sectionTree = document.querySelector(".section-summary-tree");
		if (!sectionTree) return false;
		var blueNodes = sectionTree.querySelectorAll("div.blue");
		for (var i = 0; i < blueNodes.length; i++) {
			var blueNode = blueNodes[i];
			blueNode.addEventListener(MIGlobals.eventTouchEnd, function(e) {
				var targetDOMId = this.getAttribute("data-id");
				if (!targetDOMId) return false;
				var targetDOM = document.getElementById(targetDOMId);
				if (targetDOM) {
					targetDOM.scrollIntoView(true);
				}
			});
		}
	}
};