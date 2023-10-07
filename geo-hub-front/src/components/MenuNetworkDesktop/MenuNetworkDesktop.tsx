import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '../../assets/icons/SiataIcons';
import './MenuNetworkDesktop.css';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { network } from '../../arrays/network';
import { SliderTime } from '../SliderTime/SliderTime';

export const MenuNetworkDesktop: React.FC = () => {
  const { toggleLayer, layersState } = useContext(LayersContext);
  const [showSubMenu, setShowSubMenu] = useState<{ [index: number]: boolean }>(
    {}
  );

  const isPrecipitacionRadarSelected = layersState?.layers.find(
    (layer) => layer?.id === 0 && layer.active
  );

  return (
    <div className='menuNetworkDesktop'>
      {network.map((item, index) => {
        const isSelected = layersState?.layers[index]?.active;
        const isSubMenuVisible = showSubMenu[index];
        return (
          <Box key={index}>
            <Button
              variant='contained'
              onClick={() => {
                if (item.subMenu) {
                  setShowSubMenu((prevState) => ({
                    ...prevState,
                    [index]: !prevState[index],
                  }));
                }
                toggleLayer(index, layersState?.layers[index]?.active || false);
              }}
              disabled={
                !layersState?.layers[index]?.active &&
                (layersState?.activeLayers ?? 0) >= 3
              }
              sx={{
                display: 'flex',
                backgroundColor: isSelected
                  ? 'var(--blue3-500)'
                  : 'var(--shades-0)',
                borderRadius: '8px',
                padding: '4px',
                color: isSelected ? 'var(--shades-0)' : 'var(--primary-500)',
                margin: '0 0 5px',
                width: 'fit-content',
                textTransform: 'none',
              }}
            >
              {item.icon}
              <Typography
                variant='bodySemiBold2'
                sx={{
                  padding: '0 10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {item.text}
                {item.chevronIcon &&
                  (isSubMenuVisible ? <ChevronUpIcon /> : <ChevronDownIcon />)}
              </Typography>
            </Button>
            {item.subMenu && isSubMenuVisible && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--shades-0)',
                  color: 'var(--primary-500)',
                  borderRadius: '8px',
                  padding: '5px 15px 5px 0',
                  margin: '10px 0',
                  width: 'fit-content',
                }}
              >
                {item.subMenu.map((subMenuItem, subMenuIndex) => (
                  <FormControlLabel
                    key={subMenuIndex}
                    control={
                      <Checkbox
                        name={subMenuItem.text}
                        icon={<CheckboxIcon />}
                        checkedIcon={<CheckboxCheckedIcon />}
                      />
                    }
                    label={
                      <label
                        style={{
                          fontSize: '16px',
                          lineHeight: '19px',
                          fontWeight: 400,
                        }}
                      >
                        {subMenuItem.text}
                      </label>
                    }
                    sx={{
                      padding: '0 0 0 5px',
                      margin: '-5px -5px -5px 0',
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        );
      })}
      {isPrecipitacionRadarSelected && <SliderTime />} {/* Mostrar el componente SliderTime si la capa Precipitacion-radar está seleccionada */}
    </div>
  );
};
