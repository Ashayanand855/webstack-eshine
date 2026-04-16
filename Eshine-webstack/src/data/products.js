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
    style: 'casual',
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
      createColor('Chocolate-Brown', 'Chocolate-Brown', '#756354', [
        '/PIC/MEN/CASUALS/Sweaters/16.jpg',
      ]), 
      createColor('brown-cream', 'Brown-cream', '#97867B', [
        '/PIC/MEN/CASUALS/Sweaters/17.jpg',
      ]),
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
    name: 'Quater Zip Tshirt',
    price: '₹1900',
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
    id: 'men-shaket',
    name: 'Shaket',
    price: '₹1290',
    img: '/PIC/MEN/CASUALS/SHIRTS/13.jpg',
    audience: 'men',
    category: 'party',
    style: 'casual',
    description: 'Contemporary jacket styling with a sharper denim silhouette.',
    colors: [
      createColor('beige', 'Beige', '#cbbba1'),
      createColor('maroon', 'Maroon', '#6b2638'),
      createColor('green', 'Bottle Green', '#1f4538'),
    ],
  }),
  createProduct({
    id: 'men-hoodie-oversized',
    name: 'Oversized Hoddie',
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
    name: 'Three Piece Suit',
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
    id: 'men-Hoodie-Racer',
    name: 'Printed Racers Hoodie ',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_1.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'streetwear',
    description: 'Men Printed Racers Hoodie from the latest curated edit.',
    colors: [
      createColor('black', 'Black', '#151515'),
    ],
  }),
  createProduct({
    id: 'men-sweatshirt-newyork-cream',
    name: 'New York Graphic Sweatshirt',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_2.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'casual',
    description: 'Cream crewneck sweatshirt featuring a vintage New York city graphic print.',
    colors: [
      createColor('cream', 'Cream', '#F3E7D1')
    ],
  }),
  createProduct({
    id: 'men-hoodie-striped-sleeve-black',
    name: 'Striped Sleeve Athletic Hoodie',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_3.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'streetwear',
    description: 'Black pullover hoodie detailed with contrast side stripes on the sleeves.',
    colors: [createColor('men-drop-default-3', 'Default', '#2a2a2a')],
  }),
  createProduct({
    id: 'men-polosweat-snitchclub-cream',
    name: 'Snitch Club Polo Sweatshirt',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_4.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'casual',
    description: 'Relaxed polo-neck sweatshirt with contrast collar and Snitch Club typography.',
    colors: [
      createColor('cream', 'Cream', '#E4D9C3')
    ],
  }),
  createProduct({
    id: 'men-ziphoodie-staydown-black',
    name: 'Stay Down Zip-Up Hoodie',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_5.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'Streetwear',
    description: 'Black front-zip hoodie featuring bold red STAY DOWN typography.',
    colors: [
      createColor('Black', 'Black', '#1B1B1B'),
    ],
  }),
  createProduct({
    id: 'men-sweatshirt-lifehappens-offwhite',
    name: 'Life Happens Graphic Sweatshirt',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_6.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'casual',
    description: 'Off-white sweatshirt featuring a quirky Life Happens coffee cup graphic.',
    colors: [
      createColor('Cream', 'Cream', '#F9F5E4')
    ],
  }),
  createProduct({
    id: 'men-sleeveless-hoodie-raw-black',
    name: 'Raw Intensity Sleeveless Hoodie',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_7.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'streetwear',
    description: 'Washed black sleeveless drop-shoulder hoodie with bold red RAW typography.',
    colors: [
      createColor('Black', 'Black', '#2a2a2a')
    ],
  }),
  createProduct({
    id: 'men-sweatshirt-fastfood-maroon',
    name: 'Fast Food Graphic Sweatshirt',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_8.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'casual',
    description: 'Deep maroon sweatshirt featuring a minimal burger and fries graphic.',
    colors: [createColor('maroon', 'maroon', '#32111A')],
  }),
  createProduct({
    id: 'men-hoodie-drive9-black',
    name: 'Drive 9 Racing Hoodie',
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Hoodies/hoodies_9.jpg',
    audience: 'men',
    category: 'outerwear',
    style: 'streetwear',
    description: 'Black pullover hoodie with motorsport-inspired Drive 9 typography.',
    colors: [createColor('black', 'Black', '#2a2a2a')],
  }),
