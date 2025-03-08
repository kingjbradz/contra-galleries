import { Route, Routes } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useFeaturedArtistsData } from "./api";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import App404 from "./Pages/App404";
import FeaturedArtistPage from "./Pages/FeaturedArtistPage";
import FeaturedArtistItem from "./Pages/FeaturedArtistItem";
import GalleryItem from "./Pages/GalleryItem";

interface Artist {
  name: string;
  id: string;
}

function Router() {
  const { data: artists, isLoading } = useFeaturedArtistsData();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <CircularProgress sx={{ color: "common.black" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="gallery">
          <Route index element={<Gallery />} />
          <Route path=":id" element={<GalleryItem />} />
        </Route>

        {/* Dynamically generate featured artist routes */}
        {artists?.map((artist: Artist) => (
          <Route
            key={artist.id}
            path={`/${artist.name.replace(/\s+/g, "")}`}
          >
            <Route index element={<FeaturedArtistPage artist={artist} />} />
            <Route path=":id" element={<FeaturedArtistItem />} />
            </Route>
        ))}

        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<App404 />} />
      </Routes>
    </Box>
  );
}

export default Router;
