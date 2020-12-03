import _ from 'lodash';

const DEFAULT_OPTION = {
  licenseKeys: [
    {
      host: 'localhost',
      key:
        'bbdd2f6213fe94acddaf4b74d2b2d0c5779098c613736b61c7e05264a7b156322906a9fea6da4445'
    },
    {
      host: 'facefilterdemo.netlify.app',
      key:
        '0d733c66bbb67c716e9d8ba7a2c675c23377efb36e20f9ce9f3df0fe56b5bb4a05e58e032200b800'
    },
    {
      host: 'facefilterdemo-5ab12.web.app',
      key:
        'abace15fcc1d0265c09491a71e08d813515701ec444299ef4c93cd62ec73a6571ed8dd8f2b6ea4fd'
    }
  ],
  effectPaths: [
    '/lib/deepar/effects/samples/background_segmentation',
    '/lib/deepar/effects/samples/aviators',
    '/lib/deepar/effects/samples/beard',
    '/lib/deepar/effects/samples/dalmatian',
    '/lib/deepar/effects/samples/flowers',
    '/lib/deepar/effects/samples/koala',
    '/lib/deepar/effects/samples/lion',
    '/lib/deepar/effects/samples/teddycigar'
  ],
  libPath: '/lib/deepar/',
  segmentationFileName: 'segmentation.zip',
  numberOfFaces: 1,
  width: null,
  height: null
};

export default class DeepARController {
  constructor(canvasEl, width, height, option = null) {
    this.canvasEl = canvasEl;
    this.width = width;
    this.height = height;
    this.option = _.assign(DEFAULT_OPTION, option);

    this.key = this.GetTargetKey();
    console.log(this.key);

    this.deepAR = DeepAR({
      canvasWidth: this.width,
      canvasHeight: this.height,
      licenseKey: this.key,
      canvas: this.canvasEl,
      numberOfFaces: this.option.numberOfFaces,
      libPath: this.option.libPath,
      segmentationInfoZip: this.option.segmentationFileName,

      onInitialize: () => {
        this.deepAR.startVideo(true);
        this.deepAR.switchEffect(0, 'slot', this.option.effectPaths[0], () => {
          // effect loaded
        });
      }
    });
  }

  GetTargetKey() {
    const targetIndex = _.findIndex(this.option.licenseKeys, data => {
      return data.host === location.hostname;
    });

    return this.option.licenseKeys[targetIndex].key;
  }

  SetVideoStartedEvent(callback) {
    this.deepAR.onVideoStarted = callback;
  }

  downloadFaceTrackingModel(path) {
    this.deepAR.downloadFaceTrackingModel(path);
  }

  setSize(width, height) {
    this.videoEl.width = width;
    this.videoEl.height = height;
  }

  switchEffect(effectIndex) {
    this.deepAR.switchEffect(0, 'slot', this.option.effectPaths[effectIndex]);
  }
}

// deeparReference
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
