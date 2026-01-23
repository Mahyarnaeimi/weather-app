import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LoadingSpinnerProps } from '../types/weather';
import { colors, typography, spacing } from '../styles';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading weather data...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
  },
  message: {
    marginTop: spacing.lg,
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
