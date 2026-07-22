/**
 * GLITTER BOUTIQUE - ABOUT HERO SECTION INTERACTION DRIVER
 * Architectural Focus: Clean Layer Performance Execution
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /**
     * Note: The Entrance fade-up state transitions and cinematic active alternate 
     * Ken Burns image transformations operate natively via high-performance, 
     * GPU-accelerated CSS engine properties (will-change: transform).
     *
     * This isolates calculations entirely away from the browser main execution thread, 
     * preserving premium page score optimization levels with zero redundant script overhead.
     */
});

/**
 * GLITTER BOUTIQUE - OUR STORY SECTION CONTROLLER
 * Architectural Focus: Hardware-Accelerated Viewport Scroll Reveal Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly added Lucide dynamic vector shapes safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const revealElements = document.querySelectorAll([
        '.gb-story-reveal-left', 
        '.gb-story-reveal-right'
    ].join(','));
    
    if (revealElements.length === 0) return;

    // Premium GPU-Backed Intersection Configurations Matrix
    const observerOptions = {
        root: null, // Default viewport boundary scope
        rootMargin: '0px 0px -80px 0px', // Animate baseline prior to complete screen entry
        threshold: 0.15 // Fire sequence callback once 15% node layer parameter surfaces
    };

    const handleRevealIntersection = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('gb-story-visible');
                // Unobserve node element permanently once visual translation terminates successfully
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(handleRevealIntersection, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

/**
 * GLITTER BOUTIQUE - MISSION & VISION ACCELERATOR CONTROLLER
 * Architectural Focus: Non-Blocking Structural Intersection Observer Reveal Loop
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify and map vector asset models safely if loaded into workspace
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const revealCards = document.querySelectorAll('.gb-mission-reveal-node');
    if (revealCards.length === 0) return;

    // Advanced Scroll Precision Tuning Configs
    const targetObserverOptions = {
        root: null, // Track viewport boundary matrix natively
        rootMargin: '0px 0px -60px 0px', // Fire callback sequence prior to absolute screen entry baseline
        threshold: 0.12 // Execute transformation loop once 12% card coordinate is exposed
    };

    const handleCardRevealIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Introduce micro staggered flow parameters to enhance premium interface rhythm
                setTimeout(() => {
                    entry.target.classList.add('gb-mission-visible');
                }, index * 80);

                // Unobserve card layer target node instantly once locked down visible to optimize system cycles
                observer.unobserve(entry.target);
            }
        });
    };

    const cardObserverInstance = new IntersectionObserver(handleCardRevealIntersection, targetObserverOptions);

    revealCards.forEach(cardNode => {
        cardObserverInstance.observe(cardNode);
    });
});

/**
 * GLITTER BOUTIQUE - QUALITY & CRAFTSMANSHIP CONTROLLER
 * Architectural Focus: Asynchronous Element Node Scroll Intersection Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly added Lucide dynamic vector shapes safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const scrollNodes = document.querySelectorAll([
        '.gb-quality-reveal-scale',
        '.gb-quality-reveal-slide'
    ].join(','));

    if (scrollNodes.length === 0) return;

    // Advanced GPU Layout Intersection Configuration Dict
    const scrollObserverOptions = {
        root: null, // Track layout within default viewport layer
        rootMargin: '0px 0px -70px 0px', // Fire sequence prior to precise base screen intersection
        threshold: 0.12 // Trigger callback loop once 12% layer model surfaces
    };

    const handleScrollRevealIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Introduce micro rhythmic delay pacing shifts to elevate interface flow layout feel
                setTimeout(() => {
                    entry.target.classList.add('gb-quality-visible');
                }, index * 60);

                // Disengage observer loops from node permanently once visual processing terminates successfully
                observer.unobserve(entry.target);
            }
        });
    };

    const targetScrollObserver = new IntersectionObserver(handleScrollRevealIntersection, scrollObserverOptions);

    scrollNodes.forEach(nodeElement => {
        targetScrollObserver.observe(nodeElement);
    });
});


/**
 * GLITTER BOUTIQUE - BRAND JOURNEY CONTROLLER
 * Architectural Focus: Scroll-Linked Timeline Progress Vector & Staggered Reveal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const journeySection = document.querySelector('.gb-journey');
    const scrollFill = document.getElementById('gb-journey-scroll-fill');
    const revealSteps = document.querySelectorAll('.gb-journey-reveal-node');

    if (!journeySection || !revealSteps.length) return;

    /* ======================================================
       1. CHOREOGRAPHED DYNAMIC AXIS TIMELINE PROGRESS ENGINE
       ====================================================== */
    const updateTimelineProgressTrack = () => {
        const targetBounds = journeySection.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        // Establish spatial activation calculation zones 
        const entranceBreakpoint = screenHeight * 0.75;
        const totalCalculatedTravel = targetBounds.height - (screenHeight * 0.3);
        const relativePositionTraveled = entranceBreakpoint - targetBounds.top;

        // Constraints scaling boundary checks between safe limits 0-100%
        let currentFillPercentage = (relativePositionTraveled / totalCalculatedTravel) * 100;
        currentFillPercentage = Math.max(0, Math.min(100, currentFillPercentage));

        // Implement hardware-accelerated transform logic translation shifts
        if (scrollFill) {
            scrollFill.style.transform = `translateY(${-100 + currentFillPercentage}%)`;
        }

        // Active State Matrix Loop: Highlight markers as scroll fill matches layout metrics
        revealSteps.forEach((stepNode) => {
            const markerNode = stepNode.querySelector('.gb-journey-axis-marker');
            if (!markerNode) return;

            const markerPositionTop = markerNode.getBoundingClientRect().top;
            
            if (markerPositionTop < screenHeight * 0.55) {
                markerNode.classList.add('gb-journey-axis-marker-active');
            } else {
                markerNode.classList.remove('gb-journey-axis-marker-active');
            }
        });
    };

    window.addEventListener('scroll', updateTimelineProgressTrack, { passive: true });
    window.addEventListener('resize', updateTimelineProgressTrack, { passive: true });

    /* ======================================================
       2. ASYNCHRONOUS STAGGERED VIEWPORT REVEAL LOOP
       ===================================================== */
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const handleStepEntranceReveal = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply subtle staggered timing flow constraints
                setTimeout(() => {
                    entry.target.classList.add('gb-journey-visible');
                }, index * 80);
                
                observer.unobserve(entry.target);
            }
        });
    };

    const stepRevealObserver = new IntersectionObserver(handleStepEntranceReveal, scrollObserverOptions);

    revealSteps.forEach((stepElement) => {
        stepRevealObserver.observe(stepElement);
    });

    // Initial check execution loops to process items visible immediately on render trigger
    updateTimelineProgressTrack();
});

