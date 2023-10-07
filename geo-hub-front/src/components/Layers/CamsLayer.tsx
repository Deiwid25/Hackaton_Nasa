import { GeoJSON, LayerGroup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { useContext, useEffect } from 'react';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import './AirLayer.css';
import { FeatureDrawer } from '../FeatureDrawer/FeatureDrawer';
import { createOnEachFeature } from './onEachFeature';
import { getCams } from '../../services/geoServerApis';
import { VideoCameraFilledIcon } from '../../assets/icons/SiataIcons';
import { renderToString } from 'react-dom/server';



const getSVGString = (ReactComponent: React.ReactElement) => {
    return renderToString(ReactComponent);
};


const svgString = getSVGString(<VideoCameraFilledIcon />);


function pointToLayer(feature: any, latlng: LatLngExpression) {
    // const { Color, "PM2.5_24H-prom": pm25prom } = feature.properties

    const customMarker = L.divIcon({
        className: 'custom-marker',  
        html: svgString
    });
    
    const marker = L.marker(latlng, { icon: customMarker });

      // Si feature.properties.nombre existe, vinculamos ese nombre como un tooltip al marcador.
    if (feature.properties && feature.properties.nombre) {
        marker.bindTooltip(feature.properties.nombre);
    }

    return marker;
}

export const CamsLayer = () => {

    const {
        setFeatureData,
        setArrayOfDrawer,
        drawerOpen,
        setDrawerOpen,
        cams,
        setCams,
        showCams,
    } = useContext(LayersContext);


    useEffect(() => {
        const fetchCams = async () => {
            try {
                // Realiza el fetch
                const result = await getCams()
                setCams(result);
                console.log("🚀 ~ file: CamsLayer.tsx:52 ~ fetchCams ~ result:", result)

            } catch (error) {
                console.error(error);
            }
        };
        // Llama a la función
        fetchCams();
    }, []);

    const onEachFeature = createOnEachFeature({ setDrawerOpen, setFeatureData, setArrayOfDrawer });



    return (
        <>
            {showCams && (
                <LayerGroup>
                    {cams && (
                        <GeoJSON
                            attribution='Cámaras'
                            data={cams}
                            onEachFeature={onEachFeature}
                            pointToLayer={pointToLayer}
                        />
                    )}
                </LayerGroup>
            )}
            {drawerOpen && showCams && <FeatureDrawer />}
        </>
    );
};


