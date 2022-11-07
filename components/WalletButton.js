import { Web3UserContext } from "../context";

export default function WalletButton() {
  const {
    walletConnect,
    disconnectWallet,
    contextState: { isWalletConnected },
  } = Web3UserContext();

  const handleButtonClick = () => {
    if (isWalletConnected) return disconnectWallet();
    walletConnect();
  };

  return (
    <button className="btn btn-secondary" onClick={handleButtonClick}>
      {isWalletConnected && "Disconnect"}
      {!isWalletConnected && "Connect Wallet"}
    </button>
  );
}
