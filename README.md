# Scroller.js
Create responsive, pausable moving elements, left or right, with one simple line
<br/><br/>

## Installation
Install from the command line:
```shell
$ npm install @kezoponk/scroller
```
Install via package.json:
```json
"@kezoponk/scroller": "1.1.2" 
```
Or download dist/scroller.min.js
```html
<script src="scroller.min.js"></script>
```
<br/>

## Usage
| Option | Usage and defaults |
| --- | --- |
| `direction` | left or right <br/>Default: left |
| `speed` | Any number <br/>Turtle: 20 - Rabbit: 120<br/>Default: 20 |
| `animation` | Animation type <br/>Default: linear |
| `delayBetweenAnimationsMS` | Delay before starting next animation when last animation is finished<br>Default: 0 |
| `finishAnimationBeforePause` | Default: false |

<code>new Scroller(Element, { Options });</code>

**Keep in mind** eventlisteners to items in target div will get removed since cloneNode ignores them
<br/><br/>

## Methods
These are available for access on the scroller instance <br/>
* **pause()** <br/>
Also triggered once mouse enters the target element <br/>
* **unpause()** <br/>
Also triggered once mouse exit the target element <br/>
* **restore()** <br/>
Restore target div to state before scroller - **can't be undone**

<br/>

### Example 1

```html
<div id="scrolldiv">
  <button>Example</button>
  <button>Political</button>
  <button>App</button>
  <button>Programming</button>
  <button>Program</button>
  <button>School</button>
</div>
```
```javascript
new Scroller(document.getElementById('scrolldiv'), { direction: 'left', speed: 10 });
```
- Scroll to left
- Moving 1px every 10ms

<br/>
    
### Example 2

```html
<div id="animated">
  <a href="/example"><button>Example</button></a>
  <a href="/political"><button>Political</button></a>
  <a href="/app"><button>App</button></a>
  <a href="/programming"><button>Programming</button></a>
  <a href="/program"><button>Program</button></a>
  <a href="/school"><button>School</button></a>
</div>
```
```javascript
new Scroller(
  document.getElementById('animated'), { 
    direction: 'right', 
    speed: 100, 
    animation:'ease-in-out', 
    delay: 500 
  }
);
```
- Scroll to right
- Moving 1px every 100ms
- Ease-in-out animation on each item
- 0.5s delay between each animation

<br/>