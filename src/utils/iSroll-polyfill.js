/**
 * intro：       iSroll-polyfill
 * description： iSroll-polyfill
 * author：      jufei
 * date：        2017/8/14
 */


const width = document.body.clientWidth;

if(width < 998 && !window.IScroll){
  let scriptElement = document.createElement('script');
  scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/iScroll/5.2.0/iscroll.min.js';
  document.body.appendChild(scriptElement);
}


