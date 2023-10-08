import { LatLngExpression, MapOptions } from "leaflet";
import { ContextProps } from "../../types";
import { MapsContext } from "./MapsContext";
import { getLocationForMap } from "../../services/geolocationService";
import { useState } from "react";


export function MapsProvider({ children }: ContextProps) {
    const [center, setCenter] = useState<LatLngExpression>([32.745119, -96.75319])
    const [zoom, setZoom] = useState<MapOptions["zoom"]>(10);    

    const setMyLocation = async () => {
        setCenter(await getLocationForMap());
        setZoom(16);
    }

    return (<MapsContext.Provider value={{ center, setCenter, zoom, setZoom, setMyLocation}}>{children}</MapsContext.Provider>)
}