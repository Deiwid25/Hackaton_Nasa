import {
  Button,
  Modal,
  useMediaQuery,
} from '@mui/material';
import {
  // EmailOpenIcon,
  OutlineLocationIcon,
  // VideoCameraIcon,
} from '../../assets/icons/SiataIcons';
import { useContext, useState } from 'react';
import './InteractionButtons.css';
import { MapsContext } from '../../contexts/Maps/MapsContext';
import { ContactForm } from '../ContactForm/ContactForm';
import { LayersContext } from '../../contexts/Layers/LayersContext';
// import { LayersContext } from '../../contexts/Layers/LayersContext';
// import { LegendsLayers } from '../LengendsLayers/LegendsLayers';
// import { ZoomControl } from '../ZoomControl/ZoomControl';


export const InteractionButtons: React.FC = () => {
  // const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // const { setShowCams, showCams } = useContext(LayersContext);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isShortHeight = useMediaQuery('(max-height: 880px)');
  const { setMyLocation } = useContext(MapsContext);
  const { setDrawerOpen, drawerOpen } = useContext(LayersContext)


  // const handleCloseContactModal = () => {
  //   setIsContactModalOpen(false);
  // };

  const buttons = [ 
    {
      icon: <OutlineLocationIcon />,
      label: 'Location',
      onClick: async () => await setMyLocation()
    },
  ];

  return (
    <div className='interactionButtons'>

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
            minWidth: '45px',
            minHeight: '45px',
          }}>
          {button.icon}
        </Button>

      ))}

      {/* <LegendsLayers /> */}


      {/* Modal */}
      {/* <Modal
        open={isContactModalOpen}
        onClose={handleCloseContactModal}>
        <ContactForm
          onCloseContactModal={handleCloseContactModal}
        />
      </Modal> */}
    </div>
  );
};
