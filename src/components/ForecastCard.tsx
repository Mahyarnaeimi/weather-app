import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ForecastCardProps } from '../types/weather';
import { colors, typography, spacing, shadows } from '../styles';
import { getWeatherIconUrl } from '../constants';

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const { dt, main, weather, wind } = forecast;

  const date = new Date(dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const temp =
    unit === 'celsius' ? Math.round(main.temp) : Math.round((main.temp * 9) / 5 + 32);

  const tempMin =
    unit === 'celsius'
      ? Math.round(main.temp_min)
      : Math.round((main.temp_min * 9) / 5 + 32);

  const tempMax =
    unit === 'celsius'
      ? Math.round(main.temp_max)
      : Math.round((main.temp_max * 9) / 5 + 32);

  const weatherIcon = weather[0].icon;
  const weatherDescription = weather[0].description;

  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={styles.dayName}>{dayName}</Text>
        <Text style={styles.dateStr}>{dateStr}</Text>
      </View>

      <Image source={{ uri: getWeatherIconUrl(weatherIcon, '2x') }} style={styles.icon} />

      <View style={styles.tempContainer}>
        <Text style={styles.tempMain}>
          {temp}°{unit === 'celsius' ? 'C' : 'F'}
        </Text>
        <View style={styles.tempRange}>
          <Text style={styles.tempMin}>{tempMin}°</Text>
          <Text style={styles.tempSeparator}>/</Text>
          <Text style={styles.tempMax}>{tempMax}°</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={1}>
        {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
      </Text>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>💧</Text>
          <Text style={styles.detailValue}>{main.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>💨</Text>
          <Text style={styles.detailValue}>{wind.speed.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.lg,
    marginRight: spacing.md,
    width: 140,
    alignItems: 'center',
    ...shadows.card,
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dayName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  dateStr: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  icon: {
    width: spacing.imageSize.forecastIcon,
    height: spacing.imageSize.forecastIcon,
  },
  tempContainer: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  tempMain: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  tempMin: {
    fontSize: typography.fontSize.xs,
    color: colors.tempCold,
  },
  tempSeparator: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    marginHorizontal: spacing.xs,
  },
  tempMax: {
    fontSize: typography.fontSize.xs,
    color: colors.tempHot,
  },
  description: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: typography.fontSize.xs,
    marginRight: spacing.xs,
  },
  detailValue: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
});

export default ForecastCard;
