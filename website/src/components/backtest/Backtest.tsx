import DumbStockApiClient from "../../clients/dumbStockApi/DumbStockApiClient";
import { TickerResponse } from "../../clients/dumbStockApi/responses/TickerResponse";
import styles from "./Backtest.module.css";
import { useState, useEffect } from "react";

type BacktestSettings = {
  strategy: string;
  ticker: string;
  start: Date;
  end: Date;
  window1: number;
  window2: number | null;
};

const getStrategyDescription = (strategy: string) => {
  switch (strategy) {
    case "crossover":
      return "In the statistics of time series, and in particular the stock market technical analysis, a moving-average crossover occurs when, on plotting two moving averages each based on different degrees of smoothing, the traces of these moving averages cross. It does not predict future direction but shows trends. This indicator uses two (or more) moving averages, a slower moving average and a faster moving average. The faster moving average is a short term moving average. For end-of-day stock markets, for example, it may be 5-, 10- or 25-day period while the slower moving average is medium or long term moving average (e.g. 50-, 100- or 200-day period). A short term moving average is faster because it only considers prices over short period of time and is thus more reactive to daily price changes. On the other hand, a long term moving average is deemed slower as it encapsulates prices over a longer period and is more lethargic. However, it tends to smooth out price noises which are often reflected in short term moving averages.";
    case "ema":
      return "An exponential moving average (EMA), also known as an exponentially weighted moving average (EWMA), is a first-order infinite impulse response filter that applies weighting factors which decrease exponentially. The weighting for each older datum decreases exponentially, never reaching zero. This formulation is according to Hunter (1986).";
    default:
      return "Missing description";
  }
};

const getStrategyDescriptionHeader = (strategy: string) => {
  switch (strategy) {
    case "crossover":
      return "Moving Average Crossover";
    case "ema":
      return "Exponential Moving Average";
    default:
      return "Missing title";
  }
};

const Backtest = () => {
  const [tickers, setTickers] = useState(new Array<TickerResponse>());
  const [backtestSettings, setBacktestSettings] = useState({
    strategy: "crossover",
    start: new Date(Date.now()),
    end: new Date(new Date().setDate(new Date().getDate() - 5)),
    window1: 10,
  } as BacktestSettings);

  useEffect(() => {
    DumbStockApiClient.getTickers("NASDAQ")
      .then((data) => {
        setTickers(data);
        setBacktestSettings({ ...backtestSettings, ticker: data[0].ticker });
      })
      .catch((error) => {
        console.error(error, "Could not fetch tickers");
      });
  }, []);

  return (
    <div className={styles["backtest"]}>
      <div className={styles["description"]}>
        <h2>{getStrategyDescriptionHeader(backtestSettings.strategy)}</h2>
        <p>{getStrategyDescription(backtestSettings.strategy)}</p>
      </div>
      <div className={styles["settings"]}>
        <select
          onChange={(e) => {
            setBacktestSettings({
              ...backtestSettings,
              strategy: e.target.value,
            });
          }}
        >
          <option value="crossover">Moving Average Crossover</option>
          <option value="ema">Exponential Moving Average</option>
        </select>
        <select>
          {tickers.map((tickerResponse) => {
            return (
              <option value={tickerResponse.ticker} key={tickerResponse.ticker}>
                {tickerResponse.ticker}
              </option>
            );
          })}
        </select>
        <input
          type="date"
          defaultValue={backtestSettings.start.toLocaleDateString()}
        ></input>
        <input type="date"></input>
        <input type="number"></input>
        {backtestSettings.strategy === "crossover" ? (
          <input type="number"></input>
        ) : (
          <></>
        )}
      </div>
      <div className={styles["result"]}></div>
    </div>
  );
};

export default Backtest;
