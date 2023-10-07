import React, { useContext } from 'react';
//Styles
import './Forecast.css';
//MUI Components
import { AccordionDetails, AccordionSummary, Typography, useMediaQuery, Box, Modal } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
// import { ExpandMore } from "@mui/icons-material";

//Components
import { ForecastWidget } from '../ForecastWidget/ForecastWidget';

//Services
import { useForecast } from '../../hooks/useForecast';
import { ChevronDownIcon, ChevronUpIcon } from '../../assets/icons/SiataIcons';
import { HeaderContext } from '../../contexts/Header/HeaderContext';



/* This code is creating a custom styled component called `Accordion` using the `styled` function from
the Material-UI library. The `Accordion` component is based on the `MuiAccordion` component from
Material-UI, but with additional styles applied to it. */
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    displayForecast: 'none',
  },
}));

export const Forecast = () => {
  const { forecast, loading, error } = useForecast();
  const { displayForecast, setDisplayForecast } = useContext(HeaderContext)
  const isMobile = useMediaQuery('(max-width: 600px)');

  const getForecastTitleMobile = () => {
    if (!displayForecast) {
      return 'Pronóstico & Meteorología';
    } else if (error) {
      return 'Pronóstico no disponible';
    } else if (loading) {
      return 'Pronóstico & Meteorología';
    } else {
      return forecast?.location;
    }
  };

  const getForecastTitleDesktop = () => {
    if (displayForecast) {
      return forecast?.location;
    } else if (error) {
      return 'Pronóstico no disponible';
    } else if (loading) {
      return 'Cargando pronóstico';
    } else {
      return forecast?.location;
    }
  };


  const forecastTitleMobile = getForecastTitleMobile();
  const forecastTitleDesktop = getForecastTitleDesktop();

  return (
    <React.Fragment>
      {isMobile ?
        <Accordion className='forecast-header--container'>
          <AccordionSummary
            className='forecast-title--container'
            sx={{
              height: '25px',
              minHeight: '25px',
              maxHeight: '25px',
              width: '90vw',
              // display: "flex",
              // justifyContent: "center",
              '&.Mui-expanded': {
                minHeight: '25px',
                maxHeight: '25px',
                width: '90vw',
              },
            }}
            onClick={() => setDisplayForecast(!displayForecast)}>
            <Typography color='primary' variant='body2' className='text-forecast'>
              {forecastTitleMobile}
            </Typography>
            {displayForecast ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </AccordionSummary>
          <AccordionDetails sx={{ width: '95%' }}>
            <ForecastWidget {...forecast} />
          </AccordionDetails>
        </Accordion>
        :
        <Modal
          open={displayForecast}
          onClose={() => setDisplayForecast(false)}
          slotProps={{ backdrop: { style: { backgroundColor: "transparent" } } }}
        >
          <Box className="forecast-desktop--container"
            sx={{ opacity: `${displayForecast ? 1 : 0}`, transition: "all 0.5s ease-in-out" }} >
            <Typography variant='body1' className="forecast-location--container">
              {forecastTitleDesktop}
            </Typography>
            <ForecastWidget {...forecast} />
          </Box>
        </Modal>

      }
    </React.Fragment >
  );
};
