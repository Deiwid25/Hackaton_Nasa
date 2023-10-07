import { LevelIcon, Pm25Icon, RainfallIcon } from '../assets/icons/SiataIcons';
import { CalidadDelAire } from '../components/InformationButtons/InformationModals/CalidadDelAire';
import { NivelesDeQuebradas } from '../components/InformationButtons/InformationModals/NivelesDeQuebradas';
import { PrecipitacionRadar } from '../components/InformationButtons/InformationModals/PrecipitacionRadar';


interface MenuItemData {
  icon: JSX.Element;
  text: string;
  id: number;
  chevronIcon?: JSX.Element;
  subMenu?: { text: string }[];
  component?: React.ReactNode;
}

export const network: MenuItemData[] = [
  {
    icon: <RainfallIcon />,
    text: 'Precipitación - radar',
    id: 0,
    component: <PrecipitacionRadar />
  },
  {
    icon: <LevelIcon />,
    text: 'Niveles de quebradas',
    id: 1,
    component: <NivelesDeQuebradas />
  },
  {
    icon: <Pm25Icon />,
    text: 'Calidad del Aire',
    id: 2,
    component: <CalidadDelAire />,
  },
  // {
  //   icon: <RainfallAccumulationIcon />,
  //   text: 'Acumulados de precipitación',
  //   id: 3,
  //   component: <CalidadDelAire />
  // },
  // {
  //   icon: <WindAndHumidityIcon />,
  //   text: 'Temperatura, humedad & viento',
  //   id: 4,
  // },
  // {
  //   icon: <LightningIcon />,
  //   text: 'Descargas eléctricas',
  //   id: 5,
  // },
  // {
  //   icon: <HailIcon />,
  //   text: 'Granizo',
  //   id: 6,
  // },
  // {
  //   icon: <Pm25Icon />,
  //   text: 'Calidad del Aire',
  //   chevronIcon: <ChevronDownIcon />,
  //   id: 7,
  //   subMenu: [
  //     {
  //       text: 'Poblaciones',
  //     },
  //     {
  //       text: 'Vehiculares e industriales',
  //     },
  //   ],
  // },
  // {
  //   icon: <SunRadiationIcon />,
  //   text: 'Radiación solar/UV',
  //   chevronIcon: <ChevronDownIcon />,
  //   id: 8,
  //   subMenu: [
  //     {
  //       text: 'Solar',
  //     },
  //     {
  //       text: 'UV',
  //     },
  //   ],
  // },
  // {
  //   icon: <SewerIcon />,
  //   text: 'Niveles de alcantarillado',
  //   id: 9,
  // },
  // {
  //   icon: <SatelliteIcon />,
  //   text: 'Información satelital/GOES',
  //   chevronIcon: <ChevronDownIcon />,
  //   id: 10,
  //   subMenu: [
  //     {
  //       text: 'Proxy Colombia precipitación',
  //     },
  //     {
  //       text: 'Proxy tropical precipitación',
  //     },
  //   ],
  // },
];
