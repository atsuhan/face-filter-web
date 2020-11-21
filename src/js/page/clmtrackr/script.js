import WebCamVideo from '../../lib/WebCamVideo';
//import { clm } from 'clmtrackr';

const width = window.innerWidth;
const height = (window.innerWidth * 9) / 16;
const canvasEl = document.querySelector('#canvas');
const videoEl = document.querySelector('#video');

// web cam video
const webCamOption = {
  video: true
};
const webCamVideo = new WebCamVideo(videoEl, webCamOption);
webCamVideo.init();
webCamVideo.setSize(width, height);

canvasEl.width = width;
canvasEl.height = height;
const context = canvasEl.getContext('2d');

// clmtrackr
console.log(clm);
const tracker = new clm.tracker();
tracker.init();
tracker.start(videoEl);

const loop = () => {
  requestAnimationFrame(loop);

  const positions = tracker.getCurrentPosition();
  console.log(positions);
  context.clearRect(0, 0, canvasEl.width, canvasEl.height);
  tracker.draw(canvasEl);
};

window.addEventListener('load', loop);
