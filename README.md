# Weather App Mobile (React Native)

A mobile weather application built with React Native, Expo, and TypeScript. This is the mobile version of the Weather Forecast web application.

## Features

- Real-time weather data for any city
- 5-day weather forecast
- Automatic location detection
- Temperature unit toggle (Celsius/Fahrenheit)
- Clean and modern UI design
- Persistent user preferences

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **OpenWeatherMap API** - Weather data

## Project Structure

```
weather-app/
├── App.tsx                 # Main application component
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx      # City search input
│   │   ├── WeatherDisplay.tsx # Main weather display
│   │   ├── ForecastCard.tsx   # Forecast item card
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   └── ErrorMessage.tsx   # Error display
│   ├── types/
│   │   └── weather.ts         # TypeScript interfaces
│   └── utils/
│       ├── weatherAPI.ts      # API functions
│       └── weatherReducer.ts  # State management
├── assets/                 # App icons and images
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## Installation

1. Make sure you have Node.js and npm installed

2. Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## API Key

The app uses OpenWeatherMap API. The API key is included in the code for demo purposes. For production, you should:

1. Get your own API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the API key in `src/utils/weatherAPI.ts`

## Building for Production

### Android (APK/AAB)
```bash
eas build --platform android
```

### iOS (IPA)
```bash
eas build --platform ios
```

## React Hooks Used

This project demonstrates proficiency with essential React hooks:

### useState
- Managing temperature unit preference
- Handling search input state

### useEffect
- Loading saved preferences from AsyncStorage
- Persisting user preferences
- Requesting location permission on app mount

### useReducer
- Complex weather state management
- Handling loading, error, and success states

## Branches

- `main` - Web version (React + Vite + JavaScript)
- `react-native-mobile` - Mobile version (React Native + Expo + TypeScript)

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

**Built with React Native, Expo, and OpenWeatherMap API**
