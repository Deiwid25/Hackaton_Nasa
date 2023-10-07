import { useReducer, useState } from "react";
import { LayersContext, LayersContextProps } from "./LayersContext";
import { ContextProps, LayersState } from "../../types";
import { layersReducer } from "./layersReducer";


const INITIAL_STATE: LayersState = {
  activeLayers: 1,
  layers: [
    { id: 0, active: true },
    { id: 1, active: false },
    { id: 2, active: true },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, subLayers: [{ id: 0, active: false }, { id: 1, active: false }], active: false },
    { id: 7, subLayers: [{ id: 0, active: false }, { id: 1, active: false }], active: false },
    { id: 8, active: false },
    { id: 9, subLayers: [{ id: 0, active: false }, { id: 1, active: false }], active: false },
  ],
  menuLocked: false,
};

export function LayersProvider({ children }: ContextProps) {
  const [anchorEl, setAnchorEl] =
    useState<LayersContextProps["anchorEl"]>(null);

  const [isPlaying, setIsPlaying] = useState<LayersContextProps["isPlaying"]>(false);
  const [isStopped, setIsStopped] = useState<LayersContextProps["isStopped"]>(true);
  const [isFastPlay, setIsFastPlay] = useState<LayersContextProps["isFastPlay"]>(false);
  const [animationSpeed, setAnimationSpeed] = useState<LayersContextProps["animationSpeed"]>(1000);
  const [currentIndex, setCurrentIndex] = useState<LayersContextProps["currentIndex"]>(0);
  const [PM25, setPM25] = useState<LayersContextProps["PM25"]>(null)
  const [levels, setLevels] = useState<LayersContextProps["levels"]>(null);
  const [drawerOpen, setDrawerOpen] = useState<LayersContextProps["drawerOpen"]>(false)
  const [featureData, setFeatureData] = useState<LayersContextProps["featureData"]>(null)
  const [arrayOfDrawer, setArrayOfDrawer] = useState<LayersContextProps["arrayOfDrawer"]>([])
  const [showLegend, setShowLegend] = useState<LayersContextProps["showLegend"]>(true)
  const [showCams, setShowCams] = useState<LayersContextProps["showCams"]>(false)
  const [cams, setCams] = useState<LayersContextProps["cams"]>(null)


  const [layersState, dispatch] = useReducer(layersReducer, INITIAL_STATE);

  const toggleLayer = (layerId: number, layerActive: boolean): void => {
    dispatch({
      type: "TOGGLE_LAYER",
      payload: { layerId: layerId, active: layerActive }
    });

  };

  const toggleSubLayer = (layerId: number, subLayerId: number, subLayerActive: boolean): void => {
    dispatch({
      type: "TOGGLE_SUBLAYER",
      payload: { layerId: layerId, subLayerId: subLayerId, active: subLayerActive }
    });
  };




  return (
    <LayersContext.Provider value={{
      anchorEl,
      setAnchorEl,
      isPlaying,
      setIsPlaying,
      isStopped,
      setIsStopped,
      isFastPlay,
      setIsFastPlay,
      animationSpeed,
      setAnimationSpeed,
      currentIndex,
      levels,
      setLevels,
      PM25,
      setPM25,
      setCurrentIndex,
      layersState,
      toggleLayer,
      toggleSubLayer,
      drawerOpen,
      setDrawerOpen,
      featureData,
      setFeatureData,
      arrayOfDrawer,
      setArrayOfDrawer,
      showLegend,
      setShowLegend,
      showCams,
      setShowCams,
      cams,
      setCams
    }}>
      {children}
    </LayersContext.Provider>
  );
}

