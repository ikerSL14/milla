const header=document.querySelector('.site-header');
const toggle=document.querySelector('.nav-toggle');
const panel=document.querySelector('.nav-panel');
const links=[...document.querySelectorAll('.nav-link')];
const sections=[...document.querySelectorAll('.section-observed')];
const logo = document.querySelector('.brand img');

const logoDefault = new Image();
logoDefault.src = logo.dataset.logoDefault;

const logoScrolled = new Image();
logoScrolled.src = logo.dataset.logoScrolled;

function menu(open){
  toggle.classList.toggle('active',open);
  panel.classList.toggle('open',open);
  toggle.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('menu-open',open);
}
toggle.addEventListener('click',()=>menu(!panel.classList.contains('open')));
links.forEach(a=>a.addEventListener('click',()=>menu(false)));
addEventListener('resize',()=>{if(innerWidth>860)menu(false)});

/* NAVBAR AL HACER SCROLL */

function headerState() {

  const scrolled = scrollY > 18;

  header.classList.toggle('scrolled', scrolled);

  links.forEach(link => {
    link.classList.toggle('scrolled', scrolled);
  });

  toggle.classList.toggle('scrolled', scrolled);

  logo.src = scrolled
    ? logo.dataset.logoScrolled
    : logo.dataset.logoDefault;

}

headerState();addEventListener('scroll',headerState,{passive:true});

/* ==========================================================
   NAV — SECCIÓN ACTIVA
========================================================== */

