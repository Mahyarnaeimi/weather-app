import { useState, useEffect, useReducer } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastCard from './components/ForecastCard';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherByCity, fetchForecastByCity } from './utils/weatherAPI';
import { weatherReducer, initialWeatherState, WEATHER_ACTIONS } from './utils/weatherReducer';
import './App.css';

function App() {
  // useReducer for complex weather state management
  const [weatherState, dispatch] = useReducer(weatherReducer, initialWeatherState);

  // useState for temperature unit
  const [unit, setUnit] = useState('celsius');

  // useEffect to load saved preferences on mount
  useEffect(() => {
    const savedUnit = localStorage.getItem('temperatureUnit');
    if (savedUnit) {
      setUnit(savedUnit);
    }

    // Try to get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Could implement auto-fetch based on location here
          console.log('Location available:', position.coords);
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  // Save temperature unit preference
  useEffect(() => {
    localStorage.setItem('temperatureUnit', unit);
  }, [unit]);

  // Handle city search
  const handleSearch = async (city) => {
    dispatch({ type: WEATHER_ACTIONS.FETCH_START, payload: city });
    dispatch({ type: WEATHER_ACTIONS.FORECAST_START });

    try {
      // Fetch current weather
      const weatherData = await fetchWeatherByCity(city);
      dispatch({ type: WEATHER_ACTIONS.FETCH_SUCCESS, payload: weatherData });

      // Fetch 5-day forecast
      try {
        const forecastData = await fetchForecastByCity(city);
        dispatch({ type: WEATHER_ACTIONS.FORECAST_SUCCESS, payload: forecastData });
      } catch (forecastError) {
        console.error('Forecast fetch failed:', forecastError);
        dispatch({ type: WEATHER_ACTIONS.FORECAST_ERROR });
      }
    } catch (error) {
      dispatch({ type: WEATHER_ACTIONS.FETCH_ERROR, payload: error.message });
    }
  };

  // Handle retry after error
  const handleRetry = () => {
    if (weatherState.lastSearchedCity) {
      handleSearch(weatherState.lastSearchedCity);
    }
  };

  // Toggle temperature unit
  const handleToggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="weather-icon">🌤️</span>
            Weather Forecast
          </h1>
          <p className="app-subtitle">Get real-time weather updates for any city</p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={weatherState.isLoading} />

        <main className="app-main">
          {weatherState.isLoading && <LoadingSpinner />}

          {weatherState.error && !weatherState.isLoading && (
            <ErrorMessage message={weatherState.error} onRetry={handleRetry} />
          )}

          {weatherState.currentWeather && !weatherState.isLoading && (
            <div className="weather-content">
              <WeatherDisplay
                weather={weatherState.currentWeather}
                unit={unit}
                onToggleUnit={handleToggleUnit}
              />

              {weatherState.forecast.length > 0 && (
                <div className="forecast-section">
                  <h2 className="forecast-title">5-Day Forecast</h2>
                  <div className="forecast-container">
                    {weatherState.forecast.map((forecast) => (
                      <ForecastCard
                        key={forecast.dt}
                        forecast={forecast}
                        unit={unit}
                      />
                    ))}
                  </div>
                </div>
              )}

              {weatherState.isForecastLoading && (
                <div className="forecast-loading">
                  <LoadingSpinner message="Loading forecast..." />
                </div>
              )}
            </div>
          )}

          {!weatherState.currentWeather &&
           !weatherState.isLoading &&
           !weatherState.error && (
            <div className="welcome-message">
              <div className="welcome-icon">🌍</div>
              <h2>Welcome to Weather Forecast</h2>
              <p>Enter a city name to get started</p>
              <div className="welcome-features">
                <div className="feature">
                  <span className="feature-icon">📍</span>
                  <span>Real-time weather data</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">📅</span>
                  <span>5-day forecast</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌡️</span>
                  <span>Temperature in °C or °F</span>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>Powered by OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
