import { useContext } from 'react';
import { Box, Button, Drawer, Typography, useMediaQuery } from '@mui/material';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import './FeatureDrawer.css';
import { AirDrawerCard } from '../DrawerCards/AirDrawerCard';
import { LevelDrawerCard } from '../DrawerCards/LevelDrawerCard/LevelDrawerCard';
import { CloseIcon } from '../../assets/icons/SiataIcons';
import { CamDrawerCard } from '../DrawerCards/CamDrawerCard';

export const FeatureDrawer = () => {
  const { arrayOfDrawer, setArrayOfDrawer } =
    useContext(LayersContext);
  const isMobile = useMediaQuery('(max-width: 600px)');



  const handleDeleteCard = (indexToDelete: number) => {
    const updatedArray = arrayOfDrawer.filter(
      (_, index) => index !== indexToDelete
    );
    setArrayOfDrawer(updatedArray);
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          background: 'var(--primary-500)',
          width: isMobile ? '100%' : '36vw',
        },
      }}
      anchor='right'
      open={() => console.log("open")}
      onClose={() => console.log("close")}>
      <Box
        sx={{
          display: 'grid',
          gap: '15px',
          justifyContent: 'end',
          paddingTop: '20px',
          padding: ''
        }}>

      </Box>
      {arrayOfDrawer.length === 0 ? (
        <Box
          sx={{
            background: 'var(--neutral-50)',
            borderRadius: '8px',
            margin: '30px 20px',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <Typography
            variant='body2'
          >
            Debe seleccionar una estación.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ padding: '0 20px' }}>
          {arrayOfDrawer.map((card, index) =>
            card?.properties?.fig_30d ? (
              <LevelDrawerCard
                key={card?.properties?.codigo && card?.properties?.nombreEstacion}
                featureData={card}
                onDelete={() => handleDeleteCard(index)}
              />
            ) : card?.properties?.PM25_24H_prom ?
              <AirDrawerCard
                key={card?.properties?.codigo && card?.properties?.nombreEstacion}
                featureData={card}
                onDelete={() => handleDeleteCard(index)}
              />
              : (
                <CamDrawerCard
                  key={card?.properties?.codigo && card?.properties?.nombre}
                  featureData={card}
                  onDelete={() => handleDeleteCard(index)}
                />
              )
          )}
        </Box>
      )}
    </Drawer>
  );
};
