# scroller
Create pausable scrolling text with a simple function call

Scroller(direction, better performance, speed, div-containing-buttons-id, buttons-to-scroll-name, scrollID)


Examples:

<div class="scroll-left" onmouseover="StopS(2)" onmouseout="StartS(2)" id="scrolldiv">
    <button name="scrollbtn" class="scroll-graybtn">Example</button>
    <button name="scrollbtn" class="scroll-graybtn">Political</button>
    <button name="scrollbtn" class="scroll-graybtn">App</button>
    <button name="scrollbtn" class="scroll-graybtn">Irak</button>
    <button name="scrollbtn" class="scroll-graybtn">Feminist</button>
    <button name="scrollbtn" class="scroll-graybtn">Program</button>
    <button name="scrollbtn" class="scroll-graybtn">School</button>
</div>

Scroller("left", true, 10, scrollbtndiv, scrollbtn, 2)
