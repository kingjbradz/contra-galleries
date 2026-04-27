import Grid  from "@mui/material/Grid2"
import { useExhibitions } from "../utils/api"
import { Exhibition } from "../utils/global-types"
import OverlayCard from "../Components/OverlayCard"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Gallery = () => {
  const { data, isLoading } = useExhibitions()


  return (
    <Grid
    container
    sx={{
      display: "flex",
      justifyContent: "center",
      // flexDirection: is520 ? "row" : "column",
      alignItems: "center",
      margin: 1,
    }}
    >
      {data.map((e: Exhibition) => (
      <OverlayCard 
      key={e.id}
      image={e.cover_image}
      width={320}
      path={`/${e?.slug}`}
      top={e?.name!.length > 1 ? e.name : "Untitled"}
      icon={<ArrowForwardIcon />}
      bottom="SEE COLLECTION"

      />
      ))}
    </Grid>
  )
}

export default Gallery