
function makeChange(ele) {
	var oP = ele.parentNode.parentNode;
	var orignImgSrc = oP.getAttribute("data-src");
	var orignTitle = oP.getAttribute("data-title");
	var orignText = oP.getAttribute("data-text");
	var orignImg = oP.querySelector(".change-img");
	orignImg.addEventListener(MIGlobals.eventTouchEnd, function(e) {
		this.src = orignImgSrc;
		var orignTitleEle = oP.querySelector(".tab-c > h5");
		var orignTextEle = oP.querySelector(".tab-c > p");
		orignTitleEle.innerText = orignTitle;
		orignTextEle.innerText = orignText;
		var oImg = oP.querySelectorAll(".tab-icon-img");
		for (var i = oImg.length; i--;) {
			if (oImg[i].getAttribute("data-click") == "y") {
				oImg[i].className = "tab-icon-img gray";
				oImg[i].style.borderColor = "#ccc";
				oImg[i].style.opacity = "0.5";
			}
		}
	});


	ele.addEventListener(MIGlobals.eventTouchEnd,function(e) {
		var oImg = oP.querySelectorAll(".tab-icon-img");
		for (var i = oImg.length; i--;) {
			if (oImg[i].getAttribute("data-click") == "y") {
				oImg[i].className = "tab-icon-img gray";
				oImg[i].style.borderColor = "#ccc";
				oImg[i].style.opacity = "0.5";
			}
			change(ele);
		}
	});

};

function change(ele) {
	var currentEle = ele;
	var currentImg = currentEle.querySelector(".icon-img");
	currentEle.setAttribute("data-click", "y");
	currentEle.className = "tab-icon-img";
	currentEle.style.opacity = "1";
	currentImg.style.borderColor = "black";
	var oS = currentImg.getAttribute("src");
	var oTitle = currentEle.getAttribute("data-title");
	var oText = currentEle.getAttribute("data-text");
	var oP = currentEle.parentNode.parentNode;
	var oChangeImg = oP.querySelector(".change-img");
	var oChangeTitle = oP.querySelector(".tab-c > h5");
	var oChangeText = oP.querySelector(".tab-c > p");
	oChangeImg.src = oS;
	oChangeTitle.innerHTML = oTitle;
	oChangeText.innerHTML = oText;
}