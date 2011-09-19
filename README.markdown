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

## Usage instructions

To use maximus.js, download the script and add the following markup to your HTML page:

    <!--[if IE 6]><script src="../maximus.js"></script><![endif]-->

You don't need to explicitly execute maximus.js, it will automatically run when the window
has finished loading.

In order for maximus.js to work correctly, you need to define a layout that takes up the entire
browser window using CSS fixed positioning. At a minimum, you need at least a "center" element,
which does not have a defined width/height. The center element's dimensions will always be
dynamic. For example, to make the center element take up all of the available screen space, you
might use the following code:

HTML markup:

    <div id="center">Center</div>

CSS styles:

    #center { background: lime; position: fixed; top: 0; bottom: 0; left: 0; right: 0; }

In browsers that support fixed positioning, this will result in the center div taking up the
entire browser window. In IE6, however, because fixed positioning is not supported, it will
use the default static positioning, and the center div will not take up the entire window.

maximus.js will automatically find any elements with fixed positioning and tell IE6 to use
absolute positioning instead. The problem with absolute positioning, is that if a width or
height is not specified, it will not flex to the available space like a fixed positioned
element would. As a result, we need to specify a width or height explicitly in order for
it to work properly. Because browser window sizes are dynamic and can change at any time, we
cannot specify a "one-size-fits-all" CSS width and height. We can use JavaScript to calculate
the browser window dimensions, however, and use the element's position and dimension CSS
properties to determine what its width and/or height should be at any given time.

In the example where we only have a center div, no widths and heights are specified at all.
In browsers other than IE6, the top, bottom, left and right properties will cause the div
to extend to each of these edges as it is using fixed positioning. In IE6, when we use absolute
positioning, it will place it at the top left of the window, but it won't stretch to the right
and bottom. That's where maximus.js comes into play.

If your browser window is 640px wide and 480px high, maximus.js will calculate the height of
the center div as follows:

width = (browser width - left - right) = (640 - 0 - 0) = 640  
height = (browser height - top - bottom) = (480 - 0 - 0) = 480

Simple enough, right? But what if we want to introduce a header at the top of the screen that takes
up, let's say 48 pixels in height. The syntax is as follows:

HTML markup:

    <div id="top">Top</div>
    <div id="center">Center</div>

CSS styles:

    #top { background: yellow; position: fixed; top: 0; left: 0; right: 0; height: 48px; }
    #center { background: lime; position: fixed; top: 48px; bottom: 0; left: 0; right: 0; }

In this case, both the top and center elements will be changed to use absolute positioning in IE6.

For the top element, the dimensions are calculated as follows (assuming we still have a 640x480 window):

width = (browser width - left - right) = (640 - 0 - 0) = 640  
height = 48 (specifically specified in CSS)

For the center element, the following calculations are used:

width = (browser width - left - right) = (640 - 0 - 0) = 640  
height = (browser height - top - bottom) = (480 - 48 - 0) = 432

You'll notice that in this case the top element's height is not calculated automatically as it
is explicitly specified in CSS and there is no "bottom" property declared. If an element does not
have a top and bottom style specified, its height will be calculated in JavaScript. If an element
does not have a left and right style specified, its width will be calculated in JavaScript.

Let's go to a more complex example, where we have a top header and bottom footer, and a left and right
sidebar as well as the mandatory center element.

HTML markup:

        <div id="top">Top</div>
        <div id="left">Left</div>
        <div id="center">Center</div>
        <div id="right">Right</div>
        <div id="bottom">Bottom</div>

CSS styles:

      #top { background: yellow; position: fixed; top: 0; left: 0; right: 0; height: 72px; }
      #left { background: pink; position: fixed; top: 72px; bottom: 32px; left: 0; width: 200px; }
      #center { background: lime; position: fixed; top: 72px; bottom: 32px; left: 200px; right: 200px; }
      #right { background: cyan; position: fixed; top: 72px; bottom: 32px; right: 0; width: 200px; }
      #bottom { background: orange; position: fixed; bottom: 0; left: 0; right: 0; height: 32px; }

In this case, the top and bottom will both have a calculated width of 640 as well as their explicitly
specified heights of 72px and 32px, respectively. The left element has a explicitly defined width and
its height is calculated as follows:

height = (browser height - top - bottom) = (480 - 72 - 32) = 376

This height will be the same for the center and right divs as they have the same top and bottom values
as the left div. The center will also have a dynamically calculated width, as follows:

width = (browser width - left - right) = (640 - 200 - 200) = 240

If you have any feedback, comments or questions, contact @joelennon on Twitter. More detailed documentation
and additional usage examples coming soon.
