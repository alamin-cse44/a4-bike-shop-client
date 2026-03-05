import { useNavigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import TocIcon from "@mui/icons-material/Toc";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import { Box, Button, Stack } from "@mui/material";
import mainLogo from "../../assets/icons/main-logo.jpg";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "dashboard/my-orders",
    title: "My Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Admin Management",
  },
  {
    segment: "dashboard/orders",
    title: "All Orders",
    icon: <TocIcon />,
  },
  {
    segment: "dashboard/dproducts",
    title: "Products",
    icon: <CategoryIcon />,
  },
  {
    segment: "dashboard/users",
    title: "Users",
    icon: <PeopleIcon />,
  },
];

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: "#00CA52",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

export default function DashboardLayoutSlots() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const branding = {
    title: "Bike Shop Dashboard",
    logo: (
      <img
        src={mainLogo}
        alt="Rehan Bike Shop"
        style={{ height: 40, borderRadius: 4 }}
      />
    ),
  };

  // Filter navigation based on user role
  const filteredNavigation = NAVIGATION.filter((item) => {
    if (user?.userRole === "admin") return true;
    if (user?.userRole === "customer") {
      // Allow general items and customer specific ones
      if (item.kind === "header" && item.title === "Admin Management")
        return false;
      if (
        item.segment === "dashboard/orders" ||
        item.segment === "dashboard/dproducts" ||
        item.segment === "dashboard/users"
      )
        return false;
      return true;
    }
    return false;
  });

  return (
    <AppProvider
      navigation={filteredNavigation}
      branding={branding}
      theme={dashboardTheme}
    >
      <DashboardLayout
        slots={{
          toolbarActions: () => (
            <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
              <Button
                startIcon={<HomeIcon />}
                onClick={() => navigate("/")}
                variant="text"
                color="inherit"
              >
                Home
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                variant="contained"
                sx={{
                  backgroundColor: "#ff4d4d",
                  "&:hover": { backgroundColor: "#e60000" },
                }}
              >
                Logout
              </Button>
            </Stack>
          ),
        }}
      >
        <Box sx={{ p: 3, minHeight: "100vh" }}>
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