createProduct({
    id: 'Men-Sweaters',
    name: 'Mens designer coloured sweaters' ,
    price: '₹1999',
    img: '/PIC/MEN/CASUALS/Sweaters/sweaters_3.jpg',
    audience: 'men',
    category: 'outerwear  ',
    style: 'casual',
    description: 'Black pullover hoodie with motorsport-inspired Drive 9 typography.',
    colors: [
      createColor('Ultramarine-Blue', 'Ultramarine-Blue', '#1A2029',[
        '/PIC/MEN/CASUALS/Sweaters/sweaters_3.jpg',
      ]),
      createColor('Olive-Green', 'Olive-Green', '#303925',[
        '/PIC/MEN/CASUALS/Sweaters/sweaters_4.jpg',
      ]),
      createColor('Mud-Brown', 'Mud-brown', '#4E1C06',[
        '/PIC/MEN/CASUALS/Sweaters/sweaters_5.jpg',
      ]),
      createColor('Milk-white', 'White', '#F5F6EF',[
        '/PIC/MEN/CASUALS/Sweaters/sweaters_6.jpg',
      ]),

    ],
  }),
  createProduct({
    id: 'men-joggers-navy-classic',
    name: 'Classic Navy Fleece Joggers',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JOGGERS/joggers_37.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'loungewear',
    description: 'Comfortable navy blue fleece joggers with a relaxed straight fit.',
    tags: ['joggers', 'lounge', 'navy', 'fleece', 'everyday'],
    colors: [
      createColor('Ultramarine-Blue', 'Ultramarine-Blue', '#171532',[
        '/PIC/MEN/CASUALS/JOGGERS/joggers_36.jpg',
      ]),
      createColor('sky-blue', 'Sky-blue', '#679CC0',[
        '/PIC/MEN/CASUALS/JOGGERS/joggers_38.jpg',
      ]),
      createColor('Mud-Brown', 'Mud-brown', '#74A0AC',[
        '/PIC/MEN/CASUALS/JOGGERS/joggers_41.jpg',
      ]),
      createColor('lemon-yellow', 'lemon-yellow', '#EFE6C2',[
        '/PIC/MEN/CASUALS/JOGGERS/joggers_44.jpg',
      ]),
    ],
  }),
  createProduct({
    id: 'men-joggers-white-piping',
    name: 'White Contrast Piping Joggers',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JOGGERS/joggers_29.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual,streetwear',
    description: 'White wide-leg relaxed joggers with thin black contrast side piping and minimal branding.',
    tags: ['joggers', 'white', 'wide-leg', 'piping', 'streetwear'],
    colors: [
      createColor('White', 'White', '#D7DEEB',[
        '/PIC/MEN/CASUALS/JOGGERS/joggers_29.jpg',
      ]),
      createColor('', 'Black', '#2A3441',[
        '/PIC/MEN/CASUALS/JOGGERS/joggers_50.jpg',
      ]),
    ],
  }),
   createProduct({
    id: 'men-joggers-black-graphic',
    name: 'Black Multi-Graphic Sweatpants',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JOGGERS/joggers_60.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual,streetwear',
    description: 'Black relaxed sweatpants featuring multiple vintage-style white graphic prints down the leg.',
    tags: ['sweatpants', 'black', 'graphic', 'streetwear', 'casual'],
    colors: [
      createColor('White', 'White', '#D7DEEB',[
        '/PIC/MEN/CASUALS/JOGGERS/joggers_60.jpg',
      ]),
    ],
  }),
  createProduct({
    id: 'men-pants-grey-abstract',
    name: 'Grey Abstract Print Wide Pants',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JOGGERS/joggers_74.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual,streetwear',
    description: 'Relaxed wide-leg pants in a grey abstract textured or acid-wash print.',
    tags: ['pants', 'grey', 'abstract', 'wide-leg', 'streetwear', 'printed'],    colors: [
      createColor('default', 'Default', '#5D666E')
    ],
  }),
  createProduct({
    id: 'men-jeans-olive-straight',
    name: 'Olive Green Straight Fit Jeans',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JEANS/jean_2.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual',
    description: 'Classic straight-fit denim jeans in a versatile olive green wash.',
    tags: ['jeans', 'olive', 'straight-fit', 'denim', 'casual'],
    colors: [createColor('default', 'Default', '#2a2a2a')],
  }),
  createProduct({
   id: 'men-jeans-blue-relaxed',
    name: 'Classic Blue Relaxed Jeans',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JEANS/jean_22.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual',
    description: 'Everyday classic blue denim jeans tailored in a comfortable relaxed fit.',
    tags: ['jeans', 'blue', 'relaxed-fit', 'denim', 'essentials'],
    colors: [createColor('default', 'Default', '#2a2a2a')],
  }),
  createProduct({
    id: 'men-jeans-grey-slim',
    name: 'Grey Slim Fit Jeans',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JEANS/jean_36.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual',
    description: 'Modern slim-fit jeans in a clean grey wash, perfect for smart-casual styling.',
    tags: ['jeans', 'grey', 'slim-fit', 'denim', 'essentials'],
    colors: [createColor('default', 'Default', '#2a2a2a')],
  }),
  createProduct({
    id: 'men-trackpants-navy-colorblock',
    name: 'Navy Colorblock Wide Track Pants',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JOGGERS/joggers_92.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual',
    description: 'Navy wide-leg track pants with bold red and white geometric side panels.',
    tags: ['trackpants', 'navy', 'colorblock', 'wide-leg', 'streetwear', 'athletic'],
    colors: [createColor('default', 'Default', '#2a2a2a')],
  }),
  createProduct({
    id: 'men-joggers-black-everyday',
    name: 'Everyday Black Cuffed Joggers',
    price: '₹1490',
    img: '/PIC/MEN/CASUALS/JOGGERS/joggers_86.jpg',
    audience: 'men',
    category: 'bottom-wear',
    style: 'casual',
    description: 'Essential black joggers featuring an elastic waistband and ankle cuffs for a secure fit.',
    tags: ['joggers', 'black', 'cuffed', 'loungewear', 'essentials', 'everyday'],
    colors: [createColor('default', 'Default', '#2a2a2a')],
  }),
  createProduct({
    id: 'men-sneakers-black-velcro',
    name: 'Black Leather Velcro Sneakers',
    price: '₹2290',
    img: '/PIC/MEN/CASUALS/SHOES/shoes_32.jpg',
    audience: 'men',
    category: 'footwear',
    style: 'casual',
    description: 'Sleek black leather low-top sneakers featuring a triple-velcro strap closure.',
    tags: ['sneakers', 'black', 'leather', 'velcro', 'footwear'],
    colors: [createColor('default', 'Default', '#dddddd')],
  }),
  createProduct({
    id: 'men-loafers-black-suede',
    name: 'Black Suede Slip-On Loafers',
    price: '₹2290',
    img: '/PIC/MEN/CASUALS/SHOES/shoes_26.jpg',
    audience: 'men',
    category: 'footwear',
    style: 'casual,smart-casual',
   description: 'Modern slip-on loafers in black suede, finished with a contrasting white rubber sole.',
    tags: ['loafers', 'black', 'suede', 'slip-on', 'smart-casual'],
    colors: [createColor('default', 'Default', '#dddddd')],
  }),
  createProduct({
    id: 'men-loafers-olive-suede',
    name: 'Olive Suede Slip-On Loafers',
    price: '₹2290',
    img: '/PIC/MEN/CASUALS/SHOES/shoes_8.jpg',
    audience: 'men',
    category: 'footwear',
    style: 'casual',
   description: 'Earthy olive green suede loafers designed with a comfortable white sole.',
    tags: ['loafers', 'olive', 'suede', 'slip-on', 'smart-casual'],
    colors: [createColor('default', 'Default', '#dddddd')],
  }),
  createProduct({
   id: 'men-sneakers-retro-panel',
    name: 'Retro Panelled Running Sneakers',
    price: '₹2290',
    img: '/PIC/MEN/CASUALS/SHOES/shoes_9.jpg',
    audience: 'men',
    category: 'footwear',
    style: 'casual,streetwear',
    description: 'Vintage-inspired sneakers mixing off-white and dark navy suede panels for a retro look.',
    tags: ['sneakers', 'retro', 'panelled', 'suede', 'streetwear', 'off-white'],
    colors: [createColor('default', 'Default', '#dddddd')],
  }),
  createProduct({
    id: 'men-sneakers-brown-leather',
    name: 'Brown Leather Lace-Up Sneakers',
    price: '₹2290',
    img: '/PIC/MEN/CASUALS/SHOES/shoes_27.jpg',
    audience: 'men',
    category: 'footwear',
    style: 'casual',
   description: 'Premium brown leather sneakers with tonal laces and a classic textured gum sole.',
    tags: ['sneakers', 'brown', 'leather', 'lace-up', 'casual'],
    colors: [createColor('default', 'Default', '#dddddd')],
  }),
  createProduct({
   id: 'men-sneakers-navy-minimal',
    name: 'Minimalist Navy Leather Sneakers',
    price: '₹2290',
    img: '/PIC/MEN/CASUALS/SHOES/shoes_33.jpg',
    audience: 'men',
    category: 'footwear',
    style: 'casual',
    description: 'Clean and minimalist navy blue leather sneakers with a streamlined low-top profile.',
    tags: ['sneakers', 'navy', 'leather', 'minimalist', 'smart-casual'],
    colors: [createColor('default', 'Default', '#dddddd')],
  }),












  createProduct({
   id: 'women-ethnic-anarkali-yellow',
    name: 'Yellow Bandhani Anarkali Set',
    price: '₹1290',
    img: '/PIC/WOMEN/wedding/women_wedding_collection0.jpg',
   audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'Vibrant yellow bandhani print Anarkali skirt paired with a white sleeveless blouse.',
    tags: ['ethnic', 'anarkali', 'yellow', 'festive', 'traditional'],
    colors: [createColor('anarkali-yellow', 'Mustard Yellow', '#FFDB58')],
  }),

  createProduct({
   id: 'women-ethnic-kurta-bluefloral',
    name: 'Blue Floral Printed Kurta Set',
    price: '₹890',
    img: '/PIC/WOMEN/Kurta Set/Screenshot 2026-03-22 at 09.49.18.png',
    audience: 'women',
    category: 'ethnic',
    style: 'casual',
    description: 'Comfortable white cotton kurta set featuring a block-print style blue floral pattern and matching dupatta.',
    tags: ['ethnic', 'kurta', 'suit', 'floral', 'blue', 'cotton'],
    colors: [createColor('kurta-blue-floral', 'Blue/White', '#4682B4')],
  }),

  createProduct({
   id: 'women-dress-floral-aline',
    name: 'Blue Floral A-Line Dress',
    price: '₹580',
    img: '/PIC/WOMEN/Dress/Screenshot 2026-03-22 at 09.31.20.png',
    audience: 'women',
    category: 'dresses',
    style: 'casual',
    description: 'Breezy white A-line midi dress adorned with delicate blue floral motifs.',
    tags: ['dress', 'floral', 'summer', 'a-line', 'casual'],
    colors: [createColor('dress-white-blue', 'White/Blue', '#FFFFFF')],
  }),

  createProduct({
   id: 'women-top-formal-wrap-striped',
    name: 'Striped Wrap Peplum Top',
    price: '₹420',
    img: '/PIC/WOMEN/Shirt/Screenshot 2026-03-22 at 10.03.45.png',
   audience: 'women',
    category: 'topwear',
    style: 'formal',
    description: 'Chic blue and white striped sleeveless formal top with a flattering wrap-front peplum silhouette.',
    tags: ['top', 'formal', 'striped', 'wrap', 'sleeveless', 'office'],
    colors: [createColor('top-striped-blue', 'Blue/White', '#89CFF0')]
  }),

  createProduct({
    id: 'women-ethnic-saree-silk-yellow',
    name: 'Woven Silk Saree Lehenga',
    price: '₹1290',
    img: '/PIC/WOMEN/wedding/women_wedding_collection1.jpg',
   audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'Luxurious yellow and pink woven silk saree draped elegantly for festive occasions.',
    tags: ['ethnic', 'saree', 'lehenga', 'silk', 'festive', 'wedding'],
    colors: [createColor('saree-yellow-pink', 'Yellow/Pink', '#FFD700')], 
  }),

  createProduct({
  id: 'women-ethnic-sharara-velvet',
    name: 'Maroon Velvet Sharara Set',
    price: '₹890',
    img: '/PIC/WOMEN/wedding/women_wedding_collection2.jpg',
    audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'Rich maroon velvet sharara suit featuring intricate gold embroidery on the neckline.',
    tags: ['ethnic', 'sharara', 'velvet', 'maroon', 'embroidered', 'festive'],
    colors: [createColor('sharara-maroon', 'Maroon', '#800000')]
  }),

  createProduct({
   id: 'women-ethnic-saree-green',
    name: 'Green Embroidered Border Saree',
    price: '₹420',
    img: '/PIC/WOMEN/wedding/women_wedding_collection51.jpg',
   audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'Elegant emerald green saree featuring a contrasting purple embroidered border.',
    tags: ['ethnic', 'saree', 'green', 'embroidered', 'festive'],
    colors: [createColor('saree-green', 'Emerald Green', '#009000')]}),
    
  createProduct({
   id: 'women-top-pinstripe-navy',
    name: 'Navy Pinstripe Peplum Shirt',
    price: '₹580',
    img: '/PIC/WOMEN/formal/9553cca573c5629b995ee41e3994d1d3.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'formal',
    description: 'Structured navy blue pinstripe short-sleeve shirt with a tailored peplum waist.',
    tags: ['shirt', 'formal', 'navy', 'pinstripe', 'peplum', 'workwear'],
    colors: [createColor('shirt-navy-pinstripe', 'Navy Blue', '#000080')]}),

  createProduct({
   id: 'women-top-ruched-brown',
    name: 'Brown Ruched Asymmetric Top',
    price: '₹1290',
    img: '/PIC/WOMEN/casual/0808f9da5e7e9154cb03b6f26fd3bae1.jpg',
    audience: 'women',
    category: 'topwear',
    style: 'partywear',
    description: 'Edgy brown sheer ruched top featuring an asymmetric off-the-shoulder neckline.',
    tags: ['top', 'ruched', 'asymmetric', 'brown', 'partywear', 'sheer'],
    colors: [createColor('top-ruched-brown', 'Chocolate Brown', '#4A3018')]
  }),
  createProduct({
    id: 'women-tee-graphic-tomjerry',
    name: 'Tom & Jerry Oversized Graphic Tee',
    price: '₹890',
    img: '/PIC/WOMEN/T-Shirt/Screenshot 2026-03-22 at 09.43.30.png',
   audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Lilac oversized t-shirt featuring a fun retro Tom & Jerry "Certified Troublemakers" graphic.',
    tags: ['t-shirt', 'graphic', 'lilac', 'oversized', 'cartoon', 'casual'],
    colors: [createColor('tee-lilac', 'Lilac', '#C8A2C8')]
  }),
  createProduct({
  id: 'women-dress-floral-tiered',
    name: 'Blue Floral Tiered Midi Dress',
    price: '₹420',
    img: '/PIC/WOMEN/Dress/Screenshot 2026-03-22 at 09.36.31.png',
   audience: 'women',
    category: 'dresses',
    style: 'casual',
    description: 'Flowy blue and white floral midi dress with a comfortable tiered skirt design.',
    tags: ['dress', 'floral', 'tiered', 'midi', 'summer', 'casual'],
    colors: [createColor('dress-floral-blue', 'Blue/White', '#4682B4')]
  }),

  createProduct({
   id: 'women-polo-black-classic',
    name: 'Classic Black Polo T-Shirt',
    price: '₹580',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts0.jpg',
    audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Timeless black short-sleeve polo shirt with a subtle embroidered chest logo.',
    tags: ['polo', 't-shirt', 'black', 'casual', 'classic'],
    colors: [createColor('polo-black', 'Black', '#1a1a1a')]
  }),
  createProduct({
    id: 'women-ethnic-gown-purple',
    name: 'Purple Embroidered Anarkali Gown',
    price: '₹1499',
    img: '/PIC/WOMEN/Kurta Set/Screenshot 2026-03-22 at 09.50.01.png',
    audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'Deep purple floor-length Anarkali gown with delicate silver embroidery and matching dupatta.',
    tags: ['ethnic', 'gown', 'anarkali', 'purple', 'embroidered', 'festive'],
    colors: [createColor('gown-purple', 'Deep Purple', '#4B0082')]
  }),
  createProduct({
   id: 'women-top-corset-floral-blue',
    name: 'Blue Floral Corset Top',
    price: '₹1499',
    img: '/PIC/WOMEN/Crop Wear/women_cropwear68.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'partywear',
    description: 'Trendy denim-blue floral printed corset top with structured boning.',
    tags: ['top', 'corset', 'floral', 'blue', 'partywear'],
    colors: [createColor('top-corset-blue', 'Denim Blue', '#1560BD')]
  }),

  createProduct({
   id: 'women-ethnic-kurta-purple-print',
    name: 'Purple Printed Straight Kurta',
    price: '₹1499',
    img: '/PIC/WOMEN/kurti/women_kurti40.jpg',
   audience: 'women',
    category: 'ethnic',
    style: 'casual',
    description: 'Casual magenta-purple straight kurta featuring intricate white ethnic motifs.',
    tags: ['ethnic', 'kurta', 'purple', 'printed', 'casual'],
    colors: [createColor('kurta-purple', 'Magenta Purple', '#8B008B')]
  }),
  createProduct({
   id: 'women-tee-athletic-navy-eagle',
    name: 'Navy Athletic Graphic Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts4.jpg',
  audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Navy blue casual t-shirt with large collegiate-style athletic typography.',
    tags: ['t-shirt', 'graphic', 'navy', 'athletic', 'casual'],
    colors: [createColor('tee-navy', 'Navy Blue', '#000080')]
  }),
  createProduct({
   id: 'women-polo-white-essential',
    name: 'Essential White Polo T-Shirt',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts5.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'basics',
    description: 'Crisp white fitted polo shirt, a versatile wardrobe staple for everyday wear.',
    tags: ['polo', 't-shirt', 'white', 'basics', 'casual', 'essential'],
    colors: [createColor('polo-white', 'White', '#FFFFFF')]
  }),
  createProduct({
   id: 'women-tee-striped-ribbed-redcream',
    name: 'Red & Cream Striped Ribbed Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts6.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Fitted ribbed knit t-shirt featuring bold red and cream horizontal stripes.',
    tags: ['t-shirt', 'striped', 'red', 'ribbed', 'fitted', 'casual'],
    colors: [createColor('tee-striped-red', 'Red/Cream', '#B22222')]
  }),

  createProduct({
   id: 'women-ethnic-peplum-sharara-blue',
    name: 'Blue Printed Peplum Sharara Set',
    price: '₹1499',
    img: '/PIC/WOMEN/kurti/b816fbeef9dee282683df17e2577962f.jpg',
    audience: 'women',
    category: 'ethnic',
    style: 'festive',
    description: 'Stunning royal blue peplum kurti and sharara set with intricate silver foil prints.',
    tags: ['ethnic', 'sharara', 'peplum', 'blue', 'printed', 'festive'],
    colors: [createColor('sharara-blue', 'Royal Blue', '#4169E1')]
  }),
  createProduct({
 id: 'women-tee-striped-navy-essential',
    name: 'Navy & White Striped Essential Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts8.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Classic crewneck t-shirt in a timeless navy blue and white horizontal stripe pattern.',
    tags: ['t-shirt', 'striped', 'navy', 'nautical', 'casual', 'essential'],
    colors: [createColor('tee-striped-navy', 'Navy/White', '#000080')]
  }),
  createProduct({
   id: 'women-tee-lounge-black-essential',
    name: 'Black Essential Lounge Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts9.jpg',
    audience: 'women',
    category: 'topwear',
    style: 'loungewear',
    description: 'Ultra-soft solid black crewneck t-shirt, perfect for lounging or casual styling.',
    tags: ['t-shirt', 'black', 'basics', 'loungewear', 'casual'],
    colors: [createColor('tee-black', 'Black', '#1a1a1a')]
  }),
  createProduct({
  id: 'women-top-asymmetric-sheer-floral',
    name: 'Sheer Floral Asymmetric Top',
    price: '₹1499',
    img: '/PIC/WOMEN/Crop Wear/women_cropwear52.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'partywear',
    description: 'Maroon sheer long-sleeve top featuring an asymmetric neckline and faded floral prints.',
    tags: ['top', 'sheer', 'floral', 'asymmetric', 'maroon', 'partywear'],
    colors: [createColor('top-maroon-floral', 'Maroon/Floral', '#800000')]
  }),
  createProduct({
   id: 'women-tee-graphic-mountains-cream',
    name: 'Mountains Oversized Graphic Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/casual/a16e7a94d5ec7e8dc80ed683db5d377f.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'streetwear',
    description: 'Cream oversized t-shirt featuring a vintage-style blue mountains and nature graphic.',
    tags: ['t-shirt', 'graphic', 'cream', 'oversized', 'streetwear', 'casual'],
    colors: [createColor('tee-cream', 'Cream', '#FFFDD0')]
  }),

  createProduct({
    id: 'women-drop-12',
    name: 'Women Tee Drop 12',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts12.jpg',
    audience: 'women',
    category: 'top-wear',
    style: 'casual',
    description: 'Women Tee Drop 12 from the latest curated edit.',
    colors: [createColor('women-drop-default-12', 'Default', '#4a4a4a')],
  }),
  createProduct({
   id: 'women-tee-ringer-striped-pink',
    name: 'Pink Striped Ringer Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts13.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Playful pink and white thin-striped ringer tee with a contrast solid pink neckline.',
    tags: ['t-shirt', 'ringer', 'striped', 'pink', 'retro', 'casual'],
    colors: [createColor('tee-ringer-pink', 'Pink/White', '#FFC0CB')]
  }),
  createProduct({
   id: 'women-tee-graphic-paris',
    name: 'Blue Paris Graphic Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts14.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Relaxed cornflower blue t-shirt with large distressed Paris Athletic typography.',
    tags: ['t-shirt', 'graphic', 'blue', 'athletic', 'casual', 'printed'],
    colors: [createColor('tee-paris-blue', 'Cornflower Blue', '#6495ED')]
  }),

  createProduct({
    id: 'women-top-smocked-red',
    name: 'Red Smocked Textured Top',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts26.jpg',
    audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Unique short-sleeve top featuring an all-over stretchy smocked/textured red and white pattern.',
    tags: ['top', 'smocked', 'textured', 'red', 'fitted', 'casual'],
    colors: [createColor('top-smocked-red', 'Red/White', '#CD5C5C')]
  }),
  createProduct({
   id: 'women-tee-longsleeve-graphic-peach',
    name: 'Peach Long Sleeve Graphic Top',
    price: '₹1499',
    img: '/PIC/WOMEN/kurti/women_kurti47.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Fitted peach long-sleeve top featuring a white vintage varsity-style graphic.',
    tags: ['top', 'long-sleeve', 'graphic', 'peach', 'casual'],
    colors: [createColor('top-peach', 'Peach', '#FFCBA4')]
  }),
  createProduct({
    id: 'women-tunic-floral-maroon',
    name: 'Maroon Floral Printed Tunic',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts17.jpg',
    audience: 'women',
    category: 'ethnic',
    style: 'casual',
    description: 'Comfortable maroon tunic top/kurti detailed with delicate white and red floral patterns.',
    tags: ['tunic', 'kurti', 'floral', 'maroon', 'ethnic-casual'],
    colors: [createColor('tunic-maroon', 'Maroon', '#800000')]
  }),
  createProduct({
   id: 'women-tee-essential-olive',
    name: 'Olive Brown Essential Tee',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts18.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'basics',
    description: 'A perfect everyday short-sleeve t-shirt in a versatile muted olive-brown tone.',
    tags: ['t-shirt', 'basics', 'olive', 'brown', 'essential', 'casual'],
    colors: [createColor('tee-olive-brown', 'Olive Brown', '#6B8E23')]
  }),
  createProduct({
  id: 'women-polo-classic-white',
    name: 'Classic White Polo T-Shirt',
    price: '₹1499',
    img: '/PIC/WOMEN/T-Shirt/women_tshirts19.jpg',
   audience: 'women',
    category: 'topwear',
    style: 'casual',
    description: 'Classic fit white short-sleeve polo shirt for a clean, preppy look.',
    tags: ['polo', 't-shirt', 'white', 'casual', 'classic'],
    colors: [createColor('polo-white', 'White', '#FFFFFF')]
  }),
];

const catalogProducts = [...baseCatalogProducts];

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
