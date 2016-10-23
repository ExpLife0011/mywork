/**
 * 弹出式填空题
 */
var MIPQuiz = {
	status: 0, // 0 - 显示全部， 1 - 测试中
	optionCount: 4,
	popupLayerWidth: 0,
	popupLayerHeight: 125, // 整个弹出选项框的高度，可以在设计期计算出来的。
	popupspaceId : -1, // 当前弹出的槽位ID
	spaceOptions: [], // 每个填空槽位中要显示的候选项列表。
					 // key - value 格式，key 为 space 的 ID， value 为对应候选项的 id
					 // 在页面编写的时候，候选项和填空槽位的 ID 是不需要指定的，在初始化的时候会自动为其分配。
	//spaceOptionMaxWidths : [], // 每个填空槽位选择了候选项之后的最大宽度。预先计算好，省却每次计算的消耗, key - value 格式，key 为槽位 ID，value 为整数，表示最大的宽度
	/** 初始化
	 *@param options 对象。目前支持的选项有：
	 *					optionCount - 表示弹出的时候最多支持多少个候选项（传入参数为 {optionCount: N}）。	默认为 4 个候选项，表示使用 1 个正确答案 + 3 个随机选择的非正确答案
	 *					popupLayerWidth - 表示弹出层的宽度，默认为 200
	 */
	init: function(options) {
		if (options) {
			if (options.optionCount) this.optionCount = options.optionCount;
			if (options.popupLayerWidth) this.popupLayerWidth = options.popupLayerWidth;
		}

		// 初始化元素 ID
		var spaces = document.querySelectorAll(".space");
		for (var i = 0, n = spaces.length; i < n; i++) {
			spaces[i].id = "MIR-space-" + i;
			spaces[i].setAttribute("data-answer-id", "MIR-OPT-" + spaces[i].getAttribute("data-answer-index"));
		}

		var indexes = [];
		var options = document.querySelectorAll("#options > div");
		for (var i = 0, n = options.length; i < n; i++) {
			options[i].id = "MIR-OPT-" + i;
			indexes[i] = i;
		}

		// 创建弹出层元素
		var popupLayer = document.createElement("DIV");
		popupLayer.id = "p-options";
		popupLayer.style.width = this.popupLayerWidth + "px";
		document.body.appendChild(popupLayer);
		for (var i = 0; i < this.optionCount; i++) {
			var popupOption = document.createElement("DIV");
			popupOption.className = "opt";
			popupLayer.appendChild(popupOption);
			MIGlobals.makeTouchableButton(popupOption);
			popupOption.addEventListener(MIGlobals.eventTouchEnd, function(e) {
				MIPQuiz.selectOption(this.getAttribute("data-opt-id"));
				MIPQuiz.hidePopup();
			});
			// if (MIGlobals.isTouchSupported) {

			// } else {
			// 	popupOption.addEventListener("click", function(e) {
			// 		MIPQuiz.selectOption(this.getAttribute("data-opt-id"));
			// 		MIPQuiz.hidePopup();
			// 	});
			// }
		}

		// 为每个填空槽位准备候选项
		// 混淆选项顺序
		for (var i = 0; i < 100; i++) {
			var m = Math.floor(Math.random() * indexes.length);
			var n = Math.floor(Math.random() * indexes.length);
			if (m === n) {
				continue;
			}

			var t = indexes[m];
			indexes[m] = indexes[n];
			indexes[n] = t;
		}

		// console.log(indexes);

		for (var i = 0, n = spaces.length; i < n; i++) {
			var space = spaces[i];
			var rightAnswerIndex = this.myArrayIndexOf(indexes, +(space.getAttribute("data-answer-index")));
			
			if (rightAnswerIndex === -1) {
				console.error("Can not find answer!");
				return;
			}

			var fromIndex = rightAnswerIndex - Math.floor(Math.random() * this.optionCount);
			// console.log("1: " + fromIndex);
			while (fromIndex < 0) {
				fromIndex += indexes.length;
			}
			// console.log("2: " + fromIndex);
			this.spaceOptions[space.id] = [];
			for (var j = fromIndex; j < (fromIndex + this.optionCount); j++) {
				this.spaceOptions[space.id][j - fromIndex] = indexes[j % indexes.length];
			}
			//console.log(space.id);
			//console.log(this.spaceOptions[space.id]);

			MIGlobals.makeTouchableButton(space);
			space.addEventListener(MIGlobals.eventTouchEnd, function(e) {
				if (MIPQuiz.status !== 1) return;
				MIPQuiz.showPopup(this.id);
			});

			// 事件绑定
			// if (MIGlobals.isTouchSupported) {
			// 	space.addEventListener("touchstart", function(e) {
			// 		MIPQuiz.showPopup(this.id);
			// 	});
			// 	space.addEventListener("touchmove", function(e) {
			// 		e.preventDefault();
			// 	});
			// 	space.addEventListener("touchend", function(e) {
			// 		MIPQuiz.hidePopup();
			// 	});
			// } else {
			// 	space.addEventListener("click", function(e) {
			// 		if (MIPQuiz.status !== 1) return;
			// 		MIPQuiz.showPopup(this.id);
			// 	});
			// }
		}


		// 设置顶级事件，如果点击在空白区域则隐藏弹出层

		document.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			if (! MIGlobals.hasClass(e.target, "space") && ! MIGlobals.hasClass(e.target, "opt")) {
				MIPQuiz.hidePopup();
			}
		}, true);


		MIPQuiz.toggleStatus();

		// 开始测试/查看答案 按钮时间
		// var btn = document.getElementById("show-answer");
		// MIGlobals.makeTouchableButton(btn);
		// btn.addEventListener(MIGlobals.eventTouchEnd, function(e) {
		// 	MIPQuiz.toggleStatus();
		// });

	},

	/**
	 * 切换场景状态
	 */
	toggleStatus: function() {
		this.popupspaceId = "-1";
		var spaces = document.querySelectorAll(".space");
		for (var i = 0, n = spaces.length; i < n; i++) {
			MIGlobals.removeClass(spaces[i], "right");
			MIGlobals.removeClass(spaces[i], "wrong");
			spaces[i].setAttribute("data-choice", "");
			spaces[i].style.webkitTransform = "rotateY(90deg)"
		}

		setTimeout(function(){
			var spaces = document.querySelectorAll(".space");
			for (var i = 0, n = spaces.length; i < n; i++) {
				if (MIPQuiz.status === 1) {
					spaces[i].innerHTML = document.getElementById(spaces[i].getAttribute("data-answer-id")).innerHTML;
				} else {
					spaces[i].innerHTML = "?";
				}
				spaces[i].style.webkitTransform = "rotateY(0deg)"
			}	
			if (MIPQuiz.status === 0) {
				MIPQuiz.status = 1;
				// document.getElementById("show-answer").innerText = "显示答案";	
			} else {
				MIPQuiz.status = 0;
				// document.getElementById("show-answer").innerText = "开始测试";	
			}
		}, 200);
	},

	showPopup: function(spaceId) {
		var space = document.getElementById(spaceId);
		var rect = space.getBoundingClientRect();
		var top = rect.top + window.scrollY;
		var left = rect.left + window.scrollX;
		var popupLayer = document.getElementById("p-options");

		if (popupLayer.style.display === "block") {
			popupLayer.style.display = "none";
			var theId = spaceId;
			setTimeout(function(){MIPQuiz.showPopup(theId)}, 30);
			return;
		}

		var options = popupLayer.querySelectorAll("div.opt");
		var tx , ty;

		for (var i = 0, n = options.length; i < n; i++) {
			MIGlobals.removeClass(options[i], "selected");
			options[i].innerHTML = document.getElementById("MIR-OPT-" + this.spaceOptions[spaceId][i]).innerHTML;
			options[i].setAttribute("data-opt-id", "MIR-OPT-" + this.spaceOptions[spaceId][i]);
		}
		if (left + this.popupLayerWidth > 718) {
			tx = "100%";
			popupLayer.style.left = (left - (this.popupLayerWidth - rect.width)) + "px";
		} else {
			tx = "0"
			popupLayer.style.left = left + "px";	
		}
		
		if (top + this.popupLayerHeight > window.innerHeight) {
			ty = "100%";
			// MIGlobals.addClass(options[this.optionCount - 1], "selected");
			popupLayer.style.top = (top - (this.popupLayerHeight - rect.height))  + "px";
		} else {
			ty = "0";
			// MIGlobals.addClass(options[0], "selected");
			popupLayer.style.top  = top   + "px";
		}
		popupLayer.style.webkitTransformOrigin = tx + " " + ty;
		popupLayer.style.display = "block";
		this.popupspaceId = spaceId;
	},

	hidePopup: function() {
		document.getElementById("p-options").style.display = "none";
		this.popupspaceId = "-1";
	},

	/**
	 * 用户选择了某个选项
	 */
	selectOption: function(optionId) {
		if (this.popupspaceId === "-1") return;
		document.getElementById(this.popupspaceId).innerHTML = document.getElementById(optionId).innerHTML;
		document.getElementById(this.popupspaceId).setAttribute("data-choice", optionId);

		// 检查是否全部答完
		var finished = true;
		var spaces = document.querySelectorAll(".space");
		for (var i = 0, n = spaces.length; i < n; i++) {
			if ( ! spaces[i].getAttribute("data-choice")) {
				finished = false;
				break;
			}
		}
		if (finished) {
			for (var i = 0, n = spaces.length; i < n; i++) {
				var space = spaces[i];
				if (space.getAttribute("data-answer-id") === space.getAttribute("data-choice")) {
					MIGlobals.removeClass(space, "wrong");
					MIGlobals.addClass(space, "right");
				} else {
					MIGlobals.removeClass(space, "right");
					MIGlobals.addClass(space, "wrong");
				}
			}
		}
	},

	/**
	 * Array.prototype.indexOf 从 JS 1.6 开始提供，为了兼容考虑，自己写一个简单的函数来实现
	 *@param arrayToSearch 要搜索的数组
	 *@param searchElement 要搜索的元素，使用严格逻辑等来判断 (===)
	 *@return 如果找到，则返回这个元素在数组中的索引，如果没有找到，返回 -1
	 */
	myArrayIndexOf: function(arrayToSearch, searchElement) {
		if ( ! arrayToSearch) return -1;
		for (var i = 0, n = arrayToSearch.length; i < n; i++) {
			if (arrayToSearch[i] === searchElement) return i;
		}

		return -1;
	}
};

