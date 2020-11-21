import _ from 'lodash';

const defaultOption = {
  video: true,
  audio: false
};

export default class UserMedia {
  constructor(videoEl, option = null) {
    this.videoEl = videoEl;
    this.option = _.assign(defaultOption, option);
  }

  init() {
    navigator.getUserMedia(
      this.option,
      stream => {
        this.videoEl.srcObject = stream;
        this.videoEl.addEventListener('loadeddata', () => {});
      },
      error => {
        console.log(error);
      }
    );
  }

  setSize(width, height) {
    this.videoEl.width = width;
    this.videoEl.height = height;
  }
}
