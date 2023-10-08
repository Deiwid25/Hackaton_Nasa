import './App.css';

import { Map } from './components/Map/Map';
import { Header } from './components/Header/Header';
// import { Forecast } from './components/Forecast/Forecast';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
// import { MenuNetwork } from './components/MenuNetwork/MenuNetwork';
// import { InformationButtons } from './components/InformationButtons/InformationButtons';
// import { SocialNetworks } from './components/SocialNetworks/SocialNetworks';
// import { MenuNetworkDesktop } from './components/MenuNetworkDesktop/MenuNetworkDesktop';
import { LayersProvider } from './contexts/Layers/LayersProvider';
import { MapsProvider } from './contexts/Maps/MapsProvider';
import { HeaderProvider } from './contexts/Header/HeaderProvider';
import { NewLegend } from './components/NewLegend/NewLegend';

function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className='header-app'>
          <HeaderProvider>
            <MapsProvider>
              <LayersProvider>
                <Header />
                <Map />
                {/* <MenuNetwork /> */}
                {/* <MenuNetworkDesktop /> */}
                {/* <SocialNetworks />            */}
                {/* <InformationButtons />         */}
              </LayersProvider>
            </MapsProvider>
            {/* <Forecast /> */}
          </HeaderProvider>
        </div>
        <NewLegend />
      </ThemeProvider>
    </div>
  );
}

export default App;
