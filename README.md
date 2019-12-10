# Scroller.js

###### Create pausable scrolling text with a simple function call

Scroller( <br>
direction,              Options: "left", "right" <br>
better performance,               true, false <br>
speed,                            Higher = slower <br>
div-containing-buttons-id, <br>
buttons-to-scroll-name, <br>
scrollID <br>
) <br>


## Examples:


#### Scroll to left, performance better but not as smooth animation, moving 1px every 10ms

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
Scroller("left", true, 10, scrollbtndiv, scrollbtn, 2);
```
