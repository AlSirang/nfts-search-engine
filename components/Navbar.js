import Link from "next/link";
// import clsx from "clsx";
import WalletButton from "./WalletButton";
import logo from "../assets/images/one-logo.svg";

export default function Navbar() {
  return (
    <header className="header-big-box">
      <div className="header-box">
        <div className="header-logo-box">
          <picture>
            <img className="header-logo" src={logo.src} alt="" />
          </picture>
        </div>

        <WalletButton />
      </div>
    </header>
  );
}
