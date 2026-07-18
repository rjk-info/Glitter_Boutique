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
/* ======================================================
   WHY CHOOSE GLITTER BOUTIQUE
====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify Lucide asset parser is active on page run
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const revealElements = document.querySelectorAll('.gb-why-reveal');
    
    if (revealElements.length === 0) return;

    // Premium GPU-Accelerated Scroll-Reveal Observer Configurations
    const observerOptions = {
        root: null, // Viewport tracking reference
        rootMargin: '0px 0px -60px 0px', // Animates slightly before crossing element baseline threshold
        threshold: 0.12 // Trigger once 12% of the card surfaces onto active screen
    };

    const handleRevealIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Introduce staggered architectural pacing delay loops for premium UX flow
                setTimeout(() => {
                    entry.target.classList.add('gb-why-visible');
                }, index * 60); 

                // Unobserve card asset node permanently once locked visible to enhance client rendering cycles
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(handleRevealIntersection, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

/* ======================================================
   SHOP BY COLLECTION
====================================================== */
/**
 * Note: The Shop By Collection layout is systematically driven by advanced, 
 * performance-tuned CSS Grid flex structures and aspect-ratio parameters. 
 * This ensures perfect geometric heights and micro-level text centering 
 * natively on all display layers without script parsing overhead.
 *
 * No extra interactive calculations or document transformations are required here,
 * protecting your lighthouse rendering scores and avoiding redundant DOM cycles.
 */

/* ======================================================
   BEST SELLERS / FEATURED PRODUCTS
====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly added Lucide dynamic icon nodes safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Capture product context boundaries safely
    const productGrid = document.querySelector('.gb-product-grid');
    if (!productGrid) return;

    /**
     * Optional Symmetrical Quick View Event Dispatcher Matrix
     * Binds downstream interactive click listeners to trigger visual operations
     */
    productGrid.addEventListener('click', (event) => {
        const quickViewBtn = event.target.closest('.gb-product-quickview-trigger');
        const wishlistBtn = event.target.closest('.gb-product-wishlist-btn');

        if (quickViewBtn) {
            const productTitle = quickViewBtn.closest('.gb-product-card').querySelector('.gb-product-title').textContent;
            // Production Hook Place: Wire custom corporate overlay modals directly here
            console.log(`Open Quick View Overlay Interface context for: ${productTitle}`);
        }

        if (wishlistBtn) {
            event.preventDefault();
            const productTitle = wishlistBtn.closest('.gb-product-card').querySelector('.gb-product-title').textContent;
            
            // Toggle local presentation logic for wishlist actioning tracking states
            const heartIcon = wishlistBtn.querySelector('i');
            const isActive = wishlistBtn.getAttribute('aria-pressed') === 'true';
            
            wishlistBtn.setAttribute('aria-pressed', !isActive);
            console.log(`Toggle wishlist database reference parameter updates for: ${productTitle}`);
        }
    });
});

/* ======================================================
   ABOUT GLITTER BOUTIQUE
====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify Lucide dynamic vectors are active on page run execution
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /**
     * Note: The About section layout leverages modern CSS Grid properties, 
     * smooth translation animations via cubic-bezier parameters, and hardware-accelerated 
     * structural fluid sizing architectures natively.
     *
     * This eliminates unnecessary script overhead and processing loops, keeping your 
     * Lighthouse performance metrics pristine. No additional initialization scripts 
     * are required here.
     */
});

/* ======================================================
   CUSTOMER REVIEWS
====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Parse Lucide SVG elements safely for the review vector nodes
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /**
     * Note: This Customer Reviews system implements layout heights naturally 
     * driven by asymmetric flexible data vectors (CSS align-items: start). 
     * 
     * Micro-interactions like profile rotations, tag shifts, and star transformations
     * run directly on hardware-accelerated CSS transition matrices. This preserves
     * smooth, main-thread-free performance across all mobile browsers.
     */
});

