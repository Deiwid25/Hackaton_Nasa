import { Box, Typography, useMediaQuery } from '@mui/material';

export const NivelesDeQuebradas = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const nivelesDeQuebradas = [
    {
      text: 'Nivel de agua seguro',
      subText: 'No se registran cambios.',
      legend: 'N1',
      color: 'var(--ica-green)',
    },
    {
      text: 'Nivel de precaución',
      subText: 'Se presenta un aumento de nivel.',
      legend: 'N2',
      color: 'var(--ica-yellow)',
    },
    {
      text: 'Inundación menor',
      subText: 'Afectaciones menores en construcciones cercanas.',
      legend: 'N3',
      color: 'var(--ica-orange)',
    },
    {
      text: 'Inundación mayor',
      subText: 'Inundación extensiva, es necesaria la evacuación.',
      legend: 'N4',
      color: 'var(--ica-red)',
    },
    {
      subText: 'Estación sin comunicación en los últimos minutos.',
      legend: 'SN',
      color: 'var(--ica-grey)',
    },
    {
      subText: 'Estación sin comunicación en las últimas horas.',
      legend: 'SN',
      color: 'var(--ica-black)',
    },
  ];

  return (
    <Box
      sx={{
        background: 'var(--shades-0)',
        borderRadius: '8px',
        height: isMobile ? '80vh' : '35vh',
        minHeight: "348px",
        width: isMobile ? '70vw' : '12.5vw',
        minWidth: "290px",
        overflow: 'auto',
      }}>
      <Box
        sx={{
          backgroundColor: 'var(--primary-500)',
          color: 'var(--shades-0)',
          height: isMobile ? '8vh' : '5vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant='bodyBold4'>Niveles de quebradas</Typography>
      </Box>
      {nivelesDeQuebradas.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gridTemplateColumns: '5fr 2fr',
            gridTemplateRows: isMobile ? '12.01vh' : '50px',
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
              padding: isMobile ? '' : '0 5px',
            }}>
            <Typography variant='body2'>{item.text}</Typography>
            <Typography
              variant='body4'
              sx={{
                width: '100%',
                padding: '0 5px',
              }}>
              {item.subText}
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
              sx={{
                color: 'var(--shades-0)',
              }}>
              {item.legend}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
