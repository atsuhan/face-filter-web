// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// import 'swiper/swiper-bundle.css';

import DeepARController from '../../lib/DeepARController';

const DEEPAR_OPTION = {
  licenseKey:
    'bbdd2f6213fe94acddaf4b74d2b2d0c5779098c613736b61c7e05264a7b156322906a9fea6da4445',
  effectPaths: ['/lib/deepar/effects/earring_fbx'],
  libPath: '/lib/deepar/',
  segmentationFileName: 'segmentation.zip',
  numberOfFaces: 1
};

// canvas
let isWideView = window.innerWidth > window.innerHeight;
let canvasEl = document.querySelector('#deepar-canvas');
let canvasHeight = window.innerHeight;
let canvasWidth = isWideView
  ? Math.floor(window.innerHeight * 0.66)
  : window.innerWidth;

// deepAR
let deepARController = new DeepARController(
  canvasEl,
  canvasWidth,
  canvasHeight,
  DEEPAR_OPTION
);
deepARController.init();

deepARController.SetVideoStartedEvent(() => {
  let loaderWrapper = document.getElementById('loader-wrapper');
  loaderWrapper.style.display = 'none';
});

deepARController.downloadFaceTrackingModel('/lib/deepar/models-68-extreme.bin');

// carousel
// if (isWideView) {
//   let carousel = document.querySelector('.effect-carousel');
//   carousel.style.width = canvasWidth + 'px';
//   carousel.style.marginLeft = (window.innerWidth - canvasWidth) / 2 + 'px';
// }

// const swiper = new Swiper('.swiper-container', {
//   slidesPerView: 4,
//   spaceBetween: 30,
//   centeredSlides: true,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true
//   }
// });
// swiper.init();

// swiper.on('slideChange', () => {
//   deepAR.switchEffect(0, 'slot', DEEPAR_EFFECTS[swiper.realIndex]);
// });

// swiper.on('tap', event => {
//   swiper.slideTo(event.clickedIndex, 500, true);
// });

// Reference
/*
// Events
deepAR.onCameraPermissionAsked = () => {
  console.log('camera permission asked');
};

deepAR.onCameraPermissionGranted = () => {
  console.log('camera permission granted');
};

deepAR.onCameraPermissionDenied = () => {
  console.log('camera permission denied');
};

deepAR.onScreenshotTaken = (photo) => {
  console.log('screenshot taken');
};

deepAR.onImageVisibilityChanged = (visible) => {
  console.log('image visible', visible);
};

deepAR.onFaceVisibilityChanged = (visible) => {
  console.log('face visible', visible);
};
*/

/*
// EcternalVideo
const startExternalVideo = () => {
  // create video element
  let video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.controls = true;
  video.setAttribute('playsinline', 'playsinline');
  video.style.width = '100%';
  video.style.height = '100%';

  // put it somewhere in the DOM
  let videoContainer = document.createElement('div');
  videoContainer.appendChild(video);
  videoContainer.style.width = '1px';
  videoContainer.style.height = '1px';
  videoContainer.style.position = 'absolute';
  videoContainer.style.top = '0px';
  videoContainer.style.left = '0px';
  videoContainer.style['z-index'] = '-1';
  document.body.appendChild(videoContainer);

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = URL.createObjectURL(stream);
      }

      setTimeout(() => {
        video.play();
      }, 50);
    })
    .catch(error => {});

  // tell the DeepAR SDK about our new video element
  deepAR.setVideoElement(video, true);
};
*/
