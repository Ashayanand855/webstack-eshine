const defaultSizes = ['XS', 'S', 'M', 'L', 'XL'];

const createColor = (id, label, hex, images = []) => ({
  id,
  label,
  hex,
  images,
});

const createProduct = ({
  id,
  name,
  price,
  img,
  images,
  description,
  colors,
  sizes = defaultSizes,
  reviews,
  audience,
  category,
  style,
  sections = ['collections'],
}) => ({
  id,
  name,
  price,
  img,
  images: images?.length ? images : [img],
  description,
  sizes,
  colors,
  reviews,
  audience,
  category,
  style,
  sections,
});

const baseCatalogProducts = [
  createProduct({
    id: 'men-shirt',
    name: 'Shirt',
    price: '₹899',
    img: '/PIC/MEN/FORMAL/SHIRTS/1_42d735f4-15ce-4867-8494-c6e4a24f2fff.png',
    audience: 'men',
    category: 'top-wear',
    style: 'formal',
    description: 'A clean everyday shirt with a tailored structure and lightweight fabric.',
    colors: [
      createColor('Teal Green', 'Teal Green', '#9DB6B5', [
        '/PIC/MEN/FORMAL/SHIRTS/1_42d735f4-15ce-4867-8494-c6e4a24f2fff.png',
      ]),
      createColor('Violet', 'Violet', '#B4B0C3', [
        '/PIC/MEN/FORMAL/SHIRTS/4MSS1216-11-M22.png',
      ]),
      createColor('Black', 'Black', '##333134', [
        '/PIC/MEN/FORMAL/SHIRTS/4MSS1813-10-M2737_85b2534e-7886-4fcb-8da4-4d105eccf6a5.png',
      ]),
    ],
  }),
  createProduct({
    id: 'men-sweater',
    name: 'Sweater',
    price: '₹2000',
    img: '/PIC/MEN/CASUALS/Sweaters/15.jpg',
    audience: 'men',
    category: 'top-wear',
    style: 'casual',
    description: 'Soft knitwear designed for layered winter looks without bulk.',
    colors: [
      createColor('cream', 'Cream', '#e8e0cf'),
      createColor('olive', 'Olive', '#70724e'),
      createColor('navy', 'Navy', '#23354d'),
    ],
  }),
  createProduct({
    id: 'men-sweatshirt',
    name: 'Sweatshirt',
    price: '₹5000',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_0.jpg',
    audience: 'men',
    category: 'top-wear',
    style: 'casual',
    description: 'A premium oversized sweatshirt made for relaxed streetwear styling.',
    colors: [
      createColor('stone', 'Stone', '#b8b0a4'),
      createColor('black', 'Black', '#1d1d1d'),
      createColor('rust', 'Rust', '#9c5b35'),
    ],
  }),
  createProduct({
    id: 'men-tshirt',
    name: 'T-Shirt',
    price: '₹4200',
    img: '/PIC/MEN/CASUALS/TSHIRT/20.jpg',
    audience: 'men',
    category: 'top-wear',
    style: 'casual',
    description: 'A structured premium tee that works well on its own or under a jacket.',
    colors: [
      createColor('black', 'Black', '#111111'),
      createColor('white', 'White', '#f7f7f7'),
      createColor('green', 'Forest', '#365247'),
    ],
  }),
  createProduct({
    id: 'men-kurta',
    name: 'Kurta',
    price: '₹1290',
    img: '/PIC/MEN/CASUALS/SHIRTS/13.jpg',
    audience: 'men',
    category: 'ethnic',
    style: 'festive',
    description: 'Contemporary kurta styling with a sharper festive silhouette.',
    colors: [
      createColor('beige', 'Beige', '#cbbba1'),
      createColor('maroon', 'Maroon', '#6b2638'),
      createColor('green', 'Bottle Green', '#1f4538'),
    ],
  }),
  createProduct({
    id: 'men-hoodie',
    name: 'Hoodie',
    price: '₹2900',
    img: '/PIC/MEN/CASUALS/Hoodies/5.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'casual',
    description: 'Heavyweight hoodie built for comfort, warmth, and clean street-style fits.',
    colors: [
      createColor('grey', 'Grey', '#989898'),
      createColor('navy', 'Navy', '#26334a'),
      createColor('burgundy', 'Burgundy', '#6c2534'),
    ],
  }),
  createProduct({
    id: 'men-coat-pant',
    name: 'Coat Pant',
    price: '₹4020',
    img: '/PIC/MEN/FORMAL/PANTS/men_trousers0.jpg',
    audience: 'men',
    category: 'formal',
    style: 'formal',
    description: 'Formal tailoring with a sharp finish for occasions that need structure.',
    colors: [
      createColor('black', 'Black', '#151515'),
      createColor('navy', 'Navy', '#202f4a'),
      createColor('brown', 'Brown', '#5e4733'),
    ],
  }),
  createProduct({
    id: 'women-anarkali',
    name: 'Anarkali Set',
    price: '₹1290',
    img: '/PIC/WOMEN/wedding/women_wedding_collection0.jpg',
    audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'An elegant festive set with flowing movement and statement detailing.',
    colors: [
      createColor('wine', 'Wine', '#6f2035'),
      createColor('gold', 'Gold', '#ba9751'),
      createColor('emerald', 'Emerald', '#226052'),
    ],
  }),
  createProduct({
    id: 'women-kurta-set',
    name: 'Kurta Set',
    price: '₹890',
    img: '/PIC/WOMEN/Kurta Set/Screenshot 2026-03-22 at 09.49.18.png',
    audience: 'women',
    category: 'ethnic',
    style: 'casual',
    description: 'A versatile kurta set made for polished everyday and occasion wear.',
    colors: [
      createColor('pink', 'Rose Pink', '#cf8aa1'),
      createColor('mint', 'Mint', '#8db7ad'),
      createColor('ivory', 'Ivory', '#eee7d5'),
    ],
  }),
  createProduct({
    id: 'women-dress',
    name: 'Dress',
    price: '₹580',
    img: '/PIC/WOMEN/Dress/Screenshot 2026-03-22 at 09.31.20.png',
    audience: 'women',
    category: 'dress',
    style: 'casual',
    description: 'A flattering dress silhouette tailored for day-to-evening wear.',
    colors: [
      createColor('black', 'Black', '#141414'),
      createColor('red', 'Red', '#9d2437'),
      createColor('blue', 'Royal Blue', '#3d5f9a'),
    ],
  }),
  createProduct({
    id: 'women-formal-shirt',
    name: 'Formal Shirt',
    price: '₹420',
    img: '/PIC/WOMEN/Shirt/Screenshot 2026-03-22 at 10.03.45.png',
    audience: 'women',
    category: 'formal',
    style: 'formal',
    description: 'A minimal formal shirt cut with a crisp collar and office-ready fit.',
    colors: [
      createColor('white', 'White', '#f8f7f2'),
      createColor('blue', 'Powder Blue', '#b4c8e2'),
      createColor('grey', 'Grey', '#9097a1'),
    ],
  }),
  createProduct({
    id: 'women-lehenga',
    name: 'Lehenga',
    price: '₹1290',
    img: '/PIC/WOMEN/wedding/women_wedding_collection1.jpg',
    audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'A statement lehenga set with rich festive texture and volume.',
    colors: [
      createColor('pink', 'Hot Pink', '#ca4c7a'),
      createColor('red', 'Red', '#b21b2f'),
      createColor('gold', 'Gold', '#c49f4e'),
    ],
  }),
  createProduct({
    id: 'women-sharara',
    name: 'Shrara',
    price: '₹890',
    img: '/PIC/WOMEN/wedding/women_wedding_collection2.jpg',
    audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'A festive sharara set with light movement and elevated detailing.',
    colors: [
      createColor('pink', 'Rani Pink', '#c9497f'),
      createColor('ivory', 'Ivory', '#efe7d7'),
      createColor('teal', 'Teal', '#29696b'),
    ],
  }),
  createProduct({
    id: 'women-coat-pant',
    name: 'Coat Pant',
    price: '₹420',
    img: '/PIC/WOMEN/formal/1266282fc945b8ca295bbb8b9f783774.jpg',
    audience: 'women',
    category: 'formal',
    style: 'formal',
    description: 'Power tailoring for a structured and contemporary formal look.',
    colors: [
      createColor('black', 'Black', '#151515'),
      createColor('beige', 'Beige', '#b9a488'),
      createColor('navy', 'Navy', '#243652'),
    ],
  }),
  createProduct({
    id: 'women-formal-pant',
    name: 'Formal Pant',
    price: '₹580',
    img: '/PIC/WOMEN/formal/9553cca573c5629b995ee41e3994d1d3.jpg',
    audience: 'women',
    category: 'formal',
    style: 'formal',
    description: 'Clean high-rise formal pants with a straight drape and minimal finish.',
    colors: [
      createColor('black', 'Black', '#1a1a1a'),
      createColor('brown', 'Mocha', '#7a5f47'),
      createColor('grey', 'Grey', '#8d8d8d'),
    ],
  }),
  createProduct({
    id: 'women-hoodie',
    name: 'Hoodie',
    price: '₹1290',
    img: '/PIC/WOMEN/casual/0808f9da5e7e9154cb03b6f26fd3bae1.jpg',
    audience: 'women',
    category: 'outerwear',
    style: 'casual',
    description: 'Relaxed hoodie styling designed for comfort-first casual outfits.',
    colors: [
      createColor('lavender', 'Lavender', '#a194c9'),
      createColor('grey', 'Grey', '#949494'),
      createColor('black', 'Black', '#1b1b1b'),
    ],
  }),
  createProduct({
    id: 'women-jacket',
    name: 'Jacket',
    price: '₹890',
    img: '/PIC/WOMEN/casual/0f6e752c76a7b116fe4fc4d7746824e0.jpg',
    audience: 'women',
    category: 'outerwear',
    style: 'casual',
    description: 'A cropped jacket profile with sharp finishing and everyday versatility.',
    colors: [
      createColor('wine', 'Wine', '#702537'),
      createColor('black', 'Black', '#151515'),
      createColor('tan', 'Tan', '#9b7e5d'),
    ],
  }),
  createProduct({
    id: 'women-sweater',
    name: 'Sweater',
    price: '₹420',
    img: '/PIC/WOMEN/casual/1652ba28cdb7c3817d9667b3f00ee45b.jpg',
    audience: 'women',
    category: 'top-wear',
    style: 'casual',
    description: 'A soft sweater with a clean neckline and easy winter layering fit.',
    colors: [
      createColor('offwhite', 'Off White', '#ece6db'),
      createColor('camel', 'Camel', '#b08c61'),
      createColor('grey', 'Grey', '#8f8f93'),
    ],
  }),
  createProduct({
    id: 'women-sweatshirt',
    name: 'Sweatshirt',
    price: '₹580',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts0.jpg',
    audience: 'women',
    category: 'top-wear',
    style: 'casual',
    description: 'Casual premium sweatshirt made for off-duty comfort and styling.',
    colors: [
      createColor('cream', 'Cream', '#d9d0bc'),
      createColor('pink', 'Pink', '#c9899f'),
      createColor('black', 'Black', '#181818'),
    ],
  }),
];

