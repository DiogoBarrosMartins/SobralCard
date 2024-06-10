import React, { useState } from 'react';
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { tokens } from "../../theme";

const Item = ({ title, image, onClick, isCollapsed }) => {
    return (
      <MenuItem
      style={{
        width: '320px', // Adjust width to fit the content
        height: '32px',
        display: 'flex',
        position: "relative",
        alignItems: 'center', // Align items to the center vertically
        justifyContent: 'left',
        marginLeft: '-25px',
        border: 'none', // Remove the border
        padding: '0', // Remove padding to avoid spacing issues
      }}
      onClick={onClick}
    >
      <Button
        variant="outlined"
        sx={{
          width: '320px', // Adjust width to fit the content
          height: '32px', // Adjust height to fit the content
          backgroundImage: `url(${image})`,
          backgroundPosition: '-20px -13px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '90%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center', // Align items to the center vertically
          justifyContent: isCollapsed ? 'center' : 'left', // Center or left align text
          border: 'none', // Remove the border
          boxShadow: 'none', // Remove the shadow to make it look flat
        }}
      >
     
      </Button>
    </MenuItem>
    );
};

const RightSidebar = ({ cards, listName }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ViewCarouselIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    Cards
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <ViewCarouselIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {cards.map((card, index) => (
                            <Item
                                key={index}
                                title={card.name}
                                image={card.card}
                                isCollapsed={isCollapsed}
                                onClick={() => navigate(`/list/card/${encodeURIComponent(card.name)}?list=${encodeURIComponent(listName)}`)}
                            />
                        ))}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default RightSidebar;
