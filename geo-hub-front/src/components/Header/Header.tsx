import './Header.css';
import { useContext } from 'react';
import { Button, Typography, useMediaQuery } from '@mui/material';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '../../assets/icons/SiataIcons';
import { HeaderContext } from '../../contexts/Header/HeaderContext';


export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { displayForecast, setDisplayForecast } = useContext(HeaderContext)


  const buttonVariant = isMobile ? 'bodySemiBold3' : 'bodySemiBold2';

  const handleButtonClick = () => {
    window.open('https://siata.gov.co/portalWeb/', '_blank');
  };
  return (
    <header className='header'>
      <div className='img-header--container'>
        <img
          src={""}
          alt='logo siata'
          width="150"
          height="360"
        />
      </div>
      {isMobile ? null : (
        <Button
          className="siata-button-header"
          onClick={() => setDisplayForecast(!displayForecast)}
        >
          <Typography className="typography-header" variant="bodyMedium1" sx={{ fontSize: '120%' }}>
            Pronóstico & Meteorología
          </Typography>
          {displayForecast ? (
            <ChevronUpIcon sx={{ color: 'var(--shades-0)' }} />
          ) : (
            <ChevronDownIcon sx={{ color: 'var(--shades-0)' }} />
          )}
        </Button>
      )}
    </header>
  );
};
