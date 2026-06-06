import { Route, Routes } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import CarouselGalleryCont from "../Pages/CarouselGalleryCont";
import App404 from "../Pages/App404";
import { useExhibitions } from "../utils/api";
import { Exhibition } from "../utils/global-types";
import Gallery from "../Pages/Gallery";
import Maintenance from "../Pages/Maintenance";


function CarouselRouter() {
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
      <Route path="/" element={<Gallery />} />

        {exhibitions?.map((exhibition: Exhibition) => (
          <Route key={exhibition.slug} path={`/${exhibition.slug}`}>
            <Route index element={<CarouselGalleryCont exhibition={exhibition} />} />
            <Route path={`:artworkSlug`} element={<CarouselGalleryCont exhibition={exhibition} />} />
          </Route>
        ))}
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/*" element={<App404 />} />
    </Routes>
  );
}

export default CarouselRouter;