import Section from "../components/Section";
import WalletInfo from "../components/WalletInfo";
import { constChainConfigs } from "../utils/chainConfigs";

export default function index() {
  return (
    <div className="container">
      <WalletInfo />
      {constChainConfigs.map(({ chainName, chainId }) => (
        <Section key={chainId} chainId={chainId} chainName={chainName} />
      ))}
    </div>
  );
}
