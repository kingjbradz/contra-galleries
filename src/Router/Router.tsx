import { Box } from "@mui/material";
import MainRouter from "./MainRouter";
import CarouselRouter from "./CarouselRouter";

const isOnsite = 
// import.meta.env.VITE_BRANCH === "dev" ||
import.meta.env.VITE_ENVIRONMENT === "onsite" && true


function Router() {
  return (
    <
    >
    {isOnsite 
      ? (
        <CarouselRouter />
      ) : (
          <MainRouter />
      )}
    </>
  );
}

export default Router;

// id="router-container"
// sx={{
//   display: "flex",
//   justifyContent: "center",
//   // justifyContent: isOnsite ? "center" : "space-between",
//   alignItems: "center",
//   flexGrow: 1,
//   height: "100%",
//   flexDirection: isOnsite ? "row" : "column"
// }}