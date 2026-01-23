import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TemperatureUnit } from '../types/weather';
import { STORAGE_KEYS } from '../constants';

export const useTemperatureUnit = () => {
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const loadUnit = async () => {
      try {
        const savedUnit = await AsyncStorage.getItem(STORAGE_KEYS.TEMPERATURE_UNIT);
        if (savedUnit === 'celsius' || savedUnit === 'fahrenheit') {
          setUnit(savedUnit);
        }
      } catch (error) {
        console.log('Error loading unit preference:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadUnit();
  }, []);

  // Save preference when changed
  useEffect(() => {
    if (!isLoaded) return;

    const saveUnit = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.TEMPERATURE_UNIT, unit);
      } catch (error) {
        console.log('Error saving unit preference:', error);
      }
    };
    saveUnit();
  }, [unit, isLoaded]);

  const toggleUnit = useCallback((): void => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }, []);

  const convertTemperature = useCallback(
    (tempCelsius: number): number => {
      if (unit === 'celsius') {
        return Math.round(tempCelsius);
      }
      return Math.round((tempCelsius * 9) / 5 + 32);
    },
    [unit]
  );

  const getUnitSymbol = useCallback((): string => {
    return unit === 'celsius' ? '°C' : '°F';
  }, [unit]);

  return {
    unit,
    isLoaded,
    toggleUnit,
    convertTemperature,
    getUnitSymbol,
  };
};
