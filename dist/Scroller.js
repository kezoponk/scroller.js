if (typeof(require) == 'function') var ResizeSensor = require("css-element-queries/src/ResizeSensor");
/**
 * @author Albin Eriksson https://github.com/kezoponk
 * @license MIT https://opensource.org/licenses/MIT
 */
 class Scroller {
  leftCycle() {
    // If the item most to left is outside of view then put it in the back of line
    if (this.Items[0].offsetWidth + this.movingpart.offsetLeft == 0) {
      const itemOutsideView = this.Items[0];
      this.movingpart.appendChild(itemOutsideView.cloneNode(true));
      this.movingpart.removeChild(itemOutsideView);
      this.movingpart.style.left = '0px';
    }
    this.movingpart.style.left = this.movingpart.offsetLeft - 1 +'px';
  }

  rightCycle() {
    // If the item most to left is outside of view then put it in the back of line
    if (this.movingpart.offsetLeft == 0) {
      const itemOutsideView = this.Items[this.Items.length -1];
      this.movingpart.prepend(itemOutsideView.cloneNode(true));
      this.movingpart.removeChild(itemOutsideView);
      this.movingpart.style.left = 0 - this.Items[0].offsetWidth +'px';
    }
    this.movingpart.style.left = this.movingpart.offsetLeft + 1 +'px';
  }

  pause() {
    clearInterval(this.loop);
  }

  unpause() {
    this.loop = setInterval((this.options.direction == 'left') ? () => this.leftCycle() : () => this.rightCycle(), 1000 / this.options.speed);
  }

  /** Restore target div to state before scroller implementation */
  restore() {
    clearInterval(this.loop);
    this.parentDiv.removeChild(this.movingpart);
    for (let index = this.movingpart.children.length -1; index >= 0; index--) {
      this.parentDiv.appendChild(this.initialMovingPart.children[index]);
    }
  }
  
  initialize(itemsTotalWidth, largestItem) {
    // Reset movingpart to remove supplemental buttons
    if (this.movingpart != undefined) this.parentDiv.removeChild(this.movingpart);
    this.movingpart = this.initialMovingPart.cloneNode(true);
    this.parentDiv.appendChild(this.movingpart);
    this.Items = this.movingpart.children;
    if (this.Items.length == 0) throw new Error('Target div empty');
    
    // If the total width of all items in movingpart div is less than parent div then append clones of items until div is filled
    var index = 0;
    while (itemsTotalWidth <= this.parentDiv.offsetWidth + largestItem) {
      const clone = this.Items[index].cloneNode(true);
      this.movingpart.appendChild(clone);
      itemsTotalWidth += this.Items[index].offsetWidth;
      index++;
    }

    this.movingpart.style.width = itemsTotalWidth +'px';
    if (this.options.direction == 'left') {
        this.movingpart.style.left = '0px';
    } else if(this.options.direction == 'right') {
        this.movingpart.style.left = 0 - this.Items[0].offsetWidth+'px';
    } else {
      throw new Error('direction is undefined or invalid');
    }
  }

  /**
   * @param {string} parentIdentifier - id or class of div containing elements you want to scroll
   * @param {Object} options { speed, direction }
   */
  constructor(parentIdentifier, options) {
    this.parentDiv = document.querySelector(parentIdentifier);
    this.parentDiv.style.overflow = 'hidden';
    
    try {
      options.speed = options.speed ? options.speed.toFixed(0) : (() => {throw new Error('speed is undefined')});
    } catch (e) {
      if (e instanceof TypeError) throw new TypeError('speed is invalid');
    }
    this.options = options;

    // Move items from target/parent div to initialMovingPart & calculate how many items is required to fill parent div width
    this.initialMovingPart = document.createElement('div');
    this.initialMovingPart.style.position = 'relative';
    var initialTotalWidth = 0, largestItem = 0;
    for (let index = this.parentDiv.children.length-1; index >= 0; index--) {
      this.parentDiv.children[index].style.position = 'relative';

      let currentItemWidth = this.parentDiv.children[index].offsetWidth;
      initialTotalWidth += currentItemWidth;
      if (currentItemWidth > largestItem) {
        largestItem = currentItemWidth;
      }
      
      this.initialMovingPart.appendChild(this.parentDiv.children[index]);
    }

    // Finish calculating width required, add/remove items to fill parent div width
    this.initialize(initialTotalWidth, largestItem);
    // Redo when div size is changed
    new ResizeSensor(this.parentDiv, () => {
      this.initialize(initialTotalWidth, largestItem);
    });

    // Pause movement when mouse is over
    this.parentDiv.addEventListener('mouseover', () => {
      this.pause();
    });
    this.parentDiv.addEventListener('mouseleave', () => {
      this.unpause();
    });

    // Finally begin movement
    this.loop = setInterval((this.options.direction == 'left') ? () => this.leftCycle() : () => this.rightCycle(), 1000 / this.options.speed);
  }
}

if (typeof(module) == 'object') module.exports = Scroller;
