import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Web3UserContext } from "../context";

export const useMoralis = (chainId) => {
  const {
    contextState: { account },
  } = Web3UserContext();

  const hasRun = useRef(false);

  const [{ isLoading, success, failure, error, response }, setState] = useState(
    {
      isLoading: false,
      success: false,
      failure: false,
      error: null,
      response: {
        cursor: null,
        page: null,
        page_size: null,
        result: [],
        total: null,
      },
    }
  );

  const fetchNFTs = (options) => {
    setState((p) => ({ ...p, isLoading: true }));

    axios
      .request(options)
      .then(function (_response) {
        const { data } = _response;

        setState((p) => ({
          ...p,
          isLoading: false,
          success: true,
          response: data,
        }));
      })
      .catch(function (error) {
        console.error();

        setState((p) => ({
          ...p,
          isLoading: false,
          failure: true,
          error,
        }));
      });
  };

  useEffect(() => {
    chainId &&
      (() => {
        if (hasRun.current) return;

        const _wallet = account || "0x1EC5858f161fa17F148626ABcFAC12381F97D34B";

        hasRun.current = true;

        const options = {
          method: "GET",
          url: `https://deep-index.moralis.io/api/v2/${_wallet}/nft`,
          params: { chain: chainId, format: "decimal", limit: "12" },
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          },
        };

        fetchNFTs(options);
      })();
  }, [account, chainId]);

  const onCursor = (cursor) => {
    const options = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${account}/nft`,
      params: { chain: chainId, format: "decimal", limit: "12", cursor },
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      },
    };

    fetchNFTs(options);
  };

  return { isLoading, success, failure, error, response, onCursor };
};
