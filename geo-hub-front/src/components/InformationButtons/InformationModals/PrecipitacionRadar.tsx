import { Box, Typography, useMediaQuery } from '@mui/material';
import { HorizontalLineIcon } from '../../../assets/icons/SiataIcons';

export const PrecipitacionRadar = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const precipitacionRadar = [
    {
      text: 'Intensidades muy altas o probabilidad de ocurrencia de granizo',
    },
    {
      text: 'Intensidades altas',
    },
    {
      text: 'Intensidades moderadas',
    },
    {
      text: 'Intensidades bajas',
    },
  ];

  const precipitacionNumbers = [
    {
      number: '80',
    },
    {
      number: '70',
    },
    {
      number: '60',
    },
    {
      number: '50',
    },
    {
      number: '40',
    },
    {
      number: '30',
    },
    {
      number: '20',
    },
    {
      number: '10',
    },
    {
      number: '0',
    },
  ];

  return (
    <Box
      sx={{
        background: 'var(--shades-0)',
        borderRadius: '8px',
        minHeight: "355px",
        height: isMobile ? '80vh' : '45.2vh',
        minWidth: "225px",
        width: isMobile ? '70vw' : '12.5vw',
        overflow: 'auto',

      }}>
      <Box
        sx={{
          backgroundColor: 'var(--primary-500)',
          color: 'var(--shades-0)',
          height: isMobile ? '8vh' : '5vh',
          minHeight: "37.5px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant='bodyBold4'>Precipitación - Radar</Typography>
        <Typography variant='bodyMedium4'>Reflectividad (dBz)</Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: isMobile ? '71vh' : '',
          justifyContent: 'center',
          justifyItems: 'center',
        }}>
        <Box>
          {precipitacionRadar.map(item => (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: isMobile ? '18vh' : '10vh',
                minHeight: "79px",
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                borderTop: '1px solid black',
                borderRight: '1px solid black',
              }}>
              <Typography
                variant='body3'
                sx={{
                  padding: '0 5px',
                }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            borderTop: '1px solid black',
            background:
              'linear-gradient(180deg, #FFFFFF, #F9CCEB, #ED8CD6, #DA5FC7, #BC24B4, #A40A6A, #B31400, #FD0601, #F93E0B, #FD8401, #FDFC49, #42CF2B, #3B734E, #3835B6, #0B09F0, #0EFDFF, #FFFFFF)',
            margin: '0 0 -1vh 0',
          }}
        >
          {precipitacionNumbers.map(number => (
            <Typography
              variant='bodyMedium4'
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                justifyItems: 'center',
                margin: isMobile ? '0 0 -3vh -1vw' : '0 0 -2vh 0',
              }}>
              <HorizontalLineIcon
                sx={{
                  width: '100%',
                }}
              />
              {number.number}
              <HorizontalLineIcon
                sx={{
                  width: '100%',
                }}
              />
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
