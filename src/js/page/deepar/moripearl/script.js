import DeepARController from '@/lib/DeepARController';

const DEEPAR_OPTION = {
  effectPaths: [
    '/lib/deepar/effects/moripearl/earring_tex',
    '/lib/deepar/effects/moripearl/earring_fbx',
    '/lib/deepar/effects/moripearl/neckrace01',
    '/lib/deepar/effects/moripearl/neckrace02'
  ]
};

// elements
let canvasEl = document.querySelector('#deepar-canvas');
let carouselEl = document.querySelector('.effect-carousel');
let loaderWrapperEl = document.getElementById('loader-wrapper');

// effect size
let isWideView = window.innerWidth > window.innerHeight;
let effectHeight = window.innerHeight;
let effectWidth = isWideView
  ? Math.floor(window.innerHeight * 0.66)
  : window.innerWidth;

// deepAR
let deepARController = new DeepARController(
  canvasEl,
  effectWidth,
  effectHeight,
  DEEPAR_OPTION
);
deepARController.SetVideoStartedEvent(() => {
  loaderWrapperEl.style.display = 'none';
});
deepARController.downloadFaceTrackingModel('/lib/deepar/models-68-extreme.bin');

// carousel
if (isWideView) {
  carouselEl.style.width = effectWidth + 'px';
  carouselEl.style.marginLeft = (window.innerWidth - effectWidth) / 2 + 'px';
}

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
swiper.init();

swiper.on('slideChange', () => {
  deepARController.switchEffect(swiper.realIndex);
});

swiper.on('tap', event => {
  swiper.slideTo(event.clickedIndex, 500, true);
});
