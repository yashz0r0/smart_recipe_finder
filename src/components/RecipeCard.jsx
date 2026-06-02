import { useState } from 'react';
import { getYoutubeId } from '../api/meals';
import YouTubeEmbed from './YouTubeEmbed';
import './RecipeCard.css';

export default function RecipeCard({ meal, style, isFavorite, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoId = getYoutubeId(meal.strYoutube);

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
            {showVideo && videoId && (
              <div className="recipe-video-container">
                <YouTubeEmbed videoId={videoId} title={meal.strMeal} />
              </div>
            )}
            <div className="recipe-actions">
              <button className="btn btn-secondary" onClick={() => setExpanded(false)}>
                Close
              </button>
              {videoId && (
                <button className="btn btn-primary" onClick={() => setShowVideo(v => !v)}>
                  {showVideo ? 'Hide Video' : 'Watch Video'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}