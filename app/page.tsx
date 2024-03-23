import { client } from "@/client";
import { getTokenUrl } from "frames.js";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import { lineaTestnet } from "viem/chains";
import contract from "@/abis/Event.json";

type State = {
  pageIndex: number;
};

const events: {
  tokenUrl: string;
  address: `0x${string}`;
}[] = [
  {
    address: "0x6BF3418f943F4c41163dF3027B6C8C59DFE88A9b",
    tokenUrl: getTokenUrl({
      address: "0x99de131ff1223c4f47316c0bb50e42f356dafdaa",
      chain: lineaTestnet,
    }),
  },
  {
    address: "0x737fCb6e134b6ACff853B0bE682611A86EE45487",
    tokenUrl: getTokenUrl({
      address: "0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df",
      chain: lineaTestnet,
    }),
  },
  {
    address: "0xdf7b9CE3E6A0F1acDb215CB077bb9a7894AA5Ef6",
    tokenUrl: getTokenUrl({
      address: "0x8f5ed2503b71e8492badd21d5aaef75d65ac0042",
      chain: lineaTestnet,
    }),
  },
];
const initialState: State = { pageIndex: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;

  return {
    pageIndex: buttonIndex
      ? (state.pageIndex + (buttonIndex === 2 ? 1 : -1)) % events.length
      : state.pageIndex,
  };
};

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

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);
  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);

  const nftContract = (await getContractData(
    events[state.pageIndex].address,
    "ticketNFT"
  )) as string;

  // then, when done, return next frame
  return (
    <div>
      <FrameContainer
        pathname="/"
        postUrl="/api/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>
          <h1>
            {
              (await getContractData(
                events[state.pageIndex].address,
                "title"
              )) as string
            }
          </h1>
          <p>
            {
              (await getContractData(
                events[state.pageIndex].address,
                "description"
              )) as string
            }
          </p>
        </FrameImage>
        <FrameButton>←</FrameButton>
        <FrameButton>→</FrameButton>
        <FrameButton action="link" target={`/mint?&ticket=${nftContract}`}>
          Get Ticket
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
