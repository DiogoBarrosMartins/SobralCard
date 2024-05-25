import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";


/**
 * O ColorModeContext.Provider  vai dar-me um provider de valor:{colorMode}
 * utilizo-o para me dar o contexto do modo da cor do site. Faço o mesmo com 
 * o tema. 
 *  
 * 
 */

function App() {
  const[theme, colorMode] = useMode();

  return (

<ColorModeContext.Provider value={colorMode}>

    <ThemeProvider theme={theme}>
      <CssBaseline />    
      <div className="app">
        <main className="content">
          <Topbar/>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};

export default App;
