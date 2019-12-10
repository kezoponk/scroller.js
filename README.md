# Scroller.js

##### Create pausable scrolling text with a simple function call

Scroller(<br>
Direction: <br>
Options: "left", "right" <br>
<br>
better performance:
true, false <br>
<br>
Speed:
Higher = slower <br>
<br>
div-containing-buttons-id, <br>
buttons-to-scroll-name, <br>
scrollID <br>

 <br>



## Examples:

##### Scroll to left, performance better but not as smooth animation, moving 1px every 10ms

```html
<div class="scroll-left" onmouseover="StopS(2)" onmouseout="StartS(2)" id="scrolldiv">
    <button name="scrollbtn" class="scroll-graybtn">Example</button>
    <button name="scrollbtn" class="scroll-graybtn">Political</button>
    <button name="scrollbtn" class="scroll-graybtn">App</button>
    <button name="scrollbtn" class="scroll-graybtn">Irak</button>
    <button name="scrollbtn" class="scroll-graybtn">Feminist</button>
    <button name="scrollbtn" class="scroll-graybtn">Program</button>
    <button name="scrollbtn" class="scroll-graybtn">School</button>
</div>
```
```javascript
Scroller("left", true, 10, scrolldiv, scrollbtn, 2);
```

<br>

##### Scroll to right, multiple scrolls is to demanding, moving 1px every 100ms

```html
<div class="scroll-left" onmouseover="StopS(2)" onmouseout="StartS(2)" id="scrolldivexample">
    <button name="scrollbtnexample" class="scroll-graybtn">Example</button>
    <button name="scrollbtnexample" class="scroll-graybtn">Political</button>
    <button name="scrollbtnexample" class="scroll-graybtn">App</button>
    <button name="scrollbtnexample" class="scroll-graybtn">Irak</button>
    <button name="scrollbtnexample" class="scroll-graybtn">Feminist</button>
    <button name="scrollbtnexample" class="scroll-graybtn">Program</button>
    <button name="scrollbtnexample" class="scroll-graybtn">School</button>
</div>
```
```javascript
Scroller("right", false, 100, scrolldivexample, scrollbtnexample, 2);
```
