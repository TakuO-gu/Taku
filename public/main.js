// parallax効果
window.addEventListener('scroll', function () {
  // parallax effect
  let scrollPosition = window.pageYOffset;

  let parallax1Elements = document.querySelectorAll('.parallax1');
  parallax1Elements.forEach((element) => {
    element.style.transform = 'translateY(' + scrollPosition * -1 + 'px)';
  });

  let parallax2Elements = document.querySelectorAll('.parallax2');
  parallax2Elements.forEach((element) => {
    element.style.transform = 'translateY(' + scrollPosition * 0.9 + 'px)';
  });

  let parallax3Elements = document.querySelectorAll('.parallax3');
  parallax3Elements.forEach((element) => {
    element.style.transform = 'translateY(' + scrollPosition * -0.5 + 'px)';
  });
});


// philosophyのliが画面真ん中ら辺にくるとくっきりと見える動作
window.addEventListener('scroll', function () {
  let philosophyItems = document.querySelectorAll('#philosophy .myPhilosophy li');
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
});

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
      img1.style.left = (img1Left - 0.8) + '%';
      img2.style.left = (img2Left - 0.5) + '%';
    } else if (lastScrollTop > currentScrollTop) {
      // Scroll up
      img1.style.left = (img1Left + 0.8) + '%';
      img2.style.left = (img2Left + 0.5) + '%';
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
document.addEventListener('DOMContentLoaded', function () {
  const philosophyMessage = document.querySelector('#philosophy .message');
  if (!philosophyMessage) return;

  const initialWidth = philosophyMessage.getBoundingClientRect().width;

  window.addEventListener('scroll', function () {
    // Get the viewport height
    const viewportHeight = window.innerHeight;

    // Get the current scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

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
  });
});


// worksWindowBGパララックス
let worksWindows = document.querySelectorAll('#works .worksWindow .worksWindowBG');

function applyParallax() {
  let scrollPosition = window.pageYOffset;
  let viewportHeight = window.innerHeight;

  worksWindows.forEach((windowBG) => {
    let rect = windowBG.getBoundingClientRect();
    let elementTop = rect.top;
    let elementBottom = rect.bottom;

    // Calculate the position of the element in the viewport (0 = top, 1 = bottom)
    let positionInViewport = (elementTop + elementBottom) / (2 * viewportHeight);

    // Scale the position to the range -60 to 60
    let transformValue = 80 - positionInViewport * 160;

    // Apply the transformation
    windowBG.style.transform = `translate(-50%, -50%) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${transformValue}, 0, 1)`;
  });

  // Continue to apply the parallax effect on the next frame
  requestAnimationFrame(applyParallax);
}

// Start applying the parallax effect
applyParallax();



// .titleが流れ続けるアニメーション

function throttle(func, timeFrame) {
  var lastTime = 0;
  return function (...args) {
      var now = Date.now();
      if (now - lastTime >= timeFrame) {
          func(...args);
          lastTime = now;
      }
  };
}

let lastScrollTop = 0;
let lastTime = Date.now();
let lastDirection = 0; // 1 for downscroll, -1 for upscroll
const titles = Array.from(document.querySelectorAll('.title')).map(title => {
  const style = window.getComputedStyle(title);
  const matrix = new WebKitCSSMatrix(style.transform);
  return { element: title, initialX: matrix.m41, inViewport: false, variationValue: 0 };
});

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const offset = window.innerHeight * 0.5; // 50vh offset
  return (
      rect.top < window.innerHeight + offset && rect.bottom >= -offset
  );
}

function adjustTransform() {
  titles.forEach(title => {
      if (isInViewport(title.element)) {
          if (!title.inViewport) {
              // Reset scroll information when the element enters the viewport
              lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
              lastTime = Date.now();
              title.variationValue = 0;
              title.inViewport = true;
          }
          title.element.style.transform = `translate3d(${title.initialX + title.variationValue}px, 0, 0)`;
      } else {
          title.inViewport = false;
      }
  });
}

function animate() {
  const st = window.pageYOffset || document.documentElement.scrollTop;
  const currentTime = Date.now();
  let speed = Math.abs(st - lastScrollTop) / (currentTime - lastTime); // speed in pixels per millisecond

  if (st > lastScrollTop){
      // downscroll
      lastDirection = 1;
  } else if (st < lastScrollTop) {
      // upscroll
      lastDirection = -1;
  } else {
      // no scroll
      speed = 0.05; // adjust this value as needed
  }

  titles.forEach(title => {
      title.variationValue += speed * 100 * lastDirection; // adjust the multiplier as needed

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
}

// Throttle the animate function to run at most once every 100ms
const throttledAnimate = throttle(animate, 100);

throttledAnimate();
