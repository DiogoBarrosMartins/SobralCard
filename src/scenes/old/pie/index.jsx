import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = () => {
    return ( 
        <Box m="20px">
            <Header title="Meta decks on a Pie" subtitle="What decks are getting sweeter wins?"/>
            <Box height={"75vh"}>
                <PieChart/>
            </Box>
        </Box>
    );
};

export default Pie;