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
    const mobileLinks = Array.from(document.querySelectorAll('.gb-navbar-mobile-link'));
    
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

    // Close mobile overlay whenever a mobile navigation link is clicked
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                closeMobileMenu();
            }
        });
    });

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
        const addCartBtn = event.target.closest('[data-gb-home-add-cart]');

        if (quickViewBtn) {
            const productTitle = quickViewBtn.closest('.gb-product-card').querySelector('.gb-product-title').textContent;
            // Production Hook Place: Wire custom corporate overlay modals directly here
            console.log(`Open Quick View Overlay Interface context for: ${productTitle}`);
        }

        if (wishlistBtn) {
            event.preventDefault();
            const productTitle = wishlistBtn.closest('.gb-product-card').querySelector('.gb-product-title').textContent;

            // Toggle local presentation logic for wishlist actioning tracking states
            const isActive = wishlistBtn.getAttribute('aria-pressed') === 'true';

            wishlistBtn.setAttribute('aria-pressed', String(!isActive));
            console.log(`Toggle wishlist database reference parameter updates for: ${productTitle}`);
        }

        if (addCartBtn) {
            event.preventDefault();

            const card = addCartBtn.closest('.gb-product-card');
            if (!card) return;

            const productTitle = card.querySelector('.gb-product-title')?.textContent || 'Product';
            const labelSpan = addCartBtn.querySelector('span');

            addCartBtn.classList.add('gb-product-add-cart-added');
            if (labelSpan) labelSpan.textContent = 'Added';

            // Minimal cart persistence + navbar badge update
            try {
                const key = 'gb_cart_home';
                const current = JSON.parse(localStorage.getItem(key) || '[]');
                current.push({ title: productTitle, ts: Date.now() });
                localStorage.setItem(key, JSON.stringify(current));

                const cartBadge = document.querySelector('.gb-navbar-cart-badge');
                if (cartBadge) cartBadge.textContent = String(current.length);
            } catch (e) {
                // fail silently
            }

            console.log(`Add to cart action triggered for: ${productTitle}`);
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

/**
 * GLITTER BOUTIQUE - CONTACT US PREMIUM LAYER CONTROLLER
 * Architectural Core: Asynchronous UX Operations & Non-Destructive Inline Field Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify and synchronize active Lucide icon elements context immediately
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Node Targeting Registry Matrix
    const contactForm = document.getElementById('gb-contact-main-form');
    const submitTrigger = document.getElementById('gb-contact-submit-trigger');
    const bannerResponse = document.getElementById('gb-contact-form-response');

    if (!contactForm) return;

    // Strict Field Validations Mapping Core Configuration
    const validationRules = {
        firstname: {
            required: true,
            msg: 'First name is required context.'
        },
        lastname: {
            required: true,
            msg: 'Last name is required context.'
        },
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            msg: 'Please specify a valid luxury email coordinate.'
        },
        subject: {
            required: true,
            msg: 'Subject parameter mapping missing.'
        },
        message: {
            required: true,
            minLength: 10,
            msg: 'Please extend your message criteria (Minimum 10 characters).'
        }
    };

    /**
     * Clear Single Error State Indication
     */
    const clearErrorIndicator = (fieldName) => {
        const fieldNode = document.getElementById(`gb-${fieldName}`);
        const textErrorNode = document.getElementById(`err-gb-${fieldName}`);
        
        if (fieldNode) fieldNode.classList.remove('invalid-state');
        if (textErrorNode) textErrorNode.textContent = '';
    };

    /**
     * Inject Active Single Error Indication Parameters
     */
    const raiseErrorIndicator = (fieldName, errorMessage) => {
        const fieldNode = document.getElementById(`gb-${fieldName}`);
        const textErrorNode = document.getElementById(`err-gb-${fieldName}`);
        
        if (fieldNode) fieldNode.classList.add('invalid-state');
        if (textErrorNode) {
            textErrorNode.textContent = errorMessage;
            textErrorNode.className = 'gb-contact-field-error';
        }
    };

    /**
     * Isolated Inline Component Single Field Validator Evaluation Loop
     */
    const evaluateFieldValidity = (fieldName) => {
        const fieldNode = document.getElementById(`gb-${fieldName}`);
        if (!fieldNode) return true;

        const rule = validationRules[fieldName];
        const fieldValue = fieldNode.value.trim();

        clearErrorIndicator(fieldName);

        if (rule.required && fieldValue === '') {
            raiseErrorIndicator(fieldName, rule.msg);
            return false;
        }

        if (rule.pattern && !rule.pattern.test(fieldValue)) {
            raiseErrorIndicator(fieldName, rule.msg);
            return false;
        }

        if (rule.minLength && fieldValue.length < rule.minLength) {
            raiseErrorIndicator(fieldName, rule.msg);
            return false;
        }

        return true;
    };

    // Attach real-time input correction tracking nodes to reduce submission frictions
    Object.keys(validationRules).forEach((fieldName) => {
        const fieldNode = document.getElementById(`gb-${fieldName}`);
        if (fieldNode) {
            fieldNode.addEventListener('input', () => evaluateFieldValidity(fieldName));
            fieldNode.addEventListener('blur', () => evaluateFieldValidity(fieldName));
        }
    });

    /**
     * Core Asynchronous Submission Dispatch Handler Thread
     */
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Enforce comprehensive sequence validations on form collection boundaries
        let isFormStrictlyValid = true;
        Object.keys(validationRules).forEach((fieldName) => {
            const isCurrentFieldValid = evaluateFieldValidity(fieldName);
            if (!isCurrentFieldValid) {
                isFormStrictlyValid = false;
            }
        });

        // Terminate and target focal point to first faulty node layout element if verification drops
        if (!isFormStrictlyValid) {
            const firstFaultyNode = contactForm.querySelector('.invalid-state');
            if (firstFaultyNode) firstFaultyNode.focus();
            return;
        }

        // Engage Hardware-Accelerated Submit Loading Handshake States
        submitTrigger.disabled = true;
        submitTrigger.classList.add('loading-active');
        bannerResponse.textContent = '';
        bannerResponse.className = 'gb-contact-response-banner';

        // Pack functional request payload fields securely
        const transmissionPayload = {
            firstname: document.getElementById('gb-firstname').value.trim(),
            lastname: document.getElementById('gb-lastname').value.trim(),
            email: document.getElementById('gb-email').value.trim(),
            phone: document.getElementById('gb-phone').value.trim(),
            subject: document.getElementById('gb-subject').value.trim(),
            message: document.getElementById('gb-message').value.trim()
        };

        // Simulate high-end backend microservice secure endpoint execution handshake delay
        setTimeout(() => {
            // Disengage hardware submit button configuration lock states
            submitTrigger.disabled = false;
            submitTrigger.classList.remove('loading-active');

            // Set operational success messages output metrics
            bannerResponse.textContent = 'Thank you. Your crystal concierge inquiry was dispatched flawlessly.';
            bannerResponse.classList.add('success');

            // Reset native collection fields securely
            contactForm.reset();

            // Symmetrical UX refinement: Smooth layout viewport scroll anchor to visual confirmation tracking
            bannerResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Clear successful transaction indicators buffer layer smoothly down the timeline
            setTimeout(() => {
                bannerResponse.textContent = '';
                bannerResponse.className = 'gb-contact-response-banner';
            }, 6000);

        }, 2200);
    });
});
// Ensure the navbar highlights the correct menu item based on the current page
document.addEventListener('DOMContentLoaded', () => {
    try {
        const links = Array.from(document.querySelectorAll('.gb-navbar-menu-link, .gb-navbar-mobile-link'));
        if (links.length === 0) return;

        const path = window.location.pathname;
        let current = path.substring(path.lastIndexOf('/') + 1);
        if (!current) current = 'index.html';

        links.forEach((link) => {
            try {
                const url = new URL(link.href, location.origin);
                let hrefFile = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
                if (!hrefFile) hrefFile = 'index.html';

                if (hrefFile === current) {
                    link.classList.add('gb-navbar-active');
                    if (link.classList.contains('gb-navbar-mobile-link')) {
                        link.classList.add('gb-navbar-mobile-active');
                    }
                } else {
                    link.classList.remove('gb-navbar-active');
                    if (link.classList.contains('gb-navbar-mobile-link')) {
                        link.classList.remove('gb-navbar-mobile-active');
                    }
                }
            } catch (e) {
                // ignore malformed hrefs
            }
        });
    } catch (e) {
        // fail-safe: do not throw
        console.error('Navbar active link script failed', e);
    }
});

