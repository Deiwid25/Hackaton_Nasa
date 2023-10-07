import { GeoJSON, LayerGroup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { useContext, useEffect } from 'react';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { getPM25 } from '../../services/geoServerApis';
import './AirLayer.css';
import { FeatureDrawer } from '../FeatureDrawer/FeatureDrawer';
import { createOnEachFeature } from './onEachFeature';
// import { getCams } from '../../services/geoServerApis';




// There are 3 types of markers that can be used we are using by default the circles
const htmlMarkerCircle = (
    Color: string,
    value: string
) => `<div class="marker-circle" style="background-color: ${!Color ? '#677D99' : Color
}"
    > ${!Color ? 'SD' : value}</div > `;

// const htmlMarkerSquare = (Color: string, value: string) => `< div class="marker-square" style = "background-color: ${Color}"
// >${value}</>`

// const htmlMarkerTriangle = (Color: string, value: string) => `
// <div class="marker-border"></div>
// <div class="marker-triangle" style="border-bottom-color: ${Color}">
//   <div class="marker-text">${value}</div>
// </div>
// `

function pointToLayer(feature: any, latlng: LatLngExpression) {
    // const { Color, "PM2.5_24H-prom": pm25prom } = feature.properties

    const customMarker = L.divIcon({
        className: 'custom-marker',
        html: htmlMarkerCircle(
            feature.properties.color,
            feature.properties.PM25_24H_prom
        ),
    });

    const marker = L.marker(latlng, { icon: customMarker });

    if (feature.properties && feature.properties.nombreEstacion) {
        marker.bindTooltip(feature.properties.nombreEstacion);
    }

    return marker;
}

export const AirLayer = () => {

    const {
        layersState,
        setPM25,
        PM25,
        drawerOpen,
        setDrawerOpen,
        setFeatureData,
        setArrayOfDrawer,
    } = useContext(LayersContext);
    const isPM25Active = layersState?.layers[2]?.active;

    useEffect(() => {
        const fetchPM25 = async () => {
            try {
                // Realiza el fetch
                const result = await getPM25();
                setPM25(result);
                console.log('🚀 ~ file: AirLayer.tsx:65 ~ fetchPM25 ~ result:', result);
            } catch (error) {
                console.error(error);
            }
        };
        // Llama a la función
        fetchPM25();
    }, []);

    const onEachFeature = createOnEachFeature({ setDrawerOpen, setFeatureData, setArrayOfDrawer });



    return (
        <>
            {isPM25Active && (
                <LayerGroup>
                    {PM25 && (
                        <GeoJSON
                            attribution='protege cada suspiro'
                            data={PM25}
                            onEachFeature={onEachFeature}
                            pointToLayer={pointToLayer}
                        />
                    )}
                </LayerGroup>
            )}
            {drawerOpen && isPM25Active && <FeatureDrawer />}
        </>
    );
};


