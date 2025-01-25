import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
    </ThemeProvider>
  </StrictMode>
);
