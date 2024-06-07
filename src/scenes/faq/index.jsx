import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";


// Accordion from materialui
const FAQ = () =>{

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box>
        <Header title="FAQ" subtitle="Frequently Asked Questions"/>

        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    A Question
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    An answer.
                </Typography>
            </AccordionDetails>
        </Accordion>


        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    Another fine example of a Question
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Another answer.
                </Typography>
            </AccordionDetails>
        </Accordion>


        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    A Last Second Question
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    A short answer.
                </Typography>
            </AccordionDetails>
        </Accordion>


    </Box>
}
export default FAQ;