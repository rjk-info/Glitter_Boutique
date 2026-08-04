window.GB_HOME_PRODUCTS = [
    {
        id: 'crystal-crown-face-gems',
        name: 'Crystal Crown Face Gems',
        description: 'Luxury statement bohemian crystal forehead arrangements.',
        mainCategoryLabel: 'Premium Festival Collection',
        availabilityLabel: 'In Stock',
        statusLabel: 'Best Seller',
        price: 599,
        oldPrice: 799,
        rating: 5,
        image: './assets/products/Party Stickers/16 (2).jpg',
        alt: 'Crystal Crown Face Gems luxury forehead embellishment'
    },
    {
        id: 'aurora-body-gems',
        name: 'Aurora Body Gems',
        description: 'Iridescent, prismatic light-catching body contour accents.',
        mainCategoryLabel: 'Premium Body Collection',
        availabilityLabel: 'In Stock',
        statusLabel: 'Trending',
        price: 699,
        oldPrice: 899,
        rating: 5,
        image: './assets/products/Belly Tattoo/171.jpg',
        alt: 'Aurora Body Gems chromatic shimmering crystal stickers'
    },
    {
        id: 'festival-glow-pack',
        name: 'Festival Glow Pack',
        description: 'High-luminance multi-set crystal compilation maps.',
        mainCategoryLabel: 'Festival Collection',
        availabilityLabel: 'In Stock',
        statusLabel: 'Best Seller',
        price: 799,
        oldPrice: 999,
        rating: 5,
        image: 'https://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/5/1/514ka7PjaOL.jpg',
        alt: 'Festival Glow Pack multi-colored crystal value compilation'
    },
    {
        id: 'diamond-luxe-collection',
        name: 'Diamond Luxe Collection',
        description: 'Elite hyper-reflective diamond-cut cosmetic gem sets.',
        mainCategoryLabel: 'Luxury Collection',
        availabilityLabel: 'In Stock',
        statusLabel: 'Luxe',
        price: 999,
        oldPrice: 1299,
        rating: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTludvUPnNi3HZKvSDoCYjrffhcCFqNhQkrGWd1drBp5w&s=10',
        alt: 'Diamond Luxe Collection diamond cut hyper reflective gem variants'
    }
];

window.GB_FIND_HOME_PRODUCT = (productId) => window.GB_HOME_PRODUCTS.find((product) => product.id === productId) || null;