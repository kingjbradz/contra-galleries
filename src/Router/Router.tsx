import { Box } from "@mui/material";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

function Router() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        height: "100%"
      }}
    >
      {import.meta.env.VITE_BRANCH === "dev" 
       || import.meta.env.VITE_BRANCH === "main" 
      ? (
        <PublicRouter />
      ) : (
        <PrivateRouter />
      )}
    </Box>
  );
}

export default Router;
