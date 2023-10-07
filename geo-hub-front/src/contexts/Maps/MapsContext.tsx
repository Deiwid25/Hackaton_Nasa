import { LatLngExpression, MapOptions } from "leaflet";
import { createContext } from "react";


export interface MapsContextProps {
    center: LatLngExpression;
    setCenter: (value: LatLngExpression) => void;
    zoom: MapOptions["zoom"];
    setZoom: (value: MapOptions["zoom"]) => void;
    setMyLocation: () => void;
}

export const MapsContext = createContext<MapsContextProps>({} as MapsContextProps)