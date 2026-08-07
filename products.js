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

    const products = [
        // Belly Tattoo
        { id: 'belly-tattoo-crystal-1', name: 'Crystal Belly Tattoo Design', description: 'Glamorous crystal temporary tattoo perfect for beachside celebrations.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'belly-naval-tattoos', subCategoryLabel: 'Belly / Naval Tattoos', price: 349, oldPrice: 449, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.8, popularity: 85, createdAt: '2026-07-22', image: 'assets/products/Belly Tattoo/171.jpg' },
        { id: 'belly-tattoo-gem-2', name: 'Premium Gem Belly Tattoo', description: 'Luxe body art with premium gem placement for festival vibes.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'belly-naval-tattoos', subCategoryLabel: 'Belly / Naval Tattoos', price: 379, oldPrice: 499, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.7, popularity: 78, createdAt: '2026-07-21', image: 'assets/products/Belly Tattoo/206.jpg' },
        { id: 'belly-tattoo-sparkle-3', name: 'Sparkle Belly Art', description: 'Enchanting temporary tattoo with brilliant sparkle elements.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'belly-naval-tattoos', subCategoryLabel: 'Belly / Naval Tattoos', price: 359, oldPrice: 469, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.9, popularity: 82, createdAt: '2026-07-20', image: 'assets/products/Belly Tattoo/220.jpg' },
        { id: 'belly-tattoo-royal-4', name: 'Royal Belly Tattoo', description: 'Regal design with royal purple and gold embellishments.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'belly-naval-tattoos', subCategoryLabel: 'Belly / Naval Tattoos', price: 399, oldPrice: 529, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.6, popularity: 71, createdAt: '2026-07-19', image: 'assets/products/Belly Tattoo/221.jpg' },
        
        // Chest Blings
        { id: 'chest-bling-pearl-1', name: 'Pearl Chest Bling Set', description: 'Elegant pearl-accented chest jewelry for evening events.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'chest-blings', subCategoryLabel: 'Chest Blings', price: 649, oldPrice: 849, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller', 'featured'], statusLabel: 'Best Seller', rating: 4.9, popularity: 94, createdAt: '2026-07-23', image: 'assets/products/Chest Blings/139.jpeg' },
        { id: 'chest-bling-crystal-2', name: 'Crystal Chest Bling', description: 'Sparkling crystal chest adornment for festival looks.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'chest-blings', subCategoryLabel: 'Chest Blings', price: 679, oldPrice: 879, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.8, popularity: 89, createdAt: '2026-07-22', image: 'assets/products/Chest Blings/246.jpg' },
        { id: 'chest-bling-gold-3', name: 'Gold Chest Jewelry', description: 'Luxurious gold-plated chest bling for sophisticated looks.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'chest-blings', subCategoryLabel: 'Chest Blings', price: 699, oldPrice: 899, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 84, createdAt: '2026-07-21', image: 'assets/products/Chest Blings/247.jpg' },
        { id: 'chest-bling-diamond-4', name: 'Diamond Chest Bling', description: 'Premium diamond-cut chest decoration for special occasions.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'chest-blings', subCategoryLabel: 'Chest Blings', price: 729, oldPrice: 949, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.8, popularity: 79, createdAt: '2026-07-20', image: 'assets/products/Chest Blings/248.jpg' },
        { id: 'chest-bling-ruby-5', name: 'Ruby Red Chest Set', description: 'Vibrant ruby-red chest jewelry for bold statements.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'chest-blings', subCategoryLabel: 'Chest Blings', price: 659, oldPrice: 859, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.7, popularity: 87, createdAt: '2026-07-19', image: 'assets/products/Chest Blings/30.jpeg' },
        { id: 'chest-bling-silver-6', name: 'Silver Chest Adornment', description: 'Shimmering silver chest bling perfect for elegant events.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'chest-blings', subCategoryLabel: 'Chest Blings', price: 619, oldPrice: 819, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.9, popularity: 92, createdAt: '2026-07-18', image: 'assets/products/Chest Blings/35.jpeg' },
        
        // Kundan Mehandi
        { id: 'kundan-mehandi-1', name: 'Traditional Kundan Sticker Set', description: 'Authentic kundan mehandi design with traditional patterns.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kundan-mehandi-stickers', subCategoryLabel: 'Kundan Mehandi Stickers', price: 429, oldPrice: 569, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller', 'featured'], statusLabel: 'Best Seller', rating: 4.9, popularity: 96, createdAt: '2026-07-23', image: 'assets/products/Kundan Mehandi/RI601.jpeg' },
        { id: 'kundan-mehandi-2', name: 'Premium Kundan Collection', description: 'Luxurious kundan stickers with intricate details for special occasions.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kundan-mehandi-stickers', subCategoryLabel: 'Kundan Mehandi Stickers', price: 459, oldPrice: 609, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.8, popularity: 91, createdAt: '2026-07-22', image: 'assets/products/Kundan Mehandi/RI602.jpeg' },
        { id: 'kundan-mehandi-3', name: 'Festive Kundan Mehandi', description: 'Vibrant festive kundan designs perfect for celebrations.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kundan-mehandi-stickers', subCategoryLabel: 'Kundan Mehandi Stickers', price: 439, oldPrice: 579, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 86, createdAt: '2026-07-21', image: 'assets/products/Kundan Mehandi/RI603.jpeg' },
        { id: 'kundan-mehandi-4', name: 'Royal Kundan Stickers', description: 'Royal purple and gold kundan mehandi collection.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kundan-mehandi-stickers', subCategoryLabel: 'Kundan Mehandi Stickers', price: 469, oldPrice: 619, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.8, popularity: 80, createdAt: '2026-07-20', image: 'assets/products/Kundan Mehandi/RI604.jpeg' },
        
        // Glow In the Dark Face Gems
        { id: 'glow-face-gem-1', name: 'Neon Glow Face Gems', description: 'Luminous face gems that glow in the dark for night parties.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'glow-in-the-dark-stickers', subCategoryLabel: 'Glow In The Dark Stickers', price: 399, oldPrice: 519, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.9, popularity: 95, createdAt: '2026-07-23', image: 'assets/products/Glow In the Dark face Gems/278.jpeg' },
        { id: 'glow-face-gem-2', name: 'Premium Glow Face Collection', description: 'High-intensity glow face gems for stunning night looks.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'glow-in-the-dark-stickers', subCategoryLabel: 'Glow In The Dark Stickers', price: 419, oldPrice: 549, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured', 'new-arrival'], statusLabel: 'New Arrival', rating: 4.8, popularity: 88, createdAt: '2026-07-22', image: 'assets/products/Glow In the Dark face Gems/279.jpeg' },
        { id: 'glow-face-gem-3', name: 'Festival Glow Gems', description: 'Vibrant glow gems perfect for concert and festival vibes.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'glow-in-the-dark-stickers', subCategoryLabel: 'Glow In The Dark Stickers', price: 409, oldPrice: 539, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.7, popularity: 82, createdAt: '2026-07-21', image: 'assets/products/Glow In the Dark face Gems/280.jpeg' },
        { id: 'glow-face-gem-4', name: 'Rainbow Glow Face Gems', description: 'Multi-colored glow gems that shine bright in darkness.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'glow-in-the-dark-stickers', subCategoryLabel: 'Glow In The Dark Stickers', price: 389, oldPrice: 509, availability: 'coming-soon', availabilityLabel: 'Coming Soon', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.6, popularity: 75, createdAt: '2026-07-20', image: 'assets/products/Glow In the Dark face Gems/281.jpeg' },
        
        // Hair Decoration
        { id: 'hair-decor-sparkle-1', name: 'Sparkle Hair Gems', description: 'Shimmering hair gems for elegant hairstyles.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'hair-decoration', subCategoryLabel: 'Hair Decoration', price: 329, oldPrice: 429, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.8, popularity: 84, createdAt: '2026-07-23', image: 'assets/products/Hair Decoration/1.jpeg' },
        { id: 'hair-decor-crystal-2', name: 'Crystal Hair Decoration', description: 'Premium crystal hair gems for sophisticated looks.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'hair-decoration', subCategoryLabel: 'Hair Decoration', price: 349, oldPrice: 459, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.9, popularity: 91, createdAt: '2026-07-22', image: 'assets/products/Hair Decoration/15.jpeg' },
        { id: 'hair-decor-gold-3', name: 'Gold Hair Bling', description: 'Luxurious gold-tone hair gems for special events.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'hair-decoration', subCategoryLabel: 'Hair Decoration', price: 359, oldPrice: 479, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 86, createdAt: '2026-07-21', image: 'assets/products/Hair Decoration/2.jpeg' },
        { id: 'hair-decor-festival-4', name: 'Festival Hair Gems Collection', description: 'Colorful hair gems perfect for festival celebrations.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'hair-decoration', subCategoryLabel: 'Hair Decoration', price: 339, oldPrice: 449, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.8, popularity: 79, createdAt: '2026-07-20', image: 'assets/products/Hair Decoration/3.jpeg' },
        
        // Halloween Stickers
        { id: 'halloween-stick-spooky-1', name: 'Spooky Halloween Sticker Set', description: 'Fun spooky stickers perfect for Halloween celebrations.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'halloween-stickers', subCategoryLabel: 'Halloween Stickers', price: 449, oldPrice: 599, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller', 'featured'], statusLabel: 'Best Seller', rating: 4.9, popularity: 94, createdAt: '2026-07-23', image: 'assets/products/Halloween Stickers/1-min.jpg' },
        { id: 'halloween-stick-costume-2', name: 'Costume Ready Halloween Gems', description: 'Festive gem stickers for amazing Halloween costume looks.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'halloween-stickers', subCategoryLabel: 'Halloween Stickers', price: 469, oldPrice: 619, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.8, popularity: 89, createdAt: '2026-07-22', image: 'assets/products/Halloween Stickers/10-min.jpg' },
        { id: 'halloween-stick-glow-3', name: 'Glow Halloween Face Stickers', description: 'Glowing Halloween stickers that shine in the dark.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'halloween-stickers', subCategoryLabel: 'Halloween Stickers', price: 459, oldPrice: 609, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 85, createdAt: '2026-07-21', image: 'assets/products/Halloween Stickers/12.jpg' },
        { id: 'halloween-stick-party-4', name: 'Party Halloween Collection', description: 'Vibrant party stickers for Halloween festivities.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'halloween-stickers', subCategoryLabel: 'Halloween Stickers', price: 439, oldPrice: 589, availability: 'coming-soon', availabilityLabel: 'Coming Soon', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.6, popularity: 77, createdAt: '2026-07-20', image: 'assets/products/Halloween Stickers/20-min.jpg' },
        
        // Kids Party Stickers
        { id: 'kids-party-stick-1', name: 'Fun Kids Party Stickers', description: 'Colorful safe stickers designed for kids parties.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kids-face-stickers', subCategoryLabel: 'Kids Face Stickers', price: 279, oldPrice: 379, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.9, popularity: 93, createdAt: '2026-07-23', image: 'assets/products/Kids party stickers/14.jpeg' },
        { id: 'kids-party-stick-2', name: 'Safe Kids Face Gems', description: 'Premium safe face gems collection for children.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kids-face-stickers', subCategoryLabel: 'Kids Face Stickers', price: 289, oldPrice: 389, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.8, popularity: 87, createdAt: '2026-07-22', image: 'assets/products/Kids party stickers/145.jpeg' },
        { id: 'kids-party-stick-3', name: 'Playful Kids Sticker Set', description: 'Playful colorful stickers perfect for children celebrations.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kids-face-stickers', subCategoryLabel: 'Kids Face Stickers', price: 269, oldPrice: 369, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 81, createdAt: '2026-07-21', image: 'assets/products/Kids party stickers/147.jpg' },
        { id: 'kids-party-stick-4', name: 'Rainbow Kids Party Gems', description: 'Rainbow gems collection specially for kids parties.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'kids-face-stickers', subCategoryLabel: 'Kids Face Stickers', price: 299, oldPrice: 399, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.8, popularity: 76, createdAt: '2026-07-20', image: 'assets/products/Kids party stickers/149.jpeg' },
        
        // Party Stickers
        { id: 'party-stick-glam-1', name: 'Glamorous Party Stickers', description: 'Stunning glamorous stickers for epic parties.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'party-stickers', subCategoryLabel: 'Party Stickers', price: 389, oldPrice: 519, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller', 'featured'], statusLabel: 'Best Seller', rating: 4.9, popularity: 95, createdAt: '2026-07-23', image: 'assets/products/Party Stickers/1.jpg' },
        { id: 'party-stick-festive-2', name: 'Festive Party Collection', description: 'Festive gem stickers for unforgettable parties.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'party-stickers', subCategoryLabel: 'Party Stickers', price: 409, oldPrice: 539, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.8, popularity: 90, createdAt: '2026-07-22', image: 'assets/products/Party Stickers/10.jpg' },
        { id: 'party-stick-night-3', name: 'Night Party Glitter Gems', description: 'Shimmering glitter gems perfect for night parties.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'party-stickers', subCategoryLabel: 'Party Stickers', price: 399, oldPrice: 529, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 87, createdAt: '2026-07-21', image: 'assets/products/Party Stickers/112.jpg' },
        { id: 'party-stick-premium-4', name: 'Premium Party Bling', description: 'Premium party collection for exclusive celebrations.', mainCategory: 'face-body-jewels', mainCategoryLabel: 'Face & Body Jewels', subCategory: 'party-stickers', subCategoryLabel: 'Party Stickers', price: 379, oldPrice: 499, availability: 'coming-soon', availabilityLabel: 'Coming Soon', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.6, popularity: 80, createdAt: '2026-07-20', image: 'assets/products/Party Stickers/116.jpg' },

        // Bags
        { id: 'bags-potli-1', name: 'Royal Embroidered Potli Bag', description: 'Elegant embroidered potli with a festive finish for special occasions.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'potlis', subCategoryLabel: 'Potlis', price: 899, oldPrice: 1199, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['featured'], statusLabel: 'Featured', rating: 4.8, popularity: 88, createdAt: '2026-07-24', image: 'https://whimsyindia.com/cdn/shop/files/DSCF1549.jpg?v=1738908785&width=3378' },
        { id: 'bags-clutch-1', name: 'Crystal Clutch Bag', description: 'Compact statement clutch designed for evening and celebration looks.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'clutch-bags', subCategoryLabel: 'Clutch Bags', price: 1299, oldPrice: 1599, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['best-seller'], statusLabel: 'Best Seller', rating: 4.9, popularity: 92, createdAt: '2026-07-23', image: 'https://i.pinimg.com/474x/28/a0/da/28a0daa59966140b6f947683878d298c.jpg' },
        { id: 'bags-organiser-1', name: 'Luxe Travel Organiser', description: 'Spacious organiser for keeping beauty essentials neat and ready.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'organisers', subCategoryLabel: 'Organisers', price: 1099, oldPrice: 1399, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['new-arrival'], statusLabel: 'New Arrival', rating: 4.7, popularity: 84, createdAt: '2026-07-22', image: 'https://m.media-amazon.com/images/I/51P9xpBWZ1L._AC_UF1000,1000_QL80_.jpg' },
        { id: 'bags-makeup-pouch-1', name: 'Luxe Makeup Pouch', description: 'Soft, polished makeup pouch for everyday storage and travel.', mainCategory: 'bags', mainCategoryLabel: 'Bags', subCategory: 'luxe-makeup-pouches', subCategoryLabel: 'Luxe Makeup Pouches', price: 999, oldPrice: 1299, availability: 'in-stock', availabilityLabel: 'In Stock', status: ['limited-edition'], statusLabel: 'Limited Edition', rating: 4.8, popularity: 86, createdAt: '2026-07-21', image: 'https://rukminim1.flixcart.com/image/480/480/xif0q/tattoo-kit/d/a/o/crystal-tears-face-decoration-sticker-glitter-eye-bindi-stickers-original-imagv3zyc4pen9qg.jpeg?q=80' }
    ];

    const homeProducts = Array.isArray(window.GB_HOME_PRODUCTS) ? window.GB_HOME_PRODUCTS : [];
    const findHomeProduct = typeof window.GB_FIND_HOME_PRODUCT === 'function'
        ? window.GB_FIND_HOME_PRODUCT
        : (productId) => homeProducts.find((product) => product.id === productId) || null;

    window.GB_PRODUCTS = [...products, ...homeProducts];
    window.GB_FIND_PRODUCT = (productId) => products.find((product) => product.id === productId) || findHomeProduct(productId);

    if (!productGrid || !resultsCount || !sortSelect || filterForms.length === 0) return;

    const mainCategories = [
        { value: 'face-body-jewels', label: 'Face & Body Jewels' },
        { value: 'bags', label: 'Bags' }
    ];

    const subCategoryGroups = [
        { key: 'face-body-jewels', label: 'Face & Body Jewels', items: [
            { value: 'belly-naval-tattoos', label: 'Belly / Naval Tattoos' },
            { value: 'chest-blings', label: 'Chest Blings' },
            { value: 'kundan-mehandi-stickers', label: 'Kundan Mehandi Stickers' },
            { value: 'glow-in-the-dark-stickers', label: 'Glow In The Dark Stickers' },
            { value: 'hair-decoration', label: 'Hair Decoration' },
            { value: 'halloween-stickers', label: 'Halloween Stickers' },
            { value: 'kids-face-stickers', label: 'Kids Face Stickers' },
            { value: 'party-stickers', label: 'Party Stickers' }
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
            if (quickViewButton) {
                const card = quickViewButton.closest('[data-gb-products-product-id]');
                const productId = card?.getAttribute('data-gb-products-product-id');
                if (productId) {
                    window.location.href = `single_product.html?id=${encodeURIComponent(productId)}`;
                }
            }
            if (addCartButton) { 
                const card = addCartButton.closest('[data-gb-products-product-id]');
                if (!card) return;

                const productId = card.getAttribute('data-gb-products-product-id') || '';
                const product = products.find((catalogProduct) => catalogProduct.id === productId);
                const productName = product?.name || card.querySelector('.gb-products-card-title')?.textContent || 'Product';
                const productPrice = product?.price ?? parseInt(card.querySelector('.gb-products-card-price')?.textContent?.replace(/[^\d]/g, '') || '0', 10);
                const productImage = product?.image || card.querySelector('.gb-products-card-image')?.getAttribute('src') || '';
                const productImageAlt = product?.alt || card.querySelector('.gb-products-card-image')?.alt || productName;
                const productCategory = product?.subCategoryLabel || product?.mainCategoryLabel || '';
                const label = addCartButton.querySelector('span'); 
                addCartButton.classList.add('gb-products-card-link-added'); 
                if (label) label.textContent = 'Added';
                
                // Use unified cart manager for consistent badge updates
                if (typeof GlitterCartManager !== 'undefined') {
                    const cartProductId = productId || (GlitterCartManager.createProductId
                        ? GlitterCartManager.createProductId(productName)
                        : `product-${String(productName).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
                    GlitterCartManager.addToCart(cartProductId, productName, productPrice, 1, {
                        image: productImage,
                        alt: productImageAlt,
                        category: productCategory,
                        productId: cartProductId,
                        sourceUrl: window.location.href
                    });
                }
            }
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

