import { useState, useEffect } from 'react';
import { ForecastResponse } from '../types';
import { getForecast } from '../services/forecastApi';

interface useForecastState {
  forecast: ForecastResponse;
  loading: boolean;
  error: boolean;
}

export const useForecast = () => {
  const initialForecast: ForecastResponse = {
    location: 'Medellín Centro',
    rainProbability: [''],
    maxTemperature: '',
    minTemperature: '',
    lapseOfTime: { lapseIndex: 1, day: 'today', lapseOfDay: 'Mañana' },
  };

  const [forecast, setForecast] =
    useState<useForecastState['forecast']>(initialForecast);
  const [loading, setLoading] = useState<useForecastState['loading']>(true);
  const [error, setError] = useState<useForecastState['error']>(false);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res: any = await getForecast();
        console.log('res', res);
        setForecast(res);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, []);

  return { forecast, loading, error };
};
