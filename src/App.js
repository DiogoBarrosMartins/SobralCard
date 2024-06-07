import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Pie from "./scenes/pie";
import Faq from "./scenes/faq";
import Line from "./scenes/line";
import Geography from "./scenes/geography";

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
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
              <Route path ="/" element ={<Dashboard/>} />
              <Route path ="/team" element ={<Team/>} /> 
              <Route path ="/contacts" element ={<Contacts/>} /> 
              <Route path ="/invoices" element ={<Invoices/>} /> 
              <Route path ="/form" element ={<Form/>} /> 
              <Route path ="/faq" element ={<Faq/>} /> 
              <Route path ="/calendar" element ={<Calendar/>} />
              <Route path ="/bar" element ={<Bar/>} /> 
              <Route path ="/pie" element ={<Pie/>} /> 
              <Route path ="/line" element ={<Line/>} /> 
              <Route path ="/geography" element ={<Geography/>} /> 
            </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};

export default App;
