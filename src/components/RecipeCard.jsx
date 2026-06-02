import { useState } from 'react';
import { getYoutubeId } from '../api/meals';
import YouTubeEmbed from './YouTubeEmbed';
import './RecipeCard.css';

export default function RecipeCard({
  meal,
  style,
  isFavorite,
  onToggleFavorite,
  onAddToPlanner,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('Lunch');
  const [plannerStatus, setPlannerStatus] = useState(null);

  const videoId = getYoutubeId(meal.strYoutube);

  const renderInstructions = (text) => {
    const steps = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (steps.length > 1) {
      return (
        <ol className="instruction-steps">
          {steps.map((step, i) => (
            <li key={i}>{step.replace(/^\d+[\.\)]\s*/, '')}</li>
          ))}
        </ol>
      );
    }
    return <p className="recipe-description">{text}</p>;
  };

  const handleAddToPlanner = () => {
    onAddToPlanner(meal, selectedDay, selectedTime);
    setPlannerStatus(`Added to ${selectedDay} ${selectedTime}!`);
    setTimeout(() => setPlannerStatus(null), 2500);
  };

  return (
    <article
      className={`recipe-card ${expanded ? 'expanded' : ''} fade-in-up`}
      style={style}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="recipe-thumb-wrap">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="recipe-thumb"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x225?text=Recipe+Image';
          }}
        />
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(meal);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="recipe-body">
        <h3 className="recipe-title">{meal.strMeal}</h3>
        <span className="recipe-id">ID: {meal.idMeal}</span>

        {expanded && (
          <div className="recipe-details" onClick={e => e.stopPropagation()}>
            <div className="recipe-badges">
              {meal.source === 'local' && <span className="tag tag-indian">🇮🇳 Indian</span>}
              {meal.strCategory && <span className="tag tag-accent">{meal.strCategory}</span>}
              {meal.strArea && meal.source !== 'local' && <span className="tag tag-pink">{meal.strArea}</span>}
            </div>

            {meal.strTags && (
              <div className="recipe-tags">
                {meal.strTags.split(',').filter(Boolean).slice(0, 3).map(tag => (
                  <span key={tag} className="tag tag-success">{tag.trim()}</span>
                ))}
              </div>
            )}

            <div className="recipe-ingredients">
              <span className="ingredients-label">🧂 Ingredients:</span>
              <div className="ingredient-pills">
                {meal.ingredients.map(ing => (
                  <span key={ing} className="ingredient-pill">{ing}</span>
                ))}
              </div>
            </div>

            {meal.missingIngredients && meal.missingIngredients.length > 0 && (
              <div className="recipe-missing">
                <span className="missing-label">⚠️ Missing Ingredients:</span>
                <div className="missing-pills">
                  {meal.missingIngredients.map(ing => (
                    <span key={ing} className="missing-pill">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="recipe-instructions-wrap">
              <span className="instructions-label">🍳 Instructions:</span>
              {renderInstructions(meal.strInstructions)}
            </div>

            {showVideo && videoId && (
              <div className="recipe-video-container">
                <YouTubeEmbed videoId={videoId} title={meal.strMeal} />
              </div>
            )}

            <div className="recipe-planner-assign">
              <span className="planner-assign-label">📅 Add to Meal Planner</span>
              <div className="planner-assign-controls">
                <select
                  value={selectedDay}
                  onChange={e => setSelectedDay(e.target.value)}
                  className="planner-select"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <select
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                  className="planner-select"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAddToPlanner}
                >
                  Add
                </button>
              </div>
              {plannerStatus && (
                <div className="planner-status-msg">{plannerStatus}</div>
              )}
            </div>

            <div className="recipe-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setExpanded(false)}
              >
                Close
              </button>

              {videoId ? (
                <button
                  id={`watch-video-${meal.idMeal}`}
                  className="btn btn-primary"
                  onClick={() => setShowVideo(v => !v)}
                >
                  {showVideo ? 'Hide Video' : 'Watch Video'}
                </button>
              ) : (
                <span className="no-video">No video available</span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
