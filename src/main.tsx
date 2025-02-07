import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { WalletProvider } from "./components/wallet-provider.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import App from "./App.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import { AppHeader } from "./components/app-header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletProvider>
      <SidebarProvider>
        <AppSidebar />
        <AppHeader />
        <main>
          <App />
          <Toaster />
        </main>
      </SidebarProvider>
    </WalletProvider>
  </StrictMode>
);
