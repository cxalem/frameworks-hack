import { createPublicClient, http } from "viem";
import { lineaTestnet } from "viem/chains";

export const client = createPublicClient({
  chain: lineaTestnet,
  transport: http(),
});

export const getBlockNumber = async () => {
  return await client.getBlockNumber();
}
