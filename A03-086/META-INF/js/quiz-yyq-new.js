/**
 *@author yuanyq
 */

 var MIQuiz = {
 	titleHeight : 50,
 	navigationBarHeight : 50,
 	currentIndex : 0,
 	quizCount : 0,
 	titleElement : null,
 	bottomElement : null,
 	titleIndexIndicatorElement : null,
 	quizWidth: 718, 
 	layout: function() {
 		console.log("MIQuiz.layout is called");
 		var sQuizHeight = (window.innerHeight - this.titleHeight - this.navigationBarHeight) + "px";
 		
 		document.querySelector(".quiz-block").style.height = sQuizHeight;
 		document.querySelector(".quiz-box").style.height = sQuizHeight;
 		var quizzes = document.querySelectorAll(".quiz-sbox");
 		MIQuiz.quizWidth = document.querySelector('.quiz-block').offsetWidth;
 		
 		for (var i = 0, n = quizzes.length; i < n; i++) {
 			quizzes[i].style.height = sQuizHeight;
 			quizzes[i].style.width = MIQuiz.quizWidth + 'px';
 		}
 		
 		document.querySelector('.quiz-box').style.width = MIQuiz.quizWidth * n + 'px';
 		// 在实际测试过程中发现，如果选项区域设置 -webkit-overflow-scrolling: touch 并且在竖屏的时候，选项区域不产生滚动，
 		// 那么在横屏的时候，即使实际的内容超过了 quiz-sbox 的高度，也不会产生滚动，甚至会导致应用崩溃，
 		// 所以，在布局的时候，向 quiz-sbox 的选项区域下方插入一个 DIV，强制 quiz-sbox 区域产生滚动。
 		// var boxHeight = (window.innerHeight - this.titleHeight - this.navigationBarHeight);
 		// var sboxes = document.querySelectorAll(".quiz-sbox");
 		// for (var i = 0, n = sboxes.length; i < n; i++) {
 		// 	var sbox = sboxes[i];
 		// 	var springDiv = sbox.querySelector(".spring");
 		// 	if ( ! springDiv) {
 		// 		springDiv = document.createElement("DIV");
 		// 		springDiv.className = "spring";
 		// 		springDiv.innerText = " ";
 		// 		sbox.appendChild(springDiv);
 		// 	} 

 		// 	var quizContent = sbox.querySelector(".quiz");
 		// 	var rect = quizContent.getBoundingClientRect();
 		// 	if (rect.height < boxHeight) {
 		// 		springDiv.style.height = (boxHeight - rect.height + 1) + "px";
 		// 	} else {
 		// 		springDiv.style.height = "0px";
 		// 	}
 		// }
 	},
 	init: function() {
 		this.titleIndexIndicatorElement = document.getElementById("spcc");
 		if ( ! this.titleIndexIndicatorElement) {
 			console.error("Can not find element spcc for showing index in title");
 			return;
 		}
 		this.titleElement = document.querySelector(".book-top");
 		if ( ! this.titleElement) {
 			console.error("Can not find title element with class book-top");
 			return;
 		}

 		this.bottomElement = document.querySelector(".book-bottom");
 		if ( ! this.bottomElement) {
 			console.error("Can not find bottom element with class btn-box");
 			return;
 		}

 		this.navigationBarHeight = this.bottomElement.getBoundingClientRect().height;

 		var boxes = document.querySelectorAll(".quiz-sbox");
 		this.quizCount = boxes.length;
 		
 		for (var i = 0, n = boxes.length; i < n; i++) {
 			boxes[i].setAttribute("data-index", i);
 			boxes[i].querySelector(".quiz").setAttribute("data-index", i);
 			
 		}

 		var dots = document.querySelectorAll(".book-btn");
 		for (var i = 0, n = dots.length; i < n; i++) {
 			var dot = dots[i];
 			dot.setAttribute("data-index", i);
 			MIGlobals.makeTouchableButton(dot);
 			dot.addEventListener(MIGlobals.eventTouchEnd, function(e) {
 				MIQuiz.show(this.getAttribute("data-index"));
 			});
 		}

 		// quiz options events
 		var options = document.querySelectorAll(".option");
 		for (var i = 0, n = options.length; i < n; i++) {
 			var opt = options[i];
 			opt.setAttribute("data-is-selected","n");
			opt.setAttribute("data-is-answer","n");
 			MIGlobals.makeTouchableButton(opt);
 			var finished = true;
 			opt.addEventListener(MIGlobals.eventTouchEnd, function(e) {
 				var quzboxes = document.querySelectorAll('.quiz-sbox');
 				for(var i=0,n=quzboxes.length; i<n; i++){
 					var boxOps = quzboxes[i].querySelectorAll('.option');
 					var optClick = false;
 					for(var j=0, m=boxOps.length; j<m; j++){
 						if(boxOps[j].getAttribute('data-is-selected') == 'y'){
 							optClick = true;
 							break;
 						}
 					}
 					if(!optClick){
 						finished = false;
 						break;
 					}
 				}
 				if(finished){
 					document.getElementById('show-answer').style.display = block;
 				}
 				var quiz = this.parentElement.parentElement;
 				// If this quiz in in showing answer status, reset the state first
 				if (quiz.getAttribute("data-show-answer") === "1") {
 					//MIQuiz.hideAnswer(quiz);
 				}
 				var dataQuizType= quiz.getAttribute("data-quiz-type");
 				if (dataQuizType == "m") {

	 				var dataIsSelected = this.getAttribute("data-is-selected");
					if (dataIsSelected == "y") {
						this.setAttribute("data-is-selected" ,"n");
						MIGlobals.removeClass(this, "option-checked");
					}else {
						if (!quiz.getAttribute("data-show-answer") !== "1") {
						MIGlobals.addClass(this, "option-checked");
						}
						
						 MIGlobals.addClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") + "']"), "book-btn-select");
						this.setAttribute("data-is-selected","y");
					}

	 			}
	 			else{

	 				var lastSelected = quiz.querySelector(".option-group > .option-checked");
	 				if (lastSelected) {
	 					MIGlobals.removeClass(lastSelected, "option-checked");
	 				}
	 				if (quiz.getAttribute("data-show-answer") !== "1") {
						MIGlobals.addClass(this, "option-checked");
					}
	 				
	 				 quiz.setAttribute("data-choice", this.getAttribute("data-option-no"));
	 				 MIGlobals.addClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") + "']"), "book-btn-select");
	 				
 				}
 				if (quiz.getAttribute("data-index") == (MIQuiz.quizCount - 1)) {
 				 	if (document.getElementById("show-answer").getAttribute("data-show")=="n") {
 				 		return;
 				 	};
	 				document.getElementById("show-answer").style.display = "block";
	 			}
 			});
 		}

 		// quiz show answer events
 		var showAnswers = document.querySelectorAll(".check-answer-every");
 		for (var i = 0, n = showAnswers.length; i < n; i++) {
 			var btn = showAnswers[i];
 			MIGlobals.makeTouchableButton(btn);
 			btn.addEventListener(MIGlobals.eventTouchEnd, function(e) {
 				var quiz = this.parentElement;
 				console.log(quiz);
 				if (quiz.getAttribute("data-show-answer") === "1") {
 					MIQuiz.hideAnswer(quiz);
 				} else {
 					MIQuiz.showAnswer(quiz);
 				}
 			});
 		}


 		// Left right buttons
 		MIGlobals.makeTouchableButton(document.querySelector(".book-bottom > .btn-left"));
 		document.querySelector(".book-bottom > .btn-left").addEventListener(MIGlobals.eventTouchEnd, function(e) {
 			MIQuiz.showPrev();
 		});

 		MIGlobals.makeTouchableButton(document.querySelector(".book-bottom > .btn-right"));
 		document.querySelector(".book-bottom > .btn-right").addEventListener(MIGlobals.eventTouchEnd, function(e) {
 			MIQuiz.showNext();
 		});


 		// Show all answers button
 		 var Showbutton = document.getElementById("show-answer");
 		 Showbutton.setAttribute("data-show","y")
 		MIGlobals.makeTouchableButton(Showbutton);
 		Showbutton.addEventListener(MIGlobals.eventTouchEnd, function(e) {
 			if (this.getAttribute("data-status") === "1") { // 处于显示全部答案的状态，此时点击重置测试场景
 				MIQuiz.resetQuiz();
 				this.setAttribute("data-status", "0");
 				this.innerText = "查看结果";
 				this.style.display = "none";
 			} else { // 要显示全部答案
 				if (Showbutton.getAttribute("data-show")=="y") {
 					MIQuiz.showAllAnswers();
 					this.setAttribute("data-show", "n");
 					this.style.display = "none";
 					saveNotiFication();
 					var selectBtn= document.querySelectorAll(".book-btn");
						for (var i = 0; i < selectBtn.length; i++) {
							log(MIGlobals.hasClass(selectBtn[i],"book-btn-select"));
							if (!MIGlobals.hasClass(selectBtn[i],"book-btn-select")) {
								MIGlobals.addClass(selectBtn[i],"book-btn-no");
							};
						};
 				}else{
 					return;
 				}
 				
 				
 				 
 				
 			}
 		});

 		// 手指横向滑动，表示切换上一道题或者下一道题。
 		if (MIGlobals.isTouchSupported) {
 			document.addEventListener("touchstart", function(e){
 				if (e.touches.length != 1) {
 					return ;
 				}
 				var p = e.touches[0];
 				document.body.setAttribute("data-startx", p.clientX);
				document.body.setAttribute("data-starty", p.clientY);
				document.body.setAttribute("data-lastx", p.clientX);
				document.body.setAttribute("data-lasty", p.clientY);
 			}, true);

 			document.addEventListener("touchmove", function(e){
				if (e.touches.length != 1) {
 					return ;
 				}
 				var p = e.touches[0];
 				document.body.setAttribute("data-lastx", p.clientX);
 				document.body.setAttribute("data-lasty", p.clientY);
 				var x0 = +(document.body.getAttribute("data-startx"));
 				var x1 = +(document.body.getAttribute("data-lastx"));
 				if (Math.abs(x1 - x0) >= 50) {
 					e.preventDefault();
 					e.stopPropagation();
 				}
 			}, true);

 			document.addEventListener("touchend", function(e) {

 				document.body.setAttribute("data-swiping", "0");
				
 				var x0 = +(document.body.getAttribute("data-startx"));
 				var y0 = +(document.body.getAttribute("data-starty"));
 				var x1 = +(document.body.getAttribute("data-lastx"));
 				var y1 = +(document.body.getAttribute("data-lasty"));
 				// 横向移动距离不小于 50， 纵向移动距离不超过50
 				console.log("H: " + (x1-x0) + ", V: " + (y1-y0));
 				if (Math.abs(x0 - x1) < 50 || Math.abs(y1 - y0) > 50) {
 					return;
 				}
 				e.preventDefault();
 				e.stopPropagation();
 				if (x1 > x0) {
 					MIQuiz.showPrev();
 				} else {
 					MIQuiz.showNext();
 				}

 			}, true);
 		}
 	},



 	show: function(index) {
 		var myIndex = 0;
 		var iIndex = parseInt(index);
 		if (! isNaN(iIndex)) {
 			if (iIndex < 0) {
 				myIndex = 0;
 			} else if (iIndex >= this.quizCount) {
 				myIndex = this.quizCount - 1;
 			} else {
 				myIndex = iIndex;
 			}
 		}
 		if (this.currentIndex === myIndex) return;
 		MIGlobals.removeClass(document.querySelector(".book-btn.book-btn-down"), "book-btn-down");
 		MIGlobals.addClass(document.querySelector(".book-btn[data-index='" + myIndex + "']"), "book-btn-down");
 		
 		document.querySelector(".quiz-box").style.webkitTransform = 'translate(' + (-(myIndex * MIQuiz.quizWidth)) + 'px, 0)' ;		
 		// document.querySelector(".quiz-box").style.left = -(myIndex * MIQuiz.quizWidth) + "px";
 		this.currentIndex = myIndex;
 		this.titleIndexIndicatorElement.innerText = this.currentIndex + 1;
 		
 	},

 	showPrev: function() {
 		this.show(this.currentIndex - 1);
 	},

 	showNext: function() {
 		this.show(this.currentIndex + 1);
 	},

 	in_array: function(array, str){
 		for(i = 0; i < array.length; i++) {  
			if(array[i] == str) {
				return true;
			}
		}
		return false; 
 	},
 	/**
 	 * Show the answer for quiz
 	 *@param index the quiz-index or quiz element 
 	 */
 	showAnswer: function(indexOrElement) {
 		var quiz = null;
 		if (typeof indexOrElement === "number") {
 			quiz = document.querySelectorAll(".quiz")[indexOrElement];
 			if ( ! quiz) {
 				console.error("MIQuiz.showAnswer wrong parameter");
 				return;	
 			}
 		} else if (typeof indexOrElement === "object") {
 			quiz = indexOrElement;
 		} else {
 			console.error("MIQuiz.showAnswer wrong parameter");
 			return;
 		}

 		var dataQuizType= quiz.getAttribute("data-quiz-type");
 		if (dataQuizType=="m") {
 			var optionChecked = quiz.querySelectorAll(".option-checked");
 				var array = new Array;
 				for (var i = 0; i < optionChecked.length; i++) {
 					array[i] = optionChecked[i].getAttribute("data-option-no");
 				}
 			var dataOption =array;
 			var dataAnswer = quiz.getAttribute("data-answer");
 			var oAnswer= dataAnswer.split("-");
 			for (var i = 0; i < dataOption.length; i++) {
 				if(MIQuiz.in_array(oAnswer, dataOption[i])){
 					MIGlobals.addClass(quiz.querySelector(".option[data-option-no='" + dataOption[i] + "']"), "option-answer");
 				}else{
 					MIGlobals.addClass(quiz.querySelector(".option[data-option-no='" + dataOption[i] + "']"), "option-no");
 					
 					
 				}
 				
 			}
 			if (quiz.getAttribute("data-choice")=="") {
 				for (var i = 0; i < oAnswer.length; i++) {
 					MIGlobals.addClass(quiz.querySelector(".option[data-option-no='" + oAnswer[i] + "']"), "option-answer");
 				}
 			}
			
			  
 			if (dataOption.toString() == oAnswer.toString()) {
 				

 				MIGlobals.addClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") +"']"), "book-btn-yes");
 			}else{
 				
 				MIGlobals.addClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") +"']"), "book-btn-no");
 			}
 		}



 		if (quiz.getAttribute("data-choice") === quiz.getAttribute("data-answer")) {
			MIGlobals.addClass(quiz.querySelector(".option[data-option-no='" + quiz.getAttribute("data-choice") + "']"), "option-answer");
			MIGlobals.addClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") +"']"), "book-btn-yes");
		} else {
			MIGlobals.addClass(quiz.querySelector(".option[data-option-no='" + quiz.getAttribute("data-choice") + "']"), "option-no");
			MIGlobals.addClass(quiz.querySelector(".option[data-option-no='" + quiz.getAttribute("data-answer") + "']"), "option-answer");
			if (quiz.getAttribute("data-choice") !== "") {
				MIGlobals.addClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") +"']"), "book-btn-no");
			}
		}
		if (quiz.querySelector(".resolution")) {
			quiz.querySelector(".resolution").style.display = "block";
		}
			
		quiz.setAttribute("data-show-answer", "1");
		quiz.querySelector(".check-answer-every").innerText = "重新测试";
 	},


 	/** 
 	 * Hide answer for quiz
 	 *@param indexOrElement the quiz-index or quiz element
 	 */
 	hideAnswer: function (indexOrElement) {
 		var quiz = null;
 		if (typeof indexOrElement === "number") {
 			quiz = document.querySelectorAll(".quiz")[indexOrElement];
 			if ( ! quiz) {
 				console.error("MIQuiz.hideAnswer wrong parameter");
 				return;	
 			}
 		} else if (typeof indexOrElement === "object") {
 			quiz = indexOrElement;
 		} else {
 			console.error("MIQuiz.hideAnswer wrong parameter");
 			return;
 		}

 		quiz.setAttribute("data-choice", "");
		quiz.setAttribute("data-show-answer", "0");
		var opts = quiz.querySelectorAll(".option");
		for (var j = 0, m = opts.length; j < m; j++) {
			opts[j].setAttribute("data-is-selected","n");
			opts[j].setAttribute("data-is-answer","n");
			MIGlobals.removeClass(opts[j], "option-checked");
			MIGlobals.removeClass(opts[j], "option-no");
			MIGlobals.removeClass(opts[j], "option-answer");
		}
		if (quiz.querySelector(".resolution")) {
			quiz.querySelector(".resolution").style.display = "none";
		}
		MIGlobals.removeClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") +"']"), "book-btn-no");
		MIGlobals.removeClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") +"']"), "book-btn-select");
		MIGlobals.removeClass(document.querySelector(".book-btn[data-index='" + quiz.getAttribute("data-index") +"']"), "book-btn-yes");
		quiz.querySelector(".check-answer-every").innerText = "查看答案";
 	},

 	showAllAnswers: function() {
 		var quizzes = document.querySelectorAll(".quiz");
 		for (var i = 0, n = quizzes.length; i < n; i++) {
 			this.showAnswer(quizzes[i]);
 		}
 	},

 	// hideAllAnswers: function() {

 	// },

 	/**
 	 * 重置测试场景
 	 */
 	resetQuiz: function() {
 		var quizs = document.querySelectorAll(".quiz");
 		for (var i = 0, n = quizs.length; i < n; i++) {
 			var q = quizs[i];
 			q.setAttribute("data-choice", "");
 			q.setAttribute("data-show-answer", "0");
 		}	

 		var opts = document.querySelectorAll(".option");
 		for (var i = 0, n = opts.length; i < n; i++) {
 			var opt = opts[i];
 			MIGlobals.removeClass(opt, "option-checked");
 			MIGlobals.removeClass(opt, "option-answer");
 			MIGlobals.removeClass(opt, "option-no");
 		}

 		var descs = document.querySelectorAll(".resolution");
 		for (var i = 0, n = descs.length; i < n; i++) {
 			descs[i].style.display = "none";
 		}

 		var show1s = document.querySelectorAll(".check-answer-every");
 		for (var i = 0, n = show1s.length; i < n; i++) {
 			show1s[i].innerText = "查看答案";
 		}


 		var dots = document.querySelectorAll(".book-btn");
 		for (var i = 0, n = dots.length; i < n; i++) {
 			MIGlobals.removeClass(dots[i], "book-btn-select");
 			MIGlobals.removeClass(dots[i], "book-btn-no");
 			MIGlobals.removeClass(dots[i], "book-btn-yes");
 		}
 		this.currentIndex = -1;
 		this.show(0);
 	},

 	

    
 };

 /** 将用户选择的答案和选择的内容发送给，客户端。
     */
   function saveActivityData() {

    	
   		if (MIGlobals.isRunningPhone) {

   			var dataContent = [];
 			var table="abcdef"; 
 			var num =0;
 			var ques = document.querySelectorAll('.option-group');
 			var radius = document.querySelectorAll('.radius');
 			for(var i=0,n=ques.length; i<n; i++){
 				dataContent[i] = {};
 				dataContent[i].topic_sn = i+1;
 				if (ques[i].getAttribute('data-select-index')) {
 					userAnswers = ques[i].getAttribute('data-select-index').replace(/\d/g, function(n) {return table[n];}).split("-");
 				}else{
 					userAnswers = [""];
 				}
 				dataContent[i].user_answers = userAnswers;
 				
 				dataContent[i].right_answers = ques[i].parentElement.getAttribute('data-answer').split("-");
 				
 				if(compareArray(dataContent[i].user_answers, dataContent[i].right_answers)){

 					dataContent[i].is_right ="Y";
 					num++;
 				}else {

 					dataContent[i].is_right ="N";
 				}
 				
 				dataContent[i].topic_type = "CHOICE";
 			}
 			

 			
         

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
		            activity_type_major : "TEST",
		            activity_type_minor :"CHOICE",
		            topic_total_count : document.querySelectorAll(".quiz").length,
		            topic_answer_count : document.querySelectorAll(".selected").length,
		            topic_right_count :num,
		            enter_time:"",
		            exit_time:"",
		            topics: dataContent
		        };
		      	

   		}else{

 			var dataContent = [];
 			var ques = document.querySelectorAll('.quiz');
 			var btnright = document.querySelectorAll(".book-btn");
 			var num = 0;
 			for(var i=0,n=ques.length; i<n; i++){
 				dataContent[i] = {};
 				dataContent[i].topic_sn = i+1;
 				var userAnswers =[""];
 				var options = ques[i].querySelectorAll(".option-checked");
 				for (var j = 0; j < options.length; j++) {
 					
 					userAnswers[j] = options[j].getAttribute("data-option-no");

 				}

 			
 				dataContent[i].user_answers = userAnswers;
 				dataContent[i].right_answers = ques[i].getAttribute('data-answer').split("-");
 				if(compareArray(dataContent[i].user_answers, dataContent[i].right_answers)){

 					dataContent[i].is_right ="Y";
 					num++;
 				}else {

 					dataContent[i].is_right ="N";
 				}
 				dataContent[i].topic_type = "CHOICE";
 			
 			}
 			
 			

 		

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
            activity_type_major : "TEST",
            activity_type_minor :"CHOICE",
            topic_total_count : document.querySelectorAll(".quiz").length,
            topic_answer_count : document.querySelectorAll(".book-btn-select").length,
            topic_right_count :num,
            enter_time:"",
            exit_time:"",
            topics: dataContent
        };
      	
    }
        

        return JSON.stringify(data2Post);
    }

    function saveNotiFication(){
    	MIGlobals.ajax({
            url: MIGlobals.contextRoot + "/save_activity_notification.action",
            method: "post",
            dataType: 'json',
            success: function(response) {
                if (response.resultCode == 0) {
                    log("Save user data OK");
                } else {
                    log("Save user data failed");
                }
               
            }
        });
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