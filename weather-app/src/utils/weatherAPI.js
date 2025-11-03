const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Error messages
const ERROR_MESSAGES = {
  NO_API_KEY: 'API key is missing. Please add VITE_OPENWEATHER_API_KEY to your .env file.',
  CITY_NOT_FOUND: 'City not found. Please check the spelling and try again.',
  NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
  UNAUTHORIZED: 'Invalid API key. Please check your OpenWeatherMap API key.',
  TOO_MANY_REQUESTS: 'Too many requests. Please wait a moment and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
};

// Check if API key exists
export const validateAPIKey = () => {
  if (!API_KEY) {
    throw new Error(ERROR_MESSAGES.NO_API_KEY);
  }
  return true;
};

// Handle API errors
const handleAPIError = (error) => {
  if (!error.response) {
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }

  const status = error.response.status;

  switch (status) {
    case 401:
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    case 404:
      throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
    case 429:
      throw new Error(ERROR_MESSAGES.TOO_MANY_REQUESTS);
    case 500:
    case 502:
    case 503:
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    default:
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

// Fetch current weather by city name
export const fetchWeatherByCity = async (city) => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const error = new Error('API request failed');
      error.response = { status: response.status };
      handleAPIError(error);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('API key') ||
        error.message.includes('City not found') ||
        error.message.includes('Network error') ||
        error.message.includes('Too many requests') ||
        error.message.includes('Server error')) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};

// Fetch 5-day forecast by city name
export const fetchForecastByCity = async (city) => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const error = new Error('API request failed');
      error.response = { status: response.status };
      handleAPIError(error);
    }

    const data = await response.json();

    // Filter to get one forecast per day at 12:00 PM
    const dailyForecasts = data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      return date.getHours() === 12;
    }).slice(0, 5);

    return dailyForecasts;
  } catch (error) {
    if (error.message.includes('API key') ||
        error.message.includes('City not found') ||
        error.message.includes('Network error') ||
        error.message.includes('Too many requests') ||
        error.message.includes('Server error')) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};

// Fetch weather by coordinates
export const fetchWeatherByCoordinates = async (lat, lon) => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const error = new Error('API request failed');
      error.response = { status: response.status };
      handleAPIError(error);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('API key') ||
        error.message.includes('Network error') ||
        error.message.includes('Too many requests') ||
        error.message.includes('Server error')) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};

// Fetch forecast by coordinates
export const fetchForecastByCoordinates = async (lat, lon) => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const error = new Error('API request failed');
      error.response = { status: response.status };
      handleAPIError(error);
    }

    const data = await response.json();

    // Filter to get one forecast per day at 12:00 PM
    const dailyForecasts = data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      return date.getHours() === 12;
    }).slice(0, 5);

    return dailyForecasts;
  } catch (error) {
    if (error.message.includes('API key') ||
        error.message.includes('City not found') ||
        error.message.includes('Network error') ||
        error.message.includes('Too many requests') ||
        error.message.includes('Server error')) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};
