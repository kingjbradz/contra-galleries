import { Box, Card, CardActionArea, CardContent, CardMedia, Link, Typography } from "@mui/material"
import { useExhibitions } from "../utils/api"
import { Exhibition } from "../utils/global-types"

const Gallery = () => {
  const { data, isLoading } = useExhibitions()


  return (
    <Box>
      {data.map((e: Exhibition) => (
        <Card key={e.id} sx={{ width: 250 }}>
        <CardActionArea 
        component={Link} href={`/${e.slug}`}
        >
          <CardMedia
            component="img"
            image={e.cover_image}
            alt="cover image"
            sx={{
              height: 200, // Fixed height in pixels
              objectFit: "cover", // Fills the area, cropping edges if necessary
              width: "100%",
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {e.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      ))}
    </Box>
  )
}

export default Gallery