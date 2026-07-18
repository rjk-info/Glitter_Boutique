/**
 * GLITTER BOUTIQUE - PREMIUM CORE NAVIGATION DRIVER
 * Architectural Focus: Clean DOM State Management & High Frame-rate Interface Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Initialize Lucide SVG Icons Injection Context
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Node Target Matrix Reference
    const navbarHeader = document.getElementById('gb-navbar-main');
    const menuOpenTrigger = document.getElementById('gb-navbar-menu-open');
    const menuCloseTrigger = document.getElementById('gb-navbar-menu-close');
    const mobileOverlay = document.getElementById('gb-navbar-mobile-overlay');
    
    // Interactive State Parameter Values
    const scrollThreshold = 40;
    let isMenuOpen = false;

    /* ==========================================================================
       SCROLL CONTRACTION ENGINE (STRETCH & SQUISH RUNTIME STICKY INTERCEPT)
       ========================================================================== */
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollY > scrollThreshold) {
            if (!navbarHeader.classList.contains('gb-navbar-sticky-active')) {
                navbarHeader.classList.add('gb-navbar-sticky-active');
            }
        } else {
            if (navbarHeader.classList.contains('gb-navbar-sticky-active')) {
                navbarHeader.classList.remove('gb-navbar-sticky-active');
            }
        }
    };

    // Passive listener optimized implementation to guarantee smooth vertical touch translation 
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    /* ==========================================================================
       MOBILE OVERLAY TRANSITION ENGINE & ARIA COMPLIANT DISPATCH ROUTINES
       ========================================================================== */
    const openMobileMenu = () => {
        if (isMenuOpen) return;
        
        isMenuOpen = true;
        mobileOverlay.classList.add('gb-navbar-overlay-open');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        menuOpenTrigger.setAttribute('aria-expanded', 'true');
        
        // Block background baseline body layout scrolling thread while dialogue runs active
        document.body.style.overflow = 'hidden';
        
        // Accessibility: Set structural system focus coordinates directly to close element execution line
        setTimeout(() => {
            menuCloseTrigger.focus();
        }, 100);
    };

    const closeMobileMenu = () => {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        mobileOverlay.classList.remove('gb-navbar-overlay-open');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        menuOpenTrigger.setAttribute('aria-expanded', 'false');
        
        // Restore interaction properties seamlessly back to native layout
        document.body.style.overflow = '';
        
        // Accessibility: Return focal positioning stack straight back onto initialization element
        menuOpenTrigger.focus();
    };

    // Input Link Bindings Matrix
    menuOpenTrigger.addEventListener('click', openMobileMenu);
    menuCloseTrigger.addEventListener('click', closeMobileMenu);

    // Escape Key System Trapper for Accessibility compliance
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            if (isMenuOpen) {
                closeMobileMenu();
            }
        }
    });
});

