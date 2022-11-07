import Image from "next/image";
import styles from "../styles/Card.module.css";

import temImage from "../assets/images/placeholder-image.png";

export default function Card({ name, image }) {
  if (image && /ipfs:\/\//.test(image)) {
    return (
      <div className={styles.container}>
        <picture>
          <img
            className={styles.cardImage}
            src={
              `https://ipfs.moralis.io:2053/ipfs/` + image.split("ipfs://")[1]
            }
            alt="Card image cap"
            width="100%"
          />
        </picture>

        <div className={styles.content}></div>
      </div>
    );
  }

  return null;
}
