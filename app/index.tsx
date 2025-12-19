import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import SearchBar from '../src/components/SearchBar';
import WeatherDisplay from '../src/components/WeatherDisplay';
import ErrorMessage from '../src/components/ErrorMessage';
import LoadingSpinner from '../src/components/LoadingSpinner';

import { useWeatherContext } from '../src/context';
import { colors, typography, spacing } from '../src/styles';

export default function HomeScreen() {
  const {
    currentWeather,
    forecast,
    isLoading,
    isForecastLoading,
    error,
    unit,
    toggleUnit,
    searchCity,
    retry,
  } = useWeatherContext();

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <SearchBar onSearch={searchCity} isLoading={isLoading} />

          {/* Main Content */}
          <View style={styles.main}>
            {isLoading && <LoadingSpinner />}

            {error && !isLoading && <ErrorMessage message={error} onRetry={retry} />}

            {currentWeather && !isLoading && (
              <WeatherDisplay
                weather={currentWeather}
                unit={unit}
                onToggleUnit={toggleUnit}
                forecast={forecast}
                isForecastLoading={isForecastLoading}
              />
            )}

            {!currentWeather && !isLoading && !error && (
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  weatherIcon: {
    fontSize: typography.fontSize['3xl'],
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
  main: {
    flex: 1,
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['4xl'],
  },
  welcomeIcon: {
    fontSize: typography.fontSize['4xl'],
    marginBottom: spacing.xl,
  },
  welcomeTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  welcomeText: {
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing['3xl'],
  },
  features: {
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackgroundTransparent,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.borderRadius.md,
    marginBottom: spacing.md,
  },
  featureIcon: {
    fontSize: typography.fontSize['2xl'],
    marginRight: spacing.lg,
  },
  featureText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
});
