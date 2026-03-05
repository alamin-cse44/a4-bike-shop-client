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
  InputBase,
} from "@mui/material";
import {
  FaBars,
  FaHome,
  FaThLarge,
  FaBiking,
  FaList,
  FaInfoCircle,
  FaSearch,
  FaPhoneAlt,
} from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import mainLogo from "../assets/icons/main-logo.jpg";
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
    background-color: #ff4d4d;
  }
`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: "#f1f3f4",
  "&:hover": {
    backgroundColor: "#e8eaed",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    minWidth: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  backgroundColor: "#00CA52",
  borderRadius: "0 25px 25px 0",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 15px",
  borderRadius: "5px",
  fontSize: "0.95rem",
  fontWeight: 500,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
}));

const Navbar: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }

    if (location.pathname !== "/product") {
      navigate(`/product?${newParams.toString()}`);
    } else {
      setSearchParams(newParams);
    }
  };

  const currentSearch = searchParams.get("search") || "";

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetSignleUserQuery(user?.userEmail);
  const { data: cartItems } = useGetCartByEmailQuery(user?.userEmail);

  const totalQuantity =
    cartItems?.data?.reduce(
      (sum: number, item: TCart) => sum + item.quantity,
      0,
    ) || 0;

  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Part 1: Top Autoplay Header */}
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #eee",
          py: 0.5,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="animate-marquee"
            sx={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <Typography
              variant="caption"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Welcome to{" "}
              <span style={{ color: "#00CA52", fontWeight: "bold" }}>
                Rehan Bike Shop
              </span>{" "}
              — Your ultimate destination for premium bikes!
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FaPhoneAlt style={{ color: "#00CA52" }} /> Hotline: 01643530690
            </Typography>
            <Typography variant="caption">
              Free Service for first 1000km — Check out our latest Suzuki
              collections!
            </Typography>
            <Typography variant="caption">
              New Arrival: Gixxer SF 2024 is now available in stock!
            </Typography>
            {/* Repeat for continuous look */}
            <Typography
              variant="caption"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Welcome to{" "}
              <span style={{ color: "#00CA52", fontWeight: "bold" }}>
                Rehan Bike Shop
              </span>{" "}
              — Your ultimate destination for premium bikes!
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FaPhoneAlt style={{ color: "#00CA52" }} /> Hotline: 01643530690
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Part 2: Middle Header (Logo, Search, Auth, Cart) */}
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            px: { xs: 0 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={toggleMenu}
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <FaBars />
            </IconButton>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src={mainLogo}
                alt="Rehan Bike Shop"
                style={{ height: "50px", objectFit: "contain" }}
              />
            </Link>
          </Box>

          {/* Search Bar (Desktop) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Search>
              <StyledInputBase
                placeholder="search your favorite bike like suzuki"
                inputProps={{ "aria-label": "search" }}
                value={currentSearch}
                onChange={handleSearch}
              />
              <SearchIconWrapper>
                <FaSearch />
              </SearchIconWrapper>
            </Search>
          </Box>

          {/* Right Actions: Login/Signup & Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user?.userEmail ? (
              <>
                <IconButton onClick={toggleDrawer}>
                  <CartBadge badgeContent={totalQuantity} overlap="circular">
                    <ShoppingCartIcon sx={{ color: "#333" }} />
                  </CartBadge>
                </IconButton>
                <IconButton onClick={handleProfileMenuOpen}>
                  <Avatar
                    src={data?.data?.image}
                    alt={user?.userEmail}
                    sx={{ width: 40, height: 40, border: "2px solid #00CA52" }}
                  />
                </IconButton>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    backgroundColor: "#00CA52",
                    "&:hover": { backgroundColor: "#00ac46" },
                    textTransform: "none",
                    borderRadius: "5px",
                    px: 3,
                  }}
                >
                  Login / Sign Up
                </Button>
                <IconButton onClick={toggleDrawer}>
                  <CartBadge badgeContent={totalQuantity} overlap="circular">
                    <ShoppingCartIcon sx={{ color: "#333" }} />
                  </CartBadge>
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>

        <Box sx={{ display: { xs: "flex", md: "none" }, pb: 2 }}>
          <Search sx={{ m: 0, width: "100%" }}>
            <StyledInputBase
              placeholder="search your favorite bike like suzuki"
              inputProps={{ "aria-label": "search" }}
              value={currentSearch}
              onChange={handleSearch}
            />
            <SearchIconWrapper>
              <FaSearch />
            </SearchIconWrapper>
          </Search>
        </Box>
      </Container>

      {/* Part 3: Bottom Header (Nav Items) */}
      <Box
        sx={{
          backgroundColor: "#00CA52",
          display: { xs: "none", md: "block" },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
            <NavLink to="/dashboard">
              <FaThLarge /> Dashboard
            </NavLink>
            <NavLink to="/product">
              <FaBiking /> Product
            </NavLink>
            <NavLink to="/categories">
              <FaList /> Categories
            </NavLink>
            <NavLink to="/about">
              <FaInfoCircle /> About
            </NavLink>
          </Box>
        </Container>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 }}
      >
        <MenuItem
          component={Link}
          to="/dashboard"
          onClick={handleProfileMenuClose}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          Logout
        </MenuItem>
      </Menu>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: { xs: "100vw", sm: 350 }, padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6">Cart Items ({totalQuantity})</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Carts />
        </Box>
      </Drawer>

      {/* Mobile Side Menu */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <img src={mainLogo} alt="Logo" style={{ height: "40px" }} />
            <IconButton onClick={toggleMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <ListItem component={Link} to="/" onClick={toggleMenu}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FaHome color="#00CA52" />
                <ListItemText primary="Home" />
              </Box>
            </ListItem>
            <ListItem component={Link} to="/dashboard" onClick={toggleMenu}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FaThLarge color="#00CA52" />
                <ListItemText primary="Dashboard" />
              </Box>
            </ListItem>
            <ListItem component={Link} to="/product" onClick={toggleMenu}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FaBiking color="#00CA52" />
                <ListItemText primary="Product" />
              </Box>
            </ListItem>
            <ListItem component={Link} to="/categories" onClick={toggleMenu}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FaList color="#00CA52" />
                <ListItemText primary="Categories" />
              </Box>
            </ListItem>
            <ListItem component={Link} to="/about" onClick={toggleMenu}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FaInfoCircle color="#00CA52" />
                <ListItemText primary="About" />
              </Box>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
