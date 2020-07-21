/**
* @author Albin Eriksson, https://github.com/kezoponk
* @license MIT, https://opensource.org/licenses/MIT
*/
var paused = [];

class Scroller {
  // Declaring variables outside of loop for optimization
  btnIndex;
  btnLength;
  newBtnPos;
  resetCondition;
  lastBtnIndex;

  leftCycle(scrollBtn, tickSpeed, id) {
    this.btnIndex = 0;
    
    while(this.btnIndex<this.btnLength && !paused[id]) {
      // Create new position of current button
      this.newBtnPos = scrollBtn[this.btnIndex].offsetLeft - 1,
      this.resetCondition = 0 - scrollBtn[this.btnIndex].offsetWidth;

      // If previous button position is (left = 0 - buttonwidth) = past visible end of div, then move to back of the line
      if(this.newBtnPos<=this.resetCondition) {
        // startBtnPos = lastbuttons left + width
        let startBtnPos = scrollBtn[this.lastBtnIndex].offsetLeft+scrollBtn[this.lastBtnIndex].offsetWidth - 1;
        scrollBtn[this.btnIndex].style.left = startBtnPos+'px';
        scrollBtn[this.btnIndex].style.transition = 'left '+tickSpeed+'ms linear';
        this.lastBtnIndex = this.btnIndex;
      } else {
        // If not, move left
        scrollBtn[this.btnIndex].style.left = this.newBtnPos+'px';
        scrollBtn[this.btnIndex].style.transition = 'left '+tickSpeed+'ms linear';
      }
      this.btnIndex++;
    }
  }

  rightCycle(scrollBtn, tickSpeed, id) {
    this.btnIndex = 0;

    while(this.btnIndex<this.btnLength && !paused[id]) {
      // Create new position of current button
      this.newBtnPos = scrollBtn[this.btnIndex].offsetLeft + 1;
      this.resetCondition = scrollBtn[this.lastBtnIndex].offsetLeft;

      // If previous button position is (left = 0), then move current btn to beginning
      if(this.resetCondition==0) {
        // startBtnPos = lastbuttons 1 - width, 1 instead of 0 to fill gap of 1px created at first iteration
        let startBtnPos = 1 - scrollBtn[this.btnIndex].offsetWidth;
        scrollBtn[this.btnIndex].style.left = startBtnPos+'px';
        scrollBtn[this.btnIndex].style.transition = 'left '+tickSpeed+'ms linear';
        this.lastBtnIndex = this.btnIndex;
      } else {
        // If not, move right
        scrollBtn[this.btnIndex].style.left = this.newBtnPos+'px';
        scrollBtn[this.btnIndex].style.transition = 'left '+tickSpeed+'ms linear';
      }
      this.btnIndex++;
    }
  }

  calculatePositions(scrollBtn, parentDiv, options, initButtonQuantity, btnTotalWidth, largestBtn) {
    // Remove previous supplemental buttons if window size is changed
    for(var i = scrollBtn.length-1; i >= initButtonQuantity; i--) {
      scrollBtn[i].parentNode.removeChild(scrollBtn[i]);
    }
    // If the total width of all buttons in div is less then div width then append buttons until div is filled
    let index = 0;
    while(btnTotalWidth < parentDiv.offsetWidth+largestBtn) {
      var clone = scrollBtn[index].cloneNode(true);
      parentDiv.appendChild(clone);
      btnTotalWidth += scrollBtn[index].offsetWidth;
      index++;
    }
    // Create buttons start positions
    let btnStartPos = 0;
    for(index = scrollBtn.length-1; index >= 0; index--) {
      scrollBtn[index].style.left = btnStartPos+'px';
      btnStartPos += scrollBtn[index].offsetWidth;
    }
    // If direction is left then lastBtnIndex should begin at first btn, if right then iteration begin at the last btn
    if(options.direction == 'left') this.lastBtnIndex = 0; else this.lastBtnIndex = scrollBtn.length-1;

    // Update the private variable "btnLength" with button quantity
    this.btnLength = scrollBtn.length;
  }

  /**
  * @param {string} parentid - ID of div containing scrolling buttons
  * @param {string} childname - Name attribute of buttons
  * @param {Object} options = { speed, scrollid, performance, direction }
  */
  constructor(parentid, childname, options) {
    // Get all buttons in an array since childbtn is the name attribute
    const scrollBtns = document.getElementsByName(childname);
    const parentDiv = document.getElementById(parentid);
    const initButtonQuantity = scrollBtns.length;

    // Calculate how mutch extra space is needed outside of div (not visible space)
    let firstLength = 0,
        largestBtn = 0;
    for(var index = scrollBtns.length-2; index >= 0; index--) {
      let currentButtonWidth = scrollBtns[index].offsetWidth;
      firstLength += currentButtonWidth;
      if(currentButtonWidth > largestBtn) {
        largestBtn = currentButtonWidth;
      }
    }

    let timing = 0;
    // If performance is false then timing is transition time
    if(!options.performance && options.performance != null) {
      timing = options.speed;
    }

    // Calculate positions for all buttons
    this.calculatePositions(scrollBtns, parentDiv, options, initButtonQuantity, firstLength, largestBtn);

    // Re-calculate/reset button positions if window is resized
    window.addEventListener('resize', function() {
      this.calculatePositions(scrollBtns, parentDiv, options, initButtonQuantity, firstLength, largestBtn);
    }.bind(this));

    // Finally begin button movement
    if(options.direction=='left') {
      setInterval(function() {
        this.leftCycle(scrollBtns, timing, options.scrollid);
      }.bind(this), options.speed);
    }
    else if(options.direction=='right'){
      setInterval(function() {
        this.rightCycle(scrollBtns, timing, options.scrollid);
      }.bind(this), options.speed);
    }
  }
}

// Actions to start or pause scrolling
function StartS(id) {
  paused[id] = false;
}
function StopS(id) {
  paused[id] = true;
}
