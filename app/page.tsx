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
import contract from "@/Event.json";

type State = {
  pageIndex: number;
};

const events: {
  src: string;
  tokenUrl: string;
  address: `0x${string}`;
}[] = [
  {
    src: "https://eventsea-web-git-frameworks-hackathon-infura-web.vercel.app/_next/image?url=%2Fimages%2Fdefault.png&w=3840&q=75",
    address: "0x6BF3418f943F4c41163dF3027B6C8C59DFE88A9b",
    tokenUrl: getTokenUrl({
      address: "0x99de131ff1223c4f47316c0bb50e42f356dafdaa",
      chain: lineaTestnet,
      tokenId: "2",
    }),
  },
  {
    src: "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fipfs.decentralized-content.com%2Fipfs%2Fbafybeiegrnialwu66u3nwzkn4gik4i2x2h4ip7y3w2dlymzlpxb5lrqbom&w=1920&q=75",
    address: "0x737fCb6e134b6ACff853B0bE682611A86EE45487",
    tokenUrl: getTokenUrl({
      address: "0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df",
      chain: lineaTestnet,
      tokenId: "1",
    }),
  },
  {
    src: "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fipfs.decentralized-content.com%2Fipfs%2Fbafybeidc6e5t3qmyckqh4fr2ewrov5asmeuv4djycopvo3ro366nd3bfpu&w=1920&q=75",
    address: "0x6BF3418f943F4c41163dF3027B6C8C59DFE88A9b",
    tokenUrl: getTokenUrl({
      address: "0x8f5ed2503b71e8492badd21d5aaef75d65ac0042",
      chain: lineaTestnet,
      tokenId: "3",
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
  eventAddress: `0x${string}`,
  functionName: string
) => {
  return await client.readContract({
    address: eventAddress,
    abi: contract.abi,
    functionName,
  });
};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);
  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);

  // then, when done, return next frame
  return (
    <div>
      <FrameContainer
        pathname="/examples/mint-button"
        postUrl="/examples/mint-button/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src={events[state.pageIndex]!.src} aspectRatio="1:1">
          <h1>
            {
              (await getContractData(
                events[state.pageIndex]!.address,
                "title"
              )) as string
            }
          </h1>
          <p>
            {
              (await getContractData(
                events[state.pageIndex]!.address,
                "description"
              )) as string
            }
          </p>
        </FrameImage>
        <FrameButton>←</FrameButton>
        <FrameButton>→</FrameButton>
        <FrameButton action="post" target="/api/mint">
          Mint
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
