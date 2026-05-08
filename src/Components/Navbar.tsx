import "@fontsource/poppins/200.css"
import React from "react";
import { useNavigate, useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Sidebar from "./Sidebar";
import InstagramButton from "./InstagramButton";
import { useExhibitions } from "../utils/api";
import { Exhibition } from "../utils/global-types";
import Logo from "./Logo";

interface NavItem {
  text: string;
  path: string;
}

const staticNavItems: NavItem[] = [
  { text: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate();
  const location = useLocation();
  const isMD = useMediaQuery("(min-width: 900px)");
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
    <Box sx={{ display: "flex", justifyContent: "center", flexShrink: "0", height: "64px" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "common.black", boxShadow: 0 }}>
        <Toolbar>
          {/* <Typography>{isMD ? `I am over MD: ${window.innerWidth}` : `I am under MD: ${window.innerWidth}` }</Typography> */}
          {isMD ? (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%', minHeight: "inherit" }}>
              <Logo />
              <Box sx={{ display: { xs: "none", sm: "flex" }, marginLeft: 1, minHeight: "inherit" }}>
                {isLoading ? (
                  ""
                ) : (
                  navItems.map(({ text, path }) => (
                    <Button
                      key={text}
                      size="small"
                      onClick={() => navigate(path)}
                      sx={{
                        color: path === location.pathname ? "grey.500" : "common.white",
                        borderBottom: path === location.pathname ? `5px solid ${theme.palette.grey[500]}` : "",
                        borderRadius: 0,
                        marginLeft: 2,
                      }}
                    >
                      {text}
                    </Button>
                  ))
                )}
                <InstagramButton marginLeft={4} />
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <IconButton
                  sx={{
                    maxWidth: "40px",
                    color: "common.white",
                  }}
                  onClick={handleSidebar}
                >
                  <MenuIcon />
                </IconButton>
                <Logo />
                <Box></Box>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleSidebar={handleSidebar}
                navItems={navItems}
                location={location}
                navigate={navigate}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;