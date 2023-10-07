import {
  Box,
  Button,
  // InputAdornment,
  Slider,
  // TextField,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import './SliderTime.css';
import {
  // ChevronDownIcon,
  MoveForwardIcon,
  PlayIcon,
  StopIcon,
} from '../../assets/icons/SiataIcons';
import { useContext } from 'react';
import { PauseIcon } from '../../assets/icons/SiataIcons';
import { LayersContext } from '../../contexts/Layers/LayersContext';

const sliderBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const Timeline = styled(Slider)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? 'var(--aquamarine-300)'
      : 'var(--aquamarine-300)',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 15,
    width: 15,
    backgroundColor: 'var(--aquamarine-300)',
    boxShadow: sliderBoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      '@media (hover: none)': {
        boxShadow: sliderBoxShadow,
      },
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.8,
    backgroundColor: 'var(--primary-500)',
  },
  '& .MuiSlider-mark': {
    backgroundColor: 'var(--primary-500)',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));

const marks = Array.from({ length: 36 }, (_, index) => ({ value: index * 1 }));

export const SliderTime: React.FC = () => {
  const { isPlaying, setIsPlaying, isStopped, setIsStopped, setAnimationSpeed, isFastPlay, setIsFastPlay, currentIndex, setCurrentIndex } =
    useContext(LayersContext);


  const isMobile = useMediaQuery('(max-width: 600px)');

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
    setIsStopped(false);

  };

  const handlePauseButtonClick = () => {
    setIsPlaying(false);
    setIsStopped(false);
    setIsFastPlay(false);
  }

  const handleStopButtonClick = () => {
    setIsPlaying(false);
    setIsStopped(true);
    setIsFastPlay(false);
    setAnimationSpeed(1000)
  };

  const handleFastButtonClick = () => {
    setIsFastPlay(!isFastPlay);
    setAnimationSpeed(!isFastPlay ? 200 : 1000)
    setIsPlaying(false)
    setTimeout(() => handlePlayButtonClick(), 200)
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    // const handleSliderChange = (newValue: number | number[]) => {
    setCurrentIndex(newValue);
    console.log(event.target)

  }

  return (
    <div className='sliderTime'>
      <Box
        sx={{
          minWidth: 'fit-content'
        }}
      >
        <Button
          variant={isPlaying ? 'outlined' : 'contained'}
          sx={{
            background: isPlaying ? 'var(--shades-0)' : 'var(--primary-500)',
            borderRadius: '8px',
            padding: '2px',
            minWidth: isMobile ? '35px' : '31px',
            minHeight: isMobile ? '35px' : '2vw',
            aspectRatio: 1,
          }}
          onClick={isPlaying ? handlePauseButtonClick : handlePlayButtonClick}
          onMouseOut={!isPlaying ? handlePauseButtonClick : handlePlayButtonClick}>
          {isPlaying ? (
            <PauseIcon sx={{ width: '18px', padding: '0 2px 0 0' }} />
          ) : (
            <PlayIcon />
          )}
        </Button>
        <Button
          variant={isStopped ? 'outlined' : 'contained'}
          sx={{
            background: isStopped ? 'var(--shades-0)' : 'var(--primary-500)',
            borderRadius: '8px',
            padding: '2px',
            margin: '0 0 0 3px',
            minWidth: isMobile ? '35px' : '31px',
            minHeight: isMobile ? '35px' : '2vw',
            aspectRatio: 1,
          }}
          onClick={handleStopButtonClick}>
          <StopIcon />
        </Button>
        <Button
          variant={isFastPlay ? 'outlined' : 'contained'}
          sx={{
            background: isFastPlay ? 'var(--shades-0)' : 'var(--primary-500)',
            borderRadius: '8px',
            padding: '2px',
            margin: '0 0 0 3px',
            minWidth: isMobile ? '35px' : '31px',
            minHeight: isMobile ? '35px' : '2vw',
            aspectRatio: 1,
          }}
          onClick={handleFastButtonClick}>
          <MoveForwardIcon sx={{ margin: '0 0 0 3px' }} />
        </Button>
      </Box>
      {isStopped ? <></> : <Box
        sx={{
          width: isMobile ? '55vw' : '78vw',
          padding: isMobile ? '' : '0 1vw',
        }}>
        <Timeline
          aria-label='minute'
          // defaultValue={10}
          marks={marks}
          valueLabelDisplay='auto'
          step={1}
          min={0}
          max={36}
          value={currentIndex}
          onChange={handleSliderChange}
        />
      </Box>}
      {!isMobile && (
        <Box>
          {/* <form>
            <TextField
              placeholder='Mapas'
              variant='outlined'
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <ChevronDownIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: 'var(--shades-0)',
                borderRadius: '16px',
                width: '250px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'var(--neutral-200)',
                    borderRadius: '16px',
                  },
                },
                '& .Mui-focused': {
                  fieldset: {
                    borderColor: 'var(--neutral-200)!important',
                  },
                },
              }}
            />
          </form> */}
        </Box>
      )}
    </div>
  );
};
