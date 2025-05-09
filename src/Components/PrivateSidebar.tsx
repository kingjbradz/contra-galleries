import React from "react";
import { Location } from "react-router";
import { Drawer, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useGalleryName } from "./PrivateGalleryComponentName";

interface NavItem {
  text: string;
  path: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleSidebar: () => void;
  navItems: NavItem[];
  location: Location;
  navigate: (path: string) => void;
}

const PrivateSidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
  navItems,
  location,
  navigate,
}) => {
  const { name, setName } = useGalleryName();
  const drawerWidth = "240px";

  const handleMobileRoute = (t: string, p: string) => {
    if (p.includes("https")) {
      window.open(p, "_blank");
    } else {
      console.log("t is", t)
      setName(t)
      navigate(p);
      console.log("name is", name)
      console.log("setName is", setName)
    }
    setSidebarOpen(false);
  };

  return (
    <Drawer
      variant="temporary"
      open={sidebarOpen}
      onClose={handleSidebar}
      PaperProps={{
        sx: {
          border: "none",
          width: drawerWidth,
          overflowX: "hidden",
          bgcolor: "common.black",
        },
      }}
      sx={{ width: drawerWidth, flexShrink: 0, marginRight: "5px" }}
    >
      <Box>
        <IconButton
          onClick={() => setSidebarOpen(false)}
          sx={{
            color: "common.white",
            marginRight: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        {navItems.map(({ text, path }) => (
          <Button
            key={text}
            onClick={() => handleMobileRoute(text, path)}
            sx={{
              color: path === location.pathname ? "grey.700" : "common.white",
              borderRadius: 0,
              justifyContent: "flex-start",
              paddingLeft: 2
            }}
          >
            {text}
          </Button>
        ))}
      </Box>
    </Drawer>
  );
};

export default PrivateSidebar;
