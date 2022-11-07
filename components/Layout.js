import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.overlayContainer}>
      <Navbar />
      <main className="mt-5">{children}</main>
    </div>
  );
}
