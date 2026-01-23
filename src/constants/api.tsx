// OpenWeatherMap API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  ICON_URL: 'https://openweathermap.org/img/wn',
  API_KEY: 'e8169801b0b28dde9166d4116bc1914a', // Move to .env in production
  UNITS: 'metric',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  WEATHER: '/weather',
  FORECAST: '/forecast',
} as const;

// Error messages
export const API_ERRORS = {
  NO_API_KEY: 'API key is missing. Please configure your API key.',
  CITY_NOT_FOUND: 'City not found. Please check the spelling and try again.',
  NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
  UNAUTHORIZED: 'Invalid API key. Please check your OpenWeatherMap API key.',
  TOO_MANY_REQUESTS: 'Too many requests. Please wait a moment and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  LOCATION_DENIED: 'Location permission denied.',
  LOCATION_ERROR: 'Could not fetch weather for your location.',
} as const;

// Build weather icon URL
export const getWeatherIconUrl = (icon: string, size: '2x' | '4x' = '4x'): string => {
  return `${API_CONFIG.ICON_URL}/${icon}@${size}.png`;
};
