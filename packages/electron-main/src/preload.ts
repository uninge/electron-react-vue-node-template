console.log('starting - from preload.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded - from preload.js');
});

window.addEventListener('load', () => {
  console.log('load - from preload.js', navigator.userAgent);
});
