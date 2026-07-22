/**
 * GLITTER BOUTIQUE - LUXURY PRODUCTS ENGINE CONTROLLER
 * Architectural Focus: Sticky Intercepts, Real-time Category Sorting Frameworks, Hardware 3D Matrix Tilts
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly added Lucide dynamic vector shapes safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const stickyBarNode = document.getElementById('gb-products-sticky-bar');
    const tiltTargetImg = document.getElementById('gb-products-tilt-target');
    const catalogCards = document.querySelectorAll('.gb-products-card');
    const scrollRevealTargets = document.querySelectorAll('.gb-products-reveal');

    /* =====================================================
       1. STICKY INTERCEPT INTEL-MONITOR HANDSHAKE ROUTINE
       ===================================================== */
    const processStickyBarVisualContraction = () => {
        if (!stickyBarNode) return;
        
        // Evaluates baseline clearance values based on actual document scroll thresholds
        const verticalScrollDelta = window.scrollY || document.documentElement.scrollTop;

        if (verticalScrollDelta > 40) {
            stickyBarNode.classList.add('gb-products-sticky-active');
        } else {
            stickyBarNode.classList.remove('gb-products-sticky-active');
        }
    };

    window.addEventListener('scroll', processStickyBarVisualContraction, { passive: true });

    /* =====================================================
       2. REAL-TIME REAL CATALOG DATA CATEGORY FILTERING FRAMEWORK
       ===================================================== */
    const initializeCatalogFilteringRouter = () => {
        const filterControlsHub = document.querySelector('.gb-products-filter-list');
        if (!filterControlsHub) return;

        filterControlsHub.addEventListener('click', (event) => {
            const activeTriggerBtn = event.target.closest('.gb-products-filter-btn');
            if (!activeTriggerBtn || activeTriggerBtn.classList.contains('gb-products-filter-active')) return;

            // Shift active state visual marker class properties smoothly
            filterControlsHub.querySelector('.gb-products-filter-active').classList.remove('gb-products-filter-active');
            activeTriggerBtn.classList.add('gb-products-filter-active');

            const selectedTargetCategory = activeTriggerBtn.getAttribute('data-category');

            catalogCards.forEach((card) => {
                const embeddedCardPillarTypes = card.getAttribute('data-product-type') || '';
                
                // Perform deep index inspection to process clean item hiding loops
                if (selectedTargetCategory === 'all' || embeddedCardPillarTypes.includes(selectedTargetCategory)) {
                    card.style.display = '';
                    // Structural refinement reset layout entry frames slightly to animate smoothly
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0) scale(1)'; }, 30);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.98)';
                    // Defer physical removal parameters to synchronize gracefully with operational transitions
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    };

    /* =====================================================
       3. DESKTOP RADIAL CARDS SPOTLIGHT & KINETIC 3D MOTION
       ===================================================== */
    const configureDesktopPremiumInteractions = () => {
        if (window.innerWidth < 993) return; // Terminate and preserve processing cycles on mobile viewports

        // Interaction A: Cards Mouse Spotlights Tracking Vector Map Loops
        catalogCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const boundsMatrix = card.getBoundingClientRect();
                const relativeX = e.clientX - boundsMatrix.left;
                const relativeY = e.clientY - boundsMatrix.top;

                card.style.setProperty('--mouse-x', `${relativeX}px`);
                card.style.setProperty('--mouse-y', `${relativeY}px`);
            });
        });

        // Interaction B: Cinematic Apple Style Image 3D Angular Tilt Hands
        if (tiltTargetImg) {
            const parentFrame = tiltTargetImg.parentElement;

            parentFrame.addEventListener('mousemove', (e) => {
                const dimensions = parentFrame.getBoundingClientRect();
                const offsetX = e.clientX - dimensions.left;
                const offsetY = e.clientY - dimensions.top;

                const centerPointX = dimensions.width / 2;
                const centerPointY = dimensions.height / 2;

                const rotationalAngleX = ((offsetY - centerPointY) / centerPointY) * -8; // Restricted maximum 8 degree bounds
                const rotationalAngleY = ((offsetX - centerPointX) / centerPointX) * 8;

                tiltTargetImg.style.transform = `rotateX(${rotationalAngleX}deg) rotateY(${rotationalAngleY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            parentFrame.addEventListener('mouseleave', () => {
                tiltTargetImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        }
    };

    /* =====================================================
       4. ASYNCHRONOUS SCROLL BOUND VIEWPORT REVEAL LOOP
       ===================================================== */
    const initializeIntersectionRevealSystem = () => {
        if (!scrollRevealTargets.length) return;

        const observerConfig = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        };

        const handleElementEntranceReveal = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Inject a clean micro-stagger timeline pacing filter to optimize interface rhythms
                    setTimeout(() => {
                        entry.target.classList.add('gb-products-visible');
                    }, index * 60);

                    observer.unobserve(entry.target);
                }
            });
        };

        const coreRevealObserver = new IntersectionObserver(handleElementEntranceReveal, observerConfig);

        scrollRevealTargets.forEach((target) => coreRevealObserver.observe(target));
    };

    // Initialize Global Pipelines Threads
    initializeCatalogFilteringRouter();
    configureDesktopPremiumInteractions();
    initializeIntersectionRevealSystem();
    processStickyBarVisualContraction();
});