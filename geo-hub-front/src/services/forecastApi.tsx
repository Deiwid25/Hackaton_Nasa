import axios from 'axios';
import { getLocation } from './geolocationService';
import { getTimeOfDay } from './timeService';
import { LocationData, ForecastResponse, timeLapse } from '../types';

async function getForecast(): Promise<ForecastResponse | undefined> {
  try {
    const token = await getForecastToken();
    const location = await getLocationData();
    const lapseOfTime = await getTimeOfDay();
    const data = await getForecastData(token, location);
    const forecast = parseForecastData(data, lapseOfTime);

    return forecast;
  } catch (error) {
    console.log('error getting forecast', error);
    throw error;
  }
}
async function getForecastToken() {
  const formData = new FormData();

  formData.append('username', import.meta.env.VITE_USER_FORECAST);
  formData.append('password', import.meta.env.VITE_PASSWORD_FORECAST);

  try {
    const res = await axios.post(
      import.meta.env.VITE_POST_FORECAST_TKN,
      formData
    );

    return res?.data?.access;
  } catch (error) {
    console.log(error);
  }
}

async function getLocationData() {
  let location;
  if (sessionStorage.locationData) {
    location = JSON.parse(sessionStorage.locationData);
  } else {
    try {
      location = await getLocation();
    } catch (error) {
      console.log(
        "Error getting location, using default location 'Medellín Centro'",
        error
      );
      location = 'Denied';
    }
  }
  return location;
}

async function getForecastData(
  token: string,
  location: LocationData | 'Denied'
): Promise<unknown> {
  const apiUrl =
    location === 'Denied'
      ? `${import.meta.env.VITE_DEFAULT_FORECAST}/`
      : `${import.meta.env.VITE_GET_FORECAST}${location?.latitude}/${location?.longitude
      }/`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await axios.get(apiUrl, { headers });
  console.log('dataOfApi', res);
  return res.data;
}

function parseForecastData(
  data: any,
  lapseOfTime: timeLapse | any
): ForecastResponse {
  const nameLocation = (nombrePronostico: string): string | undefined => {
    for (let i = 1; i < nombrePronostico.length; i++) {
      if (nombrePronostico[i] === nombrePronostico[i].toUpperCase()) {
        return nombrePronostico.slice(0, i) + ' ' + nombrePronostico.slice(i);
      }
    }
  };

  const cuttedLocation = data?.nombrePronostico?.substr(10);

  const response: ForecastResponse = {
    location: nameLocation(cuttedLocation) || cuttedLocation,
    rainProbability: [
      data?.pronosticoLluvias?.pronostico[0]?.lluvia_madrugada,
      data?.pronosticoLluvias?.pronostico[0]?.lluvia_mannana,
      data?.pronosticoLluvias?.pronostico[0]?.lluvia_tarde,
      data?.pronosticoLluvias?.pronostico[0]?.lluvia_noche,
      data?.pronosticoLluvias?.pronostico[1]?.lluvia_madrugada,
      data?.pronosticoLluvias?.pronostico[1]?.lluvia_mannana,
      data?.pronosticoLluvias?.pronostico[1]?.lluvia_tarde,
      data?.pronosticoLluvias?.pronostico[1]?.lluvia_noche,
    ],
    maxTemperature: data?.pronosticoLluvias?.pronostico[0]?.temperatura_maxima,
    minTemperature: data?.pronosticoLluvias?.pronostico[0]?.temperatura_minima,
    lapseOfTime: lapseOfTime,
  };

  return response;
}

export { getForecast };
