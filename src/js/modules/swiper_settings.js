//---SWIPER--------------------------------------------------------------//
//Инициализация Swiper
new Swiper('.image-slider', {
   //Стрелки
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },

   //Навигация - буллеты - текущее положение


   pagination: {
      el: '.swiper-pagination',
      clickable: true,
      //dynamicBullets: true,
      //Тип булеттов 'bullets' or 'progressbar' or 'fraction' or 'custom'
      /*// Кастомные буллеты с цифрами
      type: 'bullets',
      renderBullet: function (index, className) {
         return '<span class="' + className + '">' + (index + 1) + '</span>'
      },
      //Кастомные фракции с цифрами
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
         return ' Фото <span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>'
      },*/
      //Прогрессбар
      //type: 'progressbar',
   },

   //Скролл
   /*
   scrollbar: {
      el: '.swiper-scrollbar',
      //Возможность перетаскивать скролл
      draggable: true,
   },*/

   //Включить/отключить перетаскивание на ПК
   simulateTouch: true,
   //Чувствительность свайпа
   touchRatio: 1,
   //Угол срабатывания свайпа
   touchAngle: 45,
   //Курсор перетаскивания
   grabCursor: true,
   //Переключение при клике на слайд
   slideToClickedSlide: true,

   /*
   //Навигация по хешу
   hashNavigation: {
      //Отслеживать состояние
      watchState: false,
   },*/

   /*
   //Управление клавиатурой
   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown:true,
   },*/

   /*
   //Управление колесом мыши
   mousewheel: {
      enabled: true,
      sensitivity: 1,
      eventsTarget: 'container',
   },*/


   //Автовысота слайдера (по высоте слайда)
   autoHeight: true,

   //Количество слайдов для показа, в т.ч. дробные значения, а также 'auto'
   slidesPerView: 1,

   //Отключение функционала, если слайдов меньше, чем нужно
   watchOverflow: true,

   //Отступ между слайдами
   spaceBetween: 0,

   //Количество пролистываемых слайдов
   slidesPerGroup: 1,

   //Активный слайд по центру
   centeredSlides: true,

   //Стартовый слайд (счёт как обчно с нуля)
   initialSlide: 0,

   /*
   //Мультирядность (несколько рядов): в css задать высоту слайдера + деление высоты для .swiper-slide на количество рядов, также autoHeight: false 
   grid: {
      rows: 2,
   },*/

   //Бесконечный слайдер
   loop: true,

   /*
   //Свободный режи: хорошо в вертикальном режиме, в компании с mousewheel листает слайды не целиком, а по пикселям
   freeMode: {
      enabled: true,
    },*/

   /*
   //Автопрокрутка слайдов
   autoplay: {
     enabled: true,
     delay: 1000,
     waitForTransition: true,
     disableOnInteraction: false,
     stopOnLastSlide: false,
     reverseDirection: false,
     pauseOnMouseEnter: true
   },*/

   //Скорость переключения слайдов, default = 300
   speed: 1000,

   /*
   //Вертикальный/горизонтальный слайдер, default direction: 'horizontal',
   direction: 'vertical',*/

   /*
   //Эффект переключения слайдов: 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
   effect: 'slide',

   //Дополнения к 'fade'
   fadeEffect: {
     //Параллельная смена прозрачности
     crossFade: true,
   },

   //Дополнения к 'flip'
   flipEffect: {
     slideShadows: true,
     limitRotation: true,
   },

   //Дополнения к'cube'. Лучше ограничить ширину слайдера в css
   cubeEffect: {
     slideShadows: true,
     shadow: true,
     shadowOffset: 20,
     shadowScale: 0.94
   },

  //Дополнения к 'coverflow'
   coverflowEffect: {
     rotate: 50,
     stretch: 0,
     scale: 1,
     modifier: 1,
     slideShadows: true,
   },
   */


   //Брейк-поинты по ширине экрана
   breakpoints: {
      768: {
         slidesPerView: 2,
         spaceBetween: 20
      },
      992: {
         slidesPerView: 3,
         spaceBetween: 30,
         centeredSlides: true,
      },
   },

   /*
   //Lazy loading: отключаем предзагрузку картинок. Добавляем классы в html для картинок class="swiper-lazy", а также src="/img/" меняем на data-src="/img/хххх.jpg" 
   preloadImages: false,
   lazy: {
      loadPrevNext: false,
      loadOnTransitionStart: false,
    },
    watchSlidesProgress: true,
    */

   /*
  //Мини-слайдер к основному
  thumbs: {
     swiper: {
        el: '.image-mini-slider',
        slidesPerView: 6,
        spaceBetween: 15,
     }
  },*/

});