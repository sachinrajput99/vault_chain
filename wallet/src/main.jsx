// eslint-disable-next-line
import React from "react";  
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MemoryRouter } from "react-router-dom";
import "./index.css";
import WalletProvider from "./providers/WalletProvider.jsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemoryRouter>
      <WalletProvider>
        <ConfigProvider
          theme={{
            token: {
              colorBgBase: "#24272a",
              colorTextBase: "#eee",
              colorTextSecondary: "black",
              colorBgSpotlight: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </WalletProvider>
    </MemoryRouter>
  </StrictMode>
);
