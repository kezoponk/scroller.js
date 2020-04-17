// @author Albin Eriksson, https://github.com/kezoponk
// @license MIT, https://opensource.org/licenses/MIT

var paused = [];

function leftCycle(scrollBtn, btnLength, tickSpeed, speed, id) {
  let index = 0;
  while(index<scrollBtn.length && !paused[id]) {
    // Create new position of current button
    let newBtnPos = scrollBtn[index].offsetLeft-speed;
        condition = 0-scrollBtn[index].offsetWidth;
    // If button position is left= 0 - buttonwidth, then move to back of div
    if(newBtnPos<=condition) {
      let startBtnPos = (btnLength+scrollBtn[index].offsetLeft)-condition;
      scrollBtn[index].style.left = startBtnPos+"px";
      scrollBtn[index].style.transition = "left "+tickSpeed+"ms linear";
    } else {
      // If not, move left
      scrollBtn[index].style.left = newBtnPos+"px";
      scrollBtn[index].style.transition = "left "+tickSpeed+"ms linear";
    }
    index++;
  }
}

function rightCycle(scrollBtn, btnLength, tickSpeed, speed, id) {
  let index = 0;
  while(index<scrollBtn.length && !paused[id]) {
    // Create new position of current button
    let newBtnPos = scrollBtn[index].offsetLeft+speed;
    // If button position is right= div-width + buttonwidth, then move to back of div
    if(newBtnPos>=btnLength) {
      let startBtnPos = 0-scrollBtn[index].offsetWidth;
      scrollBtn[index].style.left = startBtnPos+"px";
      scrollBtn[index].style.transition = "left 0ms linear";
    } else {
      // If not, move right
      scrollBtn[index].style.left = newBtnPos+"px";
      scrollBtn[index].style.transition = "left "+tickSpeed+"ms linear";
    }
    index++;
  }
}

function calculatePositions(initLength, btnLength, scrollBtn, parentDiv) {
  // Remove previous supplemental buttons if window size is changed
  for(i = scrollBtn.length-1; i >= initLength; i--) {
    scrollBtn[i].parentNode.removeChild(scrollBtn[i]);
  }
  // If the total width of all buttons in div is less then div width then append buttons until div is filled
  let divLength = parentDiv.offsetWidth, index = 0;
  while(btnLength<divLength) {
    let element = document.createElement("button");
    element.className = scrollBtn[index].className;
    element.name = scrollBtn[index].name;
    element.innerHTML = scrollBtn[index].innerHTML;
    parentDiv.appendChild(element);
    btnLength = btnLength + scrollBtn[index].offsetWidth;
    index++;
  }
  // Create buttons start positions
  let btnStartPos = 0;
  for(index = scrollBtn.length-1; index >= 0; index--) {
    scrollBtn[index].style.left = btnStartPos+"px";
    btnStartPos += scrollBtn[index].offsetWidth;
  }
  // Return the width of all buttons together
  return btnLength;
}

function Scroller(direction, method, tickSpeed, parentdiv, childbtn, id) {
  // Get all buttons in an array since childbtn is the name attribute
  const scrollBtn = document.getElementsByName(childbtn);
  const parentDiv = document.getElementById(parentdiv);
  const initButtonQuantity = scrollBtn.length;

  let speed  = 1,         // Pixels each button move each iteration
      timing = tickSpeed; // If performance is false then timing is transition time

  // Calculate how mutch extra space is needed outside of div (not visible space)
  let firstLength = 0;
  for(index = scrollBtn.length-2; index >= 0; index--) {
    firstLength += scrollBtn[index].offsetWidth;
  }
  let btnLength = calculatePositions(initButtonQuantity, firstLength, scrollBtn, parentDiv);
  // If performance is true then set transition time to zero
  if(method) {
    timing = 0;
  }
  // Reset button positions and calculate new positions if window is resized
  window.addEventListener("resize", function() {
    btnLength = calculatePositions(initButtonQuantity, firstLength, scrollBtn, parentDiv);
  });
  
  if(direction=="left") {
    setInterval(function() {
      leftCycle(scrollBtn, btnLength, timing, speed, id);
    },tickSpeed);
  } else {
    setInterval(function() {
      rightCycle(scrollBtn, btnLength, timing, speed, id);
    },tickSpeed);
  }
}

// Actions to start or pause scrolling
function StartS(id) {
  paused[id] = false;
}
function StopS(id) {
  paused[id] = true;
}
