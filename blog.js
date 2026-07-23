/* ========================================================
   HOME PAGE - BEAUTY TIPS & INSPIRATION BLOG DRIVER
======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify and map vector icon elements if embedded into window workspace context layers
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const blogHeroCard = document.querySelector('.gb-home-blog-hero');
    const revealTargetCards = document.querySelectorAll('.gb-home-blog-reveal');

    if (!revealTargetCards.length) return;

    /* ========================================================
       1. DESKTOP HERO CARD CURSOR MOVEMENT SPOTLIGHT TRACER
       ======================================================== */
    const initializeBlogSpotlightTracker = () => {
        if (!blogHeroCard || window.innerWidth < 993) return;

        blogHeroCard.addEventListener('mousemove', (event) => {
            const boundingBoxMatrix = blogHeroCard.getBoundingClientRect();
            
            // Compute real-time relative cursor tracking vectors coordinates
            const coordinateX = event.clientX - boundingBoxMatrix.left;
            const coordinateY = event.clientY - boundingBoxMatrix.top;

            blogHeroCard.style.setProperty('--mouse-x', `${coordinateX}px`);
            blogHeroCard.style.setProperty('--mouse-y', `${coordinateY}px`);
        });
    };

    /* ========================================================
       2. NATIVE ASYNCHRONOUS VIEWPORT INTERSECTION REVEAL LOOP
       ======================================================== */
    const observerConfigurationOptions = {
        root: null, // Tracks element boundary intercepts natively within standard viewport limits
        rootMargin: '0px 0px -60px 0px', // Fire sequence loops slightly before complete entry cross bounds
        threshold: 0.12 // Trigger reveal processing callback once 12% card coordinate surfaces
    };

    const handleBlogEntranceRevealIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const targetCardNode = entry.target;

                // Inject a subtle micro staggered timeline delay modifier step to enrich home pacing metrics
                setTimeout(() => {
                    targetCardNode.classList.add('gb-home-blog-visible');
                }, index * 60);

                // Disengage tracking loops permanently to enforce the strict Play-Once parameters constraint
                observer.unobserve(targetCardNode);
            }
        });
    };

    const editorialBlogRevealObserver = new IntersectionObserver(handleBlogEntranceRevealIntersection, observerConfigurationOptions);

    revealTargetCards.forEach((cardNodeItem) => {
        editorialBlogRevealObserver.observe(cardNodeItem);
    });

    // Execute core micro interaction setup pipeline channels
    initializeBlogSpotlightTracker();
});