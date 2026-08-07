/**
 * GLITTER BOUTIQUE - CONTACT US PREMIUM LUXURY CONTROLLER
 * Architectural Focus: Kinetic Canvas Particles, Asynchronous Handshakes, Dynamic Validations & FAQ Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Verify and map Lucide node vector configurations context parameters immediately
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const conciergeForm = document.getElementById('gb-contact-concierge-form');
    const submitTriggerBtn = document.getElementById('gb-contact-btn-submit-trigger');
    const formFeedbackBanner = document.getElementById('gb-contact-banner-feedback');
    const scrollCtaTrigger = document.getElementById('gb-contact-btn-scroll-top');
    const revealTargetNodes = document.querySelectorAll('.gb-contact-reveal');

    /* ==========================================================================
       1. ANIMATED FLOATING GLITTER PARTICLES ENGINE (HERO REGION)
       ========================================================================== */
    const initializeGlitterCanvasSystem = () => {
        const glitterSpace = document.getElementById('gb-contact-glitter-space');
        if (!glitterSpace) return;

        const maxParticlesCount = 35;
        const particleNodesFragment = document.createDocumentFragment();

        for (let i = 0; i < maxParticlesCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = Math.random() > 0.66 ? '#EC1E79' : (Math.random() > 0.5 ? '#9B4F96' : '#FFFFFF');
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            // Randomize spatial layout generation indices coordinates
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // High performance transform transitions setup values bindings
            const operationalDuration = Math.random() * 8 + 6;
            const velocityDelay = Math.random() * -5;
            
            particle.style.transform = 'translateY(0px) scale(1)';
            particle.style.transition = `transform ${operationalDuration}s linear ${velocityDelay}s, opacity ${operationalDuration}s linear ${velocityDelay}s`;
            
            particleNodesFragment.appendChild(particle);

            // Frame animation recursive mapping thread handlers loops via script variables
            const runParticleKineticTrace = () => {
                const travelY = -(Math.random() * 100 + 40);
                const varianceScale = Math.random() * 0.5 + 0.5;
                
                particle.style.transform = `translateY(${travelY}px) scale(${varianceScale})`;
                particle.style.opacity = '0';

                setTimeout(() => {
                    particle.style.transition = 'none';
                    particle.style.transform = 'translateY(0px) scale(1)';
                    particle.style.opacity = Math.random() * 0.5 + 0.2;
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 80 + 20 + '%';
                    
                    // Force a browser architectural layout flush pass to register state changes properly
                    particle.offsetHeight; 
                    
                    particle.style.transition = `transform ${operationalDuration}s linear, opacity ${operationalDuration}s linear`;
                    runParticleKineticTrace();
                }, operationalDuration * 1000);
            };

            // Queue macro scheduling execution cycles down line
            setTimeout(runParticleKineticTrace, 50);
        }

        glitterSpace.appendChild(particleNodesFragment);
    };

    /* ==========================================================================
       2. CONCIERGE FORM DYNAMIC INPUTS FIELD VALIDATORSHANDSHAKE
       ========================================================================== */
    const fieldValidationMetricsRules = {
        fullname: { required: true, msg: 'Please enter your full name.' },
        email: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, msg: 'Please enter a valid email address.' },
        subject: { required: true, msg: 'Please add a subject.' },
        message: { required: true, minLength: 10, msg: 'Please write at least 10 characters.' }
    };

    const clearFieldAlertState = (fieldName) => {
        const elementInputNode = document.getElementById(`gb-${fieldName}`);
        const textIndicatorNode = document.getElementById(`err-gb-${fieldName}`);
        if (elementInputNode) elementInputNode.classList.remove('invalid-state');
        if (textIndicatorNode) textIndicatorNode.textContent = '';
    };

    const raiseFieldAlertState = (fieldName, message) => {
        const elementInputNode = document.getElementById(`gb-${fieldName}`);
        const textIndicatorNode = document.getElementById(`err-gb-${fieldName}`);
        if (elementInputNode) elementInputNode.classList.add('invalid-state');
        if (textIndicatorNode) textIndicatorNode.textContent = message;
    };

    const processSingleFieldEvaluation = (fieldName) => {
        const elementInputNode = document.getElementById(`gb-${fieldName}`);
        if (!elementInputNode) return true;

        const structuralRule = fieldValidationMetricsRules[fieldName];
        const normalizedValue = elementInputNode.value.trim();

        clearFieldAlertState(fieldName);

        if (structuralRule.required && normalizedValue === '') {
            raiseFieldAlertState(fieldName, structuralRule.msg);
            return false;
        }
        if (structuralRule.pattern && !structuralRule.pattern.test(normalizedValue)) {
            raiseFieldAlertState(fieldName, structuralRule.msg);
            return false;
        }
        if (structuralRule.minLength && normalizedValue.length < structuralRule.minLength) {
            raiseFieldAlertState(fieldName, structuralRule.msg);
            return false;
        }

        return true;
    };

    if (conciergeForm) {
        Object.keys(fieldValidationMetricsRules).forEach((fieldName) => {
            const node = document.getElementById(`gb-${fieldName}`);
            if (node) {
                node.addEventListener('input', () => processSingleFieldEvaluation(fieldName));
                node.addEventListener('blur', () => processSingleFieldEvaluation(fieldName));
            }
        });

        conciergeForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let isFormSequenceValid = true;
            Object.keys(fieldValidationMetricsRules).forEach((fieldName) => {
                const result = processSingleFieldEvaluation(fieldName);
                if (!result) isFormSequenceValid = false;
            });

            if (!isFormSequenceValid) {
                const targetFaultyNode = conciergeForm.querySelector('.invalid-state');
                if (targetFaultyNode) targetFaultyNode.focus();
                return;
            }

            // Engage Submit Loading State Indicators
            submitTriggerBtn.disabled = true;
            submitTriggerBtn.classList.add('loading-active');
            formFeedbackBanner.textContent = '';
            formFeedbackBanner.className = 'gb-contact-banner-feedback';

            // Simulate High-End Concierge Endpoint Handshake Latency Loops
            setTimeout(() => {
                submitTriggerBtn.disabled = false;
                submitTriggerBtn.classList.remove('loading-active');
                
                formFeedbackBanner.textContent = 'Thank you. Your message has been sent to our team.';
                formFeedbackBanner.classList.add('success');
                
                conciergeForm.reset();

                setTimeout(() => {
                    formFeedbackBanner.textContent = '';
                    formFeedbackBanner.className = 'gb-contact-banner-feedback';
                }, 5000);
            }, 2000);
        });
    }

    /* ==========================================================================
       3. NATIVE FAQS SINGLE OPEN INTERACTIVE ACCORDION MODULE
       ========================================================================== */
    const accordionHub = document.querySelector('.gb-contact-accordion-hub');
    if (accordionHub) {
        accordionHub.addEventListener('click', (event) => {
            const activeTrigger = event.target.closest('.gb-contact-faq-trigger');
            if (!activeTrigger) return;

            const ongoingItem = activeTrigger.closest('.gb-contact-faq-item');
            const ongoingPanel = ongoingItem.querySelector('.gb-contact-faq-panel');
            const isCurrentlyExpanded = activeTrigger.getAttribute('aria-expanded') === 'true';

            // Locate and systematically collapse any alternative active accordion panels
            const parallelActiveItem = accordionHub.querySelector('.gb-contact-faq-item-active');
            if (parallelActiveItem && parallelActiveItem !== ongoingItem) {
                const parallelTrigger = parallelActiveItem.querySelector('.gb-contact-faq-trigger');
                const parallelPanel = parallelActiveItem.querySelector('.gb-contact-faq-panel');

                parallelActiveItem.classList.remove('gb-contact-faq-item-active');
                parallelTrigger.setAttribute('aria-expanded', 'false');
                parallelPanel.setAttribute('aria-hidden', 'true');
                parallelPanel.style.maxHeight = null;
            }

            // Toggle selected item metrics parameters
            if (!isCurrentlyExpanded) {
                ongoingItem.classList.add('gb-contact-faq-item-active');
                activeTrigger.setAttribute('aria-expanded', 'true');
                ongoingPanel.setAttribute('aria-hidden', 'false');
                ongoingPanel.style.maxHeight = ongoingPanel.scrollHeight + 'px';
            } else {
                ongoingItem.classList.remove('gb-contact-faq-item-active');
                activeTrigger.setAttribute('aria-expanded', 'false');
                ongoingPanel.setAttribute('aria-hidden', 'true');
                ongoingPanel.style.maxHeight = null;
            }
        });
    }

    /* ==========================================================================
       4. LUXURY NEWSLETTER SUBSYSTEM FORM HANDSHAKE
       ========================================================================== */
    const newsForm = document.getElementById('gb-contact-news-sub-form');
    const newsEmail = document.getElementById('gb-contact-news-email');
    const newsStatus = document.getElementById('gb-contact-news-status-msg');

    if (newsForm && newsEmail && newsStatus) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const mailVal = newsEmail.value.trim();
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            newsStatus.className = 'gb-contact-news-status';
            newsStatus.textContent = '';

            if (mailVal === '' || !regex.test(mailVal)) {
                newsStatus.textContent = 'Please enter a valid email address.';
                newsStatus.classList.add('error');
                newsEmail.focus();
                return;
            }

            newsStatus.textContent = 'Subscribing...';
            newsStatus.classList.add('success');

            setTimeout(() => {
                newsStatus.textContent = 'You are subscribed. Welcome to Glitter Boutique.';
                newsEmail.value = '';
                setTimeout(() => { newsStatus.textContent = ''; newsStatus.className = 'gb-contact-news-status'; }, 4000);
            }, 1200);
        });
    }

    /* ==========================================================================
       5. NATIVE INTUITIVE SCROLL REVEAL & ANCHOR ROUTINES
       ========================================================================== */
    if (scrollCtaTrigger) {
        scrollCtaTrigger.addEventListener('click', () => {
            const formTitle = document.getElementById('gb-contact-form-section-title');
            if (formTitle) {
                formTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    const observerConfig = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.12 };
    
    const handleEntranceIntersection = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('gb-contact-visible');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    };

    const visualRevealObserver = new IntersectionObserver(handleEntranceIntersection, observerConfig);
    revealTargetNodes.forEach((nodeItem) => visualRevealObserver.observe(nodeItem));

    // Execute initialization pipelines scripts threads
    initializeGlitterCanvasSystem();
});