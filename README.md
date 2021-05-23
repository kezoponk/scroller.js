# Scroller.js
Create pausable scrolling text with a simple one-liner<br>

## Installation
Install from the command line:
```shell
$ npm install @kezoponk/scroller
```
Install via package.json:
```json
"@kezoponk/scroller": "1.0.4" 
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

<code>new <strong>Scroller</strong>('div-containing-buttons', { Options})</code>
<strong> OR </strong>
<code>new <strong>RelativeScroller</strong>('div-containing-buttons', { Options })</code>
<br>

**Important CSS**

```css
div-containing-buttons {
  position: relative, absolute or fixed;
}
```


<br>

### Example 1 / 3

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
    
### Example 2 / 3

```html
<div id="dynamic-height" style="display:flex; flex-direction:column; max-height:100px">
  <a href="/example"><button style="min-height:50px">Example</button></a>
  <a href="/political"><button style="min-height:30px">Political</button></a>
  <a href="/app"><button style="min-height:30px">App</button></a>
  <a href="/programming"><button style="min-height:30px">Programming</button></a>
  <a href="/feminist"><button style="min-height:30px">Feminist</button></a>
  <a href="/program"><button style="min-height:30px">Program</button></a>
  <a href="/school"><button style="min-height:30px">School</button></a>
</div>
```
```javascript
new RelativeScroller('#dynamic-height', { direction: 'right', speed: 100 });
```
- Scroll to right
- Moving 1px every 100ms
- Div is 50px height

<br>

### Example 3 / 3

```html
<div class="scroll-right">
  <button onclick="window.location=example.html">Example</button>
  <button onclick="window.location=political.html">Political</button>
  <button onclick="window.location=app.html">App</button>
  <button onclick="window.location=programming.html">Programming</button>
  <button onclick="window.location=feminist.html">Feminist</button>
  <button onclick="window.location=program.html">Program</button>
  <button onclick="window.location=school.html">School</button>
</div>
```
```javascript
new Scroller('.scroll-right', { direction: 'right', speed: 100 });
```
- Scroll to right
- Moving 1px every 100ms
