# Weather Forecast App

A modern, dynamic, and visually appealing weather forecasting application built with React and the OpenWeatherMap API. This app provides real-time weather data, 5-day forecasts, and a beautiful user interface with smooth animations and responsive design.


## Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **5-Day Forecast**: View detailed weather predictions for the next 5 days
- **Temperature Unit Toggle**: Easily switch between Celsius and Fahrenheit
- **Comprehensive Weather Details**:
  - Temperature (current, feels like, min, max)
  - Humidity
  - Wind speed
  - Atmospheric pressure
  - Visibility
  - Sunrise & sunset times
- **Modern Design**:
  - Smooth animations and transitions
  - Responsive layout for all screen sizes
- **Error Handling**: User-friendly error messages for various scenarios
- **Loading States**: Visual feedback during API requests
- **Local Storage**: Remembers your temperature unit preference




## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd weather-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the `.env` file.

2. Open the `.env` file and make sure about the API key presence.(should be shared in advance)

### 4. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`.





## Usage Guide:

### Searching for Weather

1. Enter a city name in the search bar (e.g., "London", "New York", "Tokyo")
2. Click the "Search" button or press Enter
3. Wait for the app to fetch and display the weather data

### Toggle Temperature Units

- Click the temperature unit button (°C or °F) in the weather display header
- Your preference will be saved automatically

### Understanding the Weather Display

- **Main Section**: Shows current temperature, weather icon, and description
- **Details Cards**: Display humidity, wind speed, pressure, visibility, sunrise, and sunset
- **Forecast Section**: Shows 5-day weather forecast with temperatures and conditions




## React Hooks Used:

This project demonstrates proficiency with essential React hooks:

### useState
- Managing temperature unit preference
- Handling search input state
- Component-level state management

### useEffect
- Loading saved preferences from localStorage
- Persisting user preferences
- Requesting geolocation on app mount
- Side effects management

### useReducer
- Complex weather state management
- Handling multiple related state values
- Managing loading, error, and success states
- Action-based state updates

## API Integration

The app uses the OpenWeatherMap API with two main endpoints:

1. **Current Weather API**: `/weather`
   - Fetches current weather data for a specified city
   - Returns temperature, humidity, wind, pressure, etc.

2. **5-Day Forecast API**: `/forecast`
   - Retrieves weather predictions
   - Filtered to show one forecast per day at noon



### Error Handling

The app handles various API errors:
- Invalid API key (401)
- City not found (404)
- Too many requests (429)
- Server errors (500, 502, 503)
- Network errors
- Missing API key





## Troubleshooting

### API Key Issues

**Problem**: "API key is missing" error
**Solution**: Ensure your `.env` file exists and contains `VITE_OPENWEATHER_API_KEY=your_key`

**Problem**: "Invalid API key" error
**Solution**: Verify your API key is correct and ask the author: Mahyar Naeimi if its active on OpenWeatherMap

### City Not Found

**Problem**: "City not found" error
**Solution**:
- Check the spelling of the city name
- Try adding the country code (e.g., "London,UK")
- Use larger cities that are more likely to be in the database

### Development Server Issues

**Problem**: Port already in use
**Solution**: Vite will automatically try the next available port, or you can specify a port in `vite.config.js`


## Contact & Support

For questions, issues, or suggestions:
- Open an issue in the GitHub repository
- Contact the developmer: Mahyar Naeimi

---

**Built with React and OpenWeatherMap API**
