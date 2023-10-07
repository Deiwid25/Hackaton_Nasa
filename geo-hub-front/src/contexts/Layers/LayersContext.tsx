import { createContext } from "react";
import { AnchorElState, LayersState } from "../../types";
import { FeatureCollection, GeoJsonProperties } from "geojson";

export interface LayersContextProps {
  anchorEl: AnchorElState;
  setAnchorEl: (value: AnchorElState) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  isStopped: boolean;
  setIsStopped: (value: boolean) => void;
  isFastPlay: boolean;
  setIsFastPlay: (value: boolean) => void;
  animationSpeed: number
  setAnimationSpeed: (value: number) => void;
  currentIndex: number | any;
  setCurrentIndex: (value: number | any) => void;
  PM25: FeatureCollection | null,
  setPM25: (value: FeatureCollection | null) => void;
  levels: FeatureCollection | null,
  setLevels: (value: FeatureCollection | null) => void;
  toggleLayer: (layerId: number, layerActive: boolean) => void;
  toggleSubLayer: (layerId: number, subLayerId: number, subLayerActive: boolean) => void
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  featureData: GeoJsonProperties | null;
  setFeatureData: (value: GeoJsonProperties | []) => void;
  arrayOfDrawer: GeoJsonProperties[] | [];
  setArrayOfDrawer: React.Dispatch<React.SetStateAction<GeoJsonProperties[]>>;
  layersState?: LayersState;
  showLegend: boolean;
  setShowLegend: (value: boolean) => void;
  showCams: boolean;
  setShowCams: (value: boolean) => void
  cams: FeatureCollection | null,
  setCams: (value: FeatureCollection | null) => void;
}

export const LayersContext = createContext<LayersContextProps>(
  {} as LayersContextProps
);