const createBulkProducts = ({
  idPrefix,
  namePrefix,
  price,
  audience,
  category,
  style,
  imagePaths,
  colorHex,
}) =>
  imagePaths.map((img, index) =>
    createProduct({
      id: `${idPrefix}-${String(index + 1).padStart(2, '0')}`,
      name: `${namePrefix} ${index + 1}`,
      price,
      img,
      audience,
      category,
      style,
      description: `${namePrefix} drop ${index + 1} from the latest curated edit.`,
      colors: [
        createColor(`${idPrefix}-default-${index + 1}`, 'Default', colorHex, [img]),
      ],
    }),
  );

const menBulkImagePaths = [
  '/PIC/MEN/CASUALS/Hoodies/hoodies_1.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_2.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_3.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_4.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_5.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_6.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_7.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_8.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_9.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_10.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_11.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_12.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_13.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_14.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_15.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_16.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_17.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_18.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_19.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_20.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_21.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_22.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_23.jpg',
  '/PIC/MEN/CASUALS/Hoodies/hoodies_24.jpg',
];

const womenBulkImagePaths = [
  '/PIC/WOMEN/T-Shirt/women_tshirts1.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts2.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts3.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts4.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts5.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts6.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts7.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts8.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts9.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts10.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts11.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts12.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts13.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts14.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts15.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts16.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts17.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts18.jpg',
  '/PIC/WOMEN/T-Shirt/women_tshirts19.jpg',
];

