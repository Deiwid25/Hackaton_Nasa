import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { GeoJsonProperties } from 'geojson';
import { CloseIcon } from '../../assets/icons/SiataIcons';
import EcaChart from '../Graphics/EcaChart';

interface CardDrawerProps {
  featureData: GeoJsonProperties;
  onDelete: () => void;
  // getPM25: GeoJsonProperties;
}

const seriesTiempo = [
  '12 Horas',
  '24 Horas',
  '72 Horas',
  // '30 Días',
];

const AirDrawerCard = ({ featureData, onDelete }: CardDrawerProps) => {
  const [selectTime, setSelectTime] = useState<string[]>(['12 Horas']);
  const [isTimeSeries, setIsTimeSeries] = useState(true);
  const [selectSensor] = useState<string[]>(['Material particulado PM2.5']);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [calculatedDateTime, setCalculatedDateTime] = useState<string>('');

  const calculateDateTime = (hours: number): string => {
    const now = new Date();
    const targetDateTime = new Date(now.getTime() - hours * 60 * 60 * 1000);
    const day = targetDateTime.getDate();
    const month = targetDateTime.toLocaleString('default', { month: 'short' });
    const formattedDateTime = `${day} ${month.replace('.', '')}`;
    return formattedDateTime;
  };

  //Coordinates of station
  const longitude = featureData?.geometry?.coordinates[0];
  const latitude = featureData?.geometry?.coordinates[1];

  const handleChange = (event: SelectChangeEvent<typeof selectTime>) => {
    const {
      target: { value },
    } = event;
    setSelectTime(typeof value === 'string' ? value.split(',') : value);

    if (value === '12 Horas') {
      const dateTime = calculateDateTime(12);
      setCurrentDateTime(dateTime);
    } else if (value === '24 Horas') {
      const dateTime = calculateDateTime(24);
      setCurrentDateTime(dateTime);
    } else if (value === '72 Horas') {
      const dateTime = calculateDateTime(72);
      setCurrentDateTime(dateTime);
    }
  };

  const handleTimeSeriesClick = () => {
    setIsTimeSeries(true);
  };

  const handleDescriptionClick = () => {
    setIsTimeSeries(false);
  };

  function clasificacionPM25(promedio: number): string {
    if (typeof promedio === 'number') {
      if (promedio >= 0 && promedio <= 12) {
        return 'Buena';
      } else if (promedio >= 13 && promedio <= 37) {
        return 'Moderada';
      } else if (promedio >= 39 && promedio <= 55) {
        return 'Dañina para grupos sensibles';
      } else if (promedio >= 56 && promedio <= 150) {
        return 'Dañina para la salud';
      } else {
        return 'Muy dañina a la salud';
      }
    } else {
      return 'Sin datos en las últimas 24 horas';
    }
  }

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString('default', { month: 'short' });
      const formattedCurrentDateTime = `${day} ${month.replace('.', '')}`;
      setCurrentDateTime(formattedCurrentDateTime);

      if (selectTime.length === 1) {
        if (selectTime[0] === '12 Horas') {
          const dateTime = calculateDateTime(12);
          setCalculatedDateTime(dateTime);
        } else if (selectTime[0] === '24 Horas') {
          const dateTime = calculateDateTime(24);
          setCalculatedDateTime(dateTime);
        } else if (selectTime[0] === '72 Horas') {
          const dateTime = calculateDateTime(72);
          setCalculatedDateTime(dateTime);
        }
      }
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 600000); // Actualiza la fecha y hora cada 10 minutos
    return () => clearInterval(intervalId);
  }, [selectTime]);

  return (
    <div
      style={!isMobile ? drawerWrappedStyleDesktop : drawerWrappedStyleMobile}>
      <Card
        sx={{
          borderRadius: '8px',
        }}>
        <CardActionArea
          disableRipple
          sx={{
            cursor: 'auto',
          }}>
          <CardContent
            sx={{
              background: 'var(--neutral-50)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 -20px 0 0',
            }}>
            <Box>
              <Typography variant='bodySemiBold4'>
                Estación #{featureData?.properties?.codigo}
              </Typography>
              <Typography variant='body2'>
                {featureData?.properties?.nombreEstacion}
              </Typography>
            </Box>
            <Button
              size='small'
              onClick={onDelete}
              sx={{
                color: 'var(--primary-500)',
              }}>
              <CloseIcon />
            </Button>
          </CardContent>
          <Box
            sx={{
              background: 'var(--neutral-50)',
              margin: '10px 10px',
              padding: '10px 10px',
              border: 'solid 1px var(--neutral-200)',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '5px',
            }}>
            <Button
              variant='contained'
              sx={{
                textTransform: 'none',
                background: isTimeSeries
                  ? 'var(--primary-500)'
                  : 'var(--neutral-50)',
                color: isTimeSeries ? '' : 'var(--primary-500)',
                height: '30px',
                width: '50vw',
                fontSize: '13px',
              }}
              onClick={handleTimeSeriesClick}>
              Series de tiempo
            </Button>
            <Button
              variant='contained'
              sx={{
                textTransform: 'none',
                background: isTimeSeries
                  ? 'var(--neutral-50)'
                  : 'var(--primary-500)',
                color: isTimeSeries ? 'var(--primary-500)' : '',
                height: '30px',
                width: '50vw',
                fontSize: '13px',
              }}
              onClick={handleDescriptionClick}>
              Descripción
            </Button>
          </Box>
          {isTimeSeries ? (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '0 10px',
                }}>
                <Box>
                  <FormControl>
                    <Select
                      displayEmpty
                      value={selectSensor}
                      // input={<OutlinedInput />}
                      renderValue={selected => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                        return selected.join(', ');
                      }}
                      sx={{
                        color: 'var(--primary-500)',
                        background: 'var(--neutral-50)',
                        height: '30px',
                        fontSize: '14px',
                        width: isMobile ? '50vw' : '25vw',
                      }}>
                      <MenuItem>Material particulado PM2.5</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <Select
                      displayEmpty
                      value={selectTime}
                      onChange={handleChange}
                      // input={<OutlinedInput />}
                      renderValue={selected => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                        return selected.join(', ');
                      }}
                      sx={{
                        color: 'var(--primary-500)',
                        background: 'var(--neutral-50)',
                        height: '30px',
                        fontSize: '14px',
                      }}>
                      {seriesTiempo.map(serie => (
                        <MenuItem key={serie} value={serie}>
                          {serie}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* <CardMedia
            component='img'
            image={featureData?.PM25_24H_fig}
            alt={`Gráfica de concentración de PM2.5 de la estación ${featureData?.nombreEstacion}`}
            sx={{
              width: '33vw',
              padding: '10px',
              margin: '10px 20px 10px 10px',
              border: 'solid 1px var(--primary-500)',
              borderRadius: '4px',
            }}
          /> */}
              <Box
                sx={{
                  display: 'flex',
                  width: isMobile ? '94%' : '33vw',
                  padding: '10px',
                  margin: '10px 20px 10px 10px',
                  border: 'solid 1px var(--primary-500)',
                  borderRadius: '4px',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                    width: '30px',
                    height: isMobile ? '10vh' : '15vh',
                  }}>
                  <Typography
                    variant='body4'
                    sx={{
                      transform: 'rotate(-90deg)',
                      width: '70px',
                    }}>
                    PM 2.5 (µg/m3)
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '100vw',
                    height: isMobile ? '20vh' : '',
                  }}>
                  <EcaChart
                    codigo={featureData?.properties?.codigo}
                    selectedTime={selectTime}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: 'solid 1px var(--neutral-200)',
                      padding: '0 0 10px 0',
                    }}>
                    <Typography variant='body4'>
                      {calculatedDateTime}
                    </Typography>
                    <Typography variant='body4'>{currentDateTime}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  margin: '10px',
                  padding: '10px',
                  border: 'solid 1px var(--primary-500)',
                  borderRadius: '4px',
                }}>
                <Box
                  sx={{
                    color: 'var(--primary-500)',
                    display: 'grid',
                  }}>
                  <Typography variant={isMobile ? 'bodyBold4' : 'bodyBold3'}>
                    Promedio últimas 24 horas:
                  </Typography>
                  <Typography variant={isMobile ? 'body4' : 'body3'} sx={{ fontStyle: 'italic' }}>
                    Norma 24 horas: 37 µg/m3. ¿Cumple la norma? Sí.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    width={isMobile ? 30 : 50}
                    height={isMobile ? 30 : 50}
                    borderRadius='50%'
                    bgcolor={featureData?.properties?.color}>
                    <Typography variant={isMobile ? 'bodyBold4' : 'bodyBold2'}>
                      {featureData?.properties?.PM25_24H_prom}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Typography variant={isMobile ? 'bodyBold3' : 'bodyBold1'}>|</Typography>
                    <Typography variant={isMobile ? 'bodyBold4' : 'bodyBold2'}>
                      {clasificacionPM25(
                        featureData?.properties?.PM25_24H_prom
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                color: 'var(--primary-500)',
                padding: '10px',
                margin: '10px 10px',
                border: 'solid 1px var(--primary-500)',
                borderRadius: '4px',
              }}>
              <Box sx={cardDescriptionStyle}>
                <Typography variant='bodyBold4'>Código: </Typography>
                <Typography variant='body3'>
                  {featureData?.properties?.codigo}
                </Typography>
              </Box>
              <Box sx={cardDescriptionStyle}>
                <Typography variant='bodyBold4'>Municipio: </Typography>
                <Typography variant='body3'>Medellín*</Typography>
              </Box>
              <Box sx={cardDescriptionStyle}>
                <Typography variant='bodyBold4'>Longitud</Typography>
                <Typography variant='body3'>{longitude}</Typography>
              </Box>
              <Box sx={cardDescriptionStyle}>
                <Typography variant='bodyBold4'>Latitud: </Typography>
                <Typography variant='body3'>{latitude}</Typography>
              </Box>
              <Box sx={cardDescriptionStyle}>
                <Typography variant='bodyBold4'>Link micrositio: </Typography>
                <Typography variant='body3'>
                  https://www.metropol.gov.co/ambiental/calidad-del-aire/
                </Typography>
              </Box>
              <Box sx={cardDescriptionStyle}>
                <Typography variant='bodyBold4'>Máximo operador: </Typography>
                <Typography variant='body3'>PM2.5</Typography>
              </Box>
              <Box sx={cardDescriptionStyle}>
                <Typography variant='bodyBold4'>
                  Concentración máximo operador:
                </Typography>
                <Typography variant='body3'>
                  {featureData?.properties?.PM25_24H_prom}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '5px',
                  padding: '5px 0 0 0',
                  alignItems: 'center',
                }}>
                <Typography variant='bodyBold4'>PM2.5: </Typography>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  width={25}
                  height={25}
                  borderRadius='50%'
                  bgcolor={featureData?.properties?.color}>
                  <Typography variant='bodySemiBold4'>
                    {featureData?.properties?.PM25_24H_prom}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                  <Typography variant='bodySemiBold4'>|</Typography>
                  <Typography variant='bodySemiBold4'>
                    {clasificacionPM25(featureData?.properties?.PM25_24H_prom)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '10px 0',
                  borderBottom: 'solid 1px black',
                  margin: '0 -10px',
                }}>
                <Box sx={circleStyle}></Box>
                <Box sx={circleStyle}></Box>
                <Box sx={circleStyle}></Box>
                <Box sx={circleStyle}></Box>
                <Box sx={circleStyle}></Box>
                <Box sx={circleStyle}></Box>
                <Box sx={circleStyle}></Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px 0 0 0',
                }}>
                <Typography variant='body3'>
                  Fecha última actualización:{' '}
                  {featureData?.properties?.fechaFin}
                </Typography>
              </Box>
            </Box>
          )}
        </CardActionArea>
      </Card>
    </div>
  );
};

const drawerWrappedStyleDesktop = {
  width: '34vw',
  backgroundColor: 'rgba(8,31,45,0.6)',
  margin: '1vh 0',
};

const drawerWrappedStyleMobile = {
  width: '100%',
  backgroundColor: 'rgba(8,31,45,0.8)',
  margin: '1vh 0',
  // padding: '1rem',
};

const cardDescriptionStyle = {
  display: 'flex',
  gap: '5px',
  padding: '0 0 5px 0',
};

const circleStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: 'var(--primary-500)',
};

export { AirDrawerCard };
