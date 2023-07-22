// // parallax効果
let parallax1Elements = document.querySelectorAll('.parallax1');
let parallax2Elements = document.querySelectorAll('.parallax2');
let parallax3Elements = document.querySelectorAll('.parallax3');

function parallaxEffect() {
  let scrollPosition = window.pageYOffset;

  parallax1Elements.forEach((element) => {
    element.style.transform = 'translateY(' + scrollPosition * -1 + 'px)';
  });

  parallax2Elements.forEach((element) => {
    element.style.transform = 'translateY(' + scrollPosition * 0.9 + 'px)';
  });

  parallax3Elements.forEach((element) => {
    element.style.transform = 'translateY(' + scrollPosition * -0.5 + 'px)';
  });
}

// throttle function
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// window.addEventListener('scroll', throttle(parallaxEffect, 60)); // 50msのthrottle



// philosophyのliが画面真ん中ら辺にくるとくっきりと見える動作
let philosophyItems = document.querySelectorAll('#philosophy .myPhilosophy li');

function adjustVisibility() {
  philosophyItems.forEach((item) => {
    let itemBounds = item.getBoundingClientRect();
    let itemMiddle = itemBounds.top + itemBounds.height / 2;
    let viewportHeight = window.innerHeight;

    // Calculate the position range you want the effect to happen (40% - 60% of viewport height)
    let triggerRangeTop = viewportHeight * 0.3;
    let triggerRangeBottom = viewportHeight * 0.7;

    if (itemMiddle > triggerRangeTop && itemMiddle < triggerRangeBottom) {
      // The middle of the item is within the desired range in the viewport, add the class to remove the blur
      item.classList.add('blurDetached');
    } else {
      // The middle of the item is not within the range, remove the class to apply the blur
      item.classList.remove('blurDetached');
    }
  });
}

window.addEventListener('scroll', throttle(adjustVisibility, 200)); // 200msのthrottle


// #heroのbuttonが押された時の動作
document.addEventListener('DOMContentLoaded', function () {//スクロールイベントの制御
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.scrollTo(0, 0);

  let isScrollEnabled = false;

  const preventScroll = (event) => {
    if (!isScrollEnabled) {
      event.preventDefault();
    }
  }
  // スクロール関連のイベントにpreventScroll関数を設定
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
  window.addEventListener('keydown', function (event) {
    // 矢印キー, スペースバー, ページアップ/ダウンキーに対応
    const keyCodes = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    if (keyCodes.includes(event.keyCode) && !isScrollEnabled) {
      event.preventDefault();
    }
  }, { passive: false });
  // スクロールイベントの制御おわり


  // button pushed animaiton
  var button = document.querySelector('#hero button');
  button.addEventListener('click', function () {
    button.classList.add('fade-in');
    document.querySelector('body').classList.add('fade-out');
    document.querySelector('#hero').classList.add('fade-in');
    isScrollEnabled = true;
  });


  // add parallax effect
  var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  window.onscroll = function () {
    var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    var img1 = document.querySelector('.ImAGraphicDesigner');
    var img2 = document.querySelector('#hero .heresMyWorks');

    // Convert 'left' style to float
    var img1Left = parseFloat(img1.style.left) || 0;
    var img2Left = parseFloat(img2.style.left) || 0;

    if (lastScrollTop < currentScrollTop) {
      // Scroll down
      img1.style.left = (img1Left - 2.7) + '%';
      img2.style.left = (img2Left - 1.8) + '%';
    } else if (lastScrollTop > currentScrollTop) {
      // Scroll up
      img1.style.left = (img1Left + 2.7) + '%';
      img2.style.left = (img2Left + 1.8) + '%';
    }

    lastScrollTop = currentScrollTop;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset === 0 || document.documentElement.scrollTop === 0) {
        // Get the elements to adjust left value
        var img1 = document.querySelector('.ImAGraphicDesigner');
        var img2 = document.querySelector('.heresMyWorks');

        // Calculate the left value based on scroll position
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        var leftValue = (scrollPosition * 0.01) + '%';

        // Set the left value of the elements
        img1.style.left = leftValue;
        img2.style.left = leftValue;
      }
    });
  }
});


// .messageが現れるアニメーション
let philosophyMessage = document.querySelector('#philosophy .message');
let initialWidth = philosophyMessage ? philosophyMessage.getBoundingClientRect().width : 0;

