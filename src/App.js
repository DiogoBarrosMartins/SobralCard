import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

// import Team from ".*scenes/team";
// import Invoices from ".*scenes/invoices";
// import Contacts from ".*scenes/dashboard";
// import Bar from ".*scenes/dashboard";
// import Form from ".*scenes/form";
// import Line from ".*scenes/line";
// import Pie from ".*scenes/pie";
// import Form from ".*scenes/form";
// import Faq from ".*scenes/faq";
// import Geography from ".*scenes/geography";
// import Calendar from "./scenes/calendar";

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
              {/* <Route path ="/team" element ={<Team/>} /> */}
              {/* <Route path ="/contacts" element ={<Contacts/>} /> */}
              {/* <Route path ="/invoices" element ={<Invoices/>} /> */}
              {/* <Route path ="/form" element ={<Form/>} /> */}
              {/* <Route path ="/bar" element ={<Dashboard/>} /> */}
              {/* <Route path ="/pie" element ={<Dashboard/>} /> */}
              {/* <Route path ="/line" element ={<Dashboard/>} /> */}
              {/* <Route path ="/faq" element ={<Dashboard/>} /> */}
              {/* <Route path ="/geography" element ={<Geography/>} /> */}
              {/* <Route path ="/calendar" element ={<Calender/>} /> */}
            </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};

export default App;
