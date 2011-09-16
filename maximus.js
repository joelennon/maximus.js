var Maximus = {
	fixedClassName: "mxjs-fixed",
	/* Helper functions */
	getWindowSize: function() {
		var size = {}, w = window, d = document;
		size.width = w.innerWidth || d.documentElement.clientWidth || d.body.clientWidth || 0;
		size.height = w.innerHeight || d.documentElement.clientHeight || d.body.clientHeight || 0;
		return size;
	},
	addEvent: function(obj, type, fn) {
		if (obj.attachEvent) {
	    	obj['e'+type+fn] = fn;
	    	obj[type+fn] = function(){obj['e'+type+fn](window.event);}
	    	obj.attachEvent('on'+type, obj[type+fn]);
		} else obj.addEventListener(type, fn, false);
	},
	removeEvent: function(obj, type, fn) {
		if (obj.detachEvent) {
			obj.detachEvent('on'+type, obj[type+fn]);
			obj[type+fn] = null;
		} else obj.removeEventListener(type, fn, false);
	},
	getStyle: function(el,styleProp) {
		if (el.currentStyle) return el.currentStyle[styleProp];
		else if (window.getComputedStyle) return document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	},
	getElementsByClassName: function(className, tag, elm) {
		if (document.getElementsByClassName) {
	        getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
					nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
					returnElements = [],
					current;
                for(var i=0, il=elements.length; i<il; i+=1){
					current = elements[i];
					if(!nodeName || nodeName.test(current.nodeName)) {
						returnElements.push(current);
					}
                }
                return returnElements;
	        };
		}
		else if (document.evaluate) {
			getElementsByClassName = function (className, tag, elm) {
		        tag = tag || "*";
		        elm = elm || document;
		        var classes = className.split(" "),
	                classesToCheck = "",
	                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
	                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
	                returnElements = [],
	                elements,
	                node;
		        for(var j=0, jl=classes.length; j<jl; j+=1) {
		        	classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
		        }
		        try {
		        	elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
		        }
		        catch(e) {
		        	elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
		        }
		        while((node = elements.iterateNext())) {
		        	returnElements.push(node);
		        }
		        return returnElements;
			};
		}
		else {
	        getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
					classesToCheck = [],
					elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
					current,
					returnElements = [],
					match;
                for(var k=0, kl=classes.length; k<kl; k+=1){
	                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for(var l=0, ll=elements.length; l<ll; l+=1){
					current = elements[l];
					match = false;
					for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
				        match = classesToCheck[m].test(current.className);
				        if (!match) {
				        	break;
				        }
					}
					if (match) {
						returnElements.push(current);
					}
                }
                return returnElements;
	        };
		}
		return getElementsByClassName(className, tag, elm);
	},
	build: function() {
		if(document.documentElement) document.documentElement.style.overflow = "hidden";
		else if(document.body) document.body.style = "hidden";
		
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

Maximus.addEvent(window, "load", Maximus.build);
Maximus.addEvent(window, "resize", Maximus.build);