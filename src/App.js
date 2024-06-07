import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import CardListPage from "./scenes/cardlistpage";
import CardScene from "./scenes/cardscene";
import SelectedCards from "./scenes/decklist";
/**
 * O ColorModeContext.Provider  vai dar-me um provider de valor:{colorMode}
 * utilizo-o para me dar o contexto do modo da cor do site. Faço o mesmo com 
 * o tema. 
 *  
 * 
 */

function App() {
  const[theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  return (

<ColorModeContext.Provider value={colorMode}>

    <ThemeProvider theme={theme}>
      <CssBaseline />    
      <div className="app">
        <Sidebar isSidebar={isSidebar}/>
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
              <Route path ="/" element ={<CardListPage/>} />
              <Route path="/card" element={<CardScene />} />
              <Route path="/deck" element={<SelectedCards />} />
            </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};

export default App;
