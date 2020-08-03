# Scroller.js

Create pausable scrolling text with a simple one-liner

### Arguments
Scroller(<br>
div-containing-buttons-id, <br>
buttons-to-scroll-name
, <br>
{ <br>
&emsp;direction: <br>
&emsp;"left" or "right" <br>
,
<br>
&emsp;performance[false]:<br>
&emsp;true or false <br>
,
<br>
&emsp;speed:<br>
&emsp;higher = slower <br>,
<br>
&emsp;scrollid: 1-99999 
<br> 
});

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
Scroller("scrolldiv", "scrollbtn", { scrollid: 2, direction: "left", speed: 10 });
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
Scroller("scrolldivexample", "scrollbtnexample", { scrollid: 1, direction: "right", speed: 100, performance: true });
```
