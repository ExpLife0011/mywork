var select = {
	answerBox:null,
	choose:null,
	init:function(){
		this.choose = document.querySelectorAll('.choose');
		this.answerBox = document.querySelectorAll('.answerBox');
		for (var i = 0; i < this.answerBox.length; i++) {
			this.answerBox[i].setAttribute('data-right-answer',this.answerBox[i].textContent);
			this.answerBox[i].textContent = '';
		}
		for (var i = 0; i < this.choose.length; i++) {
			this.choose[i].setAttribute('data-status',this.choose[i].querySelector('.alternately-o').textContent);
			MIGlobals.addClass(this.choose[i],'chooseOp');
		}
		document.addEventListener(MIGlobals.eventTouchEnd,this.touch,true);
	},
	touch:function(e){
		e = e.target;
		if (MIGlobals.hasClass(e,'choose')) {
			if (e.getAttribute('data-stop-touch') == 'stop') return;
			var userAnswer = e.querySelector('.alternately-o').textContent;
			e.parentNode.querySelector('.answerBox').textContent = userAnswer;
		};
		if (MIGlobals.hasClass(e,'alternately-cross')) {
			var eleToJudge = e.parentNode.querySelectorAll('.answerBox');
			log(eleToJudge)
			var eleInJudge = e.parentNode.querySelectorAll('.judge')
			var stopTouch = e.parentNode.querySelectorAll('.choose');
			log(stopTouch)
			if (e.textContent == '交卷') {
				for (var i = 0; i < stopTouch.length; i++) {
					stopTouch[i].setAttribute('data-stop-touch','stop');
					MIGlobals.removeClass(stopTouch[i],'chooseOp');
				}
				for (var i = 0; i < eleToJudge.length; i++) {
					if (eleToJudge[i].getAttribute('data-right-answer') == eleToJudge[i].textContent) {
						MIGlobals.addClass(eleInJudge[i],'right');
					}else{
						var attr = eleToJudge[i].getAttribute('data-right-answer');
						log('running')
						MIGlobals.addClass(eleInJudge[i],'wrong');
						eleInJudge[i].parentNode.parentNode.setAttribute('data-status','wrong')
						var ele = e.parentNode.querySelectorAll(".choose[data-status = '"+ attr +"']");
						for (var j = 0; j < ele.length; j++) {
							if (ele[j].parentNode.getAttribute('data-status') == 'wrong') {
								log('runningwrong')
								var judgeele = ele[j].parentNode.querySelector('.answerBox');
								if (judgeele.getAttribute('data-right-answer') == ele[j].getAttribute('data-status')) {
									ele[j].style.color = '#60C36D';
									ele[j].querySelector('.alternately-o').style.backgroundColor = '#60C36D';
								};	
							};
							
						};
					};
				};
				e.textContent = '重新测试';
			}else if (e.textContent == '重新测试'){
				for (var i = 0; i < stopTouch.length; i++) {
					stopTouch[i].setAttribute('data-stop-touch','running');
					MIGlobals.addClass(stopTouch[i],'chooseOp');
				}
				for (var i = 0; i < eleToJudge.length; i++) {
					e.parentNode.querySelectorAll('.answerBox')[i].textContent = '';
					// if (eleToJudge[i].getAttribute('data-right-answer') == eleToJudge[i].textContent) {
						MIGlobals.removeClass(eleInJudge[i],'right');
					// }else{
						var attr = eleToJudge[i].getAttribute('data-right-answer');
						log('running')
						MIGlobals.removeClass(eleInJudge[i],'wrong');
						eleInJudge[i].parentNode.parentNode.setAttribute('data-status','wrong')
						var ele = e.parentNode.querySelectorAll(".choose[data-status = '"+ attr +"']");
						for (var j = 0; j < ele.length; j++) {
							if (ele[j].parentNode.getAttribute('data-status') == 'wrong') {
								ele[j].style.color = '#000';
								ele[j].querySelector('.alternately-o').style.backgroundColor = '#85003c';
							}
							
						};
					// };
				};
				e.textContent = '交卷';
			};
		};
	}
}