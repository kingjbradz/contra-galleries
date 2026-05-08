import { Route, Routes } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useExhibitions } from "../utils/api";
import Home from "../Pages/Home";
import Gallery from "../Pages/Gallery";
import ExhibitionPage from "../Pages/ExhibitionPage";
import Contact from "../Pages/Contact";
import App404 from "../Pages/App404";
import { Exhibition } from "../utils/global-types";
import Maintenance from "../Pages/Maintenance";

function MainRouter() {
  const { data, isLoading } = useExhibitions();
  const exhibitions: Exhibition[] = data ?? [];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <CircularProgress sx={{ color: "common.black" }} />
      </Box>
    );
  }
  return (
        <Routes>
          <Route index element={import.meta.env.VITE_ENVIRONMENT === "private" ? <Gallery /> : <Home />} />
          <Route path="/exhibitions" element={<Gallery />} /> // Gallery component is a gateway point to exhibitions
          {exhibitions?.map((exhibition: Exhibition) => (
            <Route key={exhibition.slug} path={`/${exhibition.slug}`}>
              <Route index element={<ExhibitionPage exhibition={exhibition} />} />
              <Route path=":id" element={<ExhibitionPage exhibition={exhibition} />} />
            </Route>
          ))}
          <Route path="/contact" element={<Contact />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/*" element={<App404 />} />
        </Routes>
  );
}

export default MainRouter;
