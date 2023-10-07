import React, { useContext, useEffect, useState } from 'react';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { Box, Button } from '@mui/material';
import { CloseIcon, ExclamationIcon } from '../../assets/icons/SiataIcons';
import { network } from '../../arrays/network';
import './LegendsLayers.css';

export function LegendsLayers() {

  const { layersState, showLegend, setShowLegend } = useContext(LayersContext);
  const [componentToShow, setComponentToShow] = useState<React.ReactNode>();
  const [activeButton, setActiveButton] = useState('');


  const activeLayers = network
    .filter(item => layersState?.layers[item.id]?.active)
    .map(item => ({ id: item.id, active: true }));

  useEffect(() => {
    const activeLayers = network.filter(
      item => layersState?.layers[item.id]?.active
    );

    if (activeLayers.length > 0) {
      const firstActiveLayer = activeLayers[0];
      setComponentToShow(firstActiveLayer.component);
      setActiveButton(firstActiveLayer.id.toString());
    } else {
      setComponentToShow(null);
      setActiveButton('');
    }
  }, [layersState]);

  const handleButtonClick = (component: React.ReactNode, buttonId: string) => {
    setComponentToShow(component);
    setActiveButton(buttonId);
  };

  const buttonsModal = {
    background: 'var(--neutral-100)',
    borderRadius: '8px',
    padding: '2px',
    minWidth: '35px',
    minHeight: '35px',
    margin: '0 0 1vh 1vw',
  };

  const closeLegend = () => {
    setShowLegend(!showLegend);
  };

  return (
    <div className='legendsLayers'>
      <Box sx={{ opacity: showLegend ? 1 : 0 }}>{componentToShow}</Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: showLegend ? '' : 'relative',
        }}>
        {activeLayers.map(activeLayer => {
          const networkItem = network.find(item => item.id === activeLayer.id);
          if (networkItem) {
            return (
              <Button
                key={networkItem.id}
                variant='contained'
                className='legend-button'
                sx={{
                  ...buttonsModal,
                  background:
                    activeButton === networkItem.id.toString()
                      ? 'var(--primary-500)'
                      : 'var(--neutral-100)',
                }}
                onClick={() =>
                  handleButtonClick(
                    networkItem.component,
                    networkItem.id.toString()
                  )
                }>
                {networkItem.icon}
              </Button>
            );
          }
        })}
        <Button
          variant='contained'
          sx={{
            ...buttonsModal,
            color: 'var(--shades-0)',
          }}
          onClick={closeLegend}>
          {showLegend ? <CloseIcon /> : <ExclamationIcon />}
        </Button>
      </Box>
    </div>
  );
}