/**
 * GLITTER BOUTIQUE - THE GLITTER EXPERIENCE CONTROLLER
 * Architectural Focus: Performance Non-Blocking Viewport Node Reveal Interceptor
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify and map vector asset icons cleanly if active
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const revealNodes = document.querySelectorAll('.gb-experience-reveal-node');
    if (revealNodes.length === 0) return;

    // Advanced Precision GPU Scroll Intersection Settings
    const revealObserverOptions = {
        root: null, // Track layout within native viewport boundary box
        rootMargin: '0px 0px -60px 0px', // Execute slightly prior to complete screen baseline coordinate boundary crossing
        threshold: 0.12 // Fire sequence once 12% layer model parameters surface
    };

    const handleNodeRevealIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Introduce micro-staggered execution pace offsets to enrich interface rhythm
                setTimeout(() => {
                    entry.target.classList.add('gb-experience-visible');
                }, index * 70);

                // Disengage tracking permanently once visual state locks visible to scale processor efficiency
                observer.unobserve(entry.target);
            }
        });
    };

    const visualRevealObserver = new IntersectionObserver(handleNodeRevealIntersection, revealObserverOptions);

    revealNodes.forEach(targetNode => {
        visualRevealObserver.observe(targetNode);
    });
});

/**
 * GLITTER BOUTIQUE - BRAND BY THE NUMBERS ACCELERATOR DRIVER
 * Architectural Core: High-Spec Precision Easing Count-Up & Intersection Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly added Lucide dynamic vector shapes safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const statsGrid = document.querySelector('.gb-stats-grid');
    const metricCards = document.querySelectorAll('.gb-stats-reveal-node');
    if (!statsGrid || !metricCards.length) return;

    /* ======================================================
       1. DESKTOP RADIAL MOUSE GLOW MOVEMENT INTERCEPT
       ====================================================== */
    const activateMouseGlowSystem = () => {
        // Evaluate framework viewport parameter bounds to isolate touch/mobile devices
        if (window.innerWidth < 993) return;

        metricCards.forEach((cardElement) => {
            cardElement.addEventListener('mousemove', (event) => {
                const vectorBoundingBox = cardElement.getBoundingClientRect();
                const computeCoordinateX = event.clientX - vectorBoundingBox.left;
                const computeCoordinateY = event.clientY - vectorBoundingBox.top;

                cardElement.style.setProperty('--mouse-x', `${computeCoordinateX}px`);
                cardElement.style.setProperty('--mouse-y', `${computeCoordinateY}px`);
            });
        });
    };

    /* ======================================================
       2. RECURSIVE HIGH-PERFORMANCE INT COUNTER ENGINE
       ====================================================== */
    /**
     * Luxury Exponential Out Easing Formula
     * Slows transition parameters organically as completion boundary approaches
     */
    const computeLuxuryEasingOut = (progressRatio) => {
        return progressRatio === 1 ? 1 : 1 - Math.pow(2, -10 * progressRatio);
    };

    const animateCardCounterValue = (cardNode) => {
        const valueDisplayNode = cardNode.querySelector('.gb-stats-number');
        if (!valueDisplayNode) return;

        const endpointTarget = parseFloat(cardNode.getAttribute('data-target-value'));
        const dynamicFormat = cardNode.getAttribute('data-format') || 'integer';
        
        const animationTotalDuration = 2800; // Calibrated 2.8 second run execution window
        let timestampStart = null;

        const runningFrameExecution = (currentHighResTimestamp) => {
            if (!timestampStart) timestampStart = currentHighResTimestamp;
            const elapsedTimeDelta = currentHighResTimestamp - timestampStart;
            const continuousProgressRatio = Math.min(elapsedTimeDelta / animationTotalDuration, 1);
            
            // Inject luxury curve profiles into raw progress mapping vectors
            const computedEaseStep = computeLuxuryEasingOut(continuousProgressRatio);
            const intermediateCurrentVal = computedEaseStep * endpointTarget;

            // Format copy values contextually based on architectural targets
            if (dynamicFormat === 'decimal') {
                valueDisplayNode.textContent = intermediateCurrentVal.toFixed(1);
            } else {
                valueDisplayNode.textContent = Math.floor(intermediateCurrentVal).toLocaleString();
            }

            if (continuousProgressRatio < 1) {
                requestAnimationFrame(runningFrameExecution);
            } else {
                // Ensure absolute numerical completion locks exactly on boundary targets
                if (dynamicFormat === 'decimal') {
                    valueDisplayNode.textContent = endpointTarget.toFixed(1);
                } else {
                    valueDisplayNode.textContent = endpointTarget.toLocaleString();
                }
                
                // Trigger premium final flash polish shimmer transformation animation
                cardNode.classList.add('gb-stats-shimmer-active');
            }
        };

        requestAnimationFrame(runningFrameExecution);
    };

    /* ======================================================
       3. INTERSECTION OBSERVER ENTRANCE COORDINATOR HUB
       ====================================================== */
    const intersectionConfig = {
        root: null, // Track layout intersecting default viewport boundary
        rootMargin: '0px 0px -50px 0px', // Fire sequence prior to absolute screen structural overlap
        threshold: 0.15 // Fire sequence once 15% card boundary layer surfaces
    };

    const handleEntranceIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const targetedCardNode = entry.target;

                // Fire staggered entrance visibility shifts smoothly
                setTimeout(() => {
                    targetedCardNode.classList.add('gb-stats-visible');
                    // Initiate non-blocking precision count sequence loops instantly
                    animateCardCounterValue(targetedCardNode);
                }, index * 80);

                // Disengage monitoring parameters permanently to enforce the strict Play-Once constraint
                observer.unobserve(targetedCardNode);
            }
        });
    };

    const analyticsObserverInstance = new IntersectionObserver(handleEntranceIntersection, intersectionConfig);

    metricCards.forEach((cardNode) => {
        analyticsObserverInstance.observe(cardNode);
    });

    // Execute setup steps configuration threads
    activateMouseGlowSystem();
});

