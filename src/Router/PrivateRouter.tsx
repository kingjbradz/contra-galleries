import { Route, Routes } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import CarouselGalleryCont from "../Pages/CarouselGalleryCont";
import App404 from "../Pages/App404";
import { usePrivateArtistListData } from "../api";

interface PrivateArtist {
  id: number;
  name: string;
  url: string;
}

interface PrivateArtistList {
  artists: PrivateArtist[]; // Define 'artists' as an array of PrivateArtist
}

function PrivateRouter() {
  const { data, isLoading } = usePrivateArtistListData();
  const privateArtistsList: PrivateArtistList = data ?? []; // data can be undefined while loading
  const artists = privateArtistsList?.artists ?? []; // Access the 'artists' property

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
      <Route index element={<></>} />
        {artists.length > 0 && artists.map((artist: PrivateArtist, index: any) => (
          <Route key={index} path={`/${artist.name.replace(/\s+/g, "").toLowerCase()}`}>
            <Route index element={<CarouselGalleryCont artist={artist} />} />
            <Route path={`/${artist.name.replace(/\s+/g, "").toLowerCase()}/:id`} element={<CarouselGalleryCont artist={artist} />} />
          </Route>
        ))}
      <Route path="/*" element={<App404 />} />
    </Routes>
  );
}

export default PrivateRouter;