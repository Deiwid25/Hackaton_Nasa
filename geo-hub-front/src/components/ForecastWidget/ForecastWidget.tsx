import React from 'react';
import { Typography, Box } from '@mui/material';
import { ExclamationIcon } from '../../assets/icons/SiataIcons';

import './ForecastWidget.css';
import { ForecastResponse, timeLapse } from '../../types';

import { RainyForecast } from '../../assets/icons/RainyForecast';
import { SunnyForecast } from '../../assets/icons/SunnyForecast';
import { HalfRainDay } from '../../assets/icons/HalfRainDay';
import { HalfRainNight } from '../../assets/icons/HalfRainNight';
import { MoonForecast } from '../../assets/icons/MoonForecast';
import { lapseOfTimeWithIndex } from "../../services/timeService";


interface forecastItemProps {
  title: string;
  info: string | number | React.ReactNode;
  timeLapse: timeLapse['lapseIndex'];
  units?: string;
  flexDirection?: 'column' | 'row';
  subtitle?: string;
}

const ForecastImage = (
  timeLapse: forecastItemProps['timeLapse'],
  forecast: string
): forecastItemProps['info'] => {
  //Forecast Icons Morning and Afternoon
  if (
    (timeLapse === 1 ||
      timeLapse === 2 ||
      timeLapse === 5 ||
      timeLapse === 6) &&
    forecast?.toLowerCase() === 'baja'
  ) {
    return <SunnyForecast />;
  }
  if (
    (timeLapse === 1 ||
      timeLapse === 2 ||
      timeLapse === 5 ||
      timeLapse === 6) &&
    forecast?.toLowerCase() === 'media'
  ) {
    return <HalfRainDay />;
  }
  //Forecast Icons Night
  if (
    (timeLapse === 3 || timeLapse === 4) &&
    forecast?.toLowerCase() === 'baja'
  ) {
    return <MoonForecast />;
  }
  if (
    (timeLapse === 0 ||
      timeLapse === 3 ||
      timeLapse === 4 ||
      timeLapse === 7) &&
    forecast?.toLowerCase() === 'media'
  ) {
    return <HalfRainNight />;
  }

  //Forecast for High Rain
  if (forecast?.toLowerCase() === 'alta') {
    return <RainyForecast />;
  }
  if (
    (timeLapse === 1 || timeLapse === 2) &&
    forecast?.toLowerCase() === 'baja'
  ) {
    return <SunnyForecast />;
  }
  return <ExclamationIcon />;
};

const ForecastItem = ({
  title,
  info,
  timeLapse,
  units,
  flexDirection,
  subtitle,
}: forecastItemProps) => {
  return (
    <section
      className='forecast-report--item'
    // style={{
    //   backgroundColor: `${
    //     timeLapse === 1 || timeLapse === 2 || timeLapse === 5
    //       ? "#fbab7e"
    //       : "#ffffff"
    //   }`,
    //   backgroundImage: `${
    //     timeLapse === 1 || timeLapse === 2 || timeLapse === 5
    //       ? "linear-gradient(0deg, #0285be 0%, #0285be 10%, #ffffff 100%)"
    //       : "linear-gradient(0deg, #081f2d, 0%, #081f2d 10%, #ffffff 100%)"
    //   }`,
    // }}
    >
      <Typography sx={{ fontSize: '10px' }}>{title}</Typography>
      {/* <div style={{ fontSize: "14px", minWidth: "max-content" }}>{title}</div> */}
      <Typography variant='bodySemiBold4'>{subtitle}</Typography>
      <div
        className='forecast-report--circle'
        style={{
          backgroundColor: `${timeLapse === 1 || timeLapse === 2 || timeLapse === 5
            ? '#C5E3F5'
            : '#081f2d'
            }`,
          flexDirection: flexDirection ?? 'row',
        }}
      >
        <div>{info}</div>
        {units ? (
          <Typography style={{ fontSize: '11px', fontWeight: 500 }}>
            {units}
          </Typography>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};

export const ForecastWidget = ({
  rainProbability,
  lapseOfTime,
}: ForecastResponse) => {
  return (
    <Box className='forecast-report--wrapper'>
      <ForecastItem
        title={lapseOfTime.lapseOfDay}
        subtitle={rainProbability[lapseOfTime.lapseIndex]}
        info={ForecastImage(
          lapseOfTime?.lapseIndex,
          rainProbability[lapseOfTime?.lapseIndex]
        )}
        timeLapse={lapseOfTime.lapseIndex}
        // units={"°C"}
        flexDirection='column'
      />
      <ForecastItem
        title={lapseOfTimeWithIndex(lapseOfTime.lapseIndex + 1)}
        subtitle={rainProbability[lapseOfTime.lapseIndex + 1]}
        info={ForecastImage(
          lapseOfTime?.lapseIndex + 1,
          rainProbability[lapseOfTime?.lapseIndex + 1]
        )}
        timeLapse={lapseOfTime.lapseIndex + 1}
      // units={"°C"}
      />
      <ForecastItem
        title={lapseOfTimeWithIndex(lapseOfTime.lapseIndex + 2)}
        subtitle={rainProbability[lapseOfTime.lapseIndex + 2]}
        info={ForecastImage(
          lapseOfTime?.lapseIndex + 2,
          rainProbability[lapseOfTime?.lapseIndex + 2]
        )}
        timeLapse={lapseOfTime.lapseIndex + 2}
      />
      <ForecastItem
        title={lapseOfTimeWithIndex(lapseOfTime.lapseIndex + 3)}
        subtitle={rainProbability[lapseOfTime.lapseIndex + 3]}
        info={ForecastImage(
          lapseOfTime?.lapseIndex + 3,
          rainProbability[lapseOfTime?.lapseIndex + 3]
        )}
        timeLapse={lapseOfTime.lapseIndex + 3}
      />
    </Box>
  );
};
