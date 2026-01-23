# Weather App Mobile (React Native)

A mobile weather application built with React Native, Expo Router, and TypeScript. This is the mobile version of the Weather Forecast web application.

## Features

- Real-time weather data for any city
- 5-day weather forecast
- Automatic location detection
- Temperature unit toggle (Celsius/Fahrenheit)
- Clean and modern UI design
- Persistent user preferences
- File-based routing with Expo Router
- Professional architecture with separated concerns

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **Context API** - Global state management
- **Custom Hooks** - Reusable logic
- **OpenWeatherMap API** - Weather data

## Project Structure

```
weather-app/
├── app/
│   ├── _layout.tsx            # Root layout with WeatherProvider
│   └── index.tsx              # Home screen
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx      # City search input
│   │   ├── WeatherDisplay.tsx # Main weather display
│   │   ├── ForecastCard.tsx   # Forecast item card
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   └── ErrorMessage.tsx   # Error display
│   ├── context/
│   │   ├── WeatherContext.tsx # Global weather state
│   │   └── index.tsx          # Context exports
│   ├── hooks/
│   │   ├── useWeather.tsx     # Weather data hook
│   │   ├── useLocation.tsx    # Location hook
│   │   ├── useTemperatureUnit.tsx # Unit preference hook
│   │   └── index.tsx          # Hooks exports
│   ├── styles/
│   │   ├── colors.tsx         # Color palette
│   │   ├── typography.tsx     # Font sizes and weights
│   │   ├── spacing.tsx        # Spacing and sizes
│   │   ├── shadows.tsx        # Shadow styles
│   │   └── index.tsx          # Styles exports
│   ├── constants/
│   │   ├── api.tsx            # API configuration
│   │   ├── storage.tsx        # Storage keys
│   │   └── index.tsx          # Constants exports
│   ├── types/
│   │   └── weather.tsx        # TypeScript interfaces
│   └── utils/
│       ├── weatherAPI.tsx     # API functions
│       └── weatherReducer.tsx # State reducer
├── assets/                    # App icons and images
├── app.json                   # Expo configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript config
```

## Architecture

### Context API
The app uses React Context for global state management:
- `WeatherContext` provides weather data, loading states, and actions to all components
- `WeatherProvider` wraps the app in `_layout.tsx`

### Custom Hooks
Reusable logic is extracted into custom hooks:
- `useWeather` - Fetches and manages weather data
- `useLocation` - Handles device location
- `useTemperatureUnit` - Manages temperature unit preference with persistence

### Centralized Styles
All styling constants are centralized:
- `colors` - Color palette for consistent theming
- `typography` - Font sizes and weights
- `spacing` - Margins, paddings, and sizes
- `shadows` - Shadow presets for cards

### Constants
Configuration values are separated:
- `API_CONFIG` - API URLs and keys
- `API_ERRORS` - Error messages
- `STORAGE_KEYS` - AsyncStorage keys

## Installation

1. Make sure you have Node.js and npm installed

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## API Key

The app uses OpenWeatherMap API. For production use:

1. Get your own API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Update the API key in `src/constants/api.tsx`

## Building for Production

### Android (APK/AAB)
```bash
eas build --platform android
```

### iOS (IPA)
```bash
eas build --platform ios
```

## React Patterns Used

### Custom Hooks
- `useWeather` - Weather data fetching and state management
- `useLocation` - Device location with permission handling
- `useTemperatureUnit` - Unit preference with AsyncStorage persistence

### Context API
- Global state management without prop drilling
- Provider pattern for dependency injection

### useReducer
- Complex weather state management
- Predictable state transitions

### useEffect
- Side effects for data fetching
- Cleanup for subscriptions

### useCallback
- Memoized callbacks for performance
- Preventing unnecessary re-renders

## Branches

- `main` - Web version (React + Vite + JavaScript)
- `react-native-mobile` - Mobile version (React Native + Expo Router + TypeScript)

### Switching Between Branches

To switch to the web version:
```bash
git checkout main
```

To switch to the mobile version:
```bash
git checkout react-native-mobile
```

**Note:** Each branch has completely different files. The web version files are preserved in `main` branch and mobile version files are in `react-native-mobile` branch.

## Contact & Support

For questions, issues, or suggestions:
- Open an issue in the GitHub repository
- Contact the developer: Mahyar Naeimi

---

**Built with React Native, Expo Router, and OpenWeatherMap API**
