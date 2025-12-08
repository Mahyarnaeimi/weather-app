import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LoadingSpinnerProps } from '../types/weather';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading weather data...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#667eea" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
