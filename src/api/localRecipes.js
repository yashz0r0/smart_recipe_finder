// ─── Ingredient Aliases ────────────────────────────────────────────────────
// Generic term → all ingredient names it covers
export const INGREDIENT_ALIASES = {
  // Indian pantry
  masala: ['masala', 'garam masala', 'cumin', 'coriander', 'turmeric', 'chili powder', 'red chili', 'chilli', 'jeera', 'haldi', 'mirch', 'spice', 'spices', 'pepper', 'mustard seeds', 'cardamom', 'cinnamon', 'cloves', 'bay leaf'],
  masalas: ['masala', 'garam masala', 'cumin', 'coriander', 'turmeric', 'chili powder', 'red chili', 'chilli', 'jeera', 'haldi', 'mirch', 'spice', 'spices', 'pepper', 'mustard seeds', 'cardamom', 'cinnamon', 'cloves', 'bay leaf'],
  spices: ['spice', 'spices', 'masala', 'garam masala', 'cumin', 'coriander', 'turmeric', 'chili powder', 'red chili', 'pepper', 'paprika', 'oregano', 'basil', 'thyme'],
  // Fats / oils
  oil: ['oil', 'cooking oil', 'vegetable oil', 'sunflower oil', 'refined oil', 'olive oil', 'canola oil', 'sesame oil'],
  ghee: ['ghee', 'butter', 'oil', 'cooking oil'],
  butter: ['butter', 'ghee', 'margarine'],
  // Proteins
  chicken: ['chicken', 'chicken breast', 'chicken thigh', 'chicken pieces', 'boneless chicken'],
  egg: ['egg', 'eggs'],
  eggs: ['egg', 'eggs'],
  // Grains / carbs
  rice: ['rice', 'basmati', 'basmati rice', 'cooked rice', 'raw rice', 'white rice'],
  pasta: ['pasta', 'spaghetti', 'penne', 'fettuccine', 'macaroni', 'noodles'],
  noodles: ['noodles', 'pasta', 'spaghetti', 'ramen', 'udon'],
  bread: ['bread', 'toast', 'sandwich bread', 'sourdough'],
  flour: ['flour', 'all-purpose flour', 'wheat flour', 'maida', 'atta'],
  // Dairy
  cheese: ['cheese', 'cheddar', 'mozzarella', 'parmesan', 'paneer', 'cream cheese'],
  milk: ['milk', 'whole milk', 'skimmed milk'],
  cream: ['cream', 'heavy cream', 'double cream', 'sour cream', 'coconut cream'],
  yogurt: ['yogurt', 'curd', 'dahi', 'greek yogurt'],
  curd: ['curd', 'yogurt', 'dahi'],
  // Vegetables
  onion: ['onion', 'onions', 'spring onion', 'shallot', 'red onion'],
  tomato: ['tomato', 'tomatoes', 'tomato puree', 'tomato paste', 'cherry tomatoes', 'canned tomatoes'],
  potato: ['potato', 'potatoes', 'aloo'],
  garlic: ['garlic', 'garlic paste', 'garlic cloves', 'minced garlic'],
  ginger: ['ginger', 'ginger paste', 'ginger garlic paste', 'fresh ginger'],
  carrot: ['carrot', 'carrots'],
  spinach: ['spinach', 'palak', 'baby spinach'],
  capsicum: ['capsicum', 'bell pepper', 'bell peppers', 'peppers'],
  mushroom: ['mushroom', 'mushrooms'],
  cabbage: ['cabbage', 'patta gobhi'],
  cauliflower: ['cauliflower', 'gobhi', 'gobi'],
  peas: ['peas', 'green peas', 'matar', 'frozen peas'],
  corn: ['corn', 'sweet corn', 'maize', 'cornmeal'],
  // Legumes
  dal: ['dal', 'lentils', 'lentil', 'masoor dal', 'moong dal', 'toor dal', 'chickpeas', 'chana'],
  lentils: ['lentils', 'dal', 'lentil', 'masoor dal', 'moong dal'],
  chickpeas: ['chickpeas', 'chana', 'chole', 'garbanzo beans'],
  beans: ['beans', 'kidney beans', 'black beans', 'rajma', 'white beans'],
  // Sauces / condiments
  'soy sauce': ['soy sauce', 'soya sauce', 'tamari'],
  'tomato sauce': ['tomato sauce', 'tomato puree', 'pasta sauce', 'marinara'],
  vinegar: ['vinegar', 'white vinegar', 'apple cider vinegar', 'balsamic vinegar'],
  // Liquids / pantry
  salt: ['salt', 'sea salt', 'rock salt', 'seasoning'],
  sugar: ['sugar', 'brown sugar', 'honey', 'jaggery'],
  lemon: ['lemon', 'lime', 'lemon juice', 'lime juice'],
  water: ['water'],
};

// Always assume these are available in any kitchen
const ALWAYS_AVAILABLE = new Set(['salt', 'water', 'seasoning', 'sea salt']);

