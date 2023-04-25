// Меню-бургер
/*
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
*/

//======Прокрутка в начало страницы===================================================
/*
const headerHeight = document.querySelector(".header").offsetHeight;
const backToHeader = document.querySelector(".comeback");

document.addEventListener("scroll", (e) => {
  const offsetTop = document.documentElement.scrollTop;

  if (offsetTop >= headerHeight) {
    backToHeader.classList.add("_active");
    backToHeader.onclick = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  } else {
    backToHeader.classList.remove("_active");
  }
});
*/

//====Добавление года copyright=====================================================

const copyYear = document.querySelector(".copyright__year");

if (copyYear) {
  const addYear = () => {
    const year = new Date().getFullYear();
    copyYear.innerHTML = year;
  };
  addYear();
}

//===Изменение высоты для первого экрана==============================

const firstScreen = document.querySelector(".first-screen");

if (firstScreen) {
  const heightOfFirstScreen = () => {
    const header = document.querySelector(".header").offsetHeight; // Высота хедера
    const heightScrenn = window.innerHeight; // Высота внутреннего размера окна браузера
    firstScreen.style.height = heightScrenn - header + "px"; // Расчет высоты первого экрана
  };

  heightOfFirstScreen();

  window.addEventListener("resize", () => {
    heightOfFirstScreen();
  });
}

//===Подключение модального окна для видео==============================
const modalLink = document.querySelector("#modal-link");

if (modalLink) {
  const body = document.querySelector("body");

  let unlock = true;

  const timeout = 500;

  modalLink.addEventListener("click", (e) => {
    const modalName = modalLink.getAttribute("href").replace("#", "");
    const currentModal = document.getElementById(modalName);
    modalOpen(currentModal);
    e.preventDefault();
  });

  const modalCloseIcon = document.querySelector(".modal__close");
  if (modalCloseIcon) {
    modalCloseIcon.addEventListener("click", (e) => {
      modalClose(modalCloseIcon.closest(".modal"));
      e.preventDefault();
    });
  }

  const modalOpen = (currentModal) => {
    if (currentModal && unlock) {
      const modalActive = document.querySelector(".modal.open");
      if (modalActive) {
        modalClose(modalActive, false);
      } else {
        bodyLock();
      }
    }
    currentModal.classList.add("open");
    currentModal.addEventListener("click", (e) => {
      if (!e.target.closest(".modal__content")) {
        modalClose(e.target.closest(".modal"));
      }
    });
  };

  const modalClose = (modalActive, doUnlock = true) => {
    if (unlock) {
      modalActive.classList.remove("open");
      if (doUnlock) {
        bodyUnLock();
      }
    }
  };

  const bodyLock = () => {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    body.style.paddingRight = lockPaddingValue;
    body.classList.add("_lock");

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  };

  const bodyUnLock = () => {
    setTimeout(() => {
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
    }, timeout);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  };

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      const modalActive = document.querySelector(".modal.open");
      modalClose(modalActive);
    }
  });
}

//===Открытие одной вкладки аккардеона на главной странице==============================
const toggleAccordion = (event) => {
  if (event.target.open) {
    document.querySelectorAll(".faq__container > details[open]").forEach((el) => {
      if (el === event.target) {
        return;
      }
      el.open = false;
    });
  }
};

if (document.querySelectorAll(".faq__container").length > 0) {
  document.querySelectorAll(".faq__container > .faq__content").forEach((el) => el.addEventListener("toggle", toggleAccordion));
}

//===Показать скрытый текст по клику на пнопку==============================
const btnsMore = document.querySelectorAll(".card-info__more");

if (btnsMore.length > 0) {
  for (let btn of btnsMore) {
    btn.addEventListener("click", () => {
      const blockquote = btn.closest(".card-info__blockquote");
      const quote = blockquote.querySelector(".quote");
      quote.classList.toggle("quote_dots");

      if (!quote.classList.contains("quote_dots")) {
        btn.innerHTML = "<span>Скрыть</span>";
      } else {
        btn.innerHTML = "<span>Подробнее</span>";
      }
    });
  }
}

//===Скрытие галереи фотографий==============================
const previewBtns = document.querySelectorAll(".preview-card__button");

const test = (e) => {
  previewBtns.forEach((item) => {
    const gallery = e.closest(".gallery");
    const images = gallery.querySelector(".gallery__images");

    item.classList.remove("fixed");

    e.addEventListener("click", function () {
      if (!e.classList.contains("fixed")) {
        e.classList.add("fixed");
        e.style.zIndex = 100;
        e.innerHTML = "<span>Свернуть</span>";
        images.classList.remove("hidden");
      } else {
        e.classList.remove("fixed");
        e.style.zIndex = 10;
        e.innerHTML = "<span>показать ещё</span>";
        images.classList.add("hidden");
      }
    });
  });
};

previewBtns.forEach((previewBtn) => {
  previewBtn.addEventListener("click", test(previewBtn));
});

// document.querySelectorAll(".gallery__images").forEach((el) =>)

/*
const galleries = document.querySelectorAll(".gallery");

if (galleries.length > 0) {
  const buttonsGalleries = document.querySelectorAll(".preview-card__button ");

  for (let button of buttonsGalleries) {
    button.addEventListener("click", () => {
      const currentGallery = button.closest(".gallery");
      const imagesOfGallery = currentGallery.querySelector(".gallery__images");

      imagesOfGallery.classList.toggle("hidden");
      button.classList.toggle("fixed");

      if (button.classList.contains("fixed")) {
        button.innerHTML = "<span>Свернуть</span>";
      } else {
        button.innerHTML = "<span>показать ещё</span>";
      }
    });
  }
}
*/

/*
  previewBtn.addEventListener("click", () => {
      previewBtn.classList.toggle("fixed");
      previewBtn.innerHTML = "<span>показать ещё</span>";
    });
*/

/*
previewBtn.addEventListener("click", () => {
      previewBtn.classList.toggle("fixed");
      previewBtn.innerHTML = "<span>показать ещё</span>";
    });
*/
