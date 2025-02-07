import { createTheme } from "@mui/material/styles";

// Colors
const primary = "#314C3D"; // Dark Green
const primaryLight = "#D5E4DB"; // Light Green
// const primaryBright = "#018037"; // Bright Green
const black = "#0F172A"; // Black
// const blackDark = "#1F283B"; // Darker Black
// const blackLight = "#2F3B52"; // Lighter Black

// Breakpoints for responsiveness
const breakpoints = {
  values: {
    xs: 0,
    xms: 380, // Custom breakpoint
    sm: 600, // Phone
    md: 900, // Tablet/Laptop
    lg: 1200, // Desktop
    xl: 1536,
  },
};

const theme = createTheme({
  breakpoints,
  palette: {
    primary: {
      main: primary,
      // bright: primaryBright,
      contrastText: primaryLight,
    },
    secondary: {
      main: black,
      contrastText: primary,
    },
    error: {
      main: "#e86161",
    },
    warning: {
      main: "#ffc300",
      contrastText: "#272725",
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "2px",
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          "& .MuiInputBase-input": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            border: "none",
            outline: "none",
          },
        },
      },
    },
  },
});

export default theme;
