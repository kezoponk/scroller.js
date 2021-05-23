/**
 * @author Albin Eriksson, https://github.com/kezoponk
 * @license MIT, https://opensource.org/licenses/MIT
 */
 class Scroller {
  leftCycle(scrollingButtons) {
    // If the button most to left is outside of view then put it in the back of line
    if (0 - (scrollingButtons[this.btnIndex].offsetWidth + this.virtualLeft) >= this.movingpart.offsetLeft) {
      scrollingButtons[this.btnIndex].style.left = this.newBtnPos + this.virtualLeft + 'px';
      this.virtualLeft += scrollingButtons[this.btnIndex].offsetWidth;

      if (this.btnIndex != 0) {
        this.btnIndex--;
      } else {
        // Reset cycle
        let btnStartPos = 0;
        for (let index = scrollingButtons.length - 1; index >= 0; index--) {
          scrollingButtons[index].style.left = btnStartPos + 'px';
          btnStartPos += scrollingButtons[index].offsetWidth;
        }
        // Reset values to the same value as they were before the cycle began
        this.virtualLeft = 0,
        this.btnIndex = this.btnCount - 1,
        this.newBtnPos = this.btnTotalWidth,
        this.movingpart.style.left = '0px';
      }
    }
    this.movingpart.style.left = this.movingpart.offsetLeft - 1 + 'px';
  }

  rightCycle(scrollingButtons) {
    // If the button most to left is outside of view then put it in the back of line
    if (this.virtualLeft + scrollingButtons[this.btnIndex].offsetWidth <= this.movingpart.offsetLeft) {
      this.newBtnPos -= scrollingButtons[this.btnIndex].offsetWidth;
      scrollingButtons[this.btnIndex].style.left = this.newBtnPos + 'px';
      this.virtualLeft += scrollingButtons[this.btnIndex].offsetWidth;

      if (this.btnIndex != this.btnCount - 1) {
        this.btnIndex++;
      } else {
        // Reset cycle
        let btnStartPos = 0;
        for (let index = scrollingButtons.length - 1; index >= 0; index--) {
          scrollingButtons[index].style.left = btnStartPos + 'px';
          btnStartPos += scrollingButtons[index].offsetWidth;
        }
        // Reset values to the same value as they were before the cycle began
        this.btnIndex = 0,
        this.newBtnPos = 0,
        this.virtualLeft = this.parentDiv.offsetWidth - this.btnTotalWidth,
        this.movingpart.style.left = this.virtualLeft + 'px';
      }
    }
    this.movingpart.style.left = this.movingpart.offsetLeft + 1 + 'px';
  }

  calculatePositions(scrollingButtons, options, initButtonQuantity, btnTotalWidth, largestBtn) {
    // Remove previous supplemental buttons if window size is changed
    for (let index = scrollingButtons.length - 1; index >= initButtonQuantity; index--) {
      scrollingButtons[index].parentNode.removeChild(scrollingButtons[index]);
    }

    // If the total width of all buttons in div is less then div width then append buttons until div is filled
    let index = 0;
    while (btnTotalWidth <= this.parentDiv.offsetWidth + largestBtn) {
      var clone = scrollingButtons[index].cloneNode(true);
      this.movingpart.appendChild(clone);
      btnTotalWidth += scrollingButtons[index].offsetWidth;
      index++;
    }

    // Create buttons start positions
    let btnStartPos = 0;
    for (let index = scrollingButtons.length - 1; index >= 0; index--) {
      scrollingButtons[index].style.left = btnStartPos + 'px';
      btnStartPos += scrollingButtons[index].offsetWidth;
    }
    
    // Create/Reset variables
    this.btnCount = scrollingButtons.length;
    this.btnTotalWidth = btnTotalWidth;

    if (options.direction == 'left') {
        this.btnIndex = this.btnCount - 1,
        this.newBtnPos = btnTotalWidth,
        this.virtualLeft = 0;
    } else if (options.direction == 'right') {
        this.btnIndex = 0,
        this.newBtnPos = 0, //px
        this.virtualLeft = this.parentDiv.offsetWidth - btnTotalWidth,
        this.movingpart.style.left = this.virtualLeft + 'px';
    } else {
      throw new Error('Direction is undefined or incorrect');
    }
  }

  /**
   * @param {string} parentIdentifier - id or class of div containing scrolling buttons
   * @param {Object} options { speed, direction }
   */
  constructor(parentIdentifier, options) {
    this.parentDiv = document.querySelector(parentIdentifier);
    this.parentDiv.style.overflow = 'hidden';

    // Move buttons from parent div to the moving part & make position absolute
    this.movingpart = document.createElement('div');
    this.movingpart.style.position = 'absolute';
    for (index = this.parentDiv.children.length; index >= 1; index--) {
      this.parentDiv.children[index - 1].style.position = 'absolute';
      this.movingpart.appendChild(this.parentDiv.children[index - 1]);
    }
    this.parentDiv.appendChild(this.movingpart);

    var scrollingButtons = this.movingpart.children;
    const initButtonQuantity = scrollingButtons.length;

    // Calculate how mutch extra space is needed outside of div (not visible space)
    let initTotalWidth = 0, largestBtn = 0;
    for (var index = scrollingButtons.length - 1; index >= 0; index--) {
      let currentButtonWidth = scrollingButtons[index].offsetWidth;
      initTotalWidth += currentButtonWidth;

      if (currentButtonWidth > largestBtn) {
        largestBtn = currentButtonWidth;
      }
    }
    // Calculate positions for all buttons
    this.calculatePositions(scrollingButtons, options, initButtonQuantity, initTotalWidth, largestBtn);

    // Re-calculate/reset button positions if window is resized
    window.addEventListener('resize', function () {
      this.calculatePositions(scrollingButtons, options, initButtonQuantity, initTotalWidth, largestBtn);
    }.bind(this));

    // Pause eventlistener for mouse over and out
    this.paused = false;
    this.parentDiv.addEventListener('mouseover', () => {
      this.paused = true;
    });
    this.parentDiv.addEventListener('mouseout', () => {
      this.paused = false;
    });

    // Finally begin button movement
    if (options.direction == 'left') {
      setInterval(function () {
          if (!this.paused) {
            this.leftCycle(scrollingButtons);
          }
        }
        .bind(this), options.speed);
    } else if (options.direction == 'right') {
      setInterval(function () {
          if (!this.paused) {
            this.rightCycle(scrollingButtons);
          }
        }
        .bind(this), options.speed);
    }
  }
}

