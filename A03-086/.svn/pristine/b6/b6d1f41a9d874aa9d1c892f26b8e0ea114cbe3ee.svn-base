function testTreeWalker() {
	var start = new Date();
	var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, function(node) {
		return NodeFilter.FILTER_ACCEPT;
		if (node.nodeType == 3) {
			var s = node.nodeValue;
			s = s.replace(/\s/g, "");
			if (s.length != 0) {
				return NodeFilter.FILTER_ACCEPT;
			} else {
				return NodeFilter.FILTER_REJECT;
			}
		} else {
			return NodeFilter.FILTER_REJECT;
		}
	}, true);

	var node;
	var nodes = [];
	while(node = tw.nextNode()) {
		nodes.push(node);
		var s = node.nodeValue;
	}
	var end = new Date();
	console.log("treeWalker: Elapsed: " + (end - start) + " total nodes: " + nodes.length);
}

function testIndexPath() {
	var start = new Date();
	var indexPathes = getAllIndexPathes();
	var end = new Date();
	console.log("indePath: Elapsed: " + (end - start) + " total nodes: " + indexPathes.length);
}


function test() {
	testIndexPath();
	testTreeWalker();
}


