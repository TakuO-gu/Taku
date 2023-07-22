// 画像の現れ方を調節するアニメーション
// ScrollReveal().reveal('.box');
// ScrollReveal().reveal('.container .box', { container: '.container', delay: 100, reset: true });

window.onload = function() {
  setTimeout(function() {
    const allElements = document.getElementsByTagName("*");
    for(let i = 0; i < allElements.length; i++) {
      allElements[i].classList.add("ready");
    }
  }, 10); // 10 milliseconds = 0.01 seconds
};



let startPos = 0;
let dragging = false;

// Get the element
const element = document.querySelector('.back-indicator .circle');

// Add event listeners
element.addEventListener('mousedown', function(event) {
  // Record the initial position when the mouse button is pressed
  startPos = event.clientX;
  dragging = true;
});

document.addEventListener('mousemove', function(event) {
  if (dragging) {
    // Only move the element along the x-axis
    event.preventDefault();
    const moveDistance = event.clientX - startPos;
    element.style.transform = `translateX(${moveDistance}px)`;

    // If the element was moved more than 30vw to the right, go to a specific page
    const vw20 = window.innerWidth * 0.2;
    if (moveDistance > vw20) {
      window.location.href = '../index_graphic.html';
    }
  }
});

document.addEventListener('mouseup', function(event) {
  if (dragging) {
    dragging = false;

    // Reset the position of the element
    element.style.transform = 'translateX(0px)';
  }
});