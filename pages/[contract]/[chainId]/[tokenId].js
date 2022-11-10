import Web3 from "web3";
import axios from "axios";
import { Multicall } from "ethereum-multicall";
import clsx from "clsx";
import { chainConfigs, chainIdToInfo } from "../../../utils/chainConfigs";
import ABI_ERC721 from "../../../assets/abis/basicERC721.abi.json";
import { getNavigableURL, shortenAddress } from "../../../utils/constants";
import styles from "../../../styles/WalletInfo.module.css";
import Meta from "../../../components/Meta";

export default function Page({ nftInfo }) {
  const { metadata, contractAddress, tokenId, chainId, metadataURI } = nftInfo;
  const { image, name, description } = metadata;

  const blockExplorer = chainIdToInfo[chainId].blockExplorer;

  let imgSrc = getNavigableURL(image);

  return (
    <section className="pb-5">
      <Meta title={name} description={description} />
      <div className={clsx("container", styles.container)}>
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

            <div className="row">
              {/* left start*/}
              <div className="col-6 h5-mb0">
                <div>
                  <h5>Source Chain</h5>
                  <p>{chainIdToInfo[chainId].chainName}</p>
                </div>

                <div>
                  <h5>Select Destination Chain</h5>
                  <div className="p-2" />
                  <select className="form-select">
                    {chainConfigs
                      .filter(({ chainId: _chainId }) => _chainId !== chainId)
                      .map(({ chainName, chainId }) => (
                        <option key={chainId}>{chainName}</option>
                      ))}
                  </select>
                </div>

                <div className="mt-4">
                  <button className="btn btn-outline-secondary w-100">
                    Traverse
                  </button>
                </div>
              </div>
              {/* left end*/}

              {/* right  start*/}
              <div className="col-6 h5-mb0">
                <h5>Source Contract</h5>
                <p>
                  <a
                    className="hover-color"
                    href={`${blockExplorer}/token/${contractAddress}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {shortenAddress(contractAddress)}
                  </a>
                </p>

                <h5>NFT Name</h5>
                <p>{name}</p>

                <h5>NFT Id</h5>
                <p>
                  <a
                    className="hover-color"
                    href={`${blockExplorer}/token/${contractAddress}?a=${tokenId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tokenId}
                  </a>
                </p>

                <p>
                  <a
                    className="hover-color"
                    href={metadataURI}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Show metadata
                  </a>
                </p>
                {/* right end*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async (context) => {
  const { contract, tokenId, chainId } = context.params;

  const rpcURL = chainIdToInfo[chainId].rpcURL;

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
      metadataURI: toFetchURI,
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
