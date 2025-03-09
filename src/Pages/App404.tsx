import { Box, Typography } from "@mui/material";
import { Link } from "react-router";

const App404 = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">This page doesn't exist.</Typography>
      <br />
      <Typography>Back to <Link to="/">Home</Link>.</Typography>
    </Box>
  );
}

export default App404;