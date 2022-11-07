import Card from "./Card";

import styles from "../styles/Section.module.css";
export default function Section() {
  return (
    <section className={styles.container}>
      <h3>Chain Name</h3>

      <hr />

      <div className={styles.cardsContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}
