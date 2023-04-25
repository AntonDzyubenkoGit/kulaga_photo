// Проверка поддержки .webp изображений в браузере, добавление класса webp или no-webp для HTML
export function isWebp() {
  // Проверка поддержки webp
  function testWebp(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

//======================================================================================================================
/* Вспомогательные модули блокировки прокрутки и скочка */
//======================================================================================================================

export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains("lock")) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
export let bodyUnlock = (delay = 500) => {
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll("[data-lp]");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = "0px";
      }
      body.style.paddingRight = "0px";
      document.documentElement.classList.remove("lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
export let bodyLock = (delay = 500) => {
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll("[data-lp]");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    }
    body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    document.documentElement.classList.add("lock");

    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

//======================================================================================================================
/* Модуль работы с меню (бургер)*/
//======================================================================================================================

export function menuInit() {
  let iconMenu = document.querySelector(".icon-menu");
  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      if (bodyLockStatus) {
        bodyLockToggle();
        document.documentElement.classList.toggle("menu-open");
        // Далее два if добавлены при верстке макета
        if (document.documentElement.classList.contains("catalog-open")) {
          document.documentElement.classList.remove("catalog-open");
        }
        if (document.documentElement.classList.contains("sub-menu-open")) {
          document.documentElement.classList.remove("sub-menu-open");
        }
      }
    });
  }
}
export function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
export function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

//======================================================================================================================
/* Вспомогательные модули плавного расскрытия и закрытия объекта */
//======================================================================================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent("slideUpDone", {
          detail: {
            target: target,
          },
        })
      );
    }, duration);
  }
};
export let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent("slideDownDone", {
          detail: {
            target: target,
          },
        })
      );
    }, duration);
  }
};
export let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

//======================================================================================================================
/* Модуль работы со спойлерами */
//======================================================================================================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

export function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }

    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item) => item.closest("[data-spollers]") === spollersBlock);
        spollerTitles.forEach((spollerTitle) => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");
        const spollersBlock = spollerTitle.closest("[data-spollers]");
        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle("_spoller-active");
          _slideToggle(spollerTitle.nextElementSibling, 500);
        }
        e.preventDefault();
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    }
  }
}

//======================================================================================================================
/* Модуь работы с табами */
//======================================================================================================================
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
export function tabs() {
  const tabs = document.querySelectorAll("[data-tabs]");
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith("tab-")) {
      tabsActiveHash = hash.replace("tab-", "").split("-");
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add("_tab-init");
      tabsBlock.setAttribute("data-tabs-index", index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach((tabsMediaItem) => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
      let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
      let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
      let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
      tabsTitleItems = Array.from(tabsTitleItems).filter((item) => item.closest("[data-tabs]") === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter((item) => item.closest("[data-tabs]") === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add("_tab-spoller");
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove("_tab-spoller");
        }
      });
    });
  }
  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
      tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-tabs]") === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-tabs]") === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute("data-tabs-title", "");
        tabsContentItem.setAttribute("data-tabs-item", "");

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add("_tab-active");
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute("data-tabs-animate")) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute("data-tabs-hash");
      tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-tabs]") === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-tabs]") === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains("_tab-active")) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest(".popup")) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest("[data-tabs-title]")) {
      const tabTitle = el.closest("[data-tabs-title]");
      const tabsBlock = tabTitle.closest("[data-tabs]");
      if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
        tabActiveTitle.length ? (tabActiveTitle = Array.from(tabActiveTitle).filter((item) => item.closest("[data-tabs]") === tabsBlock)) : null;
        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
        tabTitle.classList.add("_tab-active");
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}

//======================================================================================================================
/* Прочие полезные функции */
//======================================================================================================================

// FLS (Full Logging System)
export function FLS(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
}
// Получить цифры из строки
export function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ""));
}
// Форматирование цифр типа 100 000 000
export function getDigFormat(item) {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}
// Уникализация массива
export function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}
// Функция получения индекса внутри родителя
export function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}
// Обработа медиа запросов из атрибутов
export function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(",")[0];
    }
  });
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach((item) => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        });
      });
      return mdQueriesArray;
    }
  }
}

//======================================================================================================================
/* Модуь звездного рейтинга */
//======================================================================================================================
export function formRating() {
  const ratings = document.querySelectorAll(".rating");
  if (ratings.length > 0) {
    initRatings();
  }
  // Основная функция
  function initRatings() {
    let ratingActive, ratingValue;
    // "Бегаем" по всем рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }
    // Инициализируем конкретный рейтинг
    function initRating(rating) {
      initRatingVars(rating);

      setRatingActiveWidth();

      if (rating.classList.contains("rating_set")) {
        setRating(rating);
      }
    }
    // Инициализайция переменных
    function initRatingVars(rating) {
      ratingActive = rating.querySelector(".rating__active");
      ratingValue = rating.querySelector(".rating__value");
    }
    // Изменяем ширину активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // Возможность указать оценку
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll(".rating__item");
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener("mouseenter", function (e) {
          // Обновление переменных
          initRatingVars(rating);
          // Обновление активных звезд
          setRatingActiveWidth(ratingItem.value);
        });
        ratingItem.addEventListener("mouseleave", function (e) {
          // Обновление активных звезд
          setRatingActiveWidth();
        });
        ratingItem.addEventListener("click", function (e) {
          // Обновление переменных
          initRatingVars(rating);

          if (rating.dataset.ajax) {
            // "Отправить" на сервер
            setRatingValue(ratingItem.value, rating);
          } else {
            // Отобразить указанную оцнку
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
          }
        });
      }
    }
    async function setRatingValue(value, rating) {
      if (!rating.classList.contains("rating_sending")) {
        rating.classList.add("rating_sending");

        // Отправика данных (value) на сервер
        let response = await fetch("rating.json", {
          method: "GET",

          //body: JSON.stringify({
          //	userRating: value
          //}),
          //headers: {
          //	'content-type': 'application/json'
          //}
        });
        if (response.ok) {
          const result = await response.json();

          // Получаем новый рейтинг
          const newRating = result.newRating;

          // Вывод нового среднего результата
          ratingValue.innerHTML = newRating;

          // Обновление активных звезд
          setRatingActiveWidth();

          rating.classList.remove("rating_sending");
        } else {
          alert("Ошибка");

          rating.classList.remove("rating_sending");
        }
      }
    }
  }
}

//======================================================================================================================
/* Range (noUiSlider) */
//======================================================================================================================
export function rangeInit() {
  const rangeItems = document.querySelectorAll("[data-range]");
  if (rangeItems.length) {
    rangeItems.forEach((rangeItem) => {
      const fromValue = rangeItem.querySelector("[data-range-from]");
      const toValue = rangeItem.querySelector("[data-range-to]");
      const item = rangeItem.querySelector("[data-range-item]");
      noUiSlider.create(item, {
        start: [Number(fromValue.value), Number(toValue.value)],
        connect: true,
        // tooltips: [true, true],
        range: {
          min: [Number(fromValue.dataset.rangeFrom)],
          max: [Number(toValue.dataset.rangeTo)],
        },
      });
      item.noUiSlider.on("update", (values) => {
        fromValue.value = Math.round(values[0]);
        toValue.value = Math.round(values[1]);
      });
    });
  }
}

//======================================================================================================================
/* Модуь формы "колличество" */
//======================================================================================================================
export function formQuantity() {
	document.addEventListener("click", function (e) {
		let targetElement = e.target;
		if (targetElement.closest('.quantity__button')) {
			let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
			if (targetElement.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				--value;
				if (value < 1) value = 1;
			}
			targetElement.closest('.quantity').querySelector('input').value = value;
		}
	});
}