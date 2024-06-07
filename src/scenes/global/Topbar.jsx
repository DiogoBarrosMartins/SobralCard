import {Box, IconButton, useTheme} from "@mui/material";
import {useContext, useState} from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";



// componente da barra do topo
const Topbar = () => {
    const handlePersonClick = () => {
        window.location.href = "https://diogobmartins.netlify.app/";
    };
    // vou buscar o tema ao react 
    const theme = useTheme();
    // vou buscar as colors aos tokens que passo no theme.js
    const colors = tokens(theme.palette.mode);
    // aqui vou buscar o context ao react, o contexto passo na app
    const colorMode = useContext(ColorModeContext);
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
                    placeholder="Search"
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

            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ?(
                    <DarkModeOutlinedIcon/>
                ) : (
                    <LightModeOutlinedIcon/>
                )}
            </IconButton>

            <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton>
            
            <IconButton>
                <SettingsOutlinedIcon/>  
            </IconButton>
           
            <IconButton  onClick={handlePersonClick}>
                <PersonOutlinedIcon/>
            </IconButton>
        </Box>
    </Box>
    );
}; 

export default Topbar;