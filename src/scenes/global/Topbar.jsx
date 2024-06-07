import {Box, IconButton, useTheme} from "@mui/material";
import { useState} from "react";
import {  tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";



// componente da barra do topo
const Topbar = () => {
    //const handlePersonClick = () => {
    //    window.location.href = "https://diogobmartins.netlify.app/";
    //};
  //  const navigate = useNavigate();
   // const handleGearsClick = () => {
    //    navigate('/card-list');
  //  };

    // vou buscar o tema ao react 
    const theme = useTheme();
    // vou buscar as colors aos tokens que passo no theme.js
    const colors = tokens(theme.palette.mode);
    // aqui vou buscar o context ao react, o contexto passo na app
  //  const colorMode = useContext(ColorModeContext);
    const [searchQuery, setSearchQuery] = useState("");
    // isto facilita-me a não ter de ter outro ficheiro, porque este componente 
    // não precisa de muito css, ou css complexo 
    return (
    <Box display = "flex" justifyContent="space-between" p={2}>
        {/*Search bar*/ }
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* Search bar */}
            <Box
                component="form"
                action="https://www.google.com/search"
                method="GET"
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                onSubmit={(e) => {
                    if (!searchQuery.trim()) {
                        e.preventDefault(); 
                    }
                }}
            >
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Search a rule"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    name="q" // This name attribute is important for Google to recognize the query parameter
                />
                <IconButton type="submit" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
        </Box>

{/**ICONS */}

        <Box display ="flex" >

            

            <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton>
            
           
           
            
        </Box>
    </Box>
    );
}; 

export default Topbar;