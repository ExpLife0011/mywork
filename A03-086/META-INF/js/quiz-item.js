var MIQuizItem = {
	makeQuizItems : function() {
		var items = document.querySelectorAll("div.quiz-item");
		var itemsLength = items.length;
		for(var i = 0; i < itemsLength; i++) {
			var item = items[i];
			this.makeQuizItem(item);
		}
	},
	makeQuizItem : function(ele) {
		ele.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "quiz-item-down");
		});
		ele.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(this, "quiz-item-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}

			var a = $(this.id + "-a");
			if (this.getAttribute("data-answer-shown") == "n") {
				MIGlobals.addClass(this, "item-answer-shown");
				a.style.display = "block";
				if (!a.getAttribute("data-height")) {
					var rect = a.children[0].getBoundingClientRect();
					a.setAttribute("data-height", (rect.height + 20) + "px");
				}
				setTimeout(function(e) {a.style.height = a.getAttribute("data-height");}, 10);
				this.setAttribute("data-answer-shown", "y");
			} else {
				a.style.height = "0px";
				setTimeout(function(e) {
					a.style.display = "none";
					MIGlobals.removeClass($(a.id.substr(0, a.id.length - 2)), "item-answer-shown");
				}, 300);
				this.setAttribute("data-answer-shown", "n");
			}
		});

		if (MIGlobals.isTouchSupported) {
			ele.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			});
			ele.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this, "quiz-item-down");
			});
		}
	},


}

// 提交云班课数据
	function saveActivityData() {

        var data2Post = {
            userId    : MIGlobals.userId,
            book_id    : MIGlobals.bookId,
            chapter_id : MIGlobals.getChapterUuid(),
            section_id : MIGlobals.getSectionUuid(),
            file_id    : MIGlobals.getFileUuid(),
            file_url   : MIGlobals.fileUrl,
            activity_id : document.body.getAttribute("data-activity-uuid"),
            activity_sn : document.body.getAttribute("data-activity-sn"),
            activity_title: document.querySelector('title').textContent ,
            activity_type_major : "PRACTICE",
            activity_type_minor :"OTHER",
            topic_total_count : 0,
            topic_answer_count : 0,
            topic_right_count : 0,
            enter_time:"",
            exit_time:"",
            topics: []
        };
      	


        return JSON.stringify(data2Post);
    }
