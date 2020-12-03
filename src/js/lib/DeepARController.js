import _ from 'lodash';

const DEFAULT_OPTION = {
  licenseKey:
    'c2e4647f8b20cf32b6e9b87d8f66325bc4d8ab5cc622296e86b014bca9a58eaa2f716aa3327f6d0f',
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
  numberOfFaces: 1
};

export default class DeepARController {
  constructor(canvasEl, canvasWidth, canvasHeight, option = null) {
    this.canvasEl = canvasEl;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.option = _.assign(DEFAULT_OPTION, option);

    this.deepAR = null;
  }

  init() {
    this.deepAR = DeepAR({
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      licenseKey: this.option.licenseKey,
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
}
