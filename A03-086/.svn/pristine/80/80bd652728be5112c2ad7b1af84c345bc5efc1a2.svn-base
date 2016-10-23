var MISpeech = {
	init: function(speeches) {
		var ses = speeches ? speeches : document.querySelectorAll(".speech");
		if (ses) {
			for (var i = 0; i < ses.length; i++) {
				var s = ses[i];
				MIGlobals.makeTouchableButton(s);
				s.addEventListener(MIGlobals.eventTouchEnd, function(evt) {
					if(this.getAttribute("data-content")){
						var textCon = this.getAttribute("data-content");
					}else{
						var textCon = this.textContent;
					}
					console.log(textCon);
					var url = URLBuilder.buildURLString("/speech", {
						text: textCon
					});
					log("Ready to speech " + textCon + " at url: " + url);
					if (MIGlobals.isRunningInMosoBooks) {
						window.location.href = url;
					}
				},false);
			}
		}
	}
};