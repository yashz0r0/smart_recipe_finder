// ─── Ingredient Aliases ────────────────────────────────────────────────────
export const INGREDIENT_ALIASES = {
  masala: ['masala', 'garam masala', 'cumin', 'coriander', 'turmeric', 'chili powder'],
  oil: ['oil', 'cooking oil', 'vegetable oil', 'olive oil'],
  butter: ['butter', 'ghee'],
  chicken: ['chicken', 'chicken breast'],
  egg: ['egg', 'eggs'],
  rice: ['rice', 'basmati'],
  cheese: ['cheese', 'cheddar', 'mozzarella', 'paneer'],
  onion: ['onion', 'onions'],
  tomato: ['tomato', 'tomatoes'],
  potato: ['potato', 'potatoes']
};

const ALWAYS_AVAILABLE = new Set(['salt', 'water']);

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

export const LOCAL_RECIPES = [];

export function searchLocalRecipes(userIngredients, maxMissing = 0) {
  return [];
}