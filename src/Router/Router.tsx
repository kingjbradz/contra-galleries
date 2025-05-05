import { Box } from "@mui/material";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

const isPublic = import.meta.env.VITE_BRANCH === "dev" 
|| import.meta.env.VITE_BRANCH === "main" && true

function Router() {
  return (
    <Box
      id="router-container"
      sx={{
        display: "flex",
        justifyContent: isPublic ? "center" : "space-between",
        alignItems: "center",
        flexGrow: 1,
        height: "100%",
        flexDirection: isPublic ? "row" : "column"
      }}
    >
      {isPublic 
      ? (
        <PublicRouter />
      ) : (
        <PrivateRouter />
      )}
    </Box>
  );
}

export default Router;