/**
 * GLITTER BOUTIQUE - EDITORIAL CREATIVE TEAM CONTROLLER
 * Architectural Focus: Hardware-Accelerated 3D Tilt Matrix & Spotlight Pointer Trackers
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly added Lucide dynamic vector shapes safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const teamGrid = document.querySelector('.gb-team-grid');
    const memberCards = document.querySelectorAll('.gb-team-card');
    const revealWrappers = document.querySelectorAll('.gb-team-reveal-node');

    if (!teamGrid || !memberCards.length) return;

    /* ======================================================
       1. INTERACTIVE MOUSE 3D TILT & CONCIERGE SPOTLIGHT ENGINE
       ====================================================== */
    const initializeCardMicroInteractions = () => {
        // Enforce safe boundary limits: Skip tilt logic processing cycles on touch viewports
        if (window.innerWidth < 993) return;

        memberCards.forEach((card) => {
            
            card.addEventListener('mousemove', (event) => {
                const boundingBox = card.getBoundingClientRect();
                
                // Track relative cursor coordinates inside the active card canvas
                const positionX = event.clientX - boundingBox.left;
                const positionY = event.clientY - boundingBox.top;
                
                // Inject structural pointer values straight onto custom CSS spotlight elements
                card.style.setProperty('--spotlight-x', `${positionX}px`);
                card.style.setProperty('--spotlight-y', `${positionY}px`);

                // Compute high-precision asymmetric angular ratios for tilt matrices
                const midPointX = boundingBox.width / 2;
                const midPointY = boundingBox.height / 2;
                
                const degreesTiltX = ((positionY - midPointY) / midPointY) * -6; // Maximum 6 degree rotation limits
                const degreesTiltY = ((positionX - midPointX) / midPointX) * 6;

                // Push physical translation parameters safely using fluid transform strings
                card.style.transform = `rotateX(${degreesTiltX}deg) rotateY(${degreesTiltY}deg) scale3d(1.01, 1.01, 1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                // Restore spatial variables smoothly back to reference baseline targets
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    };

    /* ======================================================
       2. ASYNCHRONOUS SCROLL REVEAL OBSERVER LOOP
       ====================================================== */
    const revealOptions = {
        root: null, // Track viewport overlap natively
        rootMargin: '0px 0px -70px 0px', // Execute sequence prior to complete baseline cross
        threshold: 0.12 // Trigger callback once 12% layer is exposed
    };

    const handleTeamEntranceReveal = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply a micro staggered entry timeline delay to build interface rhythmic pacing
                setTimeout(() => {
                    entry.target.classList.add('gb-team-visible');
                }, index * 80);

                // Unobserve card layer permanently to enforce strict play-once restrictions
                observer.unobserve(entry.target);
            }
        });
    };

    const teamRevealObserver = new IntersectionObserver(handleTeamEntranceReveal, revealOptions);

    revealWrappers.forEach((wrapperNode) => {
        teamRevealObserver.observe(wrapperNode);
    });

    // Execute configuration initialization pipelines
    initializeCardMicroInteractions();
});

/**
 * GLITTER BOUTIQUE - AWARDS, RECOGNITION & TRUSTED PARTNERS DRIVER
 * Architectural Focus: Pointer Reactive Glow Vectors, Shimmer Handshakes & Scroll Intersection Observers
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify and map vector icon elements if embedded into window environment layout layers
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const awardHeroCard = document.getElementById('gb-awards-hero-card');
    const revealTargetNodes = document.querySelectorAll('.gb-awards-reveal-node');

    if (!revealTargetNodes.length) return;

    /* ======================================================
       1. DESKTOP CURSOR-TRACK SPOTLIGHT MATRICES
       ====================================================== */
    const initializeSpotlightTracker = () => {
        if (!awardHeroCard || window.innerWidth < 993) return;

        awardHeroCard.addEventListener('mousemove', (event) => {
            const elementBoundingBox = awardHeroCard.getBoundingClientRect();
            
            // Compute real-time pixel coordinates relative to target element dimensions
            const pointerCoordinateX = event.clientX - elementBoundingBox.left;
            const pointerCoordinateY = event.clientY - elementBoundingBox.top;

            awardHeroCard.style.setProperty('--glow-x', `${pointerCoordinateX}px`);
            awardHeroCard.style.setProperty('--glow-y', `${pointerCoordinateY}px`);
        });
    };

    /* ======================================================
       2. RECURRING SHIMMER TIMELINE FLASHER HANDSHAKE
       ====================================================== */
    const initializeRecurringShimmerLoop = () => {
        if (!awardHeroCard) return;

        // Triggers structural linear reflection animation sweep on fixed intervals
        setInterval(() => {
            awardHeroCard.classList.add('gb-awards-shimmer-run');
            
            // Clean up state configuration tag once transformation finish line crosses
            setTimeout(() => {
                awardHeroCard.classList.remove('gb-awards-shimmer-run');
            }, 1850);

        }, 4500); // Executed sweep cycle loops every 4.5 seconds
    };

    /* ======================================================
       3. NATIVE SCROLL ENTRANCE INTERSECTION REVEAL MODULE
       ====================================================== */
    const observerConfigurationOptions = {
        root: null, // Tracking intersecting target layout within native viewport bounds
        rootMargin: '0px 0px -60px 0px', // Execute slightly prior to absolute cross marks
        threshold: 0.12 // Trigger callback loop once 12% layer model surfaces
    };

    const handleScrollEntranceReveal = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const targetNodeElement = entry.target;

                // Inject a micro staggered pacing timeline delay metric to enrich brand feel
                setTimeout(() => {
                    targetNodeElement.classList.add('gb-awards-visible');
                }, index * 80);

                // Disengage monitoring parameters instantly once visuals lock visible to clear resources
                observer.unobserve(targetNodeElement);
            }
        });
    };

    const internalRevealObserver = new IntersectionObserver(handleScrollEntranceReveal, observerConfigurationOptions);

    revealTargetNodes.forEach((nodeItem) => {
        internalRevealObserver.observe(nodeItem);
    });

    // Execute core micro interaction pipelines setup
    initializeSpotlightTracker();
    initializeRecurringShimmerLoop();
});