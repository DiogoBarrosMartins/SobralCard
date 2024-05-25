import {Box, IconButton, useTheme} from "@mui/material";
import {useContext} from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
const styledBox = styled(Box)``;


// componente da barra do topo
const Topbar = () => {
    
    // vou buscar o tema ao react 
    const theme = useTheme();
    // vou buscar as colors aos tokens que passo no theme.js
    const colors = tokens(theme.palette.mode);
    // aqui vou buscar o context ao react, o contexto passo na app
    const colorMode = useContext(ColorModeContext);
    
    // isto facilita-me a não ter de ter outro ficheiro, porque este componente 
    // não precisa de muito css, ou css complexo 
    return (
    <Box display = "flex" justifyContent="space-between" p={2}>
        
        
        {/*Search bar*/ }
        <styledBox 
            display = "flex" 
            backgroundColor={colors.primary[400]} 
            borderRadius="3px"   
            >
                <InputBase sx={{ml:2, flex: 1}} placeholder="Search" />
            <IconButton type="button" sx ={{p:1}}>
                <SearchIcon></SearchIcon>
            </IconButton>
            </styledBox>

{/**ICONS */}

        <Box display ="flex" >

            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.pallete.mode ==='dark' ?(
                    <DarkModeOutlinedIcon/>
                ) : (
                    <LightModeOutlinedIcon/>
                )
            }
             
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon/>  
            </IconButton>
            
            <IconButton>
                
            </IconButton>
            <IconButton>
                
            </IconButton>
        </Box>
    </Box>
    );
}; 

export default Topbar;