import { MapContainer, ScaleControl, TileLayer, WMSTileLayer, useMap } from 'react-leaflet';
import { RadarLayer } from '../Layers/RadarLayer';
import { ZoomControl } from '../ZoomControl/ZoomControl';
import { useContext} from 'react';
import { MapsContext } from '../../contexts/Maps/MapsContext';
import { LatLngExpression, MapOptions } from 'leaflet';
import { LevelsLayer } from '../Layers/LevelsLayer';
import { AirLayer } from '../Layers/AirLayer';
import { CamsLayer } from '../Layers/CamsLayer';
import "./Map.css"
import { InteractionButtons } from '../InteractionButtons/InteractionButtons';
import { LegendsLayers } from '../LengendsLayers/LegendsLayers';



interface ChangeViewProps {
  center: LatLngExpression;
  zoom: MapOptions["zoom"];
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom); //Softly movement of location
  // map.setView(center, zoom); //Change of location suddenly
  return null;
}

/* This code exports a functional component called `Map` that renders a Leaflet map using the
`MapContainer` and `TileLayer` components from the `react-leaflet` library. The map is centered on
the coordinates `[6.230746, -75.550029]` and has a zoom level of 13. The map is rendered inside a
`div` element with absolute positioning and a `zIndex` of 1, and has a height and width of `100vh`
and `100vw`, respectively. */

export const Map = () => {
  const { center, zoom } = useContext(MapsContext)
  // const urlGoogle = `https://maps.googleapis.com/maps/vt?&x={x}&y={y}&z={z}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`


  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        pointerEvents: 'auto',
      }}

    >
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        style={{ height: '100vh', width: '100vw', }}
      >

        {/* Google Maps */}
        {/* <TileLayer url={urlGoogle} /> */}

        {/* OSM */}
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {/* GeoServer */}
        {/* <WMSTileLayer
          url="http://192.168.9.200:8484/geoserver/ows"
          layers="AreaMetRadar_transparencia4"
          // layers='my_test_data'
          attribution="Esto esta en fenix"
          format="image/png"
        transparent={true}
        /> */}

        <WMSTileLayer
          url="https://geoportal.siata.gov.co/geoserver/ows"
          layers="areas"
          attribution="geohub-siata"
          format="image/png"
          transparent={true}
          opacity={0.3}

        />

        <ScaleControl position='bottomright' imperial={false} />
        <ChangeView center={center} zoom={zoom} />
        <AirLayer />
        <RadarLayer />
        <LevelsLayer />
        <CamsLayer />
        <div className='right-buttons-container'>
          <InteractionButtons />
          <ZoomControl />
          <LegendsLayers />
        </div>

      </MapContainer >
    </div >
  );
};
