//Anonymous function used so we don't unnecessarily pollute the global
//namespace. Maximus.js is self-contained - you don't need to call anything
//manually. As a result it should create no global variables.
(function() {
	//John Resig's addEvent function - http://ejohn.org/apps/jselect/event.html
	//Non-IE6 code removed. removeEvent is not needed so it has also been removed.
	var addEvent = function(obj, type, fn) {		
		obj['e'+type+fn] = fn; 
		obj[type+fn] = function(){obj['e'+type+fn](window.event);}
		obj.attachEvent('on'+type, obj[type+fn]);
	};
	//This is where the magic happens
	var max = function() {
		var d = document, 
			de = d.documentElement, 
			db = d.body;
			
		//Overflows on the document body wreck the 100% layout approach
		if(de) { de.style.overflow = "hidden"; }
		if(db) { db.style.overflow = "hidden"; }
	
		//Get the dimensions of the window
		var dims = {
			width: de.clientWidth || db.clientWidth || 0,
			height: de.clientHeight || db.clientHeight || 0
		}
		
		var fixed = [], 
			els = (d.all) ? d.all : d.getElementsByTagName("*");
		
		//Loop through the DOM looking for position:fixed. We add a class
		//maximus-fixed to each item found (for when the window is resized).
		//We then also search for any items that already have the class
		//maximus-fixed (these will have already been set to position: absolute)
		//and so will not be found when the window is resized.
		for(var i=0, len=els.length; i<len; i++) {
			if(els[i].currentStyle["position"].toUpperCase() === "FIXED") {
				els[i].className += " maximus-fixed"; 
				fixed.push(els[i]);
			}
			else if(els[i].className.match(/\bmaximus-fixed\b/)) { 
				fixed.push(els[i]); 
			}
		}
	
		var t, b, l, r;
		//Loop through all fixed elements
		for(var i=0, len=fixed.length;i<len;i++) {
			//Set position to absolute (fixed doesn't work in IE6)
			fixed[i].style.position = "absolute";
			//Get the top, bottom, left and right properties for each element
			t = parseInt(fixed[i].currentStyle["top"], 10);
			b = parseInt(fixed[i].currentStyle["bottom"], 10);
			l = parseInt(fixed[i].currentStyle["left"], 10);
			r = parseInt(fixed[i].currentStyle["right"], 10);
			//Check if the top and bottom values are numbers (are they set)
			if(!isNaN(t) && !isNaN(b)) {
				//If both top and bottom are specified, the element's height
				//should be calculated dynamically
				fixed[i].style.height = (dims.height - t - b) + "px";
			}
			//Check if the left and right values are numbers (are they set)
			if(!isNaN(l) && !isNaN(r)) {
				//If both left and right are specified, the element's width
				//should be calculated dynamically
				fixed[i].style.width = (dims.width - l - r) + "px";
			}
		}
	};
	
	//The max function will be executed when the window loads and when it is resized.
	addEvent(window, "load", max);
	addEvent(window, "resize", max);
})();