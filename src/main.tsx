import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

import { AutoConnectProvider } from "@/components/auto-connect-provider.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { WalletProvider } from "@/components/wallet-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AutoConnectProvider>
      <WalletProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </WalletProvider>
    </AutoConnectProvider>
  </StrictMode>
);
