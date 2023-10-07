import {
  Button,
  // InputAdornment,
  // TextField,
  useMediaQuery
} from '@mui/material';
import {
  FacebookIcon,
  InstagramIcon,
  OutlineLocationIcon,
  // SearchIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../../assets/icons/SiataIcons';
import './SocialNetworks.css';
import {
  // FormEvent, 
  useContext,
  // useState 
} from 'react';
import { MapsContext } from '../../contexts/Maps/MapsContext';
// import { relative } from 'path';


export const SocialNetworks: React.FC = () => {
  const isTablet = useMediaQuery('(max-width: 870px)')
  // const [searchValue, setSearchValue] = useState('');
  const { setMyLocation } = useContext(MapsContext);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(event.target.value);
  // };

  // const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log('Buscar: ', searchValue);
  // };

  const handleButtonClick = (url: string) => {
    window.open(url, '_blank');
  };


  const buttons = [
    {
      icon: <FacebookIcon />,
      label: 'Facebook',
      url: 'https://www.facebook.com/siatamedellin',
    },
    {
      icon: <TwitterIcon />,
      label: 'Twitter',
      url: 'https://twitter.com/siatamedellin',
    },
    {
      icon: <InstagramIcon />,
      label: 'Instagram',
      url: 'https://www.instagram.com/siatamedellin',
    },
    {
      icon: <YoutubeIcon />,
      label: 'Youtube',
      url: 'https://www.youtube.com/user/siatamedellin',
    },
  ];

  return (
    <div className='socialNetworks'>
      <div>
        {!isTablet && buttons.map(button => (
          <Button
            className='button-socialNetworks'
            key={button.label}
            variant='text'
            onClick={() => handleButtonClick(button.url)}
            sx={{
              color: 'var(--primary-500)',
              minWidth: '1vw',
              margin: '0 10px'
            }}>
            {button.icon}
          </Button>
        ))}
      </div>
      <div>
        <Button
          variant='contained'
          sx={!isTablet ? {
            background: 'var(--primary-500)',
            borderRadius: '8px',
            padding: '5px',
            margin: '0 10px 4px 0',
            minWidth: '1vw',
          } : {
            background: 'var(--primary-500)',
            borderRadius: '8px',
            padding: '5px',
            minWidth: '1vw',
            position: 'absolute',
            right: "12px",
          }}
          onClick={async () => await setMyLocation()}>
          <OutlineLocationIcon />
        </Button>
      </div>
      {/* <form onSubmit={handleSearchSubmit}>
        <TextField
          placeholder='Buscar municipios'
          value={searchValue}
          onChange={handleSearchChange}
          variant='outlined'
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            background: 'var(--shades-0)',
            borderRadius: '16px',
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
    </div>
  );
};