function updateActiveSection() {

  const scrollPosition =
    window.scrollY + 180;

  let currentSection =
    sections[0];


  sections.forEach(section => {

    if (
      section.offsetTop <= scrollPosition
    ) {

      currentSection = section;

    }

  });


  if (!currentSection) return;


  const id =
    currentSection.id;


  links.forEach(link => {

    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${id}`
    );

  });

}


updateActiveSection();


window.addEventListener(
  'scroll',
  updateActiveSection,
  {
    passive: true
  }
);
document.getElementById('year').textContent=new Date().getFullYear();


/* ==========================================================
   MILLА — NOSOTROS REVEAL
========================================================== */

const aboutSection =
  document.querySelector('.about-milla');

const aboutReveal =
  document.querySelectorAll('.reveal-about');


if (
  aboutSection &&
  aboutReveal.length
) {

  const aboutObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            !entry.isIntersecting
          ) return;


          aboutReveal.forEach(
            element => {

              element.classList.add(
                'visible'
              );

            }
          );


          aboutObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: .15
      }
    );


  aboutObserver.observe(
    aboutSection
  );

}


/* ==========================================================
   PROPÓSITO — REVEAL
========================================================== */

const purposeSection =
  document.querySelector('.purpose-milla');

const purposeReveal =
  document.querySelectorAll('.reveal-purpose');


if (
  purposeSection &&
  purposeReveal.length
) {

  const purposeObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;


          purposeReveal.forEach(element => {

            element.classList.add('visible');

          });


          purposeObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: .15
      }
    );


  purposeObserver.observe(
    purposeSection
  );

}

/* ==========================================================
   SERVICIOS — REVEAL
========================================================== */

const servicesSection =
  document.querySelector('.services-milla');

const serviceReveal =
  document.querySelectorAll('.reveal-service');


if (
  servicesSection &&
  serviceReveal.length
) {

  const servicesObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;


          serviceReveal.forEach(
            element => {

              element.classList.add(
                'visible'
              );

            }
          );


          servicesObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: .1
      }
    );


  servicesObserver.observe(
    servicesSection
  );

}



/* ==========================================================
   SERVICIOS — MOBILE
   Click en la tarjeta para abrir / cerrar
========================================================== */

const serviceCards =
  document.querySelectorAll('.service-card');


serviceCards.forEach(card => {

  const button =
    card.querySelector('.service-expand');


  if (!button) return;


  /* ========================================================
     FUNCIÓN PARA CERRAR UNA TARJETA
  ======================================================== */

  function closeServiceCard(targetCard) {

    targetCard.classList.remove('is-active');

    const targetButton =
      targetCard.querySelector('.service-expand');

    if (targetButton) {

      targetButton.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  }


  /* ========================================================
     FUNCIÓN PARA ABRIR UNA TARJETA
  ======================================================== */

  function openServiceCard(targetCard) {

    /*
     * Cerramos todas las demás
     */

    serviceCards.forEach(otherCard => {

      if (otherCard !== targetCard) {

        closeServiceCard(otherCard);

      }

    });


    /*
     * Abrimos la seleccionada
     */

    targetCard.classList.add('is-active');

    const targetButton =
      targetCard.querySelector('.service-expand');

    if (targetButton) {

      targetButton.setAttribute(
        'aria-expanded',
        'true'
      );

    }

  }


  /* ========================================================
     CLICK EN TODA LA TARJETA
  ======================================================== */

  card.addEventListener('click', event => {

    /*
     * Desktop:
     * no hacemos absolutamente nada.
     * Desktop funciona exclusivamente con :hover.
     */

    if (window.innerWidth > 760) {
      return;
    }


    /*
     * Si el click fue directamente sobre el botón,
     * dejamos que el listener del botón lo controle.
     */

    if (
      event.target.closest('.service-expand')
    ) {
      return;
    }


    const isOpen =
      card.classList.contains('is-active');


    if (isOpen) {

      closeServiceCard(card);

    } else {

      openServiceCard(card);

    }

  });


  /* ========================================================
     CLICK EN EL BOTÓN
  ======================================================== */

  button.addEventListener('click', event => {

    event.preventDefault();
    event.stopPropagation();


    /*
     * Desktop:
     * el botón no controla el estado.
     */

    if (window.innerWidth > 760) {
      return;
    }


    const isOpen =
      card.classList.contains('is-active');


    if (isOpen) {

      closeServiceCard(card);

    } else {

      openServiceCard(card);

    }

  });

});

/* ==========================================================
   PARALLAX — REVEAL
========================================================== */

const parallaxSection =
  document.querySelector('.milla-parallax');

const parallaxReveal =
  document.querySelectorAll(
    '.reveal-parallax'
  );


if (
  parallaxSection &&
  parallaxReveal.length
) {

  const parallaxObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;


          parallaxReveal.forEach(
            element => {

              element.classList.add(
                'visible'
              );

            }
          );


          startParallaxCounters();

          parallaxObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: .18
      }
    );


  parallaxObserver.observe(
    parallaxSection
  );

}



/* ==========================================================
   CONTADORES
========================================================== */

let parallaxCountersStarted =
  false;


function startParallaxCounters() {

  if (
    parallaxCountersStarted
  ) {
    return;
  }


  parallaxCountersStarted =
    true;


  const counters =
    document.querySelectorAll(
      '.parallax-stat-number'
    );


  counters.forEach(
    counter => {

      const target =
        Number(
          counter.dataset.counter
        );


      const prefix =
        counter.dataset.prefix || '';


      const suffix =
        counter.dataset.suffix || '';


      const duration =
        1500;


      const start =
        performance.now();


      function updateCounter(
        currentTime
      ) {

        const progress =
          Math.min(
            (
              currentTime - start
            ) / duration,
            1
          );


        /*
         * Ease out
         */

        const eased =
          1 -
          Math.pow(
            1 - progress,
            3
          );


        const value =
          Math.floor(
            eased * target
          );


        counter.textContent =
          prefix +
          value.toLocaleString('es-MX') +
          suffix;


        if (
          progress < 1
        ) {

          requestAnimationFrame(
            updateCounter
          );

        }

      }


      requestAnimationFrame(
        updateCounter
      );

    }
  );

}

/* ==========================================================
   UBICACIÓN — REVEAL
========================================================== */

const locationSection =
  document.querySelector('.location-milla');

const locationReveal =
  document.querySelectorAll('.reveal-location');


if (
  locationSection &&
  locationReveal.length
) {

  const locationObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;


          locationReveal.forEach(
            element => {

              element.classList.add(
                'visible'
              );

            }
          );


          locationObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: .15
      }
    );


  locationObserver.observe(
    locationSection
  );

}

/* ==========================================================
   PERFIL CORPORATIVO — REVEAL
========================================================== */

const profileSection =
  document.querySelector('.profile-milla');

const profileReveal =
  document.querySelectorAll(
    '.reveal-profile'
  );


if (
  profileSection &&
  profileReveal.length
) {

  const profileObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;


          profileReveal.forEach(
            element => {

              element.classList.add(
                'visible'
              );

            }
          );


          profileObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: .15
      }
    );


  profileObserver.observe(
    profileSection
  );

}

/* ==========================================================
   INFINITE PROJECT SHOWCASE
========================================================== */

const showcase =
  document.querySelector('.showcase-projects');

const showcaseSlider =
  document.querySelector('.showcase-slider');

const showcaseSlides =
  [...document.querySelectorAll('.showcase-slide')];

const showcasePrev =
  document.querySelector('.showcase-prev');

const showcaseNext =
  document.querySelector('.showcase-next');

const showcaseDots =
  document.querySelector('.showcase-dots');

const showcaseCurrent =
  document.querySelector('.showcase-current');

const showcaseTotal =
  document.querySelector('.showcase-total');


if (
  showcase &&
  showcaseSlides.length
) {

  let currentIndex = 0;

  let autoPlay;

  let startX = 0;

  let currentX = 0;

  let dragging = false;


  const total =
    showcaseSlides.length;



  /* ======================================================
     TOTAL
  ====================================================== */

  showcaseTotal.textContent =
    String(total).padStart(2, '0');



  /* ======================================================
     CREAR DOTS
  ====================================================== */

  showcaseSlides.forEach(
    (_, index) => {

      const dot =
        document.createElement('button');

      dot.className =
        'showcase-dot';

      dot.type =
        'button';

      dot.setAttribute(
        'aria-label',
        `Ir al proyecto ${index + 1}`
      );


      dot.addEventListener(
        'click',
        () => {

          goToSlide(index);

          restartAutoplay();

        }
      );


      showcaseDots.appendChild(dot);

    }
  );


  const dots =
    [...showcaseDots.children];



  /* ======================================================
     NORMALIZAR ÍNDICE
  ====================================================== */

  function normalizeIndex(index) {

    return (
      index +
      total
    ) % total;

  }



  /* ======================================================
     DISTANCIA CIRCULAR
  ====================================================== */

  function circularDistance(
    slideIndex,
    activeIndex
  ) {

    let distance =
      slideIndex -
      activeIndex;


    if (
      distance >
      total / 2
    ) {

      distance -= total;

    }


    if (
      distance <
      -total / 2
    ) {

      distance += total;

    }


    return distance;

  }



  /* ======================================================
     RENDER
  ====================================================== */

  function renderShowcase() {

    showcaseSlides.forEach(
      (slide, index) => {

        slide.classList.remove(

          'is-active',
          'is-prev',
          'is-next',

          'is-hidden-left',
          'is-hidden-right'

        );


        const distance =
          circularDistance(
            index,
            currentIndex
          );


        if (
          distance === 0
        ) {

          slide.classList.add(
            'is-active'
          );

        }

        else if (
          distance === -1
        ) {

          slide.classList.add(
            'is-prev'
          );

        }

        else if (
          distance === 1
        ) {

          slide.classList.add(
            'is-next'
          );

        }

        else if (
          distance < 0
        ) {

          slide.classList.add(
            'is-hidden-left'
          );

        }

        else {

          slide.classList.add(
            'is-hidden-right'
          );

        }

      }
    );



    /* dots */

    dots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          'active',
          index === currentIndex
        );

        dot.setAttribute(
          'aria-current',
          index === currentIndex
            ? 'true'
            : 'false'
        );

      }
    );



    /* contador */

    showcaseCurrent.textContent =
      String(
        currentIndex + 1
      ).padStart(
        2,
        '0'
      );

  }



  /* ======================================================
     IR A SLIDE
  ====================================================== */

  function goToSlide(index) {

    currentIndex =
      normalizeIndex(index);

    renderShowcase();

  }



  /* ======================================================
     SIGUIENTE / ANTERIOR
  ====================================================== */

  function nextSlide() {

    goToSlide(
      currentIndex + 1
    );

  }


  function prevSlide() {

    goToSlide(
      currentIndex - 1
    );

  }



  showcaseNext?.addEventListener(
    'click',
    () => {

      nextSlide();

      restartAutoplay();

    }
  );


  showcasePrev?.addEventListener(
    'click',
    () => {

      prevSlide();

      restartAutoplay();

    }
  );



  /* ======================================================
     CLICK EN SLIDES LATERALES
  ====================================================== */

  showcaseSlides.forEach(
    (slide) => {

      slide.addEventListener(
        'click',
        () => {

          if (
            slide.classList.contains(
              'is-prev'
            )
          ) {

            prevSlide();

            restartAutoplay();

          }


          if (
            slide.classList.contains(
              'is-next'
            )
          ) {

            nextSlide();

            restartAutoplay();

          }

        }
      );

    }
  );



  /* ======================================================
     SWIPE
  ====================================================== */

  showcaseSlider.addEventListener(
    'pointerdown',
    e => {

      startX =
        e.clientX;

      currentX =
        startX;

      dragging =
        true;

    }
  );


  showcaseSlider.addEventListener(
    'pointermove',
    e => {

      if (
        !dragging
      ) return;


      currentX =
        e.clientX;

    }
  );


  function finishDrag() {

    if (
      !dragging
    ) return;


    dragging =
      false;


    const difference =
      currentX -
      startX;


    const threshold =
      55;


    if (
      difference >
      threshold
    ) {

      prevSlide();

      restartAutoplay();

    }


    else if (
      difference <
      -threshold
    ) {

      nextSlide();

      restartAutoplay();

    }

  }


  showcaseSlider.addEventListener(
    'pointerup',
    finishDrag
  );


  showcaseSlider.addEventListener(
    'pointercancel',
    finishDrag
  );


  showcaseSlider.addEventListener(
    'pointerleave',
    finishDrag
  );



  /* ======================================================
     TECLADO
  ====================================================== */

  showcase.addEventListener(
    'keydown',
    e => {

      if (
        e.key === 'ArrowRight'
      ) {

        nextSlide();

        restartAutoplay();

      }


      if (
        e.key === 'ArrowLeft'
      ) {

        prevSlide();

        restartAutoplay();

      }

    }
  );



  /* ======================================================
     AUTOPLAY
  ====================================================== */

  const reducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;


  function startAutoplay() {

    if (
      reducedMotion
    ) return;


    stopAutoplay();


    autoPlay =
      setInterval(
        nextSlide,
        5500
      );

  }


  function stopAutoplay() {

    clearInterval(
      autoPlay
    );

  }


  function restartAutoplay() {

    stopAutoplay();

    startAutoplay();

  }



  /* detener al interactuar */

  showcase.addEventListener(
    'mouseenter',
    stopAutoplay
  );


  showcase.addEventListener(
    'mouseleave',
    startAutoplay
  );


  showcase.addEventListener(
    'focusin',
    stopAutoplay
  );


  showcase.addEventListener(
    'focusout',
    startAutoplay
  );



  /* ======================================================
     INICIAR
  ====================================================== */

  renderShowcase();

  startAutoplay();

}

/* =========================================================
   POR QUÉ ELEGIRNOS — REVEAL
========================================================= */

const whySection = document.querySelector('.why-milla');
const whyReveal = document.querySelectorAll('.reveal-why');

if (whySection && whyReveal.length) {

  const whyObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      whyReveal.forEach(element => {
        element.classList.add('visible');
      });

      whyObserver.unobserve(entry.target);

    });

  }, {
    threshold: 0.12
  });

  whyObserver.observe(whySection);
}

/* =========================================================
   MILLA — CLIENTES REVEAL
========================================================= */

const millaClientes = document.querySelector('.milla-clientes');

if (millaClientes) {

  const millaClientesObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        millaClientes.classList.add('is-visible');

        millaClientesObserver.unobserve(entry.target);

      });

    },
    {
      threshold: 0.18
    }
  );

  millaClientesObserver.observe(millaClientes);

}


/* =========================================================
   FACEBOOK PAGE PLUGIN · MILLA INGENIERÍA
   ========================================================= */

function initMillaFacebookPlugin() {
  const container = document.getElementById("millaFacebookContainer");

  if (!container) {
    return;
  }

  // NUEVA URL de MILLA
  const FACEBOOK_PAGE = "https://www.facebook.com/profile.php?id=61585893533214";

  let resizeTimer = null;
  let lastWidth = 0;

  function renderFacebookPlugin() {
    const availableWidth = Math.floor(container.getBoundingClientRect().width);

    /* Mínimo 180, Máximo 500 para el plugin de FB */
    const iframeWidth = Math.max(180, Math.min(500, availableWidth));

    // Evitar recargas por cambios mínimos de pixeles
    if (Math.abs(iframeWidth - lastWidth) < 4) {
      return;
    }

    lastWidth = iframeWidth;
    const isMobile = window.innerWidth <= 650;
    const iframeHeight = isMobile ? 400 : 500;

    const pluginURL =
      "https://www.facebook.com/plugins/page.php" +
      "?href=" + encodeURIComponent(FACEBOOK_PAGE) +
      "&tabs=timeline" +
      "&width=" + iframeWidth +
      "&height=" + iframeHeight +
      "&small_header=false" +
      "&adapt_container_width=true" +
      "&hide_cover=false" +
      "&show_facepile=true";

    container.innerHTML = `
      <iframe
        src="${pluginURL}"
        width="${iframeWidth}"
        height="${iframeHeight}"
        style="
          border:none;
          overflow:hidden;
          border-radius: 4px; /* Borde más recto */
        "
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook Oficial de MILLA"
      ></iframe>
    `;
  }

  /* Primera carga */
  requestAnimationFrame(renderFacebookPlugin);

  /* Observador de tamaño para hacerlo responsive */
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderFacebookPlugin, 180);
    });
    observer.observe(container);
  } else {
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderFacebookPlugin, 250);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMillaFacebookPlugin();
});

/* =========================================================
   LÓGICA DEL MODAL FLYER · MILLA
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const flyerTrigger = document.getElementById("millaFlyerTrigger");
  const modal = document.getElementById("millaFlyerModal");
  const overlay = document.getElementById("millaFlyerOverlay");
  const closeBtn = document.getElementById("millaFlyerClose");

  if (!flyerTrigger || !modal) return;

  const openModal = () => {
    modal.classList.add("is-active");
  };

  const closeModal = () => {
    modal.classList.remove("is-active"); 
  };

  // Eventos de apertura y cierre
  flyerTrigger.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Cerrar con la tecla Escape por accesibilidad
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
});

/* =========================================================
   MILLA — CONTACTO REVEAL
========================================================= */

const millaContact = document.querySelector('.milla-contact');

if (millaContact) {

  const millaContactObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          millaContact.classList.add('is-visible');

          millaContactObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );

  millaContactObserver.observe(
    millaContact
  );

}

/* ==========================================================
   MILLA — MODAL DE VACANTES / CV
========================================================== */

const millaCareerModal =
  document.getElementById('millaCareerModal');

const millaCareerOpenButtons =
  document.querySelectorAll('[data-career-open]');

const millaCareerCloseButtons =
  document.querySelectorAll('[data-career-close]');

const millaCareerForm =
  document.getElementById('millaCareerForm');

const millaCareerFile =
  document.getElementById('career-cv');

const millaCareerFileName =
  document.getElementById('millaCareerFileName');

const millaCareerSuccess =
  document.getElementById('millaCareerSuccess');

  const millaCareerJobField =
  document.getElementById(
    'millaCareerJobField'
  );

const millaCareerJobDisplay =
  document.getElementById(
    'millaCareerJobDisplay'
  );

const millaCareerJobHint =
  document.getElementById(
    'millaCareerJobHint'
  );

const millaCareerJob =
  document.getElementById(
    'career-job'
  );

const millaCareerArea =
  document.getElementById(
    'career-area'
  );

const millaJobOpenButtons =
  document.querySelectorAll(
    '[data-job-open]'
  );

function resetMillaCareerForm() {

  if (!millaCareerForm) return;

  millaCareerForm.reset();

  if (millaCareerArea) {

  millaCareerArea.disabled = false;

  millaCareerArea.classList.remove(
    'is-career-locked'
  );

  millaCareerArea.removeAttribute(
    'tabindex'
  );

}

  if (millaCareerJob) {
    millaCareerJob.value = 'Postulación general';
  }

  if (millaCareerJobDisplay) {
    millaCareerJobDisplay.textContent =
      'Postulación general';
  }

  if (millaCareerJobHint) {
    millaCareerJobHint.textContent =
      'No has seleccionado una vacante específica.';
  }

  if (millaCareerJobField) {
    millaCareerJobField.classList.add(
      'is-general'
    );
  }

  if (millaCareerFileName) {
    millaCareerFileName.textContent =
      'Seleccionar';
  }

  if (millaCareerSuccess) {

    millaCareerSuccess.classList.remove(
      'is-visible'
    );

    millaCareerSuccess.setAttribute(
      'aria-hidden',
      'true'
    );

  }

  millaCareerForm
    .querySelectorAll(
      'input, select, textarea, button'
    )
    .forEach(element => {

      element.disabled = false;

    });

}
/* ==========================================================
   PREPARAR POSTULACIÓN
========================================================== */

function prepareMillaCareerApplication(
  jobName = null,
  areaName = null
) {

  if (
    !millaCareerJob ||
    !millaCareerJobDisplay ||
    !millaCareerJobHint ||
    !millaCareerJobField
  ) {
    return;
  }

  /*
   * ================================================
   * POSTULACIÓN A VACANTE
   * ================================================
   */

  if (jobName) {

    millaCareerJob.value =
      jobName;

    millaCareerJobDisplay.textContent =
      jobName;

    millaCareerJobHint.textContent =
      'Postulación a una vacante publicada.';

    millaCareerJobField.classList.remove(
      'is-general'
    );


    if (
      areaName &&
      millaCareerArea
    ) {

      millaCareerArea.value =
        areaName;

      millaCareerArea.classList.add(
        'is-career-locked'
      );

      /*
       * Evita que pueda enfocarse con TAB
       */
      millaCareerArea.setAttribute(
        'tabindex',
        '-1'
      );

    }

    return;
  }


  /*
   * ================================================
   * POSTULACIÓN GENERAL
   * ================================================
   */

  millaCareerJob.value =
    'Postulación general';

  millaCareerJobDisplay.textContent =
    'Postulación general';

  millaCareerJobHint.textContent =
    'No has seleccionado una vacante específica.';

  millaCareerJobField.classList.add(
    'is-general'
  );


  if (millaCareerArea) {

    millaCareerArea.value = '';

    millaCareerArea.classList.remove(
      'is-career-locked'
    );

    /*
     * Volvemos a permitir TAB
     */
    millaCareerArea.removeAttribute(
      'tabindex'
    );

    millaCareerArea.disabled = false;

  }

}


/* ==========================================================
   ABRIR
========================================================== */

function openMillaCareerModal() {

  if (!millaCareerModal) return;

  millaCareerModal.classList.add('is-open');

  millaCareerModal.setAttribute(
    'aria-hidden',
    'false'
  );

  document.body.classList.add(
    'milla-career-modal-open'
  );

  setTimeout(() => {

    const firstInput =
      document.getElementById('career-name');

    if (firstInput) {
      firstInput.focus();
    }

  }, 300);

}


/* ==========================================================
   CERRAR
========================================================== */

function closeMillaCareerModal() {

  if (!millaCareerModal) return;

  millaCareerModal.classList.remove(
    'is-open'
  );

  millaCareerModal.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'milla-career-modal-open'
  );

}


/* ==========================================================
   ABRIR — POSTULACIÓN GENERAL
========================================================== */

millaCareerOpenButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      resetMillaCareerForm();
      prepareMillaCareerApplication();
      openMillaCareerModal();

    }
  );

});


millaCareerCloseButtons.forEach(button => {

  button.addEventListener(
    'click',
    closeMillaCareerModal
  );

});

/* ==========================================================
   ABRIR — VACANTE ESPECÍFICA
========================================================== */

millaJobOpenButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      const jobName =
        button.dataset.jobOpen;

      /*
       * Por ahora especificamos manualmente
       * el área correspondiente.
       */

      const areaName =
        button
          .closest('.milla-job-card')
          ?.dataset.jobArea || 'Ingeniería';


      prepareMillaCareerApplication(
        jobName,
        areaName
      );

      openMillaCareerModal();

    }
  );

});


/* ==========================================================
   ESC
========================================================== */

document.addEventListener(
  'keydown',
  event => {

    if (
      event.key === 'Escape' &&
      millaCareerModal?.classList.contains(
        'is-open'
      )
    ) {

      closeMillaCareerModal();

    }

  }
);


/* ==========================================================
   CV — NOMBRE DEL ARCHIVO
========================================================== */

if (millaCareerFile) {

  millaCareerFile.addEventListener(
    'change',
    () => {

      const file =
        millaCareerFile.files[0];

      if (!file) {

        millaCareerFileName.textContent =
          'Seleccionar';

        return;

      }


      /*
       * Límite visual de 5 MB.
       */

      const maxSize =
        5 * 1024 * 1024;


      if (file.size > maxSize) {

        alert(
          'El archivo supera los 5 MB. Selecciona un CV más ligero.'
        );

        millaCareerFile.value = '';

        millaCareerFileName.textContent =
          'Seleccionar';

        return;

      }


      millaCareerFileName.textContent =
        file.name;

    }
  );

}


/* ==========================================================
   ENVÍO AJAX — NETLIFY FORMS
========================================================== */

if (millaCareerForm) {

  millaCareerForm.addEventListener(
    'submit',
    async event => {

      event.preventDefault();


      const submitButton =
        millaCareerForm.querySelector(
          '.milla-career-submit'
        );


      if (!submitButton) return;


      const originalText =
        submitButton.innerHTML;


      submitButton.disabled =
        true;

      submitButton.innerHTML = `
        <span>Enviando solicitud...</span>
        <iconify-icon
          icon="solar:refresh-outline"
        ></iconify-icon>
      `;


      try {

        const formData =
          new FormData(
            millaCareerForm
          );


        const response =
          await fetch(
            '/',
            {
              method: 'POST',
              body: formData
            }
          );


        if (!response.ok) {

          throw new Error(
            'Error al enviar el formulario'
          );

        }


        millaCareerSuccess.classList.add(
          'is-visible'
        );

        millaCareerSuccess.setAttribute(
          'aria-hidden',
          'false'
        );


        millaCareerForm
          .querySelectorAll(
            'input, select, textarea, button'
          )
          .forEach(element => {

            element.disabled =
              true;

          });

      }

      catch (error) {

        console.error(error);

        alert(
          'No pudimos enviar tu solicitud. Inténtalo nuevamente.'
        );


        submitButton.disabled =
          false;

        submitButton.innerHTML =
          originalText;

      }

    }
  );

}