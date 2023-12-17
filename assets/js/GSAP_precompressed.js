// GSAPとScrollTriggerプラグインを読み込みます
gsap.registerPlugin(ScrollTrigger);

// parallax1,3へのアニメーション
// 画面幅に応じてparallax1Elementsの速度を設定する関数
gsap.to(".backgroundImages", {
    yPercent: -100,
    ease: "none",
    scrollTrigger: {
      trigger: ".backgroundImages",
      start: "top bottom", // 要素がビューポートの下に来たときにアニメーションを開始
      end: "bottom top", // 要素がビューポートの上に行ったときにアニメーションを終了
      scrub: true // スムーズなスクロール効果
    }
});

gsap.to(".decStatement", {
    yPercent: -200,
    ease: "none",
    scrollTrigger: {
      trigger: ".decStatement",
      start: "top bottom", // 要素がビューポートの下に来たときにアニメーションを開始
      end: "bottom top", // 要素がビューポートの上に行ったときにアニメーションを終了
      scrub: true, // スムーズなスクロール効果
    }
});

gsap.to(".ImAGraphicDesigner", {
  x: () => - window.innerWidth / 2,
  scrollTrigger: {
    trigger: ".ImAGraphicDesigner",
    start: "top 6%",
    end: "bottom top",
    scrub: true,
  }
});

gsap.to(".heresMyWorks", {
  x: () => - window.innerWidth / 6,
  scrollTrigger: {
    trigger: ".heresMyWorks",
    start: "top 32%",
    end: "bottom top",
    scrub: true,
  }
});

//#philosophy .myPhilosophy liへのアニメーション
document.querySelectorAll("#philosophy .myPhilosophy li").forEach(li => {
  ScrollTrigger.create({
    trigger: li,
    start: "top 70%",
    end: "bottom 30%",
    onToggle: self => self.isActive ? li.classList.add("blurDetached") : li.classList.remove("blurDetached")
  });
});

// #hero buttonへのアニメーション
document.addEventListener("DOMContentLoaded", () => {
  const heroButton = document.querySelector("#hero button");
  const hero = document.querySelector("#hero");
  const body = document.body; // 短縮バージョンを使用
  const isBack = sessionStorage.getItem("isBack");

  const toggleScrollRestriction = (restrict) => {
    body.style.overflow = restrict ? 'hidden' : '';
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
});

let philosophyMessage = document.querySelector("#philosophy .message");
if (philosophyMessage) {
  let initialWidth = philosophyMessage.getBoundingClientRect().width;

  ScrollTrigger.create({
    trigger: philosophyMessage,
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
      let progress = self.progress,
          windowHeight = window.innerHeight,
          rect = philosophyMessage.getBoundingClientRect(),
          top = rect.top,
          bottom = rect.bottom;

      if (top <= 0 && bottom >= 0) {
        let newWidth = initialWidth + (0 - top) / (windowHeight - 0) * (100 - initialWidth);
        gsap.to(philosophyMessage, {
          width: newWidth + "%",
          backgroundColor: "rgba(34, 34, 34, 0.9)",
          immediateRender: false
        });
      } else {
        gsap.to(philosophyMessage, {
          backgroundColor: "rgba(34, 34, 34, 0)",
          immediateRender: false
        });
      }
    }
  });
}

// #works .worksWindowへのアニメーション

// #works要素内の.worksWindowBGクラスを持つ全ての要素を取得
let worksWindows = gsap.utils.toArray("#works .worksWindowBG");

// worksWindowsの各要素に対してループを行い、ScrollTriggerを作成
worksWindows.forEach(windowBG => {
  ScrollTrigger.create({
    trigger: windowBG,
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
      let rect = windowBG.getBoundingClientRect(),
          windowHeight = window.innerHeight,
          center = (rect.top + rect.bottom) / 2,
          distanceFromCenter = (center - windowHeight / 2) / windowHeight,
          scaledDistance = distanceFromCenter * -2, // -1から1の範囲に調整
          transformValue = scaledDistance * 20; // -20から20の範囲にスケーリング

      gsap.to(windowBG, {
        y: transformValue,
        immediateRender: false
      });
    }
  });
});

let xPercent = 0;
let direction = -1;
const titles = document.querySelectorAll('.title');
const reelWraps = document.querySelectorAll('.reelWrap');
const circles = document.querySelectorAll('.circle');
const circleContainers = document.querySelectorAll('.circleContainer');
const works = document.querySelector('#works');

// スクロールトリガーの設定
window.onload = function() {
  reelWraps.forEach(reelWrap => {
    gsap.to(reelWrap, {
      x:"-500px",
      scrollTrigger: {
        trigger: reelWrap,
        scrub: 0.5,
        start: "top bottom",
        end:  "bottom top",
        onUpdate: e => {
          direction = e.direction * -1;
        },
      },
    })}),
  circleContainers.forEach(circleContainer => {
    gsap.to(circleContainer, {
      rotation: -360,
      scrollTrigger: {
        trigger: circleContainer,
        scrub: 0.5,
        start: "top bottom",
        end: "bottom top"
      }
    });
    console.log(circleContainer.degree)
  });
  animate();
}

// アニメーション関数
const animate = () => {
  if(xPercent < -100){
    xPercent = 0;
  }
  else if(xPercent > 0){
    xPercent = -100;
  }
  reelWraps.forEach(reelWrap => {
    gsap.set(reelWrap, {xPercent: xPercent});
  });
  circles.forEach(circle => {
    gsap.set(circle, {rotation: xPercent * 3.6});
  });
  requestAnimationFrame(animate);
  xPercent += 0.05 * direction;
};