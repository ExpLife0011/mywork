
var MIQuiz = {
	status: 0,


	makeQuiz: function () {
		this.makeQuizOptions();
		this.makeShowAnswerButton();
	},

	makeShowAnswerButton: function () {
		var btn = $("show-answer");
		if (!btn) {
			log("Can not find button with id show-answer");
			return false;
		}
		
		btn.addEventListener(MIGlobals.eventTouchStart, function(e) {
			this.setAttribute("data-moved", "n");
			MIGlobals.addClass(this, "show-answer-down");
		}, false);
		btn.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			MIGlobals.removeClass(this, "show-answer-down");
			if (this.getAttribute("data-moved") == "y") {
				return false;
			}

			if (MIQuiz.status == 0) {
				MIQuiz.status = 1;
				this.innerText = "重新测试";
				MIQuiz.showAnswers();
			} else {
				MIQuiz.hideAnswers();
				MIQuiz.status = 0;
				this.innerText = "查看答案";
			}

		}, false);

		if (MIGlobals.isTouchSupported) {
			btn.addEventListener(MIGlobals.eventTouchMove, function(e) {
				this.setAttribute("data-moved", "y");
			}, false);
			btn.addEventListener(MIGlobals.eventTouchCancel, function(e) {
				MIGlobals.removeClass(this, "show-answer-down");
			}, false);
		}
	},

	makeQuizOptions: function () {

		var options = document.querySelectorAll("div.option");
		for (var i = options.length; i--;) {
			var option = options[i];
			option.setAttribute("data-is-selected","n");
			option.setAttribute("data-is-answer","n");
			var dataOptionNo = option.getAttribute("data-option-no");
			var eleQuiz = option.parentElement.parentElement;
			var dataAnswer = eleQuiz.getAttribute("data-answer");
			var o = dataAnswer.split("-");
			for (var j =0; j < o.length;j++) {
				if (dataOptionNo == o[j]) {
					option.setAttribute("data-is-answer","y")
				}
			}
			
			option.addEventListener(MIGlobals.eventTouchStart, function(e) {
				var dataIsSelected = this.getAttribute("data-is-selected");
				if (MIQuiz.status == 1) return false;
				this.setAttribute("data-moved", "n");
				if (dataIsSelected == "y") {
					MIGlobals.removeClass(this, "option-checked");
				}
				MIGlobals.addClass(this, "option-down");
			}, false);

			option.addEventListener(MIGlobals.eventTouchEnd, function(e) {
				if (MIQuiz.status == 1) return false;
				// If the current touched item is the selected item, nothing else to do, just return.
				MIGlobals.removeClass(this, "option-down");
				if (this.getAttribute("data-moved") == "y") {
					return false;
				}
				var eleQuiz = this.parentElement.parentElement;
				var lastChoice = eleQuiz.getAttribute("data-choice");
				var dataQuizType = eleQuiz.getAttribute("data-quiz-type");
				var myChoice = this.getAttribute("data-option-no");

				if (dataQuizType == "m") {
					var dataIsSelected = this.getAttribute("data-is-selected");
					if (dataIsSelected == "y") {
						this.setAttribute("data-is-selected" ,"n");
					}else {
						MIGlobals.addClass(this, "option-checked");
						this.setAttribute("data-is-selected","y");
					}
				}else {
					if (lastChoice != myChoice && lastChoice != "") {
						var eleLastChoice = eleQuiz.querySelector(MIGlobals.format("div.option-group > div.option[data-option-no='%s']", lastChoice));
						MIGlobals.removeClass(eleLastChoice, "option-checked");
						eleLastChoice.setAttribute("data-is-selected","n");
					}
					MIGlobals.addClass(this, "option-checked");
					eleQuiz.setAttribute("data-choice", myChoice);
					this.setAttribute("data-is-selected","y");
				}

			}, false); 

			if (MIGlobals.isTouchSupported) {
				option.addEventListener(MIGlobals.eventTouchMove, function(e) {
					this.setAttribute("data-moved", "y");
				}, false);

				option.addEventListener(MIGlobals.eventTouchCancel, function(e) {
					if (MIGlobals.hasClass(this, "option-checked")) {
						return false;
					}
					MIGlobals.removeClass(this, "option-down");
				}, false);
			}
		}
	},


	showAnswers: function () {
		var quizzes = document.querySelectorAll("div.quiz");
		if (quizzes) {
			for (var i = quizzes.length; i--;) {
				var q = quizzes[i];
				var a = q.getAttribute("data-answer");
				var c = q.getAttribute("data-choice");

				var dataOptions = q.querySelectorAll("div.option");
				for (var m = dataOptions.length; m--;) {
					var dataOption = dataOptions[m];
					var dataIsAnswer = dataOption.getAttribute("data-is-answer");
					var dataIsSelected = dataOption.getAttribute("data-is-selected");
					MIGlobals.removeClass(dataOption, "option-checked");

					if (dataIsAnswer == "y" && dataIsSelected == "y") {
						MIGlobals.addClass(dataOption, "option-yes");
					} else if (dataIsAnswer == "n" && dataIsSelected == "y"){
						MIGlobals.addClass(dataOption, "option-no");
					} else if (dataIsAnswer == "y") {
						MIGlobals.addClass(dataOption, "option-answer");
					}
					/*
					if (dataIsAnswer == "y") {
						MIGlobals.addClass(dataOption, "option-yes");
					} else {
						MIGlobals.addClass(dataOption, "option-no");
					}
					if (dataIsAnswer == "n" && dataIsSelected =="y") {
						MIGlobals.addClass(dataOption, "option-no");
					}
					*/
				}
			}
		}
	},

	hideAnswers: function () {
		var quizzes = document.querySelectorAll("div.quiz");
		if (quizzes) {
			for (var i = quizzes.length; i--;) {
				var q = quizzes[i];
				q.setAttribute("data-choice", "");

			}
		}

		var options = document.querySelectorAll("div.option");
		if (options) {
			for (var i = options.length; i--;) {
				var opt = options[i];
				if (opt.className != "option") {
					opt.className = "option";
				}
				opt.setAttribute("data-is-selected", "n");

			}
		}
	}

};
