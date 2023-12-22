window.onload = function () {
  setTimeout(function () {
    let elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("ready");
    }
  }, 1);
};

let startPosition = 0;
let isDragging = false;
const backIndicatorElement = document.querySelector(".back-indicator .circle");

backIndicatorElement.addEventListener("mousedown", function (event) {
  startPosition = event.clientX;
  isDragging = true;
});

document.addEventListener("mousemove", function (event) {
  if (isDragging) {
    event.preventDefault();
    let displacement = event.clientX - startPosition;
    backIndicatorElement.style.transform = `translateX(${displacement}px)`;

    let threshold = 0.2 * window.innerWidth;
    if (displacement > threshold) {
      window.history.back();
    }
  }
});

document.addEventListener("mouseup", function () {
  if (isDragging) {
    isDragging = false;
    backIndicatorElement.style.transform = "translateX(0px)";
  }
});

window.addEventListener("scroll", function () {
  let mainImage = document.querySelector("#main-image .main-image");
  let windowHeight = window.innerHeight;
  let scrollRatio = window.pageYOffset / windowHeight;
  scrollRatio = Math.min(Math.max(scrollRatio, 0), 1);

  let scale = 1 + 0.1 * scrollRatio;
  mainImage.style.transform = `translateZ(0) scale(${scale})`;
});

// 最後の子要素を取得
let ulElement = document.querySelector("#showcase .gallery ul");
let galleryElement = document.querySelector("#showcase .gallery");
let lastChild = ulElement.lastElementChild;

// Intersection Observerのコールバック
let observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 要素がビューポート内にある場合、.lastChildAppearedを追加
      galleryElement.classList.add("lastChildAppeared");
    } else {
      // 要素がビューポートから外れた場合、.lastChildAppearedを削除
      galleryElement.classList.remove("lastChildAppeared");
    }
  });
};

// Intersection Observerのオプション
let options = {
  root: null, // ビューポートをルートとする
  rootMargin: "0px",
  threshold: 0.1, // 少しでも表示されたらトリガー
};

// Intersection Observerの作成
let observer = new IntersectionObserver(observerCallback, options);

// 最後の子要素を監視
observer.observe(lastChild);
