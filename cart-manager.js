/**
 * GLITTER BOUTIQUE - CART MANAGER UTILITY
 * Unified cart management across all pages (Home, Products, Product Detail)
 * Manages localStorage and navbar badge synchronization
 */

const GlitterCartManager = (() => {
    const CART_STORAGE_KEY = 'gb_cart_items';
    const CART_BADGE_SELECTOR = '.gb-navbar-cart-badge';

    /**
     * Get current cart items from localStorage
     */
    const getCartItems = () => {
        try {
            return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
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
        const items = getCartItems();
        const badge = document.querySelector(CART_BADGE_SELECTOR);
        if (badge) {
            badge.textContent = String(items.length);
            badge.setAttribute('aria-label', `${items.length} items in cart`);
        }
    };

    /**
     * Add item to cart and update badge
     * @param {string} productId - Unique product identifier
     * @param {string} productName - Product name/title
     * @param {number} price - Product price
     * @param {number} quantity - Quantity to add (default: 1)
     */
    const addToCart = (productId, productName, price = 0, quantity = 1) => {
        const items = getCartItems();
        
        // Check if product already exists
        const existingItem = items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + quantity;
            existingItem.lastUpdated = Date.now();
        } else {
            items.push({
                id: productId,
                name: productName,
                price: price,
                quantity: quantity,
                addedAt: Date.now()
            });
        }
        
        setCartItems(items);
        updateCartBadge();
        
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
        return items;
    };

    /**
     * Clear entire cart
     */
    const clearCart = () => {
        setCartItems([]);
        updateCartBadge();
    };

    /**
     * Get total items in cart
     */
    const getCartCount = () => {
        const items = getCartItems();
        return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    };

    /**
     * Initialize cart badge on page load
     */
    const initializeCartBadge = () => {
        updateCartBadge();
    };

    // Public API
    return {
        addToCart,
        removeFromCart,
        clearCart,
        getCartItems,
        getCartCount,
        updateCartBadge,
        initializeCartBadge
    };
})();

// Initialize cart badge when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    GlitterCartManager.initializeCartBadge();
});
