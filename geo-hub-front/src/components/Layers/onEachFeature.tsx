import { LayersContextProps } from "../../contexts/Layers/LayersContext";

interface OnEachFeatureProps {
    setDrawerOpen: LayersContextProps["setDrawerOpen"];
    setFeatureData: LayersContextProps["setFeatureData"];
    setArrayOfDrawer: LayersContextProps["setArrayOfDrawer"]
}

//This function send information to Drawer each time is clicked a GEOTAG
export function createOnEachFeature({ setFeatureData, setArrayOfDrawer }: OnEachFeatureProps) {
    return function onEachFeature(feature: LayersContextProps["featureData"], layer: any) {
        if (feature?.properties) {
            layer.on("click", () => {

                setFeatureData(feature)

                setArrayOfDrawer(
                    (prevArray) => prevArray.includes(feature) ?
                        prevArray :
                        prevArray.length < 4 ? [feature, ...prevArray] :
                            [feature, ...prevArray.slice(0, -1)])
            });
        }
    }
}

