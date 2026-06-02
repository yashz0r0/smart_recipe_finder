import { useState, useRef, useEffect } from 'react';
import './IngredientInput.css';

export default function IngredientInput({ onSearch, loading }) {
  const [chips, setChips] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  // Auto-search whenever chips change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onSearch(chips);
  }, [chips]);

  const addChip = (raw) => {
    const parts = raw.split(/[,\n]+/).map(s => s.trim()).filter(Boolean);
    const newChips = parts
      .map(p => p.toLowerCase())
      .filter(p => !chips.includes(p));
    
    if (newChips.length) {
      setChips(prev => [...prev, ...newChips]);
    }
    setInputVal('');
  };

  const removeChip = (chip) => {
    setChips(prev => prev.filter(c => c !== chip));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputVal.trim()) {
        addChip(inputVal);
      }
    }
  };

  const handleAddClick = () => {
    if (inputVal.trim()) {
      addChip(inputVal);
    }
  };

  const examples = ['rice', 'onion', 'tomato', 'oil', 'garlic', 'chicken'];

  return (
    <div className="ingredient-input-wrapper">
      <div className="ingredient-card">
        <h2 className="ingredient-title">What's in your kitchen?</h2>
        
        <div className="input-row">
          <div className="input-container">
            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              className="search-input"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter an ingredient"
              aria-label="Ingredient input"
            />
          </div>
          <button
            className="add-button"
            onClick={handleAddClick}
            disabled={!inputVal.trim() && !loading}
          >
            + Add
          </button>
        </div>

        {chips.length > 0 && (
          <div className="chips-container">
            {chips.map(chip => (
              <span key={chip} className="ingredient-chip">
                {chip}
                <button
                  className="chip-remove-btn"
                  onClick={() => removeChip(chip)}
                  aria-label={`Remove ${chip}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="ingredient-examples">
          <span className="examples-label">Try:</span>
          {examples.map(ex => (
            <button
              key={ex}
              className="example-btn"
              onClick={() => setChips(prev => prev.includes(ex) ? prev : [...prev, ex])}
            >
              {ex}
            </button>
          ))}
          {chips.length > 0 && (
            <button className="clear-all-btn" onClick={() => setChips([])}>
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
