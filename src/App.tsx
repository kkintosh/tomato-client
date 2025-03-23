import { useState } from "react";

import { Hex } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { registerWallet } from "@aptos-labs/wallet-standard";
import { WebUploader } from "@irys/web-upload";
import CryptoJS from "crypto-js";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";

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
import { getAllTransactionByAddress } from "./lib/irys/query";

// Example of how to register a browser extension wallet plugin.
// Browser extension wallets should call registerWallet once on page load.
// When you click "Connect Wallet", you should see "Example Wallet"
(function () {
  if (typeof window === "undefined") return;
  const myWallet = new MyWallet();
  registerWallet(myWallet);
})();

export default function App() {
  const { account, connected, disconnect, wallet, signMessage } = useWallet();
  const [irysStatus, setIrysStatus] = useState("Not connected");

  const getIrysUploader = async () => {
    console.log("connect irys called");

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

    // try {
    //   const response = await irys.uploadFile(file);
    //   console.log(`File uploaded ==> https://gateway.irys.xyz/${response.id}`);
    // } catch (e) {
    //   console.log("Error uploading file ", e);
    // }
  };

  const testQuery = async () => {
    const address = wallet?.accounts[0]?.address;
    if (address) {
      getAllTransactionByAddress(wallet?.accounts[0]?.address);
    }
  };

  const testEncryption = async () => {
    // const publicKey = wallet?.accounts[0]?.publicKey;

    const publicKey = account?.publicKey.toUint8Array();
    const sharedKey = nacl.hash(publicKey).slice(0, 32); // Derive a symmetric key

    // encrypt

    const aesKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
    const encryptedMessage = CryptoJS.AES.encrypt("my message lmao", aesKey).toString();

    // const publicKeyBytes = Hex..ensure(publicKeyHex).toUint8Array();

    const encryptedAESKey = CryptoJS.AES.encrypt(aesKey, naclUtil.encodeBase64(sharedKey)).toString();
    const encryptData = { encryptedMessage, encryptedAESKey };

    console.log("encryptData:", encryptData);

    // Decrypt the data (AES key) using the private key from the wallet (done by wallet in practice)
    // const decryptedAESKey = await signMessage({ message: "lmao", nonce: "69" });
    // console.log("Decrypted Key:", decryptedAESKey);

    const decryptedAESKey = CryptoJS.AES.decrypt(encryptedAESKey, naclUtil.encodeBase64(sharedKey)).toString(
      CryptoJS.enc.Utf8
    );
    const decryptData = CryptoJS.AES.decrypt(encryptData.encryptedMessage, decryptedAESKey).toString(CryptoJS.enc.Utf8);

    console.log("decryptData:", decryptData);
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
            <Button onClick={testQuery}>testQuery</Button>
            <Button onClick={testEncryption}>testEncryption</Button>
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
