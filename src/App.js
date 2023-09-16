import { useSelector } from 'react-redux';
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';


import { ClassificationsProvider } from './layout/ClassificationsProvider'
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ClassificationsProvider>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          
          <NavigationScroll>
              <Routes />
          </NavigationScroll>
          
        </ThemeProvider>
        </ClassificationsProvider>
    </StyledEngineProvider>
  );
};

export default App;