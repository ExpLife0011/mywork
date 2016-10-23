/**
 * 参照001-B07/c01/expand.html
 * author yanli.ma
 * modify penghui
 */
var ImgQuize = {
	g_currentIndex : -1,
	g_images : null,
	g_IndexMapImg : null,
	g_filledAnswer : [],
	fn_queue : [],
	resultPage : null // 显示结果的界面
};

ImgQuize.initEventListener = function() {
	var poses = document.getElementById("foot").children,
		i;
	ImgQuize.resultPage = document.querySelector('.show-time');
	ImgQuize.great = ImgQuize.resultPage.querySelector('.great'),
	ImgQuize.great.addEventListener(MIGlobals.eventTouchEnd, function(evt){
		// 隐藏显示结果的界面
		ImgQuize.resultPage.style.display = "none";
		// 执行
		var fn = ImgQuize.fn_queue.pop();
		fn();
	});
	for(i = 0; i < poses.length; i++) {
		var p = poses[i];
		p.addEventListener(MIGlobals.eventTouchStart, function(e) {
			if(ImgQuize.doingStep === 0){ // 开始(一个元素点击后知道完全完成才能做下次点击)
				ImgQuize.doingStep = 1;
			}else{
				return;
			}
			MIGlobals.addClass(this, "down");
			for(var j = 0; j < poses.length; j++){
				poses[j].style.color = "#000"; // 黑色
			}
			this.style.color = "red";
			log('start, ');
		});
		p.addEventListener(MIGlobals.eventTouchEnd, function(e) {
			log('endFn, ');
			var temp = ImgQuize.doingStep + 1;
			if(temp === 2){
				ImgQuize.doingStep = 3;
			}else{
				return;
			}
			MIGlobals.removeClass(this, "down");
			ImgQuize.charUp(this.getAttribute("data-index"));
		});
	}
};

ImgQuize.charUp = function(fromIndex) { 
	var pack = document.getElementById("pack");
	var index = parseInt(fromIndex, 10);
	pack.setAttribute("data-from-index",fromIndex);
	ImgQuize.checkResult(); // Avoid color conflict
};

ImgQuize.checkResult = function() {
	var a = ImgQuize.g_images[ImgQuize.g_currentIndex].answer;
	var ua = document.getElementById("pack").getAttribute("data-from-index");
	var packImg = document.querySelector("#pack > img");
	var packes = document.getElementById("holder").children;
	if (a == ua) {
		packImg.setAttribute("src","images/pq-d-2.png");
		for (var i = 0; i < a.length; i++) {
			MIGlobals.addClass(packes[i], "yes");
		}
		setTimeout(function() {
			for (var j = 0; j < a.length; j++) {
				MIGlobals.removeClass(packes[j], "yes");		
			}
			setTimeout(ImgQuize.deal,200);
		}, 200);		
	} else {
		packImg.setAttribute("src","images/pq-d-1.png");
		for (var i = 0; i < a.length; i++) {
			MIGlobals.addClass(packes[i], "no");
		}
		setTimeout(function() {
			for (var j = 0; j < a.length; j++) {
				MIGlobals.removeClass(packes[j], "no");		
			}
			setTimeout(ImgQuize.deal,200);
		}, 200);	
	}
	ImgQuize.g_filledAnswer.push(ua); // 记录笔者选择的答案
};

ImgQuize.deleteColorStyle = function(o){
	for(var i = 0, n; n = o[i]; i++){
		MIGlobals.removeClass(n, 'time-text-wrong');
		MIGlobals.removeClass(n, 'time-text');
	}
};

// 显示答题结果
ImgQuize.showResultPage = function(){
	var objs = ImgQuize.g_images,
		address = ImgQuize.resultPage.querySelectorAll('.show-time div.fill-address'),
		rightCount = 0,
		fillAddressIndex = 0,
		amap = ImgQuize.g_IndexMapImg;
	// 删除颜色样式
	ImgQuize.deleteColorStyle(address);
	for(var i = 0, o; o = objs[i]; i++){
		if(o.answer === ImgQuize.g_filledAnswer[i]){ // 答对
			rightCount++;
			address[fillAddressIndex++].style.opacity = 0; // 隐藏
			address[fillAddressIndex].textContent = amap[o.answer]; // 正确答案
			MIGlobals.addClass(address[fillAddressIndex++], 'time-text');
		}else{
			// 正确答案
			address[fillAddressIndex].style.opacity = 1; // 显示
			address[fillAddressIndex].textContent = amap[o.answer]; 
			MIGlobals.addClass(address[fillAddressIndex++], 'time-text')
			// 错误答案
			address[fillAddressIndex].textContent = amap[ImgQuize.g_filledAnswer[i]];
			MIGlobals.addClass(address[fillAddressIndex++], 'time-text-wrong');
		}
	}
	if(rightCount === ImgQuize.g_images.length){
		ImgQuize.great.textContent = "恭喜你，你真棒，全部答对了！";
	}else if(rightCount/ImgQuize.g_images.length > 0.6){
		ImgQuize.great.textContent = "恭喜你，你答对了" + rightCount + "道，再接再厉！";
	}else{
		ImgQuize.great.textContent = "很遗憾，你答对了" + rightCount + "道，需要在努力哦！";
	}
	ImgQuize.resultPage.style.display = "block"; // 显示答题结果界面
};

ImgQuize.deal = function() {
	log('topicIndex=' + ImgQuize.g_currentIndex);
	if (ImgQuize.g_currentIndex == ImgQuize.g_images.length - 1) { // 最后一题
		// 显示答题结果
		ImgQuize.fn_queue.push(ImgQuize._deal);
		ImgQuize.showResultPage();
		ImgQuize.g_filledAnswer = [];
	} else {
		ImgQuize._deal();
	}
};

ImgQuize._deal = function() {
	if (ImgQuize.g_currentIndex == ImgQuize.g_images.length - 1) {
		ImgQuize.g_currentIndex = 0;
	} else {
		ImgQuize.g_currentIndex += 1;
	}
	var i;
	var poses = document.getElementById("foot").children;
	for(var j = 0; j < poses.length; j++){
		poses[j].style.color = "#000"; // 黑色
	}
	document.getElementById("index-span").textContent = ImgQuize.g_currentIndex + 1;
	document.getElementById("timg").src = "images/" + ImgQuize.g_images[ImgQuize.g_currentIndex].url + ".jpg";
	document.getElementById("packImg").src = "images/pq-d-3.png";
	ImgQuize.doingStep = 0;
	log('end, ');
};