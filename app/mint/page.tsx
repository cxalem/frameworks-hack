"use client";

import { WagmiProvider, useAccount, useConnect, useDisconnect } from "wagmi";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import contract from "@/abis/Ticket.json";
import { client } from "@/client";
import Provider from "@/providers/WagmiProvider";

// ConnectWalletButton component
const ConnectWalletButton = () => {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
      return;
    }
    const connector = connectors[0]; // You might want to implement a more robust connector selection logic
    connect({ connector });
  };

  return (
    <Provider>
      <button
        onClick={handleConnect}
        className="bg-gray-800 text-white font-medium py-2 px-4 rounded hover:bg-gray-700 duration-200"
      >
        {isConnected ? "Disconnect" : "Connect Wallet"}
      </button>
    </Provider>
  );
};

export default function Mint() {
  const getContractData = async (
    address: `0x${string}`,
    functionName: string
  ) => {
    return await client.readContract({
      address: address,
      abi: contract.abi,
      functionName,
    });
  };
  const searchParams = useSearchParams();
  const ticket = searchParams.get("ticket") as `0x${string}`;

  const getTicketData = async () => {
    try {
      const contractData = await getContractData(ticket, "eventOwner");
      console.log(contractData);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting ticket data");
    }
  };

  useEffect(() => {
    getTicketData();
  }, []);

  if (!ticket) {
    return (
      <div>
        <h1>Ticket not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <ConnectWalletButton />
      <h1>{ticket}</h1>
    </div>
  );
}
