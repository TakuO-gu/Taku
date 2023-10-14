// 画像の現れ方を調節するアニメーション
window.onload = function() {
  setTimeout(function() {
    const allElements = document.getElementsByTagName("*");
    for(let i = 0; i < allElements.length; i++) {
      allElements[i].classList.add("ready");
    }
  }, 10); // 10 milliseconds = 0.01 seconds
};


// .back-indicator acitvation
let startPos = 0;
let dragging = false;

const element = document.querySelector('.back-indicator .circle');

element.addEventListener('mousedown', function(event) {
  startPos = event.clientX;
  dragging = true;
});

document.addEventListener('mousemove', function(event) {
  if (dragging) {
    event.preventDefault();
    const moveDistance = event.clientX - startPos;
    element.style.transform = `translateX(${moveDistance}px)`;
    const vw20 = window.innerWidth * 0.2;
    if (moveDistance > vw20) {
      window.history.back(); // 前のページに戻る
    }
  }
});


document.addEventListener('mouseup', function(event) {
  if (dragging) {
    dragging = false;

    element.style.transform = 'translateX(0px)';
  }
});


window.addEventListener("scroll", function() {
  // 要素を取得
  let element = document.querySelector('#main-image .main-image');
  let viewportHeight = window.innerHeight;
  let scrollPosition = window.pageYOffset / viewportHeight;
  
  // scrollPositionを0から1の範囲に制限
  scrollPosition = Math.min(Math.max(scrollPosition, 0), 1);
  
  // scaleValueを1から1.4の範囲で計算
  let scaleValue = 1 + (0.1 * scrollPosition);
  
  // element.style.transformOrigin = "top";
  element.style.transform = `translateZ(0) scale(${scaleValue})`;
});

