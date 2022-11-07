import React from "react";
import Card from "./Card";
import { useMoralis } from "../hooks/useMoralis";

import styles from "../styles/Section.module.css";

const renderCards = (data) => {
  const { result } = data;

  let nftsMetaData = result.map(({ metadata }) => {
    const _metadata = JSON.parse(metadata);

    return _metadata;
  });

  nftsMetaData = nftsMetaData.filter((metadata) => Boolean(metadata));
  if (!nftsMetaData.length) {
    return <h4>No NFTs found</h4>;
  }
  return (
    <>
      {nftsMetaData.map(({ name, image }) => (
        <Card key={name} name={name} image={image} />
      ))}
    </>
  );
};

export default React.memo(function Section({ chainId, chainName }) {
  const { isLoading, success, failure, error, response, onCursor } =
    useMoralis(chainId);
  const { cursor } = response;
  return (
    <section className={styles.container}>
      <h3>{chainName}</h3>
      <hr />
      <div className={styles.cardsContainer}>
        {!isLoading && success && renderCards(response)}
        {!isLoading && failure && <p>{error.message || error}</p>}
        {isLoading && <h3>Loading...</h3>}
      </div>

      {/* {cursor && (
        <div className="d-flex justify-content-center mt-5">
          <button
            className="btn btn-secondary"
            onClick={onCursor.bind(this, cursor)}
          >
            load more
          </button>
        </div>
      )} */}
    </section>
  );
});
