import RecipeCard from './RecipeCard';
import './RecipeList.css';

export default function RecipeList({
  meals,
  searched,
  ingredients,
  favorites,
  onToggleFavorite,
  onAddToPlanner,
}) {
  if (!searched) return null;

  if (meals.length === 0) {
    return (
      <div className="no-results fade-in-up">
        <div className="no-results-icon">😕</div>
        <h3>No exact matches found</h3>
        <p>
          We couldn't find dishes using <em>only</em>{' '}
          <strong>{ingredients.join(', ')}</strong>.
        </p>
        <p className="no-results-tip">
          💡 Try adding one or two more items from your pantry, or broaden with a common ingredient like <strong>garlic</strong> or <strong>oil</strong>.
        </p>
      </div>
    );
  }

  return (
    <section className="recipe-list-section" aria-label="Recipe results">
      <div className="results-header fade-in-up">
        <h2 className="results-title">Matching Recipes</h2>
      </div>
      <div className="recipe-grid">
        {meals.map((meal, idx) => (
          <RecipeCard
            key={meal.idMeal}
            meal={meal}
            style={{ animationDelay: `${idx * 60}ms` }}
            isFavorite={favorites.some(f => f.idMeal === meal.idMeal)}
            onToggleFavorite={onToggleFavorite}
            onAddToPlanner={onAddToPlanner}
          />
        ))}
      </div>
    </section>
  );
}
