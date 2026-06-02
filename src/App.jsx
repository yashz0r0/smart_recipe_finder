import './styles/theme.css';
import './App.css';

export default function App() {
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
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Welcome to Smart Recipe Finder</h2>
          <p>Find recipes you can cook with ingredients in your fridge.</p>
        </div>
      </main>
    </div>
  );
}