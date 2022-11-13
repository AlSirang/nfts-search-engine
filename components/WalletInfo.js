import { Web3UserContext } from "../context";
import { shortenAddress } from "../utils/constants";
import icon from "../assets/images/copy-icon.svg";

export default function WalletInfo() {
  const {
    contextState: { account, isWalletConnected },
  } = Web3UserContext();
  return (
    <>
      <div class="body-box">
        <div className="body-account-info-box">
          <h2 className="name-title">Wallet Information</h2>
          <div className="wallet-flex-box">
            {isWalletConnected && (
              <>
                <p className="wallet-number mb-1">
                  {shortenAddress(account)}
                  &nbsp;&nbsp;
                  <picture>
                    <img className="wallet-copy-icon" src={icon.src} alt="" />
                  </picture>
                </p>
              </>
            )}

            {!isWalletConnected && <hp>Please connect your wallet.</hp>}
          </div>
          <button className="example-btn">Follow</button>
        </div>
      </div>
    </>
  );
}
