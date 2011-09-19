# maximus.js

In most modern browsers, you can use position: fixed to create layouts that take up the entire
browser window, automatically adjusting when the window size is changed. Unfortunately, Internet
Explorer 6 does not support position: fixed at all, so we need to look for alternatives.

There are CSS-only solutions that allow you to use an absolute positioning hack to get simple
fixed positioning working in IE6, but unfortunately these do not work for complex layouts.

maximus.js should be included in an IE6-only conditional comment, so that it only runs for users
using IE6. When included, it will automatically probe the document for elements that have fixed
position, and will change them to use absolute positioning. It will then automatically calculate
the relevant widths and heights to determine the exact sizes that should be used to make the
elements fill the entire browser window. It will also resize elements dynamically when the
browser window is resized.

See the demos directory for sample layouts that you can use maximus.js to build.

Full readme coming soon.