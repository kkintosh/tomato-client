import { useState } from "react";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { registerWallet } from "@aptos-labs/wallet-standard";
import { WebUploader } from "@irys/web-upload";

import { WebAptos } from "@/lib/aptos-web";
// Imports for registering a browser extension wallet plugin on page load
import { MyWallet } from "@/utils/standard-wallet";

import { AppSidebar } from "./components/app-sidebar";
import { SearchForm } from "./components/search-form";
import { DataTable } from "./components/table/data-table";
import { Button } from "./components/ui/button";
import { SidebarInset, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toaster";
import { WalletSelector } from "./components/wallet-selector";

// Example of how to register a browser extension wallet plugin.
// Browser extension wallets should call registerWallet once on page load.
// When you click "Connect Wallet", you should see "Example Wallet"
(function () {
  if (typeof window === "undefined") return;
  const myWallet = new MyWallet();
  registerWallet(myWallet);
})();

export default function App() {
  const { account, connected, disconnect, wallet } = useWallet();
  const [irysStatus, setIrysStatus] = useState("Not connected");

  const getIrysUploader = async () => {
    console.log("connect irys called");
    console.log(wallet);

    const irysUploader = await WebUploader(WebAptos).withProvider(wallet);
    console.log(irysUploader);
    return irysUploader;
  };

  const uploadDePINData = async () => {
    const irys = await getIrysUploader();

    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    // const tags = [{ name: "Content-Type", value: "application/json" }];

    console.log(Buffer.from(await file.arrayBuffer()));

    try {
      const response = await irys.uploadFile(file);
      console.log(`File uploaded ==> https://gateway.irys.xyz/${response.id}`);
    } catch (e) {
      console.log("Error uploading file ", e);
    }
  };

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <SearchForm />
            <Button onClick={uploadDePINData}>upload</Button>
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
    </>
  );
}
