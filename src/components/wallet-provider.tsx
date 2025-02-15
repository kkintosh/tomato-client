import type { PropsWithChildren } from "react";

import { Network } from "@aptos-labs/ts-sdk";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";

import { useToast } from "@/hooks/use-toast";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const wallets = [new PetraWallet(), new OKXWallet()];
  const { toast } = useToast();

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
      }}
      onError={(error) => {
        console.log("[ERROR] WalletProvider", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};
