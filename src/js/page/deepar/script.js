// DeepAR constants
const DEEPAR_LICENSE_KEY =
  'c2e4647f8b20cf32b6e9b87d8f66325bc4d8ab5cc622296e86b014bca9a58eaa2f716aa3327f6d0f';
const DEEPAR_EFFECTS = [
  '/lib/deepar/effects/background_segmentation',
  '/lib/deepar/effects/aviators',
  '/lib/deepar/effects/beard',
  '/lib/deepar/effects/dalmatian',
  '/lib/deepar/effects/flowers',
  '/lib/deepar/effects/koala',
  '/lib/deepar/effects/lion',
  '/lib/deepar/effects/teddycigar'
];
const DEEPAR_LIB_PATH = '/lib/deepar/';
const SEGMENTATION_INFO_ZIP_FILENAME = 'segmentation.zip';
const NUMBER_OF_FACE = 1;

// canvas
let isWideView = window.innerWidth > window.innerHeight;
let canvasEl = document.querySelector('#deepar-canvas');
let canvasHeight = window.innerHeight;
let canvasWidth = isWideView
  ? Math.floor(window.innerHeight * 0.66)
  : window.innerWidth;

// deepAR
let deepAR = DeepAR({
  canvasWidth: canvasWidth,
  canvasHeight: canvasHeight,
  licenseKey: DEEPAR_LICENSE_KEY,
  canvas: canvasEl,
  numberOfFaces: NUMBER_OF_FACE,
  libPath: DEEPAR_LIB_PATH,
  segmentationInfoZip: SEGMENTATION_INFO_ZIP_FILENAME,
  onInitialize: () => {
    // start video immediately after the initalization, mirror = true
    deepAR.startVideo(true);

    // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)
    deepAR.switchEffect(0, 'slot', DEEPAR_EFFECTS[0], () => {
      // effect loaded
    });
  }
});

deepAR.onVideoStarted = () => {
  let loaderWrapper = document.getElementById('loader-wrapper');
  loaderWrapper.style.display = 'none';
};

deepAR.downloadFaceTrackingModel('/lib/deepar/models-68-extreme.bin');

// carousel
if (isWideView) {
  let carousel = document.querySelector('.effect-carousel');
  carousel.style.width = canvasWidth + 'px';
  carousel.style.marginLeft = (window.innerWidth - canvasWidth) / 2 + 'px';
}

$(document).ready(() => {
  $('.effect-carousel').slick({
    slidesToShow: 1,
    centerMode: true,
    focusOnSelect: true,
    arrows: true,
    accessibility: false,
    variableWidth: true
  });

  $('.effect-carousel').on('afterChange', (event, slick, currentSlide) => {
    deepAR.switchEffect(0, 'slot', DEEPAR_EFFECTS[currentSlide]);
  });
});


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