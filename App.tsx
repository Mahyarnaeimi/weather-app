import React, { useState, useEffect, useReducer } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchBar from './src/components/SearchBar';
import WeatherDisplay from './src/components/WeatherDisplay';
import ErrorMessage from './src/components/ErrorMessage';
import LoadingSpinner from './src/components/LoadingSpinner';

import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoordinates,
  fetchForecastByCoordinates,
} from './src/utils/weatherAPI';
import { weatherReducer, initialWeatherState } from './src/utils/weatherReducer';
import { TemperatureUnit } from './src/types/weather';

const STORAGE_KEY = '@weather_app_unit';

export default function App() {
  const [weatherState, dispatch] = useReducer(weatherReducer, initialWeatherState);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  // Load saved preferences and get location on mount
  useEffect(() => {
    const initializeApp = async () => {
      // Load saved unit preference
      try {
        const savedUnit = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUnit === 'celsius' || savedUnit === 'fahrenheit') {
          setUnit(savedUnit);
        }
      } catch (error) {
        console.log('Error loading unit preference:', error);
      }

      // Request location permission and fetch weather
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Location permission denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log('Location available:', latitude, longitude);

        // Fetch weather for user's location
        dispatch({ type: 'FETCH_START', payload: 'your location' });
        dispatch({ type: 'FORECAST_START' });

        try {
          const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
          dispatch({ type: 'FETCH_SUCCESS', payload: weatherData });

          // Fetch forecast
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
      } catch (error) {
        console.log('Location error:', error);
      }
    };

    initializeApp();
  }, []);

  // Save temperature unit preference
  useEffect(() => {
    const saveUnit = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, unit);
      } catch (error) {
        console.log('Error saving unit preference:', error);
      }
    };
    saveUnit();
  }, [unit]);

  // Handle city search
  const handleSearch = async (city: string): Promise<void> => {
    dispatch({ type: 'FETCH_START', payload: city });
    dispatch({ type: 'FORECAST_START' });

    try {
      const weatherData = await fetchWeatherByCity(city);
      dispatch({ type: 'FETCH_SUCCESS', payload: weatherData });

      // Fetch 5-day forecast
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
  };

  // Handle retry after error
  const handleRetry = (): void => {
    if (weatherState.lastSearchedCity) {
      handleSearch(weatherState.lastSearchedCity);
    }
  };

  // Toggle temperature unit
  const handleToggleUnit = (): void => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f8" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              <Text style={styles.weatherIcon}>🌤️</Text> Weather Forecast
            </Text>
            <Text style={styles.subtitle}>Get real-time weather updates for any city</Text>
          </View>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} isLoading={weatherState.isLoading} />

          {/* Main Content */}
          <View style={styles.main}>
            {weatherState.isLoading && <LoadingSpinner />}

            {weatherState.error && !weatherState.isLoading && (
              <ErrorMessage message={weatherState.error} onRetry={handleRetry} />
            )}

            {weatherState.currentWeather && !weatherState.isLoading && (
              <WeatherDisplay
                weather={weatherState.currentWeather}
                unit={unit}
                onToggleUnit={handleToggleUnit}
                forecast={weatherState.forecast}
                isForecastLoading={weatherState.isForecastLoading}
              />
            )}

            {!weatherState.currentWeather &&
              !weatherState.isLoading &&
              !weatherState.error && (
                <View style={styles.welcome}>
                  <Text style={styles.welcomeIcon}>🌍</Text>
                  <Text style={styles.welcomeTitle}>Welcome to Weather Forecast</Text>
                  <Text style={styles.welcomeText}>Enter a city name to get started</Text>

                  <View style={styles.features}>
                    <View style={styles.feature}>
                      <Text style={styles.featureIcon}>📍</Text>
                      <Text style={styles.featureText}>Real-time weather data</Text>
                    </View>
                    <View style={styles.feature}>
                      <Text style={styles.featureIcon}>📅</Text>
                      <Text style={styles.featureText}>5-day forecast</Text>
                    </View>
                    <View style={styles.feature}>
                      <Text style={styles.featureIcon}>🌡️</Text>
                      <Text style={styles.featureText}>Temperature in °C or °F</Text>
                    </View>
                  </View>
                </View>
              )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by OpenWeatherMap API</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  weatherIcon: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  main: {
    flex: 1,
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  welcomeIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  features: {
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#4b5563',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
