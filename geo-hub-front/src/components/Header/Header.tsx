import "./Header.css";
import { useContext } from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "../../assets/icons/SiataIcons";
import { LayersContext } from "../../contexts/Layers/LayersContext";
import logoImage from "../../assets/images/logo.png";
import { Sensibles } from "../../assets/icons/Sensibles";
import { AdultosMayores } from "../../assets/icons/AdultosMayores";
import { Deporte } from "../../assets/icons/Deporte";
import { Niños } from "../../assets/icons/Niños";
import { General } from "../../assets/icons/General";

export const Header = () => {
  const { PM25, featureData } = useContext(LayersContext);
  const warningGroups = [
    [ "Without risk to the public"],
    [ <Sensibles />, ],
    [ <Sensibles />, <AdultosMayores/>, <Deporte />, ],
    [ <Sensibles />, <AdultosMayores/>, <Deporte />, <Niños /> ],
    [ <General />],
    [ "No data"],
  ];
  const warningIndex = !featureData
    ? PM25?.features[8].properties?.Color
    : featureData?.properties?.Color;

  const colorIndex = (value: string): number => {
    switch (value) {
      case "#91D23E":
        return 0;
      case "#FCE65E":
        return 1;
      case "#f88d2a":
        return 2;
      case "#e7004c":
        return 3;
      case "#53116a":
        return 4;
      default:
        return 5;
    }
  };

  console.log("mirame", PM25?.features[8].properties?.PM25_24H_prom);

  return (
    <header className="header">
      <div className="container-air-data">
        <div className="air-data-station">
          <div className="air-station-name">
            {!featureData
              ? PM25?.features[8].properties?.nombreEstacion
              : featureData?.properties?.nombreEstacion}
          </div>
          <div className="air-value" style={{'backgroundColor':warningIndex}}>
            {!featureData
              ? PM25?.features[8].properties?.PM25_24H_prom
              : featureData?.properties?.PM25_24H_prom}
          </div>
        </div>
        <div className="air-warnings" >
          <h1 className="air-warnings-title">RESTRICTIONS</h1>
          <div className="air-warning-icons">
            {warningGroups[colorIndex(warningIndex)].map((val) => val)}
          </div>
        </div>
      </div>
      <div className="container-logo" >
        <img src={logoImage} alt="logo air pulse" />
      </div>
    </header>
  );
};
