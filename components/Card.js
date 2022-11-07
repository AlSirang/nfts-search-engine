import clsx from "clsx";
import Link from "next/link";
import styles from "../styles/Card.module.css";
import { getNavigableURL } from "../utils/constants";

const renderCard = (src, otherInfo) => {
  const { name, contract, tokenId, chainId } = otherInfo;

  const href = `${contract}/${chainId}/${tokenId}`;
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

        <div className={styles.relativeContainer}>
          <div className={styles.absContainer}>
            <Link href={href} className={clsx(styles.link, "hover-color")}>
              traverse&nbsp;<span className="fa fa-arrow-right"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Card(props) {
  const { name, image } = props;
  return renderCard(getNavigableURL(image), props);
}
