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

const catalogProducts = [
  createProduct({
    id: 'men-shirt',
    name: 'Shirt',
    price: '₹899',
    img: 'PIC/Male/Top Wear/Shirt/Ultramarine Shirt.png',
    audience: 'men',
    category: 'top-wear',
    style: 'casual',
    description: 'A clean everyday shirt with a tailored structure and lightweight fabric.',
    colors: [
      createColor('ultramarine', 'Ultramarine', '#1d223c', [
        'PIC/Male/Top Wear/Shirt/Ultramarine Shirt.png',
      ]),
      createColor('grey', 'Grey', '#d9dade', [
        'PIC/male/Top Wear/Shirt/Grey Shirt.png',
      ]),
      createColor('maroon', 'Maroon', '#6b2638', [
        'PIC/Male/Top Wear/Shirt/Maroon Shirt.png',
      ]),
    ],
  }),
  createProduct({
    id: 'men-sweater',
    name: 'Sweater',
    price: '₹2000',
    img: 'PIC/Male/Top Wear/Sweaters/ChatGPT Image Mar 21, 2026, 08_13_48 PM.png',
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
    img: 'PIC/Male/Top Wear/Sweatshirt/ChatGPT Image Mar 21, 2026, 06_26_57 PM.png',
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
    img: 'PIC/Male/Top Wear/T-Shirt/Screenshot 2026-03-21 at 18.10.02.png',
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
    img: 'PIC/Male/Top Wear/Kurta/Gemini_Generated_Image_1nu09n1nu09n1nu0.png',
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
    img: 'PIC/Male/Top Wear/Hoodie/ChatGPT Image Mar 21, 2026, 08_19_28 PM.png',
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
    img: 'PIC/Male/Top Wear/Coat Pant/Gemini_Generated_Image_9n92j09n92j09n92.png',
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
    img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSuKcK397XoyflQDPhpBILprk1pqbhA_vosElQ7EJuZEe-hx5ItrD1_2m9oRf8Kt4e_bLuJ_NfkdZ2E7x0y8WjM9phqT_vi0NBqfyhq-JZFjLLtm8oTkQ5aCw&usqp=CAc',
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
    img: 'https://kohsh.in/cdn/shop/files/DSC01142_533x.jpg?v=1742624895',
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
    img: 'https://m.media-amazon.com/images/I/71KaZLBf6JL._AC_UY1000_.jpg',
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
    img: 'https://i.pinimg.com/236x/6c/21/1c/6c211c54df3e529075fdb25e761dcb33.jpg',
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
    img: 'https://clothsvilla.com/cdn/shop/products/NavratriWearHeavyBollywoodLehengaIndianPartyIndianTraditionalLehengaDesignerLenghaCholiWedding_1_1024x1024.jpg?v=1660652580',
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
    img: 'https://cdn.shopify.com/s/files/1/0049/3649/9315/files/SSRM0043402_RANI_PINK_7_large.jpg?v=1741863899',
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
    img: 'https://www.powersutra.co/cdn/shop/files/PS159_1.jpg?v=1762769354&width=2048',
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
    img: 'https://www.theambitioncollective.in/cdn/shop/products/Untitled-Session0500-copy.jpg?v=1664273096',
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
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNKPvDZvmVHNIx1JSCFsjGsIsDVoZ89MD8CA&s',
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
    img: 'https://assets.ajio.com/medias/sys_master/root/20240830/BZdh/66d1595a6f60443f31408e8f/-473Wx593H-443040658-wine-MODEL.jpg',
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
    img: 'https://images-magento.shoppersstop.com/pub/media/catalog/product/A23346SW217/A23346SW217_OFF_WHITE/A23346SW217_OFF_WHITE_alt2.jpg_2000Wx3000H',
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
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6bS-_QG6gdr5GV00TbtSoSjaQ11ny-4q0iw&s',
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
