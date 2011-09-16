var Maximus = {
	fixedClassName: "mxjs-fixed",
	/* Helper functions */
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
	getElementsByClassName: function(className, tag, elm) {
		tag = tag || "*"; elm = elm || document;
		var classes = className.split(" "), classesToCheck = [], current, returnElements = [], match,
			elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		for(var k=0, kl=classes.length; k<kl; k+=1) classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
		for(var l=0, ll=elements.length; l<ll; l+=1){
			current = elements[l]; match = false;
			for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
				match = classesToCheck[m].test(current.className); if (!match) break;
			}
			if(match) returnElements.push(current);
		}
		return returnElements;
	},
	init: function() {
		if(document.documentElement) document.documentElement.style.overflow = "hidden";
		if(document.body) document.body.style.overflow = "hidden";
		
		var fixedEls = Maximus.getElementsByClassName(Maximus.fixedClassName);
		var i = 0, len = fixedEls.length, dims = Maximus.getWindowSize();
		for(;i<len;i++) {
			fixedEls[i].style.position = "absolute";
			var t = parseInt(Maximus.getStyle(fixedEls[i], "top"), 10),
				b = parseInt(Maximus.getStyle(fixedEls[i], "bottom"), 10),
				l = parseInt(Maximus.getStyle(fixedEls[i], "left"), 10),
				r = parseInt(Maximus.getStyle(fixedEls[i], "right"), 10);
			if(t > 0 || b > 0) fixedEls[i].style.height = (dims.height - t - b) + "px";
			if(!isNaN(l) && !isNaN(r)) fixedEls[i].style.width = (dims.width - l - r) + "px";
		}
	}
}

Maximus.addEvent(window, "load", Maximus.init);
Maximus.addEvent(window, "resize", Maximus.init);