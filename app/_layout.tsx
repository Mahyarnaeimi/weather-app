// app/_layout.tsx

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { WeatherProvider } from '../src/context';
import { colors } from '../src/styles';

export default function RootLayout() {
  return (
    <WeatherProvider>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </WeatherProvider>
  );
}
