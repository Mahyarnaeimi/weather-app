import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { WeatherDisplayProps } from '../types/weather';
import ForecastCard from './ForecastCard';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  unit,
  onToggleUnit,
  forecast = [],
  isForecastLoading = false,
}) => {
  if (!weather) return null;

  const { name, main, weather: weatherInfo, wind, sys, visibility } = weather;
  const weatherIcon = weatherInfo[0].icon;
  const weatherDescription = weatherInfo[0].description;

  const temperature =
    unit === 'celsius' ? Math.round(main.temp) : Math.round((main.temp * 9) / 5 + 32);

  const feelsLike =
    unit === 'celsius'
      ? Math.round(main.feels_like)
      : Math.round((main.feels_like * 9) / 5 + 32);

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with city name and unit toggle */}
      <View style={styles.header}>
        <View>
          <Text style={styles.cityName}>
            {name}, {sys.country}
          </Text>
        </View>
        <TouchableOpacity style={styles.unitToggle} onPress={onToggleUnit} activeOpacity={0.7}>
          <Text style={styles.unitToggleText}>{unit === 'celsius' ? '°F' : '°C'}</Text>
        </TouchableOpacity>
      </View>

      {/* Main weather display */}
      <View style={styles.mainWeather}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}@4x.png` }}
          style={styles.weatherIcon}
        />
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>
            {temperature}°{unit === 'celsius' ? 'C' : 'F'}
          </Text>
          <Text style={styles.description}>
            {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
          </Text>
          <Text style={styles.feelsLike}>
            Feels like {feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
          </Text>
        </View>
      </View>

      {/* Weather details grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>💧</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{main.humidity}%</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>💨</Text>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{wind.speed} m/s</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>🌡️</Text>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{main.pressure} hPa</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>👁️</Text>
          <Text style={styles.detailLabel}>Visibility</Text>
          <Text style={styles.detailValue}>{(visibility / 1000).toFixed(1)} km</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>🌅</Text>
          <Text style={styles.detailLabel}>Sunrise</Text>
          <Text style={styles.detailValue}>{formatTime(sys.sunrise)}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailIcon}>🌇</Text>
          <Text style={styles.detailLabel}>Sunset</Text>
          <Text style={styles.detailValue}>{formatTime(sys.sunset)}</Text>
        </View>
      </View>

      {/* 5-Day Forecast Section */}
      {forecast && forecast.length > 0 && (
        <View style={styles.forecastSection}>
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastContainer}
          >
            {forecast.map((forecastItem) => (
              <ForecastCard key={forecastItem.dt} forecast={forecastItem} unit={unit} />
            ))}
          </ScrollView>
        </View>
      )}

      {isForecastLoading && (
        <View style={styles.forecastLoading}>
          <ActivityIndicator size="small" color="#667eea" />
          <Text style={styles.forecastLoadingText}>Loading forecast...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  unitToggle: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unitToggleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  mainWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temperatureContainer: {
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: 64,
    fontWeight: '700',
    color: '#1f2937',
  },
  description: {
    fontSize: 20,
    color: '#4b5563',
    textTransform: 'capitalize',
    marginTop: -5,
  },
  feelsLike: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 12,
  },
  detailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  forecastSection: {
    marginTop: 30,
    paddingBottom: 20,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  forecastContainer: {
    paddingHorizontal: 20,
  },
  forecastLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  forecastLoadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#6b7280',
  },
});

export default WeatherDisplay;
