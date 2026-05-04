import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OverlayCard from "../Components/OverlayCard";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 2,
        flexGrow: 1
      }}
    >
    <OverlayCard 
        image={"https://contrastudios.com/wp-content/uploads/2026/04/contra-1.png"}
        maxWidth={1000}
        height="75vh"
        path={`/exhibitions`}
        extraSx={{ objectFit: "cover" }}
        bottom= {"EXPLORE HERE"}
        icon={<ArrowForwardIcon />}
        />

      <Box>
        <Typography variant="h6">
          Modern to contemporary art, prints and original works.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
