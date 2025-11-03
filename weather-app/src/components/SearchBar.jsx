import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setError('');
    onSearch(city.trim());
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city name (e.g., London, New York)"
            className={`search-input ${error ? 'error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-loading">Searching...</span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
        {error && <p className="search-error">{error}</p>}
      </form>
    </div>
  );
};

export default SearchBar;
