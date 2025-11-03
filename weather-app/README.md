# Weather Forecast App

A modern, dynamic, and visually appealing weather forecasting application built with React and the OpenWeatherMap API. This app provides real-time weather data, 5-day forecasts, and a beautiful user interface with smooth animations and responsive design.

![Weather App](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![License](https://img.shields.io/badge/license-MIT-green)

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
- **Modern UI/UX**:
  - Smooth animations and transitions
  - Gradient backgrounds
  - Glassmorphism design elements
  - Responsive layout for all screen sizes
- **Error Handling**: User-friendly error messages for various scenarios
- **Loading States**: Visual feedback during API requests
- **Local Storage**: Remembers your temperature unit preference

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **State Management**: React Hooks (useState, useEffect, useReducer)
- **API**: OpenWeatherMap API
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **Development**: ESLint for code quality

## Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Search input component
│   │   ├── SearchBar.css
│   │   ├── WeatherDisplay.jsx     # Current weather display
│   │   ├── WeatherDisplay.css
│   │   ├── ForecastCard.jsx       # Individual forecast card
│   │   ├── ForecastCard.css
│   │   ├── ErrorMessage.jsx       # Error display component
│   │   ├── ErrorMessage.css
│   │   ├── LoadingSpinner.jsx     # Loading state component
│   │   └── LoadingSpinner.css
│   ├── utils/
│   │   ├── weatherAPI.js          # API integration functions
│   │   └── weatherReducer.js      # State management reducer
│   ├── App.jsx                    # Main application component
│   ├── App.css
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/
├── .env                           # Environment variables (not committed)
├── .env.example                   # Environment variables template
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** (version 8.x or higher) or **yarn**
- A code editor (VS Code recommended)

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

or if you're using yarn:

```bash
yarn install
```

### 3. Get Your OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key

### 4. Configure Environment Variables

1. Copy the `.env.example` file to create your own `.env` file:

```bash
cp .env.example .env
```

2. Open the `.env` file and add your API key:

```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 5. Run the Development Server

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is busy).

## Building for Production

To create a production build:

```bash
npm run build
```

or with yarn:

```bash
yarn build
```

The optimized files will be generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Usage Guide

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

## React Hooks Used

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

## Styling Approach

The application uses pure CSS with modern features:

- **CSS Grid & Flexbox**: For responsive layouts
- **CSS Animations**: Smooth transitions and loading states
- **CSS Variables**: For consistent theming
- **Media Queries**: Mobile-first responsive design
- **Glassmorphism**: Modern UI design trend
- **Gradient Backgrounds**: Dynamic and appealing visuals

### Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Key Issues

**Problem**: "API key is missing" error
**Solution**: Ensure your `.env` file exists and contains `VITE_OPENWEATHER_API_KEY=your_key`

**Problem**: "Invalid API key" error
**Solution**: Verify your API key is correct and active on OpenWeatherMap

### City Not Found

**Problem**: "City not found" error
**Solution**:
- Check the spelling of the city name
- Try adding the country code (e.g., "London,UK")
- Use larger cities that are more likely to be in the database

### Development Server Issues

**Problem**: Port already in use
**Solution**: Vite will automatically try the next available port, or you can specify a port in `vite.config.js`

## Performance Optimization

- Lazy loading of forecast data
- Optimized API calls
- CSS animations with GPU acceleration
- Minimal re-renders with proper state management
- Caching of user preferences

## Future Enhancements

Potential features for future versions:
- Geolocation-based automatic weather detection
- Weather maps integration
- Hourly forecast view
- Multiple city comparison
- Weather alerts and notifications
- Historical weather data
- Dark mode toggle
- Multi-language support

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [React](https://react.dev/) for the amazing framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- Weather icons provided by OpenWeatherMap

## Contact & Support

For questions, issues, or suggestions:
- Open an issue in the GitHub repository
- Contact the development team

---

**Built with React and OpenWeatherMap API**
