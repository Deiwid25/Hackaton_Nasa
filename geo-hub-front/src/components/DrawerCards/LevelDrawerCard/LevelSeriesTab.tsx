import { GeoJsonProperties } from 'geojson';
import { TimeLevelChart } from '../../Graphics/TimeLevelChart';
import { AverageLevelChart } from '../../Graphics/AverageLevelChart';
import { FormControl, Typography, MenuItem, Box, Select, SelectChangeEvent } from '@mui/material';

import { useState } from 'react';


interface LevelSeriesTabProps {
    featureData: GeoJsonProperties;
    // date: Date;
    // minutesPerInterval: IntervalObject[];
}


export const LevelSeriesTab = ({ featureData }: LevelSeriesTabProps) => {
    const [timeInterval, setTimeInterval] = useState<number>(180)

    const handleChange = (event: SelectChangeEvent<number>) => {
        setTimeInterval(event.target.value as number)
    }




    return (
        <>
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
                <FormControl>
                    <Select
                        displayEmpty
                        value={timeInterval}
                        onChange={handleChange}
                        // input={<OutlinedInput />}
                        //   renderValue={selected => {
                        //     if (selected.length === 0) {
                        //       return <em>Placeholder</em>;
                        //     }
                        //     return selected.join(', ');
                        //   }}
                        sx={{
                            color: 'var(--primary-500)',
                            background: 'var(--neutral-50)',
                            height: '30px',
                            fontSize: '14px',
                            width: '100%',
                        }}>
                        <MenuItem value={180} selected >Escala de tiempo (últimas 3 horas)</MenuItem>
                        {/* <MenuItem value={1440}>Escala de tiempo (últimas 24 horas)</MenuItem>
                        <MenuItem value={4320}>Escala de tiempo (últimas 72 horas)</MenuItem> */}
                        {/* <MenuItem value={43200}>Escala de tiempo (últimos 30 días)</MenuItem> */}
                    </Select>
                </FormControl>
            </Box>
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
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='body2'>
                        {`${featureData?.properties?.codigo} | ${featureData?.properties?.nombreEstacion}`}
                    </Typography>
                    <Typography variant='body3'>Serie de Tiempo</Typography>
                    <TimeLevelChart timeInterval={timeInterval} />
                    <br />
                    <br />
                    <Typography variant='body2'>Sección Transversal</Typography>
                    <AverageLevelChart />
                </div>
            </Box>
        </>
    )
}





{/* // </div> */ }