class RelativeScroller {
  leftCycle(scrollingButtons) {
    // If the button most to left is outside of view then put it in the back of line
    if (0 - scrollingButtons[0].offsetWidth >= this.movingpart.offsetLeft) {
      const clone = scrollingButtons[0].cloneNode(true);
      this.movingpart.appendChild(clone);
      this.movingpart.removeChild(scrollingButtons[0]);
      this.movingpart.style.left = '0px';
    }

    this.movingpart.style.left = this.movingpart.offsetLeft - 1 +'px';
  }

  rightCycle(scrollingButtons) {
    // If the button most to left is outside of view then put it in the back of line
    if (this.movingpart.offsetLeft > 0) {
      const clone = scrollingButtons[this.lastBtn].cloneNode(true);
      this.movingpart.removeChild(scrollingButtons[this.lastBtn]);
      this.movingpart.prepend(clone);
      this.movingpart.style.left = 0 - scrollingButtons[0].offsetWidth +'px';
    }

    this.movingpart.style.left = this.movingpart.offsetLeft + 1 +'px';
  }

  calculatePositions(scrollingButtons, options, initButtonQuantity, btnTotalWidth, largestBtn) {
    // Remove previous supplemental buttons if window size is changed
    for (let index = scrollingButtons.length - 1; index >= initButtonQuantity; index--) {
      scrollingButtons[index].parentNode.removeChild(scrollingButtons[index]);
    }

    // If the total width of all buttons in div is less then div width then append buttons until div is filled
    let index = 1;
    while (btnTotalWidth <= this.parentDiv.offsetWidth + largestBtn) {
      var clone = scrollingButtons[index].cloneNode(true);
      this.movingpart.appendChild(clone);
      btnTotalWidth += scrollingButtons[index].offsetWidth;
      index++;
    }

    // Create/Reset variables
    this.lastBtn = scrollingButtons.length - 1;
    this.originalLeft = 0 - scrollingButtons[0].offsetWidth;
    this.btnTotalWidth = btnTotalWidth;
    this.movingpart.style.width = btnTotalWidth + 10 +'px';

    if (options.direction == 'left') {
        this.movingpart.style.left = '0px';
    } else if (options.direction == 'right') {
        this.movingpart.style.left = this.originalLeft+'px';
    } else {
      throw new Error('Direction is undefined or incorrect');
    }
  }

  /**
   * @param {string} parentIdentifier - id or class of div containing scrolling buttons
   * @param {Object} options { speed, direction }
   */
  constructor(parentIdentifier, options) {
    this.parentDiv = document.querySelector(parentIdentifier);
    this.parentDiv.style.overflow = 'hidden';

    // Move buttons from parent div to the moving part & make position absolute
    this.movingpart = document.createElement('div');
    this.movingpart.style.position = 'relative';

    for (index = this.parentDiv.children.length; index >= 1; index--) {
      this.parentDiv.children[index - 1].style.position = 'relative';
      this.movingpart.appendChild(this.parentDiv.children[index - 1]);
    }

    this.parentDiv.appendChild(this.movingpart);

    var scrollingButtons = this.movingpart.children;
    const initButtonQuantity = scrollingButtons.length;

    // Calculate how mutch extra space is needed outside of div (not visible space)
    let initTotalWidth = 0, largestBtn = 0;
    for (var index = scrollingButtons.length - 1; index >= 0; index--) {
      let currentButtonWidth = scrollingButtons[index].offsetWidth;
      initTotalWidth += currentButtonWidth;

      if (currentButtonWidth > largestBtn) {
        largestBtn = currentButtonWidth;
      }
    }

    // Calculate positions for all buttons
    this.calculatePositions(scrollingButtons, options, initButtonQuantity, initTotalWidth, largestBtn);

    // Re-calculate/reset button positions if window is resized
    window.addEventListener('resize', function () {
      this.calculatePositions(scrollingButtons, options, initButtonQuantity, initTotalWidth, largestBtn);
    }.bind(this));

    // Pause eventlistener for mouse inside target div and outside
    this.paused = false;
    this.parentDiv.addEventListener('mouseover', () => {
      this.paused = true;
    });
    this.parentDiv.addEventListener('mouseout', () => {
      this.paused = false;
    });

    // Finally begin button movement
    if (options.direction == 'left') {
      setInterval(function () {
          if (!this.paused) {
            this.leftCycle(scrollingButtons);
          }
        }
        .bind(this), options.speed);
    } else if (options.direction == 'right') {
      setInterval(function () {
          if (!this.paused) {
            this.rightCycle(scrollingButtons);
          }
        }
        .bind(this), options.speed);
    }
  }
}

if (typeof (module) == 'object') module.exports = {Scroller, RelativeScroller};
