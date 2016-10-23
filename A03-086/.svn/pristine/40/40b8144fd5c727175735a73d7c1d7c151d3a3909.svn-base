var MISPhone = {
 	topWhite: 30,
 	currentIndex : 0,
 	quizCount : 0,
 	bottomElement : null,
 	quizWidth: 0, 
 	leftBtn: null,
 	rightBtn: null,
 	downNo: 0,
 	startLeft: 0,
 	endGame: false,
 	moving: false,
 	
 	init: function() {
 		var wrapBox = document.querySelector('.quiz-block');
 		var containerBox = document.querySelector('.quiz-box');
 		var showAnsBtns = document.querySelectorAll('.check-answer-every');

 		this.quizWidth = wrapBox.offsetWidth;
 		this.leftBtn = document.querySelector('.left');
 		this.rightBtn = document.querySelector('.right');
 		this.currentIndex = 0;
 		this.endGame = false;

 		containerBox.style.webkitTransform = 'translateX(0)';
 		var footCtr = document.querySelector('.center');

 		var boxes = document.querySelectorAll('.quiz-sbox');
 		var radius0 = window.getComputedStyle(footCtr.querySelector('.radius'));
 		//底部圆圈居中显示
 		var rM = parseFloat(radius0.marginRight);
 		var rW = parseFloat(radius0.width);
 		var fcw = boxes.length * (rM + rW + 2) - rM;
 		var cw = document.querySelector('.c-wrap').offsetWidth;
 		footCtr.style.width = fcw + 'px';
 		
 		if(fcw <= cw){
 			this.startLeft = (cw - fcw) / 2;
 			// footCtr.style.left = (cw - fcw) / 2 + 'px';
 		}

 		for(var i=0, n=boxes.length; i<n; i++){
 			boxes[i].style.width = this.quizWidth + 'px';
 			var items = boxes[i].querySelectorAll('.option');
 		
	 		for(var j=0, m=items.length; j<m; j++){
	 			var item = items[j];
	 			item.setAttribute('data-index', j);
	 			item.addEventListener(MIGlobals.eventTouchStart, MISPhone.itemDown);
	 			item.addEventListener(MIGlobals.eventTouchEnd, MISPhone.itemClick);
	 		}
 		}

 		for(var i=0, n=showAnsBtns.length; i<n; i++){
 			var btn = showAnsBtns[i];
 			btn.setAttribute('data-index', i);
 			btn.addEventListener(MIGlobals.eventTouchEnd, MISPhone.showAnsClick);
 		}
 		
 		this.quizCount = n;
 		this.currentIndex = 0;

 		MIGlobals.addClass(this.leftBtn, 'leftMin');
 		if(this.currentIndex < this.quizCount - 1){
 			MIGlobals.addClass(this.rightBtn, 'right1');
 		} else{
 			MIGlobals.addClass(this.rightBtn, 'rightMax');
 		}
 		
 		
 		containerBox.style.width = this.quizWidth * n + 'px';
 		// setTimeout(function(e){

 		// 	this.bottomElement = document.querySelector('.foot');
 			
 		// 	var h = window.innerHeight - MISPhone.topWhite - this.bottomElement.offsetHeight;
 		// 	document.querySelector('.quiz-block').style.height = h + 'px';
 		// 	log(document.querySelector('.quiz-block').style.height)
 		// }, 10);

 		this.leftBtn.addEventListener(MIGlobals.eventTouchEnd, this.showPrev);
 		
 		this.rightBtn.addEventListener(MIGlobals.eventTouchEnd, this.showNext);
 		
 		var radius = document.querySelectorAll('.center>div');
 		for(var i=0, n=radius.length; i<n; i++){
 			var r = radius[i];
 			r.setAttribute('data-index', i);
 			r.addEventListener(MIGlobals.eventTouchEnd, MISPhone.radiusClick);
 		}
 		MIGlobals.addClass(radius[0], 'down');
 		MISPhone.isMove();
 		
 		// document.addEventListener(MIGlobals.eventTouchMove, MISPhone.cancleClick, true);
 		// document.addEventListener(MIGlobals.eventTouchEnd, MISPhone.allowClick, true);
 	},

 	cancleClick: function(e){

 		// if(MIGlobals.hasClass(e.target,'option')){
 		// 	MISPhone.moving = false;
 		// } else{
 			MISPhone.moving = true;
 		// }

 		
 	},

 	allowClick: function(e){
 		
 	
 		MISPhone.moving = false;
 	
 	},

 	show: function(index) {
 		var myIndex = 0;
 		var iIndex = parseInt(index);

 		
 		if (! isNaN(iIndex)) {
 			if (iIndex < 0) {
 				myIndex = 0;
 			} else if (iIndex >= MISPhone.quizCount) {
 				myIndex = MISPhone.quizCount - 1;
 			} else {
 				MISPhone.moving = false;

 				myIndex = iIndex;
 				MIGlobals.removeClass(MISPhone.rightBtn, 'rightMax');
 				MIGlobals.addClass(MISPhone.rightBtn, 'right1');
 				MIGlobals.removeClass(MISPhone.leftBtn, 'leftMin');
 				MIGlobals.addClass(MISPhone.leftBtn, 'left1');
 			}
 			if(iIndex == this.quizCount-1){
 				MIGlobals.removeClass(MISPhone.rightBtn, 'right1');
 				MIGlobals.addClass(MISPhone.rightBtn, 'rightMax');
 			}
 			if(iIndex == 0){
 				MIGlobals.removeClass(MISPhone.leftBtn, 'left1');
 				MIGlobals.addClass(MISPhone.leftBtn, 'leftMin');
 			}
 		}
 		if (MISPhone.currentIndex === myIndex) return;
 		
 		log('show');

 		MIGlobals.removeClass(document.querySelector(".radius.down"), "down");
 		MIGlobals.addClass(document.querySelector(".radius[data-index='" + myIndex + "']"), "down");
 		
 		// document.querySelector(".quiz-box").style.left = parseInt(-(myIndex * MISPhone.quizWidth)) + 'px';
 		document.querySelector(".quiz-box").style.webkitTransform = 'translateX('+ parseInt(-(myIndex * MISPhone.quizWidth)) + 'px)';
 		
 		MISPhone.currentIndex = myIndex;
 		MISPhone.isMove();
 		
 	},
 	// //底部的小圆圈是否需要移动
 	isMove: function(e){

 		log('isMove');
 		var fcenter = document.querySelector('.center');
 		var fcw = +document.querySelector('.c-wrap').offsetWidth;
 		var rRect = window.getComputedStyle(document.querySelector('.radius'));
 		var rMargin = parseFloat(rRect.marginRight);
 		//小圆圈一次移动的距离
 		var rmove = parseFloat(rRect.width)+ parseFloat(rRect.borderLeftWidth)*2;
 		//一次可以放置的最大数量
 		var maxNo = parseInt((fcw+rMargin) / (rmove + parseFloat(rMargin)));
 		var totalNo = +document.querySelectorAll('.radius').length;
 		if(maxNo<MISPhone.quizCount && MISPhone.currentIndex !== MISPhone.quizCount-1){
 			MIGlobals.addClass(MISPhone.rightBtn, 'rightBg');
 		} else{
 			MIGlobals.removeClass(MISPhone.rightBtn, 'rightBg');
 		}
 		log('maxNo = '+ maxNo);
 		if(maxNo-1 < MISPhone.currentIndex){
 			log('greater than');
 			MIGlobals.addClass(MISPhone.leftBtn, 'leftBg');
 			// fcenter.style.left = -(MISPhone.currentIndex - maxNo + 1) * (rmove + parseFloat(rMargin)) + 'px';
 			fcenter.style.webkitTransform ='translateX(' +  (-(MISPhone.currentIndex - maxNo + 1) * (rmove + parseFloat(rMargin))) + 'px)';
 		
 		} else{
 			MIGlobals.removeClass(MISPhone.leftBtn, 'leftBg');
 			// fcenter.style.left = MISPhone.startLeft + 'px';
 			fcenter.style.webkitTransform ='translateX(' + MISPhone.startLeft + 'px)';

 		}

 	},
 	
 	showPrev: function(e) {
 		MISPhone.show(MISPhone.currentIndex - 1);
 	},
 	showNext: function(e) {
 		log('showNext');
 		MISPhone.show(MISPhone.currentIndex + 1);
 	},

 	//null代表初始状态，查看答案， 不可以查看答案
 	// 1 代表可以查看答案
 	// 2 点击查看答案之后， 重新测试
 	showAnsClick: function(e){


 		if(MISPhone.endGame) return;

 		

 		var procedure = e.target.getAttribute('data-proc');

 		if(!procedure) return;
 		
 		log('in showAnsClick');

 		var crtSbox = document.querySelectorAll('.quiz-sbox')[MISPhone.currentIndex].querySelector('.option-group');
 	
 		var selectIndex = crtSbox.getAttribute('data-select-index');
 	
 		var rightIndex = crtSbox.getAttribute('data-ans');
 		
 		var items = crtSbox.querySelectorAll('.option');
 		var selectAns ;
 		var rightAns ;
 		var crtRadius = document.querySelectorAll('.radius')[MISPhone.currentIndex];
 		var description = crtSbox.querySelector('.analysis');
 		var isMulti = false;
 		isMulti = MIGlobals.hasClass(crtSbox, 'multi-choice')? true: false;

 		if(isMulti){
 			rightAns = rightIndex.split('-');
			selectAns = selectIndex.split('-');
			
			rightAns.sort();
			selectAns.sort();

 			if(procedure == '1'){
 				MISPhone.moving = true;
	 			e.target.innerHTML = '重新测试';
	 			e.target.setAttribute('data-proc', '2');
	 			MIGlobals.removeClass(crtRadius, 'down');
	 			crtRadius.innerHTML = '';
	 			crtSbox.setAttribute('data-show-answer', 'true');


	 			if(rightAns.length !== selectAns.length){
 					MIGlobals.addClass(crtRadius, 'downno');
 				}

 				var equal = 1;
				for(var i=0, n=selectAns.length ; i<n; i++){
					if(rightAns[i] !== selectAns[i]){
						MIGlobals.addClass(crtRadius, 'downno');
						equal = 0;
						break;
					}
				}
				if(equal == 1){
					MIGlobals.addClass(crtRadius, 'downyes');
				} else{
					MIGlobals.addClass(crtRadius, 'downno');
				}
				for(var i=0, n=selectAns.length; i<n; i++){
 					MIGlobals.addClass(items[rightAns[i]], 'ino');
 				}
 				for(var i=0, n=rightAns.length; i<n; i++){
 					MIGlobals.removeClass(items[rightAns[i]], 'ino');
 					MIGlobals.addClass(items[rightAns[i]], 'iyes');
 				}
	 			if(description){
	 				description.style.display = 'block';
	 			}
	 		}else if(procedure == '2'){

 				MISPhone.moving = false;
 				
	 			crtSbox.removeAttribute('data-show-answer');
	 			e.target.innerHTML = '查看答案';
	 			MIGlobals.removeClass(e.target, 'showAnswer');
	 			e.target.removeAttribute('data-proc');

	 			crtSbox.removeAttribute('data-select-index');
	 			
	 			for(var i=0, n=items.length; i<n; i++){
 					var item = items[i];
 					if(MIGlobals.hasClass(item, 'iyes')){
 						MIGlobals.removeClass(items[i], 'iyes');
 					}
 					if(MIGlobals.hasClass(item, 'ino')){
 						MIGlobals.removeClass(items[i], 'ino');
 					}
 					// item.style.backgroundColor = '#fff';
 					MIGlobals.removeClass(item, 'sdown');
 				}
 				if(description){
	 				description.style.display = 'none';
	 			}

	 			MIGlobals.removeClass(crtRadius, 'downyes');
	 			MIGlobals.removeClass(crtRadius, 'downno');
	 			MIGlobals.addClass(crtRadius, 'down');
	 			crtRadius.innerHTML = MISPhone.currentIndex + 1;

	 		}
 		} else{
 			MISPhone.moving = false;
 			selectAns = items[+selectIndex];
 			rightAns = items[+rightIndex];

 			if(procedure == '1'){
	 			e.target.innerHTML = '重新测试';
	 			e.target.setAttribute('data-proc', '2');
	 			MIGlobals.removeClass(crtRadius, 'down');
	 			crtRadius.innerHTML = '';
	 			crtSbox.setAttribute('data-show-answer', 'true');
	 			if(selectIndex === rightIndex){
	 				MIGlobals.addClass(selectAns, 'iyes');
	 				MIGlobals.addClass(crtRadius, 'downyes');
	 			} else{
	 				MIGlobals.addClass(selectAns, 'ino');
	 				MIGlobals.addClass(rightAns, 'iyes');
	 				// rightAns.style.backgroundColor = '#eaf7fa';
	 				//MIGlobals.addClass(rightAns, 'sdown');
	 				
	 				MIGlobals.addClass(crtRadius, 'downno');
	 			}
	 			if(description){
	 				description.style.display = 'block';
	 			}
	 		}else if(procedure == '2'){
	 			crtSbox.removeAttribute('data-show-answer');
	 			e.target.innerHTML = '查看答案';
	 			MIGlobals.removeClass(e.target, 'showAnswer');
	 			e.target.removeAttribute('data-proc');

	 			crtSbox.removeAttribute('data-select-index');

	 			MIGlobals.removeClass(rightAns, 'iyes');
 				// selectAns.style.backgroundColor = '#fff';
 				MIGlobals.removeClass(selectAns, 'sdown');

	 			// rightAns.style.backgroundColor = '#fff';
	 			MIGlobals.removeClass(rightAns, 'sdown');

	 			MIGlobals.removeClass(selectAns, 'iyes');
	 			MIGlobals.removeClass(selectAns, 'ino');

	 			if(description){
	 				description.style.display = 'none';
	 			}

	 			MIGlobals.removeClass(crtRadius, 'downyes');
	 			MIGlobals.removeClass(crtRadius, 'downno');
	 			MIGlobals.addClass(crtRadius, 'down');
	 			crtRadius.innerHTML = MISPhone.currentIndex + 1;

	 		}
 		}
 	},
 	itemDown: function(e){
 		
 		if(MISPhone.endGame || !MIGlobals.hasClass(e.target, 'option') || MISPhone.moving) return;
 		if(MIGlobals.hasClass(e.target, 'analysises')) return;
 		log('itemDown and endGame');

 		var eParent = e.target.parentNode;
 		var clickNo = eParent.getAttribute('data-select-index');
 		
 		
 		if(eParent.getAttribute('data-show-answer') && !MIGlobals.hasClass
 			(eParent, 'multi-choice')) return;

 		
 		
 		if(MIGlobals.hasClass(eParent, 'multi-choice')){
 			log('has multi-choice');
 			// var Multiclect = document.querySelectorAll(".multi-choice > .option ");
 			// var Multiclect = document.querySelectorAll('.quiz-sbox')[MISPhone.currentIndex].querySelectorAll(".multi-choice >.option ");
 			
 			// MIGlobals.hasClass(Multiclect[e.target.getAttribute('data-index')],"sdown")

 			if (MIGlobals.hasClass(e.target,"sdown")) {

 				MIGlobals.removeClass(e.target,"sdown");

 			}else{
 				
 				MIGlobals.addClass(e.target,"sdown");
 				
 			}

 			var answer = document.querySelectorAll('.quiz-sbox')[MISPhone.currentIndex].querySelectorAll(".sdown");
			var arr = [];
			for (var i = 0; i < answer.length; i++) {
				arr.push(answer[i].getAttribute('data-index'));
			}
			var indexes = arr.toString().replace(/,/g,"-");
			

			eParent.setAttribute('data-select-index', indexes)
 			
 			
 		} else{

 			if(clickNo !== null){
 				
	 			var selectItem = eParent.querySelectorAll('.option')[clickNo];
				
				if(clickNo == e.target.getAttribute('data-index')){

					if(MIGlobals.hasClass(e.target,"sdown")) {
						
						MIGlobals.removeClass(e.target,"sdown");

		 			}else{
		 				
		 				MIGlobals.addClass(e.target,"sdown");
		 				
		 			}

				} else{
					
					MIGlobals.addClass(e.target,"sdown");
					MIGlobals.removeClass(selectItem,"sdown");
				}
				
			} else{
				MIGlobals.addClass(e.target,"sdown");
			}

			

	 		eParent.setAttribute('data-select-index', e.target.getAttribute('data-index'));
	 		
 		}

 			
 		
 	},

 	itemClick: function(e){
 		if(MISPhone.endGame) return;

 		var eParent = this.parentNode;

 		if(eParent.getAttribute('data-show-answer') && !MIGlobals.hasClass
 			(eParent, 'multi-choice') || MISPhone.moving) return;


 		// e.target.setAttribute('data-proc', '2');
 		MISPhone.downNo ++;

 		var crtAnsBtn = document.querySelectorAll('.quiz-sbox')[MISPhone.currentIndex].querySelector('.check-answer-every');
 		if(crtAnsBtn){
 			crtAnsBtn.setAttribute('data-proc', '1');
 			MIGlobals.addClass(crtAnsBtn, 'showAnswer');
 		}

 		var crtRadius = document.querySelectorAll('.radius')[+MISPhone.currentIndex];

 		MIGlobals.addClass(crtRadius, 'selected');
 		if(MISPhone.currentIndex === MISPhone.quizCount-1){
 			MISPhone.isShowAns();
 		}
 		
 	},
 	//判断是否到最后一页， 并且判断此时是交卷还是直接 查看答案
 	isShowAns: function(){
 		log('isShowAns');

 		var circles = document.querySelectorAll('.radius');
 		var no = 0;
 		for(var i=0; i<MISPhone.quizCount; i++){
 			var circle = circles[i];
 			if(!MIGlobals.hasClass(circle, 'downyes') && !MIGlobals.hasClass(circle, 'downno')){
 				no++;
 			}
 		}


 		var crtAnsBtn = document.querySelectorAll('.check-answer-every')[MISPhone.currentIndex];

 		crtAnsBtn.innerHTML = '交卷';
 		if(no<2) {
 			// MISPhone.showJudge();
 			// return;
 			crtAnsBtn.innerHTML = '查看答案';
 		}
 		crtAnsBtn.setAttribute('data-click', '1');
 		// MISPhone.endGame = true;
 		crtAnsBtn.addEventListener(MIGlobals.eventTouchEnd, MISPhone.showAnswer);
 	},

 	//判断是交卷还是重新游戏
 	showAnswer: function(){
 		
 		MISPhone.endGame = true;
 		if(this.getAttribute('data-click') == 1){
 			this.innerHTML = '重新测试';
 			this.setAttribute('data-click', '0');
	 		MISPhone.showJudge();
	 		saveNotiFication();
 		} else{
 		
 			this.innerHTML = '查看答案';
 			
 			this.removeAttribute('data-click');
 			MISPhone.restart();
 		}
 		
 	},
 	//对提交答案进行判断
 	showJudge: function(){
 		var boxes = document.querySelectorAll('.option-group');
 		MISPhone.endGame = true;
 		for(var i=0, n=boxes.length; i<n; i++){

 			var box = boxes[i];

 			var reslusion = box.querySelector('.analysis');
 			log(reslusion);

 			if(reslusion){
 				reslusion.style.display = 'block';
 			}

 			var selectAns = box.getAttribute('data-select-index');
 			var ans = box.getAttribute('data-ans');
 			var isMulti = MIGlobals.hasClass(box, 'multi-choice')? true: false;
 			var circles = document.querySelectorAll('.radius');
 			circles[i].innerHTML = '';
 			// MIGlobals.removeClass(circles[i], 'selected');
 			var items = box.querySelectorAll('.option');

 			if(isMulti){
 				log('isMulti');
 				var anses = ans.split('-');
 				anses.sort();

 				if(!selectAns){
 					MIGlobals.addClass(circles[i], 'downno');
 					for(var j=0, m=anses.length; j<m; j++){
 						var rightAns = items[anses[j]];
	 					MIGlobals.removeClass(rightAns, 'ino');
	 					MIGlobals.addClass(rightAns, 'iyes');
	 				}
	 				continue;
 				}
 				var sanses = selectAns.split('-');
 				
 				sanses.sort();
 				if(sanses.length !== anses.length){
 					MIGlobals.addClass(circles[i], 'downno');
 					for(var j=0; j<sanses.length; j++){
 						MIGlobals.addClass(items[sanses[j]], 'ino');
 					}
 					for(var j=0; j<anses.length; j++){
 						MIGlobals.removeClass(items[anses[j]], 'ino');
 						MIGlobals.addClass(items[anses[j]], 'iyes');
 					}
 					continue;
 				} 
 				var isTrue = true;
 				for(var j=0, m=anses.length; j<m; j++){
 					MIGlobals.addClass(items[sanses[j]], 'ino');
 					MIGlobals.removeClass(items[anses[j]], 'ino');
 					MIGlobals.addClass(items[anses[j]], 'iyes');
 					if(sanses[j] !== anses[j]){
 						isTrue = false;
 					}
 				}
 				if(!isTrue){
 					MIGlobals.addClass(circles[i], 'downno');
 				} else{
 					MIGlobals.addClass(circles[i], 'downyes');
 				}
 			} else{
 				log('no isMulti');

 				if(selectAns !== ans || !selectAns){
 					MIGlobals.addClass(circles[i], 'downno');
 					MIGlobals.addClass(items[selectAns], 'ino');
 					MIGlobals.addClass(items[ans], 'iyes');
 				} else{
 					MIGlobals.addClass(circles[i], 'downyes');
 					MIGlobals.addClass(items[ans], 'iyes');
 				}
 			}
 			
 		}
 		var showAnswers = document.querySelectorAll('.check-answer-every');
 		for(var i=0, n=showAnswers.length-1; i<n; i++){
 			showAnswers[i].innerHTML = '查看答案';
 			MIGlobals.removeClass(showAnswers[i], 'showAnswer');
 		}
 	},
 	//重新开始游戏
 	restart: function(){
 		log('restart');

 		var boxes = document.querySelectorAll('.option-group');
 		var items = document.querySelectorAll('.option');
 		var circles = document.querySelectorAll('.radius');
 		for(var i=0, n=items.length; i<n; i++){
 			var item = items[i];
 			// items[i].style.backgroundColor = '#fff';
 			MIGlobals.removeClass(items[i], 'sdown');

 			MIGlobals.removeClass(items[i], 'iyes');
 			MIGlobals.removeClass(items[i], 'ino');
 			
 		}

 		for(var i=0, n=boxes.length; i<n; i++){
 			var box = boxes[i];
 			box.removeAttribute('data-select-index');
 			box.removeAttribute('data-show-answer');
 			var circle = circles[i];
 			MIGlobals.removeClass(circle, 'down');
 			MIGlobals.removeClass(circle, 'downyes');
 			MIGlobals.removeClass(circle, 'downno');
 			MIGlobals.removeClass(circle, 'selected');
 			circle.innerHTML = i + 1;
 		}

 		var analysises = document.querySelectorAll('.analysis');
 		for(var i=0, n=analysises.length ; i<n; i++){
 			analysises[i].style.display = 'none';
 		}
 		var showAnswers = document.querySelectorAll('.check-answer-every');
 		for(var i=0, n=showAnswers.length; i<n; i++){
 			showAnswers[i].removeAttribute('data-proc');
 			MIGlobals.removeClass(showAnswers[i], 'showAnswer');
 			showAnswers[i].innerHTML = '查看答案';
 		}
 		MISPhone.moving = false;
 		MISPhone.init();
 	},

 	radiusClick: function(e){
 		// if(MISPhone.endGame) return;

 		if(!MIGlobals.hasClass(e.target, 'radius')) return;

 		var index = +this.getAttribute('data-index');

 		MISPhone.show(index);
 	},

 	in_array: function(array, str){
 		for(i = 0; i < array.length; i++) {  
			if(array[i] == str) {
				return true;
			}
		}
		return false; 
 	},
 		  /** 将用户做的填空题保存到本地数据库。此部分数据可以进行云端同步。
     */
  
 };


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