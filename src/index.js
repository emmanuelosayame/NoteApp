import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";

import "@fontsource/yantramanav/400.css";
import "@fontsource/roboto/400.css";
import theme from "./Assets/theme";
import { SWRConfig } from "swr";

const root = ReactDOM.createRoot(document.getElementById("root"));
const cache = new Map();
root.render(
  <React.StrictMode>
    <SWRConfig value={{ provider: () => cache }}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode="dark" />
        <App />
      </ChakraProvider>
    </SWRConfig>
  </React.StrictMode>
);
