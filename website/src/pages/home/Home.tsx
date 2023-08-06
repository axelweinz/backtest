import Backtest from "../../components/backtest/Backtest";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles["home"]}>
      <Header />
      <div className={styles["content"]}>
        <Backtest />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
