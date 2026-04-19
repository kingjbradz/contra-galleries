import { Box } from "@mui/material";
import MainRouter from "./MainRouter";
import CarouselRouter from "./CarouselRouter";

const isOnsite = 
// import.meta.env.VITE_BRANCH === "dev" ||
import.meta.env.VITE_ENVIRONMENT === "onsite" && true


function Router() {
  return (
    <Box
      id="router-container"
      sx={{
        display: "flex",
        justifyContent: isOnsite ? "center" : "space-between",
        alignItems: "center",
        flexGrow: 1,
        height: "100%",
        flexDirection: isOnsite ? "row" : "column"
      }}
    >
      {isOnsite 
      ? (
        <CarouselRouter />
        ) : (
          <MainRouter />
      )}
    </Box>
  );
}

export default Router;