/* =====================================================
   HERO SECTION
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Query Architecture Targets
    const heroSection = document.querySelector('.gb-hero');
    if (!heroSection) return; // Fault protection if injected selectively

    const slides = Array.from(heroSection.querySelectorAll('.gb-hero-slide'));
    const dots = Array.from(heroSection.querySelectorAll('.gb-hero-dot'));
    const btnPrev = heroSection.querySelector('#gb-hero-btn-prev');
    const btnNext = heroSection.querySelector('#gb-hero-btn-next');
    
    // Core Engine State Constants
    const slideDuration = 5000;
    let currentActiveIndex = 0;
    let autoSlideIntervalId = null;
    
    // Gesture Tracking Metrics
    let touchStartX = 0;
    let touchEndX = 0;
    const minimumSwipeDistance = 50;

    /**
     * DOM Slide Execution Subroutine
     * Updates visual layering matrix and switches semantic ARIA flags
     */
    const renderActiveSlideState = (targetIndex) => {
        // Remove current state markers
        slides[currentActiveIndex].classList.remove('gb-hero-slide-active');
        slides[currentActiveIndex].setAttribute('aria-hidden', 'true');
        dots[currentActiveIndex].classList.remove('gb-hero-dot-active');
        dots[currentActiveIndex].setAttribute('aria-selected', 'false');
        dots[currentActiveIndex].setAttribute('tabindex', '-1');

        // Step internal pointer
        currentActiveIndex = targetIndex;

        // Apply new operational state markers
        slides[currentActiveIndex].classList.add('gb-hero-slide-active');
        slides[currentActiveIndex].setAttribute('aria-hidden', 'false');
        dots[currentActiveIndex].classList.add('gb-hero-dot-active');
        dots[currentActiveIndex].setAttribute('aria-selected', 'true');
        dots[currentActiveIndex].removeAttribute('tabindex');
    };

    const navigateToNextSlide = () => {
        const nextIndex = (currentActiveIndex + 1) % slides.length;
        renderActiveSlideState(nextIndex);
    };

    const navigateToPrevSlide = () => {
        const prevIndex = (currentActiveIndex - 1 + slides.length) % slides.length;
        renderActiveSlideState(prevIndex);
    };

    /* =====================================================
       AUTO ROTATION INTERVAL CORE CONTROLLER
       ===================================================== */
    const activateAutoRotation = () => {
        if (!autoSlideIntervalId) {
            autoSlideIntervalId = setInterval(navigateToNextSlide, slideDuration);
        }
    };

    const deactivateAutoRotation = () => {
        if (autoSlideIntervalId) {
            clearInterval(autoSlideIntervalId);
            autoSlideIntervalId = null;
        }
    };

    // Responsive Interaction Hooks (Pause on Hover)
    heroSection.addEventListener('mouseenter', deactivateAutoRotation);
    heroSection.addEventListener('mouseleave', activateAutoRotation);

    // Dynamic Context Intercepts for Touch UI Devices
    heroSection.addEventListener('touchstart', deactivateAutoRotation, { passive: true });
    heroSection.addEventListener('touchend', activateAutoRotation, { passive: true });

    /* =====================================================
       INPUT EVENT LISTENER BINDINGS
       ===================================================== */
    
    // Hardware Buttons Bindings
    if (btnNext) btnNext.addEventListener('click', navigateToNextSlide);
    if (btnPrev) btnPrev.addEventListener('click', navigateToPrevSlide);

    // Track Dots Direct Selection Navigation Router
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const indexTarget = parseInt(e.currentTarget.getAttribute('data-hero-dot'), 10);
            if (indexTarget !== currentActiveIndex) {
                renderActiveSlideState(indexTarget);
            }
        });
    });

    // Device Keyboard Accessibility Capture Routines
    document.addEventListener('keydown', (e) => {
        // Enforce boundary context processing check only if slider is inside the viewport bounds
        const heroPosition = heroSection.getBoundingClientRect();
        const isInViewport = (heroPosition.top < window.innerHeight && heroPosition.bottom >= 0);

        if (isInViewport) {
            if (e.key === 'ArrowRight') {
                navigateToNextSlide();
            } else if (e.key === 'ArrowLeft') {
                navigateToPrevSlide();
            }
        }
    });

    /* =====================================================
       TOUCH INTERACTIVE GESTURES (SWIPE DIRECTION INTERCEPT)
       ===================================================== */
    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGestureEvaluation();
    }, { passive: true });

    const handleSwipeGestureEvaluation = () => {
        const travelDistanceX = touchEndX - touchStartX;
        
        if (Math.abs(travelDistanceX) > minimumSwipeDistance) {
            if (travelDistanceX < 0) {
                // Dragged Left -> Advance Presentation
                navigateToNextSlide();
            } else {
                // Dragged Right -> Regress Presentation
                navigateToPrevSlide();
            }
        }
    };

    // System Startup Execution Thread Call
    activateAutoRotation();
});