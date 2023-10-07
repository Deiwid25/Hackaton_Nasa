import { Box, Button, Modal, Typography } from '@mui/material';
import { ExclamationIcon, MapIcon } from '../../assets/icons/SiataIcons';
import './InformationButtons.css';
import { useContext, useEffect, useState } from 'react';
import { network } from '../../arrays/network';
import { LayersContext } from '../../contexts/Layers/LayersContext';


const Message = () => {
  return (
    <Box
      sx={{
        width: '80vw',
        height: '20vh',
        background: 'var(--primary-100)',
        color: 'var(--primary-500)',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography variant='body3'>Debe seleccionar una capa</Typography>
    </Box>
  );
};

export const InformationButtons: React.FC = () => {
  const buttons = [
    {
      icon: <ExclamationIcon />,
      label: 'Information',
    },
    {
      icon: <MapIcon />,
      label: 'Maps',
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentToShow, setComponentToShow] = useState<React.ReactNode>(
    <Message />
  );
  const [activeButton, setActiveButton] = useState('');
  const { layersState } = useContext(LayersContext);


  useEffect(() => {
    const activeLayers = network.filter(
      item => layersState?.layers[item.id]?.active
    );

    if (activeLayers.length > 0) {
      const firstActiveLayer = activeLayers[0];
      setComponentToShow(firstActiveLayer.component);
      setActiveButton(firstActiveLayer.id.toString());
    } else {
      setComponentToShow(<Message />);
      setActiveButton('');
    }
  }, [layersState]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const activeLayers = network
    .filter(item => layersState?.layers[item.id]?.active)
    .map(item => ({ id: item.id, active: true }));

  const handleModalClose = () => {
    setIsModalOpen(false);
    setActiveButton('rainfall');
  };

  const handleButtonClick = (component: React.ReactNode, buttonId: string) => {
    setComponentToShow(component);
    setActiveButton(buttonId);
  };



  const buttonsModal = {
    background: 'var(--neutral-100)',
    borderRadius: '8px',
    padding: '2px',
    minWidth: '35px',
    minHeight: '35px',
    margin: '0 0 1vh 1vw',
  };

  return (
    <div className='informationButtons'>
      {buttons.map(button => (
        <Button
          key={button.label}
          variant='contained'
          sx={{
            background: 'var(--primary-500)',
            borderRadius: '8px',
            padding: '5px',
            margin: '0 0 5px 0',
            minWidth: '35px',
            minHeight: '35px',
          }}
          onClick={
            button.label === 'Information' ? handleModalOpen : ""
          }>
          {button.icon}
        </Button>
      ))}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20% 0',
        }}>
        <Box
          sx={{
            display: 'flex',
            height: '10px',
          }}>
          <Box>{componentToShow}</Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '10px',
            }}>
            {activeLayers.map(activeLayer => {
              const networkItem = network.find(
                item => item.id === activeLayer.id
              );
              if (networkItem) {
                return (
                  <Button
                    key={networkItem.id}
                    variant='contained'
                    sx={{
                      ...buttonsModal,
                      background:
                        activeButton === networkItem.id.toString()
                          ? 'var(--primary-500)'
                          : 'var(--neutral-100)',
                    }}
                    onClick={() =>
                      handleButtonClick(
                        networkItem.component,
                        networkItem.id.toString()
                      )
                    }>
                    {networkItem.icon}
                  </Button>
                );
              }
            })}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
