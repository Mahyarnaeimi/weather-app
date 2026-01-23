// Weather condition code to emoji mapping
// Based on OpenWeatherMap condition codes: https://openweathermap.org/weather-conditions

export const weatherEmojis: Record<string, string> = {
  // Clear
  '01d': '☀️',  // clear sky day
  '01n': '🌙',  // clear sky night

  // Few clouds
  '02d': '🌤️',  // few clouds day
  '02n': '☁️',  // few clouds night

  // Scattered clouds
  '03d': '⛅',  // scattered clouds day
  '03n': '☁️',  // scattered clouds night

  // Broken clouds
  '04d': '☁️',  // broken clouds day
  '04n': '☁️',  // broken clouds night

  // Shower rain
  '09d': '🌧️',  // shower rain day
  '09n': '🌧️',  // shower rain night

  // Rain
  '10d': '🌦️',  // rain day
  '10n': '🌧️',  // rain night

  // Thunderstorm
  '11d': '⛈️',  // thunderstorm day
  '11n': '⛈️',  // thunderstorm night

  // Snow
  '13d': '❄️',  // snow day
  '13n': '❄️',  // snow night

  // Mist/Fog
  '50d': '🌫️',  // mist day
  '50n': '🌫️',  // mist night
};

export const getWeatherEmoji = (iconCode: string): string => {
  return weatherEmojis[iconCode] || '🌡️';
};
