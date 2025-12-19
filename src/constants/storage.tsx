// AsyncStorage keys
export const STORAGE_KEYS = {
  TEMPERATURE_UNIT: '@weather_app_unit',
  LAST_CITY: '@weather_app_last_city',
  FAVORITES: '@weather_app_favorites',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
