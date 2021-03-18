# Scroller.js
Create pausable scrolling text with a simple one-liner<br>

## Installation
Install from the command line:
```shell
$ npm install @kezoponk/scroller
```
Install via package.json:
```json
"@kezoponk/scroller": "1.0.1" 
```
Or download the dist/scroller.min.js manually
```html
<script type="text/javascript" src="scroller.min.js"></script>
```

## Usage
| Options | Usage |
| --- | --- |
| `direction` | left or right |
| `performance` | true or false <br>True enables transition time on each pixel move. False is default |
| `speed` | higher = slower |

<code>
  new Scroller(div-containing-buttons, { <strong>Options</strong> })
</code><br><br>

**Important CSS**

```css
div-containing-buttons {
  overflow: hidden;
  position: /* relative or absolute */;
}

buttons-to-scroll {
  position: absolute;
}
```

<br>

### Example #1

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
- Performance better, less smooth animation
- Moving 1px every 10ms

___

### Example #2

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
new Scroller('.scroll-right', { direction: 'right', speed: 100, performance: true });
```
- Scroll to right
- Multiple scrolls is too demanding
- Moving 1px every 100ms
