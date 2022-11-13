import React from "react";
import { Card } from "./Card";
import { useMoralis } from "../hooks/useMoralis";

const renderCards = (data, chainId) => {
  const { result } = data;

  let nftsMetaData = result.map(
    ({ metadata, contract_type, token_address, token_id }) => {
      const _metadata = JSON.parse(metadata);

      return {
        metadata: _metadata,
        contractType: contract_type,
        contract: token_address,
        tokenId: token_id,
      };
    }
  );

  nftsMetaData = nftsMetaData.filter(
    ({ contractType }) => contractType === "ERC721"
  );
  if (!nftsMetaData.length) {
    return <h4>No NFTs found</h4>;
  }
  return (
    <div className="cards-grid">
      {nftsMetaData.map(({ metadata: { name, image }, contract, tokenId }) => (
        <Card
          key={contract + tokenId}
          name={name}
          image={image}
          contract={contract}
          tokenId={tokenId}
          chainId={chainId}
        />
      ))}
    </div>
  );
};

export default React.memo(function Section({ chainId, chainName }) {
  const { isLoading, success, failure, error, response, onCursor } =
    useMoralis(chainId);
  const { cursor } = response;
  return (
    <section className="body-box">
      <div className="products-big-start">
        <div className="products-start">
          <div className="product-big-title-box">
            <h2 className="product-big-title">{chainName}</h2>
          </div>

          {!isLoading && success && renderCards(response, chainId)}
          {!isLoading && failure && <p>{error.message || error}</p>}
          {isLoading && <h3>Loading...</h3>}
        </div>
      </div>
      {cursor && (
        <div className="d-flex justify-content-center mt-5">
          <button
            className="btn btn-secondary"
            onClick={onCursor.bind(this, cursor)}
          >
            load more
          </button>
        </div>
      )}
    </section>
  );
});
