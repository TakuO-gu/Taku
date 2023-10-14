let parallax1Elements=document.querySelectorAll(".parallax1"),parallax2Elements=document.querySelectorAll(".parallax2"),parallax3Elements=document.querySelectorAll(".parallax3");function parallaxEffect(){let e=window.pageYOffset;parallax1Elements.forEach(t=>{t.style.transform="translateY("+-1*e+"px)"}),parallax2Elements.forEach(t=>{t.style.transform="translateY("+.9*e+"px)"}),parallax3Elements.forEach(t=>{t.style.transform="translateY("+-.5*e+"px)"})}function throttle(e,t){let l,a;return function(){let o=this,i=arguments;a?(clearTimeout(l),l=setTimeout(function(){Date.now()-a>=t&&(e.apply(o,i),a=Date.now())},t-(Date.now()-a))):(e.apply(o,i),a=Date.now())}}window.addEventListener("scroll",throttle(parallaxEffect,60));
let philosophyItems=document.querySelectorAll("#philosophy .myPhilosophy li");
function adjustVisibility(){philosophyItems.forEach(e=>{let t=e.getBoundingClientRect(),l=t.top+t.height/2,a=window.innerHeight;l>.3*a&&l<.7*a?e.classList.add("blurDetached"):e.classList.remove("blurDetached")})}window.addEventListener("scroll",throttle(adjustVisibility,180)),document.addEventListener("DOMContentLoaded",function(){"scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo(0,0);let e=!1,t=t=>{e||t.preventDefault()};
window.addEventListener("wheel",t,{passive:!1}),window.addEventListener("touchmove",t,{passive:!1}),window.addEventListener("keydown",function(t){[32,33,34,35,36,37,38,39,40].includes(t.keyCode)&&!e&&t.preventDefault()},{passive:!1});var l=document.querySelector("#hero button");l.addEventListener("click",function(){l.classList.add("fade-in"),document.querySelector("body").classList.add("fade-out"),document.querySelector("#hero").classList.add("fade-in"),e=!0});var a=window.pageYOffset||document.documentElement.scrollTop;window.onscroll=function(){var e=window.pageYOffset||document.documentElement.scrollTop,t=document.querySelector(".ImAGraphicDesigner"),l=document.querySelector("#hero .heresMyWorks"),o=parseFloat(t.style.left)||0,i=parseFloat(l.style.left)||0;a<e?(t.style.left=o-2.7+"%",l.style.left=i-1.8+"%"):a>e&&(t.style.left=o+2.7+"%",l.style.left=i+1.8+"%"),a=e,window.addEventListener("scroll",function(){if(0===window.pageYOffset||0===document.documentElement.scrollTop){var e=document.querySelector(".ImAGraphicDesigner"),t=document.querySelector(".heresMyWorks"),l=.01*(window.pageYOffset||document.documentElement.scrollTop)+"%";e.style.left=l,t.style.left=l}})}});let philosophyMessage=document.querySelector("#philosophy .message"),initialWidth=philosophyMessage?philosophyMessage.getBoundingClientRect().width:0;function adjustMessageWidth(){let e=window.innerHeight;if(window.pageYOffset||document.documentElement.scrollTop,!philosophyMessage)return;let t=philosophyMessage.getBoundingClientRect(),l=t.top,a=t.bottom;l<=0&&a>=0?(philosophyMessage.style.width=initialWidth+(0-l)/(e-0)*(100-initialWidth)+"%",philosophyMessage.style.backgroundColor="rgba(34, 34, 34, 0.9)"):philosophyMessage.style.backgroundColor="rgba(34, 34, 34, 0)"}window.addEventListener("scroll",throttle(adjustMessageWidth,60));let worksWindows=Array.from(document.querySelectorAll("#works .worksWindow .worksWindowBG")),viewportHeight=window.innerHeight,scrollPosition=window.pageYOffset;function updatePositions(){worksWindows.forEach(e=>{let t=e.getBoundingClientRect(),l=(t.top+t.bottom)/(2*viewportHeight);e.style.transform=`translate(-50%, -50%) translate3d(0, ${20-40*l}px, 0)`})}function applyParallax(){let e=window.pageYOffset,t=window.innerHeight;(e!==scrollPosition||t!==viewportHeight)&&(scrollPosition=e,viewportHeight=t,updatePositions()),requestAnimationFrame(applyParallax)}window.addEventListener("scroll",throttle(applyParallax(),300));let lastScrollTop=0,lastTime=Date.now(),lastDirection=0;const titles=Array.from(document.querySelectorAll(".title .reelWrap")).map(e=>{let t=window.getComputedStyle(e);return{element:e,initialX:new WebKitCSSMatrix(t.transform).m41,variationValue:0}});function adjustTransform(){titles.forEach(e=>{let t=e.variationValue+e.initialX;e.element.style.transform=`translateX(${t}%)`,e.element.querySelectorAll("span").forEach(t=>{t.style.transform=`rotate(calc(${e.variationValue} * 3.6deg))`})})}function animate(){let e=window.pageYOffset||document.documentElement.scrollTop,t=Date.now(),l=Math.abs(e-lastScrollTop)/(t-lastTime);e>lastScrollTop?lastDirection=1:e<lastScrollTop?lastDirection=-1:l=.005,titles.forEach(e=>{e.variationValue=e.variationValue+10*l*lastDirection,e.variationValue>=0?e.variationValue=-100:e.variationValue<=-200&&(e.variationValue=-100);let t=e.element.getBoundingClientRect();t.right<0?e.initialX+=window.innerWidth+t.width:t.left>window.innerWidth&&(e.initialX-=window.innerWidth+t.width)}),lastScrollTop=e<=0?0:e,lastTime=t,adjustTransform(),requestAnimationFrame(animate)}animate();