import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-wrapper" role="status" aria-label="Loading recipes">
      <div className="loader-ring" />
      <p className="loader-text">Searching recipes for you…</p>
    </div>
  );
}
