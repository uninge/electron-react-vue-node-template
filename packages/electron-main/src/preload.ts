console.info('starting - from preload.js');

document.addEventListener('DOMContentLoaded', () => {
	console.info('DOMContentLoaded - from preload.js');
});

window.addEventListener('load', () => {
	console.info('load - from preload.js', navigator.userAgent);
});
