import { Web3UserContext } from "../context";
import styles from "../styles/WalletInfo.module.css";
import { shortenAddress } from "../utils/constants";

export default function WalletInfo() {
  const {
    contextState: { account, isWalletConnected },
  } = Web3UserContext();
  return (
    <section className={styles.container}>
      {isWalletConnected && (
        <h4>Connected Wallet: {shortenAddress(account)}</h4>
      )}

      {!isWalletConnected && (
        <h4>Please connect your wallet to see all NFTs</h4>
      )}
    </section>
  );
}
