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
import { colors, typography, spacing, shadows } from '../styles';
import { getWeatherIconUrl } from '../constants';

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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
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
        <Image source={{ uri: getWeatherIconUrl(weatherIcon, '4x') }} style={styles.weatherIcon} />
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
            nestedScrollEnabled={true}
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
          <ActivityIndicator size="small" color={colors.primary} />
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
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  cityName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  unitToggle: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.xl,
  },
  unitToggleText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  mainWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing['3xl'],
  },
  weatherIcon: {
    width: spacing.imageSize.weatherIcon,
    height: spacing.imageSize.weatherIcon,
  },
  temperatureContainer: {
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  description: {
    fontSize: typography.fontSize.xl,
    color: colors.textSecondary,
    textTransform: 'capitalize',
    marginTop: -5,
  },
  feelsLike: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  detailCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    width: '48%',
    alignItems: 'center',
    ...shadows.card,
  },
  detailIcon: {
    fontSize: spacing.iconSize.lg,
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  forecastSection: {
    marginTop: spacing['3xl'],
  },
  forecastTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  forecastContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
  },
  forecastLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  forecastLoadingText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
});

export default WeatherDisplay;
