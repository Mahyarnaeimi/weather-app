// Action types
export const WEATHER_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  FORECAST_START: 'FORECAST_START',
  FORECAST_SUCCESS: 'FORECAST_SUCCESS',
  FORECAST_ERROR: 'FORECAST_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET: 'RESET'
};

// Initial state
export const initialWeatherState = {
  currentWeather: null,
  forecast: [],
  isLoading: false,
  isForecastLoading: false,
  error: null,
  lastSearchedCity: ''
};

// Reducer function
export const weatherReducer = (state, action) => {
  switch (action.type) {
    case WEATHER_ACTIONS.FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        lastSearchedCity: action.payload
      };

    case WEATHER_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentWeather: action.payload,
        error: null
      };

    case WEATHER_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        currentWeather: null,
        error: action.payload
      };

    case WEATHER_ACTIONS.FORECAST_START:
      return {
        ...state,
        isForecastLoading: true
      };

    case WEATHER_ACTIONS.FORECAST_SUCCESS:
      return {
        ...state,
        isForecastLoading: false,
        forecast: action.payload
      };

    case WEATHER_ACTIONS.FORECAST_ERROR:
      return {
        ...state,
        isForecastLoading: false,
        forecast: []
      };

    case WEATHER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case WEATHER_ACTIONS.RESET:
      return initialWeatherState;

    default:
      return state;
  }
};
