import './WeatherDisplay.css';

const WeatherDisplay = ({ weather, unit, onToggleUnit }) => {
  if (!weather) return null;

  const { name, main, weather: weatherInfo, wind, sys } = weather;
  const weatherIcon = weatherInfo[0].icon;
  const weatherDescription = weatherInfo[0].description;

  const temperature = unit === 'celsius'
    ? Math.round(main.temp)
    : Math.round((main.temp * 9/5) + 32);

  const feelsLike = unit === 'celsius'
    ? Math.round(main.feels_like)
    : Math.round((main.feels_like * 9/5) + 32);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="weather-display">
      <div className="weather-header">
        <h2 className="city-name">
          {name}, {sys.country}
        </h2>
        <button
          className="unit-toggle"
          onClick={onToggleUnit}
          aria-label="Toggle temperature unit"
        >
          {unit === 'celsius' ? '°F' : '°C'}
        </button>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
            alt={weatherDescription}
            className="weather-icon"
          />
        </div>
        <div className="temperature-container">
          <div className="temperature">
            {temperature}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
          <div className="weather-description">
            {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
          </div>
          <div className="feels-like">
            Feels like {feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{main.humidity}%</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <div className="detail-label">Wind Speed</div>
            <div className="detail-value">{wind.speed} m/s</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <div className="detail-label">Pressure</div>
            <div className="detail-value">{main.pressure} hPa</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <div className="detail-label">Visibility</div>
            <div className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌅</div>
          <div className="detail-content">
            <div className="detail-label">Sunrise</div>
            <div className="detail-value">{formatTime(sys.sunrise)}</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌇</div>
          <div className="detail-content">
            <div className="detail-label">Sunset</div>
            <div className="detail-value">{formatTime(sys.sunset)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
