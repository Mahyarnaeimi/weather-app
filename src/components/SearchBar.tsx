import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SearchBarProps } from '../types/weather';
import { colors, typography, spacing, shadows } from '../styles';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (): void => {
    Keyboard.dismiss();

    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setError('');
    onSearch(city.trim());
  };

  const handleChange = (text: string): void => {
    setCity(text);
    if (error) setError('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={city}
          onChangeText={handleChange}
          placeholder="Enter city name (e.g., London)"
          placeholderTextColor={colors.textLight}
          editable={!isLoading}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={styles.buttonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 6,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    ...shadows.card,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.sm + 6,
    shadowColor: colors.buttonPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: colors.textLight,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
  },
});

export default SearchBar;
