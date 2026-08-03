/**
 * GLITTER BOUTIQUE - LUXURY SHOPPING CART CONTROLLER
 * Renders the cart from the shared cart manager state.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    if (window.lucide) {
        window.lucide.createIcons();
    }

    const cartContentView = document.getElementById('gb-cart-content-view');
    const cartEmptyView = document.getElementById('gb-cart-empty-view');
    const itemsWrapper = document.getElementById('gb-cart-items-wrapper');
    const headerCountLabel = document.getElementById('gb-cart-header-count');
    const subtotalValField = document.getElementById('gb-cart-val-subtotal');
    const discountRowNode = document.getElementById('gb-cart-discount-row');
    const discountValField = document.getElementById('gb-cart-val-discount');
    const totalValField = document.getElementById('gb-cart-val-total');
    const mobileTotalField = document.getElementById('gb-cart-mobile-total-price');
    const taxValField = document.getElementById('gb-cart-val-tax');
    const couponInputField = document.getElementById('gb-cart-coupon-code');
    const couponApplyTrigger = document.getElementById('gb-cart-coupon-apply-trigger');
    const couponStatusLabel = document.getElementById('gb-cart-coupon-status');

    let appliedDiscountPercentageRate = 0;
    const activeValidCouponsDict = {
        SPARKLE20: 0.20,
        GLITTER10: 0.10
    };

    const parsePrice = (value) => {
        const parsed = Number(String(value ?? 0).replace(/[^\d.-]/g, ''));
        return Number.isFinite(parsed) ? parsed : 0;
    };

    const escapeHtml = (value) => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const formatMoney = (value) => `₹${Math.round(value || 0).toLocaleString('en-IN')}`;

    const getCartItems = () => {
        if (typeof GlitterCartManager !== 'undefined' && GlitterCartManager.getCartItems) {
            return GlitterCartManager.getCartItems();
        }

        return [];
    };

    const getProductImage = (item) => item.image || 'assets/products/Party Stickers/63.jpeg';

    const getItemSubtotal = (item) => parsePrice(item.price) * (parseInt(item.quantity, 10) || 1);

    const renderSummary = (items) => {
        const subtotal = items.reduce((sum, item) => sum + getItemSubtotal(item), 0);
        const totalUnits = items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
        const discountValue = subtotal * appliedDiscountPercentageRate;
        const finalTotal = subtotal - discountValue;

        if (headerCountLabel) {
            headerCountLabel.textContent = `${totalUnits} ${totalUnits === 1 ? 'Item' : 'Items'}`;
        }

        if (subtotalValField) subtotalValField.textContent = formatMoney(subtotal);

        if (discountRowNode) {
            discountRowNode.style.display = discountValue > 0 ? 'flex' : 'none';
        }

        if (discountValField) discountValField.textContent = `-${formatMoney(discountValue)}`;
        if (totalValField) totalValField.textContent = formatMoney(finalTotal);
        if (mobileTotalField) mobileTotalField.textContent = formatMoney(finalTotal);
        if (taxValField) taxValField.textContent = '₹0';
    };

    const createItemNode = (item) => {
        const itemSubtotal = getItemSubtotal(item);
        const itemQuantity = parseInt(item.quantity, 10) || 1;
        const article = document.createElement('article');
        article.className = 'gb-cart-item';
        article.dataset.cartItemId = item.id;
        article.dataset.basePrice = String(parsePrice(item.price));

        article.innerHTML = `
            <div class="gb-cart-item-border" aria-hidden="true"></div>
            <div class="gb-cart-item-img-holder">
                <img class="gb-cart-item-img" src="${escapeHtml(getProductImage(item))}" alt="${escapeHtml(item.alt || item.name || 'Cart item image')}">
            </div>
            <div class="gb-cart-item-details">
                <header class="gb-cart-item-header">
                    <div>
                        <h3 class="gb-cart-item-title">${escapeHtml(item.name || 'Product')}</h3>
                        <p class="gb-cart-item-category">${escapeHtml(item.category || 'Selected product')}</p>
                    </div>
                    <span class="gb-cart-item-price-display">${formatMoney(parsePrice(item.price))}</span>
                </header>
                <div class="gb-cart-item-variant">Quantity: <span class="gb-cart-variant-name">${itemQuantity}</span> | Subtotal: <span class="gb-cart-variant-name">${formatMoney(itemSubtotal)}</span></div>
                <div class="gb-cart-item-delivery">
                    <i data-lucide="truck"></i><span>Estimated Delivery: 2-3 Business Days</span>
                </div>
                <footer class="gb-cart-item-footer">
                    <div class="gb-cart-quantity-stepper">
                        <button type="button" class="gb-cart-qty-btn gb-cart-qty-minus" aria-label="Reduce unit count">-</button>
                        <input type="number" class="gb-cart-qty-input" value="${itemQuantity}" min="1" max="10" readonly aria-label="Selected product quantities">
                        <button type="button" class="gb-cart-qty-btn gb-cart-qty-plus" aria-label="Increase unit count">+</button>
                    </div>
                    <div class="gb-cart-utility-actions">
                        <button type="button" class="gb-cart-util-action-btn gb-cart-wishlist-trigger" aria-label="Move item to private wishlist portfolio">
                            <i data-lucide="heart"></i><span>Save For Later</span>
                        </button>
                        <button type="button" class="gb-cart-util-action-btn gb-cart-remove-trigger" aria-label="Extract item permanently from shopping bag">
                            <i data-lucide="trash-2"></i><span>Remove</span>
                        </button>
                    </div>
                </footer>
            </div>
        `;

        return article;
    };

    const renderCart = () => {
        if (!itemsWrapper || !cartContentView || !cartEmptyView) return;

        const items = getCartItems();
        itemsWrapper.innerHTML = '';

        if (!items.length) {
            cartContentView.style.display = 'none';
            cartEmptyView.style.display = 'block';
            renderSummary([]);
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        items.forEach((item) => {
            itemsWrapper.appendChild(createItemNode(item));
        });

        cartEmptyView.style.display = 'none';
        cartContentView.style.display = 'grid';
        renderSummary(items);

        if (window.lucide) window.lucide.createIcons();
    };

    if (itemsWrapper) {
        itemsWrapper.addEventListener('click', (event) => {
            const itemCard = event.target.closest('.gb-cart-item');
            if (!itemCard) return;

            const itemId = itemCard.getAttribute('data-cart-item-id');
            const plusBtnTarget = event.target.closest('.gb-cart-qty-plus');
            const minusBtnTarget = event.target.closest('.gb-cart-qty-minus');
            const removeActionBtn = event.target.closest('.gb-cart-remove-trigger');
            const wishlistActionBtn = event.target.closest('.gb-cart-wishlist-trigger');

            if (plusBtnTarget || minusBtnTarget) {
                const qtyInputField = itemCard.querySelector('.gb-cart-qty-input');
                const currentUnitsValue = parseInt(qtyInputField.value, 10) || 1;
                const nextUnitsValue = plusBtnTarget ? Math.min(currentUnitsValue + 1, 10) : Math.max(currentUnitsValue - 1, 1);

                if (typeof GlitterCartManager !== 'undefined' && GlitterCartManager.updateItemQuantity) {
                    GlitterCartManager.updateItemQuantity(itemId, nextUnitsValue);
                }

                return;
            }

            if (wishlistActionBtn) {
                const itemTitle = itemCard.querySelector('.gb-cart-item-title')?.textContent || 'Item';
                console.log(`Database tracking transaction: Relocate product [${itemTitle}] to client private wishlist repository.`);
                return;
            }

            if (removeActionBtn && typeof GlitterCartManager !== 'undefined' && GlitterCartManager.removeFromCart) {
                GlitterCartManager.removeFromCart(itemId);
            }
        });
    }

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

            if (Object.prototype.hasOwnProperty.call(activeValidCouponsDict, processRawInputString)) {
                appliedDiscountPercentageRate = activeValidCouponsDict[processRawInputString];

                couponStatusLabel.textContent = `Promo Code "${processRawInputString}" linked successfully.`;
                couponStatusLabel.classList.add('success');

                couponInputField.disabled = true;
                couponApplyTrigger.disabled = true;
                couponApplyTrigger.style.opacity = '0.5';

                renderCart();
            } else {
                couponStatusLabel.textContent = 'Invalid promo code context sequence.';
                couponStatusLabel.classList.add('error');
                appliedDiscountPercentageRate = 0;
                renderCart();
            }
        });
    }

    document.addEventListener('gb:cart-updated', renderCart);
    window.addEventListener('storage', (event) => {
        if (event.key === 'gb_cart_items') {
            renderCart();
        }
    });

    renderCart();
});