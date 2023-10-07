import React, { useContext, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Switch,
  Typography,
} from '@mui/material';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
} from '../../assets/icons/SiataIcons';
import { network } from '../../arrays/network';
import './MenuNetwork.css';
import { LayersContext } from '../../contexts/Layers/LayersContext';
import { SliderTime } from '../SliderTime/SliderTime';

interface MenuItemData {
  icon: JSX.Element;
  text: string;
  id: number;
  chevronIcon?: JSX.Element;
  subMenu?: { text: string }[];
}

type NetworkItemProps = {
  item: MenuItemData;
  index: number;
};

const StyledMenu: React.FC<MenuProps> = props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    className='custom-menu'
    {...props}
  />
);

function NetworkItem({ item, index }: NetworkItemProps) {
  const { layersState, toggleLayer, toggleSubLayer } =
    useContext(LayersContext);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleSubMenuClick = () => {
    if (item.subMenu) {
      setShowSubMenu(!showSubMenu);
    }
  };

  return (
    <MenuItem
      key={index}
      disableRipple
      sx={{
        fontSize: '14px',
        color: 'var(--primary-500)',
        padding: '0 10px',
        flex: 'display',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85vw',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: showSubMenu ? 'flex-start' : 'center',
          position: 'relative',
          height: showSubMenu ? '13vh' : '5vh',
          padding: showSubMenu ? '9px 0 0 0' : '',
        }}>
        <Box
          sx={{
            margin: '0 10px 0 0',
            background: 'var(--blue3-500)',
            color: 'var(--shades-0)',
            borderRadius: '8px',
            width: '8vw',
            display: 'flex',
            padding: '3px',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.icon}
        </Box>
        <Box
          sx={{
            padding: showSubMenu ? '3px 0 0 0' : '',
          }}>
          <Typography
            variant='bodySemiBold4'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={handleSubMenuClick}>
            {item.text}
            {item.chevronIcon &&
              (showSubMenu ? (
                <ChevronUpIcon sx={{ width: '18px' }} />
              ) : (
                <ChevronDownIcon sx={{ width: '18px' }} />
              ))}
          </Typography>
          {item.subMenu && showSubMenu && (
            <Box
              sx={{
                padding: '1vh 0 0 0',
              }}>
              {item.subMenu.map((subItem, subIndex) => (
                <Typography
                  key={subIndex}
                  variant='body3'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Switch
                    onChange={() =>
                      toggleSubLayer(
                        index,
                        subIndex,
                        layersState?.layers[index]?.subLayers?.map(
                          val => val?.active
                        )[subIndex] || false
                      )
                    }
                    checked={
                      layersState?.layers[index]?.subLayers?.map(
                        val => val?.active
                      )[subIndex]
                    }
                    disabled={
                      !layersState?.layers[index]?.subLayers?.map(
                        val => val?.active
                      )[subIndex] && (layersState?.activeLayers ?? 0) >= 2.6
                    }
                  />
                  {subItem.text}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          margin: showSubMenu ? '-70px 0 0 0' : '',
        }}>
        <Switch
          onChange={() =>
            toggleLayer(index, layersState?.layers[index]?.active || false)
          }
          checked={layersState?.layers[index]?.active}
          disabled={
            !layersState?.layers[index]?.active &&
            (layersState?.activeLayers ?? 0) >= 2.4
          }
        />
      </Box>
    </MenuItem>
  );
}

export const MenuNetwork: React.FC = () => {
  const { anchorEl, setAnchorEl, layersState } = useContext(LayersContext);

  const open = Boolean(anchorEl);
  // const [selectedNetworkIcons, setSelectedNetworkIcons] = useState<number[]>(
  //   []
  // );

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const activeLayers = network
    .filter(item => layersState?.layers[item.id]?.active)
    .map(item => ({ id: item.id, active: true }));

  const isPrecipitacionRadarSelected = layersState?.layers.find(
    layer => layer?.id === 0 && layer.active
  );

  return (
    <div className='menuNetwork'>
      <Button
        variant='contained'
        onClick={handleClick}
        sx={{
          background: 'var(--shades-0)',
          borderRadius: '8px',
          padding: '2px',
          minWidth: '35px',
          minHeight: '35px',
        }}>
        <MenuIcon
          sx={{
            color: 'var(--primary-500)',
          }}
        />
      </Button>
      {isPrecipitacionRadarSelected && <SliderTime />}
      {activeLayers.map(activeLayer => {
        const networkIconsItems = network.find(
          item => item.id == activeLayer.id
        );
        if (networkIconsItems) {
          return (
            <React.Fragment key={networkIconsItems.id}>
              <Button
                className='listMenu'
                variant='contained'
                sx={{
                  borderRadius: '8px',
                  padding: '2px',
                  minWidth: '35px',
                  minHeight: '35px',
                  margin: '0 0 0 1vw',
                  pointerEvents: 'none',
                }}>
                {networkIconsItems.icon}
              </Button>
            </React.Fragment>
          );
        }
      })}
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 11px',
            margin: '-6px 0 0 0',
            color: 'var(--primary-500)',
            height: '5vh',
          }}>
          <Typography variant='bodyBold2'>Redes de monitoreo</Typography>
          <Typography variant='body3'>Selecciona hasta 3</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            height: 'max-content',
            // height: '53vh',
          }}>
          {network.map((item, index) => (
            <NetworkItem key={index} item={item} index={index} />
          ))}
        </Box>
      </StyledMenu>
    </div>
  );
};
