import { Route, Routes } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useFeaturedArtistsData } from "../api";
import Home from "../Pages/Home";
import Gallery from "../Pages/Gallery";
import GalleryItem from "../Pages/GalleryItem";
import Contact from "../Pages/Contact";
import App404 from "../Pages/App404";
import FeaturedArtistPage from "../Pages/FeaturedArtistPage";
import FeaturedArtistItem from "../Pages/FeaturedArtistItem";


interface PublicArtist {
  name: string;
  image: string;
  info: string;
  artworks: Array<any>;
}

function PublicRouter() {
  const { data, isLoading } = useFeaturedArtistsData();
  const publicArtists: PublicArtist[] = data ?? [];

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
          <Route index element={<Home />} />
          <Route path="gallery">
            <Route index element={<Gallery />} />
            <Route path=":id" element={<GalleryItem />} />
          </Route>

          {publicArtists?.map((artist: PublicArtist, index: any) => (
            <Route key={index} path={`/${artist.name.replace(/\s+/g, "")}`}>
              <Route index element={<FeaturedArtistPage artist={artist} />} />
              <Route path=":id" element={<FeaturedArtistItem />} />
            </Route>
          ))}

          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<App404 />} />
        </Routes>
  );
}

export default PublicRouter;
