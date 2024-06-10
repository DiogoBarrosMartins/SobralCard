import { useState , useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import CardListPage from "./scenes/cardlistpage";
import CardScene from "./scenes/cardscene";
import ListMenuScene from "./scenes/listmenuscene";
import CardSearchScene from "./scenes/listscene";
import ListCardDetailScene from "./scenes/listcarddetailscene";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [storedLists, setStoredLists] = useState([]);
  const updateSidebarRef = useRef(null);

  const updateSidebar = () => {
    if (updateSidebarRef.current) {
        updateSidebarRef.current();
    }
};
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar storedLists={storedLists} updateSidebarRef={updateSidebarRef} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<CardListPage />} />
              <Route path="/card" element={<CardScene />} />
              <Route path="/deck" element={<ListMenuScene storedLists={storedLists} setStoredLists={setStoredLists} updateSidebar={updateSidebar} />} />
              <Route path="/list" element={<CardSearchScene />} />
              <Route path="/list/card/:name" element={<ListCardDetailScene />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
