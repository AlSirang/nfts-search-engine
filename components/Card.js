import Image from "next/image";
import styles from "../styles/Card.module.css";

import temImage from "../assets/images/placeholder-image.png";

export default function Card() {
  return (
    <div className={styles.container}>
      <Image className={styles.cardImage} src={temImage} alt="Card image cap" />

      <div className={styles.content}></div>
    </div>
  );
}
