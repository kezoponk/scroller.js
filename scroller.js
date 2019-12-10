
// Scroller(direction, better performance, speed, div-containing-buttons, buttons-to-scroll, scrollID)

var pause = [];

function leftcycle(scrollbtn, btnlength, tickspeed, speed, id) {
  var step = 0;
  var condition = 0-scrollbtn[0].offsetWidth;

  while(step<scrollbtn.length) {
    if(pause[id]) { break; }

    var newbtnpos = scrollbtn[step].offsetLeft-speed;

    if(newbtnpos<=condition) {
      var startbtnpos = (btnlength+scrollbtn[step].offsetLeft)-condition;
      scrollbtn[step].setAttribute("style", "left:"+startbtnpos+"px; transition:left 0s linear");
    } else {
      scrollbtn[step].setAttribute("style", "left: "+newbtnpos+"px; transition:left "+tickspeed+"ms linear");
    }
    step++;
  }
}

function rightcycle(scrollbtn, btnlength, tickspeed, speed, id) {
  var step = 0;
  while(step<scrollbtn.length) {
    if(pause[id]) { break; }

    var newbtnpos = scrollbtn[step].offsetLeft+speed;

    if(newbtnpos>=btnlength) {
      var startbtnpos = 0-scrollbtn[step].offsetWidth;
      scrollbtn[step].setAttribute("style", "left:"+startbtnpos+"px; transition:left 0s linear");
    } else {
      scrollbtn[step].setAttribute("style", "left: "+newbtnpos+"px; transition:left "+tickspeed+"ms linear");
    }
    step++;
  }
}

function Scroller(direction, method, tickspeed, parentdiv, childbtn, id) {

  var startscroll, btnlength = 0;
  var speed = 1;
  var timing = tickspeed;

  var scrollbtn = document.getElementsByName(childbtn);
  var btnlength = (scrollbtn[0].offsetWidth*scrollbtn.length)-scrollbtn[0].offsetWidth,
  divlength = document.getElementById(parentdiv).offsetWidth;

  var addedbtn = 0;
  while(true) {
    if(btnlength<divlength) {} else { break; }

    var element = document.createElement("button");
    element.className = scrollbtn[addedbtn].className;
    element.name = scrollbtn[addedbtn].name;
    element.innerHTML = scrollbtn[addedbtn].innerHTML;
    document.getElementById(parentdiv).appendChild(element);
    btnlength = btnlength + scrollbtn[addedbtn].offsetWidth;
    addedbtn++;


  }

  for(step = scrollbtn.length-1; step >= 0; step--) {
    var btnstartpos = step*scrollbtn[step].offsetWidth;

    scrollbtn[step].style.left = btnstartpos+"px";
  }

  if(method) {
    timing = 0;
  }

  if(direction=="left") {
    startscroll = setInterval(function() {
      leftcycle(scrollbtn, btnlength, timing, speed, id);
    },tickspeed);
  } else {
    startscroll = setInterval(function() {
      rightcycle(scrollbtn, btnlength, timing, speed, id);
    },tickspeed);
  }
}

function StartS(id) {
  pause[id] = false;
}

function StopS(id) {
  pause[id] = true;
}
