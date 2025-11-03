# Quick Start Guide - Weather Forecast App

## Get Started in 3 Minutes!

### Step 1: Install Dependencies
```bash
cd weather-app
npm install
```

### Step 2: Set Up Your API Key

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open the `.env` file in the root directory
3. Add your API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

### Step 3: Run the App
```bash
npm run dev
```

That's it! Open your browser to the URL shown in the terminal (usually http://localhost:5173).

## Try It Out

1. Enter a city name like "London" or "New York"
2. Click "Search"
3. See the current weather and 5-day forecast
4. Toggle between °C and °F by clicking the temperature unit button

## Need Help?

Check the full [README.md](weather-app/README.md) for detailed documentation.

## Project Highlights

### React Hooks Used:
- **useState**: Temperature unit preference, search input state
- **useEffect**: Loading/saving preferences, geolocation
- **useReducer**: Complex weather state management

### Features:
- Real-time weather data
- 5-day forecast
- Temperature unit toggle (°C/°F)
- Responsive design
- Smooth animations
- Error handling
- Loading states

### Tech Stack:
- React 19.1.1
- Vite 7.1.7
- OpenWeatherMap API
- Modern CSS3

Enjoy building with this Weather App!
