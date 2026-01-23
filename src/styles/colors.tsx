export const colors = {
  // Primary colors
  primary: '#667eea',
  primaryLight: '#87CEEB',

  // Background colors
  background: '#87CEEB',
  cardBackground: '#e8e8e8',
  cardBackgroundTransparent: 'rgba(255, 255, 255, 0.8)',

  // Text colors
  textPrimary: '#1f2937',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  textLight: '#9ca3af',

  // Status colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',

  // Temperature colors
  tempHot: '#ef4444',
  tempCold: '#3b82f6',

  // UI colors
  white: '#ffffff',
  black: '#000000',
  border: '#e5e7eb',
  shadow: '#000000',

  // Button colors
  buttonPrimary: '#667eea',
  buttonText: '#ffffff',
} as const;

export type ColorKey = keyof typeof colors;
