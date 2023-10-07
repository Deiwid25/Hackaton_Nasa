import { Box, Typography, useMediaQuery } from '@mui/material';

export const CalidadDelAire = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const calidadDelAire = [
    {
      text: 'Buena',
      legend: '0/12',
      color: 'var(--ica-green)',
    },
    {
      text: 'Moderada',
      legend: '13/37',
      color: 'var(--ica-yellow)',
    },
    {
      text: 'Dañina para grupos sensibles',
      legend: '38/55',
      color: 'var(--ica-orange)',
    },
    {
      text: 'Dañina a la salud',
      legend: '55/150',
      color: 'var(--ica-red)',
    },
    {
      text: 'Muy dañina a la salud',
      legend: '151+',
      color: 'var(--ica-purple)',
    },
    {
      text: 'Sin datos en las últimas 24 horas',
      legend: 'SD',
      color: 'var(--ica-grey)',
    },
    {
      text: 'No aplica normativa',
    },
  ];

  return (
    <Box
      sx={{
        background: 'var(--shades-0)',
        borderRadius: '8px',
        height: isMobile ? '80vh' : '45vh',
        minHeight: "370px",
        minWidth: "220px",
        width: isMobile ? '70vw' : '12.5vw',
        overflow: 'auto',
      }}>
      <Box
        sx={{
          backgroundColor: 'var(--primary-500)',
          color: 'var(--shades-0)',
          height: isMobile ? '8vh' : '5vh',
          minHeight: "45.5px",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant='bodyBold4'>Calidad del Aire</Typography>
      </Box>
      {calidadDelAire.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: isMobile ? '9vh' : '46px',
            justifyContent: 'center',
            justifyItems: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              borderTop: '1px solid black',
              borderRight: '1px solid black',
            }}>
            <Typography
              variant={isMobile ? 'body2' : 'body3'}
              sx={{
                padding: '0 5px',
              }}>
              {item.text}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: item.color,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTop: '1px solid black',
            }}>
            <Typography
              variant='bodyMedium4'
              sx={{
                color: 'var(--shades-0)',
              }}>
              {item.legend}
            </Typography>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          height: isMobile ? '9vh' : '4.8vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid black',
        }}>
        <Box>
          <Typography
            variant='body4'
            sx={{
              width: '120px',
            }}>
            Poblacionales
          </Typography>
        </Box>
        <Box>
          <Typography
            variant='body4'
            sx={{
              width: '120px',
            }}>
            Vehiculares e industriales
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
