import { chainIdToInfo } from "../utils/chainConfigs";
import { shortenAddress } from "../utils/constants";

export default function ContractInfoCard({ address, deployedChainIds = [] }) {
  return (
    <div className="body-box">
      <div className="body-account-info-box">
        <h3 className="name-title"> {shortenAddress(address)}</h3>
        <div>
          <h5>Deployed chains</h5>
          <div className="wallet-flex-box">
            {deployedChainIds.map((chainId) => (
              <p key={chainId} className="wallet-number mb-1">
                {chainIdToInfo[chainId].chainName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
