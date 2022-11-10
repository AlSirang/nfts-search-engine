export const chainConfigs = [
  {
    chainName: "Avalanche",
    chainId: "0xa86a",
  },
  {
    chainName: "BSC",
    chainId: "0x38",
  },
  {
    chainName: "Ethereum",
    chainId: "0x1",
  },
  {
    chainName: "Fantom",
    chainId: "0xfa",
  },
  {
    chainName: "Polygon",
    chainId: "0x89",
  },
];

export const chainIdToInfo = {
  "0x1": {
    rpcURL: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    blockExplorer: "https://etherscan.io",
    chainName: "Ethereum",
  },
  "0x89": {
    rpcURL: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
    chainName: "Polygon",
  },
  "0x38": {
    rpcURL: "https://bsc-dataseed.binance.org",
    blockExplorer: "https://bscscan.com",
    chainName: "BSC",
  },
  "0xa86a": {
    rpcURL: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorer: "https://snowtrace.io",
    chainName: "Avalanche",
  },
  "0xfa": {
    rpcURL: "https://rpc.ftm.tools/",
    blockExplorer: "https://ftmscan.com",
    chainName: "Fantom",
  },
};
