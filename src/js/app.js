import * as flsFunction from "./modules/functions.js";
import "./modules/swiper.js";
import "./modules/script.js";
import "./modules/dynamic_adapt.js";
import "./modules/fslightbox.js";

//---[SWIPER Sertifications]--------------------------------------------------------------//
//Инициализация Swiper

if (document.querySelector(".sertifications-main__slider")) {
  new Swiper(".sertifications-main__slider", {
    navigation: {
      nextEl: ".sertifications-main__next",
      prevEl: ".sertifications-main__prev",
    },
    slidesPerView: 3,
    spaceBetween: 25,
    watchOverflow: true,
    speed: 800,
    loop: true,
    pagination: {
      el: ".sertifications-main__dots",
      clickable: true,
      type: "bullets",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        autoHeight: true,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
  });
}

//---[SWIPER Info]--------------------------------------------------------------//

if (document.querySelector(".page-info__slider")) {
  new Swiper(".page-info__slider", {
    navigation: {
      nextEl: ".page-info__next",
      prevEl: ".page-info__prev",
    },
    slidesPerView: 1,
    spaceBetween: 25,
    watchOverflow: true,
    speed: 800,
    loop: true,
    pagination: {
      el: ".page-info__dots",
      clickable: true,
      type: "bullets",
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 1,
        spaceBetween: 25,
      },
    },
  });
}

flsFunction.isWebp();
// flsFunction.menuInit();
// flsFunction.spollers();
// flsFunction.tabs();
// flsFunction.formRating();
// flsFunction.rangeInit();
// flsFunction.formQuantity();

/*
if (document.querySelector(".certifications__slider")) {
  new Swiper(".certifications__slider", {
    navigation: {
      nextEl: ".certifications__arrow-next",
      prevEl: ".certifications__arrow-prev",
    },
    observer: true,
    observerParents: true,
    slidesPerView: 3,
    spaceBetween: 75,
    watchOverflow: true,
    speed: 800,
    loop: true,
    initialSlide: 1,
    autoHeight: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        autoHeight: true,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    autoplay: {
      enabled: true,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: true,
    },
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    pagination: {
      el: ".certifications__dots",
      clickable: true,
      type: "bullets",
    },
    on: {},
  });
}
*/
