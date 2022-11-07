import Meta from "./Meta";

import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import clsx from "clsx";

export default function Navbar() {
  return (
    <>
      <Meta />

      <div className={styles.overlayImage}>
        <div className={styles.overlayColor}></div>
      </div>

      <header className={styles.header}>
        <div className={styles.banner}>
          <div className={styles.inner}>
            <Link href="/">
              <span className={clsx(styles.link, styles.subHeading)}>logo</span>
            </Link>

            <span className={clsx(styles.link, styles.subHeading)}>
              Connect Wallet
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
