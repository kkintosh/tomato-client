import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toaster";
import { WalletProvider } from "./components/wallet-provider";
import { WalletSelector } from "./components/wallet-selector";
import { DataTable } from "./features/datagrids/components/data-table";

function App() {
  return (
    <>
      <WalletProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
              <div className="px-4">
                <WalletSelector />
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <DataTable />
            </div>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
      </WalletProvider>
    </>
  );
}

export default App;
