import { CurrentWeatherResponse, ForecastItem, ForecastResponse } from '../types/weather';

// API Key - In production, use environment variables
const API_KEY = 'e8169801b0b28dde9166d4116bc1914a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Error messages
const ERROR_MESSAGES = {
  NO_API_KEY: 'API key is missing. Please configure your API key.',
  CITY_NOT_FOUND: 'City not found. Please check the spelling and try again.',
  NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
  UNAUTHORIZED: 'Invalid API key. Please check your OpenWeatherMap API key.',
  TOO_MANY_REQUESTS: 'Too many requests. Please wait a moment and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

// Check if API key exists
export const validateAPIKey = (): boolean => {
  if (!API_KEY) {
    throw new Error(ERROR_MESSAGES.NO_API_KEY);
  }
  return true;
};

// Handle API errors
const handleAPIError = (status: number): never => {
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

// Check if error is a known error
const isKnownError = (message: string): boolean => {
  return (
    message.includes('API key') ||
    message.includes('City not found') ||
    message.includes('Network error') ||
    message.includes('Too many requests') ||
    message.includes('Server error')
  );
};

// Fetch current weather by city name
export const fetchWeatherByCity = async (city: string): Promise<CurrentWeatherResponse> => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: CurrentWeatherResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};

// Process forecast data to get daily forecasts
const processForecastData = (data: ForecastResponse): ForecastItem[] => {
  const dailyForecasts: ForecastItem[] = [];
  const seenDates = new Set<string>();

  // First pass: try to get midday forecasts (9 AM - 3 PM)
  for (const item of data.list) {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();

    if (seenDates.has(dateKey)) continue;

    const hour = date.getHours();
    if (hour >= 9 && hour <= 15) {
      seenDates.add(dateKey);
      dailyForecasts.push(item);

      if (dailyForecasts.length >= 5) break;
    }
  }

  // If we don't have 5 forecasts, get first forecast of each day
  if (dailyForecasts.length < 5) {
    seenDates.clear();
    dailyForecasts.length = 0;

    for (const item of data.list) {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!seenDates.has(dateKey)) {
        seenDates.add(dateKey);
        dailyForecasts.push(item);

        if (dailyForecasts.length >= 5) break;
      }
    }
  }

  return dailyForecasts;
};

// Fetch 5-day forecast by city name
export const fetchForecastByCity = async (city: string): Promise<ForecastItem[]> => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: ForecastResponse = await response.json();
    return processForecastData(data);
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};

// Fetch weather by coordinates
export const fetchWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<CurrentWeatherResponse> => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: CurrentWeatherResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};

// Fetch forecast by coordinates
export const fetchForecastByCoordinates = async (
  lat: number,
  lon: number
): Promise<ForecastItem[]> => {
  try {
    validateAPIKey();

    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: ForecastResponse = await response.json();
    return processForecastData(data);
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};
