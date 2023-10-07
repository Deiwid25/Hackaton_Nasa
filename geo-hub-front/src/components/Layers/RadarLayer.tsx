import { useState, useEffect, useContext } from 'react';
import { ImageOverlay } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { RadarAnimation } from '../RadarAnimation/RadarAnimation';


const imageUrl =
  'https://siata.gov.co/kml/00_Radar/Ultimo_Barrido/AreaMetRadar_10_120_DBZH.png';
// 'https://siata.gov.co/operacional/radar/AreaMetRadar_10_120_DBZH.tiff';


const opacityValue = 0.5;

const imageBounds = [
  [5.1, -76.6],
  [7.3, -74.3],
];

export const RadarLayer = () => {
  const { layersState, isPlaying, isStopped } = useContext(LayersContext)
  const isLayerActive = layersState?.layers[0]?.active;


  const [reload, setReload] = useState(0);

  useEffect(() => {

    let interval: NodeJS.Timeout;


    if (isLayerActive) {
      interval = setInterval(() => {
        setReload(Date.now());
      }, 300000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLayerActive]);
  return (
    <>
      {isLayerActive ?

        (!isPlaying && !isStopped) ||
          isPlaying ? <RadarAnimation /> :
          <ImageOverlay
            url={`${imageUrl}?${reload}`}
            bounds={imageBounds as LatLngBoundsExpression}
            opacity={opacityValue}
          /> : ""}
    </>
  );
};