/* ========================================================
   HOME PAGE - SHOP BY CATEGORIES MODULE DRIVER
======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly embedded lucide node vectors safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const sliderWorkspace = document.querySelector('.gb-home-category-slider-workspace');
    const trackView = document.getElementById('gb-home-cat-track-view');
    const arrowPrev = document.getElementById('gb-home-cat-arrow-prev');
    const arrowNext = document.getElementById('gb-home-cat-arrow-next');

    if (!trackView || !sliderWorkspace) return;

    /* ========================================================
       1. ARROW UTILITY INCREMENT SCROLL COMPONENT HANDSHAKE
       ======================================================== */
    const updateArrowVisibilityStates = () => {
        // Drop calculations instantly if arrows are intentionally hidden inside media matrices
        if (window.getComputedStyle(arrowPrev).display === 'none') return;

        const currentScrollLeft = trackView.scrollLeft;
        const maximumScrollLeft = trackView.scrollWidth - trackView.clientWidth;

        // Buffers micro pixel values to prevent edge clipping handshakes
        arrowPrev.style.opacity = currentScrollLeft <= 2 ? '0' : '1';
        arrowPrev.style.pointerEvents = currentScrollLeft <= 2 ? 'none' : 'auto';
        
        arrowNext.style.opacity = currentScrollLeft >= maximumScrollLeft - 2 ? '0' : '1';
        arrowNext.style.pointerEvents = currentScrollLeft >= maximumScrollLeft - 2 ? 'none' : 'auto';
    };

    const runHorizontalScrollStep = (direction) => {
        const offsetStepWidth = trackView.clientWidth * 0.65; // Scroll by 65% of screen width chunk metrics
        const targetScrollLeft = trackView.scrollLeft + (direction === 'next' ? offsetStepWidth : -offsetStepWidth);
        
        trackView.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });
    };

    if (arrowPrev && arrowNext) {
        arrowPrev.addEventListener('click', () => runHorizontalScrollStep('prev'));
        arrowNext.addEventListener('click', () => runHorizontalScrollStep('next'));
    }

    // Attach passive scrolling update loops
    trackView.addEventListener('scroll', updateArrowVisibilityStates, { passive: true });
    window.addEventListener('resize', updateArrowVisibilityStates, { passive: true });

    /* ========================================================
       2. FLUID MOUSE DRAG VELOCITY PHYSICS ENGINE
       ======================================================== */
    let isDraggingActive = false;
    let cursorPositionStartX = 0;
    let trackPositionScrollStartX = 0;

    trackView.addEventListener('mousedown', (event) => {
        // Prevent event triggering if middle click parameter is matched
        if (event.button !== 0) return;

        isDraggingActive = true;
        trackView.style.scrollBehavior = 'auto'; // Temporarily drop smooth easing variables to follow pointer values instantly
        
        cursorPositionStartX = event.pageX - trackView.offsetLeft;
        trackPositionScrollStartX = trackView.scrollLeft;
    });

    const terminateDragGestureLoop = () => {
        if (!isDraggingActive) return;
        isDraggingActive = false;
        trackView.style.scrollBehavior = 'smooth'; // Restore framework easing handshakes
    };

    trackView.addEventListener('mouseleave', terminateDragGestureLoop);
    trackView.addEventListener('mouseup', terminateDragGestureLoop);

    trackView.addEventListener('mousemove', (event) => {
        if (!isDraggingActive) return;
        event.preventDefault();

        const currentCursorX = event.pageX - trackView.offsetLeft;
        const calculatedDistanceTravelledX = (currentCursorX - cursorPositionStartX) * 1.5; // Integrates custom drag sensitivity modifier multipliers
        
        trackView.scrollLeft = trackPositionScrollStartX - calculatedDistanceTravelledX;
    });

    /* ========================================================
       3. NATIVE VISIBLE INTERSECTION OBSERVATION LAYER
       ======================================================== */
    const intersectionConfig = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    };

    const handleEntranceRevealIntersection = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('gb-home-category-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const moduleRevealObserver = new IntersectionObserver(handleEntranceRevealIntersection, intersectionConfig);
    moduleRevealObserver.observe(sliderWorkspace);

    // Run initial rendering layout configuration cycles
    setTimeout(updateArrowVisibilityStates, 200);
});