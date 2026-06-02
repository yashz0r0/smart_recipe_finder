import { useState } from 'react';
import { fetchRecipesByIngredients } from './api/meals';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import Loader from './components/Loader';
import './styles/theme.css';
import './App.css';

export default function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [lastIngredients, setLastIngredients] = useState([]);

  const handleSearch = async (ingredients) => {
    setLoading(true);
    setSearched(false);
    setLastIngredients(ingredients);
    try {
      const results = await fetchRecipesByIngredients(ingredients);
      setMeals(results);
      setSearched(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        <IngredientInput onSearch={handleSearch} loading={loading} />
        {loading ? (
          <Loader />
        ) : (
          <RecipeList
            meals={meals}
            searched={searched}
            ingredients={lastIngredients}
            favorites={[]}
            onToggleFavorite={() => {}}
            onAddToPlanner={() => {}}
          />
        )}
      </main>
    </div>
  );
}