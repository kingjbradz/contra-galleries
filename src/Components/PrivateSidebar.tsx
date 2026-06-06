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
  isLoading: boolean;
}

const PrivateSidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleSidebar,
  navItems,
  location,
  navigate,
  isLoading,
}) => {
  const drawerWidth = "240px";

  const handleMobileRoute = (p: string) => {
    if (p.includes("https")) {
      window.open(p, "_blank");
    } else {
      navigate(p);
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
          justifyContent: "space-between"
        },
      }}
      sx={{ width: drawerWidth, flexShrink: 0, marginRight: "5px" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: 1 }}>
        {isLoading ? "" :
        navItems.map(({ text, path }) => (
          <Button
            key={text}
            onClick={() => handleMobileRoute(path)}
            sx={{
              color: path === location.pathname ? "grey.700" : "common.white",
              borderRadius: 0,
              justifyContent: "flex-start",
              paddingLeft: 2,
              textAlign: "left"
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

export default PrivateSidebar;
