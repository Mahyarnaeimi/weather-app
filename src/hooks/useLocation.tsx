import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;
  permissionGranted: boolean;
}

interface UseLocationReturn extends LocationState {
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<{ latitude: number; longitude: number } | null>;
}

export const useLocation = (): UseLocationReturn => {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    isLoading: false,
    error: null,
    permissionGranted: false,
  });

  const requestPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setState((prev) => ({ ...prev, permissionGranted: granted }));
      return granted;
    } catch (error) {
      setState((prev) => ({ ...prev, error: 'Failed to request location permission' }));
      return false;
    }
  };

  const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const hasPermission = state.permissionGranted || (await requestPermission());

      if (!hasPermission) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Location permission denied',
        }));
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setState((prev) => ({
        ...prev,
        latitude,
        longitude,
        isLoading: false,
        error: null,
      }));

      return { latitude, longitude };
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to get current location',
      }));
      return null;
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return {
    ...state,
    requestPermission,
    getCurrentLocation,
  };
};
