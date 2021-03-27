# Scroller.js
Create pausable scrolling text with a simple one-liner<br>

## Installation
Install from the command line:
```shell
$ npm install @kezoponk/scroller
```
Install via package.json:
```json
"@kezoponk/scroller": "1.0.*" 
```
Or download the dist/scroller.min.js manually
```html
<script type="text/javascript" src="scroller.min.js"></script>
```

## Usage
| Options | Usage |
| --- | --- |
| `direction` | left or right |
| `speed` | higher the value = slower |

<code>
  new Scroller('div-containing-buttons', { <strong>Options</strong> })
</code><br><br>

**Important CSS**

```css
div-containing-buttons {
  position: /* relative or absolute */;
}
```

<br>

### Example 1 / 2

```html
<div id="scrolldiv" class="scroll-left">
  <button class="scrollbutton">Example</button>
  <button class="scrollbutton">Political</button>
  <button class="scrollbutton">App</button>
  <button class="scrollbutton">Programming</button>
  <button class="scrollbutton">Feminist</button>
  <button class="scrollbutton">Program</button>
  <button class="scrollbutton">School</button>
</div>
```
```javascript
new Scroller('#scrolldiv', { direction: 'left', speed: 10 });
```
- Scroll to left
- Moving 1px every 10ms

<br>

### Example 2 / 2

```html
<div class="scroll-right">
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
new Scroller('.scroll-right', { direction: 'right', speed: 100 });
```
- Scroll to right
- Moving 1px every 100ms
