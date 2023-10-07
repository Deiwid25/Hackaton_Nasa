import { ImageOverlay } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import './RadarAnimation.css';

import { useContext, useEffect, useState } from 'react';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { getAnimationRadarPictures } from '../../services/radarAnimationApi';

const opacityValue = 0.5;

const imageBounds = [
  [5.1, -76.6],
  [7.3, -74.3],
];

interface RadarInfoType {
  imagen: string;
  // add other properties if any
}

export const RadarAnimation = () => {
  const { isPlaying, animationSpeed, currentIndex = 0, setCurrentIndex } =
    useContext(LayersContext);
  const [imageArray, setImageArray] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const radarInfo = await getAnimationRadarPictures();
      const radarPics = radarInfo?.map((val: RadarInfoType) => val?.imagen)
      setImageArray(radarPics.reverse())
      console.log("radarInfo", radarInfo?.map((val: RadarInfoType) => val?.imagen));
    };

    fetchData();
  }, []);


  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && imageArray.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex: any) => (prevIndex + 1) % imageArray?.length);
      }, animationSpeed);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, imageArray]);



  return (
    <>
      <ImageOverlay
        url={imageArray[currentIndex] ?? ''}
        bounds={imageBounds as LatLngBoundsExpression}
        opacity={opacityValue}
      />
    </>
  );
};

