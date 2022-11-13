import Meta from "./Meta";
import Navbar from "./Navbar";
// import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Meta />

      <Navbar />
      <main className="mt-5">{children}</main>
    </>
  );
}
