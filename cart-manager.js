/**
 * GLITTER BOUTIQUE - CART MANAGER UTILITY
 * Unified cart management across all pages (Home, Products, Product Detail)
 * Manages localStorage and navbar badge synchronization
 */

const GlitterCartManager = (() => {
    const CART_STORAGE_KEY = 'gb_cart_items';
    const CART_BADGE_SELECTOR = '.gb-navbar-cart-badge, .gb-navbar-mobile-badge';
    const CART_POPUP_TIMEOUT_MS = 4200;

    let cartPopupTimer = null;

    const parsePrice = (value) => {
        const parsed = Number(String(value ?? 0).replace(/[^\d.-]/g, ''));
        return Number.isFinite(parsed) ? parsed : 0;
    };

    const normalizeQuantity = (value) => {
        const parsed = parseInt(value, 10);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    };

    const slugify = (value) => String(value || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'product';

    const formatMoney = (value) => `₹${Math.round(parsePrice(value)).toLocaleString('en-IN')}`;

    const notifyCartChange = () => {
        const items = getCartItems();
        const detail = {
            items,
            count: getCartCount()
        };

        document.dispatchEvent(new CustomEvent('gb:cart-updated', { detail }));
        window.dispatchEvent(new CustomEvent('gb:cart-updated', { detail }));
    };

    /**
     * Get current cart items from localStorage
     */
    const getCartItems = () => {
        try {
            const parsedItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
            if (!Array.isArray(parsedItems)) return [];

            return parsedItems.filter((item) => {
                const isBrokenProductsPagePlaceholder = item?.id === 'product-product'
                    && String(item?.name || '').trim().toLowerCase() === 'product'
                    && parsePrice(item?.price) === 0
                    && !item?.image;

                return !isBrokenProductsPagePlaceholder;
            });
        } catch (e) {
            return [];
        }
    };

    /**
     * Update cart in localStorage
     */
    const setCartItems = (items) => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.warn('Failed to save cart to localStorage');
        }
    };

    /**
     * Update navbar cart badge with current count
     */
    const updateCartBadge = () => {
        const count = getCartCount();
        const badges = document.querySelectorAll(CART_BADGE_SELECTOR);

        badges.forEach((badge) => {
            badge.textContent = String(count);
            badge.setAttribute('aria-label', `${count} items in cart`);
        });
    };

    const hideCartAddedPopup = () => {
        const popup = document.getElementById('gb-cart-added-popup');
        if (!popup) return;

        popup.classList.remove('gb-cart-added-popup-active');
        if (cartPopupTimer) {
            clearTimeout(cartPopupTimer);
            cartPopupTimer = null;
        }
    };

    const getCartAddedPopup = () => {
        if (!document.body) return null;

        let popup = document.getElementById('gb-cart-added-popup');
        if (popup) return popup;

        popup = document.createElement('aside');
        popup.id = 'gb-cart-added-popup';
        popup.className = 'gb-cart-added-popup';
        popup.setAttribute('role', 'status');
        popup.setAttribute('aria-live', 'polite');
        popup.innerHTML = `
            <div class="gb-cart-added-popup-sheen" aria-hidden="true"></div>
            <button type="button" class="gb-cart-added-popup-close" data-gb-cart-popup-close aria-label="Close cart popup">
                <i data-lucide="x" aria-hidden="true"></i>
            </button>
            <div class="gb-cart-added-popup-main">
                <div class="gb-cart-added-popup-thumb" data-gb-cart-popup-image-frame>
                    <img src="" alt="" data-gb-cart-popup-image>
                </div>
                <div class="gb-cart-added-popup-copy">
                    <span class="gb-cart-added-popup-kicker"><i data-lucide="check" aria-hidden="true"></i> Added To Cart</span>
                    <h3 data-gb-cart-popup-name>Product</h3>
                    <p><span data-gb-cart-popup-price>₹0</span><span aria-hidden="true"> • </span>Qty <span data-gb-cart-popup-qty>1</span></p>
                </div>
            </div>
            <div class="gb-cart-added-popup-actions">
                <a href="cart.html" class="gb-cart-added-popup-view">View Cart</a>
                <button type="button" class="gb-cart-added-popup-continue" data-gb-cart-popup-close>Continue</button>
            </div>
            <div class="gb-cart-added-popup-progress" aria-hidden="true"><span></span></div>
        `;

        popup.querySelectorAll('[data-gb-cart-popup-close]').forEach((button) => {
            button.addEventListener('click', hideCartAddedPopup);
        });

        document.body.appendChild(popup);
        return popup;
    };

    const showCartAddedPopup = (item, addedQuantity) => {
        if (!item) return;

        if (!document.body) {
            document.addEventListener('DOMContentLoaded', () => showCartAddedPopup(item, addedQuantity), { once: true });
            return;
        }

        const popup = getCartAddedPopup();
        if (!popup) return;

        const fallbackImage = 'assets/products/Party Stickers/63.jpeg';
        const productImage = item.image || fallbackImage;
        const productName = item.name || 'Product';

        const imageNode = popup.querySelector('[data-gb-cart-popup-image]');
        const nameNode = popup.querySelector('[data-gb-cart-popup-name]');
        const priceNode = popup.querySelector('[data-gb-cart-popup-price]');
        const qtyNode = popup.querySelector('[data-gb-cart-popup-qty]');

        if (imageNode) {
            imageNode.src = productImage;
            imageNode.alt = item.alt || productName;
        }
        if (nameNode) nameNode.textContent = productName;
        if (priceNode) priceNode.textContent = formatMoney(item.price);
        if (qtyNode) qtyNode.textContent = String(normalizeQuantity(addedQuantity));

        popup.classList.remove('gb-cart-added-popup-active');
        popup.offsetHeight;
        popup.classList.add('gb-cart-added-popup-active');

        if (window.lucide) {
            window.lucide.createIcons();
        }

        if (cartPopupTimer) clearTimeout(cartPopupTimer);
        cartPopupTimer = setTimeout(hideCartAddedPopup, CART_POPUP_TIMEOUT_MS);
    };
    /**
     * Add item to cart and update badge
     * @param {string} productId - Unique product identifier
     * @param {string} productName - Product name/title
     * @param {number} price - Product price
     * @param {number} quantity - Quantity to add (default: 1)
     */
    const addToCart = (productId, productName, price = 0, quantity = 1, metadata = {}) => {
        const items = getCartItems();
        const normalizedPrice = parsePrice(price || metadata.price);
        const normalizedQuantity = normalizeQuantity(quantity);
        const safeProductId = metadata.productId || productId || slugify(productName);
        
        // Check if product already exists
        const existingItem = items.find(item => item.id === safeProductId);
        let popupItem = null;
        
        if (existingItem) {
            existingItem.quantity = normalizeQuantity(existingItem.quantity) + normalizedQuantity;
            if (normalizedPrice > 0) {
                existingItem.price = normalizedPrice;
            } else if (!Number.isFinite(parsePrice(existingItem.price))) {
                existingItem.price = 0;
            }
            existingItem.name = productName || existingItem.name;
            if (metadata.image) existingItem.image = metadata.image;
            if (metadata.alt) existingItem.alt = metadata.alt;
            if (metadata.category) existingItem.category = metadata.category;
            if (metadata.sourceUrl) existingItem.sourceUrl = metadata.sourceUrl;
            existingItem.lastUpdated = Date.now();
            popupItem = existingItem;
        } else {
            const newItem = {
                id: safeProductId,
                name: productName,
                price: normalizedPrice,
                quantity: normalizedQuantity,
                image: metadata.image || '',
                alt: metadata.alt || productName || 'Cart item image',
                category: metadata.category || '',
                productId: metadata.productId || safeProductId,
                sourceUrl: metadata.sourceUrl || '',
                addedAt: Date.now()
            };
            items.push(newItem);
            popupItem = newItem;
        }
        
        setCartItems(items);
        updateCartBadge();
        notifyCartChange();
        showCartAddedPopup(popupItem, normalizedQuantity);
        
        return items;
    };

    /**
     * Remove item from cart
     * @param {string} productId - Product ID to remove
     */
    const removeFromCart = (productId) => {
        let items = getCartItems();
        items = items.filter(item => item.id !== productId);
        setCartItems(items);
        updateCartBadge();
        notifyCartChange();
        return items;
    };

    /**
     * Update a single item's quantity in cart
     */
    const updateItemQuantity = (productId, quantity) => {
        const items = getCartItems();
        const targetItem = items.find((item) => item.id === productId);

        if (!targetItem) {
            return items;
        }

        const normalizedQuantity = normalizeQuantity(quantity);
        if (normalizedQuantity <= 0) {
            return removeFromCart(productId);
        }

        targetItem.quantity = normalizedQuantity;
        targetItem.lastUpdated = Date.now();

        setCartItems(items);
        updateCartBadge();
        notifyCartChange();
        return items;
    };

    /**
     * Adjust a single item's quantity by a delta value
     */
    const adjustItemQuantity = (productId, delta) => {
        const items = getCartItems();
        const targetItem = items.find((item) => item.id === productId);

        if (!targetItem) {
            return items;
        }

        const nextQuantity = normalizeQuantity(targetItem.quantity) + parseInt(delta, 10);

        if (nextQuantity <= 0) {
            return removeFromCart(productId);
        }

        targetItem.quantity = nextQuantity;
        targetItem.lastUpdated = Date.now();

        setCartItems(items);
        updateCartBadge();
        notifyCartChange();
        return items;
    };

    /**
     * Clear entire cart
     */
    const clearCart = () => {
        setCartItems([]);
        updateCartBadge();
        notifyCartChange();
    };

    /**
     * Get total items in cart
     */
    const getCartCount = () => {
        const items = getCartItems();
        return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    };

    const createProductId = (productName) => `product-${slugify(productName)}`;

    /**
     * Initialize cart badge on page load
     */
    const initializeCartBadge = () => {
        updateCartBadge();
    };

    // Public API
    return {
        addToCart,
        adjustItemQuantity,
        removeFromCart,
        clearCart,
        getCartItems,
        getCartCount,
        createProductId,
        updateItemQuantity,
        updateCartBadge,
        initializeCartBadge
    };
})();

// Initialize cart badge when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    GlitterCartManager.initializeCartBadge();
});
