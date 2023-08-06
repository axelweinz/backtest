import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <h4>
        Missing a certain trading strategy?
        <a
          className={styles["github-link"]}
          href="https://github.com/axelweinz/backtest/tree/main"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Create a pull request{" "}
          <i id={styles["github-logo"]} className="fa fa-github"></i>
        </a>
      </h4>
    </footer>
  );
};

export default Footer;
