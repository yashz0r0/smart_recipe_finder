import { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import './styles/theme.css';
import './App.css';

export default function App() {
  const [lastIngredients, setLastIngredients] = useState([]);

  const handleSearch = (ingredients) => {
    setLastIngredients(ingredients);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-name">Smart Recipe</span>
          </div>
        </div>
      </header>
      <main className="app-main">
        <IngredientInput onSearch={handleSearch} loading={false} />
        {lastIngredients.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <p>Searching recipes for: {lastIngredients.join(', ')}</p>
          </div>
        )}
      </main>
    </div>
  );
}