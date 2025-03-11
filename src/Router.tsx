import { Route, Routes } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useFeaturedArtistsData } from "./api";
import Home from "./Pages/Home";
import Gallery from "./Pages/Gallery";
import GalleryItem from "./Pages/GalleryItem";
import CarouselGalleryCont from "./Pages/CarouselGalleryCont";
import CarouselGalleryItem from "./Pages/CarouselGalleryItem";
import ArtworkDetail from "./Pages/ArtworkDetail";
import Contact from "./Pages/Contact";
import App404 from "./Pages/App404";
import FeaturedArtistPage from "./Pages/FeaturedArtistPage";
import FeaturedArtistItem from "./Pages/FeaturedArtistItem";


interface Artist {
  name: string;
  image: string;
  info: string;
  artworks: Array<any>;
}

function Router() {
  const { data, isLoading } = useFeaturedArtistsData();
  const artists: Artist[] = data ?? [];

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
  console.log(import.meta.env.VITE_BRANCH)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        height: import.meta.env.VITE_BRANCH !== "dev" ? "100%" : "1px"
      }}
    >
      {import.meta.env.VITE_BRANCH === "dev"  || import.meta.env.VITE_BRANCH === "main" 
      ? (
        <Routes>
          <Route index element={<Home />} />
          <Route path="gallery">
            <Route index element={<Gallery />} />
            <Route path=":id" element={<GalleryItem />} />
          </Route>

          {artists?.map((artist: Artist, index: any) => (
            <Route key={index} path={`/${artist.name.replace(/\s+/g, "")}`}>
              <Route index element={<FeaturedArtistPage artist={artist} />} />
              <Route path=":id" element={<FeaturedArtistItem />} />
            </Route>
          ))}

          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<App404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<CarouselGalleryCont />} />
          <Route path="/:id" element={<CarouselGalleryCont />} />
          <Route path="/*" element={<App404 />} />
        </Routes>
      )}
    </Box>
  );
}

export default Router;
