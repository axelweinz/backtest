import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <h1 className={styles["logo"]}>
        <Link className={styles["logo-link"]} to="/">
          backtest_
        </Link>
      </h1>
    </header>
  );
};

export default Header;
