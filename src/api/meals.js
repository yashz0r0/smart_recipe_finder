import { searchLocalRecipes } from './localRecipes';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

function extractIngredients(raw) {
  const result = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = raw[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      result.push(ingredient.trim().toLowerCase());
    }
  }
  return result;
}

async function fetchMealsByIngredient(ingredient) {
  try {
    const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient.trim())}`);
    const data = await res.json();
    return data.meals ?? [];
  } catch {
    return [];
  }
}

async function fetchMealDetails(id) {
  try {
    const res = await fetch(`${BASE}/lookup.php?i=${id}`);
    const data = await res.json();
    const raw = data.meals?.[0];
    if (!raw) return null;
    return {
      idMeal: raw.idMeal,
      strMeal: raw.strMeal,
      strCategory: raw.strCategory,
      strArea: raw.strArea,
      strInstructions: raw.strInstructions,
      strMealThumb: raw.strMealThumb,
      strYoutube: raw.strYoutube ?? '',
      strTags: raw.strTags ?? '',
      ingredients: extractIngredients(raw),
      source: 'themealdb',
    };
  } catch {
    return null;
  }
}

// Convert local recipe to universal Meal shape
function localToMeal(item) {
  return { ...item.meal, source: 'local', missingIngredients: item.missing };
}

async function fetchTheMealDBResults(userIngredients) {
  // Only try TheMealDB for simple single-word ingredients
  const simple = userIngredients.filter(i => !['masala', 'masalas', 'spices', 'oil'].includes(i.toLowerCase()));
  if (simple.length === 0) return [];

  const lists = await Promise.all(simple.map(fetchMealsByIngredient));
  const nonEmpty = lists.filter(l => l.length > 0);
  if (nonEmpty.length === 0) return [];

  // Intersection of all ingredient result sets
  let candidateIds = new Set(nonEmpty[0].map(m => m.idMeal));
  for (let i = 1; i < nonEmpty.length; i++) {
    const s = new Set(nonEmpty[i].map(m => m.idMeal));
    candidateIds = new Set([...candidateIds].filter(id => s.has(id)));
  }

  // Fallback: union if intersection is empty
  if (candidateIds.size === 0) {
    const countMap = new Map();
    nonEmpty.flat().forEach(m => countMap.set(m.idMeal, (countMap.get(m.idMeal) ?? 0) + 1));
    const max = Math.max(...countMap.values());
    [...countMap.entries()]
      .filter(([, c]) => c >= Math.max(max - 1, 1))
      .forEach(([id]) => candidateIds.add(id));
  }

  const idsToFetch = [...candidateIds].slice(0, 8);
  const details = await Promise.all(idsToFetch.map(fetchMealDetails));
  return details.filter(m => m !== null);
}

export async function fetchRecipesByIngredients(userIngredients) {
  if (userIngredients.length === 0) return [];

  const normalized = userIngredients.map(i => i.trim().toLowerCase()).filter(Boolean);

  // Run local recipes search + TheMealDB in parallel
  const [localResults, mealDbResults] = await Promise.all([
    Promise.resolve(searchLocalRecipes(normalized).map(localToMeal)),
    fetchTheMealDBResults(normalized),
  ]);

  // De-duplicate: local results take priority, skip TheMealDB dupes by name
  const localNames = new Set(localResults.map(m => m.strMeal.toLowerCase()));
  const uniqueMealDb = mealDbResults.filter(m => !localNames.has(m.strMeal.toLowerCase()));

  // Local results first (most relevant for Indian pantry inputs)
  return [...localResults, ...uniqueMealDb];
}

export function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match?.[1] ?? null;
}
