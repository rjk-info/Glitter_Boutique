/**
 * GLITTER BOUTIQUE - CART MANAGER UTILITY
 * Unified cart management across all pages (Home, Products, Product Detail)
 * Manages localStorage and navbar badge synchronization
 */

const GlitterCartManager = (() => {
    const CART_STORAGE_KEY = 'gb_cart_items';
    const CART_BADGE_SELECTOR = '.gb-navbar-cart-badge, .gb-navbar-mobile-badge';

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
        } else {
            items.push({
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
            });
        }
        
        setCartItems(items);
        updateCartBadge();
        notifyCartChange();
        
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
