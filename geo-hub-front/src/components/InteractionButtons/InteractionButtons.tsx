import {
  Button,
  Modal,
  useMediaQuery,
} from '@mui/material';
import {
  EmailOpenIcon,
  OutlineLocationIcon,
  VideoCameraIcon,
} from '../../assets/icons/SiataIcons';
import { useContext, useState } from 'react';
import './InteractionButtons.css';
import { MapsContext } from '../../contexts/Maps/MapsContext';
import { ContactForm } from '../ContactForm/ContactForm';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { LegendsLayers } from '../LengendsLayers/LegendsLayers';
import { ZoomControl } from '../ZoomControl/ZoomControl';


export const InteractionButtons: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { setShowCams, showCams } = useContext(LayersContext);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isShortHeight = useMediaQuery('(max-height: 880px)');
  const { setMyLocation } = useContext(MapsContext);


  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  const buttons = isMobile
    ? [
      {
        icon: <OutlineLocationIcon />,
        label: 'Location',
        onClick: async () => await setMyLocation()
      },
      {
        icon: <VideoCameraIcon />,
        label: 'Camera',
        onClick: () => setShowCams(!showCams),
      },
      {
        icon: <EmailOpenIcon />,
        label: 'Email',
        onClick: () => setIsContactModalOpen(true),
      },
    ]
    : [
      {
        icon: <EmailOpenIcon />,
        label: 'Email',
        onClick: () => setIsContactModalOpen(true),
      },
      {
        icon: <VideoCameraIcon />,
        label: 'Camera',
        onClick: () => setShowCams(!showCams),

      },
    ];

  return (
    <div style={{ top: (isShortHeight && !isMobile) ? "6rem" : "30vh" }} className='interactionButtons'>

      {buttons.map(button => (
        <Button
          key={button.label}
          variant='contained'
          onClick={button.onClick}
          sx={{
            background: 'var(--primary-500)',
            borderRadius: '8px',
            padding: '5px',
            margin: isMobile ? '0 0 5px 0' : '0 0 10px 0',
            maxWidth: '35px',
            minWidth: isMobile ? '35px' : '1vw',
            minHeight: isMobile ? '35px' : '1vw',
          }}>
          {button.icon}
        </Button>

      ))}
      
      {/* <LegendsLayers /> */}


      {/* Modal */}
      <Modal
        open={isContactModalOpen}
        onClose={handleCloseContactModal}>
        <ContactForm
          onCloseContactModal={handleCloseContactModal}
        />
      </Modal>
    </div>
  );
};