function adjustMessageWidth() {
  // Get the viewport height
  const viewportHeight = window.innerHeight;

  // Get the current scroll position
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (!philosophyMessage) return;

  // Get the element's details
  const messageRect = philosophyMessage.getBoundingClientRect();

  // Calculate where the top and bottom of the element are relative to the viewport
  const messageTop = messageRect.top;
  const messageBottom = messageRect.bottom;

  // Calculate the range in which we want to change the width
  const startChange = 0;
  const endChange = viewportHeight;

  if (messageTop <= startChange && messageBottom >= 0) {
    // Calculate the percentage of the scroll range we are through
    const percentage = (startChange - messageTop) / (endChange - startChange);

    // Calculate the new width
    const newWidth = initialWidth + (percentage * (100 - initialWidth));

    // Set the new width
    philosophyMessage.style.width = newWidth + '%';

    philosophyMessage.style.backgroundColor = 'rgba(34, 34, 34, 0.9)';
  } else {
    philosophyMessage.style.backgroundColor = 'rgba(34, 34, 34, 0)';
  }
}

window.addEventListener('scroll', throttle(adjustMessageWidth, 50)); // 50msのthrottle


// worksWindowBGパララックス
// let worksWindows = Array.from(document.querySelectorAll('#works .worksWindow .worksWindowBG'));
// let viewportHeight = window.innerHeight;
// let scrollPosition = window.pageYOffset;

// function updatePositions() {
//   worksWindows.forEach((windowBG) => {
//     let rect = windowBG.getBoundingClientRect();
//     let positionInViewport = (rect.top + rect.bottom) / (2 * viewportHeight);
//     let transformValue = 80 - positionInViewport * 160;
//     windowBG.style.transform = `translate(-50%, -50%) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${transformValue}, 0, 1)`;
//   });
// }

// function applyParallax() {
//   let newScrollPosition = window.pageYOffset;
//   let newViewportHeight = window.innerHeight;

//   if (newScrollPosition !== scrollPosition || newViewportHeight !== viewportHeight) {
//     scrollPosition = newScrollPosition;
//     viewportHeight = newViewportHeight;
//     updatePositions();
//   }

//   requestAnimationFrame(applyParallax);
// }

// applyParallax();


// .titleが流れ続けるアニメーション
let lastScrollTop = 0;
let lastTime = Date.now();
let lastDirection = 0; // 1 for downscroll, -1 for upscroll
const titles = Array.from(document.querySelectorAll('.title ul')).map(title => {
  const style = window.getComputedStyle(title);
  const matrix = new WebKitCSSMatrix(style.transform);
  return { element: title, initialX: matrix.m41, variationValue: 0 };
});

function adjustTransform() {
  titles.forEach(title => {
    title.element.style.transform = `translateX(${title.variationValue + title.initialX}%)`;
    title.element.querySelector('span').style.transform = `rotate(calc(${title.variationValue} * 3.6deg))`; // Add this line
  });
}

function animate() {
  const st = window.pageYOffset || document.documentElement.scrollTop;
  const currentTime = Date.now();
  let speed = Math.abs(st - lastScrollTop) / (currentTime - lastTime); // speed in pixels per millisecond
  if (st > lastScrollTop) {
    // downscroll
    lastDirection = 1;
  } else if (st < lastScrollTop) {
    // upscroll
    lastDirection = -1;
  } else {
    // no scroll
    speed = 0.01; // adjust this value as needed
  }

  titles.forEach(title => {
    title.variationValue = (title.variationValue + speed * 20 * lastDirection) % 100; // adjust the multiplier as needed
    if (title.variationValue >= 2) {
      title.variationValue = -100;
    } else if (title.variationValue <= -198) {
      title.variationValue = -100;
    }

    // If the element has moved out of the viewport, reset its position
    const rect = title.element.getBoundingClientRect();
    if (rect.right < 0) {
      title.initialX += window.innerWidth + rect.width;
    } else if (rect.left > window.innerWidth) {
      title.initialX -= window.innerWidth + rect.width;
    }
  });

  lastScrollTop = st <= 0 ? 0 : st;
  lastTime = currentTime;
  adjustTransform();

  requestAnimationFrame(animate);
}

animate();
