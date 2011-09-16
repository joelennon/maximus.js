var Maximus = {
	getWindowSize: function() {
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth || 0,
			height: document.documentElement.clientHeight || document.body.clientHeight || 0
		}
	},
	addEvent: function(obj, type, fn) {		
		obj['e'+type+fn] = fn;
		obj[type+fn] = function(){obj['e'+type+fn](window.event);}
		obj.attachEvent('on'+type, obj[type+fn]);
	},
	removeEvent: function(obj, type, fn) {
		obj.detachEvent('on'+type, obj[type+fn]); obj[type+fn] = null;
	},
	getStyle: function(el,styleProp) {
		return el.currentStyle[styleProp];
	},
	getFixedElements: function() {
		var returnEls = [], els = (document.all) ? document.all : document.getElementsByTagName("*");
		for(var i=0, len=els.length; i<len; i++) {
			if(Maximus.getStyle(els[i], "position").toUpperCase() === "FIXED") returnEls.push(els[i]);
		}
		return returnEls;
	},
	init: function() {
		if(document.documentElement) document.documentElement.style.overflow = "hidden";
		if(document.body) document.body.style.overflow = "hidden";
		
		var fixedEls = Maximus.getFixedElements();
		var t, b, l, r, dims = Maximus.getWindowSize();
		for(var i=0, len=fixedEls.length;i<len;i++) {
			fixedEls[i].style.position = "absolute";
			t = parseInt(Maximus.getStyle(fixedEls[i], "top"), 10);
			b = parseInt(Maximus.getStyle(fixedEls[i], "bottom"), 10);
			l = parseInt(Maximus.getStyle(fixedEls[i], "left"), 10);
			r = parseInt(Maximus.getStyle(fixedEls[i], "right"), 10);
			if(t > 0 || b > 0) fixedEls[i].style.height = (dims.height - t - b) + "px";
			if(!isNaN(l) && !isNaN(r)) fixedEls[i].style.width = (dims.width - l - r) + "px";
		}
	}
}

Maximus.addEvent(window, "load", Maximus.init);
Maximus.addEvent(window, "resize", Maximus.init);