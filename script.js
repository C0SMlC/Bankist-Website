'use strict';

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrollling

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // )

  //    Scrolling;
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//   Scrolling
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// );

// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

// Timer

// const timer = setInterval(function()
// {
//   alert("HI");
// },3000);

// timer();

// =>>>> navabar auto scroll

const navbar = document.querySelector('.nav__links');

navbar.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/// Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked_tab = e.target.closest('.operations__tab');

  tabs.forEach(el => el.classList.remove('operations__tab--active'));

  if (!clicked_tab) return;

  clicked_tab.classList.add('operations__tab--active');

  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked_tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/// Sticky Nav
// window.addEventListener('scroll', function () {
//   const sec1coords = section1.getBoundingClientRect();
//   if (window.scrollY > sec1coords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

/// Sticky Nav - Another Method

const callback = function (entries, observer) {
  entries.forEach(function (entry) {
    nav.classList.toggle('sticky', !entry.isIntersecting);
  });
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: '-12%',
};

const observer = new IntersectionObserver(callback, options);
observer.observe(header);

// Loading As We Scroll

const sections = document.querySelectorAll('.section');
const callbackSection = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observerSection.unobserve(entry.target);
  });
};

const optionSection = {
  root: null,
  threshold: 0.25,
};

const observerSection = new IntersectionObserver(
  callbackSection,
  optionSection
);

sections.forEach(function (section) {
  observerSection.observe(section);
  section.classList.add('section--hidden');
});

// Click on logo when away from home

const logo = document.querySelector('.nav__logo');

// logo.addEventListener('click', function () {
//   const logoCallback = function (entries, logoObserver) {
//     entries.forEach(function (ele) {
//       logo.style.cursor='pointer';
//       console.log(ele);
//       if (! ele.isIntersecting) {
//         header.scrollIntoView({ behavior: 'smooth' });
//         logoObserver.unobserve(header);
//       }
//     });
//   };

//   const logoOption = {
//     root: null,
//     threshold: 0,
//   };

//   const logoObserver = new IntersectionObserver(logoCallback, logoOption);
//   logoObserver.observe(header);
// });

const logoCallback = function (entries, logoObserver) {
  entries.forEach(function (ele) {
    if (ele.isIntersecting) {
      logoObserver.unobserve(header);
      return;
    }
    header.scrollIntoView({ behavior: 'smooth' });
    logoObserver.unobserve(header);
  });
};

const logoOption = {
  root: null,
  threshold: 0,
};

const logoObserver = new IntersectionObserver(logoCallback, logoOption);
logo.addEventListener('click', function () {
  logoObserver.observe(header);
});

// turning cursor to pointer

const cb = function (entries, obs) {
  entries.forEach(function (ele) {
    if (ele.isIntersecting) {
      logo.style.cursor = 'default';
      return;
    }
    logo.style.cursor = 'pointer';
  });
};

const obs = new IntersectionObserver(cb, {
  threshold: 0.1,
});

obs.observe(header);

//Lazy Laoding

const imgs = document.querySelectorAll('img[data-srce]');

const imgcallback = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.srce;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
      imgObserver.unobserve(entry.target);
    });
  });
};

const imgObserver = new IntersectionObserver(imgcallback, {
  threshold: 1,
});

imgs.forEach(img => imgObserver.observe(img));

// Sliders
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const allSlides = document.querySelectorAll('.slide');

allSlides.forEach(function (slide, index) {
  slide.style.transform = `translateX(${100 * index}%)`;
});

let currslide = 0;

function moveRight() {
  if (currslide <= allSlides.length - 1) {
    currslide++;
  }

  if (currslide === allSlides.length) {
    currslide = 0;
  }
  console.log(currslide);
  slider(currslide);
}

function moveLeft() {
  if (currslide >= 0) {
    currslide--;
  }

  if (currslide === -1) {
    currslide = allSlides.length - 1;
  }
  slider(currslide);
}

function slider(cur) {
  allSlides.forEach(function (slide, index) {
    slide.style.transform = `translateX(${100 * (index - cur)}%)`;
  });
  activedot(cur);
}
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);

// Moving Slides With button

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') moveRight();
  else if (e.key === 'ArrowLeft') moveLeft();
  // e.key===ArrowLeft && moveLeft();
  // true =>moveLeft(); will be called
  // false nothing will happen
});

// Sliding Dots

const dotContainer = document.querySelector('.dots');

const createDot = function () {
  allSlides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide = ${index}></button>`
    );
  });
};

function activedot(num) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${num}"]`)
    .classList.add('dots__dot--active');
}

function init() {
  createDot();
  activedot(0);
}

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const currslide = e.target.dataset.slide;
    slider(currslide);
    activedot(currslide);
  }
});

init();
