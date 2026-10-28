export interface Cook {
  id: string;
  name: string;
  avatar: string;
  neighborhood: string;
  city: string;
  bio: string;
  rating: number;
  reviewCount: number;
  yearsCooking: number;
  specialty: string;
  certifiedKitchen: boolean;
  permitNumber: string;
}

export interface MealOption {
  name: string;
  choices: { label: string; extraPrice: number }[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Meal {
  id: string;
  title: string;
  tagline: string;
  cook: Cook;
  cuisine: 'Italian' | 'Indian' | 'Mexican' | 'Japanese' | 'Levantine' | 'Southern' | 'Plant-Based';
  category: 'Comfort Classics' | 'Regional Asian' | 'Mediterranean' | 'Latin Heritage' | 'Plant-Based / Vegan';
  price: number;
  originalPrice?: number;
  image: string;
  fallbackGradient: string;
  portionsLeft: number;
  totalBatch: number;
  deliverySlot: string;
  availableDates: string[];
  dietary: string[];
  spiceLevel: number; // 0 to 3
  prepStyle: 'Delivered Piping Hot' | 'Chilled with Reheat Instructions';
  description: string;
  story: string;
  ingredients: string[];
  allergens: string[];
  reheatingNotes: string;
  options: MealOption[];
  reviews: Review[];
  featured?: boolean;
}

export interface CartItem {
  meal: Meal;
  quantity: number;
  selectedOptions: Record<string, string>;
  reheatPreference: 'hot' | 'chilled';
  specialNotes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  neighborhood: string;
  deliveryDate: string;
  deliverySlot: string;
  specialInstructions?: string;
  status: 'confirmed' | 'simmering' | 'packing' | 'in_transit' | 'delivered';
  createdAt: string;
}

export const NEIGHBORHOODS = [
  'All Neighborhoods',
  'Brooklyn Heights & Cobble Hill',
  'Crown Heights & Prospect',
  'Greenpoint & Williamsburg',
  'East Village & Lower East Side',
  'Astoria & Sunnyside',
  'Park Slope & Gowanus'
];

export const CUISINE_TABS = [
  'All Kitchens',
  'Comfort Classics',
  'Regional Asian',
  'Latin Heritage',
  'Mediterranean',
  'Plant-Based / Vegan'
];

export const COOK_MARIA: Cook = {
  id: 'cook-maria',
  name: 'Nonna Maria & Marco',
  avatar: '/src/assets/images/cook_portrait_maria_1793166692723.jpg',
  neighborhood: 'Brooklyn Heights & Cobble Hill',
  city: 'Brooklyn, NY',
  bio: 'Born in Bologna, Maria has been rolling fresh sfoglia pasta by hand for 42 years. Her 12-hour ragù recipe was passed down by her grandmother and simmered in small Dutch ovens every morning.',
  rating: 4.96,
  reviewCount: 312,
  yearsCooking: 42,
  specialty: 'Northern Italian Slow-Cooked Ragu & Fresh Egg Pasta',
  certifiedKitchen: true,
  permitNumber: 'NYC-DOH-883921'
};

export const COOK_FARIDA: Cook = {
  id: 'cook-farida',
  name: 'Ammi Farida',
  avatar: '',
  neighborhood: 'Astoria & Sunnyside',
  city: 'Queens, NY',
  bio: 'Farida specializes in authentic royal Hyderabadi cooking. Every pot of biryani is sealed with whole wheat dough (dum pukht) to lock in the fragrant aroma of saffron, cardamom, and rose water.',
  rating: 4.98,
  reviewCount: 247,
  yearsCooking: 35,
  specialty: 'Hyderabadi Dum Pukht & Royal Mughlai Cuisine',
  certifiedKitchen: true,
  permitNumber: 'NYC-DOH-774019'
};

export const COOK_ELENA: Cook = {
  id: 'cook-elena',
  name: 'Elena Morales',
  avatar: '',
  neighborhood: 'Crown Heights & Prospect',
  city: 'Brooklyn, NY',
  bio: 'Originally from Villa de Zaachila, Oaxaca. Elena toasts chilhuacle and pasilla chiles on volcanic stone comales and grinds heirloom corn for fresh, pillowy tortillas just before delivery.',
  rating: 4.94,
  reviewCount: 189,
  yearsCooking: 28,
  specialty: 'Oaxacan Mole Negro & Heirloom Nixtamalized Tortillas',
  certifiedKitchen: true,
  permitNumber: 'NYC-DOH-902184'
};

export const COOK_KENJI: Cook = {
  id: 'cook-kenji',
  name: 'Kenji & Keiko Takahashi',
  avatar: '',
  neighborhood: 'East Village & Lower East Side',
  city: 'Manhattan, NY',
  bio: 'Kenji cooked in Kyoto ryokans before moving to New York. Together with Keiko, they prepare nourishing traditional Ichiju-Sansai (one soup, three dishes) home-style family dinners.',
  rating: 4.97,
  reviewCount: 164,
  yearsCooking: 24,
  specialty: 'Kyoto Homestyle Obanzai & Slow Dashi Simmers',
  certifiedKitchen: true,
  permitNumber: 'NYC-DOH-661204'
};

export const COOK_MONA: Cook = {
  id: 'cook-mona',
  name: 'Auntie Mona Haddad',
  avatar: '',
  neighborhood: 'Park Slope & Gowanus',
  city: 'Brooklyn, NY',
  bio: 'Mona cooks Levant heirloom favorites from Aleppo and Beirut. She rolls grape leaves with tender spiced lamb and pines for the rich comforting pomegranate molasses stews of her youth.',
  rating: 4.95,
  reviewCount: 215,
  yearsCooking: 31,
  specialty: 'Levantine Stuffed Vegetables & Spiced Braises',
  certifiedKitchen: true,
  permitNumber: 'NYC-DOH-541920'
};

export const INITIAL_MEALS: Meal[] = [
  {
    id: 'bolognese-lasagna',
    title: 'Nonna\'s 12-Hour Slow Braised Beef & Béchamel Lasagna',
    tagline: 'Hand-rolled spinach pasta sheets, rich beef & pork ragù, silky nutmeg béchamel.',
    cook: COOK_MARIA,
    cuisine: 'Italian',
    category: 'Comfort Classics',
    price: 21.50,
    originalPrice: 24.00,
    image: '/src/assets/images/dish_homestyle_lasagna_1793166691783.jpg',
    fallbackGradient: 'from-amber-700/80 to-stone-900',
    portionsLeft: 4,
    totalBatch: 18,
    deliverySlot: 'Tonight · 6:00 PM – 7:30 PM',
    availableDates: ['Tonight', 'Tomorrow Lunch', 'Tomorrow Dinner'],
    dietary: ['High Protein', 'Contains Dairy'],
    spiceLevel: 0,
    prepStyle: 'Delivered Piping Hot',
    description: 'This is not restaurant catering lasagna. Maria simmers prime beef brisket and Berkshire pork shoulder with San Marzano tomatoes, soffritto, and red wine over a low flame for 12 hours. Layered between five ultra-thin sheets of hand-rolled spinach egg pasta and velvety whole-milk béchamel, then baked until caramelized and bubbling.',
    story: 'Recipe preserved through four generations from Maria\'s nonna in Emilia-Romagna. Baked in single-family ceramic pans to lock in moisture.',
    ingredients: ['Braised beef brisket', 'Berkshire pork', 'San Marzano DOP tomatoes', 'Hand-rolled egg pasta', 'Whole milk béchamel', 'Aged Parmigiano-Reggiano (24 months)', 'Fresh basil', 'Nutmeg', 'Extra virgin olive oil'],
    allergens: ['Wheat (Gluten)', 'Dairy', 'Eggs'],
    reheatingNotes: 'Delivered piping hot ready to eat. If enjoying later, cover with foil and bake at 350°F (175°C) for 15 minutes until center reaches 165°F.',
    options: [
      {
        name: 'Portion Size',
        choices: [
          { label: 'Single Hearty Feast (1 lb)', extraPrice: 0 },
          { label: 'Generous Dinner for Two (2 lbs)', extraPrice: 16.00 }
        ]
      },
      {
        name: 'Complementary Side',
        choices: [
          { label: 'None', extraPrice: 0 },
          { label: 'Warm Garlic Rosemary Focaccia Slice', extraPrice: 3.50 },
          { label: 'Organic Baby Arugula Salad with Shaved Parmigiano', extraPrice: 4.50 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        user: 'Julianne R.',
        rating: 5,
        date: 'Yesterday',
        comment: 'Tasted exactly like my grandmother\'s in Florence. You can truly taste the 12 hours of braising—rich without being heavy. Arrived hot and comforting.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        user: 'Marcus Chen',
        rating: 5,
        date: '3 days ago',
        comment: 'My kids devoured this. The pasta layers are so tender compared to store-bought sheets. Maria is a neighborhood treasure!',
        verifiedPurchase: true
      }
    ],
    featured: true
  },
  {
    id: 'dum-biryani',
    title: 'Royal Hyderabadi Dum Mutton Biryani with Burani Raita',
    tagline: 'Tender marinated lamb chops, aged saffron basmati, sealed and slow-cooked in brass handi.',
    cook: COOK_FARIDA,
    cuisine: 'Indian',
    category: 'Regional Asian',
    price: 23.00,
    originalPrice: 26.00,
    image: '/src/assets/images/dish_dum_biryani_1793166692249.jpg',
    fallbackGradient: 'from-amber-600/80 to-amber-950',
    portionsLeft: 6,
    totalBatch: 20,
    deliverySlot: 'Tonight · 6:30 PM – 8:00 PM',
    availableDates: ['Tonight', 'Tomorrow Dinner'],
    dietary: ['Halal', 'Gluten-Friendly', 'Nut-Free'],
    spiceLevel: 2,
    prepStyle: 'Delivered Piping Hot',
    description: 'Farida marinates pasture-raised mutton overnight with raw papaya, Greek yogurt, mint, green chilies, and hand-ground shahi garam masala. Layered with 2-year aged sella basmati infused with Kashmiri saffron threads and ghee, then slow-steamed under a dough seal (kachhi gosht ki biryani).',
    story: 'Farida learned this royal recipe from the khansamas of Hyderabad during her childhood in Charminar. Each batch is made with uncompromised patience.',
    ingredients: ['Pasture-raised bone-in mutton', '2-year aged long-grain basmati', 'Kashmiri saffron', 'Desi ghee', 'Caramelized shallots (birista)', 'Fresh spearmint', 'Green cardamom', 'Star anise', 'Burani garlic raita'],
    allergens: ['Dairy (Ghee, Yogurt in raita)'],
    reheatingNotes: 'Delivered hot in an insulated thermal pack. Keep sealed until serving to retain saffron aromas.',
    options: [
      {
        name: 'Portion Size',
        choices: [
          { label: 'Standard Pot (Serves 1-2)', extraPrice: 0 },
          { label: 'Large Family Handi (Serves 3-4)', extraPrice: 22.00 }
        ]
      },
      {
        name: 'Accompaniment',
        choices: [
          { label: 'Burani Garlic Raita & Mirchi Ka Salan (Included)', extraPrice: 0 },
          { label: 'Add Double Salan Curry + Extra Raita', extraPrice: 3.50 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        user: 'Tariq K.',
        rating: 5,
        date: '2 days ago',
        comment: 'Authentic Hyderabadi biryani in NY is rare, but Farida\'s beats every restaurant in Queens. The meat pulls clean off the bone.',
        verifiedPurchase: true
      }
    ],
    featured: true
  },
  {
    id: 'oaxacan-mole-negro',
    title: 'Grandmother\'s 32-Ingredient Oaxacan Mole Negro Con Pollo',
    tagline: 'Pasture-raised braised chicken thigh in complex dark chocolate-chile mole, with heirloom tortillas.',
    cook: COOK_ELENA,
    cuisine: 'Mexican',
    category: 'Latin Heritage',
    price: 22.50,
    image: '/src/assets/images/dish_oaxacan_mole_1793166692722.jpg',
    fallbackGradient: 'from-amber-900/80 to-stone-900',
    portionsLeft: 7,
    totalBatch: 16,
    deliverySlot: 'Tonight · 6:00 PM – 7:30 PM',
    availableDates: ['Tonight', 'Tomorrow Lunch', 'Tomorrow Dinner'],
    dietary: ['Dairy-Free', 'Gluten-Friendly', 'Nut-Free'],
    spiceLevel: 1,
    prepStyle: 'Delivered Piping Hot',
    description: 'A labor of pure devotion taking two full days of preparation. Elena chars chilhuacle, ancho, and mulato chiles until aromatic and blackened, slowly blending them with plantains, roasted sesame seeds, Mexican canela cinnamon, and stone-ground Oaxacan cacao.',
    story: 'Elena hand-presses three heirloom yellow corn tortillas for every order, wrapped warm in cotton serviettes.',
    ingredients: ['Pasture-raised chicken thighs', 'Oaxacan stone-ground cacao', 'Chilhuacle & mulato chiles', 'Ripe plantain', 'Sesame seeds', 'Mexican cinnamon', 'Fresh heirloom corn nixtamal', 'Pickled red onions'],
    allergens: ['Sesame'],
    reheatingNotes: 'Tortillas are best enjoyed immediately. Warm on a dry hot skillet (comal) for 20 seconds each side if needed.',
    options: [
      {
        name: 'Tortilla Selection',
        choices: [
          { label: '3 Fresh Yellow Heirloom Corn Tortillas (Included)', extraPrice: 0 },
          { label: '6 Fresh Tortillas (+ Extra Mole Sauce)', extraPrice: 4.00 }
        ]
      },
      {
        name: 'Side Addition',
        choices: [
          { label: 'Oaxacan Black Beans with Epazote', extraPrice: 0 },
          { label: 'Arroz Rojo con Verduras & Black Beans', extraPrice: 3.00 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        user: 'Gabriela S.',
        rating: 5,
        date: '4 days ago',
        comment: 'This mole is deeply soulful. You can taste the chocolate notes balancing the smoky charred chilies. The tortillas smell like warm sunshine.',
        verifiedPurchase: true
      }
    ],
    featured: true
  },
  {
    id: 'kyoto-ichiju-sansai',
    title: 'Kyoto Homestyle Ichiju-Sansai Comfort Bento Box',
    tagline: 'Miso-glazed king salmon, dashi tamagoyaki, simmered kabocha squash, organic Koshihikari rice.',
    cook: COOK_KENJI,
    cuisine: 'Japanese',
    category: 'Regional Asian',
    price: 24.00,
    originalPrice: 27.00,
    image: '',
    fallbackGradient: 'from-emerald-900/80 to-stone-900',
    portionsLeft: 5,
    totalBatch: 14,
    deliverySlot: 'Tomorrow Lunch · 12:00 PM – 1:30 PM',
    availableDates: ['Tomorrow Lunch', 'Tomorrow Dinner'],
    dietary: ['High Protein', 'Dairy-Free', 'Pescatarian'],
    spiceLevel: 0,
    prepStyle: 'Delivered Piping Hot',
    description: 'A harmonious Kyoto home dinner prepared with respect for seasonal balance. Wild Alaskan king salmon steeped in Saikyo sweet white miso, rolled dashi egg omelette, sweet soy-simmered Hokkaido pumpkin, homemade pickled lotus root, and steamed Koshihikari rice with sesame furikake.',
    story: 'Kenji and Keiko bring the gentle, nourishing rhythm of Kyoto home kitchens to New York apartments.',
    ingredients: ['Wild King Salmon', 'Saikyo sweet white miso', 'Pasture eggs', 'Bonito-kombu dashi', 'Kabocha squash', 'Koshihikari rice', 'Lotus root', 'Toasted nori'],
    allergens: ['Fish', 'Soy', 'Eggs', 'Sesame'],
    reheatingNotes: 'Packaged in an eco-friendly wooden bento box. Ready to eat at warm room temperature or warmed in oven/microwave.',
    options: [
      {
        name: 'Soup Selection',
        choices: [
          { label: 'Traditional Nameko Mushroom & Tofu Miso Soup', extraPrice: 0 },
          { label: 'Pork Belly & Root Vegetable Tonjiru Stew', extraPrice: 4.50 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        user: 'Dave P.',
        rating: 5,
        date: 'Last week',
        comment: 'Clean, deeply comforting, and beautifully balanced. You feel healthy and nourished immediately after eating.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'levantine-lamb-stew',
    title: 'Slow Braised Aleppo Lamb Shank with Spiced Bulgur Pilaf',
    tagline: 'Falling-off-the-bone tender lamb shanks braised with pomegranate molasses, dried apricots & pine nuts.',
    cook: COOK_MONA,
    cuisine: 'Levantine',
    category: 'Mediterranean',
    price: 26.50,
    image: '',
    fallbackGradient: 'from-amber-900/80 to-stone-900',
    portionsLeft: 3,
    totalBatch: 12,
    deliverySlot: 'Tonight · 7:00 PM – 8:30 PM',
    availableDates: ['Tonight', 'Tomorrow Dinner'],
    dietary: ['Halal', 'Dairy-Free'],
    spiceLevel: 1,
    prepStyle: 'Delivered Piping Hot',
    description: 'A celebration dish cooked in Levantine homes during gatherings. Mona slowly brazes tender lamb shanks with Aleppo pepper, cinnamon bark, Turkish sun-dried apricots, and tart pomegranate reduction until the meat yields effortlessly to a fork.',
    story: 'Mona prepares this dish once a week using whole spices imported directly from her family in the Middle East.',
    ingredients: ['Halal grass-fed lamb shank', 'Pomegranate molasses', 'Aleppo pepper', 'Dried apricots', 'Toasted pine nuts', 'Coarse durum bulgur', 'Caramelized shallots', 'Fresh cilantro'],
    allergens: ['Wheat (Bulgur)', 'Tree Nuts (Pine nuts)'],
    reheatingNotes: 'Delivered bubbling hot. Best served with a spoonful of the braising juices drizzled over the spiced bulgur.',
    options: [
      {
        name: 'Appetizer Pairing',
        choices: [
          { label: 'None', extraPrice: 0 },
          { label: 'Stuffed Grape Leaves (Warag Enab, 4 pcs)', extraPrice: 5.50 },
          { label: 'Creamy Labneh with Za\'atar & Warm Pita', extraPrice: 4.50 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        user: 'Samira H.',
        rating: 5,
        date: '5 days ago',
        comment: 'Tasted like home. Mona\'s lamb is incredibly tender and the pomegranate sauce has that signature Syrian tart-sweet richness.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'tuscan-ribollita-focaccia',
    title: 'Rustic Tuscan Ribollita Pot with Rosemary Sea Salt Focaccia',
    tagline: 'Hearty slow-simmered cavolo nero kale, cannellini beans, winter roots, and olive oil soaked sourdough.',
    cook: COOK_MARIA,
    cuisine: 'Plant-Based',
    category: 'Plant-Based / Vegan',
    price: 18.00,
    image: '',
    fallbackGradient: 'from-emerald-950/80 to-stone-900',
    portionsLeft: 8,
    totalBatch: 20,
    deliverySlot: 'Tonight · 6:00 PM – 7:30 PM',
    availableDates: ['Tonight', 'Tomorrow Lunch', 'Tomorrow Dinner'],
    dietary: ['100% Plant-Based', 'Vegan', 'Dairy-Free', 'Nut-Free', 'High Fiber'],
    spiceLevel: 0,
    prepStyle: 'Delivered Piping Hot',
    description: 'The ancient peasant comfort stew of Tuscany ("re-boiled"). Maria simmers organic Tuscan black kale (cavolo nero), slow-braised cannellini beans, sweet carrots, and Savoy cabbage in a savory vegetable broth, thickened with day-old artisanal sourdough and drizzled with peppery cold-pressed olive oil.',
    story: 'Maria\'s grandmother cooked this every Sunday night in the winter. Hearty, rich, and naturally wholesome without animal products.',
    ingredients: ['Organic Tuscan black kale', 'Slow-cooked cannellini beans', 'Savoy cabbage', 'Plum tomatoes', 'Sourdough bread', 'Fresh rosemary', 'Cold-pressed extra virgin olive oil', 'Sea salt'],
    allergens: ['Wheat (Gluten)'],
    reheatingNotes: 'Like all authentic Ribollita, this gets even better as it rests. Gently warm in a pot on medium heat with a splash of water.',
    options: [
      {
        name: 'Bread Addition',
        choices: [
          { label: 'Extra Rosemary Sea Salt Focaccia Slice', extraPrice: 3.50 },
          { label: 'Gluten-Free Warm Seed Loaf Slice', extraPrice: 3.50 },
          { label: 'Standard Focaccia Included', extraPrice: 0 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        user: 'Chloe M.',
        rating: 5,
        date: 'Yesterday',
        comment: 'The deepest, most satisfying vegan comfort meal in the city. The focaccia is airy with crispy olive-oiled edges.',
        verifiedPurchase: true
      }
    ]
  }
];
