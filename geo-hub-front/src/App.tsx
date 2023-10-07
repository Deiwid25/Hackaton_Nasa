import './App.css';

import { Map } from './components/Map/Map';
import { Header } from './components/Header/Header';
import { Forecast } from './components/Forecast/Forecast';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { MenuNetwork } from './components/MenuNetwork/MenuNetwork';
import { InformationButtons } from './components/InformationButtons/InformationButtons';
import { SocialNetworks } from './components/SocialNetworks/SocialNetworks';
import { MenuNetworkDesktop } from './components/MenuNetworkDesktop/MenuNetworkDesktop';
import { LayersProvider } from './contexts/Layers/LayersProvider';
import { MapsProvider } from './contexts/Maps/MapsProvider';
import { HeaderProvider } from './contexts/Header/HeaderProvider';

function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className='header-app'>
          <HeaderProvider>
            <Header />
            <Forecast />
          </HeaderProvider>
        </div>
        <MapsProvider>
          <LayersProvider>
            <Map />
            <MenuNetwork />
            <MenuNetworkDesktop />
            <SocialNetworks />           
            <InformationButtons />        
          </LayersProvider>
        </MapsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
