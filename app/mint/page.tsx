"use client";

// import { client } from "@/client/viem.client";
// import { useSearchParams } from "next/navigation";
// import contract from "@/abis/Ticket.json";
// import eventAbi from "@/abis/Event.json";
// import { walletClient } from "@/client/viem.client";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";

export default function Mint() {
  // const [eventData, setEventData] = useState<{
  //   title: string;
  //   description: string;
  //   date: string;
  // }>();

  // const getContractData = async (
  //   address: `0x${string}`,
  //   functionName: string
  // ) => {
  //   return await client.readContract({
  //     address: address,
  //     abi: eventAbi.abi,
  //     functionName,
  //   });
  // };

  // const searchParams = useSearchParams();
  // const ticket = searchParams.get("ticket") as `0x${string}`;
  // const event = searchParams.get("event") as `0x${string}`;

  // const getEventData = async () => {
  //   try {
  //     const eventTitle = (await getContractData(event, "title")) as string;
  //     const eventDescription = (await getContractData(
  //       event,
  //       "description"
  //     )) as string;
  //     const eventDate = (await getContractData(event, "date")) as string;
  //     return {
  //       title: eventTitle,
  //       description: eventDescription,
  //       date: eventDate,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error getting ticket data");
  //   }
  // };

  // useEffect(() => {
  //   getEventData().then((data) => setEventData(data));
  // }, []);

  // const handleMint = async () => {
  //   try {
  //     const [address] = await (walletClient as any).getAddresses();
  //     const hash = await (walletClient as any).writeContract({
  //       address: ticket,
  //       abi: contract.abi,
  //       functionName: "mint",
  //       account: address,
  //       args: [1, "google.com"],
  //     });
  //     console.log(hash);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // if (!ticket) {
  //   return (
  //     <div>
  //       <h1>Ticket not found</h1>
  //     </div>
  //   );
  // }

  // if (!eventData) {
  //   return (
  //     <div className="min-h-screen text-center pt-20 bg-slate-100">
  //       <h1>Loading event...</h1>
  //     </div>
  //   );
  // }

  // const formattedDate = format(
  //   new Date(Number(eventData.date) * 1000),
  //   "MMM. d"
  // );

  // return (
  //   <div className="min-h-screen bg-slate-100 text-center space-y-4 pt-20">
  //     <h1 className="text-2xl font-semibold">{eventData.title}</h1>
  //     <p>{eventData.description}</p>
  //     <p>Date: {formattedDate}</p>
  //     <button
  //       className="bg-slate-800 text-white px-14 py-3 rounded-md hover:bg-slate-600 duration-200"
  //       onClick={handleMint}
  //     >
  //       Get your ticket!
  //     </button>
  //   </div>
  // );

  return (
    <div>
      <h1>Not implemented</h1>
    </div>
  );
}
