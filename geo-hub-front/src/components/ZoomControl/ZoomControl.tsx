import { Button, useMediaQuery } from '@mui/material';
import { useMap } from 'react-leaflet';
import { MinusIcon, PlusIcon } from '../../assets/icons/SiataIcons';
import './ZoomControl.css';

export const ZoomControl: React.FC = () => {
  const isShortHeight = useMediaQuery('(max-height: 880px)');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const map = useMap();

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    map.dragging.disable();
    map.doubleClickZoom.disable();
  };

  const handleMouseUp = () => {
    map.dragging.enable();
    map.doubleClickZoom.enable();
  };
  return (
    <div style={{ top: (isShortHeight && !isMobile) ? '11.2rem' : '39vh' }} className='zoom-control'>
      <Button
        variant='contained'
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleMouseDown}
        onClick={zoomIn}
        sx={{
          background: 'var(--primary-500)',
          borderRadius: '8px',
          padding: '5px',
          margin: '30x 0 5px 0',
          minWidth: '45px',
          minHeight:'45px',
        }}>
        <PlusIcon />
      </Button>
      <Button
        variant='contained'
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleMouseDown}
        onClick={zoomOut}
        sx={{
          background: 'var(--primary-500)',
          borderRadius: '8px',
          padding: '5px',
          margin: '0 0 5px 0',
          minWidth: '45px',
          minHeight:'45px',
        }}>
        <MinusIcon />
      </Button>
    </div>
  );
};


