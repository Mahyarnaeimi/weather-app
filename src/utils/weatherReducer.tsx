// src/utils/weatherReducer.tsx

import { WeatherState, WeatherAction } from '../types/weather';

// Action types
export const WEATHER_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  FORECAST_START: 'FORECAST_START',
  FORECAST_SUCCESS: 'FORECAST_SUCCESS',
  FORECAST_ERROR: 'FORECAST_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET: 'RESET',
} as const;

// Initial state
export const initialWeatherState: WeatherState = {
  currentWeather: null,
  forecast: [],
  isLoading: false,
  isForecastLoading: false,
  error: null,
  lastSearchedCity: '',
};

// Reducer function
export const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
        lastSearchedCity: action.payload,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        currentWeather: action.payload,
        error: null,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        currentWeather: null,
        error: action.payload,
      };

    case 'FORECAST_START':
      return {
        ...state,
        isForecastLoading: true,
      };

    case 'FORECAST_SUCCESS':
      return {
        ...state,
        isForecastLoading: false,
        forecast: action.payload,
      };

    case 'FORECAST_ERROR':
      return {
        ...state,
        isForecastLoading: false,
        forecast: [],
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'RESET':
      return initialWeatherState;

    default:
      return state;
  }
};
