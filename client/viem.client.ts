import { createPublicClient, createWalletClient, custom, http } from "viem";
import { lineaTestnet } from "viem/chains";

export const walletClient =
  typeof window != "undefined" &&
  createWalletClient({
    chain: lineaTestnet,
    transport: custom(window.ethereum),
  });

export const client = createPublicClient({
  chain: lineaTestnet,
  transport: http(),
});
