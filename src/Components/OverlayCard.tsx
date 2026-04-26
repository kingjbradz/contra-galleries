import { Box, Card, CardContent, Typography } from "@mui/material"
import { useNavigate } from "react-router";

interface OverlayCardProps {
  width?: number;
  maxWidth?: number;
  path: string;
  image: string;
  state?: object;
  icon?: React.ReactElement;
  top?: string | undefined;
  bottom?: string | undefined;
  height?: string | number | undefined;
  extraSx?: object | undefined;
}

const OverlayCard = ({ width, maxWidth, height = 320, path, state, image, icon, top, bottom, extraSx }: OverlayCardProps) => {
  const navigate = useNavigate()
  console.log("image", image)
  return (
    <Card
          sx={{
            height: height,
            maxWidth: maxWidth,
            width: width ? width : "100%",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            margin: 1,
            ...extraSx
          }}
          onClick={() => navigate(path, state)}
        >
          {/* Image fills the card */}
          <Box
            component="img"
            src={image}
            loading="lazy"
            alt=""
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
            }}
          />

          {/* Text content pinned to bottom */}
          <CardContent
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff" }}>
              {top ? top : ""}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {icon ? icon : <></>}
              {bottom ? bottom : ""}
            </Typography>
          </CardContent>
        </Card>
  )
}

export default OverlayCard