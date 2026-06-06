import React from "react";
import { useNavigate, useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import PrivateSidebar from "./PrivateSidebar";
import InstagramButton from "./InstagramButton";
import { Exhibition } from "../utils/global-types";
import { useExhibitions } from "../utils/api";
import { useGalleryName } from "./PrivateGalleryComponentName";
import Logo from "./Logo";

interface NavItem {
  text: string;
  path: string;
}

const staticNavItems: NavItem[] = [
  { text: "Main Website", path: "https://contragalleries.com" },
  { text: "Home", path: "/" },
];

const PrivateNavbar: React.FC = () => {
  const { name } = useGalleryName()
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { data: exhibitions, isLoading } = useExhibitions();

  const handleSidebar = () => {
    setSidebarOpen((current) => !current);
  };
  
  // render default exhibitions link on full screens larger than 900px 
  const exhibitionNavItems: NavItem[] = exhibitions
  ? exhibitions.length <= 3 ?
  exhibitions
      .map((exhibition: Exhibition) => ({
        text: exhibition.name,
        path: `/${exhibition.slug}`,
      }))
  : [{
    text: "Exhibitions",
    path: "/exhibitions"
  }] : [];

  // Combine static and dynamic nav items
  const navItems: NavItem[] = [...exhibitionNavItems, ...staticNavItems];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexShrink: "0",
        height: "93px",
      }}
    >
      <CssBaseline />
      <AppBar sx={{ bgcolor: "common.black", boxShadow: 0 }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              sx={{
                maxWidth: "40px",
                color: "common.white",
              }}
              onClick={handleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Box
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                marginBottom: 1,
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Logo />
              <Typography>{name}</Typography>
            </Box>
            <Box>
              <InstagramButton marginLeft={4} />
            </Box>
            <PrivateSidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleSidebar={handleSidebar}
              navItems={navItems}
              location={location}
              navigate={navigate}
              isLoading={isLoading}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PrivateNavbar;
