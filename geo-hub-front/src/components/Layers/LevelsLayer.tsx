import { GeoJSON, LayerGroup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { useContext, useEffect } from 'react';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { getLevels } from '../../services/geoServerApis';
import ReactDOMServer from 'react-dom/server';
import { LevelIcon } from '../../assets/icons/SiataIcons';
import './LevelsLayer.css';
import { FeatureDrawer } from '../FeatureDrawer/FeatureDrawer';
import { createOnEachFeature } from './onEachFeature';




const htmlMarkerCircle = (
    Color: string,
    iconTag: JSX.Element
) => `<div class="marker-level" style="background-color: ${Color}"   
> ${ReactDOMServer.renderToString(iconTag)}</div>`;
function pointToLayer(feature: any, latlng: LatLngExpression) {
    const iconTag = (
        <LevelIcon
            style={{
                width: '15px',
            }}
        />
    );
    const customMarker = L.divIcon({
        className: 'custom-marker',
        html: htmlMarkerCircle(feature.properties.color, iconTag),
    });

    const marker = L.marker(latlng, { icon: customMarker });

    if (feature.properties && feature.properties.nombreEstacion) {
        marker.bindTooltip(feature.properties.nombreEstacion);
    }

    return marker;
}

export const LevelsLayer = () => {
    const { layersState, levels, setLevels, drawerOpen, setDrawerOpen, setFeatureData, setArrayOfDrawer } = useContext(LayersContext)
    const isLevelLayerActive = layersState?.layers[1]?.active;



    useEffect(() => {
        const fetchLevels = async () => {
            try {
                // Realiza el fetch
                const result = await getLevels();
                setLevels(result);
                console.log(
                    '🚀 ~ file: LevelsLayer.tsx:58 ~ fetchLevels ~ result:',
                    result
                );
            } catch (error) {
                console.error(error);
            }
        };
        // Llama a la función
        fetchLevels();
    }, []);

    const onEachFeature = createOnEachFeature({ setDrawerOpen, setFeatureData, setArrayOfDrawer });

    return (
        <>
            {isLevelLayerActive && (
                <LayerGroup>
                    {levels && (
                        <GeoJSON
                            attribution='Capa de Niveles'
                            data={levels}
                            onEachFeature={onEachFeature}
                            pointToLayer={pointToLayer}
                        />
                    )}
                </LayerGroup>
            )}
            {drawerOpen && isLevelLayerActive && <FeatureDrawer />}
        </>
    );
};


