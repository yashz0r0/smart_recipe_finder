import './RecipeCard.css';

export default function RecipeCard({ meal, style }) {
  return (
    <article className="recipe-card fade-in-up" style={style}>
      <div className="recipe-thumb-wrap">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="recipe-thumb"
          loading="lazy"
        />
      </div>
      <div className="recipe-body">
        <h3 className="recipe-title">{meal.strMeal}</h3>
        <span className="recipe-id">ID: {meal.idMeal}</span>
      </div>
    </article>
  );
}