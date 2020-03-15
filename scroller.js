// @author Albin Eriksson, https://github.com/kezoponk
// @license MIT, https://opensource.org/licenses/MIT

var paused = [];

function leftcycle(scrollbtn, btnlength, tickspeed, speed, id) {
  let step = 0;

  while(step<scrollbtn.length) {
    if(paused[id]) { break; }
    // Create new position of current button
    let newbtnpos = scrollbtn[step].offsetLeft-speed;
        condition = 0-scrollbtn[step].offsetWidth;
    // If button position is left= 0 - buttonwidth, then move to back of div
    if(newbtnpos<=condition) {
      let startbtnpos = (btnlength+scrollbtn[step].offsetLeft)-condition;
      scrollbtn[step].setAttribute("style", "left:"+startbtnpos+"px; transition:left 0s linear");
    } else {
      // If not, move left
      scrollbtn[step].setAttribute("style", "left: "+newbtnpos+"px; transition:left "+tickspeed+"ms linear");
    }
    step++;
  }
}

function rightcycle(scrollbtn, btnlength, tickspeed, speed, id) {
  let step = 0;
  while(step<scrollbtn.length) {
    if(paused[id]) { break; }
    // Create new position of current button
    let newbtnpos = scrollbtn[step].offsetLeft+speed;
    // If button position is right= div-width + buttonwidth, then move to back of div
    if(newbtnpos>=btnlength) {
      let startbtnpos = 0-scrollbtn[step].offsetWidth;
      scrollbtn[step].setAttribute("style", "left:"+startbtnpos+"px; transition:left 0s linear");
    } else {
      // If not, move right
      scrollbtn[step].setAttribute("style", "left: "+newbtnpos+"px; transition:left "+tickspeed+"ms linear");
    }
    step++;
  }
}

function calculatePositions(btnlength, divlength, scrollbtn, parentdiv) {
  let addedbtn = 0;
  // If the total width of all buttons in div is less then div width then append buttons until div is filled
  while(true) {
    if(btnlength<divlength) {} else { break; }
    let element = document.createElement("button");
    element.className = scrollbtn[addedbtn].className;
    element.name = scrollbtn[addedbtn].name;
    element.innerHTML = scrollbtn[addedbtn].innerHTML;
    document.getElementById(parentdiv).appendChild(element);
    btnlength = btnlength + scrollbtn[addedbtn].offsetWidth;
    addedbtn++;
  }
  // Create buttons start position
  for(step = scrollbtn.length-1; step >= 0; step--) {
    let btnstartpos = step*scrollbtn[step].offsetWidth;
    scrollbtn[step].style.left = btnstartpos+"px";
  }
  // Return the width of all buttons together
  return btnlength;
}

function Scroller(direction, method, tickspeed, parentdiv, childbtn, id) {
  // Get all buttons in an array since childbtn is the name attribute
  const scrollbtn = document.getElementsByName(childbtn);

  let speed  = 1,         // Pixels each button move each iteration
      timing = tickspeed; // If performance is false then timing is transition time

  // Calculate how mutch extra space is needed outside of div (not visible space)
  let btnlength = (scrollbtn[0].offsetWidth*scrollbtn.length)-scrollbtn[0].offsetWidth,
      divlength = document.getElementById(parentdiv).offsetWidth;
      btnlength = calculatePositions(btnlength, divlength, scrollbtn, parentdiv);

  // If performance is true then set transition time to zero
  if(method) {
    timing = 0;
  }
  // Reset button positions and calculate new positions if window is resized
  window.addEventListener("resize", function() {
    btnlength = calculatePositions(btnlength, divlength, scrollbtn, parentdiv);
  });

  if(direction=="left") {
    setInterval(function() {
      leftcycle(scrollbtn, btnlength, timing, speed, id);
    },tickspeed);
  } else {
    setInterval(function() {
      rightcycle(scrollbtn, btnlength, timing, speed, id);
    },tickspeed);
  }
}
// Actions to start or pause scrolling
function StartS(id) {
  paused[id] = false;
}

function StopS(id) {
  paused[id] = true;
}
