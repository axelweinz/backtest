import technicalIndicatorsService from "./technicalIndicatorsService";
import yahoofinance from "yahoo-finance2";

export type BacktestResult = {
  profit: number;
  numberOfTrades: number;
  buyAndHoldProfit: number;
};

export type Close = {
  price: number;
  date: Date;
};

const backtest = async (tradingStrategy: string, ticker: string) => {
  const closes = await yahoofinance
    .historical(ticker, {
      period1: "2021-01-01",
      period2: "2023-07-20",
    })
    .then((historical) => {
      return historical.map((row) => {
        return {
          price: row.close,
          date: row.date,
        };
      });
    });

  switch (tradingStrategy) {
    case "EMA200":
      return exponentialMovingAverage200(closes);
    case "MACD":
      return movingAverageConvergenceDivergence(closes);
    default:
      return "Strategy not implemented";
  }
};

const exponentialMovingAverage200 = (closes: Close[]) => {
  const emaData = technicalIndicatorsService.exponentialMovingAverages(
    closes,
    200
  );

  let balance = 0;
  let numberOfTrades = 0;
  let activePosition = false;

  emaData.forEach((ema) => {
    if (ema.value > ema.closingPrice && !activePosition) {
      balance -= ema.closingPrice;
      activePosition = true;
      numberOfTrades += 1;
    } else if (ema.value < ema.closingPrice && activePosition) {
      balance += ema.closingPrice;
      activePosition = false;
      numberOfTrades += 1;
    }
  });

  return {
    profit: activePosition
      ? (balance + emaData[emaData.length - 1].closingPrice) /
        emaData[0].closingPrice
      : balance / emaData[0].closingPrice,
    numberOfTrades: numberOfTrades,
    buyAndHoldProfit:
      (emaData[emaData.length - 1].closingPrice - emaData[0].closingPrice) /
      emaData[0].closingPrice,
  } as BacktestResult;
};

const movingAverageConvergenceDivergence = (closes: Close[]) => {};

export default { backtest };
