var Maximus = {
	getWinSize: function() {
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth || 0,
			height: document.documentElement.clientHeight || document.body.clientHeight || 0
		}
	},
	getStyle: function(el,styleProp) { return el.currentStyle[styleProp]; },
	getFixed: function() {
		var d = document, returnEls = [], els = (d.all) ? d.all : d.getElementsByTagName("*");
		for(var i=0, len=els.length; i<len; i++) {
			if(Maximus.getStyle(els[i], "position").toUpperCase() === "FIXED") returnEls.push(els[i]);
		}
		return returnEls;
	},
	addEvent: function(obj, type, fn) {		
		obj['e'+type+fn] = fn; obj[type+fn] = function(){obj['e'+type+fn](window.event);}
		obj.attachEvent('on'+type, obj[type+fn]);
	},
	removeEvent: function(obj, type, fn) { obj.detachEvent('on'+type, obj[type+fn]); obj[type+fn] = null; },
	init: function() {
		var d = document, de = d.documentElement, db = d.body;
		if(de) de.style.overflow = "hidden"; if(db) db.style.overflow = "hidden";
		
		var fixed = Maximus.getFixed(); var t, b, l, r, dims = Maximus.getWinSize();
		for(var i=0, len=fixed.length;i<len;i++) {
			fixed[i].style.position = "absolute";
			t = parseInt(Maximus.getStyle(fixed[i], "top"), 10);
			b = parseInt(Maximus.getStyle(fixed[i], "bottom"), 10);
			l = parseInt(Maximus.getStyle(fixed[i], "left"), 10);
			r = parseInt(Maximus.getStyle(fixed[i], "right"), 10);
			if(!isNaN(t) && !isNaN(b)) fixed[i].style.height = (dims.height - t - b) + "px";
			if(!isNaN(l) && !isNaN(r)) fixed[i].style.width = (dims.width - l - r) + "px";
		}
	}
}

Maximus.addEvent(window, "load", Maximus.init); Maximus.addEvent(window, "resize", Maximus.init);