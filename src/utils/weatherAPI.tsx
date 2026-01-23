// src/utils/weatherAPI.tsx

import { CurrentWeatherResponse, ForecastItem, ForecastResponse } from '../types/weather';
import { API_CONFIG, API_ERRORS } from '../constants';

// Check if API key exists
export const validateAPIKey = (): boolean => {
  if (!API_CONFIG.API_KEY) {
    throw new Error(API_ERRORS.NO_API_KEY);
  }
  return true;
};

// Handle API errors
const handleAPIError = (status: number): never => {
  switch (status) {
    case 401:
      throw new Error(API_ERRORS.UNAUTHORIZED);
    case 404:
      throw new Error(API_ERRORS.CITY_NOT_FOUND);
    case 429:
      throw new Error(API_ERRORS.TOO_MANY_REQUESTS);
    case 500:
    case 502:
    case 503:
      throw new Error(API_ERRORS.SERVER_ERROR);
    default:
      throw new Error(API_ERRORS.UNKNOWN_ERROR);
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

// Build API URL
const buildUrl = (endpoint: string, params: Record<string, string | number>): string => {
  const searchParams = new URLSearchParams({
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    appid: API_CONFIG.API_KEY,
    units: API_CONFIG.UNITS,
  });
  return `${API_CONFIG.BASE_URL}${endpoint}?${searchParams.toString()}`;
};

// Fetch current weather by city name
export const fetchWeatherByCity = async (city: string): Promise<CurrentWeatherResponse> => {
  try {
    validateAPIKey();

    const url = buildUrl('/weather', { q: city });
    const response = await fetch(url);

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: CurrentWeatherResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(API_ERRORS.NETWORK_ERROR);
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

    const url = buildUrl('/forecast', { q: city });
    const response = await fetch(url);

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: ForecastResponse = await response.json();
    return processForecastData(data);
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(API_ERRORS.NETWORK_ERROR);
  }
};

// Fetch weather by coordinates
export const fetchWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<CurrentWeatherResponse> => {
  try {
    validateAPIKey();

    const url = buildUrl('/weather', { lat, lon });
    const response = await fetch(url);

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: CurrentWeatherResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(API_ERRORS.NETWORK_ERROR);
  }
};

// Fetch forecast by coordinates
export const fetchForecastByCoordinates = async (
  lat: number,
  lon: number
): Promise<ForecastItem[]> => {
  try {
    validateAPIKey();

    const url = buildUrl('/forecast', { lat, lon });
    const response = await fetch(url);

    if (!response.ok) {
      handleAPIError(response.status);
    }

    const data: ForecastResponse = await response.json();
    return processForecastData(data);
  } catch (error) {
    if (error instanceof Error && isKnownError(error.message)) {
      throw error;
    }
    throw new Error(API_ERRORS.NETWORK_ERROR);
  }
};
