import Image from "next/image";
import styles from "../styles/Card.module.css";

import temImage from "../assets/images/placeholder-image.png";

const renderCard = (src, name) => {
  return (
    <div className={styles.container}>
      <picture>
        <video
          poster={src}
          className={styles.cardImage}
          src={src}
          alt="Card image cap"
          width="100%"
          autoPlay
          playsInline
          loop
        />
      </picture>

      <div className={styles.content}>
        <h5>{name}</h5>
      </div>
    </div>
  );
};

export default function Card({ name, image }) {
  console.log({ image });
  if (image && /ipfs:\/\//.test(image)) {
    return renderCard(
      `https://ipfs.moralis.io:2053/ipfs/` + image.split("ipfs://")[1],
      name
    );
  }

  if (image && /https:\/\//.test(image)) return renderCard(image, name);

  return null;
}
