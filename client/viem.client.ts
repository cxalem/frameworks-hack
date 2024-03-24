import { createPublicClient, createWalletClient, custom, http } from "viem";
import { lineaTestnet } from "viem/chains";

export const walletClient =
  typeof window != "undefined" &&
  createWalletClient({
    chain: lineaTestnet,
    // @ts-ignore
    transport: custom(window.ethereum),
  });

export const client = createPublicClient({
  chain: lineaTestnet,
  transport: http(),
});
