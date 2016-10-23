var MIFill = {
	currentIndex: 0,
	start: -1,
	
	init: function() {
		var selectBoxes = document.querySelectorAll('.select-banner');
		for(var i=0,n=selectBoxes.length; i<n; i++){
			var slots = selectBoxes[i].querySelectorAll('.select-box>div');
			for(var j=0,m=slots.length; j<m; j++){
				MIGlobals.addClass(slots[j], 'drag-box');
				slots[j].setAttribute('data-index', j);
				slots[j].setAttribute('data-banner-index', i);
			}
			var slots1 = selectBoxes[i].querySelectorAll('.slot');
			for(var k=0; k<slots1.length; k++){
				slots1[k].setAttribute('data-index', k);
				slots1[k].setAttribute('data-banner-index', i);
			}
		}

		var slots = document.querySelectorAll('.slot');
		if(MIFill.start == -1){
			for(var i=0,n=slots.length; i<n; i++){
				slots[i].setAttribute('data-content',slots[i].innerHTML);
				slots[i].innerHTML = '';
			}
		}
		for(var i=0,n=slots.length; i<n; i++){
				slots[i].innerHTML = '';
			}
		
		var startSlot = document.querySelector('.select-banner').querySelector('.slot');
		MIGlobals.addClass(startSlot, 'slot-current');
		var boxes = document.querySelectorAll('.box');
		for(var i=0, n=boxes.length; i<n; i++){
			var ques = boxes[i].querySelectorAll('.select-banner');
			for(var j=0, m = ques.length; j<m; j++){
				ques[j].setAttribute('data-current-index', 0);
				ques[j].setAttribute('data-slot-count', ques[j].querySelectorAll('.slot').length);
				MIGlobals.addClass(ques[j].querySelector('.slot'), 'slot-current');
			}
		}
		
		if (MIGlobals.isTouchSupported) {
			document.addEventListener('touchend', MIFill.mouseUp, true);
		} else{
			document.addEventListener('mouseup', MIFill.mouseUp, true);
		}

	},
	
	mouseUp: function(e){
		if(!MIGlobals.hasClass(e.target, 'drag-box') && !MIGlobals.hasClass(e.target, 'slot') && !MIGlobals.hasClass(e.target,'save')) return;
		log('mouseUp');
		if(MIGlobals.hasClass(e.target, 'drag-box')){
			
			var crtBanner = document.querySelectorAll('.select-banner')[+e.target.getAttribute('data-banner-index')];
			
			if(crtBanner.getAttribute('data-slot-click')) return;

			var crtSlotIndex = crtBanner.getAttribute('data-current-index');

			if(e.target.getAttribute('data-occupy') == 'true' || crtBanner.getAttribute('data-save')) return;
			//如果已经被占用，则需要把上次的drag-box设置成未被点击，同时把当前点击dedrag-box放到对应的slot
			
			//当前的slot 以及上次的 drag-box
			var crtSlot = crtBanner.querySelectorAll('.slot')[+crtSlotIndex];
			if(crtSlot.getAttribute('data-select-index')){
				var ldragBoxIndex = crtSlot.getAttribute('data-select-index');
				var lastDbox = crtBanner.querySelectorAll('.drag-box')[+ldragBoxIndex];
				MIGlobals.removeClass(lastDbox, 'bgGray');
				lastDbox.removeAttribute('data-occupy');
				crtSlot.removeAttribute('data-select-index');
			}
			

			var slotBoxes = crtBanner.querySelectorAll('.slot');
			var crtSlot = slotBoxes[+crtSlotIndex];
			var lastSlotIndex = +crtSlotIndex;
			
			
			while(crtSlotIndex < parseInt(crtBanner.getAttribute('data-slot-count'))){
				if(slotBoxes[crtSlotIndex].getAttribute('data-select-index')){
					crtSlotIndex = parseInt(crtSlotIndex) + 1;
				} else{
					break;
				}
			}
			if(crtSlotIndex == parseInt(crtBanner.getAttribute('data-slot-count'))){
				crtBanner.setAttribute('data-slot-click', 'true');
				return;
			}
			
			crtSlot = slotBoxes[+crtSlotIndex];

			crtSlot.setAttribute('data-select-index', e.target.getAttribute('data-index'));
			crtSlot.innerHTML = e.target.innerHTML;
			e.target.setAttribute('data-occupy', 'true');

			MIGlobals.addClass(e.target, 'bgGray');
			crtSlotIndex = parseInt(crtSlotIndex) + 1;

			log('set bgGray');
			while(crtSlotIndex < parseInt(crtBanner.getAttribute('data-slot-count'))){
				if(slotBoxes[crtSlotIndex].getAttribute('data-select-index')){
					crtSlotIndex = parseInt(crtSlotIndex) + 1;
				} else{
					break;
				}
			}
			
		 	if(crtSlotIndex == parseInt(crtBanner.getAttribute('data-slot-count'))){
		 		crtBanner.setAttribute('data-current-index', parseInt(crtSlotIndex)-1);
		 		crtBanner.setAttribute('data-slot-click', 'true');
		 		return;
		 	} else{
		 		crtBanner.setAttribute('data-current-index', crtSlotIndex);
				MIGlobals.removeClass(crtSlot, 'slot-current');
				MIGlobals.addClass(crtBanner.querySelectorAll('.slot')[+crtSlotIndex], 'slot-current');
		 	}	
			 
		} else if(MIGlobals.hasClass(e.target, 'slot')){
			log('slot');

			var crtBanner = document.querySelectorAll('.select-banner')[+e.target.getAttribute('data-banner-index')];
			
			
			if(crtBanner.getAttribute('data-save')) return;
			crtBanner.removeAttribute('data-slot-click');
			var crtSlots = crtBanner.querySelectorAll('.slot');
			for(var i=0, n=crtSlots.length; i<n; i++){
				MIGlobals.removeClass(crtSlots[i], 'slot-current');
			}
			
			// //设置当前banner的当前slot的index,同时给当前的slot加上slot-current
			crtBanner.setAttribute('data-current-index', e.target.getAttribute('data-index'));
			MIGlobals.addClass(e.target, 'slot-current');

		} else if(MIGlobals.hasClass(e.target, 'save')){
			log('save');
			if(!e.target.getAttribute('data-step')){
				e.target.setAttribute('data-step', '1');
				e.target.innerHTML = '重新测试';
				MIFill.judge(e.target.parentNode);
				MIFill.start = 1;

			} else{
				e.target.removeAttribute('data-step');
				e.target.innerHTML = '提交答案';
				MIGlobals.removeClass(e.target, 'btndown');
				MIFill.restart(e.target.parentNode);
				MIFill.start = 1;
			}
			
		}
	},
	ifAllFillIn: function(crtBanner){

		var dragBoxes = crtBanner.querySelectorAll('.drag-box');
		var ansBtn = crtBanner.querySelector('.btn-phone');
		var isFinished = true;
		for(var i=0, n=dragBoxes.length; i<n; i++){
			if(!MIGlobals.hasClass(dragBoxes[i], 'bgGray')){
				log('not isFinished');
				isFinished = false;
				break;
			}
		}
		
		if(isFinished){
			MIGlobals.addClass(ansBtn, 'btndown');
			return true;
		} else{
			MIGlobals.removeClass(ansBtn, 'btndown');
			return false;
		}
	},
	restart: function(crtBanner){
		log('restart');
		var dragBoxes = crtBanner.querySelectorAll('.drag-box');
		for(var i=0, n=dragBoxes.length; i<n; i++){
			var dragBox = dragBoxes[i];
			MIGlobals.removeClass(dragBox, 'bgGray');
			dragBox.removeAttribute('data-occupy');
		}
		var slots = crtBanner.querySelectorAll('.slot');
		for(var i=0, n=slots.length; i<n; i++){
			var slot = slots[i];
			MIGlobals.removeClass(slot, 'right');
			MIGlobals.removeClass(slot,'wrong');
			MIGlobals.removeClass(slot,'slot-wrong1');
			slot.removeAttribute('data-select-index');
			slot.removeAttribute('data-judge');
		}
		var rightAnses = crtBanner.querySelectorAll('.right-answer');
		for(var i=0, n=rightAnses.length; i<n; i++){
			rightAnses[i].style.display = 'none';
		}
		crtBanner.removeAttribute('data-slot-click');
		crtBanner.removeAttribute('data-save');
		crtBanner.removeAttribute('data-save-count');
		MIFill.init();
	},

	judge: function(elems){
		
		elems.setAttribute('data-save','true');
		if(elems.getAttribute('data-save-count')) return;
		log('judge');
		elems.setAttribute('data-save-count', '1');
		var slots = elems.querySelectorAll('.slot');

		for(var i=0, n=slots.length; i<n; i++){
			MIGlobals.removeClass(slots[i],'slot-current');
		}
		
		for(var i=0, n=slots.length; i<n; i++){
			// MIGlobals.removeClass(slots[i],'slot-current');

			var pnode = slots[i].parentNode.parentNode;
			if(MIGlobals.hasClass(pnode, 'order')){
				var ans = slots[i].getAttribute('data-answer').split('|');
		 	
		 	
				for(var j=0;j<ans.length;j++){
					if(slots[i].getAttribute('data-select-index') == ans[j]){
						slots[i].setAttribute('data-judge', 'true');
						MIGlobals.addClass(slots[i], 'right'); 
						break;
					}
				}
				if(slots[i].getAttribute('data-judge') != 'true'){
					MIGlobals.addClass(slots[i], 'wrong'); 
					MIGlobals.addClass(slots[i], 'slot-wrong1');
					var index = slots[i].getAttribute('data-select-index');
					if(index){
						MIGlobals.removeClass(slots[i].parentNode.parentNode.parentNode.querySelectorAll('.drag-box')[index], 'bgGray');
						// slots[i].parentNode.parentNode.parentNode.querySelectorAll('.drag-box')[index].style.backgroundColor = '#d87d06';
					}
					var rightAns = document.createElement('div');
					rightAns.innerHTML = '(' +  slots[i].getAttribute('data-content') + ')';
					MIGlobals.addClass(rightAns, 'right-answer');
					slots[i].parentNode.appendChild(rightAns);
				}
			} else if(MIGlobals.hasClass(pnode, 'disorder')){
				//正确答案所有选项存储到subAns里
				var ans = pnode.getAttribute('data-answer').split('|');
				var subAns = [];
				for(var j=0; j<ans.length; j++){
					subAns[j] = ans[j].split(',');
				}

				var crtDisSlots = pnode.querySelectorAll('.slot');
				var slotsLength = crtDisSlots.length;
				
				//判断答案是否已被选择过
				var selected = [];
				for(var k=0; k<ans.length; k++){
					selected[k] = false;
				}
				for(var j=0; j<slotsLength; j++){
					var crtSIndex = crtDisSlots[j].getAttribute('data-select-index');

					if(!crtSIndex){
						
						MIGlobals.addClass(crtDisSlots[j], 'wrong');
					} else{
						var find = false;
						for(var k=0; k<ans.length; k++){
							if(!selected[k]){
								for(var l=0; l<subAns[k].length; l++){
									if(subAns[k][l] == crtSIndex){

										MIGlobals.addClass(crtDisSlots[j], 'right');

										selected[k] = true;
										find = true;
										break;
									}
								}
								if(find) break;
							}
							
						}
					}
					
				}

				i += slotsLength - 1;

				for(var j=0; j<slotsLength; j++){
					var crtSlot = crtDisSlots[j];
					if(MIGlobals.hasClass(crtSlot, 'right')){
						continue;
					} else{
						MIGlobals.addClass(crtSlot, 'wrong');
						var crtDbox = document.querySelectorAll('.drag-box')[+crtSlot.getAttribute('data-select-index')];
						MIGlobals.removeClass(crtDbox, 'bgGray');
						var find = false;
						for(var l=0; l<slotsLength; l++){
							if(!selected[l]){
								selected[l] = true;
								find = true;
								break;
							}
						}
						if(find){
							var con = document.querySelectorAll('.drag-box')[subAns[l][0]].innerHTML;
							var rightAns = document.createElement('div');
							rightAns.innerHTML = '(' +  con + ')';
							MIGlobals.addClass(rightAns, 'right-answer');
							crtSlot.parentNode.appendChild(rightAns);
						}
						
					}
					
				}
			}

			
		}


	}
};

