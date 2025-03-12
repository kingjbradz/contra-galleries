import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    return (
        <Box 
        onClick={() => navigate("/gallery")}
        sx={{
            cursor: "pointer",
            textAlign: "center"
        }}>
            <Typography variant="h1">
                Contra Galleries
            </Typography>
        </Box>
    );
}

export default Home