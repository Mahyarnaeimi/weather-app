import { useReducer, useCallback } from 'react';
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoordinates,
  fetchForecastByCoordinates,
} from '../utils/weatherAPI';
import { weatherReducer, initialWeatherState } from '../utils/weatherReducer';

export const useWeather = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  const fetchByCity = useCallback(async (city: string): Promise<void> => {
    dispatch({ type: 'FETCH_START', payload: city });
    dispatch({ type: 'FORECAST_START' });

    try {
      const weatherData = await fetchWeatherByCity(city);
      dispatch({ type: 'FETCH_SUCCESS', payload: weatherData });

      try {
        const forecastData = await fetchForecastByCity(city);
        dispatch({ type: 'FORECAST_SUCCESS', payload: forecastData });
      } catch (forecastError) {
        console.error('Forecast fetch failed:', forecastError);
        dispatch({ type: 'FORECAST_ERROR' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
    }
  }, []);

  const fetchByCoordinates = useCallback(
    async (latitude: number, longitude: number): Promise<void> => {
      dispatch({ type: 'FETCH_START', payload: 'your location' });
      dispatch({ type: 'FORECAST_START' });

      try {
        const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
        dispatch({ type: 'FETCH_SUCCESS', payload: weatherData });

        try {
          const forecastData = await fetchForecastByCoordinates(latitude, longitude);
          dispatch({ type: 'FORECAST_SUCCESS', payload: forecastData });
        } catch (forecastError) {
          console.error('Forecast fetch failed:', forecastError);
          dispatch({ type: 'FORECAST_ERROR' });
        }
      } catch (error) {
        console.error('Weather fetch failed:', error);
        dispatch({ type: 'FETCH_ERROR', payload: 'Could not fetch weather for your location' });
      }
    },
    []
  );

  const retry = useCallback((): void => {
    if (state.lastSearchedCity) {
      fetchByCity(state.lastSearchedCity);
    }
  }, [state.lastSearchedCity, fetchByCity]);

  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return {
    // State
    currentWeather: state.currentWeather,
    forecast: state.forecast,
    isLoading: state.isLoading,
    isForecastLoading: state.isForecastLoading,
    error: state.error,
    lastSearchedCity: state.lastSearchedCity,

    // Actions
    fetchByCity,
    fetchByCoordinates,
    retry,
    clearError,
  };
};
