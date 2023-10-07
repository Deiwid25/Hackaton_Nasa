import { LatLngExpression, MapOptions } from "leaflet";
import { ContextProps } from "../../types";
import { MapsContext } from "./MapsContext";
import { getLocationForMap } from "../../services/geolocationService";
import { useState } from "react";


export function MapsProvider({ children }: ContextProps) {
    const [center, setCenter] = useState<LatLngExpression>([6.255636, -75.570225])
    const [zoom, setZoom] = useState<MapOptions["zoom"]>(9);    

    const setMyLocation = async () => {
        setCenter(await getLocationForMap());
        setZoom(16);
    }

    return (<MapsContext.Provider value={{ center, setCenter, zoom, setZoom, setMyLocation}}>{children}</MapsContext.Provider>)
}