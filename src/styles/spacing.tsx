export const spacing = {
  // Base spacing values
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 40,

  // Specific spacing
  padding: {
    screen: 20,
    card: 16,
    button: {
      horizontal: 16,
      vertical: 8,
    },
  },

  // Border radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  // Icon sizes
  iconSize: {
    sm: 12,
    md: 24,
    lg: 28,
    xl: 64,
  },

  // Image sizes
  imageSize: {
    weatherIcon: 150,
    forecastIcon: 60,
  },
} as const;

export type SpacingKey = keyof typeof spacing;
