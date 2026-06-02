import { useState } from 'react';
import './RecipeCard.css';

export default function RecipeCard({ meal, style, isFavorite, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`recipe-card ${expanded ? 'expanded' : ''} fade-in-up`}
      style={style}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="recipe-thumb-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-thumb" />
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(meal);
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="recipe-body">
        <h3 className="recipe-title">{meal.strMeal}</h3>
        <span className="recipe-id">ID: {meal.idMeal}</span>
        {expanded && (
          <div className="recipe-details" onClick={e => e.stopPropagation()}>
            <div className="recipe-ingredients">
              <span className="ingredients-label">🧂 Ingredients:</span>
              <div className="ingredient-pills">
                {meal.ingredients.map(ing => (
                  <span key={ing} className="ingredient-pill">{ing}</span>
                ))}
              </div>
            </div>
            <div className="recipe-instructions-wrap">
              <span className="instructions-label">🍳 Instructions:</span>
              <p className="recipe-description">{meal.strInstructions}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}