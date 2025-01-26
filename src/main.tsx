import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/api/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