/* ======================================================
   FAQ SECTION
====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly embedded Lucide vector nodes securely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const accordionHub = document.querySelector('.gb-faq-accordion-hub');
    if (!accordionHub) return;

    /**
     * Symmetrical Single-Open Accordion State Transition Engine
     * Monitors layout vectors dynamically utilizing clean element.scrollHeight mapping
     */
    accordionHub.addEventListener('click', (event) => {
        const structuralTrigger = event.target.closest('.gb-faq-trigger');
        if (!structuralTrigger) return;

        const ongoingItem = structuralTrigger.closest('.gb-faq-item');
        const ongoingPanel = ongoingItem.querySelector('.gb-faq-panel');
        const isCurrentlyExpanded = structuralTrigger.getAttribute('aria-expanded') === 'true';

        // Enforce boundary parameters: Locate and collapse alternative active items inside the node list
        const parallelActiveItem = accordionHub.querySelector('.gb-faq-item-active');
        if (parallelActiveItem && parallelActiveItem !== ongoingItem) {
            const parallelTrigger = parallelActiveItem.querySelector('.gb-faq-trigger');
            const parallelPanel = parallelActiveItem.querySelector('.gb-faq-panel');

            parallelActiveItem.classList.remove('gb-faq-item-active');
            parallelTrigger.setAttribute('aria-expanded', 'false');
            parallelPanel.setAttribute('aria-hidden', 'true');
            parallelPanel.style.maxHeight = null;
        }

        // Toggle state parameters for selected baseline item
        if (!isCurrentlyExpanded) {
            ongoingItem.classList.add('gb-faq-item-active');
            structuralTrigger.setAttribute('aria-expanded', 'true');
            ongoingPanel.setAttribute('aria-hidden', 'false');
            
            // Calculate absolute performance height bounds dynamically to trigger pure GPU layout sweeps
            ongoingPanel.style.maxHeight = ongoingPanel.scrollHeight + 'px';
        } else {
            ongoingItem.classList.remove('gb-faq-item-active');
            structuralTrigger.setAttribute('aria-expanded', 'false');
            ongoingPanel.setAttribute('aria-hidden', 'true');
            ongoingPanel.style.maxHeight = null;
        }
    });
});

/* ======================================================
   FOOTER
====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly embedded Lucide vector nodes securely inside the footer stack
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const newsletterForm = document.getElementById('gb-footer-newsletter-form');
    const emailInput = document.getElementById('gb-footer-newsletter-email');
    const statusMessage = document.getElementById('gb-footer-status-message');

    if (!newsletterForm || !emailInput || !statusMessage) return;

    /**
     * Symmetrical Luxury Newsletter Form Processing Subroutine
     * Custom lightweight validation regex protects UX integrity without library dependencies
     */
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const rawEmailValue = emailInput.value.trim();
        // Rigid high-spec regular expression mapping rule for formal e-mail contexts
        const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Clear current visual classification markers
        statusMessage.textContent = '';
        statusMessage.className = 'gb-footer-status-msg';

        if (rawEmailValue === '') {
            statusMessage.textContent = 'Please provide an email address.';
            statusMessage.classList.add('error');
            emailInput.focus();
            return;
        }

        if (!emailValidationRegex.test(rawEmailValue)) {
            statusMessage.textContent = 'Please provide a valid luxury email address.';
            statusMessage.classList.add('error');
            emailInput.focus();
            return;
        }

        // Simulating high-speed secure API checkout handshake sequence
        statusMessage.textContent = 'Processing your connection securely...';
        statusMessage.classList.add('success');
        newsletterForm.style.pointerEvents = 'none';
        newsletterForm.style.opacity = '0.7';

        setTimeout(() => {
            statusMessage.textContent = 'Welcome to the inner circle. Check your inbox for sparkles.';
            emailInput.value = '';
            newsletterForm.style.pointerEvents = '';
            newsletterForm.style.opacity = '';
            
            // Auto disappear success messages block smoothly after short buffer timeframe
            setTimeout(() => {
                if(statusMessage.classList.contains('success')) {
                    statusMessage.textContent = '';
                    statusMessage.className = 'gb-footer-status-msg';
                }
            }, 6000);

        }, 1500);
    });
});