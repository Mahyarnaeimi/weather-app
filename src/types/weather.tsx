// Weather API Response Types
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface SysData {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CloudsData {
  all: number;
}

export interface CoordData {
  lon: number;
  lat: number;
}

export interface CurrentWeatherResponse {
  coord: CoordData;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: CloudsData;
  wind: WindData;
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: CoordData;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// App State Types
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherState {
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastItem[];
  isLoading: boolean;
  isForecastLoading: boolean;
  error: string | null;
  lastSearchedCity: string;
}

export type WeatherAction =
  | { type: 'FETCH_START'; payload: string }
  | { type: 'FETCH_SUCCESS'; payload: CurrentWeatherResponse }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'FORECAST_START' }
  | { type: 'FORECAST_SUCCESS'; payload: ForecastItem[] }
  | { type: 'FORECAST_ERROR' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET' };

// Component Props Types
export interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export interface WeatherDisplayProps {
  weather: CurrentWeatherResponse;
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  forecast: ForecastItem[];
  isForecastLoading: boolean;
}

export interface ForecastCardProps {
  forecast: ForecastItem;
  unit: TemperatureUnit;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface LoadingSpinnerProps {
  message?: string;
}
