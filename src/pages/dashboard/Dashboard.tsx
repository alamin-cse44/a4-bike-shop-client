import Box from "@mui/material/Box";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import { Button, Container, Stack, Typography } from "@mui/material";

const NAVIGATION = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { title: "Orders", icon: <ShoppingCartIcon />, path: "/dashboard/orders" },
  { title: "Products", icon: <CategoryIcon />, path: "/dashboard/dproducts" },
  { title: "Users", icon: <PeopleIcon />, path: "/dashboard/users" },
];

function CustomAppTitle({ dispatch }: { dispatch: any }) {
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <Typography variant="h6">My App</Typography>
      </Link>
      <Button onClick={handleLogout} variant="contained">
        LogOut
      </Button>
    </Stack>
  );
}

function CustomSidebar() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: "100%",
        // bgcolor: "#f4f4f4",
        padding: "20px",
        height: "110%",
        mt: -6
      }}
    >
      {NAVIGATION.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            padding: "15px",
            borderRadius: "5px",
            color: location.pathname === item.path ? "#fff" : "",
            backgroundColor:
              location.pathname === item.path ? "#ff5722" : "transparent",
          }}
        >
          {item.icon} <Typography sx={{ ml: 1, fontSize: 18 }}>{item.title}</Typography>
        </Link>
      ))}
    </Box>
  );
}

export default function DashboardLayoutSlots() {
  const dispatch = useAppDispatch();

  return (
    <AppProvider>
      <DashboardLayout
        slots={{
          appTitle: () => <CustomAppTitle dispatch={dispatch} />,
          sidebarFooter: () => <CustomSidebar />, // ✅ Override the built-in sidebar
        }}
      >
        {/* Main Content */}
        <Container sx={{mt: 5}}>
          <Outlet />
        </Container>
      </DashboardLayout>
    </AppProvider>
  );
}









// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Tooltip from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";
// import { createTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SearchIcon from "@mui/icons-material/Search";
// import CategoryIcon from "@mui/icons-material/Category";
// import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
// import {
//   DashboardLayout,
//   ThemeSwitcher,
//   type SidebarFooterProps,
// } from "@toolpad/core/DashboardLayout";
// import { useDemoRouter } from "@toolpad/core/internal";
// import { Link, Navigate, Outlet } from "react-router-dom";
// import Orders from "./Orders";
// import { Button, Container } from "@mui/material";
// import DProducts from "./DProducts";
// import { useAppDispatch } from "../../redux/hooks";
// import { logout } from "../../redux/features/auth/authSlice";
// import UserProfile from "./UserProfile";
// import Users from "./Users";

// const NAVIGATION: Navigation = [
//   {
//     kind: "header",
//     title: "Main items",
//   },
//   {
//     segment: "dashboard",
//     title: "Dashboard",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "orders",
//     title: "Orders",
//     icon: <ShoppingCartIcon />,
//   },
//   {
//     segment: "dproducts",
//     title: "Products",
//     icon: <CategoryIcon />,
//   },
//   {
//     segment: "users",
//     title: "Users",
//     icon: <CategoryIcon />,
//   },
// ];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }: { pathname: string }) {
//   return (
//     <Container sx={{ mt: 5 }}>
//       {pathname === "/dashboard" && <UserProfile />}
//       {pathname === "/dashboard" && <Navigate to={"/dashboard"} />}
//       {pathname === "/orders" && <Orders />}
//       {pathname === "/orders" && <Navigate to={"/dashboard/orders"} />}
//       {pathname === "/dproducts" && <DProducts />}
//       {pathname === "/users" && <Users />}
//     </Container>
//   );
// }

// function ToolbarActionsSearch() {
//   return (
//     <Stack direction="row">
//       <Tooltip title="Search" enterDelay={1000}>
//         <div>
//           <IconButton
//             type="button"
//             aria-label="search"
//             sx={{
//               display: { xs: "inline", md: "none" },
//             }}
//           >
//             <SearchIcon />
//           </IconButton>
//         </div>
//       </Tooltip>
//       <TextField
//         label="Search"
//         variant="outlined"
//         size="small"
//         slotProps={{
//           input: {
//             endAdornment: (
//               <IconButton type="button" aria-label="search" size="small">
//                 <SearchIcon />
//               </IconButton>
//             ),
//             sx: { pr: 0.5 },
//           },
//         }}
//         sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
//       />
//       <ThemeSwitcher />
//     </Stack>
//   );
// }

// function SidebarFooter({ mini }: SidebarFooterProps) {
//   return <Box mb={2}>{/* <Button variant="contained">LogOut</Button> */}</Box>;
// }

// function CustomAppTitle({ dispatch }: { dispatch: any }) {
//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       {/* <CloudCircleIcon fontSize="large" color="primary" /> */}
//       <Link
//         to={"/"}
//         style={{
//           color: "inherit",
//           textDecoration: "none",
//         }}
//       >
//         <Typography variant="h6">My App</Typography>
//       </Link>
//       {/* <Chip size="small" label="BETA" color="info" /> */}
//       <Button onClick={handleLogout} variant="contained">
//         LogOut
//       </Button>
//       {/* <Tooltip title="Connected to production">
//         <CheckCircleIcon color="success" fontSize="small" />
//       </Tooltip> */}
//     </Stack>
//   );
// }

// interface DemoProps {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window?: () => Window;
// }

// export default function DashboardLayoutSlots(props: DemoProps) {
//   const { window } = props;
//   const dispatch = useAppDispatch();
//   const router = useDemoRouter("/dashboard");
//   console.log("pathname: ", router);
//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//     >
//       <DashboardLayout
//         slots={{
//           appTitle: () => <CustomAppTitle dispatch={dispatch} />,
//           toolbarActions: ToolbarActionsSearch,
//           sidebarFooter: SidebarFooter,
//         }}
//       >
//         <DemoPageContent pathname={router.pathname} />
//         {/* <Outlet /> */}
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

