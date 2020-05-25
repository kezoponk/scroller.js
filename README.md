# Scroller.js

Create pausable scrolling text with a simple one-liner

**Arguments**
>Scroller(<br>
>Direction: <br>
>Options: "left", "right" <br>,
><br>
>Better performance:<br>
>true, false <br>,
><br>
>Speed:<br>
>Higher = slower <br>,
><br>
>div-containing-buttons-id, <br>
>buttons-to-scroll-name, <br>
>scrollID) <br>

#### Important CSS 

```css
div-containing-buttons {
  overflow: hidden;
  position: /* relative or absolute */;
}
  
buttons-to-scroll {
  position: absolute;
}
```

## Examples:

##### Scroll to left. Performance better, less smooth animation. Moving 1px every 10ms

```html
<div class="scroll-left" onmouseover="StopS(2)" onmouseout="StartS(2)" id="scrolldiv">
    <button name="scrollbtn" class="scrollbutton" onclick="window.location=example.html">Example</button>
    <button name="scrollbtn" class="scrollbutton" onclick="window.location=political.html">Political</button>
    <button name="scrollbtn" class="scrollbutton" onclick="window.location=app.html">App</button>
    <button name="scrollbtn" class="scrollbutton" onclick="window.location=programming.html">Programming</button>
    <button name="scrollbtn" class="scrollbutton" onclick="window.location=feminist.html">Feminist</button>
    <button name="scrollbtn" class="scrollbutton" onclick="window.location=program.html">Program</button>
    <button name="scrollbtn" class="scrollbutton" onclick="window.location=school.html">School</button>
</div>
```
```javascript
Scroller("left", true, 10, "scrolldiv", "scrollbtn", 2);
```
<br>

##### Scroll to right. Multiple scrolls is too demanding. Moving 1px every 100ms

```html
<div class="scroll-left" onmouseover="StopS(1)" onmouseout="StartS(1)" id="scrolldivexample">
    <button name="scrollbtnexample" class="scrollbutton">Example</button>
    <button name="scrollbtnexample" class="scrollbutton">Political</button>
    <button name="scrollbtnexample" class="scrollbutton">App</button>
    <button name="scrollbtnexample" class="scrollbutton">Programming</button>
    <button name="scrollbtnexample" class="scrollbutton">Feminist</button>
    <button name="scrollbtnexample" class="scrollbutton">Program</button>
    <button name="scrollbtnexample" class="scrollbutton">School</button>
</div>
```
```javascript
Scroller("right", false, 100, "scrolldivexample", "scrollbtnexample", 1);
```
