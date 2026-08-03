/**
 * GLITTER BOUTIQUE - PRODUCT DETAIL PAGE CONTROLLER
 * Route-aware renderer for the clicked product.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    if (window.lucide) {
        window.lucide.createIcons();
    }

    const formatPrice = (value) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(Number(value || 0));

    const parsePrice = (value) => Number(String(value ?? 0).replace(/[^\d.-]/g, '')) || 0;

    const getCatalog = () => Array.isArray(window.GB_PRODUCTS) ? window.GB_PRODUCTS : [];

    const getProductFromRoute = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const routeId = searchParams.get('id') || searchParams.get('slug');
        if (!routeId) return null;

        if (typeof window.GB_FIND_PRODUCT === 'function') {
            return window.GB_FIND_PRODUCT(routeId) || null;
        }

        return getCatalog().find((product) => product.id === routeId) || null;
    };

    const hideAuxiliarySections = () => {
        document.querySelectorAll('.gb-pdp-section-pad, .gb-pdp-cta-block').forEach((section) => {
            section.style.display = 'none';
        });
    };

    const showNotFound = () => {
        document.title = 'Product Not Found | Glitter Boutique';
        hideAuxiliarySections();

        const mainShowcase = document.querySelector('.gb-pdp-main-showcase');
        const tabsSection = document.querySelector('.gb-pdp-tabs-section');
        if (mainShowcase) mainShowcase.style.display = 'none';
        if (tabsSection) tabsSection.style.display = 'none';

        const existingNotice = document.getElementById('gb-pdp-not-found');
        if (existingNotice) return;

        const notice = document.createElement('section');
        notice.id = 'gb-pdp-not-found';
        notice.setAttribute('aria-labelledby', 'gb-pdp-not-found-heading');
        notice.style.cssText = 'max-width: 900px; margin: 80px auto; padding: 40px 24px; border-radius: 28px; background: rgba(255,255,255,0.92); box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08); text-align: center;';
        notice.innerHTML = `
            <h1 id="gb-pdp-not-found-heading" style="font-family: Playfair Display, serif; font-size: clamp(2rem, 5vw, 3.5rem); margin: 0 0 12px; color: #1f2937;">Product Not Found</h1>
            <p style="margin: 0 0 24px; font-family: Poppins, sans-serif; color: #64748b; font-size: 1rem; line-height: 1.7;">The product link is invalid or the item is no longer available.</p>
            <a href="products.html" style="display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 22px; border-radius: 999px; background: #ec1e79; color: #fff; text-decoration: none; font-family: Poppins, sans-serif; font-weight: 600;">Back to Products</a>
        `;

        const main = document.querySelector('main');
        if (main && main.parentNode) {
            main.parentNode.insertBefore(notice, main);
        }
    };

    const renderProduct = (product) => {
        document.title = `${product.name} | Glitter Boutique`;
        hideAuxiliarySections();

        const mainImage = document.getElementById('gb-pdp-main-img-target');
        const titleNode = document.querySelector('.gb-pdp-product-title');
        const collectionTag = document.querySelector('.gb-pdp-collection-tag');
        const priceCurrent = document.querySelector('.gb-pdp-price-current');
        const priceOld = document.querySelector('.gb-pdp-price-old');
        const discountTag = document.querySelector('.gb-pdp-price-discount');
        const ratingText = document.querySelector('.gb-pdp-rating-text');
        const ratingCount = document.querySelector('.gb-pdp-rating-count');
        const galleryBadge = document.querySelector('.gb-pdp-gallery-badge');
        const descriptionPanel = document.getElementById('panel-desc');
        const reviewsPanel = document.getElementById('panel-reviews');

        if (mainImage) {
            mainImage.src = product.image;
            mainImage.alt = product.alt || product.name;
        }

        document.querySelectorAll('.gb-pdp-thumb-btn img').forEach((thumb) => {
            thumb.src = product.image;
            thumb.alt = product.alt || product.name;
        });

        if (titleNode) titleNode.textContent = product.name;
        if (collectionTag) collectionTag.textContent = product.mainCategoryLabel || product.category || 'Product';
        if (priceCurrent) priceCurrent.textContent = formatPrice(product.price);

        if (priceOld) {
            if (product.oldPrice) {
                priceOld.style.display = '';
                priceOld.textContent = formatPrice(product.oldPrice);
            } else {
                priceOld.style.display = 'none';
            }
        }

        if (discountTag) {
            if (product.oldPrice && product.oldPrice > product.price) {
                const discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                discountTag.style.display = '';
                discountTag.textContent = `Save ${discountPercent}%`;
            } else {
                discountTag.style.display = 'none';
            }
        }

        if (ratingText) {
            ratingText.firstChild && (ratingText.firstChild.textContent = `${Number(product.rating || 0).toFixed(1)} / 5.0 `);
        }

        if (ratingCount) {
            ratingCount.textContent = product.availabilityLabel ? `(${product.availabilityLabel})` : '(Verified reviews)';
        }

        if (galleryBadge) {
            galleryBadge.textContent = product.statusLabel || product.availabilityLabel || 'Featured';
        }

        if (descriptionPanel) {
            descriptionPanel.innerHTML = `<p>${product.description}</p>`;
        }

        if (reviewsPanel) {
            reviewsPanel.innerHTML = `<p>${product.rating ? `This product is rated ${Number(product.rating).toFixed(1)} out of 5 by customers.` : 'Customer reviews are not available for this product yet.'}</p>`;
        }

        const priceRow = document.querySelector('.gb-pdp-price-row');
        if (priceRow && !document.getElementById('gb-pdp-stock-chip')) {
            const stockChip = document.createElement('span');
            stockChip.id = 'gb-pdp-stock-chip';
            stockChip.style.cssText = 'display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 999px; background: rgba(236, 30, 121, 0.10); color: #ec1e79; font: 500 12px Poppins, sans-serif; letter-spacing: 0.02em;';
            stockChip.textContent = product.availabilityLabel || 'Stock status unavailable';
            priceRow.appendChild(stockChip);
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    const product = getProductFromRoute();
    if (!product) {
        showNotFound();
        return;
    }

    renderProduct(product);

    const swatchContainer = document.querySelector('.gb-pdp-swatches-row');
    if (swatchContainer) {
        swatchContainer.addEventListener('click', (event) => {
            const activeTrigger = event.target.closest('.gb-pdp-swatch-btn');
            if (!activeTrigger || activeTrigger.classList.contains('gb-pdp-swatch-active')) return;

            const currentActive = swatchContainer.querySelector('.gb-pdp-swatch-active');
            if (currentActive) {
                currentActive.setAttribute('aria-checked', 'false');
                currentActive.classList.remove('gb-pdp-swatch-active');
            }

            activeTrigger.classList.add('gb-pdp-swatch-active');
            activeTrigger.setAttribute('aria-checked', 'true');
        });
    }

    const thumbnailCluster = document.querySelector('.gb-pdp-gallery-thumbnails');
    const mainImgTarget = document.getElementById('gb-pdp-main-img-target');
    if (thumbnailCluster && mainImgTarget) {
        thumbnailCluster.addEventListener('click', (event) => {
            const activeThumb = event.target.closest('.gb-pdp-thumb-btn');
            if (!activeThumb || activeThumb.classList.contains('gb-pdp-thumb-active')) return;

            const currentThumb = thumbnailCluster.querySelector('.gb-pdp-thumb-active');
            if (currentThumb) {
                currentThumb.setAttribute('aria-selected', 'false');
                currentThumb.classList.remove('gb-pdp-thumb-active');
            }

            activeThumb.classList.add('gb-pdp-thumb-active');
            activeThumb.setAttribute('aria-selected', 'true');

            const targetSourcePath = activeThumb.querySelector('img')?.getAttribute('src');
            if (!targetSourcePath) return;

            mainImgTarget.style.opacity = '0.3';
            mainImgTarget.style.transform = 'scale(0.98)';

            setTimeout(() => {
                mainImgTarget.setAttribute('src', targetSourcePath);
                mainImgTarget.style.opacity = '1';
                mainImgTarget.style.transform = 'scale(1)';
            }, 180);
        });
    }

    const qtyInput = document.getElementById('gb-pdp-qty-stepper');
    const qtyMinus = document.getElementById('gb-pdp-qty-minus');
    const qtyPlus = document.getElementById('gb-pdp-qty-plus');

    if (qtyInput && qtyMinus && qtyPlus) {
        const constraintMin = parseInt(qtyInput.getAttribute('min'), 10) || 1;
        const constraintMax = parseInt(qtyInput.getAttribute('max'), 10) || 10;

        qtyPlus.addEventListener('click', () => {
            const currentIntVal = parseInt(qtyInput.value, 10);
            if (currentIntVal < constraintMax) qtyInput.value = currentIntVal + 1;
        });

        qtyMinus.addEventListener('click', () => {
            const currentIntVal = parseInt(qtyInput.value, 10);
            if (currentIntVal > constraintMin) qtyInput.value = currentIntVal - 1;
        });
    }

    const tabsNavBar = document.getElementById('gb-pdp-sticky-tabs-bar');
    if (tabsNavBar) {
        tabsNavBar.addEventListener('click', (event) => {
            const currentTabTrigger = event.target.closest('.gb-pdp-tab-trigger');
            if (!currentTabTrigger || currentTabTrigger.classList.contains('gb-pdp-tab-active')) return;

            const tabParentList = currentTabTrigger.closest('.gb-pdp-tabs-list');
            const targetPanelId = currentTabTrigger.getAttribute('aria-controls');
            const targetedPanelNode = document.getElementById(targetPanelId);
            if (!targetedPanelNode) return;

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

            currentTabTrigger.classList.add('gb-pdp-tab-active');
            currentTabTrigger.setAttribute('aria-selected', 'true');
            currentTabTrigger.removeAttribute('tabindex');
            targetedPanelNode.classList.add('gb-pdp-panel-active');
        });
    }

    const purchaseForm = document.getElementById('gb-pdp-purchase-matrix-form');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const quantity = parseInt(document.getElementById('gb-pdp-qty-stepper')?.value || '1', 10);
            if (typeof GlitterCartManager !== 'undefined') {
                const productId = GlitterCartManager.createProductId
                    ? GlitterCartManager.createProductId(product.name)
                    : `product-${String(product.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

                GlitterCartManager.addToCart(productId, product.name, product.price, quantity, {
                    image: product.image,
                    alt: product.alt || product.name,
                    category: product.mainCategoryLabel || product.category || '',
                    sourceUrl: window.location.href
                });
            }
        });
    }
});
