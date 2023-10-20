// 新しい関数を定義して、既存のすべてのスクロール関連の操作を含めます。
function handleScrollEvent() {
  parallaxEffect();
  adjustVisibility();
  adjustMessageWidth();
  updatePositions(); // これはapplyParallaxの中から抽出したもので、applyParallax自体は不要になります。
  // 他のスクロールに関連する関数があれば、ここに追加します。
}

// スクロールイベントに新しい関数を登録します。
window.addEventListener("scroll", handleScrollEvent);

let parallax1Elements = document.querySelectorAll(".parallax1"),
  parallax2Elements = document.querySelectorAll(".parallax2"),
  parallax3Elements = document.querySelectorAll(".parallax3");

function parallaxEffect() {
  let t = window.pageYOffset,
      l = window.matchMedia("(max-width: 768px)"),
      a = l.matches ? -.5 : -1;
  parallax1Elements.forEach(l => {
      l.style.transform = "translateY(" + a * t + "px)"
  }), parallax2Elements.forEach(l => {
      l.style.transform = "translateY(" + .9 * t + "px)"
  }), parallax3Elements.forEach(l => {
      l.style.transform = "translateY(" + -.5 * t + "px)"
  })
}
//window.addEventListener("scroll", parallaxEffect);
let philosophyItems = document.querySelectorAll("#philosophy .myPhilosophy li");

function adjustVisibility() {
  philosophyItems.forEach(t => {
      let l = t.getBoundingClientRect(),
          a = l.top + l.height / 2,
          o = window.innerHeight;
      a > .3 * o && a < .7 * o ? t.classList.add("blurDetached") : t.classList.remove("blurDetached")
  })
}
let isFirstLoad = !0;
// window.addEventListener("scroll", adjustVisibility), 
document.addEventListener("DOMContentLoaded", () => {
  const heroButton = document.querySelector("#hero button");
  const hero = document.querySelector("#hero");
  const body = document.body; // 短縮バージョンを使用
  const designerElement = document.querySelector(".ImAGraphicDesigner");
  const worksElement = document.querySelector("#hero .heresMyWorks");
  const isBack = sessionStorage.getItem("isBack");
  let lastScrollTop = 0;

  const toggleScrollRestriction = (restrict) => {
    body.style.overflow = restrict ? 'hidden' : '';
  };

  const updateElementPosition = (element, delta) => {
    if (element) { // elementがnullでないことを確認
      const currentLeft = parseFloat(element.style.left) || 0;
      element.style.left = `${currentLeft + delta}%`;
    }
  };

  // スクロール制限の初期状態の設定と、ページが再訪された場合の動作
  if (isBack) {
    heroButton.style.display = 'none';
    hero.classList.add("fade-in");
    body.classList.add("fade-out");
    toggleScrollRestriction(false);
  } else {
    toggleScrollRestriction(true);
  }

  heroButton.addEventListener("click", () => {
    [heroButton, hero, body].forEach(el => el.classList.add("fade-in", "fade-out")); // ループを使用してクラスを追加
    toggleScrollRestriction(false);
    sessionStorage.setItem("isBack", "true");
  });

  window.addEventListener("scroll", () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollTop > lastScrollTop ? -2.7 : 2.7;
  
    // スクロールが一番上にある場合、要素を初期位置に戻します。
    if (currentScrollTop === 0) {
      if (designerElement) {
        designerElement.style.left = ''; // 初期位置に戻すため、leftプロパティをリセット
      }
      if (worksElement) {
        worksElement.style.left = ''; // 初期位置に戻すため、leftプロパティをリセット
      }
    } else {
      // そうでない場合は、要素の位置を更新します。
      updateElementPosition(designerElement, scrollDelta);
      updateElementPosition(worksElement, scrollDelta / 1.5); // 2.7 / 1.8 = 1.5
    }
  
    lastScrollTop = currentScrollTop;
  });  
});

let philosophyMessage = document.querySelector("#philosophy .message"),
  initialWidth = philosophyMessage ? philosophyMessage.getBoundingClientRect().width : 0;

function adjustMessageWidth() {
  let t = window.innerHeight;
  if (window.pageYOffset || document.documentElement.scrollTop, !philosophyMessage) return;
  let l = philosophyMessage.getBoundingClientRect(),
      a = l.top,
      o = l.bottom;
  a <= 0 && o >= 0 ? (philosophyMessage.style.width = initialWidth + (0 - a) / (t - 0) * (100 - initialWidth) + "%", philosophyMessage.style.backgroundColor = "rgba(34, 34, 34, 0.9)") : philosophyMessage.style.backgroundColor = "rgba(34, 34, 34, 0)"
}
//window.addEventListener("scroll", adjustMessageWidth);
let worksWindows = Array.from(document.querySelectorAll("#works .worksWindow .worksWindowBG")),
  viewportHeight = window.innerHeight,
  scrollPosition = window.pageYOffset;

  function updatePositions(){
    worksWindows.forEach(t=>{
        let l=t.getBoundingClientRect(),
            a=(l.top + l.bottom) / (2 * viewportHeight);
        // 'a' の範囲を -1 から 1 に調整します。
        a = 2 * a - 1;
        // 'a' の範囲を -60 から 60 にスケーリングします。
        a = a * -20; 
        t.style.transform=`translate(-50%, -50%) translate3d(0, ${a}px, 0)`;
    })
}

/*function applyParallax() {
  let t = window.pageYOffset,
      l = window.innerHeight;
  (t !== scrollPosition || l !== viewportHeight) && (scrollPosition = t, viewportHeight = l, updatePositions()), requestAnimationFrame(applyParallax)
} */
//window.addEventListener("scroll", applyParallax);


let lastScrollTop = 0,
  lastTime = Date.now(),
  lastDirection = 0;
const titles = Array.from(document.querySelectorAll(".title .reelWrap")).map(t => {
  let l = window.getComputedStyle(t);
  return {
      element: t,
      initialX: new WebKitCSSMatrix(l.transform).m41,
      variationValue: 0
  }
});

function adjustTransform() {
  titles.forEach(t => {
      let l = t.variationValue + t.initialX;
      t.element.style.transform = `translateX(${l}%)`, t.element.querySelectorAll("span").forEach(l => {
          l.style.transform = `rotate(calc(${t.variationValue} * 3.6deg))`
      })
  })
}

function animate() {
  let e = window.pageYOffset || document.documentElement.scrollTop,
      t = Date.now(),
      l = Math.abs(e - lastScrollTop) / (t - lastTime);
  e > lastScrollTop ? lastDirection = 1 : e < lastScrollTop ? lastDirection = -1 : l = .005;

  // ウィンドウの幅に基づいて変化量を調整
  const changeRate = window.innerWidth <= 820 ? 1 : 10; // 画面幅が820px以下の場合、変化量を10分の1にする

  titles.forEach(e => {
      // 変化量の計算にchangeRateを使用
      e.variationValue = e.variationValue + changeRate * l * lastDirection;
      e.variationValue >= 0 ? e.variationValue = -100 : e.variationValue <= -200 && (e.variationValue = -100);

      let t = e.element.getBoundingClientRect();
      t.right < 0 ? e.initialX += window.innerWidth + t.width : t.left > window.innerWidth && (e.initialX -= window.innerWidth + t.width)
  });

  lastScrollTop = e <= 0 ? 0 : e, lastTime = t, adjustTransform(), requestAnimationFrame(animate)
}

animate();