const menBulkProducts = createBulkProducts({
  idPrefix: 'men-drop',
  namePrefix: 'Men Hoodie Drop',
  price: '₹1999',
  audience: 'men',
  category: 'outerwear',
  style: 'casual',
  imagePaths: menBulkImagePaths,
  colorHex: '#2a2a2a',
});

const womenBulkProducts = createBulkProducts({
  idPrefix: 'women-drop',
  namePrefix: 'Women Tee Drop',
  price: '₹1499',
  audience: 'women',
  category: 'top-wear',
  style: 'casual',
  imagePaths: womenBulkImagePaths,
  colorHex: '#4a4a4a',
});

const catalogProducts = [
  ...baseCatalogProducts,
  ...menBulkProducts,
  ...womenBulkProducts,
];

const promoProducts = [
  createProduct({
    id: 'arrival-hoodie',
    name: 'Oversized Hoodie',
    price: '₹1,299',
    img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80',
    audience: 'men',
    category: 'outerwear',
    style: 'casual',
    sections: ['new-arrivals'],
    description: 'A fresh oversized hoodie drop with bold comfort and layered styling.',
    colors: [
      createColor('cream', 'Cream', '#d7d1c5'),
      createColor('black', 'Black', '#141414'),
      createColor('orange', 'Burnt Orange', '#b36637'),
    ],
  }),
  createProduct({
    id: 'arrival-jacket',
    name: 'Street Style Jacket',
    price: '₹2,499',
    img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80',
    audience: 'men',
    category: 'outerwear',
    style: 'casual',
    sections: ['new-arrivals'],
    description: 'A statement jacket with sharp layering appeal and clean street styling.',
    colors: [
      createColor('blue', 'Blue', '#466c9b'),
      createColor('black', 'Black', '#171717'),
      createColor('tan', 'Tan', '#9a775c'),
    ],
  }),
  createProduct({
    id: 'arrival-denim',
    name: 'Classic Denim',
    price: '₹1,799',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    audience: 'women',
    category: 'bottom-wear',
    style: 'casual',
    sections: ['new-arrivals'],
    description: 'Classic denim cut updated with a cleaner wash and everyday fit.',
    colors: [
      createColor('indigo', 'Indigo', '#35598c'),
      createColor('black', 'Black Wash', '#23252d'),
      createColor('lightblue', 'Light Blue', '#9ab6d9'),
    ],
  }),
];

const allProducts = [...catalogProducts, ...promoProducts];

const hasSection = (product, section) => product.sections?.includes(section);

export const filterProducts = ({ audience, category, style, section } = {}) =>
  allProducts.filter((product) => {
    if (audience && product.audience !== audience) return false;
    if (category && product.category !== category) return false;
    if (style && product.style !== style) return false;
    if (section && !hasSection(product, section)) return false;
    return true;
  });

export { createColor, createProduct, allProducts };

export const menProducts = filterProducts({ audience: 'men' });
export const womenProducts = filterProducts({ audience: 'women' });
export const collectionProducts = filterProducts({ section: 'collections' });
export const newArrivalsProducts = filterProducts({ section: 'new-arrivals' });
export const defaultProduct = allProducts[0];
