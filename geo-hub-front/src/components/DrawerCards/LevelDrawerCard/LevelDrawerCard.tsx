import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { GeoJsonProperties } from 'geojson';
import { CloseIcon } from '../../../assets/icons/SiataIcons';
import { LevelSeriesTab } from './LevelSeriesTab';
import { RiskLevelTab } from './RiskLevelTab';


interface CardDrawerProps {
  featureData: GeoJsonProperties;
  onDelete: () => void;
}

export const LevelDrawerCard = ({ featureData, onDelete }: CardDrawerProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  // const tabData = [
  //   {
  //     label: '3 horas',
  //     image: featureData?.properties?.fig_3h,
  //     component: <AverageLevelChart />
  //   },
  //   {
  //     label: '24 horas',
  //     image: featureData?.properties?.fig_24h,
  //     component: <TimeLevelChart />
  //   },
  //   {
  //     label: '72 horas',
  //     image: featureData?.properties?.fig_72h,
  //     component: <TimeLevelChart />
  //   },
  //   {
  //     label: '30 días',
  //     image: featureData?.properties?.fig_30d,
  //     component: <TimeLevelChart />
  //   },
  // ];

  const tabs = ['Series', 'Niveles de Riesgo', 'Coberturas', 'Descripción']

  console.log("level data", featureData)
  const cardsPerTab = [
    {
      component: <LevelSeriesTab featureData={featureData} />
    },
    {
      component: <RiskLevelTab />
    },
    {
      component: <div>Goodbye</div>
    },
    {
      component: <div>Nice to meet you</div>
    }
    // {
    //   component: <LevelRisksTab data={featureData} />
    // },
    // {
    //   component: <LevelCoveragesTab data={featureData} />
    // },
    // {
    //   component: <LevelDescriptionTab data={featureData} />
    // }
  ]

  const [selectedTab, setSelectedTab] = useState<boolean[]>([true, ...Array(tabs.length - 1).fill(false)]);

  function switchTab(index: number) {
    const activeTab = Array(selectedTab.length).fill(false);
    activeTab[index] = true;
    setSelectedTab(activeTab)
  }




  return (
    <div
      style={!isMobile ? drawerWrappedStyleDesktop : drawerWrappedStyleMobile}>
      <Card sx={{
        borderRadius: '8px'
      }}>
          <CardContent sx={{
            background: 'var(--neutral-50)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 -20px 0 0',
          }}>
            <Typography variant='body2'>
              {featureData?.properties?.nombreEstacion}
            </Typography>
            <Button size="small"
              onClick={onDelete}
              sx={{ color: 'var(--primary-500)' }}>
              <CloseIcon />
            </Button>
          </CardContent>
          {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
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
            {tabs.map((tab, index) => <Button variant="contained" key={index}
              sx={{
                textTransform: 'none',
                background: selectedTab[index]
                  ? 'var(--primary-500)'
                  : 'var(--neutral-50)',
                color: selectedTab[index] ? '' : 'var(--primary-500)',
                height: '30px',
                width: '50vw',
                fontSize: '13px',

              }}
              onClick={() => switchTab(index)}
            >
              {tab}
            </Button>)}

          </Box>
          {/* <Box sx={{
            background: 'var(--neutral-50)',
            margin: '10px 10px',
            padding: '10px 10px',
            border: 'solid 1px var(--neutral-200)',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '5px',
          }}> */}
          {cardsPerTab[selectedTab.indexOf(true)].component}
          {/* </Box> */}

          {/* </div> */}

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
