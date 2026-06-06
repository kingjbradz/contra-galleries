import React from "react";
import { Location } from "react-router";
import { Drawer, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
  navItems,
  location,
  navigate,
}) => {
  const drawerWidth = "240px";
  const sidebarNavItems = [{ text: "home", path: "/" }, ...navItems]

  const handleMobileRoute = (v: string) => {
    if (v.includes("https")) {
      window.open(v, "_blank");
    } else {
      navigate(v);
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
          justifyContent: "space-between",
        },
      }}
      sx={{ width: drawerWidth, flexShrink: 0, marginRight: "5px" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: 1 }}>
        {sidebarNavItems.map(({ text, path }) => (
          <Button
            key={text}
            onClick={() => handleMobileRoute(path)}
            sx={{
              color: path === location.pathname ? "grey.500" : "common.white",
              borderRadius: 0,
              justifyContent: "flex-start",
              paddingLeft: 2,
            }}
          >
            {text}
          </Button>
        ))}
      </Box>
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
    </Drawer>
  );
};

export default Sidebar;
