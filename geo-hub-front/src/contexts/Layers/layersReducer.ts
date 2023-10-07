import { Layer, LayersState, SubLayer } from "../../types";

type LayerAction =
  | {
    type: "TOGGLE_LAYER"; payload: {
      layerId: Layer["id"],
      active: Layer["active"]
    }
  }
  | {
    type: "TOGGLE_SUBLAYER"; payload: {
      layerId: Layer["id"],
      subLayerId: SubLayer["id"],
      active: SubLayer["active"]
    }
  };


export const layersReducer = (
  state: LayersState,
  action: LayerAction
): LayersState => {
  switch (action.type) {
    case "TOGGLE_LAYER":
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== action.payload.layerId) {
            return layer
          }

          const isActive = !layer.active;

          if (!layer.subLayers) {
            return {
              ...layer,
              active: isActive,

            }

          }
          return {
            ...layer,
            active: isActive,
            subLayers: layer.subLayers?.map((subLayer) => ({ ...subLayer, active: isActive }))
          }
        }
        ),
        activeLayers: (state.activeLayers ?? 0) + (action.payload.active ? -1 : 1),
      }

    case "TOGGLE_SUBLAYER":
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== action.payload.layerId) {
            return layer
          }

          const updateSubLayers = layer.subLayers?.map((subLayer) => {
            if (subLayer.id !== action.payload.subLayerId) {
              return subLayer
            }
            const isActive = !subLayer.active

            return {
              ...subLayer,
              active: isActive
            }
          }
          );

          return {
            ...layer,
            subLayers: updateSubLayers,
            active: updateSubLayers?.some(subLayer => subLayer.active) ? true : false

          }
        }),
        activeLayers: (state.activeLayers ?? 0) + (action.payload.active ? -0.5 : 0.5),
      };
  }
};
