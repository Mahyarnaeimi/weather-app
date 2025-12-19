import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ErrorMessageProps } from '../types/weather';
import { colors, typography, spacing } from '../styles';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>Oops! Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.7}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef2f2',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing['2xl'],
    marginHorizontal: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: '#991b1b',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.md,
    borderRadius: spacing.borderRadius.sm + 2,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default ErrorMessage;
