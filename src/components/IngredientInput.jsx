import { useState } from 'react';
import './IngredientInput.css';

export default function IngredientInput({ onSearch, loading }) {
  const [inputVal, setInputVal] = useState('');

  return (
    <div className="ingredient-input-wrapper">
      <div className="ingredient-card">
        <h2 className="ingredient-title">What's in your kitchen?</h2>
        <div className="input-row">
          <div className="input-container">
            <input
              className="search-input"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Enter an ingredient"
              aria-label="Ingredient input"
            />
          </div>
          <button className="add-button" disabled={!inputVal.trim()}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}