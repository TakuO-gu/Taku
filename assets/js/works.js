window.onload = function() {
  setTimeout(function() {
      let elements = document.getElementsByTagName("*");
      for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add("ready");
      }
  }, 1);
};

let startPosition = 0;
let isDragging = false;
const backIndicatorElement = document.querySelector(".back-indicator .circle");

backIndicatorElement.addEventListener("mousedown", function(event) {
  startPosition = event.clientX;
  isDragging = true;
});

document.addEventListener("mousemove", function(event) {
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

document.addEventListener("mouseup", function() {
  if (isDragging) {
      isDragging = false;
      backIndicatorElement.style.transform = "translateX(0px)";
  }
});

window.addEventListener("scroll", function() {
  let mainImage = document.querySelector("#main-image .main-image");
  let windowHeight = window.innerHeight;
  let scrollRatio = window.pageYOffset / windowHeight;
  scrollRatio = Math.min(Math.max(scrollRatio, 0), 1);

  let scale = 1 + 0.1 * scrollRatio;
  mainImage.style.transform = `translateZ(0) scale(${scale})`;
});

document.addEventListener("DOMContentLoaded", function() {
  let gallery = document.querySelector("#showcase .gallery ul");
  let description = document.querySelector("#showcase .description");
  let isMobile = () => window.innerWidth <= 820;
  let isDescriptionInView = () => description.getBoundingClientRect().bottom <= (window.innerHeight || document.documentElement.clientHeight);

  if (isMobile()) {
      gallery.style.overflowY = "hidden";
  }

  window.addEventListener("scroll", function() {
      if (isMobile() && isDescriptionInView()) {
          gallery.style.overflowY = "scroll";
      }
  });

  window.addEventListener("resize", function() {
      if (isMobile()) {
          if (!isDescriptionInView()) {
              gallery.style.overflowY = "hidden";
          }
      } else {
          gallery.style.overflowY = "";
      }
  });
});
