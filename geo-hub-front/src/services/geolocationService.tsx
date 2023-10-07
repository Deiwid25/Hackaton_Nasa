import { LatLngExpression } from "leaflet";
import { LocationData } from "../types";

async function getLocation(): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        sessionStorage.setItem('locationData', JSON.stringify(locationData));
        resolve(locationData);
      },
      error => {
        reject(error.PERMISSION_DENIED);
      }
    );
  });
}

async function getLocationForMap(): Promise<LatLngExpression> {
  const location = await getLocation();
  const coordinates: LatLngExpression = [location?.latitude, location?.longitude];
  return coordinates;
}

export { getLocation, getLocationForMap };
