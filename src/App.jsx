import { useState } from 'react';
import { fetchRecipesByIngredients } from './api/meals';
import { LOCAL_RECIPES } from './api/localRecipes';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import RecipeCard from './components/RecipeCard';
import Loader from './components/Loader';
import './styles/theme.css';
import './App.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

export default function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [lastIngredients, setLastIngredients] = useState([]);
  
  // Navigation active view tab
  const [activeTab, setActiveTab] = useState('recipes');

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });

  // Weekly Meal Planner state
  const [planner, setPlanner] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mealPlanner') || '{}');
    } catch {
      return {};
    }
  });

  // Track which planner slot is currently in "choose" select mode
  const [activeAddSlot, setActiveAddSlot] = useState(null);

  const handleSearch = async (ingredients) => {
    setLoading(true);
    setError(null);
    setSearched(false);
    setLastIngredients(ingredients);

    try {
      const results = await fetchRecipesByIngredients(ingredients);
      setMeals(results);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Operations: Favorites
  const toggleFavorite = (meal) => {
    setFavorites(prev => {
      const exists = prev.some(m => m.idMeal === meal.idMeal);
      let next;
      if (exists) {
        next = prev.filter(m => m.idMeal !== meal.idMeal);
      } else {
        next = [...prev, meal];
      }
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  // Operations: Meal Planner
  const addToPlanner = (meal, day, type) => {
    setPlanner(prev => {
      const next = {
        ...prev,
        [day]: {
          ...(prev[day] || {}),
          [type]: meal,
        },
      };
      localStorage.setItem('mealPlanner', JSON.stringify(next));
      return next;
    });
  };

  const removeFromPlanner = (day, type) => {
    setPlanner(prev => {
      const dayMeals = { ...(prev[day] || {}) };
      delete dayMeals[type];
      const next = {
        ...prev,
        [day]: dayMeals,
      };
      localStorage.setItem('mealPlanner', JSON.stringify(next));
      return next;
    });
  };

  const handleInlinePlannerAdd = (day, type, recipeId) => {
    if (!recipeId) return;

    // Search local database
    const localMatch = LOCAL_RECIPES.find(m => m.idMeal === recipeId);
    if (localMatch) {
      addToPlanner({ ...localMatch, source: 'local' }, day, type);
      return;
    }

    // Search favorites
    const favMatch = favorites.find(m => m.idMeal === recipeId);
    if (favMatch) {
      addToPlanner(favMatch, day, type);
      return;
    }
  };

  return (
    <div className="app">
      {/* ─── Header ─── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo" onClick={() => setActiveTab('recipes')} style={{ cursor: 'pointer' }}>
            <span className="logo-name">Smart Recipe</span>
          </div>
          <nav className="nav-links">
            <button
              className={`nav-link ${activeTab === 'recipes' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipes')}
            >
              Recipes
            </button>
            <button
              className={`nav-link ${activeTab === 'planner' ? 'active' : ''}`}
              onClick={() => setActiveTab('planner')}
            >
              Meal Planner
            </button>
            <button
              className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="app-main">
        {activeTab === 'recipes' && (
          <>
            <IngredientInput onSearch={handleSearch} loading={loading} />

            {error && (
              <div className="error-banner" role="alert">
                ⚠️ {error}
              </div>
            )}

            {loading ? (
              <Loader />
            ) : (
              <RecipeList
                meals={meals}
                searched={searched}
                ingredients={lastIngredients}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToPlanner={addToPlanner}
              />
            )}
          </>
        )}

        {activeTab === 'favorites' && (
          <section className="favorites-section fade-in-up">
            <div className="results-header">
              <h2 className="results-title">Favorite Recipes</h2>
            </div>
            {favorites.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">❤️</span>
                <h3>No favorites saved yet</h3>
                <p>Click the heart icon on any recipe to save it here for quick access!</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('recipes')}>
                  Browse Recipes
                </button>
              </div>
            ) : (
              <div className="recipe-grid">
                {favorites.map(meal => (
                  <RecipeCard
                    key={meal.idMeal}
                    meal={meal}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onAddToPlanner={addToPlanner}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'planner' && (
          <section className="planner-section fade-in-up">
            <div className="results-header">
              <h2 className="results-title">Weekly Meal Planner</h2>
            </div>
            <div className="planner-grid">
              {DAYS.map(day => (
                <div key={day} className="planner-day-card">
                  <h3 className="planner-day-title">{day}</h3>
                  <div className="planner-meals">
                    {MEAL_TYPES.map(type => {
                      const meal = planner[day]?.[type];
                      const isAdding = activeAddSlot?.day === day && activeAddSlot?.type === type;

                      return (
                        <div key={type} className="planner-meal-slot">
                          <span className="meal-type-label">{type}</span>
                          {meal ? (
                            <div className="planner-meal-item">
                              <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="planner-meal-thumb"
                              />
                              <div className="planner-meal-info">
                                <span className="planner-meal-name">{meal.strMeal}</span>
                                <button
                                  className="remove-planner-item"
                                  onClick={() => removeFromPlanner(day, type)}
                                  title={`Remove ${meal.strMeal} from ${day} ${type}`}
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ) : isAdding ? (
                            <div className="planner-meal-empty selecting">
                              <select
                                className="planner-inline-select"
                                onChange={e => {
                                  handleInlinePlannerAdd(day, type, e.target.value);
                                  setActiveAddSlot(null);
                                }}
                                onBlur={() => setTimeout(() => setActiveAddSlot(null), 200)}
                                defaultValue=""
                                autoFocus
                              >
                                <option value="" disabled>Choose a recipe...</option>
                                {favorites.length > 0 && (
                                  <optgroup label="Favorites">
                                    {favorites.map(f => (
                                      <option key={f.idMeal} value={f.idMeal}>
                                        {f.strMeal}
                                      </option>
                                    ))}
                                  </optgroup>
                                )}
                                <optgroup label="All Recipes">
                                  {LOCAL_RECIPES.map(r => (
                                    <option key={r.idMeal} value={r.idMeal}>
                                      {r.strMeal}
                                    </option>
                                  ))}
                                </optgroup>
                              </select>
                            </div>
                          ) : (
                            <div className="planner-meal-empty">
                              <span className="empty-slot-text">No meal planned</span>
                              <button
                                className="btn-add-slot"
                                onClick={() => setActiveAddSlot({ day, type })}
                              >
                                + Add Meal
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="app-footer">
        <p>
          Recipe data by{' '}
          <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer">
            TheMealDB
          </a>{' '}
          · Free & open API · No sign‑up needed
        </p>
      </footer>
    </div>
  );
}
