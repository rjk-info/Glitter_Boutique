/**
 * GLITTER BOUTIQUE - LUXURY SHOPPING CART CONTROLLER
 * Architectural Focus: Dynamic State Computations, Coupon handshakes & Structural Node Erasure
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Parse newly integrated Lucide vector nodes safely
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Node Registries Matrix Target Selection
    const cartContentView = document.getElementById('gb-cart-content-view');
    const cartEmptyView = document.getElementById('gb-cart-empty-view');
    const itemsWrapper = document.getElementById('gb-cart-items-wrapper');
    const headerCountLabel = document.getElementById('gb-cart-header-count');
    
    // Summary Value Fields Target Selection
    const subtotalValField = document.getElementById('gb-cart-val-subtotal');
    const discountRowNode = document.getElementById('gb-cart-discount-row');
    const discountValField = document.getElementById('gb-cart-val-discount');
    const totalValField = document.getElementById('gb-cart-val-total');
    const mobileTotalField = document.getElementById('gb-cart-mobile-total-price');
    
    // Coupon Form Controls Target Selection
    const couponInputField = document.getElementById('gb-cart-coupon-code');
    const couponApplyTrigger = document.getElementById('gb-cart-coupon-apply-trigger');
    const couponStatusLabel = document.getElementById('gb-cart-coupon-status');

    // Internal Operational State Variables
    let appliedDiscountPercentageRate = 0;
    const activeValidCouponsDict = {
        'SPARKLE20': 0.20, // 20% Off luxury deduction rate code
        'GLITTER10': 0.10  // 10% Off luxury deduction rate code
    };

    /**
     * Re-Evaluate and Calculate Global Cart Ledger Metrics
     */
    const recalculateCartLedgerTotals = () => {
        const activeItemsArray = Array.from(itemsWrapper.querySelectorAll('.gb-cart-item'));
        let computedRunningSubtotal = 0;
        let cumulativeTotalUnitsCount = 0;

        // Process loops over existing DOM element boundaries
        activeItemsArray.forEach((itemNode) => {
            const staticBasePrice = parseFloat(itemNode.getAttribute('data-base-price'));
            const quantitativeCurrentInput = itemNode.querySelector('.gb-cart-qty-input');
            const itemUnitsCount = parseInt(quantitativeCurrentInput.value, 10);

            computedRunningSubtotal += (staticBasePrice * itemUnitsCount);
            cumulativeTotalUnitsCount += itemUnitsCount;
        });

        // Switch workspace framework view layouts if cart drops empty bounds
        if (activeItemsArray.length === 0) {
            if (cartContentView) cartContentView.style.display = 'none';
            if (cartEmptyView) cartEmptyView.style.display = 'block';
            if (headerCountLabel) headerCountLabel.textContent = '0 Items';
            return;
        }

        // Synchronize count text nodes labels parameters
        if (headerCountLabel) {
            headerCountLabel.textContent = `${activeItemsArray.length} ${activeItemsArray.length === 1 ? 'Item' : 'Items'}`;
        }

        // Apply discount matrix deductions handshakes
        let calculatedDiscountValue = computedRunningSubtotal * appliedDiscountPercentageRate;
        let finalComputedGrandTotal = computedRunningSubtotal - calculatedDiscountValue;

        // Process formats strings into local monetary templates
        if (subtotalValField) subtotalValField.textContent = `₹${computedRunningSubtotal.toLocaleString()}`;
        
        if (calculatedDiscountValue > 0) {
            if (discountRowNode) discountRowNode.style.display = 'flex';
            if (discountValField) discountValField.textContent = `-₹${Math.floor(calculatedDiscountValue).toLocaleString()}`;
        } else {
            if (discountRowNode) discountRowNode.style.display = 'none';
        }

        if (totalValField) totalValField.textContent = `₹${Math.floor(finalComputedGrandTotal).toLocaleString()}`;
        if (mobileTotalField) mobileTotalField.textContent = `₹${Math.floor(finalComputedGrandTotal).toLocaleString()}`;
    };

    /* =========================================================
       1. QUANTITY INCREMENT STEPPER DELEGATES HANDLER
       ========================================================= */
    if (itemsWrapper) {
        itemsWrapper.addEventListener('click', (event) => {
            const plusBtnTarget = event.target.closest('.gb-cart-qty-plus');
            const minusBtnTarget = event.target.closest('.gb-cart-qty-minus');

            if (!plusBtnTarget && !minusBtnTarget) return;

            const targetItemCard = event.target.closest('.gb-cart-item');
            const qtyInputField = targetItemCard.querySelector('.gb-cart-qty-input');
            let currentIntUnitsValue = parseInt(qtyInputField.value, 10);
            
            const operationalMaxLimit = parseInt(qtyInputField.getAttribute('max'), 10) || 10;
            const operationalMinLimit = parseInt(qtyInputField.getAttribute('min'), 10) || 1;

            if (plusBtnTarget && currentIntUnitsValue < operationalMaxLimit) {
                qtyInputField.value = currentIntUnitsValue + 1;
            } else if (minusBtnTarget && currentIntUnitsValue > operationalMinLimit) {
                qtyInputField.value = currentIntUnitsValue - 1;
            }

            recalculateCartLedgerTotals();
        });
    }

    /* =========================================================
       2. ITEM ERASURE SUBROUTINES WITH KINETIC DISMISSAL HOOKS
       ========================================================= */
    if (itemsWrapper) {
        itemsWrapper.addEventListener('click', (event) => {
            const removeActionBtn = event.target.closest('.gb-cart-remove-trigger');
            const wishlistActionBtn = event.target.closest('.gb-cart-wishlist-trigger');

            if (!removeActionBtn && !wishlistActionBtn) return;

            const targetItemCard = event.target.closest('.gb-cart-item');
            
            if (wishlistActionBtn) {
                const itemTitle = targetItemCard.querySelector('.gb-cart-item-title').textContent;
                console.log(`Database tracking transaction: Relocate product [${itemTitle}] to client private wishlist repository.`);
            }

            // Engage hardware-accelerated fluid erasure transitions
            targetItemCard.classList.add('gb-cart-item-dismissed');

            // Defer physical removal parameters to synchronize with transition timelines
            setTimeout(() => {
                targetItemCard.remove();
                recalculateCartLedgerTotals();
            }, 350);
        });
    }

    /* =========================================================
       3. CONCIERGE DISCOUNT COUPON VERIFICATION handshakes
       ========================================================= */
    if (couponApplyTrigger && couponInputField && couponStatusLabel) {
        couponApplyTrigger.addEventListener('click', () => {
            const processRawInputString = couponInputField.value.trim().toUpperCase();

            couponStatusLabel.className = 'gb-cart-coupon-feedback';
            couponStatusLabel.textContent = '';

            if (processRawInputString === '') {
                couponStatusLabel.textContent = 'Please specify a promo code value.';
                couponStatusLabel.classList.add('error');
                return;
            }

            if (activeValidCouponsDict.hasOwnProperty(processRawInputString)) {
                appliedDiscountPercentageRate = activeValidCouponsDict[processRawInputString];
                
                couponStatusLabel.textContent = `Promo Code "${processRawInputString}" linked successfully.`;
                couponStatusLabel.classList.add('success');
                
                // Lockdown input structures once active code passes validation checks
                couponInputField.disabled = true;
                couponApplyTrigger.disabled = true;
                couponApplyTrigger.style.opacity = '0.5';

                recalculateCartLedgerTotals();
            } else {
                couponStatusLabel.textContent = 'Invalid promo code context sequence.';
                couponStatusLabel.classList.add('error');
                appliedDiscountPercentageRate = 0;
                recalculateCartLedgerTotals();
            }
        });
    }
});