import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
    return ( 
        <Box m="20px">
            <Header title="Meta decks on a Pie" subtitle="What decks are getting sweeter wins?"/>
            <Box height={"75vh"}>
                <LineChart/>
            </Box>
        </Box>
    );
};

export default Line;