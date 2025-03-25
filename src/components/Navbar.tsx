import { FC, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Button,
  styled,
  Fab,
} from "@mui/material";
import { FaBars } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import logo1 from "../assets/icons/logo1.webp";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";
import { useGetSignleUserQuery } from "../redux/features/user/userManagementApi";
import { useGetCartByEmailQuery } from "../redux/features/cart/cartApi";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { TCart } from "../types";
import Carts from "../pages/carts/Carts";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
    color: #fff;
    background-color: red;
  }
`;

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

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const { data } = useGetSignleUserQuery(user?.userEmail);

  const handleLogout = () => {
    dispatch(logout());
  };

  const { data: cartItems } = useGetCartByEmailQuery(user?.userEmail);

  const totalQuantity = cartItems?.data?.reduce(
    (sum: number, item: TCart) => sum + item.quantity,
    0
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#2F3338" }}>
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            padding: 0,
            minHeight: "auto",
            px: { xs: 0, sm: 0 },
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
            <Box
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <Link
                to="/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                <img src={logo1} alt="footer_img" color="white" width={80} />
              </Link>
            </Box>
          </Box>

          {/* Middle: Search Bar */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={logo1} alt="footer_img" color="white" width={60} />
            </Link>
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
                to="/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                <Typography variant="body1">Home</Typography>
              </Link>
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
            </Box>

            {user?.userEmail ? (
              <>
                <IconButton onClick={toggleDrawer} sx={{ mr: 1 }}>
                  <ShoppingCartIcon fontSize="medium" sx={{ color: "white" }} />
                  <CartBadge badgeContent={totalQuantity} overlap="circular" />
                </IconButton>
                <IconButton onClick={handleProfileMenuOpen} color="inherit">
                  <Avatar
                    src={data?.data?.image}
                    alt={"usr name"}
                    sx={{ width: 35, height: 35 }}
                  />
                </IconButton>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginLeft: "15px",
                  border: "1px solid #fff",
                  padding: "5px 10px",
                  borderRadius: 5,
                }}
              >
                <Typography variant="body1">Login</Typography>
              </Link>
            )}
            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link
                  to="/dashboard"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Typography variant="body1">Profile</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleProfileMenuClose}>
                <Button onClick={handleLogout} variant="outlined" color="error">
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer for Cart (opens from the right side) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 350, padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Cart Items : {totalQuantity}</Typography>
            <Fab
              onClick={toggleDrawer}
              size="small"
              color="secondary"
              aria-label="add"
            >
              <CloseIcon sx={{ color: "white" }} />
            </Fab>
          </Box>
          {/* component */}
          <Carts />
        </Box>
      </Drawer>

      {/* Drawer for Menu (opens from the left side on mobile) */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box sx={{ width: 250, padding: 2 }}>
          <List>
            <ListItem component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
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
