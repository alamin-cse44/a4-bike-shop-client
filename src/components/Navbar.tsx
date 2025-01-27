import { FC, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Toggle cart drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Open profile menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close profile menu
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side: Logo and Menu icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={toggleMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <FaBars />
            </IconButton>
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
             <img src={logo} alt="footer_img" color="white" width={80} />
            </Link>
          </Box>

          {/* Middle: Search Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1, // Allows the search bar to grow and center itself
            }}
          >
            <InputBase
              placeholder="Search..."
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                padding: "0 16px",
                // width: '100%',
                maxWidth: 600, // To limit the max width of the search bar
              }}
            />
          </Box>

          {/* Right side: Profile and Cart Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                marginRight: "20px",
                alignItems: "center",
              }}
            >
              <Link
                to="/product"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                <Typography variant="body1">Product</Typography>
              </Link>
              <Link
                to="/about"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                <Typography variant="body1">About</Typography>
              </Link>
              <Link
                to="/dashboard"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                <Typography variant="body1">Dashboard</Typography>
              </Link>
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography variant="body1">Login</Typography>
              </Link>
            </Box>
            <IconButton onClick={toggleDrawer} color="inherit">
              <FaShoppingCart />
            </IconButton>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <FaUserCircle />
            </IconButton>
            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer for Cart (opens from the right side) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 350, padding: 2 }}>
          <Typography variant="h6">Cart Information</Typography>
          {/* Add your cart items or details here */}
        </Box>
      </Drawer>

      {/* Drawer for Menu (opens from the left side on mobile) */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box sx={{ width: 250, padding: 2 }}>
          <List>
            <ListItem component={Link} to="/product">
              <ListItemText primary="Product" />
            </ListItem>
            <ListItem component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
