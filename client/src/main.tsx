import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { LoadingProvider } from "./contexts/loading.tsx";

axios.defaults.baseURL = "http://localhost:3000";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CartProvider } from "./contexts/cart.tsx";
import { UserProvider } from "./contexts/user.tsx";
import { FlashProvider } from "./contexts/flash.tsx";


const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#F9F1E7", // Custom primary color
  //   },
  //   secondary: {
  //     main: "#dc004e", // Custom secondary color
  //   },
  // },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <FlashProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </UserProvider>
          </ThemeProvider>
        </FlashProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
