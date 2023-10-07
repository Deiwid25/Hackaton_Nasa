//Forecast Interfaces
export interface ForecastResponse {
  location: string;
  rainProbability: string[];
  maxTemperature: string | number;
  minTemperature: string | number;
  lapseOfTime: timeLapse;
}

export const initialForecast: ForecastResponse = {
  location: 'Medellín Centro',
  rainProbability: [''],
  maxTemperature: '',
  minTemperature: '',
  lapseOfTime: { lapseIndex: 1, day: 'today', lapseOfDay: 'Mañana' },
};

//General Services Interfaces

export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface timeLapse {
  lapseIndex: number;
  day: "today" | "tomorrow";
  lapseOfDay: "Madrugada" | "Mañana" | "Tarde" | "Noche";
}

// Props of any Context
interface ContextProps {
  children: JSX.Element | JSX.Element[];
}

//Layers Interfaces

export interface LayersState {
  activeLayers: number | undefined;
  layers: Layer[];
  menuLocked: boolean;
}
export interface Layer extends SubLayer {
  subLayers?: SubLayer[] | undefined;
}

export interface SubLayer {
  id: number;
  active: boolean;
  // name: string;
}

export type AnchorElState = null | HTMLElement;



export type geoJSONPropsSiata = airGeoJSONProps | levelGeoJSONProps

export interface airGeoJSONProps {
  Codigo: number;
  Color: string;
  Estacion: string;
  FechaFin: string;
  FechaInicio: string;
  NombreEstacion: string;
  "PM2.5_24H-fig": string;
  "PM2.5_24H-prom": numbers
}

export interface levelGeoJSONProps {
  Codigo: number;
  Color: string;
  "Fig 3h": string;
  "Fig 24h": string;
  "Fig 30d": string;
  "Fig 72h": string;
  "Nivel máximo alcanzado": number;
  NombreEstacion: string
}




