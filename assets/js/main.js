/**
 * SNTTI - Sowmya Nursery Teacher Training Institute
 * Vanilla JavaScript Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Scroll Shadow Effect
  const navbar = document.querySelector('.custom-navbar');

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Full-Screen Mobile Navigation Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item:not(#mobileCoursesToggle), .mobile-submenu-item');

  function toggleMobileMenu() {
    const isOpen = mobileNavToggle?.classList.contains('active');

    if (!isOpen) {
      mobileNavToggle?.classList.add('active');
      mobileMenuOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      closeMobileMenu();
    }
  }

  function closeMobileMenu() {
    mobileNavToggle?.classList.remove('active');
    mobileMenuOverlay?.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  }

  window.closeMobileMenu = closeMobileMenu;

  // Expose toggleMobileSubmenu globally (called from onclick in HTML)
  window.toggleMobileSubmenu = function(e) {
    e.preventDefault();
    const mobileSubmenu = document.getElementById('mobileSubmenu');
    const toggle = document.getElementById('mobileCoursesToggle');
    if (mobileSubmenu) mobileSubmenu.classList.toggle('open');
    if (toggle) toggle.classList.toggle('open');
  };

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu on clicking links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Mobile Accordion Toggle for Courses Submenu (also handled via onclick in HTML)
  const mobileCoursesToggle = document.getElementById('mobileCoursesToggle');
  const mobileSubmenu = document.getElementById('mobileSubmenu');
  // The onclick="toggleMobileSubmenu(event)" on the element handles the toggle.

  // 4. Consultation Form Submission Handler
  const consultationForm = document.getElementById('consultationForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing Request...`;
      }

      // Simulate quick secure server submission
      setTimeout(() => {
        consultationForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> Request Submitted!`;
        }

        if (formSuccessMessage) {
          formSuccessMessage.classList.remove('d-none');
        }

        setTimeout(() => {
          if (formSuccessMessage) formSuccessMessage.classList.add('d-none');
          if (submitBtn) {
            submitBtn.innerHTML = `Submit Consultation Request <i class="bi bi-arrow-right ms-1"></i>`;
          }
          // Close Bootstrap modal if open
          const modalEl = document.getElementById('consultationModal');
          if (modalEl && window.bootstrap) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
          }
        }, 2200);
      }, 1000);
    });
  }

  // 5. Bootstrap Carousel Sync with Indicator Dots & Counter
  const heroCarouselEl = document.getElementById('heroBannerCarousel');
  if (heroCarouselEl) {
    const heroDots = document.querySelectorAll('#heroCarouselDots button');
    const heroSlideCurrent = document.getElementById('heroSlideCurrent');

    heroCarouselEl.addEventListener('slide.bs.carousel', (e) => {
      const slideIndex = e.to;

      // Update slide counter text (01, 02, 03)
      if (heroSlideCurrent) {
        heroSlideCurrent.textContent = String(slideIndex + 1).padStart(2, '0');
      }

      // Update indicator dots
      heroDots.forEach((btn, index) => {
        if (index === slideIndex) {
          btn.classList.add('active');
          btn.setAttribute('aria-current', 'true');
        } else {
          btn.classList.remove('active');
          btn.removeAttribute('aria-current');
        }
      });
    });
  }

  // 6. Active Section ScrollSpy Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-menu .nav-link, .mobile-nav-item');

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 7. Scroll Animation Observer for Luxury Animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  // 8. Swiper.js Carousel Initialization for "Our Courses" Section
  if (typeof Swiper !== 'undefined' && document.querySelector('.courses-swiper')) {
    const coursesSwiper = new Swiper('.courses-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      loop: false,
      speed: 600,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '#coursesNextBtn',
        prevEl: '#coursesPrevBtn',
      },
      breakpoints: {
        576: {
          slidesPerView: 1.15,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 32,
        }
      },
      on: {
        init: function (swiper) {
          updateCoursesCounter(swiper);
        },
        slideChange: function (swiper) {
          updateCoursesCounter(swiper);
        },
        resize: function (swiper) {
          updateCoursesCounter(swiper);
        }
      }
    });

    function updateCoursesCounter(swiper) {
      const currentEl = document.getElementById('coursesSlideCurrent');
      const totalEl = document.getElementById('coursesSlideTotal');

      if (currentEl) {
        const currentPage = (swiper.snapIndex !== undefined ? swiper.snapIndex : swiper.activeIndex) + 1;
        currentEl.textContent = String(currentPage).padStart(2, '0');
      }

      if (totalEl) {
        const totalPages = swiper.snapGrid ? swiper.snapGrid.length : swiper.slides.length;
        totalEl.textContent = String(totalPages).padStart(2, '0');
      }
    }

    // Ensure swiper recalculates when section is animated into view
    window.addEventListener('scroll', function () {
      if (coursesSwiper && typeof coursesSwiper.update === 'function') {
        coursesSwiper.update();
      }
    }, { passive: true, once: true });
  }

  // 12. Testimonials Marquee via Swiper.js (Premium Smooth Scroll & Touch Drag)
  const marqueeContainers = document.querySelectorAll('.marquee-container');
  if (marqueeContainers.length > 0 && typeof Swiper !== 'undefined') {

    const initTestiSwiper = (container, reverseDirection) => {
      const swiper = new Swiper(container, {
        wrapperClass: 'marquee-track',
        slideClass: 'testi-card',
        slidesPerView: 'auto',
        loop: true,
        speed: 6000, // Smooth continuous speed (ms per slide)
        freeMode: true,
        freeModeMomentum: false, // Prevents coasting after release for better control
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverseDirection
        },
        grabCursor: true,
        allowTouchMove: true,
      });

      // Advanced Pause & Resume Logic for Touch and Hover
      let interactionTimeout;

      const pauseMarquee = () => {
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
        clearTimeout(interactionTimeout);
      };

      const resumeMarquee = () => {
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          if (!swiper.autoplay.running) {
            swiper.autoplay.start();
          }
        }, 2000); // Resume 2 seconds after release
      };

      // Desktop Hover Events
      container.addEventListener('mouseenter', pauseMarquee);
      container.addEventListener('mouseleave', resumeMarquee);

      // Mobile / Touch Drag Events
      swiper.on('touchStart', pauseMarquee);
      swiper.on('sliderMove', pauseMarquee);
      swiper.on('touchEnd', resumeMarquee);

      return swiper;
    };

    // Top Row: Moves Left
    if (marqueeContainers[0]) {
      initTestiSwiper(marqueeContainers[0], false);
    }

    // Bottom Row: Moves Right
    if (marqueeContainers[1]) {
      initTestiSwiper(marqueeContainers[1], true);
    }
  }
});

// 13. Get in Touch Form Submission Logic
document.addEventListener('DOMContentLoaded', () => {
  const mainContactForm = document.getElementById('mainContactForm');
  const successMessage = document.getElementById('contactSuccessMessage');

  if (mainContactForm && successMessage) {
    mainContactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent page reload
      
      // Hide the form with a smooth fade
      mainContactForm.style.transition = 'opacity 0.3s ease';
      mainContactForm.style.opacity = '0';
      
      setTimeout(() => {
        mainContactForm.style.display = 'none';
        
        // Show success message
        successMessage.classList.remove('d-none');
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        
        // Trigger reflow
        void successMessage.offsetWidth;
        
        successMessage.style.opacity = '1';
      }, 300);
    });
  }
});
