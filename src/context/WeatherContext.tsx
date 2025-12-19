import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useWeather } from '../hooks/useWeather';
import { useLocation } from '../hooks/useLocation';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';
import { CurrentWeatherResponse, ForecastItem, TemperatureUnit } from '../types/weather';

interface WeatherContextType {
  // Weather state
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastItem[];
  isLoading: boolean;
  isForecastLoading: boolean;
  error: string | null;
  lastSearchedCity: string;

  // Temperature unit
  unit: TemperatureUnit;
  toggleUnit: () => void;
  convertTemperature: (tempCelsius: number) => number;
  getUnitSymbol: () => string;

  // Location
  locationLoading: boolean;
  locationError: string | null;

  // Actions
  searchCity: (city: string) => Promise<void>;
  retry: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const weather = useWeather();
  const location = useLocation();
  const temperatureUnit = useTemperatureUnit();

  // Fetch weather for current location on mount
  useEffect(() => {
    const initializeWithLocation = async () => {
      if (!temperatureUnit.isLoaded) return;

      const coords = await location.getCurrentLocation();
      if (coords) {
        weather.fetchByCoordinates(coords.latitude, coords.longitude);
      }
    };

    initializeWithLocation();
  }, [temperatureUnit.isLoaded]);

  const value: WeatherContextType = {
    // Weather state
    currentWeather: weather.currentWeather,
    forecast: weather.forecast,
    isLoading: weather.isLoading,
    isForecastLoading: weather.isForecastLoading,
    error: weather.error,
    lastSearchedCity: weather.lastSearchedCity,

    // Temperature unit
    unit: temperatureUnit.unit,
    toggleUnit: temperatureUnit.toggleUnit,
    convertTemperature: temperatureUnit.convertTemperature,
    getUnitSymbol: temperatureUnit.getUnitSymbol,

    // Location
    locationLoading: location.isLoading,
    locationError: location.error,

    // Actions
    searchCity: weather.fetchByCity,
    retry: weather.retry,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};