export function expandIngredients(userItems) {
  const expanded = new Set();
  userItems.forEach(item => {
    const key = item.toLowerCase().trim();
    expanded.add(key);
    const aliases = INGREDIENT_ALIASES[key];
    if (aliases) aliases.forEach(a => expanded.add(a));
  });
  ALWAYS_AVAILABLE.forEach(p => expanded.add(p));
  return expanded;
}

export function ingredientCoveredBy(required, userExpanded) {
  const req = required.toLowerCase().trim();
  if (userExpanded.has(req)) return true;
  for (const userIng of userExpanded) {
    if (req.includes(userIng) || userIng.includes(req)) return true;
  }
  return false;
}

// ─── RECIPE DATABASE (80+ recipes across cuisines) ────────────────────────

export const LOCAL_RECIPES = [
  // ══════════════════════════════════════════════
  //  🇮🇳 INDIAN
  // ══════════════════════════════════════════════
  {
    idMeal: 'ind-001',
    strMeal: 'Tomato Rice',
    strCategory: 'Rice',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=_sJF7FXWQYI',
    strTags: 'Indian,Rice,Vegetarian,Quick',
    ingredients: ['rice', 'tomato', 'onion', 'oil', 'cumin', 'turmeric', 'red chili', 'salt'],
    strInstructions: `1. Cook rice and keep aside (let it cool a bit for separate grains).
2. Heat oil in a wide pan. Add cumin seeds and let them splutter.
3. Add finely chopped onions. Fry until golden brown.
4. Add chopped tomatoes, turmeric, red chili powder, and salt.
5. Cook until tomatoes become mushy and oil separates (about 8–10 mins).
6. Add the cooked rice and mix gently until every grain is coated.
7. Garnish with fresh coriander. Serve hot with raita or papad.`,
  },
  {
    idMeal: 'ind-002',
    strMeal: 'Jeera Rice',
    strCategory: 'Rice',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=lnBkEoQJ43Y',
    strTags: 'Indian,Rice,Simple,Vegetarian',
    ingredients: ['rice', 'oil', 'cumin', 'salt'],
    strInstructions: `1. Wash and soak rice for 20 minutes. Drain.
2. Heat oil or ghee in a pot. Add cumin seeds and let them sizzle for 30 seconds.
3. Add drained rice and stir gently for 1–2 minutes.
4. Add water (1:2 ratio), salt to taste. Bring to a boil.
5. Cover and cook on low heat for 12–15 minutes.
6. Fluff with a fork and serve with dal or any curry.`,
  },
  {
    idMeal: 'ind-003',
    strMeal: 'Masala Rice',
    strCategory: 'Rice',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=oFKFsDR2CUw',
    strTags: 'Indian,Rice,Spicy,One-Pot',
    ingredients: ['rice', 'onion', 'tomato', 'oil', 'cumin', 'turmeric', 'garam masala', 'salt'],
    strInstructions: `1. Heat oil in a pot. Add cumin seeds.
2. Add chopped onions and fry until golden.
3. Add tomatoes, turmeric, garam masala, and salt. Cook until masala is done.
4. Add washed rice and mix well.
5. Add water (1:1.5 ratio). Cover and cook on low for 15 mins.
6. Rest 5 minutes, fluff and serve.`,
  },
  {
    idMeal: 'ind-004',
    strMeal: 'Onion Tomato Sabzi',
    strCategory: 'Side Dish',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=9l2Z7MLBZAQ',
    strTags: 'Indian,Sabzi,Vegetarian,Quick',
    ingredients: ['onion', 'tomato', 'oil', 'cumin', 'turmeric', 'red chili', 'salt'],
    strInstructions: `1. Heat oil in a pan. Add cumin seeds.
2. Add sliced onions and cook until translucent.
3. Add chopped tomatoes and all spices.
4. Cook for 8–10 minutes until thick and oil separates.
5. Serve with rice or rotis.`,
  },
  {
    idMeal: 'ind-005',
    strMeal: 'Aloo (Potato) Curry',
    strCategory: 'Curry',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=mW3JRqiHjGk',
    strTags: 'Indian,Curry,Vegetarian,Comfort',
    ingredients: ['potato', 'onion', 'tomato', 'oil', 'cumin', 'turmeric', 'red chili', 'garam masala', 'salt'],
    strInstructions: `1. Boil or cube potatoes into bite-size pieces.
2. Heat oil. Add cumin seeds, then onions. Fry until golden.
3. Add tomatoes, turmeric, red chili, salt. Cook until mushy.
4. Add potatoes and mix well. Add a little water.
5. Cover and cook 10 minutes. Finish with garam masala.
6. Serve with rice, roti, or puri.`,
  },
  {
    idMeal: 'ind-006',
    strMeal: 'Dal Tadka',
    strCategory: 'Curry',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=GbflL3hbhpE',
    strTags: 'Indian,Dal,Protein,Comfort',
    ingredients: ['lentils', 'onion', 'tomato', 'oil', 'cumin', 'turmeric', 'red chili', 'garlic', 'salt'],
    strInstructions: `1. Pressure cook lentils with turmeric and salt until soft (3 whistles).
2. Heat oil in a pan. Add cumin seeds, then garlic. Fry 30 seconds.
3. Add onions and cook until golden. Add tomatoes and spices. Cook until soft.
4. Pour this tadka over the cooked lentils. Mix well.
5. Simmer 5 minutes. Serve hot with rice or roti.`,
  },
  {
    idMeal: 'ind-007',
    strMeal: 'Egg Bhurji (Spiced Scrambled Eggs)',
    strCategory: 'Eggs',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=nAE1kpBzK8o',
    strTags: 'Indian,Eggs,Quick,Breakfast',
    ingredients: ['eggs', 'onion', 'tomato', 'oil', 'cumin', 'turmeric', 'red chili', 'salt'],
    strInstructions: `1. Heat oil in a pan. Add cumin seeds.
2. Add finely chopped onions and cook until translucent.
3. Add chopped tomatoes, turmeric, red chili, and salt. Cook 3–4 mins.
4. Beat eggs and pour into the pan. Stir continuously on medium heat.
5. Cook until eggs are just done — slightly soft is best.
6. Garnish with coriander. Serve with roti or bread.`,
  },
  {
    idMeal: 'ind-008',
    strMeal: 'Khichdi',
    strCategory: 'Rice',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=GMfVq5lBU0g',
    strTags: 'Indian,Comfort,One-Pot,Healthy',
    ingredients: ['rice', 'lentils', 'onion', 'oil', 'cumin', 'turmeric', 'salt'],
    strInstructions: `1. Wash rice and lentils together.
2. Heat oil or ghee. Add cumin seeds, then onions. Fry until golden.
3. Add turmeric and salt. Mix well.
4. Add rice and lentils. Pour water (1:3 ratio). Stir.
5. Pressure cook 3–4 whistles or cook covered 20 mins on low heat.
6. Mash slightly. Serve with pickle, ghee on top, or yogurt.`,
  },
  {
    idMeal: 'ind-009',
    strMeal: 'Palak (Spinach) Sabzi',
    strCategory: 'Vegetable',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=iswLDsCFU5o',
    strTags: 'Indian,Greens,Healthy,Vegetarian',
    ingredients: ['spinach', 'onion', 'tomato', 'oil', 'garlic', 'cumin', 'turmeric', 'red chili', 'salt'],
    strInstructions: `1. Wash spinach thoroughly. Roughly chop it.
2. Heat oil in a pan. Add cumin seeds, then minced garlic. Fry 30 seconds.
3. Add onions and cook until soft. Add tomatoes and spices. Cook until mushy.
4. Add chopped spinach. Mix and cook 5–7 minutes until wilted.
5. Serve with roti, paratha, or rice.`,
  },
  {
    idMeal: 'ind-010',
    strMeal: 'Chole (Chickpea Curry)',
    strCategory: 'Curry',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=R0IhzJ8e1dc',
    strTags: 'Indian,Curry,Protein,Street Food',
    ingredients: ['chickpeas', 'onion', 'tomato', 'oil', 'garlic', 'ginger', 'cumin', 'garam masala', 'turmeric', 'red chili', 'salt'],
    strInstructions: `1. Soak dried chickpeas overnight and pressure cook, or use canned (drain and rinse).
2. Heat oil. Add cumin, then onions. Cook until deep brown.
3. Add ginger-garlic paste. Fry 2 minutes.
4. Add tomatoes, turmeric, red chili, and salt. Cook until oil separates.
5. Add chickpeas and mix. Add water as needed. Simmer 10–15 mins.
6. Finish with garam masala. Serve with rice, puri, or bhature.`,
  },
  {
    idMeal: 'ind-011',
    strMeal: 'Rajma (Kidney Bean Curry)',
    strCategory: 'Curry',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=3u-pvDtXgqs',
    strTags: 'Indian,Curry,Protein,Comfort',
    ingredients: ['beans', 'onion', 'tomato', 'oil', 'garlic', 'ginger', 'cumin', 'garam masala', 'turmeric', 'salt'],
    strInstructions: `1. Soak kidney beans overnight, then pressure cook until soft (5 whistles).
2. Heat oil. Fry cumin, onions until golden, add garlic-ginger paste.
3. Add tomatoes, turmeric, garam masala, and salt. Cook until oil separates.
4. Add cooked beans with their water. Mash a few beans for thickness.
5. Simmer 15 minutes. Serve with steamed rice (classic Rajma Chawal!).`,
  },
  {
    idMeal: 'ind-012',
    strMeal: 'Aloo Gobi (Potato & Cauliflower)',
    strCategory: 'Vegetable',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=aqzBjJmxBZw',
    strTags: 'Indian,Vegetable,Dry Curry,Classic',
    ingredients: ['potato', 'cauliflower', 'oil', 'onion', 'cumin', 'turmeric', 'red chili', 'garam masala', 'salt'],
    strInstructions: `1. Cut potato and cauliflower into medium pieces.
2. Heat oil in a wide pan. Add cumin seeds.
3. Add onions (optional) and fry briefly. Add turmeric, red chili, and salt.
4. Add potato and cauliflower. Stir to coat with spices.
5. Cover and cook on low-medium heat, stirring occasionally, for 15–20 mins until tender.
6. Finish with garam masala. Serve with roti or paratha.`,
  },
  {
    idMeal: 'ind-013',
    strMeal: 'Vegetable Pulao',
    strCategory: 'Rice',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=OfTPm5r8VxE',
    strTags: 'Indian,Rice,One-Pot,Aromatic',
    ingredients: ['rice', 'onion', 'peas', 'carrot', 'oil', 'cumin', 'garam masala', 'salt'],
    strInstructions: `1. Soak rice 20 minutes, drain.
2. Heat oil. Add cumin and whole spices if available.
3. Add onions. Fry until golden-brown and slightly crispy.
4. Add vegetables (peas, carrots). Stir 2 minutes.
5. Add rice, water (1:1.75), salt, and a pinch of garam masala.
6. Cover and cook 15 minutes on low. Fluff and serve with raita.`,
  },
  {
    idMeal: 'ind-014',
    strMeal: 'Matar Paneer (Peas & Cheese Curry)',
    strCategory: 'Curry',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=8V5QiAkMrFs',
    strTags: 'Indian,Curry,Vegetarian,Protein',
    ingredients: ['cheese', 'peas', 'onion', 'tomato', 'oil', 'garlic', 'ginger', 'cumin', 'garam masala', 'turmeric', 'salt'],
    strInstructions: `1. Lightly fry paneer/cheese cubes in oil until golden. Set aside.
2. In the same pan, heat oil. Add cumin, then onions. Cook until golden.
3. Add ginger-garlic paste. Fry 1 minute.
4. Add tomatoes and all spices. Cook until masala is thick.
5. Add peas. Cook 5 minutes. Add fried paneer.
6. Add water for gravy. Simmer 5 mins. Serve with rice or naan.`,
  },

  // ══════════════════════════════════════════════
  //  🍝 ITALIAN / PASTA
  // ══════════════════════════════════════════════
  {
    idMeal: 'ita-001',
    strMeal: 'Pasta Aglio e Olio',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/pnvl1x1487210060.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=yoXqpDRjqS0',
    strTags: 'Italian,Pasta,Garlic,Quick',
    ingredients: ['pasta', 'garlic', 'oil', 'salt'],
    strInstructions: `1. Boil pasta in salted water until al dente. Reserve 1 cup pasta water.
2. Thinly slice garlic. Heat olive oil in a pan over low heat.
3. Add garlic and cook slowly until golden — don't burn it.
4. Add red chili flakes if available. Add a splash of pasta water.
5. Drain pasta and toss in the pan with the garlicky oil.
6. Adjust consistency with pasta water. Serve immediately with parsley or cheese.`,
  },
  {
    idMeal: 'ita-002',
    strMeal: 'Spaghetti Carbonara',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=3AAdKl1UYZs',
    strTags: 'Italian,Pasta,Eggs,Cheese,Classic',
    ingredients: ['pasta', 'eggs', 'cheese', 'garlic', 'oil', 'salt'],
    strInstructions: `1. Boil pasta in heavily salted water. Reserve pasta water before draining.
2. In a bowl, whisk eggs with grated cheese and black pepper.
3. Fry garlic (or bacon if available) in olive oil. Remove from heat.
4. Add hot drained pasta to the pan. Quickly pour egg mixture and toss.
5. Add pasta water slowly to make a creamy sauce — heat from pasta cooks the eggs.
6. Serve immediately with extra cheese and black pepper.`,
  },
  {
    idMeal: 'ita-003',
    strMeal: 'Tomato Pasta',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=2PtROFrQSJo',
    strTags: 'Italian,Pasta,Vegetarian,Simple',
    ingredients: ['pasta', 'tomato', 'garlic', 'onion', 'oil', 'salt'],
    strInstructions: `1. Boil pasta in salted water. Drain and set aside.
2. Heat olive oil. Fry garlic until fragrant. Add onion and cook until soft.
3. Add crushed or chopped tomatoes, salt, and oregano/basil if available.
4. Simmer 15 minutes until sauce thickens.
5. Toss pasta in the sauce. Top with parmesan if available.`,
  },
  {
    idMeal: 'ita-004',
    strMeal: 'Pasta with Egg & Cheese',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=3AAdKl1UYZs',
    strTags: 'Italian,Pasta,Quick,Protein',
    ingredients: ['pasta', 'eggs', 'cheese', 'oil', 'salt'],
    strInstructions: `1. Cook pasta until al dente. Save pasta water.
2. In a bowl, beat eggs with grated cheese and black pepper.
3. Heat a little oil in a pan.
4. Drain pasta, toss immediately with egg-cheese mixture off direct heat.
5. Add pasta water a splash at a time to get a creamy texture.
6. Serve right away with more cheese.`,
  },
  {
    idMeal: 'ita-005',
    strMeal: 'Cheesy Baked Pasta',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=0S7CsGMOQdo',
    strTags: 'Italian,Pasta,Cheese,Baked',
    ingredients: ['pasta', 'cheese', 'milk', 'butter', 'flour', 'salt'],
    strInstructions: `1. Boil pasta. Drain.
2. Make béchamel: melt butter, stir in flour, slowly add milk whisking constantly. Season with salt.
3. Mix pasta with béchamel and half the cheese.
4. Transfer to a baking dish. Top with remaining cheese.
5. Bake at 200°C (390°F) for 20–25 minutes until golden and bubbling.`,
  },

  // ══════════════════════════════════════════════
  //  🥚 EGG-BASED (Universal)
  // ══════════════════════════════════════════════
  {
    idMeal: 'egg-001',
    strMeal: 'Classic Omelette',
    strCategory: 'Eggs',
    strArea: 'French',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tqrrsq1511555309.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=qXPhVYeXiYs',
    strTags: 'Eggs,Breakfast,Quick,Protein',
    ingredients: ['eggs', 'butter', 'salt'],
    strInstructions: `1. Beat 2–3 eggs with salt and pepper.
2. Heat butter in a non-stick pan over medium heat.
3. Pour in eggs. Let the edges set, then gently push toward center while tilting pan.
4. When just set but still glossy, fold in half and slide onto a plate.
5. Add cheese, onion, tomato filling before folding if available.`,
  },
  {
    idMeal: 'egg-002',
    strMeal: 'Fried Egg on Toast',
    strCategory: 'Breakfast',
    strArea: 'British',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tqrrsq1511555309.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=j2wnmBSmUYw',
    strTags: 'Eggs,Breakfast,Simple,Quick',
    ingredients: ['eggs', 'bread', 'butter', 'salt'],
    strInstructions: `1. Toast bread until golden.
2. Heat butter in a pan over medium heat.
3. Crack egg into pan. Cook until white is set but yolk still runny (sunny-side up).
4. Or flip for over-easy. Season with salt and pepper.
5. Serve on toast. Top with sliced tomato or cheese if available.`,
  },
  {
    idMeal: 'egg-003',
    strMeal: 'Scrambled Eggs',
    strCategory: 'Breakfast',
    strArea: 'British',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tqrrsq1511555309.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=PUP7U5vTMM0',
    strTags: 'Eggs,Breakfast,Protein,Simple',
    ingredients: ['eggs', 'butter', 'milk', 'salt'],
    strInstructions: `1. Beat eggs with a splash of milk, salt, and pepper.
2. Melt butter in a pan over low heat.
3. Pour in eggs and stir slowly and constantly with a spatula.
4. Remove from heat while still slightly wet — residual heat finishes them.
5. Serve on toast with any accompaniment.`,
  },
  {
    idMeal: 'egg-004',
    strMeal: 'Egg Fried Rice',
    strCategory: 'Rice',
    strArea: 'Chinese',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=2BBTF4PN0bo',
    strTags: 'Chinese,Rice,Eggs,Quick',
    ingredients: ['rice', 'eggs', 'oil', 'garlic', 'soy sauce', 'salt'],
    strInstructions: `1. Use cold cooked rice (day-old works best).
2. Heat oil in a wok/wide pan on high heat.
3. Add garlic. Fry 20 seconds. Push to side.
4. Add eggs and scramble quickly.
5. Add rice and toss everything together on high heat for 3–4 minutes.
6. Add soy sauce and salt. Toss well. Serve hot.`,
  },
  {
    idMeal: 'egg-005',
    strMeal: 'Spanish Tortilla (Potato Omelette)',
    strCategory: 'Eggs',
    strArea: 'Spanish',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tqrrsq1511555309.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=hqKwHsWGmtw',
    strTags: 'Eggs,Potato,Spanish,Filling',
    ingredients: ['eggs', 'potato', 'onion', 'oil', 'salt'],
    strInstructions: `1. Thinly slice potatoes and onion.
2. Fry slowly in plenty of oil until soft but not crispy. Drain oil (save it).
3. Beat eggs with salt. Mix in the cooked potato and onion.
4. In a clean pan with a little oil, pour in the egg-potato mixture.
5. Cook on medium heat until edges set. Flip onto a plate, then slide back into pan.
6. Cook other side 2–3 minutes. Serve warm or at room temperature.`,
  },

  // ══════════════════════════════════════════════
  //  🥔 POTATO-BASED
  // ══════════════════════════════════════════════
  {
    idMeal: 'pot-001',
    strMeal: 'Simple Mashed Potato',
    strCategory: 'Side',
    strArea: 'British',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sywwsx1511556531.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=1MXZLLlf-bI',
    strTags: 'Potato,Comfort,Side,Simple',
    ingredients: ['potato', 'butter', 'milk', 'salt'],
    strInstructions: `1. Peel and cube potatoes. Boil in salted water until fork-tender (15–20 mins).
2. Drain completely. Return to pot over low heat to steam dry.
3. Mash with butter and warm milk until smooth and creamy.
4. Season with salt and pepper. Serve as a side with any dish.`,
  },
  {
    idMeal: 'pot-002',
    strMeal: 'Crispy Fried Potatoes',
    strCategory: 'Side',
    strArea: 'Universal',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sywwsx1511556531.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=ZuJYNsntWpk',
    strTags: 'Potato,Crispy,Side,Simple',
    ingredients: ['potato', 'oil', 'salt'],
    strInstructions: `1. Peel and cut potatoes into wedges or cubes.
2. Par-boil for 5 minutes in salted water. Drain well.
3. Heat oil in a pan. Add potatoes in a single layer.
4. Fry on medium-high until golden and crispy on all sides (15 mins).
5. Season with salt, pepper, and any spices you have. Serve hot.`,
  },
  {
    idMeal: 'pot-003',
    strMeal: 'Potato Soup',
    strCategory: 'Soup',
    strArea: 'Universal',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sywwsx1511556531.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=Kx3O7apSbQU',
    strTags: 'Potato,Soup,Comfort,Filling',
    ingredients: ['potato', 'onion', 'garlic', 'butter', 'milk', 'salt'],
    strInstructions: `1. Melt butter. Sauté onion and garlic until soft.
2. Add diced potatoes and water/stock to just cover. Bring to boil.
3. Simmer 15–20 minutes until potatoes are very soft.
4. Blend until smooth (or mash for chunky texture).
5. Stir in milk. Season with salt and pepper. Serve with bread.`,
  },

  // ══════════════════════════════════════════════
  //  🍗 CHICKEN
  // ══════════════════════════════════════════════
  {
    idMeal: 'chi-001',
    strMeal: 'Simple Chicken Curry',
    strCategory: 'Curry',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=examplechicken',
    strTags: 'Chicken,Curry,Indian,Protein',
    ingredients: ['chicken', 'onion', 'tomato', 'oil', 'garlic', 'ginger', 'cumin', 'turmeric', 'garam masala', 'red chili', 'salt'],
    strInstructions: `1. Heat oil in a pan. Add cumin seeds, then finely chopped onions.
2. Fry onions until deep brown — this makes the curry rich.
3. Add ginger-garlic paste. Cook 2 minutes.
4. Add tomatoes and all spices. Cook until oil separates.
5. Add chicken pieces. Mix well to coat with masala.
6. Add a little water, cover and cook 20 minutes until chicken is done.
7. Finish with garam masala. Serve with rice or roti.`,
  },
  {
    idMeal: 'chi-002',
    strMeal: 'Pan-Fried Chicken',
    strCategory: 'Chicken',
    strArea: 'Universal',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=gFbmNJIdJxg',
    strTags: 'Chicken,Quick,Protein,Simple',
    ingredients: ['chicken', 'garlic', 'oil', 'salt'],
    strInstructions: `1. Cut chicken into pieces. Season with salt, pepper, and garlic.
2. Heat oil in a heavy pan over medium-high heat.
3. Place chicken skin-side down. Don't move it for 6–7 minutes to get crispy skin.
4. Flip and cook other side 5–6 minutes until cooked through.
5. Rest 3 minutes before serving. Squeeze lemon if available.`,
  },
  {
    idMeal: 'chi-003',
    strMeal: 'Chicken Rice (Hainanese Style)',
    strCategory: 'Rice',
    strArea: 'Asian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=Q3RWxwrGHK0',
    strTags: 'Chicken,Rice,Asian,One-Pot',
    ingredients: ['chicken', 'rice', 'garlic', 'ginger', 'oil', 'salt'],
    strInstructions: `1. Simmer chicken in water with ginger, garlic, and salt for 25–30 mins until cooked. Reserve broth.
2. Remove chicken, shred or slice. Rub with sesame oil if available.
3. Cook rice using the chicken broth instead of water.
4. Serve rice with sliced chicken on top. Drizzle with soy sauce and ginger-scallion oil.`,
  },

  // ══════════════════════════════════════════════
  //  🌽 MEXICAN / TEX-MEX
  // ══════════════════════════════════════════════
  {
    idMeal: 'mex-001',
    strMeal: 'Bean & Rice Bowl',
    strCategory: 'Mexican',
    strArea: 'Mexican',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=Oa0C_rPVElU',
    strTags: 'Mexican,Beans,Rice,Healthy',
    ingredients: ['rice', 'beans', 'onion', 'tomato', 'garlic', 'oil', 'cumin', 'salt'],
    strInstructions: `1. Cook rice separately.
2. Heat oil in a pan. Add cumin, then onion and garlic. Cook until soft.
3. Add tomatoes and cook 5 minutes.
4. Add canned or cooked beans. Season with salt and cumin.
5. Simmer 10 minutes until thick. Serve over rice with any available toppings.`,
  },
  {
    idMeal: 'mex-002',
    strMeal: 'Quesadillas',
    strCategory: 'Snack',
    strArea: 'Mexican',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=Oa0C_rPVElU',
    strTags: 'Mexican,Cheese,Quick,Snack',
    ingredients: ['flour', 'cheese', 'onion', 'oil', 'salt'],
    strInstructions: `1. Make simple flatbreads: mix flour, salt, and water into a dough. Roll thin.
2. Cook each flatbread on a dry pan 1–2 minutes per side.
3. Place cheese (and any filling) on one half of the flatbread.
4. Fold over. Press with a spatula on a heated pan until cheese melts.
5. Cut into wedges. Serve with tomato salsa if available.`,
  },

  // ══════════════════════════════════════════════
  //  🍜 CHINESE / ASIAN
  // ══════════════════════════════════════════════
  {
    idMeal: 'chi-asian-001',
    strMeal: 'Vegetable Stir Fry Noodles',
    strCategory: 'Noodles',
    strArea: 'Chinese',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=NkXSfoPFMXE',
    strTags: 'Chinese,Noodles,Vegetarian,Quick',
    ingredients: ['noodles', 'garlic', 'onion', 'oil', 'soy sauce', 'salt'],
    strInstructions: `1. Boil noodles according to package. Drain and rinse with cold water.
2. Heat oil in a wok on high heat. Add garlic and cook 30 seconds.
3. Add onion (and any available vegetables). Stir-fry 3–4 minutes.
4. Add noodles. Toss everything over high heat.
5. Add soy sauce and a pinch of sugar if available. Toss to coat. Serve hot.`,
  },
  {
    idMeal: 'chi-asian-002',
    strMeal: 'Garlic Fried Rice',
    strCategory: 'Rice',
    strArea: 'Asian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=2BBTF4PN0bo',
    strTags: 'Asian,Rice,Garlic,Quick',
    ingredients: ['rice', 'garlic', 'oil', 'soy sauce', 'salt'],
    strInstructions: `1. Use cold cooked rice (day-old is best).
2. Heat oil on high heat. Add minced garlic. Fry until golden (not burnt).
3. Add rice. Break up clumps. Toss on high heat 4–5 minutes.
4. Add soy sauce. Toss. Taste and adjust salt.
5. Serve with any protein or as a side.`,
  },
  {
    idMeal: 'chi-asian-003',
    strMeal: 'Tomato Egg Stir Fry',
    strCategory: 'Eggs',
    strArea: 'Chinese',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=aGUMb4QT6oI',
    strTags: 'Chinese,Eggs,Tomato,Classic',
    ingredients: ['eggs', 'tomato', 'oil', 'garlic', 'salt', 'sugar'],
    strInstructions: `1. Beat eggs with a pinch of salt.
2. Heat oil on high heat. Add eggs and scramble until just set. Remove.
3. In the same pan, add more oil. Fry garlic 20 seconds.
4. Add sliced tomatoes. Cook 3–4 minutes until juicy.
5. Add a pinch of sugar and salt. Return eggs to pan. Toss.
6. Serve over rice — this is a beloved Chinese home-cooking staple.`,
  },

  // ══════════════════════════════════════════════
  //  🍞 BREAD-BASED
  // ══════════════════════════════════════════════
  {
    idMeal: 'brd-001',
    strMeal: 'Garlic Bread',
    strCategory: 'Snack',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=3bvQHFTvFGE',
    strTags: 'Bread,Garlic,Quick,Snack',
    ingredients: ['bread', 'garlic', 'butter', 'salt'],
    strInstructions: `1. Preheat oven to 200°C or use a pan.
2. Mix softened butter with minced garlic and a pinch of salt (and parsley if available).
3. Spread generously on bread slices or sliced baguette.
4. Bake 8–10 minutes until golden and crispy, or toast in a covered pan.`,
  },
  {
    idMeal: 'brd-002',
    strMeal: 'French Toast',
    strCategory: 'Breakfast',
    strArea: 'French',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tqrrsq1511555309.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=G8R7FP0GO1s',
    strTags: 'Bread,Eggs,Breakfast,Sweet',
    ingredients: ['bread', 'eggs', 'milk', 'butter', 'sugar', 'salt'],
    strInstructions: `1. Beat eggs with milk, a pinch of sugar, and salt.
2. Dip bread slices in the egg mixture, coating both sides.
3. Heat butter in a pan over medium heat.
4. Cook soaked bread 2–3 minutes per side until golden.
5. Serve with honey, jam, or fruit if available.`,
  },
  {
    idMeal: 'brd-003',
    strMeal: 'Cheese Toast',
    strCategory: 'Snack',
    strArea: 'Universal',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=ycVv39V5Imc',
    strTags: 'Bread,Cheese,Quick,Snack',
    ingredients: ['bread', 'cheese', 'butter', 'salt'],
    strInstructions: `1. Butter one side of each bread slice.
2. Place buttered-side down in a pan over medium heat.
3. Add grated or sliced cheese on top.
4. Cover with a lid until cheese melts (2–3 minutes).
5. For extra crispiness, press with a spatula. Serve hot.`,
  },

  // ══════════════════════════════════════════════
  //  🥣 UNIVERSAL / COMFORT
  // ══════════════════════════════════════════════
  {
    idMeal: 'uni-001',
    strMeal: 'Vegetable Soup',
    strCategory: 'Soup',
    strArea: 'Universal',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=3VkVIpkWiDs',
    strTags: 'Soup,Vegetable,Healthy,Comfort',
    ingredients: ['onion', 'carrot', 'potato', 'tomato', 'garlic', 'oil', 'salt'],
    strInstructions: `1. Heat oil in a large pot. Sauté onion and garlic until soft.
2. Add any chopped vegetables — carrot, potato, tomato.
3. Pour in enough water to cover. Season with salt and herbs if available.
4. Bring to boil, then simmer 20 minutes until all vegetables are tender.
5. Blend partially for a thicker soup, or serve chunky with bread.`,
  },
  {
    idMeal: 'uni-002',
    strMeal: 'Fried Noodles',
    strCategory: 'Noodles',
    strArea: 'Asian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=NkXSfoPFMXE',
    strTags: 'Asian,Noodles,Quick,Savory',
    ingredients: ['noodles', 'onion', 'garlic', 'oil', 'salt'],
    strInstructions: `1. Boil noodles until just cooked. Drain and rinse with cold water.
2. Heat oil in a wide pan on high heat.
3. Add garlic and onion. Stir-fry 2 minutes.
4. Add noodles. Toss everything over high heat for 3–4 minutes.
5. Season with salt, pepper, and soy sauce if available. Serve hot.`,
  },
  {
    idMeal: 'uni-003',
    strMeal: 'Simple Lentil Soup',
    strCategory: 'Soup',
    strArea: 'Universal',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=IUFatB3SWDI',
    strTags: 'Lentils,Soup,Protein,Healthy',
    ingredients: ['lentils', 'onion', 'garlic', 'tomato', 'oil', 'cumin', 'turmeric', 'salt'],
    strInstructions: `1. Heat oil in a pot. Add cumin and onions. Cook until golden.
2. Add garlic and cook 1 minute. Add tomatoes, turmeric, and salt.
3. Add rinsed lentils and water (4 cups per 1 cup lentils).
4. Bring to boil, then simmer 20–25 minutes until lentils are soft.
5. Adjust consistency. Squeeze lemon if available. Serve with bread or rice.`,
  },
  {
    idMeal: 'uni-004',
    strMeal: 'Caramelized Onion Rice',
    strCategory: 'Rice',
    strArea: 'Middle Eastern',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=0iHLDNs7fGg',
    strTags: 'Rice,Onion,Simple,Savory',
    ingredients: ['rice', 'onion', 'oil', 'salt'],
    strInstructions: `1. Thinly slice onions. Heat oil in a pot over medium heat.
2. Fry onions slowly for 20–25 minutes until deep golden and caramelized (this is the magic!).
3. Remove half the onions for topping. Add washed rice to pot.
4. Add water (1:2), salt. Bring to boil. Cover and cook 15 minutes.
5. Top with reserved crispy onions. Serve with yogurt.`,
  },
  {
    idMeal: 'uni-005',
    strMeal: 'Pancakes',
    strCategory: 'Breakfast',
    strArea: 'American',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=nFtULFjMeVM',
    strTags: 'Breakfast,Sweet,Flour,Eggs',
    ingredients: ['flour', 'eggs', 'milk', 'butter', 'sugar', 'salt'],
    strInstructions: `1. Mix flour, a pinch of salt, and sugar in a bowl.
2. Beat in eggs and milk until a smooth batter forms (add a little baking powder if available).
3. Heat a lightly buttered pan over medium heat.
4. Pour in a ladleful of batter. Cook until bubbles form on top (~2 mins).
5. Flip and cook other side 1 minute. Repeat. Serve with honey, jam, or fruit.`,
  },
  {
    idMeal: 'uni-006',
    strMeal: 'Tomato Soup',
    strCategory: 'Soup',
    strArea: 'Universal',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=ZQi0A0d1bS0',
    strTags: 'Soup,Tomato,Comfort,Vegetarian',
    ingredients: ['tomato', 'onion', 'garlic', 'butter', 'salt'],
    strInstructions: `1. Melt butter in a pot. Add onion and garlic. Cook until soft.
2. Add chopped tomatoes and salt. Cook 10 minutes until tomatoes break down.
3. Add a cup of water. Simmer 5 more minutes.
4. Blend until smooth. Strain if you prefer silky texture.
5. Stir in cream or butter for richness. Serve with bread or crackers.`,
  },
];

export function searchLocalRecipes(userIngredients, maxMissing = 0) {
  if (userIngredients.length === 0) return [];
  const userExpanded = expandIngredients(userIngredients);

  const results = [];

  for (const meal of LOCAL_RECIPES) {
    const missing = [];
    for (const ing of meal.ingredients) {
      if (!ingredientCoveredBy(ing, userExpanded)) {
        missing.push(ing);
      }
    }
    if (missing.length <= maxMissing) {
      results.push({ meal, missing, matchCount: meal.ingredients.length - missing.length });
    }
  }

  // Sort: perfect matches first, then by number of matching ingredients
  results.sort((a, b) => {
    if (a.missing.length !== b.missing.length) return a.missing.length - b.missing.length;
    return b.matchCount - a.matchCount;
  });

  return results.map(r => ({ meal: r.meal, missing: r.missing }));
}
