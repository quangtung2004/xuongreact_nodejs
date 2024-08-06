import { ExitToApp, Home, Menu, People, Settings } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  const handleDrawerToggle = () => {
    setOpen(open);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    nav("/");
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333",
            color: "#fff",
          },
        }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
          <IconButton onClick={handleDrawerToggle} style={{ color: "#fff" }}>
            <Menu />
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: "#444" }} />
        <List>
          <ListItem button>
            <ListItemIcon style={{ color: "#fff" }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon style={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button>
            <ListItemIcon style={{ color: "#fff" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon style={{ color: "#fff" }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
