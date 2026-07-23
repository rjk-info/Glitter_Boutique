/**
 * GLITTER BOUTIQUE - PRODUCT DETAIL PAGE CONTEXT CONTROLLER
 * Architectural Core: Active Swatch Syncing, Gallery Shifting & Integer Quantity Stepper Formats
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Synchronize newly embedded lucide dynamic vectors cleanly
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* ==========================================================================
       1. PRODUCTION VARIANT SWATCH MUTATION ROUTER HANDSHAKE
       ========================================================================== */
    const swatchContainer = document.querySelector('.gb-pdp-swatches-row');
    if (swatchContainer) {
        swatchContainer.addEventListener('click', (event) => {
            const activeTrigger = event.target.closest('.gb-pdp-swatch-btn');
            if (!activeTrigger || activeTrigger.classList.contains('gb-pdp-swatch-active')) return;

            // Flip current internal tracking nodes visual parameters
            swatchContainer.querySelector('.gb-pdp-swatch-active').setAttribute('aria-checked', 'false');
            swatchContainer.querySelector('.gb-pdp-swatch-active').classList.remove('gb-pdp-swatch-active');
            
            activeTrigger.classList.add('gb-pdp-swatch-active');
            activeTrigger.setAttribute('aria-checked', 'true');

            const selectedFinishKey = activeTrigger.getAttribute('data-variant');
            console.log(`Database tracking link updates deployed target finish parameter: ${selectedFinishKey}`);
        });
    }

    /* ==========================================================================
       2. REUSABLE THUMBNAIL STRIP IMAGE CANVAS SLIDER MATRIX
       ========================================================================== */
    const thumbnailCluster = document.querySelector('.gb-pdp-gallery-thumbnails');
    const mainImgTarget = document.getElementById('gb-pdp-main-img-target');

    if (thumbnailCluster && mainImgTarget) {
        thumbnailCluster.addEventListener('click', (event) => {
            const activeThumb = event.target.closest('.gb-pdp-thumb-btn');
            if (!activeThumb || activeThumb.classList.contains('gb-pdp-thumb-active')) return;

            thumbnailCluster.querySelector('.gb-pdp-thumb-active').setAttribute('aria-selected', 'false');
            thumbnailCluster.querySelector('.gb-pdp-thumb-active').classList.remove('gb-pdp-thumb-active');

            activeThumb.classList.add('gb-pdp-thumb-active');
            activeThumb.setAttribute('aria-selected', 'true');

            // Extraction routine maps nested visual path straight onto focus display layer
            const targetSourcePath = activeThumb.querySelector('img').getAttribute('src');
            
            // Kinetic fluid cross-fade injection handler 
            mainImgTarget.style.opacity = '0.3';
            mainImgTarget.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                mainImgTarget.setAttribute('src', targetSourcePath);
                mainImgTarget.style.opacity = '1';
                mainImgTarget.style.transform = 'scale(1)';
            }, 180);
        });
    }

    /* ==========================================================================
       3. INT HARDWARE QUANTITY STEPPER CORE ENGINE
       ========================================================================== */
    const qtyInput = document.getElementById('gb-pdp-qty-stepper');
    const qtyMinus = document.getElementById('gb-pdp-qty-minus');
    const qtyPlus = document.getElementById('gb-pdp-qty-plus');

    if (qtyInput && qtyMinus && qtyPlus) {
        const constraintMin = parseInt(qtyInput.getAttribute('min'), 10) || 1;
        const constraintMax = parseInt(qtyInput.getAttribute('max'), 10) || 10;

        qtyPlus.addEventListener('click', () => {
            let currentIntVal = parseInt(qtyInput.value, 10);
            if (currentIntVal < constraintMax) {
                qtyInput.value = currentIntVal + 1;
            }
        });

        qtyMinus.addEventListener('click', () => {
            let currentIntVal = parseInt(qtyInput.value, 10);
            if (currentIntVal > constraintMin) {
                qtyInput.value = currentIntVal - 1;
            }
        });
    }

    /* ==========================================================================
       4. HIGH PERFORMANCE COMPONENT SPECIFICATION TABS ROUTER ENGINE
       ========================================================================== */
    const tabsNavBar = document.getElementById('gb-pdp-sticky-tabs-bar');
    if (tabsNavBar) {
        tabsNavBar.addEventListener('click', (event) => {
            const currentTabTrigger = event.target.closest('.gb-pdp-tab-trigger');
            if (!currentTabTrigger || currentTabTrigger.classList.contains('gb-pdp-tab-active')) return;

            const tabParentList = currentTabTrigger.closest('.gb-pdp-tabs-list');
            const targetPanelId = currentTabTrigger.getAttribute('aria-controls');
            const targetedPanelNode = document.getElementById(targetPanelId);

            if (!targetedPanelNode) return;

            // Clear historical active tabs parameters configuration settings
            const historicActiveTab = tabParentList.querySelector('.gb-pdp-tab-active');
            const historicPanel = document.querySelector('.gb-pdp-panel-active');

            if (historicActiveTab) {
                historicActiveTab.setAttribute('aria-selected', 'false');
                historicActiveTab.setAttribute('tabindex', '-1');
                historicActiveTab.classList.remove('gb-pdp-tab-active');
            }
            if (historicPanel) {
                historicPanel.classList.remove('gb-pdp-panel-active');
            }

            // Lock down current active focus layer values attributes sets
            currentTabTrigger.classList.add('gb-pdp-tab-active');
            currentTabTrigger.setAttribute('aria-selected', 'true');
            currentTabTrigger.removeAttribute('tabindex');

            targetedPanelNode.classList.add('gb-pdp-panel-active');
        });
    }

    /* ==========================================================================
       5. CORE PURCHASE DISPATCH PROCESS HANDSHAKES SIMULATIONS
       ========================================================================== */
    const purchaseForm = document.getElementById('gb-pdp-purchase-matrix-form');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('flawless micro API bag check operation dispatched securely.');
        });
    }
});