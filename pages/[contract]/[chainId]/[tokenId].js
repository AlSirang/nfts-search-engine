import Web3 from "web3";
import axios from "axios";
import { Multicall } from "ethereum-multicall";
import clsx from "clsx";
import { chainIdToURL } from "../../../utils/chainConfigs";
import ABI_ERC721 from "../../../assets/abis/basicERC721.abi.json";
import { getNavigableURL, shortenAddress } from "../../../utils/constants";
import styles from "../../../styles/WalletInfo.module.css";

export default function Page({ nftInfo }) {
  const {
    metadata,
    name: contractName,
    symbol,
    contractAddress,
    tokenId,
    chainId,
  } = nftInfo;
  const { image, name, description } = metadata;

  const blockExplorer = chainIdToURL[chainId].blockExplorer;

  let imgSrc = getNavigableURL(image);

  return (
    <section className={clsx("container", styles.container)}>
      <div className="row">
        <div className="col-md-5">
          <picture>
            <video
              poster={imgSrc}
              // className={styles.cardImage}
              src={imgSrc}
              alt="Card image cap"
              width="100%"
              autoPlay
              playsInline
              loop
            />
          </picture>
        </div>

        <div className="col-md-1" />

        <div className="col-md-6">
          <h1>{name}</h1>
          <h5>Description</h5>
          <p>{description}</p>
          <hr />

          <h5>Name: {contractName} </h5>
          <h5>Symbol: {symbol} </h5>

          <h5>
            Token Id:&nbsp;
            <a
              className="hover-color"
              href={`${blockExplorer}/token/${contractAddress}?a=${tokenId}`}
              target="_blank"
              rel="noreferrer"
            >
              {tokenId}
            </a>
          </h5>
          <h5>
            Address:&nbsp;
            <a
              className="hover-color"
              href={`${blockExplorer}/token/${contractAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              {shortenAddress(contractAddress)}
            </a>
          </h5>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async (context) => {
  const { contract, tokenId, chainId } = context.params;

  const rpcURL = chainIdToURL[chainId].rpcURL;

  const web3 = new Web3(rpcURL);

  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const contractContext = [
    {
      reference: "ERC721",
      contractAddress: contract,
      abi: ABI_ERC721,
      calls: [
        {
          reference: "ERC721",
          methodName: "name",
          methodParameters: [],
        },
        {
          reference: "ERC721",
          methodName: "symbol",
          methodParameters: [],
        },
        {
          reference: "ERC721",
          methodName: "tokenURI",
          methodParameters: [tokenId],
        },
      ],
    },
  ];

  try {
    const res = await multicall.call(contractContext);

    const tokenURI = res.results.ERC721.callsReturnContext[2].returnValues[0];

    let toFetchURI = getNavigableURL(tokenURI);

    const { data } = await axios.get(toFetchURI);

    const nftInfo = {
      name: res.results.ERC721.callsReturnContext[0].returnValues[0],
      symbol: res.results.ERC721.callsReturnContext[1].returnValues[0],
      metadata: data,
      contractAddress: contract,
      tokenId,
      chainId,
    };

    return {
      props: { nftInfo, isInfoLoaded: true },
    };
  } catch (err) {
    return {
      props: { nftInfo: {}, isInfoLoaded: false },
    };
  }
};
