function saveActivityData(){
			var n = 0;
			var r = 0;
			var dataslots = [];
 			var textChoice = document.querySelectorAll('.text-choice');
 			var selects = document.querySelectorAll('.text-choice[data-select="y"]');
 			for(var i=0; i < textChoice.length; i++){

 				dataslots[i] = {};
 				dataslots[i].topic_sn = i+1;
 				dataslots[i].topic_type = "FILL_BLANK";
 				var slots = textChoice[i].querySelectorAll(".slot");
 				var rightAnswer = [];
 				var userAnswers = [];

 				for (var j = 0; j < slots.length; j++) {
 				
 					rightAnswer[j] = document.querySelector("#options > div[id='"+ slots[j].getAttribute("data-answer-id") + "']").textContent

 					dataslots[i].right_answers = rightAnswer;
 						
 					userAnswers[j] = slots[j].textContent.replace("?","");
		 				
		 				dataslots[i].user_answers = userAnswers;
		 				
		 				
 				}

 					

 				if(compareArray(dataslots[i].user_answers, dataslots[i].right_answers)){
 					dataslots[i].is_right = "Y";
 					r++;
 				}else{
 					dataslots[i].is_right = "N";
 				}
 				
 			}
			var dataconet = {
				"book_id": MIGlobals.bookId,
				"chapter_id": MIGlobals.getChapterUuid(),
				"section_id": MIGlobals.getSectionUuid(),
				"file_id": MIGlobals.getFileUuid(),
				"file_url": MIGlobals.fileUrl, 
				"activity_id": document.querySelector('body').getAttribute("data-activity-uuid"),
				"activity_sn": document.querySelector('body').getAttribute('data-activity-sn'),
				"activity_title": document.querySelector('title').textContent,
				"activity_type_major": "TEST", 
				"activity_type_minor": "FILL_BLANK",
				"topic_total_count": textChoice.length,
				"topic_answer_count": selects.length,
				"topic_right_count": r,
				"enter_time": "",
				"exit_time": " ",
				"topics": dataslots
			}
	
	
	return JSON.stringify(dataconet);
}


/**
 * 比较 2 个数组是否包含相同的元素
 * @param a1 第一个数组
 * @param a2 第二个数组
 * @return boolean 两个数组中的元素都相等则返回 true，反之返回 false
 */
function compareArray(a1, a2) {
	if (a1 === a2) return true;
	if ((!a1 && a2) || (a1 && ! a2)) return false;
	if (a1.length !== a2.length) return false;
	for (var i = 0, n = a1.length; i < n; i++) {
		if (a1[i] !== a2[i]) return false;
	}
	return true;
}



 		
