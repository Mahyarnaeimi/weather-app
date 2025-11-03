import './ForecastCard.css';

const ForecastCard = ({ forecast, unit }) => {
  const { dt, main, weather, wind } = forecast;

  const date = new Date(dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const temp = unit === 'celsius'
    ? Math.round(main.temp)
    : Math.round((main.temp * 9/5) + 32);

  const tempMin = unit === 'celsius'
    ? Math.round(main.temp_min)
    : Math.round((main.temp_min * 9/5) + 32);

  const tempMax = unit === 'celsius'
    ? Math.round(main.temp_max)
    : Math.round((main.temp_max * 9/5) + 32);

  const weatherIcon = weather[0].icon;
  const weatherDescription = weather[0].description;

  return (
    <div className="forecast-card">
      <div className="forecast-date">
        <div className="forecast-day">{dayName}</div>
        <div className="forecast-date-str">{dateStr}</div>
        <div className="forecast-time">{time}</div>
      </div>

      <div className="forecast-icon-container">
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt={weatherDescription}
          className="forecast-icon"
        />
      </div>

      <div className="forecast-temp">
        <div className="forecast-temp-main">
          {temp}°{unit === 'celsius' ? 'C' : 'F'}
        </div>
        <div className="forecast-temp-range">
          <span className="temp-min">{tempMin}°</span>
          <span className="temp-separator">/</span>
          <span className="temp-max">{tempMax}°</span>
        </div>
      </div>

      <div className="forecast-description">
        {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
      </div>

      <div className="forecast-details">
        <div className="forecast-detail-item">
          <span className="forecast-detail-icon">💧</span>
          <span className="forecast-detail-value">{main.humidity}%</span>
        </div>
        <div className="forecast-detail-item">
          <span className="forecast-detail-icon">💨</span>
          <span className="forecast-detail-value">{wind.speed.toFixed(1)} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
