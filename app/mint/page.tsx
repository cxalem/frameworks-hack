"use client";

import { client } from "@/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import contract from "@/abis/Ticket.json";

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
      <h1>{ticket}</h1>
    </div>
  );
}
