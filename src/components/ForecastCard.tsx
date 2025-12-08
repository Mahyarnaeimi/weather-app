import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ForecastCardProps } from '../types/weather';

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

      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` }}
        style={styles.icon}
      />

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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  dateStr: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  icon: {
    width: 60,
    height: 60,
  },
  tempContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  tempMain: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tempMin: {
    fontSize: 12,
    color: '#3b82f6',
  },
  tempSeparator: {
    fontSize: 12,
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  tempMax: {
    fontSize: 12,
    color: '#ef4444',
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default ForecastCard;
