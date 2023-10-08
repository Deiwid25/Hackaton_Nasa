import { useContext } from 'react';
import { Box, Button, Drawer, Typography, useMediaQuery } from '@mui/material';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import './FeatureDrawer.css';
import { AirDrawerCard } from '../DrawerCards/AirDrawerCard';
import { LevelDrawerCard } from '../DrawerCards/LevelDrawerCard/LevelDrawerCard';
import { CloseIcon } from '../../assets/icons/SiataIcons';
import { CamDrawerCard } from '../DrawerCards/CamDrawerCard';

export const FeatureDrawer = () => {
  const { drawerOpen, setDrawerOpen, arrayOfDrawer, setArrayOfDrawer } =
    useContext(LayersContext);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

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
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}>
      <Box
        sx={{
          display: 'grid',
          gap: '15px',
          justifyContent: 'end',
          paddingTop: '20px',
          padding: ''
        }}>
        <Button
          sx={{
            minWidth: '1px',
            color: 'var(--shades-0)',
          }}
          onClick={handleCloseDrawer}>
          <CloseIcon />
        </Button>
      </Box>

      <Box
        sx={{
          background: 'var(--neutral-50)',
          borderRadius: '8px',
          margin: '30px 20px',
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          flexDirection:'column'
        }}
      >
        <Typography
          variant='h5'
        >
          Indicador PM2.5 Historico
        </Typography>
        <img src="" alt="Historico Indicador PM2.5." />

      </Box>

    </Drawer>
  );
};
