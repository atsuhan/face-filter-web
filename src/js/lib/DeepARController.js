import _ from 'lodash';

const DEFAULT_OPTION = {
  licenseKey:
    'bbdd2f6213fe94acddaf4b74d2b2d0c5779098c613736b61c7e05264a7b156322906a9fea6da4445',
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

    this.deepAR = DeepAR({
      canvasWidth: this.width,
      canvasHeight: this.height,
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

  switchEffect(effectIndex) {
    this.deepAR.switchEffect(0, 'slot', DEEPAR_EFFECTS[effectIndex]);
  }
}
