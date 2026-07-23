/**
 * GLITTER BOUTIQUE - PRODUCTS LISTING CONTROLLER
 * Vanilla catalog rendering, filtering, sorting, accordions and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const productGrid = document.getElementById('gb-products-grid');
    const resultsCount = document.getElementById('gb-products-results-count');
    const emptyState = document.getElementById('gb-products-empty');
    const sortSelect = document.getElementById('gb-products-sort');
    const drawerLayer = document.getElementById('gb-products-drawer-layer');
    const filterForms = Array.from(document.querySelectorAll('[data-gb-products-filter-form]'));
    const viewButtons = Array.from(document.querySelectorAll('[data-gb-products-view]'));
    const openFilterButtons = Array.from(document.querySelectorAll('[data-gb-products-open-filters]'));
    const closeFilterButtons = Array.from(document.querySelectorAll('[data-gb-products-close-filters]'));
    const resetButtons = Array.from(document.querySelectorAll('[data-gb-products-reset]'));

    if (!productGrid || !resultsCount || !sortSelect || filterForms.length === 0) return;

    const products = [
        { id: 'crystal-face-gems', name: 'Crystal Face Gems', description: 'Multi-faceted crystal accents for spotlight-ready eyes and temples.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'face-gems', subCategoryLabel: 'Face Gems', price: 499, oldPrice: 699, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller', 'featured'], statusLabel: 'Best Seller', rating: 5.0, popularity: 98, createdAt: '2026-07-18', image: 'assets/home_img/products_img/cristal-removebg-preview.png', imageFit: 'contain' },
        { id: 'aurora-body-gems', name: 'Aurora Body Gems', description: 'Chromatic shoulder and collarbone gems with a luminous festival finish.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'body-gems', subCategoryLabel: 'Body Gems', price: 599, oldPrice: 799, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival', 'featured'], statusLabel: 'New Arrival', rating: 4.9, popularity: 94, createdAt: '2026-07-17', image: 'assets/home_img/Shop By Collection/face1.jpeg' },
        { id: 'moonlit-chest-blings', name: 'Moonlit Chest Blings', description: 'Pearl-kissed chest detailing for mainstage looks and evening styling.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'chest-blings', subCategoryLabel: 'Chest Blings', price: 899, oldPrice: 1099, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.8, popularity: 88, createdAt: '2026-07-12', image: 'assets/home_img/Gbanner2.jpg' },
        { id: 'kundan-mehandi-stickers', name: 'Kundan Mehandi Stickers', description: 'Traditional jewel motifs with a delicate stick-on mehendi silhouette.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kundan-mehandi-stickers', subCategoryLabel: 'Kundan Mehandi Stickers', price: 449, oldPrice: 599, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.8, popularity: 92, createdAt: '2026-07-09', image: 'assets/home_img/Shop By Collection/newarr.jpeg' },
        { id: 'glow-dark-stickers', name: 'Glow In The Dark Stickers', description: 'Soft luminous details for night events, concerts and costume looks.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'glow-in-the-dark-stickers', subCategoryLabel: 'Glow In The Dark Stickers', price: 399, oldPrice: null, availability: 'coming-soon', availabilityLabel: 'Coming Soon', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 76, createdAt: '2026-07-21', image: 'assets/home_img/gbanner3.jpg' },
        { id: 'kids-face-stickers', name: 'Kids Face Stickers', description: 'Playful safe-touch sparkle stickers made for parties and celebrations.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kids-face-stickers', subCategoryLabel: 'Kids Face Stickers', price: 299, oldPrice: 399, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.6, popularity: 70, createdAt: '2026-07-03', image: 'assets/home_img/GbannerMobile1.jpg' },
        { id: 'belly-naval-tattoos', name: 'Belly / Naval Tattoos', description: 'Elegant temporary body art designed for resort looks and dance nights.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'belly-naval-tattoos', subCategoryLabel: 'Belly / Naval Tattoos', price: 349, oldPrice: null, availability: 'out-of-stock', availabilityLabel: 'Out Of Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.5, popularity: 62, createdAt: '2026-06-28', image: 'assets/home_img/Gbanner1.jpg' },
        { id: 'halloween-sticker-set', name: 'Halloween Sticker Set', description: 'Costume-ready shimmer stickers with dark-party sparkle placement.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'halloween-stickers', subCategoryLabel: 'Halloween Stickers', price: 549, oldPrice: 699, availability: 'coming-soon', availabilityLabel: 'Coming Soon', status: ['new-arrival', 'limited-edition'], statusLabel: 'Limited Edition', rating: 4.7, popularity: 83, createdAt: '2026-07-20', image: 'assets/home_img/Gbanner2M.jpg' },
        { id: 'velvet-potli-bag', name: 'Velvet Potli Bag', description: 'Compact festive carry-all with a soft drawstring finish.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'potlis', subCategoryLabel: 'Potlis', price: 1299, oldPrice: 1599, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.9, popularity: 91, createdAt: '2026-07-14', image: 'assets/home_img/ourstory.jpeg' },
        { id: 'pearl-clutch-bag', name: 'Pearl Clutch Bag', description: 'Evening clutch with polished structure and understated shine.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'clutch-bags', subCategoryLabel: 'Clutch Bags', price: 1899, oldPrice: 2299, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.8, popularity: 87, createdAt: '2026-07-11', image: 'assets/home_img/Gbanner1.jpg' },
        { id: 'vanity-organiser', name: 'Vanity Organiser', description: 'Structured beauty organiser for jewels, pouches and daily essentials.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'organisers', subCategoryLabel: 'Organisers', price: 1499, oldPrice: null, availability: 'out-of-stock', availabilityLabel: 'Out Of Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.6, popularity: 68, createdAt: '2026-06-30', image: 'assets/home_img/Gbanner2.jpg' },
        { id: 'luxe-makeup-pouch', name: 'Luxe Makeup Pouch', description: 'Travel-friendly pouch with room for touch-up essentials and minis.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'luxe-makeup-pouches', subCategoryLabel: 'Luxe Makeup Pouches', price: 999, oldPrice: 1299, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 74, createdAt: '2026-07-19', image: 'assets/home_img/Shop By Collection/newarr.jpeg' }
    ];

    const mainCategories = [
        { value: 'face-body-jewels', label: 'Face & Body Jewels' },
        { value: 'bags', label: 'Bags' }
    ];

    const subCategoryGroups = [
        { key: 'face-body-jewels', label: 'Face & Body Jewels', items: [
            { value: 'face-gems', label: 'Face Gems' },
            { value: 'body-gems', label: 'Body Gems' },
            { value: 'halloween-stickers', label: 'Halloween Stickers' },
            { value: 'chest-blings', label: 'Chest Blings' },
            { value: 'kundan-mehandi-stickers', label: 'Kundan Mehandi Stickers' },
            { value: 'glow-in-the-dark-stickers', label: 'Glow In The Dark Stickers' },
            { value: 'kids-face-stickers', label: 'Kids Face Stickers' },
            { value: 'belly-naval-tattoos', label: 'Belly / Naval Tattoos' }
        ] },
        { key: 'bags', label: 'Bags', items: [
            { value: 'potlis', label: 'Potlis' },
            { value: 'clutch-bags', label: 'Clutch Bags' },
            { value: 'organisers', label: 'Organisers' },
            { value: 'luxe-makeup-pouches', label: 'Luxe Makeup Pouches' }
        ] }
    ];

    const availabilityOptions = [
        { value: 'in-stock', label: 'In Stock' },
        { value: 'out-of-stock', label: 'Out Of Stock' },
        { value: 'coming-soon', label: 'Coming Soon' }
    ];

    const statusOptions = [
        { value: 'new-arrival', label: 'New Arrival' },
        { value: 'best-seller', label: 'Best Seller' },
        { value: 'featured', label: 'Featured' },
        { value: 'limited-edition', label: 'Limited Edition' }
    ];

    const catalogMinPrice = Math.floor(Math.min(...products.map((product) => product.price)) / 50) * 50;
    const catalogMaxPrice = Math.ceil(Math.max(...products.map((product) => product.price)) / 50) * 50;
    const state = { search: '', mainCategories: [], subCategories: [], availability: [], status: [], minPrice: catalogMinPrice, maxPrice: catalogMaxPrice, sort: 'newest', view: 'grid' };

    const escapeHtml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
    const getSelectedValues = (field) => Array.from(new Set(Array.from(document.querySelectorAll(`[data-gb-products-field="${field}"]:checked`)).map((input) => input.value)));

    const buildCheckList = (items, field, scope) => items.map((item) => {
        const id = `gb-products-${scope}-${field}-${item.value}`;
        return `<label class="gb-products-check" for="${id}"><input id="${id}" type="checkbox" value="${escapeHtml(item.value)}" data-gb-products-field="${field}"><span class="gb-products-check-box" aria-hidden="true"></span><span class="gb-products-check-label">${escapeHtml(item.label)}</span></label>`;
    }).join('');

    const buildAccordion = (group, scope) => {
        const panelId = `gb-products-${scope}-${group.key}-panel`;
        return `<div class="gb-products-accordion"><button type="button" class="gb-products-accordion-trigger" aria-expanded="true" aria-controls="${panelId}" data-gb-products-accordion-trigger><span>${escapeHtml(group.label)}</span><i data-lucide="chevron-down" aria-hidden="true"></i></button><div class="gb-products-accordion-panel gb-products-accordion-panel-open" id="${panelId}" data-gb-products-accordion-panel><div class="gb-products-accordion-inner"><div class="gb-products-check-list">${buildCheckList(group.items, 'subCategories', scope)}</div></div></div></div>`;
    };

    const buildFilterForm = (scope) => `
        <div class="gb-products-filter-group">
            <label class="gb-products-filter-title" for="gb-products-${scope}-search">Search Product</label>
            <div class="gb-products-search-wrap"><i class="gb-products-search-icon" data-lucide="search" aria-hidden="true"></i><input class="gb-products-search" id="gb-products-${scope}-search" type="search" placeholder="Search products" data-gb-products-field="search"></div>
        </div>
        <fieldset class="gb-products-filter-group"><legend class="gb-products-filter-title">Main Categories</legend><div class="gb-products-check-list">${buildCheckList(mainCategories, 'mainCategories', scope)}</div></fieldset>
        <div class="gb-products-filter-group">${subCategoryGroups.map((group) => buildAccordion(group, scope)).join('')}</div>
        <div class="gb-products-filter-group"><span class="gb-products-filter-title">Price</span><div class="gb-products-range-values"><span data-gb-products-min-label>${formatPrice(catalogMinPrice)}</span><span data-gb-products-max-label>${formatPrice(catalogMaxPrice)}</span></div><div class="gb-products-range-track"><input class="gb-products-range-input" type="range" min="${catalogMinPrice}" max="${catalogMaxPrice}" step="50" value="${catalogMinPrice}" aria-label="Minimum price" data-gb-products-field="minPrice"><input class="gb-products-range-input" type="range" min="${catalogMinPrice}" max="${catalogMaxPrice}" step="50" value="${catalogMaxPrice}" aria-label="Maximum price" data-gb-products-field="maxPrice"></div></div>
        <fieldset class="gb-products-filter-group"><legend class="gb-products-filter-title">Availability</legend><div class="gb-products-check-list">${buildCheckList(availabilityOptions, 'availability', scope)}</div></fieldset>
        <fieldset class="gb-products-filter-group"><legend class="gb-products-filter-title">Product Status</legend><div class="gb-products-check-list">${buildCheckList(statusOptions, 'status', scope)}</div></fieldset>`;

    const renderFilterForms = () => {
        filterForms.forEach((form) => {
            const scope = form.getAttribute('data-gb-products-filter-form') || 'desktop';
            form.innerHTML = buildFilterForm(scope);
        });
    };

    const syncAccordionHeights = () => {
        document.querySelectorAll('[data-gb-products-accordion-panel]').forEach((panel) => {
            if (panel.classList.contains('gb-products-accordion-panel-open')) panel.style.maxHeight = `${panel.scrollHeight}px`;
        });
    };

    const syncControlsFromState = () => {
        document.querySelectorAll('[data-gb-products-field="search"]').forEach((input) => { input.value = state.search; });
        ['mainCategories', 'subCategories', 'availability', 'status'].forEach((field) => {
            document.querySelectorAll(`[data-gb-products-field="${field}"]`).forEach((input) => { input.checked = state[field].includes(input.value); });
        });
        document.querySelectorAll('[data-gb-products-field="minPrice"]').forEach((input) => { input.value = state.minPrice; });
        document.querySelectorAll('[data-gb-products-field="maxPrice"]').forEach((input) => { input.value = state.maxPrice; });
        document.querySelectorAll('[data-gb-products-min-label]').forEach((label) => { label.textContent = formatPrice(state.minPrice); });
        document.querySelectorAll('[data-gb-products-max-label]').forEach((label) => { label.textContent = formatPrice(state.maxPrice); });
    };

    const updateStateFromControl = (fieldNode) => {
        const field = fieldNode.getAttribute('data-gb-products-field');
        if (field === 'search') state.search = fieldNode.value.trim().toLowerCase();
        if (field === 'mainCategories') state.mainCategories = getSelectedValues('mainCategories');
        if (field === 'subCategories') state.subCategories = getSelectedValues('subCategories');
        if (field === 'availability') state.availability = getSelectedValues('availability');
        if (field === 'status') state.status = getSelectedValues('status');
        if (field === 'minPrice') state.minPrice = Number(fieldNode.value);
        if (field === 'maxPrice') state.maxPrice = Number(fieldNode.value);
        if (state.minPrice > state.maxPrice) {
            if (field === 'minPrice') state.maxPrice = state.minPrice;
            if (field === 'maxPrice') state.minPrice = state.maxPrice;
        }
        state.sort = sortSelect.value;
    };

    const productMatchesState = (product) => {
        const searchable = [product.name, product.description, product.mainCategoryLabel, product.subCategoryLabel, product.availabilityLabel, product.statusLabel].join(' ').toLowerCase();
        return (state.search === '' || searchable.includes(state.search))
            && (state.mainCategories.length === 0 || state.mainCategories.includes(product.mainCategory))
            && (state.subCategories.length === 0 || state.subCategories.includes(product.subCategory))
            && (state.availability.length === 0 || state.availability.includes(product.availability))
            && (state.status.length === 0 || product.status.some((status) => state.status.includes(status)))
            && product.price >= state.minPrice && product.price <= state.maxPrice;
    };

    const sortProducts = (items) => {
        const sorters = {
            newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            featured: (a, b) => Number(b.status.includes('featured')) - Number(a.status.includes('featured')) || b.popularity - a.popularity,
            'price-asc': (a, b) => a.price - b.price,
            'price-desc': (a, b) => b.price - a.price,
            popularity: (a, b) => b.popularity - a.popularity,
            alphabetical: (a, b) => a.name.localeCompare(b.name)
        };
        return [...items].sort(sorters[state.sort] || sorters.newest);
    };

    const renderStars = (rating) => Array.from({ length: 5 }, (_, index) => `<i data-lucide="star" aria-hidden="true"${index >= Math.round(rating) ? ' class="gb-products-card-star-muted"' : ''}></i>`).join('');

    const renderProductCard = (product, index) => `
        <article class="gb-products-card gb-products-reveal" data-gb-products-product-id="${escapeHtml(product.id)}" style="transition-delay: ${Math.min(index * 35, 210)}ms">
            <div class="gb-products-card-media">
                <img class="gb-products-card-image${product.imageFit === 'contain' ? ' gb-products-card-image-contain' : ''}" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async">
                <span class="gb-products-card-badge">${escapeHtml(product.subCategoryLabel)}</span>
                <div class="gb-products-card-actions"><button type="button" class="gb-products-card-icon" aria-label="Add ${escapeHtml(product.name)} to wishlist" data-gb-products-wishlist><i data-lucide="heart" aria-hidden="true"></i></button><button type="button" class="gb-products-card-icon" aria-label="Quick view ${escapeHtml(product.name)}" data-gb-products-quick-view><i data-lucide="eye" aria-hidden="true"></i></button></div>
            </div>
            <div class="gb-products-card-content">
                <div class="gb-products-card-meta"><span class="gb-products-card-category">${escapeHtml(product.mainCategoryLabel)}</span><span class="gb-products-card-status">${escapeHtml(product.statusLabel)}</span></div>
                <h2 class="gb-products-card-title">${escapeHtml(product.name)}</h2>
                <p class="gb-products-card-desc">${escapeHtml(product.description)}</p>
                <div class="gb-products-card-rating" aria-label="Rated ${product.rating} out of 5">${renderStars(product.rating)}<span class="gb-products-card-score">${product.rating.toFixed(1)}</span></div>
                <div class="gb-products-card-footer"><div class="gb-products-price-stack"><span class="gb-products-card-price">${formatPrice(product.price)}</span>${product.oldPrice ? `<span class="gb-products-card-old-price">${formatPrice(product.oldPrice)}</span>` : ''}</div><button type="button" class="gb-products-card-link" data-gb-products-add-cart aria-label="Add ${escapeHtml(product.name)} to cart"><span>Add To Cart</span><i data-lucide="shopping-bag" aria-hidden="true"></i></button></div>
            </div>
        </article>`;

    const updateResultsCount = (count) => {
        resultsCount.textContent = count === 0 ? `Showing 0 of ${products.length} Products` : `Showing 1-${count} of ${products.length} Products`;
    };

    const revealVisibleCards = () => {
        const revealTargets = Array.from(document.querySelectorAll('.gb-products-reveal'));
        if (!('IntersectionObserver' in window)) { revealTargets.forEach((target) => target.classList.add('gb-products-visible')); return; }
        const observer = new IntersectionObserver((entries, activeObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { entry.target.classList.add('gb-products-visible'); activeObserver.unobserve(entry.target); }
            });
        }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
        revealTargets.forEach((target) => observer.observe(target));
    };

    const renderProducts = () => {
        const filteredProducts = sortProducts(products.filter(productMatchesState));
        productGrid.innerHTML = filteredProducts.map(renderProductCard).join('');
        productGrid.classList.toggle('gb-products-list-view-active', state.view === 'list');
        updateResultsCount(filteredProducts.length);
        if (emptyState) emptyState.hidden = filteredProducts.length !== 0;
        if (window.lucide) window.lucide.createIcons();
        revealVisibleCards();
    };

    const handleFilterChange = (event) => {
        const fieldNode = event.target.closest('[data-gb-products-field]');
        if (!fieldNode) return;
        updateStateFromControl(fieldNode);
        syncControlsFromState();
        renderProducts();
    };

    const resetFilters = () => {
        state.search = '';
        state.mainCategories = [];
        state.subCategories = [];
        state.availability = [];
        state.status = [];
        state.minPrice = catalogMinPrice;
        state.maxPrice = catalogMaxPrice;
        state.sort = 'newest';
        sortSelect.value = state.sort;
        syncControlsFromState();
        renderProducts();
    };

    const openDrawer = () => {
        if (!drawerLayer) return;
        drawerLayer.classList.add('gb-products-drawer-open');
        drawerLayer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('gb-products-drawer-active');
        document.body.style.overflow = 'hidden';
        const closeButton = drawerLayer.querySelector('[data-gb-products-close-filters]');
        if (closeButton) setTimeout(() => closeButton.focus(), 120);
    };

    const closeDrawer = () => {
        if (!drawerLayer) return;
        drawerLayer.classList.remove('gb-products-drawer-open');
        drawerLayer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('gb-products-drawer-active');
        document.body.style.overflow = '';
    };

    const initializeAccordions = () => {
        document.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-gb-products-accordion-trigger]');
            if (!trigger) return;
            const panel = document.getElementById(trigger.getAttribute('aria-controls'));
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(!isOpen));
            if (!panel) return;
            panel.classList.toggle('gb-products-accordion-panel-open', !isOpen);
            panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
        });
    };

    const initializeInteractions = () => {
        filterForms.forEach((form) => { form.addEventListener('input', handleFilterChange); form.addEventListener('change', handleFilterChange); });
        sortSelect.addEventListener('change', () => { state.sort = sortSelect.value; renderProducts(); });
        viewButtons.forEach((button) => {
            button.addEventListener('click', () => {
                state.view = button.getAttribute('data-gb-products-view') || 'grid';
                viewButtons.forEach((viewButton) => { const isActive = viewButton === button; viewButton.classList.toggle('gb-products-view-button-active', isActive); viewButton.setAttribute('aria-pressed', String(isActive)); });
                renderProducts();
            });
        });
        openFilterButtons.forEach((button) => button.addEventListener('click', openDrawer));
        closeFilterButtons.forEach((button) => button.addEventListener('click', closeDrawer));
        resetButtons.forEach((button) => button.addEventListener('click', resetFilters));
        if (drawerLayer) drawerLayer.addEventListener('click', (event) => { if (event.target === drawerLayer) closeDrawer(); });
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && drawerLayer && drawerLayer.classList.contains('gb-products-drawer-open')) closeDrawer(); });
        productGrid.addEventListener('click', (event) => {
            const wishlistButton = event.target.closest('[data-gb-products-wishlist]');
            const quickViewButton = event.target.closest('[data-gb-products-quick-view]');
            const addCartButton = event.target.closest('[data-gb-products-add-cart]');
            if (wishlistButton) { wishlistButton.classList.toggle('gb-products-card-icon-active'); wishlistButton.setAttribute('aria-pressed', String(wishlistButton.classList.contains('gb-products-card-icon-active'))); }
            if (quickViewButton) { const card = quickViewButton.closest('[data-gb-products-product-id]'); if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
            if (addCartButton) { const label = addCartButton.querySelector('span'); addCartButton.classList.add('gb-products-card-link-added'); if (label) label.textContent = 'Added'; }
        });
        window.addEventListener('resize', syncAccordionHeights, { passive: true });
    };

    renderFilterForms();
    syncAccordionHeights();
    syncControlsFromState();
    initializeAccordions();
    initializeInteractions();
    renderProducts();
    if (window.lucide) window.lucide.createIcons();
});

