import { Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { useFeaturedArtistsData } from "./api";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import App404 from "./Pages/App404";
import FeaturedArtistPage from "./Pages/FeaturedArtistPage";
import GalleryItem from "./Pages/GalleryItem";

interface Artist {
  name: string;
  id: string;
}

function Router() {
  const { data: artists } = useFeaturedArtistsData();

  return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="gallery">
            <Route index element={<Gallery />} />
            <Route path=":id" element={<GalleryItem />} />
          </Route>

          {/* Dynamically generate featured artist routes */}
          {artists?.map((artist: Artist) =>
             (
              <Route
                key={artist.id}
                path={`/${artist.name.replace(/\s+/g, "")}`}
                element={<FeaturedArtistPage artist={artist} />}
              />
            )
          )}

          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<App404 />} />
        </Routes>
      </Box>
  );
}

export default Router;
